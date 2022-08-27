import Sidebar from "@components/Sidebar";
import config from "@config/config.json";
import Base from "@layouts/Baseof";
import ResourcesList from "@layouts/ResourcesList";
import { getListPage, getSinglePages } from "@lib/contentParser";
import { slugify } from "@lib/utils/textConverter";
import { useState } from "react";

const Resources = ({ tool, resources, indexPage }) => {
  const { title, image, description } = indexPage;
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
          <ResourcesList resources={filterTool} title={title} />
        </main>
      </div>
    </Base>
  );
};

export default Resources;

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
