import useSearchBlog from "@hooks/useSearchBlog";
import useSearchResource from "@hooks/useSearchResource";
import useSearchTheme from "@hooks/useSearchTheme";
import Link from "next/link";
import ImageFallback from "../ImageFallback";

const BlogCard = () => {
  const { blogs } = useSearchBlog();
  const { themes } = useSearchTheme();
  const { resources } = useSearchResource();

  return (
    <div className={blogs.length ? "block" : "hidden"}>
      <h2 className="h6 mb-2 ml-8 text-text">Blog</h2>
      <div
        className={`scrollbar mb-6 overflow-y-auto overflow-x-hidden pt-4 pl-8 pr-2 ${
          resources.length ? "max-h-[225px]" : "max-h-[500px]"
        } ${blogs.length ? "block" : "hidden"}`}
      >
        <div
          className={`row ${
            themes.length || resources.length
              ? "row-cols-1"
              : "row-cols-1 lg:row-cols-2"
          } mb-2`}
        >
          {blogs.map((blog) => (
            <div key={blog.slug} className="col mb-4">
              <div className="relative rounded p-0 shadow dark:shadow-none lg:mr-2">
                <div className=" rounded transition duration-200 sm:flex">
                  <div className="flex w-full items-center rounded p-3 transition duration-200">
                    <ImageFallback
                      loading="lazy"
                      src={`/blogs/${blog.slug}.png`}
                      fallback={`https://teamosis-sg.vercel.app/api/img?url=${blog.frontmatter.slug}`}
                      alt={blog.frontmatter.title}
                      width={120}
                      height={90}
                      className="mr-4 block h-[90px] max-w-[120px] rounded object-cover lg:mr-8"
                    />

                    <div className="flex-1 bg-transparent sm:mt-0">
                      <h3 className="sm:h6 mb-[10px] flex items-center justify-between text-sm font-bold">
                        <Link
                          className="after:absolute after:inset-0"
                          href={`/${blog.slug}`}
                          rel="noopener noreferrer nofollow"
                          target="_blank"
                        >
                          {blog.frontmatter.title}
                        </Link>
                      </h3>
                      <span className="text-xs">{blog.frontmatter.author}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
