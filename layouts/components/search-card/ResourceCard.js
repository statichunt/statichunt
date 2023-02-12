import useSearchResource from "@hooks/useSearchResource";
import useSearchTheme from "@hooks/useSearchTheme";
import { humanize } from "@lib/utils/textConverter";
import { useSerachContext } from "context/searchContext";
import React, { useEffect } from "react";
import ImageFallback from "../ImageFallback";

const ResourceCard = () => {
  const { themes } = useSearchTheme();
  const { resources } = useSearchResource();
  return (
    <div
      className={`flex-[1_0_50%]  rounded px-8  ${
        resources.length ? "block" : "hidden"
      }`}
    >
      <h2 className="h6 mb-4 text-[#666666]">Resources</h2>
      <div className={`row ${themes.length ? "row-cols-1" : "row-cols-2"}`}>
        {resources.slice(0, 2).map((resource) => (
          <div key={resource.slug} className="col mb-6 ">
            <div className="rounded-[4px] p-0 shadow-[0px_4px_34px_rgba(0,0,0,0.1)] hover:bg-[#0596690f] dark:bg-[#2D3B44] dark:shadow-none">
              <div className="group rounded-[4px]   transition duration-200   sm:flex">
                <div className="group w-full items-center rounded-[4px]  p-4 transition  duration-200  sm:flex">
                  <ImageFallback
                    loading="lazy"
                    src={`/resources/${resource.slug}.png`}
                    fallback={`https://teamosis-sg.vercel.app/api/img?url=${resource.frontmatter.website}`}
                    alt="{resources.frontmatter.title}"
                    width={160}
                    height={100}
                    className="mr-8 max-w-[160px] rounded-[4px]"
                  />

                  <div className="width-full mt-4 flex-1 bg-transparent sm:mt-0">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="h5  flex items-center pt-2 text-base font-bold ">
                        {resource.frontmatter.title}
                        <a
                          href={`${resource.frontmatter.website}?ref=statichunt.com`}
                          rel="noopener noreferrer nofollow"
                          target="_blank"
                        >
                          <svg
                            className="ml-3 hidden text-primary group-hover:inline"
                            width="15"
                            height="16"
                            viewBox="0 0 13 14"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g
                              stroke="currentColor"
                              strokeWidth="1.5"
                              fill="none"
                              fillRule="evenodd"
                            >
                              <path d="M9.6 4H4.2a2.4 2.4 0 00-2.4 2.4V10"></path>
                              <path d="M6.6 7l3-3-3-3m5.4 9v3H0"></path>
                            </g>
                          </svg>
                        </a>
                      </h3>

                      {resource.frontmatter.tool?.map((tool, i) => (
                        <span
                          key={`tool-${i}`}
                          className="rounded border border-border px-3 py-1 text-xs"
                        >
                          {humanize(tool)}
                        </span>
                      ))}
                    </div>
                    <p className="mb-3 text-sm font-normal text-[#666666] dark:text-light">
                      {resource.frontmatter.description.slice(0, 40)}....
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourceCard;
