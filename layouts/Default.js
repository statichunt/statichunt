import MobileSidebar from "@/layouts/partials/MobileSidebar";
import { markdownify } from "@/lib/utils/textConverter";
import shortcodes from "@/shortcodes/all";
import { MDXRemote } from "next-mdx-remote";

const Default = ({ data, mdxContent }) => {
  const { frontmatter } = data[0];
  const { title } = frontmatter;

  return (
    <>
      <MobileSidebar />
      <section className="section">
        <div className="container">
          <div className="row justify-center">
            <div className="content sm:col-10 md:col-9 lg:col-7">
              {markdownify(title, "h1", "mb-8")}
              <MDXRemote {...mdxContent} components={shortcodes} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Default;
