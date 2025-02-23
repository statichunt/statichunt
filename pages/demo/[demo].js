import config from "@/config/config.json";
import useTooltip from "@/hooks/useTooltip";
import { plainify, slugify } from "@/lib/utils/textConverter";
import DemoHeader from "@/partials/DemoHeader";
import { getSinglePageServer } from "lib/contentParser";
import Head from "next/head";
import { useState } from "react";

const Demo = ({ theme, slug }) => {
  const { demo, title, github, download } = theme.frontmatter;
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

  const singleTheme = await getSinglePageServer("content/themes", demo);

  // handle 404
  if (!singleTheme) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      theme: singleTheme,
      slug: demo,
    },
  };
};
