import MobileSidebar from "@/partials/MobileSidebar";
import Base from "layouts/Baseof";
import { getListPage, getSinglePage } from "lib/contentParser";
import { parseMDX } from "lib/utils/mdxParser";
import { markdownify, slugify } from "lib/utils/textConverter";
import { MDXRemote } from "next-mdx-remote";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaRegCircleCheck } from "react-icons/fa6";
import shortcodes from "@/shortcodes/all";
import ToolsIcon from "@/components/ToolsIcon";
import CallToAction from "@/partials/CallToAction";

const Experts = ({ indexPage, mdxContent, experts, callToAction }) => {
  const { content, frontmatter } = indexPage;
  const { title, meta_title, description, image } = frontmatter;

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
            {experts.map((expert) => (
              <div
                key={expert.frontmatter.title}
                className="md:col-6 lg:col-4 mb-6"
              >
                <div className="rounded-md shadow dark:bg-darkmode-theme-dark h-full">
                  <Image
                    src={expert.frontmatter.banner}
                    alt={expert.frontmatter.title}
                    height="274"
                    width="424"
                    className="w-full rounded-t-md"
                  />

                  <div className="p-4 lg:p-6">
                    <div className="flex items-center mb-6">
                      <Image
                        src={expert.frontmatter.logo}
                        alt={expert.frontmatter.logo}
                        height="48"
                        width="48"
                        className="w-12 h-12 mr-4 rounded-full object-cover"
                      />
                      <h3 className="h4">{expert.frontmatter.title}</h3>
                    </div>

                    <ToolsIcon item={expert} category={false} />

                    <p className="line-clamp-2">
                      {expert.frontmatter.description}
                    </p>

                    <div className="mt-4 xl:mb-4">
                      <Link
                        className="btn btn-outline-primary whitespace-nowrap"
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

      <CallToAction data={callToAction} />
    </Base>
  );
};

export const getStaticProps = async () => {
  const expertIndex = await getListPage("content/experts/_index.md");
  const mdxContent = await parseMDX(expertIndex.content);
  const experts = getSinglePage("content/experts");
  const callToAction = await getListPage("content/sections/call-to-action.md");

  return {
    props: {
      indexPage: expertIndex,
      mdxContent: mdxContent,
      experts: experts,
      callToAction: callToAction,
    },
  };
};

export default Experts;
