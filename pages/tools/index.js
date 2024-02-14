import Sidebar from "@/components/Sidebar";
import Base from "@/layouts/Baseof";
import Tools from "@/layouts/Tools";
import { getListPage, getSinglePage } from "@/lib/contentParser";
import { sortByDate, sortByWeight } from "@/lib/utils/sortFunctions";
import { markdownify, slugify } from "@/lib/utils/textConverter";
import { useFilterContext } from "context/filterContext";

const ToolsList = ({ toolsCategory, tools, indexPage }) => {
  const toolsSortedByDate = sortByDate(tools);
  const toolsSortedByWeight = sortByWeight(toolsSortedByDate);
  const { title, meta_title, page_title, image, description } =
    indexPage.frontmatter;
  const { arrayToolsCategory } = useFilterContext();
  const filterTool = toolsSortedByWeight.filter((tool) =>
    arrayToolsCategory.length
      ? arrayToolsCategory.find((type) =>
          tool.frontmatter.category
            ?.map((item) => slugify(item))
            .includes(slugify(type)),
        )
      : toolsSortedByWeight,
  );

  return (
    <Base
      title={title}
      meta_title={meta_title}
      description={description}
      image={image}
    >
      <div className="flex">
        <Sidebar toolsCategory={toolsCategory} themes={tools} />
        <main className="main">
          <div className="container">
            <div className="row mb-8 justify-center">
              <div className="xl:col-10">
                {markdownify(page_title || title, "h1")}
              </div>
            </div>
            <Tools tools={filterTool} />
          </div>
        </main>
      </div>
    </Base>
  );
};

export const getStaticProps = async () => {
  const toolsIndex = await getListPage("content/tools/_index.md");
  const toolsCategory = getSinglePage("content/tools-category");
  const tools = getSinglePage("content/tools");

  return {
    props: {
      indexPage: toolsIndex,
      tools: tools,
      toolsCategory: toolsCategory,
    },
  };
};

export default ToolsList;
