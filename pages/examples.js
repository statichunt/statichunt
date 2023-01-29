import Sidebar from "@components/Sidebar";
import config from "@config/config.json";
import Base from "@layouts/Baseof";
import Examples from "@layouts/components/Examples";
import { getListPage, getSinglePage } from "@lib/contentParser";
import { sortByDate, sortByWeight } from "@lib/utils/sortFunctions";
import { markdownify, slugify } from "@lib/utils/textConverter";
import { useFilterContext } from "context/state";

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
  const examplesSortedByDate = sortByDate(examples);
  const examplesSortedByWeight = sortByWeight(examplesSortedByDate);
  const { sidebar } = config;
  const { arraySSG, arrayCMS, arrayCSS, arrayCategory } = useFilterContext();

  // theme filtering
  const filterSSG = examplesSortedByWeight?.filter((theme) =>
    arraySSG.length
      ? arraySSG.find((type) =>
          theme.frontmatter.ssg
            ?.map((ssg) => slugify(ssg))
            .includes(slugify(type))
        )
      : examplesSortedByWeight
  );
  const filterCMS = filterSSG?.filter((theme) =>
    arrayCMS.length
      ? arrayCMS.find((type) =>
          theme.frontmatter.cms
            ?.map((cms) => slugify(cms))
            .includes(slugify(type))
        )
      : examplesSortedByWeight
  );
  const filterCSS = filterCMS?.filter((theme) =>
    arrayCSS.length
      ? arrayCSS.find((type) =>
          theme.frontmatter.css
            ?.map((css) => slugify(css))
            .includes(slugify(type))
        )
      : examplesSortedByWeight
  );
  const filterCategory = filterCSS?.filter((theme) =>
    arrayCategory.length
      ? arrayCategory.find((type) =>
          theme.frontmatter.category
            ?.map((category) => slugify(category))
            .includes(slugify(type))
        )
      : examplesSortedByWeight
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
