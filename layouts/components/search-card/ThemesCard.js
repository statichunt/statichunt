import { toolsArray } from "@lib/utils/toolsArray";
import { useSerachContext } from "context/searchContext";
import Link from "next/link";
import React from "react";
import ImageFallback from "../ImageFallback";
import ToolsIcon from "../ToolsIcon";

const ThemesCard = () => {
  const { themes, searchKey, tools } = useSerachContext();

  let searchtTheme = themes.filter((theme) => {
    const searchString = searchKey.toLowerCase();
    if (searchString === "") {
      return "";
    } else if (theme.frontmatter.title.toLowerCase().includes(searchString)) {
      return theme;
    } else if (
      theme.frontmatter.description?.toLowerCase().includes(searchString)
    ) {
      return theme;
    } else if (
      theme.frontmatter?.ssg
        ?.map((el) => el?.toLowerCase())
        .includes(searchString)
    ) {
      return theme;
    } else if (
      theme.frontmatter?.category
        ?.map((el) => el?.toLowerCase())
        .includes(searchString)
    ) {
      return theme;
    } else if (
      theme.frontmatter?.css
        ?.map((el) => el?.toLowerCase())
        .includes(searchString)
    ) {
      return theme;
    } else if (
      theme.frontmatter?.cms
        ?.map((el) => el?.toLowerCase())
        .includes(searchString)
    ) {
      return theme;
    } else if (theme.frontmatter.author.toLowerCase().includes(searchString)) {
      return theme;
    }
  });

  return (
    <div
      className={` flex-[1_0_50%]  overflow-hidden  border-r border-border p-4 ${
        searchtTheme.length ? "block" : "hidden"
      }`}
    >
      <h1 className="h4 ml-3 mb-2">Themes</h1>
      <div className="flex flex-wrap justify-center ">
        {searchtTheme.slice(0, 4).map((theme, i) => (
          <div key={`theme-${i}`} className="ml-3 mb-4 rounded-md shadow-md">
            <Link href={`/themes/${theme.slug}`}>
              <ImageFallback
                src={`/themes/${theme.slug}.png`}
                fallback={`https://teamosis-sg.vercel.app/api/img?url=${theme.frontmatter.demo}`}
                height={145}
                width={190}
                alt={theme.frontmatter?.title}
                className="mb-2 block rounded-t"
              />
            </Link>

            <div className="px-2 ">
              <div className="flex justify-between">
                <h2 className="h6 mb-0 text-lg font-medium">
                  <Link
                    href={`/themes/${theme.slug}`}
                    className="line-clamp-1 hover:underline"
                  >
                    {theme.frontmatter.title}
                  </Link>
                </h2>
              </div>
              <ToolsIcon
                tools={tools}
                type={toolsArray(theme)}
                themeCard={true}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThemesCard;
