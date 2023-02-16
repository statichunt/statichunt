import useSearchBlog from "@hooks/useSearchBlog";
import useSearchResource from "@hooks/useSearchResource";
import useSearchTheme from "@hooks/useSearchTheme";
import { humanize } from "@lib/utils/textConverter";
import ImageFallback from "../ImageFallback";

const ResourceCard = () => {
  const { themes } = useSearchTheme();
  const { resources } = useSearchResource();
  const { blogs } = useSearchBlog();
  return (
    <div className={resources.length ? "mb-2 block" : "hidden"}>
      <h2 className="h6 mb-2 ml-8 text-text">Resources</h2>
      <div
        className={`scrollbar mb-6 ${
          blogs.length ? "max-h-[210px]" : "max-h-[420px]"
        } overflow-y-auto overflow-x-hidden ${
          resources.length ? "block" : "hidden"
        } pt-4 pl-8 pr-2`}
      >
        <div
          className={`row ${
            themes.length || blogs.length
              ? "row-cols-1"
              : "row-cols-1 md:row-cols-2"
          } mb-2`}
        >
          {resources.map((resource) => (
            <div key={resource.slug} className="col mb-4 ">
              <div className="relative mr-2 rounded-[4px] p-0 shadow-[0px_0px_16px_4px_rgba(0,0,0,0.04)] dark:bg-darkmode-border dark:shadow-none">
                <div className=" rounded-[4px] transition duration-200 sm:flex">
                  <div className=" flex w-full items-center rounded-[4px] p-3 transition duration-200">
                    <ImageFallback
                      loading="lazy"
                      src={`/resources/${resource.slug}.png`}
                      fallback={`https://teamosis-sg.vercel.app/api/img?url=${resource.frontmatter.website}`}
                      alt="{resources.frontmatter.title}"
                      width={93}
                      height={60}
                      className="mr-4 max-w-[93px] rounded-[4px] sm:mr-8"
                    />

                    <div className="  flex-1 bg-transparent sm:mt-0">
                      <h3 className="sm:h5 mb-4 flex items-center justify-between text-sm  font-bold ">
                        {resource.frontmatter.title}
                        <a
                          className="after:absolute after:inset-0"
                          href={`${resource.frontmatter.website}?ref=statichunt.com`}
                          rel="noopener noreferrer nofollow"
                          target="_blank"
                        >
                          <svg
                            className="ml-3 inline text-primary dark:text-white"
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
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;
