/* eslint-disable @next/next/no-html-link-for-pages */
import { dateFormat } from "@lib/utils/dateFormat";
import Image from "next/future/image";
import Link from "next/link";
import ToolsIcon from "./ToolsIcon";

const ThemeInfo = ({ theme, slug, tools }) => {
  const {
    title,
    author,
    author_link,
    description,
    github,
    github_star,
    github_fork,
    publish_date,
    update_date,
    ssg,
    cms,
    css,
    category,
  } = theme[0].frontmatter;

  return (
    <>
      <div className="widget mb-4">
        <h1 className="h2 mb-5">{title}</h1>
        <p className="mb-2">{description}</p>
        <div className="intro-description">
          <div className="mt-6 flex">
            <a
              className="btn btn-demo mr-4 sm:px-10 lg:px-7 xl:px-10"
              target="_blank"
              rel="noopener noreferrer nofollow"
              href={`/demo/${slug}`}
            >
              Live Demo
            </a>

            <a
              className="btn btn-fill sm:px-10 lg:px-7 xl:px-10"
              href={`${github}?ref=statichunt.com`}
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              Download
            </a>
          </div>
        </div>
      </div>
      <div className="widget widget-info mb-3 mt-12">
        <h3 className="h4 mb-3 font-light">Theme Information:</h3>

        <div className="flex items-center py-[6px]">
          <span className="min-w-[120px]">Stars : </span>
          <span className="flex items-center">
            <Image
              className="mr-2"
              src="/images/icons/star.svg"
              alt="github star"
              height="16"
              width="16"
            />
            {github_star}
          </span>
        </div>

        <div className="flex items-center py-[6px]">
          <span className="min-w-[120px]">Forks : </span>
          <span className="flex items-center">
            <Image
              className="mr-2"
              src="/images/icons/fork.svg"
              alt="github fork"
              height="16"
              width="16"
            />
            {github_fork}
          </span>
        </div>

        <div className="flex items-center py-[6px]">
          <span className="min-w-[120px]">Updated : </span>
          <span className="text-dark">{dateFormat(update_date)}</span>
        </div>
        <div className="flex items-center py-[6px]">
          <span className="min-w-[120px]">Published : </span>
          <span className="text-dark">{dateFormat(publish_date)}</span>
        </div>

        <span className="flex py-[6px]">
          <span className="mb-2 min-w-[120px]">Types : </span>
          <div className="flex flex-wrap items-center">
            <ToolsIcon tools={tools} type={ssg} size={20} />
            <ToolsIcon tools={tools} type={cms} size={20} />
            <ToolsIcon tools={tools} type={css} size={20} />
            <ToolsIcon tools={tools} type={category} size={20} />
          </div>
        </span>
      </div>

      <div className="widget mt-10">
        <div className="flex items-center">
          <Image
            src={`https://www.github.com/${
              github.match(/github\.com\/([^\/]+)/, "")[1]
            }.png`}
            height={50}
            width={50}
            alt={author}
            className="mr-5 rounded border border-gray-100"
          />

          <div>
            <span className="mb-[2px] block text-sm">Created by</span>
            <Link
              href={
                author_link
                  ? author_link
                  : `https://${github.match(/github\.com\/([^\/]+)/, "")[0]}`
              }
            >
              <a
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="text-dark hover:underline"
              >
                {author ? author : github.match(/github\.com\/([^\/]+)/, "")[0]}
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThemeInfo;
