import config from "@/config/config.json";
import useTooltip from "@/hooks/useTooltip";
import { slugify } from "@/lib/utils/textConverter";
import Image from "next/image";
import tools from "../../.json/theme-tools.json";

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
      .includes(slugify(data.frontmatter.title)),
  );

  const toolsLength = filteredTools.length;

  useTooltip();

  return (
    <>
      {toolsLength === trim
        ? filteredTools.map(
            (icon, i) =>
              i < trim && (
                <span
                  className="tooltip mb-2 mr-3"
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
              ),
          )
        : toolsLength >= trim
        ? filteredTools.map(
            (icon, i) =>
              i < trim - 1 && (
                <span
                  className="tooltip mb-2 mr-3"
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
              ),
          )
        : filteredTools.map((icon, i) => (
            <span
              className="tooltip mb-2 mr-3"
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
        <span className="tooltip-static mb-2 mr-3">
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
