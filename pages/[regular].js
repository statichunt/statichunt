import Sidebar from "@/components/Sidebar";
import useFilterData from "@/hooks/useFilterData";
import useThemesSort from "@/hooks/useThemesSort";
import Base from "@/layouts/Baseof";
import Default from "@/layouts/Default";
import ExampleTaxonomy from "@/layouts/ExampleTaxonomy";
import ThemeTaxonomy from "@/layouts/ThemeTaxonomy";
import ToolTaxonomy from "@/layouts/ToolTaxonomy";
import PricingFilter from "@/layouts/components/PricingFilter";
import SidebarSort from "@/layouts/components/SidebarSort";
import MobileSidebar from "@/layouts/partials/MobileSidebar";
import {
  getRegularPage,
  getRegularPageSlug,
  getSinglePage,
  getSinglePageSlug,
} from "@/lib/contentParser";
import setOthersCategory from "@/lib/setOthersCategory";
import { parseMDX } from "@/lib/utils/mdxParser";
import { sortOrder } from "@/lib/utils/sortFunctions";
import { slugify } from "@/lib/utils/textConverter";
import { useFilterContext } from "context/filterContext";
import { useState } from "react";

// for all regular pages
const RegularPages = ({
  slug,
  ssgSlug,
  cssSlug,
  toolsCategorySlug,
  currentPage,
  data,
  mdxContent,
  category,
  authors,
}) => {
  const isExamples = slug.includes("-examples");
  const {
    title,
    meta_title,
    examples_meta_title,
    description,
    examples_description,
    image,
    noindex,
    canonical,
  } = currentPage[0]?.frontmatter;

  const [showIntro, SetShowIntro] = useState(true);

  const themesWithOthersCategory = setOthersCategory(data);

  const { sortedThemes, handleSortThemes, sortValue } = useThemesSort({
    themes: themesWithOthersCategory,
    weightType: "weight",
    slug: slug,
  });

  const { arrayCategory, sortAsc, arrayFree, arrayPremium } =
    useFilterContext();

  const filterCategory = sortedThemes.filter((theme) =>
    arrayCategory.length
      ? arrayCategory.find((type) =>
          theme.frontmatter.category
            ?.map((category) => slugify(category))
            .includes(slugify(type)),
        )
      : sortedThemes,
  );
  const { filteredThemes, filterFree, filterPremium } = useFilterData(
    sortedThemes,
    filterCategory,
    arrayCategory,
    arrayFree,
    arrayPremium,
  );

  const indexOfOthers = category.map((data) => data.slug).indexOf("others");
  const element = category.splice(indexOfOthers, 1)[0];
  category.splice(category.length, 0, element);

  let metaTitle = isExamples ? examples_meta_title : meta_title;
  metaTitle = metaTitle.replace(
    "<themes>",
    `${
      sortedThemes.length > 50
        ? Math.floor(sortedThemes.length / 50) * 50
        : sortedThemes.length - 1
    }+`,
  );

  return (
    <Base
      title={title}
      meta_title={metaTitle}
      description={isExamples ? examples_description : description}
      image={image}
      noindex={noindex}
      canonical={canonical}
    >
      {ssgSlug.includes(slug) || cssSlug.includes(slug) ? (
        <div className="flex">
          <Sidebar
            themes={
              arrayPremium.length && arrayFree.length
                ? sortedThemes
                : arrayFree.length
                  ? filterFree
                  : arrayPremium.length
                    ? filterPremium
                    : sortedThemes
            }
            slug={slug}
            category={category}
            SetShowIntro={SetShowIntro}
            showIntro={showIntro}
          >
            <PricingFilter
              filterFree={filterFree}
              filterPremium={filterPremium}
            />
            <SidebarSort
              sortValue={sortValue}
              handleSortThemes={handleSortThemes}
            />
          </Sidebar>
          <ThemeTaxonomy
            currentPage={currentPage}
            data={sortOrder(filteredThemes, sortAsc)}
            showIntro={showIntro}
            authors={authors}
          />
        </div>
      ) : toolsCategorySlug.includes(slug) ? (
        <>
          <MobileSidebar />
          <ToolTaxonomy data={data} currentPage={currentPage} />
        </>
      ) : isExamples ? (
        <div className="flex">
          <ExampleTaxonomy
            currentPage={currentPage}
            data={data}
            showIntro={showIntro}
          />
        </div>
      ) : (
        <Default data={data} mdxContent={mdxContent} />
      )}
    </Base>
  );
};
export default RegularPages;

// for regular page routes
export const getStaticPaths = async () => {
  const slugs = getRegularPageSlug();

  const paths = slugs.map((slug) => ({
    params: {
      regular: slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

// for regular page data
export const getStaticProps = async ({ params }) => {
  const { regular } = params;

  const authors = getSinglePage("content/authors");

  // get taxonomies
  const ssg = getSinglePage("content/ssg");
  const cms = getSinglePage("content/cms");
  const css = getSinglePage("content/css");
  const category = getSinglePage("content/category");
  const toolsCategory = getSinglePage("content/tools-category");

  // get taxonomies slug
  const ssgSlug = getSinglePageSlug("content/ssg");
  const cssSlug = getSinglePageSlug("content/css");
  const toolsCategorySlug = getSinglePageSlug("content/tools-category");

  // ssg page
  const ssgPage =
    ssg.length &&
    ssg.filter((page) =>
      regular.includes("-examples")
        ? page.frontmatter.examples_url === `/${regular}`
        : page.frontmatter?.url
          ? page.frontmatter.url === `/${regular}`
          : page.slug === regular,
    );

  // css page
  const cssPage =
    css.length &&
    css.filter((page) =>
      page.frontmatter?.url
        ? page.frontmatter.url === `/${regular}`
        : page.slug === regular,
    );

  // toolsCategory page
  const toolsCategoryPage =
    toolsCategory.length &&
    toolsCategory.filter((page) =>
      page.frontmatter?.url
        ? page.frontmatter.url === `/${regular}`
        : page.slug === regular,
    );

  // current page data
  const getCurrentPage = ssgPage.length
    ? slugify(ssgPage[0]?.frontmatter.title)
    : cssPage.length
      ? slugify(cssPage[0]?.frontmatter.title)
      : toolsCategoryPage.length
        ? slugify(toolsCategoryPage[0]?.frontmatter.title)
        : regular;

  const currentPageData = await getRegularPage(getCurrentPage, regular);

  // layout filtering
  const defaultPage = currentPageData.filter(
    (data) => !data.frontmatter.layout,
  );

  // current page
  const currentPage = regular.includes("-examples")
    ? ssgPage
    : ssgPage.length
      ? ssgPage
      : cssPage.length
        ? cssPage
        : toolsCategoryPage.length
          ? toolsCategoryPage
          : defaultPage;

  // current page MDXContent
  const mdxContent = await parseMDX(currentPageData[0]?.content);

  return {
    props: {
      slug: regular,
      ssgSlug: ssgSlug,
      cssSlug: cssSlug,
      toolsCategorySlug: toolsCategorySlug,
      currentPage: currentPage,
      data: currentPageData,
      mdxContent: mdxContent,
      category: category,
      authors: authors,
    },
  };
};
