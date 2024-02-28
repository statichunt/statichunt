import HomeCategory from "@/components/HomeCategory";
import Intro from "@/components/Intro";
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
    arrayCategory,
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
  const filterCategory = filterFunction(filterCSS, arrayCategory, "category");

  //  button for sorting
  const { sortMenu } = usePricingFilter(arrayFree, arrayPremium);
  const { filteredThemes, filterFree, filterPremium } = useFilterData(
    sortedThemes,
    filterCategory,
    arrayCategory,
    arrayFree,
    arrayPremium,
  );

  // final themes filtering
  const finalThemes =
    arrayPremium.length && arrayFree.length
      ? sortedThemes
      : arrayFree.length
        ? parameter
          ? filterFree
          : arrayFree
        : arrayPremium.length
          ? parameter
            ? filterPremium
            : arrayPremium
          : sortedThemes;

  const title = config.site.title.replace(
    "<themes>",
    `${Math.floor(themes.length / 50) * 50}+`,
  );

  return (
    <Base title={title}>
      <div className="flex">
        <Sidebar
          ssg={ssg}
          cms={cms}
          css={css}
          themes={finalThemes}
          SetShowIntro={SetShowIntro}
        />
        <main className="main">
          <div className="container-home container">
            <Announcement />
            <Intro
              data={intro}
              themeCount={themes.length}
              className={showIntro ? "block" : "hidden"}
            />

            {/* themes by authors */}
            {/* <div className="pt-2 z-20 px-2 mb-8 flex">
              <strong>Themes By Some Best Authors:</strong>
              <ul className="ml-2">
                {authors.map((author) => (
                  <li
                    className="inline-block mx-2"
                    key={author.frontmatter.title}
                  >
                    <Link
                      className="rounded border border-primary dark:border-darkmode-primary px-2 py-1 text-primary dark:text-darkmode-dark"
                      href={`/authors/${author.slug}`}
                    >
                      {author.frontmatter.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div> */}

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
  const category = getSinglePage("content/category");
  const themes = getSinglePage("content/themes");
  const authors = getSinglePage("content/authors");

  return {
    props: {
      frontmatter: frontmatter,
      ssg: ssg,
      cms: cms,
      css: css,
      category: category,
      themes: themes,
      authors: authors,
    },
  };
};
