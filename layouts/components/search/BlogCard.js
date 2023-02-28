import { useSerachContext } from "context/searchContext";
import Link from "next/link";
import ImageFallback from "../ImageFallback";

const BlogCard = ({ blogs, themes, resources, setSearchModal }) => {
  const { isTheme, isResource } = useSerachContext();
  return (
    <div
      className={`row p-2 ${
        (resources.length || themes.length) && (isResource || isTheme)
          ? "row-cols-1"
          : "row-cols-1 lg:row-cols-2"
      }`}
    >
      {blogs.map((blog) => (
        <div key={blog.slug} className="col mb-4">
          <div className="relative rounded shadow">
            <div className="rounded sm:flex">
              <div className="flex w-full items-center rounded p-3">
                {blog.frontmatter.image ? (
                  <ImageFallback
                    src={blog.frontmatter.image}
                    alt={blog.frontmatter.title}
                    width={120}
                    height={80}
                    className="mr-4 block h-[80px] max-w-[120px] rounded object-cover lg:mr-8"
                  />
                ) : (
                  <span className="mr-4 flex h-[80px] max-h-full w-full max-w-[120px] items-center justify-center rounded bg-theme-light text-[4rem] text-dark dark:bg-darkmode-theme-light dark:text-darkmode-dark lg:mr-8">
                    {blog.frontmatter.title.charAt(0)}
                  </span>
                )}
                <div className="flex-1 bg-transparent sm:mt-0">
                  <h3 className="h6">
                    <Link
                      className="stretched-link hover:underline"
                      href={`/${blog.slug}`}
                      onClick={() => setSearchModal(false)}
                    >
                      {blog.frontmatter.title}
                    </Link>
                  </h3>
                  {/* <span className="text-xs">{blog.frontmatter.author}</span> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogCard;
