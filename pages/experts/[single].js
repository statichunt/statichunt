/* eslint-disable @next/next/no-img-element */
import ExpertContact from "@/components/ExpertContact";
import ToolsIcon from "@/components/ToolsIcon";
import MobileSidebar from "@/partials/MobileSidebar";
import shortcodes from "@/shortcodes/all";
import Base from "layouts/Baseof";
import { getListPage, getSinglePageServer } from "lib/contentParser";
import { parseMDX } from "lib/utils/mdxParser";
import { MDXRemote } from "next-mdx-remote";
import Image from "next/image";
import Link from "next/link";
import { FaCheck } from "react-icons/fa6";

const ExpertSingle = ({ post, mdxContent, successMessage }) => {
  const { frontmatter, content } = post;
  const {
    title,
    meta_title,
    image,
    email,
    description,
    website,
    services,
    price,
    projects,
  } = frontmatter;

  return (
    <Base title={title} meta_title={meta_title} description={description}>
      <MobileSidebar />
      <section className="section">
        <div className="container">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                {website && (
                  <img
                    height={48}
                    width={48}
                    src={`https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${website}&size=48`}
                    alt={title}
                    className="w-12 h-12 mr-4 rounded-full object-contain"
                  />
                )}
                <h3 className="h4">{title}</h3>
              </div>

              <Link
                className="btn btn-primary"
                href={website}
                target="_blank"
                rel="noopener noreferrer"
              >
                View website
              </Link>
            </div>

            <Image
              className="w-full rounded-t-md object-cover object-top"
              src={image}
              alt={title}
              width={1320}
              height={711}
            />
          </div>
          {/* sidebar */}
          <div className="mt-14">
            <div className="row">
              <div className="content md:col-8 order-2 md:order-1">
                <MDXRemote {...mdxContent} components={shortcodes} />
              </div>

              <div className="md:col-4 xl:col-3 ml-auto order-1 md:order-2">
                <div className="rounded-md bg-theme-light dark:bg-darkmode-theme-light px-8 py-14">
                  <div className="space-y-8">
                    <div>
                      <h5 className="mb-2">Frameworks</h5>
                      <ToolsIcon size={26} item={post} category={false} />
                    </div>

                    <div>
                      <h5 className="mb-2">Services offered</h5>
                      <ul className="">
                        {services.map((feature) => (
                          <li
                            className="text-sm flex mb-4"
                            key={title + feature}
                          >
                            <FaCheck
                              size={16}
                              className="text-white bg-primary p-0.5 rounded-full opacity-70 mr-2 mt-0.5"
                            />{" "}
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h5 className="mb-2">Starting at</h5>
                      <p>${price}</p>
                    </div>

                    <div>
                      <h5 className="mb-2">Website</h5>
                      <Link
                        className="whitespace-normal break-words text-sm"
                        href={`${website}?ref=statichunt.com`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {website}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {projects?.length > 0 && (
      <section className="section pt-0">
        <div className="container">
          <h2 className="mb-6">Some Projects By {title}</h2>
          <div className="row mt-4">
            {projects?.map((project, i) => (
              <div
                key={`${project.title}-${i}`}
                className="md:col-6 lg:col-4 mb-6"
              >
                <div className="rounded-md shadow dark:bg-darkmode-theme-dark h-full">
                  <Image
                    src={project.image}
                    alt={project.title}
                    height="276"
                    width="424"
                    className="w-full rounded-t-md"
                  />

                  <div className="p-3 lg:p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4>{project.title}</h4>
                        <small>{project.category}</small>
                      </div>
                      <Link
                        className="btn btn-outline-primary whitespace-nowrap mt-1"
                        href={`${project.link}?ref=statichunt.com`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Project
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      <ExpertContact
        title={title}
        contactEmail={email}
        successMessage={successMessage}
      />
    </Base>
  );
};

// get single page on server side
export const getServerSideProps = async ({ params }) => {
  const { single } = params;

  const post = await getSinglePageServer("content/experts", single);
  const mdxContent = await parseMDX(post.content);

  const data = await getListPage("content/contact/_index.md");
  const { success_message } = data.frontmatter;

  // handle 404
  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      slug: single,
      post: post,
      mdxContent: mdxContent,
      successMessage: success_message,
    },
  };
};

export default ExpertSingle;
