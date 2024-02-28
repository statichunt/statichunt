/* eslint-disable @next/next/no-img-element */
import ToolsIcon from "@/components/ToolsIcon";
import MobileSidebar from "@/partials/MobileSidebar";
import shortcodes from "@/shortcodes/all";
import Base from "layouts/Baseof";
import { getListPage, getSinglePage } from "lib/contentParser";
import { parseMDX } from "lib/utils/mdxParser";
import { markdownify } from "lib/utils/textConverter";
import { MDXRemote } from "next-mdx-remote";
import Image from "next/image";
import Link from "next/link";

const Experts = ({ indexPage, mdxContent, experts }) => {
  const { content, frontmatter } = indexPage;
  const { title, meta_title, description, image, call_to_action } = frontmatter;

  return (
    <Base
      title={title}
      meta_title={meta_title}
      description={description}
      image={image}
    >
      <MobileSidebar />
      <section className="section">
        <div className="container">
          <div className="row mb-8 justify-center">
            <div className="col-10 text-center">
              {markdownify(title, "h1", "mb-8")}
              <div className="content">
                <MDXRemote {...mdxContent} components={shortcodes} />
              </div>
            </div>
          </div>
          <div className="row">
            {experts?.map((expert) => (
              <div
                key={expert.frontmatter.title}
                className="md:col-6 lg:col-4 mb-6"
              >
                <div className="rounded-md relative shadow dark:bg-darkmode-theme-dark h-full">
                  <Image
                    src={expert.frontmatter.image}
                    alt={expert.frontmatter.title}
                    height="274"
                    width="424"
                    className="w-full rounded-t-md"
                  />

                  <div className="p-4 lg:p-6">
                    <div className="flex items-center mb-6">
                      {expert.frontmatter.website && (
                        <img
                          height={48}
                          width={48}
                          src={`https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${expert.frontmatter.website}&size=48`}
                          alt={title}
                          className="w-12 h-12 mr-4 rounded-full object-contain"
                        />
                      )}
                      <h3 className="h4">{expert.frontmatter.title}</h3>
                    </div>

                    <ToolsIcon size={26} item={expert} category={false} />

                    <p className="line-clamp-2">
                      {expert.frontmatter.description}
                    </p>

                    <div className="mt-4 mb-2">
                      <Link
                        className="btn btn-outline-primary stretched-link"
                        href={`/experts/${expert.slug}`}
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* call to action */}
      {call_to_action.enable && (
        <section className="mb-28">
          <div className="container">
            <div className="rounded-md bg-white shadow px-4 py-16 dark:bg-darkmode-theme-light xl:p-20 relative z-20">
              <div className="row items-center justify-center text-center">
                <div className="md:col-7">
                  {markdownify(call_to_action.title, "h2", "mb-2 h1")}
                  {markdownify(call_to_action.description, "p", "mb-6")}
                  <Link className="btn btn-primary" href="/contact">
                    Become An Expert
                  </Link>
                </div>
              </div>

              {/* Start CTA BG SHAPES  */}
              <div className="pointer-events-none absolute left-0 top-0 -z-10 select-none">
                <Image
                  className="overflow-hidden rounded-md max-md:w-1/2"
                  src="/shapes/cta-s-1.svg"
                  alt="shape"
                  width={150}
                  height={150}
                />
              </div>
              <div className="pointer-events-none absolute top-0 -z-10 select-none right-full md:right-0">
                <Image
                  className="overflow-hidden rounded-md max-md:w-1/2"
                  src="/shapes/cta-s-2.svg"
                  alt="shape"
                  width={150}
                  height={150}
                />
              </div>
              <div className="pointer-events-none absolute left-0 bottom-0 -z-10 select-none">
                <Image
                  className="overflow-hidden rounded-md max-md:w-1/2"
                  src="/shapes/cta-s-3.svg"
                  alt="shape"
                  width={180}
                  height={150}
                />
              </div>
            </div>
          </div>
        </section>
      )}
    </Base>
  );
};

export const getStaticProps = async () => {
  const expertIndex = await getListPage("content/experts/_index.md");
  const mdxContent = await parseMDX(expertIndex.content);
  const experts = getSinglePage("content/experts");

  return {
    props: {
      indexPage: expertIndex,
      mdxContent: mdxContent,
      experts: experts,
    },
  };
};

export default Experts;
