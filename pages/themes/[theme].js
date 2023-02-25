import MobileSidebar from "@components/MobileSidebar";
import Share from "@components/Share";
import ThemeInfo from "@components/ThemeInfo";
import ThemePreview from "@components/ThemePreview";
import Themes from "@components/Themes";
import Base from "@layouts/Baseof";
import { getSinglePage, getSinglePageSlug } from "@lib/contentParser";
import { similerItems } from "@lib/utils/similarItems";
import { markdownify, plainify } from "@lib/utils/textConverter";

const SingleTheme = ({ slug, theme, allTheme }) => {
  const { frontmatter, content } = theme[0];
  const { title, description, meta_title, noindex, canonical } = frontmatter;
  const similarThemes = similerItems(theme, allTheme, slug);
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
              <div className="mt-8 hidden border-y border-gray-300 py-5 lg:block">
                <div className="flex flex-wrap items-center">
                  <h3 className="h6 mb-1 mr-5">Share This Theme:</h3>
                  <Share title={title} description={description} slug={slug} />
                </div>
              </div>
            </div>

            <div className="mt-lg-0 mt-4 lg:col-4 lg:mt-0">
              <ThemeInfo theme={theme} slug={slug} />
            </div>
          </div>
          {similarThemes.length > 0 && (
            <div className="mt-20">
              <h2 className="mb-8 text-center">Similar Themes</h2>
              <Themes
                customRowClass="row justify-center !overflow-hidden"
                customColClass="col-12 mb-8 sm:col-6 md:col-4 2xl:col-3 2xl:last:block sm:last:block md:last:hidden last:hidden"
                themes={similarThemes.slice(0, 4)}
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
  const allTheme = getSinglePage("content/themes");
  const singleTheme = allTheme.filter((data) => data.slug == theme);

  return {
    props: {
      theme: singleTheme,
      allTheme: allTheme,
      slug: theme,
    },
  };
};
