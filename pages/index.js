import HomeCategory from "@/components/HomeCategory";
import Intro from "@/components/Intro";
import PricingFilter from "@/components/PricingFilter";
import Sidebar from "@/components/Sidebar";
import config from "@/config/config.json";
import sponsors from "@/config/sponsor.json";
import useFilterData from "@/hooks/useFilterData";
import usePricingFilter from "@/hooks/usePricingFilter";
import useThemesSort from "@/hooks/useThemesSort";
import Base from "@/layouts/Baseof";
import Themes from "@/layouts/Themes";
import Announcement from "@/layouts/components/Announcement";
import HomeSort from "@/layouts/components/HomeSort";
import { getListPage, getSinglePage } from "@/lib/contentParser";
import setOthersCategory from "@/lib/setOthersCategory";
import { sortOrder } from "@/lib/utils/sortFunctions";
import { slugify } from "@/lib/utils/textConverter";
import { useFilterContext } from "context/filterContext";
import SponsorCards from "layouts/SponsorCards";
import { useState } from "react";

const Home = ({
  frontmatter: { intro },
  cms,
  css,
  ui,
  ssg,
  category,
  themes,
  authors,
}) => {
  const [showIntro, SetShowIntro] = useState(true);
  const themesWithOthersCategory = setOthersCategory(themes);
  const { sortedThemes, handleSortThemes, sortValue } = useThemesSort({
    themes: themesWithOthersCategory,
    weightType: "home_weight",
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

  //  button for sorting
  const { sortMenu } = usePricingFilter(
    arrayOpenSource,
    arrayFree,
    arrayPremium,
  );

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

  const title = config.site.title.replace(
    "<themes>",
    `${Math.floor(themes.length / 50) * 50}+`,
  );

  return (
    <Base title={title}>
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
        </Sidebar>
        <main className="main">
          <div className="container-home container">
            <Announcement />
            <Intro
              data={intro}
              themeCount={themes.length}
              className={showIntro ? "block" : "hidden"}
            />

            <div className="mb-8 block justify-between md:flex lg:sticky top-[74px] bg-body dark:bg-darkmode-body pt-2 z-20 px-2">
              <HomeCategory
                themes={finalThemes}
                category={category}
                filterFree={filterFree}
                filterPremium={filterPremium}
              />
              <HomeSort
                sortMenu={sortMenu}
                sortValue={sortValue}
                handleSortThemes={handleSortThemes}
              />
            </div>
            <SponsorCards
              sponsors={sponsors.themes}
              className={showIntro ? "" : "hidden"}
            />
            <Themes
              themes={sortOrder(filteredThemes, sortAsc)}
              authors={authors}
            />
          </div>
        </main>
      </div>
    </Base>
  );
};

export default Home;

// for homepage data
export const getStaticProps = async () => {
  const homepage = await getListPage("content/_index.md");
  const { frontmatter } = homepage;
  const ssg = getSinglePage("content/ssg");
  const cms = getSinglePage("content/cms");
  const css = getSinglePage("content/css");
  const ui = getSinglePage("content/ui");
  const category = getSinglePage("content/category");
  const themes = getSinglePage("content/themes");
  const authors = getSinglePage("content/authors");

  return {
    props: {
      frontmatter: frontmatter,
      ssg: ssg,
      cms: cms,
      css: css,
      ui: ui,
      category: category,
      themes: themes,
      authors: authors,
    },
  };
};
