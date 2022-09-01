import { dateFormat } from "@lib/utils/dateFormat";
import { humanize } from "@lib/utils/textConverter";
import { toolsArray } from "@lib/utils/toolsArray";
import Image from "next/future/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TbDownload, TbEye } from "react-icons/tb";
import InfiniteScroll from "react-infinite-scroll-component";
import ToolsIcon from "./ToolsIcon";
// change github data by sort fuctionality
const githubDataChange = (theme) => {
  if (theme.type === "fork") {
    const fork =
      theme.frontmatter?.github_fork < 1000
        ? theme.frontmatter?.github_fork
        : parseFloat(theme.frontmatter?.github_fork / 1000).toFixed(1) + "k";
    return fork;
  } else if (theme.type === "update") {
    const updateDate = dateFormat(theme.frontmatter.update_date, "dd/MM/yy");
    return updateDate;
  } else {
    const star =
      theme.frontmatter?.github_star < 1000
        ? theme.frontmatter?.github_star
        : parseFloat(theme.frontmatter?.github_star / 1000).toFixed(1) + "k";
    return star;
  }
};

const Themes = ({ themes, tools, customRowClass, customColClass }) => {
  const [item, setItem] = useState(4);
  const [page, setPage] = useState(themes.slice(0, item));

  // getWindowDimensions
  const [windowSize, setWindowSize] = useState(768);
  useEffect(() => {
    function showViewport() {
      var width = Math.max(
        document.documentElement.clientWidth,
        window.innerWidth || 0
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

  // tooltip
  useEffect(() => {
    var tooltipEl = document.querySelectorAll(".has-tooltip");
    if (tooltipEl) {
      var tooltipItems = document.querySelectorAll(".tooltip-label");
      tooltipItems.forEach((item) => {
        item.remove();
      });
      var length = tooltipEl.length;
      for (var i = 0; i < length; i++) {
        var attr = tooltipEl[i].getAttribute("data-tooltip");
        var x = document.createElement("SPAN");
        var t = document.createTextNode(attr);
        x.appendChild(t);
        x.className = "tooltip-label";
        tooltipEl[i].appendChild(x);
      }
    }
  });

  return (
    <InfiniteScroll
      dataLength={page.length}
      next={fetchData}
      hasMore={true}
      className={customRowClass ? customRowClass : "row !overflow-hidden py-4"}
    >
      {/* <div > */}
      {page.map((theme, i) => (
        <div
          className={
            customColClass
              ? customColClass
              : "col-12 mb-8 sm:col-6 md:col-4 lg:col-6 xl:col-4 2xl:col-3"
          }
          key={`theme-${i}`}
        >
          <div className="theme-card">
            <Link href={`/themes/${theme.slug}`} passHref>
              <a className="img-cover">
                <Image
                  src={`/themes/${theme.slug}.png`}
                  height={250}
                  width={300}
                  alt={theme.frontmatter?.title}
                  className="rounded-t"
                />
              </a>
            </Link>
            <div className="theme-card-body">
              <div className="flex justify-between">
                <h2 className="h6 mb-0 text-lg font-medium">
                  <Link href={`/themes/${theme.slug}`} passHref>
                    <a className="line-clamp-1 hover:underline">
                      {theme.frontmatter?.title}
                    </a>
                  </Link>
                </h2>
                <span
                  className="has-tooltip ml-2 mt-1 flex shrink-0 items-center whitespace-nowrap text-sm text-dark"
                  data-tooltip={theme.type ? humanize(theme.type) : "Star"}
                >
                  <Image
                    className="mr-1 inline max-h-[14px] align-text-bottom dark:invert"
                    src={`/images/icons/${
                      theme.type ? theme.type : "star"
                    }.svg`}
                    alt="github icon"
                    height="14"
                    width="14"
                  />
                  <span className="dark:invert">{githubDataChange(theme)}</span>
                </span>
              </div>
              <span className="text-xs text-dark dark:text-light">
                by{" "}
                {theme.frontmatter?.author === "Statichunt" ? (
                  <Link href="/theme-by-us" passHref>
                    <a className="bg-gradient-to-r from-primary to-secondary bg-clip-text font-bold text-transparent">
                      Statichunt
                    </a>
                  </Link>
                ) : theme.frontmatter?.author ? (
                  theme.frontmatter?.author
                ) : (
                  theme.frontmatter?.github.match(
                    /github\.com\/([^\/]+)/,
                    ""
                  )[0]
                )}
              </span>
            </div>
            <div className="theme-card-footer">
              <div className="flex-wrap">
                <ToolsIcon
                  tools={tools}
                  type={toolsArray(theme)}
                  themeCard={true}
                />
                {/* <ToolsIcon tools={tools} type={theme.frontmatter?.cms} />
                <ToolsIcon tools={tools} type={theme.frontmatter?.css} /> */}

                {/* <ToolsIcon tools={tools} type={theme.frontmatter?.category} /> */}
              </div>
              <div className="ml-auto flex items-center whitespace-nowrap">
                <Link href={`/demo/${theme.slug}`}>
                  <a
                    className="btn btn-sm btn-demo svg-block mb-2 mr-1 leading-none"
                    target="_blank"
                    rel="noopener nofollow"
                    data-tooltip="Preview"
                    aria-label="Preview Theme"
                  >
                    <TbEye />
                  </a>
                </Link>
                <Link href={`${theme.frontmatter?.github}?ref=statichunt.com`}>
                  <a
                    className="btn btn-sm btn-download svg-align-bottom mb-2 pr-2 leading-none"
                    target="_blank"
                    rel="noopener nofollow"
                    data-tooltip="Download"
                    aria-label="Download Theme"
                  >
                    <span className="mr-1 hidden lg:inline">Get</span>
                    <TbDownload />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
      {/* </div> */}
    </InfiniteScroll>
  );
};

export default Themes;
