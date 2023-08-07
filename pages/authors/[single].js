import Base from "@/layouts/Baseof";
import Themes from "@/layouts/Themes";
import MobileSidebar from "@/layouts/partials/MobileSidebar";
import { getSinglePage } from "@/lib/contentParser";
import { parseMDX } from "@/lib/utils/mdxParser";
import { markdownify, slugify } from "@/lib/utils/textConverter";
import shortcodes from "@/shortcodes/all";
import { MDXRemote } from "next-mdx-remote";

// for all regular pages
const ThemeAuthor = ({ author, mdxContent, themes, slug, authors }) => {
  const { content, frontmatter } = author[0];
  const { title, meta_title, description, image, noindex, canonical } =
    frontmatter;

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
      <section className="section">
        <div className="container">
          <div className="row mb-8 justify-center">
            <div className="col-10 text-center">
              {markdownify(title, "h1", "mb-8")}
              <div className="content">
                <MDXRemote {...mdxContent} components={shortcodes} />
              </div>
            </div>
          </div>
          <Themes themes={filterThemeByAuthor} authors={authors} />
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
