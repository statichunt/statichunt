import config from "@config/config.json";
import { slugify } from "@lib/utils/textConverter";
import Image from "next/image";
import { useEffect } from "react";
import tools from "../../.json/tools.json";

const ToolsIcon = ({
  item,
  trim = 10,
  size = 18,
  ssg = true,
  css = true,
  cms = true,
  category = true,
}) => {
  const { darkIconList } = config;

  let ssgArray = [];
  let cssArray = [];
  let cmsArray = [];
  let categoryArray = [];

  if (ssg && item.frontmatter?.ssg) {
    ssgArray = item.frontmatter?.ssg;
  }
  if (css && item.frontmatter?.css) {
    cssArray = item.frontmatter?.css;
  }
  if (cms && item.frontmatter?.cms) {
    cmsArray = item.frontmatter?.cms;
  }
  if (category && item.frontmatter?.category) {
    categoryArray = item.frontmatter?.category;
  }

  const allTools = [...ssgArray, ...cssArray, ...cmsArray, ...categoryArray];

  const filteredTools = tools.filter((data) =>
    allTools
      .map((tool) => slugify(tool))
      .includes(slugify(data.frontmatter.title))
  );

  const toolsLength = filteredTools.length;

  // tooltip
  useEffect(() => {
    var tooltipEl = document.querySelectorAll(".tooltip");
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
    <>
      {toolsLength === trim
        ? filteredTools.map(
            (icon, i) =>
              i < trim && (
                <span
                  className="tooltip mr-3 mb-2"
                  data-tooltip={icon.frontmatter.title}
                  key={`icon-${i}`}
                >
                  <Image
                    width={size ? size : 18}
                    height={size ? size : 18}
                    alt={icon.frontmatter.title}
                    src={icon.frontmatter.icon}
                    style={{ maxHeight: size ? size : "18px" }}
                    className={
                      darkIconList.includes(slugify(icon.frontmatter.title))
                        ? "dark:brightness-0 dark:invert"
                        : ""
                    }
                  />
                </span>
              )
          )
        : toolsLength >= trim
        ? filteredTools.map(
            (icon, i) =>
              i < trim - 1 && (
                <span
                  className="tooltip mr-3 mb-2"
                  data-tooltip={icon.frontmatter.title}
                  key={`icon-${i}`}
                >
                  <Image
                    width={size ? size : 18}
                    height={size ? size : 18}
                    alt={icon.frontmatter.title}
                    src={icon.frontmatter.icon}
                    style={{ maxHeight: size ? size : "18px" }}
                    className={
                      darkIconList.includes(slugify(icon.frontmatter.title))
                        ? "dark:brightness-0 dark:invert"
                        : ""
                    }
                  />
                </span>
              )
          )
        : filteredTools.map((icon, i) => (
            <span
              className="tooltip mr-3 mb-2"
              data-tooltip={icon.frontmatter.title}
              key={`icon-${i}`}
            >
              <Image
                width={size ? size : 18}
                height={size ? size : 18}
                alt={icon.frontmatter.title}
                src={icon.frontmatter.icon}
                style={{ maxHeight: size ? size : "18px" }}
                className={
                  darkIconList.includes(slugify(icon.frontmatter.title))
                    ? "dark:brightness-0 dark:invert"
                    : ""
                }
              />
            </span>
          ))}
      {filteredTools.length >= trim + 1 && (
        <span className="tooltip-static mr-3 mb-2">
          + {filteredTools.length - (trim - 1)}
          <span className="tooltip-static-label">
            {filteredTools.slice(trim - 1).map((icon, i) => (
              <p key={i}>{icon.frontmatter.title}</p>
            ))}
          </span>
        </span>
      )}
    </>
  );
};

export default ToolsIcon;
