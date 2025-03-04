import ToolsIcon from "@/components/ToolsIcon";
import Base from "@/layouts/Baseof";
import MobileSidebar from "@/partials/MobileSidebar";
import { getSinglePageServer } from "lib/contentParser";
import { markdownify } from "lib/utils/textConverter";
import Image from "next/image";
import { FaExternalLinkAlt } from "react-icons/fa";

const Tools = ({ slug, tool }) => {
  const { frontmatter, content } = tool;
  const {
    title,
    description,
    image,
    website,
    license,
    category,
    plans,
    supports,
    type,
  } = frontmatter;

  return (
    <Base
      title={title}
      description={description ? description : content.slice(0, 120)}
      image={image}
    >
      <MobileSidebar />
      <section className="section">
        <div className="container max-w-[1200px]">
          <div className="row justify-center">
            <div className="mb-8 md:col-8 md:mb-0">
              <Image
                src={`https://statichunt-images.netlify.app/tools/${slug}.png`}
                alt={title}
                height={550}
                width={825}
                className="w-full rounded shadow"
              />
              {/* content */}
              {markdownify(content, "div", "content")}
            </div>
            {/* Tool sidebar */}
            <div className="md:col-4 lg:pl-12">
              {/* title and description */}
              <div className="widget mb-6">
                <h1 className="h2 mb-5">{title}</h1>
                <p className="mb-6">{description}</p>
                <a
                  className="btn btn-primary w-full border border-primary"
                  href={`${website}?ref=statichunt.com`}
                  target="_blank"
                  rel="nofollow noreferrer"
                >
                  Visit Website <FaExternalLinkAlt className="ml-2 -mt-1" />
                </a>
              </div>
              {/* Tool info */}
              <div className="widget widget-info mb-6">
                <h3 className="h4 mb-3 font-light">Tool Information:</h3>

                {/* category */}
                <div className="flex items-center py-[6px]">
                  <span className="min-w-[120px]">Category : </span>
                  <span className="text-dark dark:text-white capitalize">
                    {category.join(", ")}
                  </span>
                </div>

                {/* type */}
                <div className="flex items-center py-[6px]">
                  <span className="min-w-[120px]">Type : </span>
                  <span className="text-dark dark:text-white capitalize">
                    {type.join(", ")}
                  </span>
                </div>

                {/* license */}
                {license && (
                  <div className="flex items-center py-[6px]">
                    <span className="min-w-[120px]">License : </span>
                    <span className="text-dark dark:text-white">{license}</span>
                  </div>
                )}

                {/* pricing plans */}
                {plans && (
                  <div className="flex items-center py-[6px]">
                    <span className="min-w-[120px]">Plans : </span>
                    <span className="text-dark dark:text-white capitalize">
                      {plans.join(", ")}
                    </span>
                  </div>
                )}

                {/* supported technology */}
                {supports && (
                  <div className="flex items-center py-[6px]">
                    <span className="min-w-[120px]">Supports : </span>
                    <span className="text-dark dark:text-white">
                      <ToolsIcon item={tool} size={20} />
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Base>
  );
};

export default Tools;

// get single page on server side
export const getServerSideProps = async ({ params }) => {
  const { tool } = params;

  const singleTool = await getSinglePageServer("content/tools", tool);

  // handle 404
  if (!singleTool) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      tool: singleTool,
      slug: tool,
    },
  };
};
