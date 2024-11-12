import Base from "@/layouts/Baseof";
import { getListPage, getSinglePage } from "@/lib/contentParser";
import MobileSidebar from "@/partials/MobileSidebar";
import { parseMDX } from "lib/utils/mdxParser";
import Image from "next/image";
import Link from "next/link";
import { FaRegCircleCheck } from "react-icons/fa6";

const Bundles = ({ indexPage, mdxContent, bundles }) => {
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
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex space-x-2 items-center justify-center">
              <p className="hook-line">Friday Exclusive!</p>
            </div>
            <h1 className="my-5 text-balance text-white mb-3 text-3xl sm:text-5xl lg:text-7xl font-primary leading-relaxed lg:leading-[92px]">
              <div>
                <span className="black-friday-gradient relative">
                  Friday Sale!
                </span>
              </div>
              Up to 80% OFF!
            </h1>
            <p className="lg:text-xl font-normal text-white pb-8">
              Supercharge your web development workflow with handpicked Jamstack
              theme bundles!
            </p>
            <button className="btn w-48 font-bold h-12 btn-primary">
              <Image
                className="absolute -top-[75px] -right-[133px]"
                alt="discount"
                src={"/black-friday/discount-down.svg"}
                width={170}
                height={170}
              />
              Explore Deals!
            </button>
          </div>
        </div>

        <div className="container mt-5">
          <div className="row mb-8 justify-center">
            <div className="col-10 text-center">
              {/* {markdownify(title, "h1", "mb-8")} */}
              {/* <div className="content">
                <MDXRemote {...mdxContent} components={shortcodes} />
              </div> */}
            </div>
          </div>
          <div className="row">
            {bundles.map((bundle) => (
              <div
                key={bundle.frontmatter.title}
                className="col-12 md:col-6 mb-6"
              >
                <div className="rounded-md shadow dark:bg-darkmode-theme-dark h-full">
                  <Image
                    src={bundle.frontmatter.image}
                    alt={bundle.frontmatter.title}
                    height="400"
                    width="716"
                    className="w-full rounded-t-md"
                  />

                  <div className="p-4 lg:p-8">
                    <div className="flex justify-between mb-6">
                      <h3>{bundle.frontmatter.title}</h3>

                      <p className="text-dark whitespace-nowrap dark:text-darkmode-light font-bold text-2xl hidden xl:block">
                        {bundle.frontmatter.price}{" "}
                        <s className="text-sm text-text dark:text-darkmode-text font-normal">
                          {bundle.frontmatter.regular_price}
                        </s>
                      </p>
                    </div>

                    <div className="xl:flex justify-between">
                      <ul className="columns-2">
                        {bundle.frontmatter.features.map((feature) => (
                          <li
                            className="text-sm flex mb-4"
                            key={bundle.frontmatter.title + feature}
                          >
                            <FaRegCircleCheck
                              size={16}
                              className="text-primary opacity-70 mr-2 mt-0.5"
                            />{" "}
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-4 xl:mb-4 flex justify-between self-end">
                        <p className="text-dark dark:text-darkmode-light font-bold text-2xl xl:hidden">
                          {bundle.frontmatter.price}{" "}
                          <s className="text-sm text-text dark:text-darkmode-text font-normal">
                            {bundle.frontmatter.regular_price}
                          </s>
                        </p>
                        <Link
                          className="btn btn-outline-primary whitespace-nowrap"
                          href={`${bundle.frontmatter.purchase_link}${bundle.frontmatter.purchase_link?.includes("?") ? "" : "?ref=statichunt.com"}`}
                          target="_blank"
                          rel="noopener"
                        >
                          Grab The Deal
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Base>
  );
};

export const getStaticProps = async () => {
  const bundleIndex = await getListPage("content/deals/_index.md");
  const mdxContent = await parseMDX(bundleIndex.content);
  const bundles = getSinglePage("content/deals");

  return {
    props: {
      indexPage: bundleIndex,
      mdxContent: mdxContent,
      bundles: bundles,
    },
  };
};

export default Bundles;
