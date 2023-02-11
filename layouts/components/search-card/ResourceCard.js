import { humanize } from "@lib/utils/textConverter";
import { useSerachContext } from "context/searchContext";
import React from "react";
import ImageFallback from "../ImageFallback";

const ResourceCard = () => {
  const { resources, searchKey } = useSerachContext();
  // const searchFunction = (searchtext, existingText) => {
  //   return searchtext
  //     .split(" ")
  //     .map((data) => existingText.split(" ").includes(data))
  //     .includes(true);
  // };

  // search filtering
  let searchResource = resources.filter((resource) => {
    const searchString = searchKey.toLowerCase();
    if (searchString === "") {
      return "";
    } else if (
      resource.frontmatter.title.toLowerCase().includes(searchString)
    ) {
      return resource;
    } else if (
      resource.frontmatter.description.toLowerCase().includes(searchString)
    ) {
      return resource;
    } else if (
      resource.frontmatter.tool
        .map((el) => el.toLowerCase())
        .includes(searchString)
    ) {
      return resource;
    }
  });

  console.log("resource", searchResource);
  return (
    <div
      className={`flex-[1_0_50%] overflow-hidden rounded shadow-sm ${
        searchResource.length ? "block" : "hidden"
      }`}
    >
      <div className="row justify-center">
        {resources.map((resource) => (
          <div className="mb-10 xl:col-10" key={resource.slug}>
            <div className="group rounded-[4px] bg-gradient-to-r from-white to-[#ffffff00] transition duration-200 hover:bg-[#0596690f] dark:from-darkmode-body sm:flex">
              <ImageFallback
                loading="lazy"
                src={`/resources/${resource.slug}.png`}
                fallback={`https://teamosis-sg.vercel.app/api/img?url=${resource.frontmatter.website}`}
                alt="{resources.frontmatter.title}"
                width={160}
                height={100}
                className="mr-8 max-w-[160px] rounded-[4px]"
              />

              <div className="mt-4 bg-transparent sm:mt-0">
                <h3 className="h5 mb-[4px] flex items-center pt-2 font-medium">
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
                <p className="mb-3 text-sm text-text dark:text-light">
                  {resource.frontmatter.description}
                </p>
                <div className="flex space-x-2">
                  {resource.frontmatter.tool?.map((tool, i) => (
                    <span
                      className="rounded border border-border px-2 py-[2px] text-xs"
                      key={`tool-${i}`}
                    >
                      {humanize(tool)}
                    </span>
                  ))}
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
