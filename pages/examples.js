import Sidebar from "@components/Sidebar";
import config from "@config/config.json";
import Base from "@layouts/Baseof";
import Examples from "@layouts/components/Examples";
import { getListPage, getSinglePage } from "@lib/contentParser";
import { markdownify, slugify } from "@lib/utils/textConverter";
import { useState } from "react";

const Home = ({
  frontmatter,
  content,
  cms,
  css,
  ssg,
  category,
  examples,
  tools,
}) => {
  const { sidebar } = config;

  // ssg array update state
  const [arraySSG, setArraySSG] = useState([]);
  const [arrayCMS, setArrayCMS] = useState([]);
  const [arrayCSS, setArrayCSS] = useState([]);
  const [arrayCategory, setArrayCategory] = useState([]);

  // theme filtering
  const filterSSG = examples?.filter((theme) =>
    arraySSG.length
      ? arraySSG.find((type) =>
          theme.frontmatter.ssg
            ?.map((ssg) => slugify(ssg))
            .includes(slugify(type))
        )
      : examples
  );
  const filterCMS = filterSSG?.filter((theme) =>
    arrayCMS.length
      ? arrayCMS.find((type) =>
          theme.frontmatter.cms
            ?.map((cms) => slugify(cms))
            .includes(slugify(type))
        )
      : examples
  );
  const filterCSS = filterCMS?.filter((theme) =>
    arrayCSS.length
      ? arrayCSS.find((type) =>
          theme.frontmatter.css
            ?.map((css) => slugify(css))
            .includes(slugify(type))
        )
      : examples
  );
  const filterCategory = filterCSS?.filter((theme) =>
    arrayCategory.length
      ? arrayCategory.find((type) =>
          theme.frontmatter.category
            ?.map((category) => slugify(category))
            .includes(slugify(type))
        )
      : examples
  );

  return (
    <Base
      title={frontmatter.title}
      meta_title={frontmatter.meta_title}
      description={frontmatter.description}
    >
      <div className="flex">
        <Sidebar
          sidebar={sidebar}
          ssg={ssg}
          cms={cms}
          css={css}
          category={category}
          themes={examples}
          setArraySSG={setArraySSG}
          arraySSG={arraySSG}
          setArrayCMS={setArrayCMS}
          arrayCMS={arrayCMS}
          setArrayCSS={setArrayCSS}
          arrayCSS={arrayCSS}
          setArrayCategory={setArrayCategory}
          arrayCategory={arrayCategory}
        />
        <main className="main">
          <div className="container">
            <div className={`mb-10 md:mb-16`}>
              <h1 className="mb-3">{frontmatter.title}</h1>
              {markdownify(content, "p")}
            </div>
            <Examples examples={filterCategory} tools={tools} />
          </div>
        </main>
      </div>
    </Base>
  );
};

export default Home;

// for example page data
export const getStaticProps = async () => {
  const examplePage = await getListPage("content/examples/_index.md");
  const { frontmatter, content } = examplePage;
  const ssg = getSinglePage("content/ssg");
  const cms = getSinglePage("content/cms");
  const css = getSinglePage("content/css");
  const category = getSinglePage("content/category");
  const tools = [...ssg, ...cms, ...css, ...category];
  const examples = getSinglePage("content/examples");

  return {
    props: {
      frontmatter: frontmatter,
      content: content,
      ssg: ssg,
      cms: cms,
      css: css,
      category: category,
      tools: tools,
      examples: examples,
    },
  };
};
