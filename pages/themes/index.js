import HomeCategory from "@components/HomeCategory";
import Sidebar from "@components/Sidebar";
import config from "@config/config.json";
import useFilterData from "@hooks/useFilterData";
import usePricingFilter from "@hooks/usePricingFilter";
import useThemesSort from "@hooks/useThemesSort";
import Base from "@layouts/Baseof";
import HomeSort from "@layouts/components/HomeSort";
import Themes from "@layouts/Themes";
import { getListPage, getSinglePage } from "@lib/contentParser";
import setOthersCategory from "@lib/setOthersCategory";
import { sortFilteredThemes } from "@lib/utils/sortFunctions";
import { slugify } from "@lib/utils/textConverter";
import { useFilterContext } from "context/filterContext";

const Home = ({ frontmatter, cms, css, ssg, category, themes }) => {
  const { sidebar } = config;
  const themesWithOthersCategory = setOthersCategory(themes);
  const { sortedThemes, handleSortThemes, sortValue } = useThemesSort(
    themesWithOthersCategory
  );

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
              .includes(slugify(type))
          )
        : sortedThemes
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
    arrayPremium
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

  return (
    <Base
      title={frontmatter.title}
      meta_title={frontmatter.meta_title}
      description={frontmatter.description}
      noindex={true}
    >
      <div className="flex">
        <Sidebar
          sidebar={sidebar}
          ssg={ssg}
          cms={cms}
          css={css}
          themes={finalThemes}
        />
        <main className="main">
          <div className="container">
            <div className="mb-8 block justify-between md:flex">
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

            <Themes themes={sortFilteredThemes(filteredThemes, sortAsc)} />
          </div>
        </main>
      </div>
    </Base>
  );
};

export default Home;

// for themeList data
export const getStaticProps = async () => {
  const themeList = await getListPage("content/themes/_index.md");
  const { frontmatter } = themeList;
  const ssg = getSinglePage("content/ssg");
  const cms = getSinglePage("content/cms");
  const css = getSinglePage("content/css");
  const category = getSinglePage("content/category");
  const themes = getSinglePage("content/themes");

  return {
    props: {
      frontmatter: frontmatter,
      ssg: ssg,
      cms: cms,
      css: css,
      category: category,
      themes: themes,
    },
  };
};
