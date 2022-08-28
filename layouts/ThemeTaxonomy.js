import Themes from "@components/Themes";
import { markdownify } from "@lib/utils/textConverter";
import Image from "next/future/image";
import {
  TbBrandGithub,
  TbBrandTwitter,
  TbCode,
  TbHome,
  TbLicense,
} from "react-icons/tb";

const ThemeTaxonomy = ({ data, taxonomies, tools, isIntro }) => {
  const { frontmatter, content } = taxonomies[0];
  const {
    title,
    page_title,
    icon,
    official_url,
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
          <div className={`mb-16 p-6 shadow ${!isIntro && "hidden"}`}>
            <div className="mb-5 flex">
              <Image
                className="mr-3"
                src={icon}
                alt={`${title} icon`}
                height="40"
                width="40"
              />
              {markdownify(page_title || title, "h1", "self-end")}
            </div>
            {markdownify(content, "p", "mb-5")}
            <ul className="meta-list">
              {official_url && (
                <li title="Official Website">
                  <TbHome />
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={official_url}
                  >
                    {official_url}
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
                  <TbBrandTwitter />
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://twitter.com/${twitter_username}`}
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

          <Themes themes={data} tools={tools} />
        </div>
      </section>
    </main>
  );
};

export default ThemeTaxonomy;
