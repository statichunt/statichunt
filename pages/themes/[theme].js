import Share from "@/components/Share";
import ThemeInfo from "@/components/ThemeInfo";
import ThemePreview from "@/components/ThemePreview";
import Base from "@/layouts/Baseof";
import MobileSidebar from "@/layouts/partials/MobileSidebar";
import Themes from "@/layouts/Themes";
import { getSinglePage, getSinglePageSlug } from "@/lib/contentParser";
import { similerItems } from "@/lib/utils/similarItems";
import { markdownify, plainify } from "@/lib/utils/textConverter";

const SingleTheme = ({ slug, theme, themes, authors }) => {
  const { frontmatter, content } = theme[0];
  const { title, description, meta_title, noindex, canonical } = frontmatter;
  const similarThemes = similerItems(theme, themes, slug);
  return (
    <Base
      title={plainify(title)}
      description={
        description ? plainify(description) : plainify(content.slice(0, 120))
      }
      meta_title={plainify(meta_title)}
      image={`/themes/${slug}.png`}
      noindex={noindex}
      canonical={canonical}
    >
      <MobileSidebar />
      <section className="section mx-auto max-w-[1366px]">
        <div className="container">
          <div className="row justify-center">
            <div className="relative lg:col-8">
              <ThemePreview theme={theme} slug={slug} />
              {markdownify(content, "div", "content")}
              <div className="mt-8 hidden border-y border-gray-300 py-5 dark:border-darkmode-border lg:block">
                <div className="flex flex-wrap items-center">
                  <h3 className="h6 mb-1 mr-5">Share This Theme:</h3>
                  <Share
                    className="space-x-4"
                    title={title}
                    description={description}
                  />
                </div>
              </div>
            </div>

            <div className="mt-lg-0 mt-4 lg:col-4 lg:mt-0">
              <ThemeInfo theme={theme} slug={slug} />
            </div>
          </div>
          {similarThemes.length > 0 && (
            <div className="mt-24">
              <h2 className="mb-8 text-center">Similar Themes To Consider</h2>
              <Themes
                customRowClass="row justify-center !overflow-hidden"
                customColClass="col-12 mb-8 sm:col-6 md:col-4 2xl:col-3 2xl:last:block sm:last:block md:last:hidden last:hidden"
                themes={similarThemes.slice(0, 4)}
                authors={authors}
              />
            </div>
          )}
        </div>
      </section>
    </Base>
  );
};

export default SingleTheme;

export const getStaticPaths = () => {
  const slugs = getSinglePageSlug("content/themes");

  const paths = slugs.map((theme) => ({
    params: {
      theme: theme,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = ({ params }) => {
  const { theme } = params;
  const themes = getSinglePage("content/themes");
  const singleTheme = themes.filter((data) => data.slug === theme);
  const authors = getSinglePage("content/authors");

  return {
    props: {
      theme: singleTheme,
      themes: themes,
      slug: theme,
      authors: authors,
    },
  };
};
