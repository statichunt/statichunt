import { humanize } from "@lib/utils/textConverter";
import { useSerachContext } from "context/searchContext";
import ImageFallback from "../ImageFallback";

const ResourceCard = ({ resources }) => {
  const { isTheme, isBlog } = useSerachContext();
  return (
    <div
      className={`row p-2 ${
        isTheme || isBlog ? "row-cols-1" : "row-cols-1 md:row-cols-2"
      }`}
    >
      {resources.map((resource) => (
        <div key={resource.slug} className="col mb-4">
          <div className="relative rounded shadow">
            <div className="rounded sm:flex">
              <div className="flex w-full items-center rounded p-3">
                <ImageFallback
                  loading="lazy"
                  src={`/resources/${resource.slug}.png`}
                  fallback={`https://teamosis-sg.vercel.app/api/img?url=${resource.frontmatter.website}`}
                  alt={resource.frontmatter.title}
                  width={93}
                  height={60}
                  className="mr-4 max-w-[93px] rounded sm:mr-8"
                />

                <div className="flex-1 sm:mt-0">
                  <h3 className="sm:h5 mb-4 flex items-center justify-between text-sm font-bold">
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
  );
};

export default ResourceCard;
