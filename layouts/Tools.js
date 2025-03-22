import { humanize } from "@/lib/utils/textConverter";
import Link from "next/link";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const Tools = ({ tools }) => {
  const [item, setItem] = useState(8);
  const [page, setPage] = useState(tools.slice(0, item));

  const fetchData = () => {
    setItem(item + 20);
  };

  useEffect(() => {
    setPage(tools.slice(0, item));
  }, [item, tools]);

  return (
    <InfiniteScroll
      dataLength={page.length}
      next={fetchData}
      hasMore={true}
      className="row"
    >
      {page.map((tool) => (
        <div
          className="xl:col-4 2xl:col-3 md:col-6 col-12 mb-6"
          key={tool.slug}
        >
          <div className="shadow overflow-hidden rounded-md h-full relative">
            <div className="flex p-4 items-center bg-theme-light dark:bg-theme-dark">
              <div className="size-[80px] shrink-0 bg-white dark:bg-darkmode-theme-dark flex items-center justify-center rounded">
                <img
                  src={`https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${tool.frontmatter.website}&size=64`}
                  alt={`${tool.frontmatter.title} Icon`}
                  width={55}
                  height={55}
                  loading="lazy"
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = "/images/theme-placeholder.png";
                  }}
                />
              </div>
              <div className="ml-4">
                <h3 className="text-h4 mb-1">
                  <Link className="stretched-link" href={`/tools/${tool.slug}`}>
                    {tool.frontmatter.title}
                  </Link>
                </h3>
                <p className="mb-3 text-sm text-text dark:text-light">
                  {tool.frontmatter.type?.join(", ")}
                </p>
              </div>
            </div>
            <div className="p-4">
              <p className="text-text dark:text-light">
                {humanize(tool.frontmatter.description)}
              </p>
              {/* <ul className="mt-4 mb-0">
                {tool.frontmatter.type?.map((tag) => (
                  <li
                    className="inline-block mr-2 mb-2 px-2 py-1 rounded-md text-primary bg-theme-light dark:bg-darkmode-theme-dark text-sm"
                    key={tag}
                  >
                    {tag}
                  </li>
                ))}
              </ul> */}
            </div>
          </div>
        </div>
      ))}
    </InfiniteScroll>
  );
};

export default Tools;
