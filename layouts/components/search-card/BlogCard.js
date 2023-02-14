import useSearchBlog from "@hooks/useSearchBlog";
import useSearchResource from "@hooks/useSearchResource";
import useSearchTheme from "@hooks/useSearchTheme";
import Link from "next/link";
import React from "react";
import ImageFallback from "../ImageFallback";

const BlogCard = () => {
  const { blogs } = useSearchBlog();
  const { themes } = useSearchTheme();
  const { resources } = useSearchResource();

  return (
    <div className={blogs.length ? "block" : "hidden"}>
      <h2 className="h6  ml-8 text-text">Blog</h2>
      <div
        className={`scrollbar ${
          resources.length ? "max-h-[210px]" : "max-h-[420px]"
        } overflow-y-auto overflow-x-hidden ${
          blogs.length ? "block" : "hidden"
        } pl-8 pr-2 pt-4 `}
      >
        <div
          className={`row ${
            themes.length || resources.length ? "row-cols-1" : "row-cols-2"
          } mb-2`}
        >
          {blogs.map((blog) => (
            <div key={blog.slug} className="col mb-4 ">
              <div className="relative mr-2 rounded-[4px] p-0 shadow-[0px_4px_30px_rgba(0,0,0,0.06)] dark:bg-[#2D3B44] dark:shadow-none">
                <div className=" rounded-[4px] transition duration-200 sm:flex">
                  <div className=" w-full items-center rounded-[4px]  p-3 transition duration-200 sm:flex">
                    <ImageFallback
                      loading="lazy"
                      src={`/blogs/${blog.slug}.png`}
                      fallback={`https://teamosis-sg.vercel.app/api/img?url=${blog.frontmatter.slug}`}
                      alt="{blogs.frontmatter.title}"
                      width={120}
                      height={60}
                      className="mr-8 max-w-[120px] rounded-[4px]"
                    />

                    <div className="width-full  flex-1 bg-transparent sm:mt-0">
                      <h3 className="h6  mb-[10px] flex items-center justify-between text-base font-bold ">
                        {blog.frontmatter.title}
                      </h3>

                      <span className="text-xs">{blog.frontmatter.author}</span>
                    </div>
                  </div>
                </div>
                <Link
                  className="after:absolute after:inset-0"
                  href={`/${blog.slug}`}
                  rel="noopener noreferrer nofollow"
                  target="_blank"
                ></Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
