import Resources from "@components/Resources";
import Sidebar from "@components/Sidebar";
import config from "@config/config.json";
import Base from "@layouts/Baseof";
import { getListPage, getSinglePage } from "@lib/contentParser";
import { sortByDate, sortByWeight } from "@lib/utils/sortFunctions";
import { markdownify, slugify } from "@lib/utils/textConverter";
import { useFilterContext } from "context/state";

const ResourceList = ({ tool, resources, indexPage }) => {
  const resourcesSortedByDate = sortByDate(resources);
  const resourcesSortedByWeight = sortByWeight(resourcesSortedByDate);
  const { title, meta_title, page_title, image, description } = indexPage;
  const { sidebar } = config;
  const { arrayTool } = useFilterContext();
  const filterTool = resourcesSortedByWeight.filter((resource) =>
    arrayTool.length
      ? arrayTool.find((type) =>
          resource.frontmatter.tool
            ?.map((tool) => slugify(tool))
            .includes(slugify(type))
        )
      : resourcesSortedByWeight
  );

  return (
    <Base
      title={title}
      meta_title={meta_title}
      description={description}
      image={image}
    >
      <div className="flex">
        <Sidebar sidebar={sidebar} tool={tool} themes={resources} />
        <main className="main">
          <div className="container">
            <div className="row mb-8 justify-center">
              <div className="xl:col-10">
                {markdownify(page_title || title, "h1")}
              </div>
            </div>
            <Resources resources={filterTool} />
          </div>
        </main>
      </div>
    </Base>
  );
};

export default ResourceList;

export const getStaticProps = async () => {
  const ResourcesList = await getListPage("content/resources/_index.md");
  const { frontmatter } = ResourcesList;
  const toolsIndex = await getListPage("content/tool/_index.md");
  const tools = getSinglePage("content/tool");
  const resources = getSinglePage("content/resources");

  return {
    props: {
      sidebar: toolsIndex,
      tool: tools,
      resources: resources,
      indexPage: frontmatter,
    },
  };
};
