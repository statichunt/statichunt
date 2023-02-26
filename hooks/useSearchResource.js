import { useSerachContext } from "context/searchContext";

const useSearchResource = () => {
  const { resources, searchKey } = useSerachContext();

  // search filtering
  let searchResource = resources.filter((resource) => {
    const searchString = searchKey.toLowerCase();
    if (searchString === "") {
      return "";
    } else if (
      resource.frontmatter.title?.toLowerCase().includes(searchString)
    ) {
      return resource;
    }
    // else if (
    //   resource.frontmatter.description?.toLowerCase().includes(searchString)
    // ) {
    //   return resource;
    // }
    else if (
      resource.frontmatter.tool
        ?.map((el) => el.toLowerCase())
        .includes(searchString)
    ) {
      return resource;
    }
  });

  return {
    resources: searchResource,
  };
};

export default useSearchResource;
