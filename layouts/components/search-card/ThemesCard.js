import useSearchBlog from "@hooks/useSearchBlog";
import useSearchResource from "@hooks/useSearchResource";
import useSearchTheme from "@hooks/useSearchTheme";
import { toolsArray } from "@lib/utils/toolsArray";
import { useSerachContext } from "context/searchContext";
import Link from "next/link";
import React from "react";
import ImageFallback from "../ImageFallback";
import ToolsIcon from "../ToolsIcon";

const ThemesCard = () => {
  const { tools } = useSerachContext();
  const { themes } = useSearchTheme();
  const { resources } = useSearchResource();
  const { blogs } = useSearchBlog();

  return (
    <div
      className={`  flex-[1_0_50%] overflow-hidden ${
        themes.length ? "block" : "hidden"
      } `}
    >
      <h2 className="h6 mb-2 ml-8 text-text">Themes</h2>
      <div className="scrollbar max-h-[470px] overflow-y-auto overflow-x-hidden pt-2 pl-6 pr-2 sm:pt-4 sm:pl-8 ">
        <div
          className={`row ${
            resources.length || blogs.length
              ? "row-cols-2"
              : "row-cols-1 sm:row-cols-2 md:row-cols-3 lg:row-cols-4"
          }  `}
        >
          {themes.slice(0).map((theme, i) => (
            <div key={`theme-${i}`} className={`col mb-6 `}>
              <div className="relative mr-2 rounded-md shadow-[0px_4px_34px_rgba(0,0,0,0.1)]">
                <ImageFallback
                  src={`/themes/${theme.slug}.png`}
                  fallback={`https://teamosis-sg.vercel.app/api/img?url=${theme.frontmatter.demo}`}
                  height={130}
                  width={230}
                  alt={theme.frontmatter?.title}
                  className=" mb-4 block h-auto w-full rounded-t"
                />

                <div className=" px-4">
                  <h3 className="h6 mb-3 text-base font-bold leading-4">
                    {theme.frontmatter.title}
                  </h3>

                  <ToolsIcon
                    tools={tools}
                    type={toolsArray(theme)}
                    themeCard={true}
                  />
                </div>
                <Link
                  className="after:absolute after:inset-0 "
                  href={`/themes/${theme.slug}`}
                ></Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemesCard;
