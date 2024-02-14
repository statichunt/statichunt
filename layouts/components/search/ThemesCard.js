/* eslint-disable @next/next/no-img-element */
import config from "@/config/config.json";
import useTooltip from "@/hooks/useTooltip";
import { slugify } from "@/lib/utils/textConverter";
import { useSearchContext } from "context/searchContext";
import Image from "next/image";
import Link from "next/link";

const ThemesCard = ({ themes, tools, blogs, setSearchModal }) => {
  const { isBlog, Tool } = useSearchContext();
  const { dark_icon_list } = config;

  const toolsIcon = (theme) => {
    const ssgIcon = theme.frontmatter?.ssg?.map((item) => item) || [];
    const cssIcon = theme.frontmatter?.css?.map((item) => item) || [];
    const cmsIcon = theme.frontmatter?.cms?.map((item) => item) || [];
    const categoryIcon = theme.frontmatter?.category?.map((item) => item) || [];
    return [...ssgIcon, ...cssIcon, ...cmsIcon, ...categoryIcon];
  };

  useTooltip();

  return (
    <div
      className={`row p-2 ${
        (blogs.length || tools.length) && (isBlog || Tool)
          ? "row-cols-1 sm:row-cols-2"
          : "row-cols-1 sm:row-cols-2 md:row-cols-3 lg:row-cols-4"
      }`}
    >
      {themes.map((theme, i) => (
        <div key={`theme-${i}`} className="col mb-4">
          <div className="relative rounded-md shadow">
            <img
              src={`https://statichunt-images.netlify.app/themes/thumbnails/${theme.slug}.webp`}
              height={130}
              width={230}
              alt={`Screenshot of ${theme.frontmatter?.title}`}
              className="mb-4 block h-auto w-full rounded-t"
            />

            <div className="px-4">
              <h3 className="h6 pb-1">
                <Link
                  className="stretched-link line-clamp-1 hover:underline"
                  href={`/themes/${theme.slug}`}
                  onClick={() => setSearchModal(false)}
                >
                  {theme.frontmatter.title}
                </Link>
              </h3>
              <div className="space-x-3 pb-2">
                {toolsIcon(theme).map(
                  (icon) =>
                    icon !== null && (
                      <span className="tooltip" data-tooltip={icon} key={icon}>
                        <Image
                          src={`/images/icons/${slugify(icon)}.svg`}
                          alt={icon}
                          key={icon}
                          height={15}
                          width={15}
                          className={`max-h-[15px] ${
                            dark_icon_list.includes(slugify(icon))
                              ? "dark:brightness-0 dark:invert"
                              : ""
                          }`}
                        />
                      </span>
                    ),
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ThemesCard;
