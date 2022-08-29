import config from "@config/config.json";
import { slugify } from "@lib/utils/textConverter";
import Image from "next/future/image";

const ToolsIcon = ({ tools, type, size }) => {
  const { darkIconList } = config;

  return (
    <>
      {type &&
        tools
          .filter((data) =>
            type
              .map((tool) => slugify(tool))
              .includes(slugify(data.frontmatter.title))
          )
          .map((icon, i) => (
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
    </>
  );
};

export default ToolsIcon;
