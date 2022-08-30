import HomeCategory from "@components/HomeCategory";
import Intro from "@components/Intro";
import Sidebar from "@components/Sidebar";
import SortThemes from "@components/SortThemes";
import Themes from "@components/Themes";
import config from "@config/config.json";
import Base from "@layouts/Baseof";
import { getListPage, getSinglePages } from "@lib/contentParser";
import { slugify } from "@lib/utils/textConverter";
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

  // ssg array update state
  const [arraySSG, setArraySSG] = useState([]);
  const [arrayCMS, setArrayCMS] = useState([]);
  const [arrayCSS, setArrayCSS] = useState([]);
  const [arrayCategory, setArrayCategory] = useState([]);
  const [isIntro, setIsIntro] = useState(true);
  const getCategories = setOthersCategory(themes);
  const {
    currentTheme,
    handleSortTheme,
    isShow,
    setIsShow,
    isValue,
    defaultSort,
    handleClick,
  } = SortReducer(getCategories);

  const mouseHndler = () => {
    if (isShow) {
      setIsShow(!isShow);
    }
  };
  // theme filtering
  const filterSSG = currentTheme?.filter((theme) =>
    arraySSG.length
      ? arraySSG.find((type) =>
          theme.frontmatter.ssg
            ?.map((ssg) => slugify(ssg))
            .includes(slugify(type))
        )
      : defaultSort
  );
  const filterCMS = filterSSG?.filter((theme) =>
    arrayCMS.length
      ? arrayCMS.find((type) =>
          theme.frontmatter.cms
            ?.map((cms) => slugify(cms))
            .includes(slugify(type))
        )
      : defaultSort
  );
  const filterCSS = filterCMS?.filter((theme) =>
    arrayCSS.length
      ? arrayCSS.find((type) =>
          theme.frontmatter.css
            ?.map((css) => slugify(css))
            .includes(slugify(type))
        )
      : defaultSort
  );
  const filterCategory = filterCSS?.filter((theme) =>
    arrayCategory.length
      ? arrayCategory.find((type) =>
          theme.frontmatter.category
            ?.map((category) => slugify(category))
            .includes(slugify(type))
        )
      : defaultSort
  );

  return (
    <Base>
      <div className="flex" onClick={mouseHndler}>
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
          setIsIntro={setIsIntro}
        />
        <main className="main">
          <div className="container">
            <Intro data={intro} toggleClass={isIntro ? "block" : "hidden"} />
            <div className="mb-8 block justify-between md:flex">
              <HomeCategory
                themes={filterCSS}
                category={category}
                arrayCategory={arrayCategory}
                setArrayCategory={setArrayCategory}
              />
              <SortThemes
                isShow={isShow}
                isValue={isValue}
                handleSortTheme={handleSortTheme}
                handleClick={handleClick}
              />
            </div>

            <Themes themes={filterCategory} tools={tools} />
          </div>
        </main>
      </div>
    </Base>
  );
};

export default Home;

// for homepage data
export const getStaticProps = async () => {
  const homepage = await getListPage("content");
  const { frontmatter } = homepage;
  const ssg = getSinglePages("content/ssg");
  const cms = getSinglePages("content/cms");
  const css = getSinglePages("content/css");
  const category = getSinglePages("content/category");
  const tools = [...ssg, ...cms, ...css, ...category];
  const themes = getSinglePages("content/themes");

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
