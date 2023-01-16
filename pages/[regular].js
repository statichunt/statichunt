import MobileSidebar from "@components/MobileSidebar";
import Sidebar from "@components/Sidebar";
import config from "@config/config.json";
import useSort from "@hooks/useSort";
import Base from "@layouts/Baseof";
import PricingFilter from "@layouts/components/PricingFilter";
import SidebarSort from "@layouts/components/SidebarSort";
import Default from "@layouts/Default";
import ExampleTaxonomy from "@layouts/ExampleTaxonomy";
import ResourceTaxonomy from "@layouts/ResourceTaxonomy";
import ThemeTaxonomy from "@layouts/ThemeTaxonomy";
import {
  getRegularPage,
  getRegularPageSlug,
  getSinglePage,
  getSinglePageSlug,
} from "@lib/contentParser";
import setOthersCategory from "@lib/setOthersCategory";
import { sortFilteredThemes } from "@lib/utils/sortFunctions";
import { slugify } from "@lib/utils/textConverter";
import { useFilterContext } from "context/state";
import { useState } from "react";

// for all regular pages
const RegularPages = ({
  slug,
  ssgSlug,
  cssSlug,
  toolSlug,
  currentPage,
  data,
  tools,
  category,
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

  const { sidebar } = config;
  // const [arrayCategory, setArrayCategory] = useState([]);
  const [showIntro, SetShowIntro] = useState(true);

  const themesWithOthersCategory = setOthersCategory(data);
  const {
    sortedThemes,
    handleSortThemes,
    sortMenuShow,
    sortValue,
    defaultSortedThemes,
    handleSortMenu,
  } = useSort(themesWithOthersCategory, true, slug);
  const { arrayCategory, sortAsc, arrayFree, arrayPremium } =
    useFilterContext();

  const filterCategory = sortedThemes.filter((theme) =>
    arrayCategory.length
      ? arrayCategory.find((type) =>
          theme.frontmatter.category
            ?.map((category) => slugify(category))
            .includes(slugify(type))
        )
      : defaultSortedThemes
  );

  const filterFree = filterCategory?.filter(
    (theme) => !theme.frontmatter.price || theme.frontmatter.price < 0
  );
  const freeThemeByCategory = filterFree?.filter((theme) =>
    arrayCategory.length
      ? arrayCategory.find((type) =>
          theme.frontmatter.category
            ?.map((category) => slugify(category))
            .includes(slugify(type))
        )
      : sortedThemes
  );

  const filterPremium = filterCategory?.filter(
    (theme) => theme.frontmatter.price > 0
  );

  const premiumThemeByCategory = filterPremium?.filter((theme) =>
    arrayCategory.length
      ? arrayCategory.find((type) =>
          theme.frontmatter.category
            ?.map((category) => slugify(category))
            .includes(slugify(type))
        )
      : sortedThemes
  );

  // const sortByOrder = sortAsc ? filterCategory.reverse() : filterCategory;

  const filteredThemes =
    arrayFree.length > 0 && arrayPremium.length > 0
      ? filterCategory
      : arrayFree.length > 0
      ? freeThemeByCategory
      : arrayPremium.length > 0
      ? premiumThemeByCategory
      : filterCategory;

  // console.log(filteredThemes);
  // change others position
  const indexOfOthers = category.map((data) => data.slug).indexOf("others");
  const element = category.splice(indexOfOthers, 1)[0];
  category.splice(category.length, 0, element);

  return (
    <Base
      title={title}
      description={isExamples ? examples_description : description}
      meta_title={isExamples ? examples_meta_title : meta_title}
      image={image}
      noindex={noindex}
      canonical={canonical}
    >
      {ssgSlug.includes(slug) || cssSlug.includes(slug) ? (
        <div className="flex">
          <Sidebar
            sidebar={sidebar}
            themes={themesWithOthersCategory}
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
              sortMenuShow={sortMenuShow}
              sortValue={sortValue}
              handleSortThemes={handleSortThemes}
              handleSortMenu={handleSortMenu}
            />
          </Sidebar>
          <ThemeTaxonomy
            currentPage={currentPage}
            data={sortFilteredThemes(filteredThemes, sortAsc)}
            tools={tools}
            showIntro={showIntro}
          />
        </div>
      ) : toolSlug.includes(slug) ? (
        <>
          <MobileSidebar />
          <ResourceTaxonomy data={data} currentPage={currentPage} />
        </>
      ) : isExamples ? (
        <div className="flex">
          <Sidebar
            sidebar={sidebar}
            themes={data}
            slug={slug}
            category={category}
            SetShowIntro={SetShowIntro}
            showIntro={showIntro}
          />
          <ExampleTaxonomy
            currentPage={currentPage}
            data={data}
            tools={tools}
            showIntro={showIntro}
          />
        </div>
      ) : (
        <Default data={data} />
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

  // get taxonomies
  const ssg = getSinglePage("content/ssg");
  const cms = getSinglePage("content/cms");
  const css = getSinglePage("content/css");
  const category = getSinglePage("content/category");
  const tool = getSinglePage("content/tool");

  // get taxonomies slug
  const ssgSlug = getSinglePageSlug("content/ssg");
  const cssSlug = getSinglePageSlug("content/css");
  const toolSlug = getSinglePageSlug("content/tool");

  // ssg page
  const ssgPage =
    ssg.length &&
    ssg.filter((page) =>
      regular.includes("-examples")
        ? page.frontmatter.examples_url === `/${regular}`
        : page.frontmatter?.url
        ? page.frontmatter.url === `/${regular}`
        : page.slug === regular
    );

  // css page
  const cssPage =
    css.length &&
    css.filter((page) =>
      page.frontmatter?.url
        ? page.frontmatter.url === `/${regular}`
        : page.slug === regular
    );

  // tool page
  const toolPage =
    tool.length &&
    tool.filter((page) =>
      page.frontmatter?.url
        ? page.frontmatter.url === `/${regular}`
        : page.slug === regular
    );

  // current page data
  const getCurrentPage = ssgPage.length
    ? slugify(ssgPage[0]?.frontmatter.title)
    : cssPage.length
    ? slugify(cssPage[0]?.frontmatter.title)
    : toolPage.length
    ? slugify(toolPage[0]?.frontmatter.title)
    : regular;

  const currentPageData = await getRegularPage(getCurrentPage, regular);

  // layout filtering
  const defaultPage = currentPageData.filter(
    (data) => !data.frontmatter.layout
  );

  // current page
  const currentPage = regular.includes("-examples")
    ? ssgPage
    : ssgPage.length
    ? ssgPage
    : cssPage.length
    ? cssPage
    : toolPage.length
    ? toolPage
    : defaultPage;

  // all tools
  const tools = [...ssg, ...cms, ...css, ...category];

  return {
    props: {
      slug: regular,
      ssgSlug: ssgSlug,
      cssSlug: cssSlug,
      toolSlug: toolSlug,
      currentPage: currentPage,
      data: currentPageData,
      tools: tools,
      category: category,
    },
  };
};
