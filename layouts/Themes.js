/* eslint-disable @next/next/no-img-element */
import ToolsIcon from "@/components/ToolsIcon";
import { dateFormat } from "@/lib/utils/dateFormat";
import { humanize, slugify } from "@/lib/utils/textConverter";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TbDownload, TbEye } from "react-icons/tb";
import InfiniteScroll from "react-infinite-scroll-component";

// change github data by sort functionality
const githubDataChange = (theme) => {
  const getStar = theme.frontmatter.github_star
    ? theme.frontmatter.github_star
    : 0;
  const star =
    getStar < 1000 ? getStar : parseFloat(getStar / 1000).toFixed(1) + "k";

  const getFork = theme.frontmatter.github_fork
    ? theme.frontmatter.github_fork
    : 0;
  const fork =
    getFork < 1000 ? getFork : parseFloat(getFork / 1000).toFixed(1) + "k";

  const updateDate = dateFormat(
    theme.frontmatter.update_date
      ? theme.frontmatter.update_date
      : theme.frontmatter.date,
    "dd/MM/yy",
  );
  const price = theme.frontmatter.price ? theme.frontmatter.price : 0;

  if (theme.type === "fork") {
    return price ? price : fork;
  } else if (theme.type === "update") {
    return updateDate;
  } else if (theme.type === "price") {
    return price;
  } else {
    return price ? price : star;
  }
};

const Themes = ({ themes, authors, className }) => {
  const [item, setItem] = useState(8);
  const [page, setPage] = useState(themes.slice(0, item));

  // getWindowDimensions
  const [windowSize, setWindowSize] = useState(768);
  useEffect(() => {
    function showViewport() {
      var width = Math.max(
        document.documentElement.clientWidth,
        window.innerWidth || 0,
      );
      setWindowSize(width);
    }
    showViewport();
    window.onresize = showViewport;
  }, []);

  useEffect(() => {
    setItem(windowSize < 768 ? 4 : 20);
  }, [windowSize]);

  const fetchData = () => {
    setItem(item + 20);
  };

  useEffect(() => {
    setPage(themes.slice(0, item));
  }, [item, themes]);

  return (
    <InfiniteScroll
      dataLength={page.length}
      next={fetchData}
      hasMore={true}
      className={`row !overflow-hidden px-2 py-4 ${className ? className : "sm:row-cols-2 xl:row-cols-3 2xl:row-cols-4 3xl:row-cols-5"}`}
    >
      {page.length > 0 ? (
        page.map((theme) => (
          <div className="mb-8" key={theme.slug}>
            <div className="theme-card">
              <Link href={`/themes/${theme.slug}`}>
                <img
                  src={`https://statichunt-images.netlify.app/themes/thumbnails/${theme.slug}.webp`}
                  height={240}
                  width={360}
                  alt={`Screenshot of ${theme.frontmatter?.title}`}
                  className="w-full rounded-t object-cover"
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = "/images/theme-placeholder.png";
                  }}
                />
              </Link>
              <div className="theme-card-body">
                <div className="flex justify-between">
                  <h4 className="h6 mb-0 text-lg font-medium">
                    <Link
                      href={`/themes/${theme.slug}`}
                      className="line-clamp-1 hover:underline"
                    >
                      {theme.frontmatter?.title}
                    </Link>
                  </h4>
                  <span
                    className="tooltip ml-2 mt-1 flex shrink-0 items-center whitespace-nowrap text-sm text-dark dark:text-white"
                    data-tooltip={humanize(
                      theme.frontmatter.price > 0 && theme.type != "update"
                        ? "Price"
                        : theme.type
                          ? theme.type
                          : "Star",
                    )}
                  >
                    {theme.type === "price" ? (
                      githubDataChange(theme) !== 0 && (
                        <img
                          className="mr-1 inline max-h-[14px] align-text-bottom dark:invert"
                          src={`/images/icons/${
                            theme.frontmatter.price > 0 &&
                            theme.type != "update"
                              ? "price"
                              : theme.type
                                ? theme.type
                                : "star"
                          }.svg`}
                          alt="github icon"
                          height="14"
                          width="14"
                        />
                      )
                    ) : (
                      <img
                        className="mr-1 inline max-h-[14px] align-text-bottom dark:invert"
                        src={`/images/icons/${
                          theme.frontmatter.price > 0 && theme.type != "update"
                            ? "price"
                            : theme.type
                              ? theme.type
                              : "star"
                        }.svg`}
                        alt="github icon"
                        height="14"
                        width="14"
                      />
                    )}
                    {theme.type === "price"
                      ? githubDataChange(theme) !== 0
                        ? githubDataChange(theme)
                        : "Free"
                      : githubDataChange(theme)}
                  </span>
                </div>
                <span className="text-xs">
                  by{" "}
                  {authors
                    .map((author) => author.slug)
                    .includes(slugify(theme.frontmatter?.author)) ? (
                    <Link
                      href={`/authors/${slugify(theme.frontmatter?.author)}`}
                      className={`${
                        theme.frontmatter?.author === "Statichunt"
                          ? "bg-gradient-to-r from-primary to-secondary bg-clip-text font-bold text-transparent"
                          : "hover:underline"
                      }`}
                    >
                      {theme.frontmatter?.author}
                    </Link>
                  ) : theme.frontmatter?.author ? (
                    theme.frontmatter?.author
                  ) : (
                    theme.frontmatter?.github?.match(
                      /github\.com\/([^\/]+)/,
                      "",
                    )[0]
                  )}
                </span>
              </div>
              <div className="theme-card-footer">
                <div className="flex-wrap">
                  <ToolsIcon item={theme} category={false} />
                </div>
                <div className="ml-auto flex items-center whitespace-nowrap">
                  <Link
                    href={`/demo/${theme.slug}`}
                    className="btn btn-sm btn-demo svg-block mb-2 mr-1 leading-none"
                    target="_blank"
                    rel="noopener nofollow"
                    data-tooltip="Preview"
                    aria-label="Preview Theme"
                  >
                    <TbEye />
                  </Link>
                  <Link
                    href={`${
                      theme.frontmatter.github
                        ? theme.frontmatter.github
                        : theme.frontmatter.download
                    }${theme.frontmatter.download?.includes("?ref=") ? "" : "?ref=statichunt.com"}`}
                    className="btn btn-sm btn-download svg-align-bottom mb-2 pr-2 leading-none"
                    target="_blank"
                    rel={`noopener ${
                      theme.frontmatter?.price ? "sponsor" : "nofollow"
                    }`}
                    data-tooltip="Download"
                    aria-label="Download Theme"
                  >
                    <>
                      <span className="mr-1 hidden lg:inline">Get</span>
                      <TbDownload />
                    </>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <h1>No Themes Found!</h1>
      )}
    </InfiniteScroll>
  );
};

export default Themes;
