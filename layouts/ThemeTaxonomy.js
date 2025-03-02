import config from "@/config/config.json";
import Themes from "@/layouts/Themes";
import { markdownify, slugify } from "@/lib/utils/textConverter";
import { FaSquareXTwitter } from "react-icons/fa6";
import { TbBrandGithub, TbCode, TbHome, TbLicense } from "react-icons/tb";
import CollapseContent from "./components/CollapseContent";

const { dark_icon_list } = config;

const ThemeTaxonomy = ({
  data,
  currentPage,
  themeCount,
  showIntro,
  authors,
}) => {
  const { frontmatter, content } = currentPage[0];
  const {
    title,
    page_title,
    icon,
    website,
    github_path,
    twitter_username,
    license,
    license_url,
    language,
  } = frontmatter;

  return (
    <main className="main">
      <section>
        <div className="container">
          <div
            className={`mb-16 flex flex-wrap md:flex-nowrap rounded p-6 shadow dark:bg-darkmode-theme-dark ${
              !showIntro && "hidden"
            }`}
          >
            <div className="mb-4 mr-3 md:mb-0">
              <div className="mb-5 flex">
                <img
                  className={`${
                    dark_icon_list.includes(slugify(title))
                      ? "dark:brightness-0 dark:invert"
                      : ""
                  } mr-3`}
                  src={icon}
                  alt={`${title} icon`}
                  height="40"
                  width="40"
                />
                {markdownify(
                  (page_title || title).replace("<themes>", `${themeCount}+`),
                  "h1",
                  "self-end",
                )}
              </div>
              <CollapseContent className="mb-5" content={content} />
              <ul className="meta-list">
                {website && (
                  <li title="Official Website">
                    <TbHome />
                    <a target="_blank" rel="noopener noreferrer" href={website}>
                      {website}
                    </a>
                  </li>
                )}

                {github_path && (
                  <li title="GitHub Repository">
                    <TbBrandGithub />
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://github.com/${github_path}`}
                    >
                      {github_path}
                    </a>
                  </li>
                )}

                {twitter_username && (
                  <li title="Twitter Profile">
                    <FaSquareXTwitter />
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://x.com/${twitter_username}`}
                    >
                      @{twitter_username}
                    </a>
                  </li>
                )}

                {license && (
                  <li title="License">
                    <TbLicense />
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={license_url}
                    >
                      {license}
                    </a>
                  </li>
                )}

                {language && (
                  <li title="Language">
                    <TbCode />
                    {language}
                  </li>
                )}
              </ul>
            </div>
          </div>

          <Themes themes={data} authors={authors} />
        </div>
      </section>
    </main>
  );
};

export default ThemeTaxonomy;
