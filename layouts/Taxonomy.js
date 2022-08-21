import config from "@config/config.json";
import Themes from "@layouts/components/Themes";
import { markdownify } from "@lib/utils/textConverter";
import Image from "next/future/image";
import {
  TbBrandGithub,
  TbBrandTwitter,
  TbCode,
  TbHome,
  TbLicense,
} from "react-icons/tb";
import MailchimpSubscribe from "react-mailchimp-subscribe";

const Taxonomy = ({ data, taxonomies, tools }) => {
  const { frontmatter, content } = taxonomies[0];
  const { mailchimp_url } = config.params;
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

  // mailchimp form
  const MailchimpForm = () => <MailchimpSubscribe url={mailchimp_url} />;

  return (
    <main className="main">
      <section>
        <div className="container">
          <div className="row mb-12">
            <div className="xl:col-8">
              <div className="p-6 shadow-lg">
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
            </div>
            {/* mail subscriptions */}
            <div className="hidden xl:col-4 xl:block">
              <MailchimpSubscribe
                url={mailchimp_url}
                render={({ subscribe, status, message }) => (
                  <div className="subcription-form">
                    <h2 className="h5 mb-4 font-medium">
                      Stay up to date with Static Site Generators resources
                      &amp; news
                    </h2>
                    <MailchimpForm onSubmitted={(d) => subscribe(d)} />
                    {status === "success" && <span>Subscribed !</span>}
                  </div>
                )}
              />
            </div>
          </div>
          <Themes themes={data} tools={tools} />
        </div>
      </section>
    </main>
  );
};

export default Taxonomy;
