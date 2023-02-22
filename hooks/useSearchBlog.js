import { useSerachContext } from "context/searchContext";

const useSearchBlog = () => {
  const { blogs, searchKey } = useSerachContext();

  // search filtering
  let searchBlog = blogs.filter((blog) => {
    const searchString = searchKey.toLowerCase();
    if (searchString === "") {
      return "";
    } else if (blog.frontmatter.title?.toLowerCase().includes(searchString)) {
      return blog;
    } else if (
      blog.frontmatter.description?.toLowerCase().includes(searchString)
    ) {
      return blog;
    } else if (
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
