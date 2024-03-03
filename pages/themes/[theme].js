import Share from "@/components/Share";
import ThemeInfo from "@/components/ThemeInfo";
import ThemePreview from "@/components/ThemePreview";
import sponsor from "@/config/sponsor.json";
import authors from "@/json/authors.json";
import themes from "@/json/themes.json";
import Base from "@/layouts/Baseof";
import MobileSidebar from "@/layouts/partials/MobileSidebar";
import { markdownify, plainify } from "@/lib/utils/textConverter";
import Themes from "layouts/Themes";
import { getSinglePageServer } from "lib/contentParser";
import { similarThemes } from "lib/utils/similarItems";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

const SingleTheme = ({ slug, theme }) => {
  const { frontmatter, content } = theme;
  const {
    title,
    description,
    meta_title,
    date,
    noindex,
    canonical,
    ssg,
    price,
    author,
  } = frontmatter;
  const similarProducts = similarThemes(theme, themes, slug);

  const promotion_widget = sponsor.theme_single.filter((d) =>
    d.author.includes(author),
  )[0];

  return (
    <Base
      title={plainify(title)}
      description={
        description ? plainify(description) : plainify(content.slice(0, 120))
      }
      meta_title={plainify(meta_title)}
      image={`https://statichunt-images.netlify.app/themes/${slug}.png`}
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
              {promotion_widget && (
                <div className="widget">
                  <Link rel="noopener noreferrer nofollow" href={promotion_widget.link} className="block" >
                    <Image
                      src={promotion_widget.image}
                      width={300}
                      height={300}
                      alt="sponsor promotion"
                      className="rounded shadow"
                    />
                  </Link>
                </div>
              )}
            </div>
          </div>
          {similarProducts.length > 0 && (
            <div className="mt-24">
              <h2 className="mb-8 text-center">Similar Themes To Consider</h2>
              <Themes
                className="sm:row-cols-2 lg:row-cols-4 justify-center"
                themes={similarProducts.slice(0, 4)}
                authors={authors}
              />
            </div>
          )}
        </div>
      </section>
      <Script
        type="application/ld+json"
        id="schema-script"
        dangerouslySetInnerHTML={{
          __html: `
          {
            "@context": "https://schema.org/", 
            "@type": "Product", 
            "name": "${title}",
            "image": "https://statichunt-images.netlify.app/themes/${slug}.png",
            "url": "https://statichunt.com/themes/${slug}",  
            "description": "${description}",
            "brand": {
              "@type": "Brand",
              "name": "Statichunt"
            },
            "releaseDate": "${date}",
            "offers": {
              "@type": "Offer",
              "price": "${price ? price : 0}",  
              "priceCurrency": "USD"  
            },
            "additionalProperty": [
              {
                "@type": "PropertyValue",
                "name": "Product Type",
                "value": "${ssg[0]}"
              },
              {
                "@type": "PropertyValue",
                "name": "Theme Demo",
                "value": "https://statichunt.com/demo/${slug}"
              }
            ]
          }
      `,
        }}
      />
    </Base>
  );
};

export default SingleTheme;

// get single page on server side
export const getServerSideProps = async ({ params }) => {
  const { theme } = params;

  const singleTheme = await getSinglePageServer("content/themes", theme);

  // handle 404
  if (!singleTheme) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      theme: singleTheme,
      slug: theme,
    },
  };
};
