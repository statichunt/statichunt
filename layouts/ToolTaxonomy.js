import Tools from "@/layouts/Tools";
import { markdownify } from "@/lib/utils/textConverter";

const ToolTaxonomy = ({ data, currentPage }) => {
  const { frontmatter } = currentPage[0];
  const { title, page_title } = frontmatter;

  return (
    <section className="section">
      <div className="container">
        <div className="row mb-8 justify-center">
          <div className="xl:col-10">
            {markdownify(page_title || title, "h1")}
          </div>
        </div>
        <Tools tools={data} />
      </div>
    </section>
  );
};

export default ToolTaxonomy;
