import config from "@config/config.json";
import { slugify } from "@lib/utils/textConverter";
import Image from "next/future/image";

const ToolsIcon = ({ tools, type, size, themeCard }) => {
  const { darkIconList } = config;

  const filteredTools = tools.filter((data) =>
    type?.map((tool) => slugify(tool)).includes(slugify(data.frontmatter.title))
  );

  const toolsLength = filteredTools.length;

  return (
    <>
      {type &&
        (themeCard ? (
          <>
            {toolsLength === 4
              ? filteredTools.map(
                  (icon, i) =>
                    i < 4 && (
                      <span
                        className="has-tooltip mr-3 mb-2"
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
                            darkIconList.includes(
                              slugify(icon.frontmatter.title)
                            )
                              ? "dark:invert"
                              : ""
                          }
                        />
                      </span>
                    )
                )
              : toolsLength >= 4
              ? filteredTools.map(
                  (icon, i) =>
                    i < 3 && (
                      <span
                        className="has-tooltip mr-3 mb-2"
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
                            darkIconList.includes(
                              slugify(icon.frontmatter.title)
                            )
                              ? "dark:invert"
                              : ""
                          }
                        />
                      </span>
                    )
                )
              : filteredTools.map((icon, i) => (
                  <span
                    className="has-tooltip mr-3 mb-2"
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
                          ? "dark:invert"
                          : ""
                      }
                    />
                  </span>
                ))}
            {filteredTools.length >= 5 && (
              <span className="has-tooltip-static mr-3 mb-2">
                + {filteredTools.length - 3}
                <span className="tooltip-label-static">
                  {filteredTools.slice(3).map((icon, i) => (
                    <p key={i}>{icon.frontmatter.title}</p>
                  ))}
                </span>
              </span>
            )}
          </>
        ) : (
          filteredTools.map((icon, i) => (
            <span
              className="has-tooltip mr-3 mb-2"
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
                    ? "dark:invert"
                    : ""
                }
              />
            </span>
          ))
        ))}
    </>
  );
};

export default ToolsIcon;
