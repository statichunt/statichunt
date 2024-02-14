/* eslint-disable @next/next/no-img-element */
import { humanize } from "@/lib/utils/textConverter";
import { useSearchContext } from "context/searchContext";

const ToolCard = ({ tools, themes, blogs }) => {
  const { isTheme, isBlog } = useSearchContext();
  return (
    <div
      className={`row p-2 ${
        (blogs.length || themes.length) && (isBlog || isTheme)
          ? "row-cols-1"
          : "row-cols-1 md:row-cols-2"
      }`}
    >
      {tools.map((tool) => (
        <div key={tool.slug} className="col mb-4">
          <div className="relative rounded shadow">
            <div className="rounded sm:flex">
              <div className="flex w-full items-center rounded p-3">
                <img
                  loading="lazy"
                  src={`https://statichunt-images.netlify.app/tools/thumbnails/${tool.slug}.webp`}
                  alt={`Screenshot of ${tool.frontmatter.title}`}
                  width={93}
                  height={60}
                  className="mr-4 max-w-[93px] rounded sm:mr-8"
                />

                <div className="flex-1 sm:mt-0">
                  <h3 className="h6 mb-4 flex items-center justify-between hover:underline">
                    {tool.frontmatter.title}
                    <a
                      className="stretched-link"
                      href={`${tool.frontmatter.website}?ref=statichunt.com`}
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

                  {tool.frontmatter.category?.map((item, i) => (
                    <span
                      key={`category-${i}`}
                      className="rounded border border-border px-3 py-1 text-xs"
                    >
                      {humanize(item)}
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

export default ToolCard;
