import { useSearchContext } from "context/searchContext";

const useSearchTheme = () => {
  const { themes, searchKey } = useSearchContext();

  let searchTheme = themes.filter((theme) => {
    const searchString = searchKey.toLowerCase();
    if (searchString.length < 3) {
      return "";
    } else if (theme.frontmatter.title?.toLowerCase().includes(searchString)) {
      return theme;
    }
    // else if (
    //   theme.frontmatter.description?.toLowerCase().includes(searchString)
    // ) {
    //   return theme;
    // }
    else if (
      theme.frontmatter?.ssg
        ?.map((el) => el?.toLowerCase())
        .includes(searchString)
    ) {
      return theme;
    } else if (
      theme.frontmatter?.category
        ?.map((el) => el?.toLowerCase())
        .includes(searchString)
    ) {
      return theme;
    } else if (
      theme.frontmatter?.css
        ?.map((el) => el?.toLowerCase())
        .includes(searchString)
    ) {
      return theme;
    } else if (
      theme.frontmatter?.cms
        ?.map((el) => el?.toLowerCase())
        .includes(searchString)
    ) {
      return theme;
    } else if (
      theme.frontmatter?.author?.toLowerCase().includes(searchString)
    ) {
      return theme;
    }
  });

  return {
    themes: searchTheme,
  };
};

export default useSearchTheme;
