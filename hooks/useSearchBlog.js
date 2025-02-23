import { useSearchContext } from "context/searchContext";

const useSearchBlog = () => {
  const { blogs, searchKey } = useSearchContext();

  // search filtering
  let searchBlog = blogs.filter((blog) => {
    const searchString = searchKey.toLowerCase();
    if (searchString.length < 3) {
      return "";
    } else if (blog.frontmatter.title?.toLowerCase().includes(searchString)) {
      return blog;
    }
    // else if (
    //   blog.frontmatter.description?.toLowerCase().includes(searchString)
    // ) {
    //   return blog;
    // }
    else if (
      blog.frontmatter.categories
        ?.map((el) => el.toLowerCase())
        .includes(searchString)
    ) {
      return blog;
    }
  });

  return {
    blogs: searchBlog,
  };
};

export default useSearchBlog;
