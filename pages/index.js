import HomeCategory from "@components/HomeCategory";
import Intro from "@components/Intro";
import Sidebar from "@components/Sidebar";
import Themes from "@components/Themes";
import config from "@config/config.json";
import Base from "@layouts/Baseof";
import HomeSort from "@layouts/components/HomeSort";
import { getListPage, getSinglePage } from "@lib/contentParser";
import { slugify } from "@lib/utils/textConverter";
import sortButton from "config/sort.json";
import { setOthersCategory } from "hooks/setOthersCategory";
import SortReducer from "hooks/sortReducer";
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
  const { button } = sortButton;

  // ssg array update state
  const [arraySSG, setArraySSG] = useState([]);
  const [arrayCMS, setArrayCMS] = useState([]);
  const [arrayCSS, setArrayCSS] = useState([]);
  const [arrayCategory, setArrayCategory] = useState([]);
  const [arrayFree, setArrayFree] = useState([]);
  const [arrayPremium, setArrayPremium] = useState([]);
  const [showIntro, SetShowIntro] = useState(true);
  const [sortAsc, setSortAsc] = useState(false);
  const {
    sortedThemes,
    handleSortThemes,
    sortMenuShow,
    setSortMenuShow,
    sortValue,
    defaultSortedThemes,
    handleSortMenu,
  } = SortReducer(themes);

  const mouseHandler = () => {
    if (sortMenuShow) {
      setSortMenuShow(!sortMenuShow);
    }
  };

  // theme filtering
  const filterSSG = sortedThemes?.filter((theme) =>
    arraySSG.length
      ? arraySSG.find((type) =>
          theme.frontmatter.ssg
            ?.map((ssg) => slugify(ssg))
            .includes(slugify(type))
        )
      : defaultSortedThemes
  );
  const filterCMS = filterSSG?.filter((theme) =>
    arrayCMS.length
      ? arrayCMS.find((type) =>
          theme.frontmatter.cms
            ?.map((cms) => slugify(cms))
            .includes(slugify(type))
        )
      : defaultSortedThemes
  );
  const filterCSS = filterCMS?.filter((theme) =>
    arrayCSS.length
      ? arrayCSS.find((type) =>
          theme.frontmatter.css
            ?.map((css) => slugify(css))
            .includes(slugify(type))
        )
      : defaultSortedThemes
  );
  const filterCategory = filterCSS?.filter((theme) =>
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
      : defaultSortedThemes
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
      : defaultSortedThemes
  );

  // handle filtered themes
  const filteredThemes =
    arrayFree.length > 0 && arrayPremium.length > 0
      ? filterCategory
      : arrayFree.length > 0
      ? freeThemeByCategory
      : arrayPremium.length > 0
      ? premiumThemeByCategory
      : filterCategory;

  // sort filtered themes
  const sortFilteredThemes = sortAsc
    ? filteredThemes.reverse()
    : filteredThemes;

  // sort menus
  const sortMenu =
    arrayPremium.length && arrayFree.length
      ? button
      : arrayPremium.length
      ? button.filter((data) => data.premium)
      : arrayFree.length
      ? button.filter((data) => data.free)
      : button;

  return (
    <Base>
      <div className="flex" onClick={mouseHandler}>
        <Sidebar
          sidebar={sidebar}
          ssg={ssg}
          cms={cms}
          css={css}
          themes={themes}
          setArraySSG={setArraySSG}
          arraySSG={arraySSG}
          setArrayCMS={setArrayCMS}
          arrayCMS={arrayCMS}
          setArrayCSS={setArrayCSS}
          arrayCSS={arrayCSS}
          SetShowIntro={SetShowIntro}
        />
        <main className="main">
          <div className="container">
            <Intro data={intro} toggleClass={showIntro ? "block" : "hidden"} />
            <div className="mb-8 block justify-between md:flex">
              <HomeCategory
                themes={filteredThemes}
                category={category}
                arrayCategory={arrayCategory}
                setArrayCategory={setArrayCategory}
                arrayFree={arrayFree}
                filterFree={filterFree}
                setArrayFree={setArrayFree}
                filterPremium={filterPremium}
                arrayPremium={arrayPremium}
                setArrayPremium={setArrayPremium}
              />
              <HomeSort
                sortMenu={sortMenu}
                sortMenuShow={sortMenuShow}
                sortValue={sortValue}
                sortAsc={sortAsc}
                setSortAsc={setSortAsc}
                handleSortThemes={handleSortThemes}
                handleSortMenu={handleSortMenu}
              />
            </div>

            <Themes themes={sortFilteredThemes} tools={tools} />
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
  const themesWithOthersCategory = setOthersCategory(themes);

  return {
    props: {
      frontmatter: frontmatter,
      ssg: ssg,
      cms: cms,
      css: css,
      category: category,
      themes: themesWithOthersCategory,
      tools: tools,
    },
  };
};
