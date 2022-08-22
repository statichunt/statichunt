import HomeArchetype from "@components/HomeArchetype";
import Intro from "@components/Intro";
import Sidebar from "@components/Sidebar";
import SortThemes from "@components/SortThemes";
import Themes from "@components/Themes";
import config from "@config/config.json";
import Base from "@layouts/Baseof";
import { getListPage, getSinglePages } from "@lib/contents";
import { slugify } from "@lib/utils/textConverter";
import { fi } from "date-fns/locale";
import { addArctype } from "hooks/addArctype";
import { useReducer, useState } from "react";

const Home = ({
  frontmatter: { intro },
  cms,
  css,
  ssg,
  archetype,
  themes,
  tools,
}) => {
  const { sidebar } = config;

  // ssg array update state
  const [arraySSG, setArraySSG] = useState([]);
  const [arrayCMS, setArrayCMS] = useState([]);
  const [arrayCSS, setArrayCSS] = useState([]);
  const [arrayArchetype, setArrayArchetype] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [isValue, setIsValue] = useState("default");
  const addarchetypes = addArctype(themes);
  const defaultSort = addarchetypes.sort(
    (a, b) => new Date(b.frontmatter?.date) - new Date(a.frontmatter?.date)
  );

  // theme sorting

  const reducer = (state, action) => {
    switch (action.type) {
      case "STAR":
        const sortByStar = [
          ...state.sort(
            (a, b) => b.frontmatter?.github_star - a.frontmatter?.github_star
          ),
        ];
        return sortByStar;
      case "FORK":
        const sortByFork = [
          ...state.sort(
            (a, b) => b.frontmatter?.github_fork - a.frontmatter?.github_fork
          ),
        ];
        return sortByFork;
      case "UPDATE":
        const sortByUpdate = [
          ...state.sort(
            (a, b) =>
              new Date(b.frontmatter?.update_date) -
              new Date(a.frontmatter?.update_date)
          ),
        ];
        return sortByUpdate;
      case "DEFAULT":
        const sortByDate = [
          ...state.sort(
            (a, b) =>
              new Date(b.frontmatter?.date) - new Date(a.frontmatter?.date)
          ),
        ];
        return sortByDate;

      default:
        return { ...state };
    }
  };
  const [currentTheme, dispatch] = useReducer(reducer, defaultSort);

  // show value
  const handleClick = () => {
    setIsShow(!isShow);
  };
  // sort buttons
  const handleSortTheme = (e, type) => {
    dispatch({ type: type });
    setIsValue(e.target.value);
    setIsShow(!isShow);
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
  const filterArchetype = filterCSS?.filter((theme) =>
    arrayArchetype.length
      ? arrayArchetype.find((type) =>
          theme.frontmatter.archetype
            ?.map((archetype) => slugify(archetype))
            .includes(slugify(type))
        )
      : defaultSort
  );

  return (
    <Base>
      <div className="flex">
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
        />
        <main className="main">
          <div className="container">
            <Intro data={intro} />
            <div className="mb-8 flex justify-between">
              <HomeArchetype
                themes={filterCSS}
                archetype={archetype}
                arrayArchetype={arrayArchetype}
                setArrayArchetype={setArrayArchetype}
              />
              <SortThemes
                isShow={isShow}
                isValue={isValue}
                handleSortTheme={handleSortTheme}
                handleClick={handleClick}
              />
            </div>

            <Themes themes={filterArchetype} tools={tools} />
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
  const archetype = getSinglePages("content/archetype");
  const tools = [...ssg, ...cms, ...css, ...archetype];
  const themes = getSinglePages("content/themes");

  return {
    props: {
      frontmatter: frontmatter,
      ssg: ssg,
      cms: cms,
      css: css,
      archetype: archetype,
      themes: themes,
      tools: tools,
    },
  };
};
