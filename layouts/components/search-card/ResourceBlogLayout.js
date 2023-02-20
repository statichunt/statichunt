import useSearchBlog from "@hooks/useSearchBlog";
import useSearchResource from "@hooks/useSearchResource";
// import BlogCard from "./BlogCard";
import ResourceCard from "./ResourceCard";

const ResourceBlogLayout = () => {
  const { resources } = useSearchResource();
  const { blogs } = useSearchBlog();
  return (
    <div
      className={`flex-[1_0_50%] rounded ${
        blogs.length || resources.length ? "block" : "hidden"
      } pr-8`}
    >
      <ResourceCard />
      {/* <BlogCard /> */}
    </div>
  );
};

export default ResourceBlogLayout;
