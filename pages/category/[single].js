import PricingFilter from "@/components/PricingFilter";
import Sidebar from "@/components/Sidebar";
import SidebarSort from "@/components/SidebarSort";
import useFilterData from "@/hooks/useFilterData";
import useThemesSort from "@/hooks/useThemesSort";
import Base from "@/layouts/Baseof";
import ThemeTaxonomy from "@/layouts/ThemeTaxonomy";
import { getSinglePage, getSinglePageSlug } from "@/lib/contentParser";
import { sortOrder } from "@/lib/utils/sortFunctions";
import { slugify } from "@/lib/utils/textConverter";
import { useFilterContext } from "context/filterContext";
import { getListPage } from "lib/contentParser";
import { useState } from "react";

// for all regular pages
const RegularPages = ({
  slug,
  ssg,
  css,
  cms,
  ui,
  themes,
  authors,
  currentPage,
}) => {
  const {
    title,
    meta_title,
    description,
    image,
    noindex,
    canonical,
    handpicked_themes,
  } = currentPage?.frontmatter;

  const [showIntro, SetShowIntro] = useState(true);

  const { sortedThemes, handleSortThemes, sortValue } = useThemesSort({
    themes: themes,
    handpicked: handpicked_themes,
    slug: slug,
  });

  const {
    arraySSG,
    arrayCMS,
    arrayCSS,
    arrayUI,
    arrayCategory,
    arrayOpenSource,
    arrayFree,
    arrayPremium,
    sortAsc,
    parameter,
  } = useFilterContext();

  const filterFunction = (array, filterArray, params) => {
    const filterData = array?.filter((theme) =>
      filterArray.length
        ? filterArray.find((type) =>
            theme.frontmatter[params]
              ?.map((data) => slugify(data))
              .includes(slugify(type)),
          )
        : sortedThemes,
    );
    return filterData;
  };
  const filterSSG = filterFunction(sortedThemes, arraySSG, "ssg");
  const filterCMS = filterFunction(filterSSG, arrayCMS, "cms");
  const filterCSS = filterFunction(filterCMS, arrayCSS, "css");
  const filterUI = filterFunction(filterCSS, arrayUI, "ui");
  const filterCategory = filterFunction(filterUI, arrayCategory, "category");

  const { filteredThemes, filterOpenSource, filterFree, filterPremium } =
    useFilterData(
      sortedThemes,
      filterCategory,
      arrayCategory,
      arrayOpenSource,
      arrayFree,
      arrayPremium,
    );

  // final themes filtering
  const finalThemes =
    arrayPremium.length && arrayFree.length && arrayOpenSource.length
      ? sortedThemes
      : arrayFree.length
        ? parameter
          ? filterFree
          : arrayFree
        : arrayPremium.length
          ? parameter
            ? filterPremium
            : arrayPremium
          : arrayOpenSource.length
            ? parameter
              ? filterOpenSource
              : arrayOpenSource
            : sortedThemes;

  const themeCount =
    sortedThemes.length > 50
      ? Math.floor(sortedThemes.length / 50) * 50
      : sortedThemes.length - 1;

  const metaTitle = meta_title?.replace("<themes>", `${themeCount}+`);

  return (
    <Base
      title={title}
      meta_title={metaTitle}
      description={description}
      image={image}
      noindex={noindex}
      canonical={canonical}
    >
      <div className="flex">
        <Sidebar
          SetShowIntro={SetShowIntro}
          ssg={ssg}
          cms={cms}
          css={css}
          ui={ui}
          themes={
            arrayPremium.length && arrayFree.length && arrayOpenSource.length
              ? finalThemes
              : arrayFree.length
                ? filterFree
                : arrayPremium.length
                  ? filterPremium
                  : arrayOpenSource.length
                    ? filterOpenSource
                    : finalThemes
          }
        >
          <PricingFilter
            filterOpenSource={filterOpenSource}
            filterFree={filterFree}
            filterPremium={filterPremium}
          />
          <SidebarSort
            sortValue={sortValue}
            handleSortThemes={handleSortThemes}
          />
        </Sidebar>
        <ThemeTaxonomy
          currentPage={[currentPage]}
          data={sortOrder(filteredThemes, sortAsc)}
          themeCount={themeCount}
          showIntro={showIntro}
          authors={authors}
        />
      </div>
    </Base>
  );
};
export default RegularPages;

// for single page routes
export const getStaticPaths = async () => {
  const slugs = getSinglePageSlug("content/category");

  const paths = slugs.map((slug) => ({
    params: {
      single: slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

// for single page data
export const getStaticProps = async ({ params }) => {
  const { single } = params;

  const authors = getSinglePage("content/authors");

  // get taxonomies
  const ssg = getSinglePage("content/ssg");
  const cms = getSinglePage("content/cms");
  const css = getSinglePage("content/css");
  const ui = getSinglePage("content/ui");
  const category = getSinglePage("content/category");
  const themes = getSinglePage("content/themes");

  const categoryPage = category.filter((page) =>
    page.frontmatter?.url
      ? page.frontmatter.url === `/${single}`
      : page.slug === single,
  );

  const filterThemesByCategory = themes.filter((theme) =>
    theme.frontmatter.category
      ?.map((cat) => slugify(cat))
      ?.includes(slugify(categoryPage[0]?.frontmatter.title)),
  );

  // get page content
  const getCurrentPage = slugify(categoryPage[0]?.frontmatter.title);

  const currentPageData = await getListPage(
    `content/category/${getCurrentPage}.md`,
  );

  return {
    props: {
      slug: single,
      ssg: ssg,
      cms: cms,
      css: css,
      ui: ui,
      themes: filterThemesByCategory,
      authors: authors,
      currentPage: currentPageData,
    },
  };
};
