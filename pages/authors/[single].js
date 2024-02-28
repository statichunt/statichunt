/* eslint-disable @next/next/no-img-element */
import Base from "@/layouts/Baseof";
import Themes from "@/layouts/Themes";
import MobileSidebar from "@/layouts/partials/MobileSidebar";
import { getSinglePage } from "@/lib/contentParser";
import { parseMDX } from "@/lib/utils/mdxParser";
import { markdownify, slugify } from "@/lib/utils/textConverter";
import shortcodes from "@/shortcodes/all";
import { MDXRemote } from "next-mdx-remote";
import { FaGithub, FaTwitter } from "react-icons/fa6";

// for all regular pages
const ThemeAuthor = ({ author, mdxContent, themes, slug, authors }) => {
  const { content, frontmatter } = author[0];
  const {
    title,
    meta_title,
    website,
    twitter,
    github,
    description,
    image,
    noindex,
    canonical,
  } = frontmatter;

  const filterThemeByAuthor = themes.filter(
    (theme) => slugify(theme.frontmatter.author) === slug,
  );

  return (
    <Base
      title={title}
      description={description ? description : content.slice(0, 120)}
      meta_title={meta_title}
      image={image}
      noindex={noindex}
      canonical={canonical}
    >
      <MobileSidebar />
      <section className="section bg-theme-light dark:bg-darkmode-theme-light">
        <div className="container">
          <div className="row justify-center">
            <div className="col-10 text-center">
              {markdownify(`Themes By ${title}`, "h1", "mb-8")}
              <div className="content mb-8">
                <MDXRemote {...mdxContent} components={shortcodes} />
              </div>
              <ul className="*:m-2 *:inline-block *:bg-white *:px-3 *:py-1 *:rounded *:text-dark dark:*:bg-darkmode-body dark:*:text-darkmode-dark">
                {website && (
                  <li>
                    <a href={website} target="_blank" rel="noreferrer noopener">
                      <img
                        height={20}
                        width={20}
                        src={`https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${website}&size=64`}
                        alt={title}
                        className="mr-1 rounded"
                      />
                      {website.replace("https://", "")}
                    </a>
                  </li>
                )}
                {twitter && (
                  <li>
                    <a href={twitter} target="_blank" rel="noreferrer noopener">
                      <FaTwitter size={20} className="mr-1" />
                      {twitter.replace("https://twitter.com/", "")}
                    </a>
                  </li>
                )}
                {github && (
                  <li>
                    <a href={github} target="_blank" rel="noreferrer noopener">
                      <FaGithub size={20} className="mr-1" />
                      {github.replace("https://github.com/", "")}
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <Themes
            className="sm:row-cols-2 xl:row-cols-3 2xl:row-cols-4 justify-center"
            themes={filterThemeByAuthor}
            authors={authors}
          />
        </div>
      </section>
    </Base>
  );
};

export default ThemeAuthor;

// get authors single slug
export const getStaticPaths = () => {
  const allSlug = getSinglePage("content/authors");
  const paths = allSlug.map((item) => ({
    params: {
      single: item.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

// get authors single content
export const getStaticProps = async ({ params }) => {
  const { single } = params;
  const authors = getSinglePage("content/authors");
  const themes = getSinglePage("content/themes");
  const author = authors.filter((author) => author.slug === single);
  const mdxContent = await parseMDX(author[0].content);

  return {
    props: {
      author: author,
      mdxContent: mdxContent,
      slug: single,
      themes: themes,
      authors: authors,
    },
  };
};
