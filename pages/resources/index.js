import Resources from "@components/Resources";
import Sidebar from "@components/Sidebar";
import config from "@config/config.json";
import Base from "@layouts/Baseof";
import { getListPage, getSinglePages } from "@lib/contentParser";
import { markdownify, slugify } from "@lib/utils/textConverter";
import { useState } from "react";

const ResourceList = ({ tool, resources, indexPage }) => {
  const { title, page_title, image, description } = indexPage;
  const { sidebar } = config;
  const [arrayTool, setArrayTool] = useState([]);
  const filterTool = resources.filter((theme) =>
    arrayTool.length
      ? arrayTool.find((type) =>
          theme.frontmatter.tool
            ?.map((tool) => slugify(tool))
            .includes(slugify(type))
        )
      : resources
  );

  return (
    <Base title={title} description={description && description} image={image}>
      <div className="flex">
        <Sidebar
          sidebar={sidebar}
          tool={tool}
          themes={resources}
          setArrayTool={setArrayTool}
          arrayTool={arrayTool}
        />
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
  const ResourcesList = await getListPage("content/resources");
  const { frontmatter } = ResourcesList;
  const toolsIndex = await getListPage("content/tool");
  const tools = getSinglePages("content/tool");
  const resources = getSinglePages("content/resources");

  return {
    props: {
      sidebar: toolsIndex,
      tool: tools,
      resources: resources,
      indexPage: frontmatter,
    },
  };
};
