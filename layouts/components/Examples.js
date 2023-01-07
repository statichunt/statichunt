import { simplifyURL } from "@lib/utils/textConverter";
import { toolsArray } from "@lib/utils/toolsArray";
import Link from "next/link";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ImageFallback from "./ImageFallback";
import ToolsIcon from "./ToolsIcon";

const Examples = ({ examples, tools, customRowClass, customColClass }) => {
  const [item, setItem] = useState(4);
  const [page, setPage] = useState(examples.slice(0, item));

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
    setPage(examples.slice(0, item));
  }, [item, examples]);

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
      {page.length > 0 ? (
        page.map((example) => (
          <div
            className={
              customColClass
                ? customColClass
                : "mb-8 sm:col-6 xl:col-4 2xl:col-3"
            }
            key={example.slug}
          >
            <div className="theme-card">
              <ImageFallback
                src={`/examples/${example.slug}.png`}
                fallback={`https://teamosis-sg.vercel.app/api/img?url=${example.frontmatter.website}`}
                height={240}
                width={360}
                alt={example.frontmatter?.title}
                className="w-full rounded-t"
              />
              <div className="theme-card-body">
                <h2 className="h6 mb-0 text-lg font-medium">
                  <Link
                    href={example.frontmatter.website}
                    className="line-clamp-1 hover:underline"
                  >
                    {simplifyURL(example.frontmatter.website)}
                  </Link>
                </h2>
              </div>
              <div className="theme-card-footer">
                <div className="flex-wrap">
                  <ToolsIcon
                    tools={tools}
                    type={toolsArray(example)}
                    exampleCard={true}
                  />
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <h1>No Examples Found!</h1>
      )}
    </InfiniteScroll>
  );
};

export default Examples;
