import HomeCategory from "@components/HomeCategory";
import Intro from "@components/Intro";
import Sidebar from "@components/Sidebar";
import Themes from "@components/Themes";
import config from "@config/config.json";
import usefilterButton from "@hooks/usefilterButton";
import useFilterData from "@hooks/useFilterData";
import useSort from "@hooks/useSort";
import Base from "@layouts/Baseof";
import HomeSort from "@layouts/components/HomeSort";
import { getListPage, getSinglePage } from "@lib/contentParser";
import setOthersCategory from "@lib/setOthersCategory";
import { sortFilteredThemes } from "@lib/utils/sortFunctions";
import { slugify } from "@lib/utils/textConverter";
import { useFilterContext } from "context/state";
import { fi } from "date-fns/locale";
import { useState } from "react";

const Home = ({
  frontmatter: { intro },
  cms,
  css,
  ssg,
  category,
  themes,
  tools,
}) => {
  const { sidebar } = config;
  const [showIntro, SetShowIntro] = useState(true);
  const themesWithOthersCategory = setOthersCategory(themes);
  const {
    sortedThemes,
    handleSortThemes,
    sortMenuShow,
    setSortMenuShow,
    sortValue,
    handleSortMenu,
  } = useSort(themesWithOthersCategory);

  const mouseHandler = () => {
    if (sortMenuShow) {
      setSortMenuShow(!sortMenuShow);
    }
  };
  const {
    arraySSG,
    arrayCMS,
    arrayCSS,
    arrayCategory,
    arrayFree,
    arrayPremium,
    sortAsc,
  } = useFilterContext();
  const filterFunction = (array, filterArray, params) => {
    const test = array?.filter((theme) =>
      filterArray.length
        ? filterArray.find((type) =>
            theme.frontmatter[params]
              ?.map((data) => slugify(data))
              .includes(slugify(type))
          )
        : sortedThemes
    );
    return test;
  };
  const filterSSG = filterFunction(sortedThemes, arraySSG, "ssg");
  const filterCMS = filterFunction(filterSSG, arrayCMS, "cms");
  const filterCSS = filterFunction(filterCMS, arrayCSS, "css");
  const filterCategory = filterFunction(filterCSS, arrayCategory, "category");

  //  button for sorting
  const { sortMenu } = usefilterButton(arrayFree, arrayPremium);
  const { filteredThemes, filterFree, filterPremium } = useFilterData(
    sortedThemes,
    filterCategory,
    arrayCategory,
    arrayFree,
    arrayPremium
  );

  return (
    <Base>
      <div className="flex" onClick={mouseHandler}>
        <Sidebar
          sidebar={sidebar}
          ssg={ssg}
          cms={cms}
          css={css}
          themes={sortedThemes}
          SetShowIntro={SetShowIntro}
        />
        <main className="main">
          <div className="container">
            <Intro data={intro} toggleClass={showIntro ? "block" : "hidden"} />
            <div className="mb-8 block justify-between md:flex">
              <HomeCategory
                themes={filteredThemes}
                category={category}
                filterFree={filterFree}
                filterPremium={filterPremium}
              />
              <HomeSort
                sortMenu={sortMenu}
                sortMenuShow={sortMenuShow}
                sortValue={sortValue}
                handleSortThemes={handleSortThemes}
                handleSortMenu={handleSortMenu}
              />
            </div>

            <Themes
              themes={sortFilteredThemes(filteredThemes, sortAsc)}
              tools={tools}
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
  const tools = [...ssg, ...cms, ...css, ...category];
  const themes = getSinglePage("content/themes");

  return {
    props: {
      frontmatter: frontmatter,
      ssg: ssg,
      cms: cms,
      css: css,
      category: category,
      themes: themes,
      tools: tools,
    },
  };
};
