import { useSerachContext } from "context/searchContext";

const useSearchTool = () => {
  const { tools, searchKey } = useSerachContext();

  // search filtering
  let searchTools = tools.filter((tool) => {
    const searchString = searchKey.toLowerCase();
    if (searchString === "") {
      return "";
    } else if (tool.frontmatter.title?.toLowerCase().includes(searchString)) {
      return tool;
    }
    // else if (
    //   tool.frontmatter.description?.toLowerCase().includes(searchString)
    // ) {
    //   return tool;
    // }
    else if (
      tool.frontmatter.category
        ?.map((item) => item.toLowerCase())
        .includes(searchString)
    ) {
      return tool;
    }
  });

  return {
    tools: searchTools,
  };
};

export default useSearchTool;
