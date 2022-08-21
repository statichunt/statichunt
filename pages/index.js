import config from "@config/config.json";
import Base from "@layouts/Baseof";
import Intro from "@layouts/components/Intro";
import Sidebar from "@layouts/components/Sidebar";
import Themes from "@layouts/components/Themes";
import { getListPage, getSinglePages } from "@lib/contents";
import { slugify } from "@lib/utils/textConverter";
import { useEffect, useState } from "react";

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

  // sorting
  const [theme, setTheme] = useState([]);
  const [sortTheme, setSortTheme] = useState([]);

  const handleSort = (e) => {
    const post = sortTheme.length
      ? sortTheme.sort(
          (a, b) =>
            b.frontmatter[e.target.value] - a.frontmatter[e.target.value]
        )
      : themes.sort(
          (a, b) =>
            b.frontmatter[e.target.value] - a.frontmatter[e.target.value]
        );

    if (e.target.value === "default") {
      setSortTheme((prev) => [...themes]);
    } else {
      setSortTheme((prev) => [...post]);
    }
  };
  useEffect(() => {
    if (!sortTheme.length) {
      setTheme(themes);
    } else {
      setTheme(sortTheme);
    }
  }, [sortTheme, themes]);

  const filterSSG = theme.filter((theme) =>
    arraySSG.length
      ? arraySSG.find((type) =>
          theme.frontmatter.ssg
            ?.map((ssg) => slugify(ssg))
            .includes(slugify(type))
        )
      : themes
  );
  const filterCMS = filterSSG.filter((theme) =>
    arrayCMS.length
      ? arrayCMS.find((type) =>
          theme.frontmatter.cms
            ?.map((cms) => slugify(cms))
            .includes(slugify(type))
        )
      : themes
  );
  const filterCSS = filterCMS.filter((theme) =>
    arrayCSS.length
      ? arrayCSS.find((type) =>
          theme.frontmatter.css
            ?.map((css) => slugify(css))
            .includes(slugify(type))
        )
      : themes
  );
  const filterArchetype = filterCSS.filter((theme) =>
    arrayArchetype.length
      ? arrayArchetype.find((type) =>
          theme.frontmatter.archetype
            ?.map((archetype) => slugify(archetype))
            .includes(slugify(type))
        )
      : themes
  );

  // console.log(themes);

  return (
    <Base>
      <div className="flex">
        <Sidebar
          sidebar={sidebar}
          archetype={archetype}
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
          setArrayArchetype={setArrayArchetype}
          arrayArchetype={arrayArchetype}
        />
        <main className="main">
          <div className="container">
            <Intro data={intro} />
            <button
              className="mr-3"
              value="default"
              onClick={(e) => handleSort(e)}
            >
              default
            </button>
            <button value="github_star" onClick={(e) => handleSort(e)}>
              star
            </button>
            <button
              className="ml-3"
              value="github_fork"
              onClick={(e) => handleSort(e)}
            >
              fork
            </button>

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
