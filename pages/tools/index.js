import Sidebar from "@/components/Sidebar";
import Base from "@/layouts/Baseof";
import PlanFilter from "@/layouts/components/PlanFilter";
import Tools from "@/layouts/Tools";
import { getListPage, getSinglePage } from "@/lib/contentParser";
import { sortByDate, sortByWeight } from "@/lib/utils/sortFunctions";
import { markdownify, slugify } from "@/lib/utils/textConverter";
import { useFilterContext } from "context/filterContext";
import { useState } from "react";

const ToolsList = ({ toolsCategory, tools, indexPage }) => {
  const toolsSortedByDate = sortByDate(tools);
  const toolsSortedByWeight = sortByWeight(toolsSortedByDate);
  const { title, meta_title, image, description } = indexPage.frontmatter;
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

  // get all plans from tools
  const allPlans = tools
    .map((tool) => tool.frontmatter.plans)
    .flat()
    .filter(Boolean);

  const uniquePlans = [...new Set(allPlans)];

  const [selectedPlans, setSelectedPlans] = useState([]);

  const togglePlan = (plan) => {
    setSelectedPlans((prev) =>
      prev.includes(plan) ? prev.filter((p) => p !== plan) : [...prev, plan],
    );
  };

  const filterToolsByPlan =
    selectedPlans.length > 0
      ? filterTool.filter((tool) =>
          selectedPlans.every((plan) => tool.frontmatter.plans?.includes(plan)),
        )
      : filterTool;

  return (
    <Base
      title={title}
      meta_title={meta_title}
      description={description}
      image={image}
    >
      <div className="flex">
        <Sidebar
          slug={"tools"}
          toolsCategory={toolsCategory}
          themes={filterToolsByPlan}
        >
          <PlanFilter
            plans={uniquePlans}
            themes={filterTool}
            onPlanToggle={togglePlan}
          />
        </Sidebar>
        <main className="main">
          <div className="container">
            <div
              className={`mt-4 shadow rounded-md p-4 lg:p-6 flex flex-wrap md:flex-nowrap mb-10 md:mb-16`}
            >
              <div className="lg:mr-3 mb-4 lg:mb-0">
                <h1 className="mb-3">{title}</h1>
                {markdownify(description, "p")}
                {/* <Link
                  className="btn btn-github mt-4"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  href="https://github.com/statichunt/statichunt"
                >
                  <FaGithub className="inline-block mr-2 text-lg -mt-1" />
                  Submit Yours
                </Link> */}
              </div>
            </div>
            <Tools tools={filterToolsByPlan} />
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
