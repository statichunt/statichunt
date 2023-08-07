/* eslint-disable @next/next/no-html-link-for-pages */
import config from "@/config/config.json";
import { dateFormat } from "@/lib/utils/dateFormat";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import "react-discord-invite/dist/style.css";
import { TbGitFork } from "react-icons/tb";
import ToolsIcon from "./ToolsIcon";

const ThemeInfo = ({ theme, slug }) => {
  const { discord_widget } = config.settings;
  const [mounted, setMounted] = useState(false);
  const { uiTheme, resolvedTheme } = useTheme();
  useEffect(() => setMounted(true), []);
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
    download,
    price,
  } = theme[0].frontmatter;

  return (
    <>
      <div className="widget mb-4">
        <h1 className="h2 mb-5">{title}</h1>
        <p className="mb-2">{description}</p>
        <div className="intro-description">
          <div className="mt-6 flex">
            <a
              className="btn btn-demo mr-4 w-1/2 sm:px-10 lg:px-7 xl:px-10"
              target="_blank"
              rel="noopener noreferrer nofollow"
              href={`/demo/${slug}`}
            >
              Live Demo
            </a>

            <a
              className="btn btn-primary w-1/2 sm:px-10 lg:px-7 xl:px-10"
              href={`${github ? github : download}?ref=statichunt.com`}
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              Download
            </a>
          </div>
          {github && (
            <a
              className="btn btn-github mt-4 w-full sm:px-10 lg:px-7 xl:px-10"
              href={`${github}/fork`}
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              <TbGitFork style={{ fontSize: "20px" }} /> Github Fork
            </a>
          )}
        </div>
      </div>

      <div className="widget widget-info mb-3 mt-12">
        <h3 className="h4 mb-3 font-light">Theme Information:</h3>
        {github_star > 0 && (
          <div className="flex items-center py-[6px]">
            <span className="min-w-[120px]">Stars : </span>
            <span className="flex items-center">
              <Image
                className="mr-2 dark:invert"
                src="/images/icons/star.svg"
                alt="github star"
                height="15"
                width="15"
              />
              {github_star}
            </span>
          </div>
        )}
        {github_fork > 0 && (
          <div className="flex items-center py-[6px]">
            <span className="min-w-[120px]">Forks : </span>
            <span className="flex items-center">
              <Image
                className="mr-2 dark:invert"
                src="/images/icons/fork.svg"
                alt="github fork"
                height="14"
                width="14"
              />
              {github_fork}
            </span>
          </div>
        )}
        {price > 0 && (
          <div className="flex items-center py-[6px]">
            <span className="min-w-[120px]">Price : </span>
            <span className="text-dark dark:text-white">${price}</span>
          </div>
        )}
        {!github && price === 0 && (
          <div className="flex items-center py-[6px]">
            <span className="min-w-[120px]">Price : </span>
            <span className="text-dark dark:text-white">Free</span>
          </div>
        )}
        {update_date && (
          <div className="flex items-center py-[6px]">
            <span className="min-w-[120px]">Updated : </span>
            <span className="text-dark dark:text-white">
              {dateFormat(update_date)}
            </span>
          </div>
        )}
        {publish_date && (
          <div className="flex items-center py-[6px]">
            <span className="min-w-[120px]">Published : </span>
            <span className="text-dark dark:text-white">
              {dateFormat(publish_date)}
            </span>
          </div>
        )}

        <span className="flex py-[6px]">
          <span className="mb-2 min-w-[120px]">Types : </span>
          <div className="flex flex-wrap items-center">
            <ToolsIcon item={theme[0]} size={20} />
          </div>
        </span>
      </div>

      <div className="widget mt-10">
        <div className="flex items-center">
          <Image
            src={
              github
                ? `https://www.github.com/${
                    github.match(/github\.com\/([^\/]+)/, "")[1]
                  }.png`
                : author_link
                ? `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${author_link}&size=64`
                : "/images/author-placeholder.png"
            }
            height={50}
            width={50}
            alt={author}
            className="mr-5 rounded border border-gray-100 dark:border-darkmode-border"
          />

          <div>
            <span className="mb-[2px] block text-sm">Created by</span>
            <Link
              href={
                author_link
                  ? author_link
                  : github
                  ? `https://${github.match(/github\.com\/([^\/]+)/, "")[0]}`
                  : ""
              }
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="text-dark hover:underline dark:text-white"
            >
              {author
                ? author
                : github
                ? github.match(/github\.com\/([^\/]+)/, "")[0]
                : ""}
            </Link>
          </div>
        </div>
      </div>

      {discord_widget && (
        <div className="widget sticky top-20 mt-16 hidden lg:block">
          <div className="overflow-hidden rounded-md shadow">
            <iframe
              src={`https://discord.com/widget?id=916578016149245972&theme=${
                mounted && (uiTheme === "dark" || resolvedTheme === "dark")
                  ? "dark"
                  : "light"
              }`}
              width="100%"
              height="500"
              allowtransparency="true"
              sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
            />
            <a
              className="relative z-10 -mt-12 block rounded-b bg-[#5865f2] p-4 text-center text-white"
              href="https://discord.gg/ph9z267TBZ"
              target="_blank"
              rel="nofollow noreferrer"
            >
              Join Discord
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default ThemeInfo;
