import config from "@/config/config.json";
import useTooltip from "@/hooks/useTooltip";
import { plainify, slugify } from "@/lib/utils/textConverter";
import DemoHeader from "@/partials/DemoHeader";
import fs from "fs";
import matter from "gray-matter";
import Head from "next/head";
import path from "path";
import { useState } from "react";

const Demo = ({ theme, slug }) => {
  const { demo, title, github, download } = theme[0].frontmatter;
  const { favicon } = config.site;
  const [showHeader, setShowHeader] = useState(true);
  const [device, setDevice] = useState("desktop");

  useTooltip();

  return (
    <>
      <Head>
        {/* title */}
        <title>{plainify(title)}</title>

        {/* favicon */}
        <link rel="shortcut icon" href={favicon} />

        {/* responsive meta */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />

        {/* noindex */}
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <DemoHeader
        themeTitle={title}
        demo={demo}
        slug={slug}
        github={github}
        download={download}
        showHeader={showHeader}
        setShowHeader={setShowHeader}
        device={device}
        setDevice={setDevice}
      />
      <div
        className={`demo-preview-wrapper ${
          showHeader ? "mt-[60px] h-[calc(100vh-60px)]" : "h-[100vh]"
        }`}
      >
        <div className={`demo-preview-content ${device}`}>
          <iframe
            src={demo}
            key={slugify(title)}
            id="theme-preview"
            title="theme preview"
            sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation allow-top-navigation-by-user-activation"
            loading="lazy"
          />
        </div>
      </div>
    </>
  );
};

export default Demo;

// use server side rendering
export const getServerSideProps = async ({ params }) => {
  const { demo } = params;

  // get single page on server side
  const getSinglePageServer = async (folder) => {
    const filesPath = await new Promise((resolve, reject) => {
      fs.readdir(path.join(process.cwd(), folder), (err, files) => {
        if (err) {
          reject(err);
        } else {
          resolve(files);
        }
      });
    });

    const sanitizeFiles = filesPath.filter((file) => file.includes(".md"));
    const filterSingleFiles = sanitizeFiles.filter((file) =>
      file.match(/^(?!_)/),
    );
    const filesPromises = filterSingleFiles.map(async (filename) => {
      const slug = filename.replace(".md", "");
      const pageData = await new Promise((resolve, reject) => {
        fs.readFile(
          path.join(process.cwd(), folder, filename),
          "utf-8",
          (err, data) => {
            if (err) {
              reject(err);
            } else {
              resolve(data);
            }
          },
        );
      });
      const pageDataParsed = matter(pageData);
      const frontmatterString = JSON.stringify(pageDataParsed.data);
      const frontmatter = JSON.parse(frontmatterString);
      const content = pageDataParsed.content;
      const url = frontmatter.url ? frontmatter.url.replace("/", "") : slug;

      return { frontmatter: frontmatter, slug: url, content: content };
    });

    const singlePages = await Promise.all(filesPromises);
    const publishedPages = singlePages.filter(
      (page) => !page.frontmatter.draft && page,
    );
    const filterByDate = publishedPages.filter(
      (page) => new Date(page.frontmatter.date || new Date()) <= new Date(),
    );

    return filterByDate;
  };

  const allTheme = await getSinglePageServer("content/themes");
  const singleTheme = allTheme.filter((data) => data.slug == demo);

  return {
    props: {
      theme: singleTheme,
      slug: demo,
    },
  };
};
