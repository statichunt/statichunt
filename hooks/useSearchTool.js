import { useSearchContext } from "context/searchContext";

const useSearchTool = () => {
  const { tools, searchKey } = useSearchContext();

  // search filtering
  let searchTools = tools.filter((tool) => {
    const searchString = searchKey.toLowerCase();
    if (searchString.length < 3) {
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
