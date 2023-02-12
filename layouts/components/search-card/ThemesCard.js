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

  return (
    <div
      className={` mb-10  flex-[1_0_50%] overflow-hidden border-r border-[#E9E9E9] px-8 dark:border-[#465765] ${
        themes.length ? "block" : "hidden"
      }`}
    >
      <h2 className="h6 mb-4 text-[#666666]">Themes</h2>
      <div className={`row ${resources.length ? "row-cols-2" : "row-cols-4"}`}>
        {themes.slice(0, 4).map((theme, i) => (
          <div key={`theme-${i}`} className=" col mb-4">
            <div className="rounded-md shadow-[0px_4px_34px_rgba(0,0,0,0.1)] ">
              <Link href={`/themes/${theme.slug}`}>
                <ImageFallback
                  src={`/themes/${theme.slug}.png`}
                  fallback={`https://teamosis-sg.vercel.app/api/img?url=${theme.frontmatter.demo}`}
                  height={160}
                  width={230}
                  alt={theme.frontmatter?.title}
                  className=" mb-4 block w-full rounded-t"
                />
              </Link>

              <div className="mb-2 px-4">
                <h3 className="h6 mb-3 text-base font-bold leading-4">
                  <Link
                    href={`/themes/${theme.slug}`}
                    className="line-clamp-1 hover:underline"
                  >
                    {theme.frontmatter.title}
                  </Link>
                </h3>

                <ToolsIcon
                  tools={tools}
                  type={toolsArray(theme)}
                  themeCard={true}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThemesCard;
