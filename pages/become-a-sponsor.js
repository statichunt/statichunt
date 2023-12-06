import Base from "@/layouts/Baseof";
import { getListPage } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";
import MobileSidebar from "@/partials/MobileSidebar";
import shortcodes from "@/shortcodes/all";
import { MDXRemote } from "next-mdx-remote";

const Sponsors = ({ data }) => {
  const { mdxContent, frontmatter } = data;
  const { title, meta_title, description } = frontmatter;

  return (
    <Base title={title} meta_title={meta_title} description={description}>
      <MobileSidebar />
      <section className="section">
        <div className="container">
          <div className="row justify-center">
            <div className="content sm:col-10 md:col-9 lg:col-9 xl:col-8 2xl:col-8">
              {markdownify(title, "h1", "mb-8")}
              <MDXRemote {...mdxContent} components={shortcodes} />
            </div>
          </div>
        </div>
      </section>
    </Base>
  );
};

export const getStaticProps = async () => {
  const data = await getListPage("content/sponsors/become-a-sponsor.md");
  return {
    props: {
      data: data,
    },
  };
};

export default Sponsors;
