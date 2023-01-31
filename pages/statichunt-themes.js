import Base from "@layouts/Baseof";
import Themes from "@layouts/components/Themes";
import { getListPage, getSinglePage } from "@lib/contentParser";
import { markdownify } from "@lib/utils/textConverter";

// for all regular pages
const StatichuntThemes = ({ data, statichuntThemes, tools }) => {
  const { title, meta_title, description, image, noindex, canonical } =
    data.frontmatter;
  const { content } = data;

  return (
    <Base
      title={title}
      description={description ? description : content.slice(0, 120)}
      meta_title={meta_title}
      image={image}
      noindex={noindex}
      canonical={canonical}
    >
      <section className="section">
        <div className="container">
          <div className="row mb-8 justify-center">
            <div className="col-10 text-center">
              {markdownify(title, "h1", "mb-8")}
              {markdownify(content, "div", "content")}
            </div>
          </div>
          <Themes themes={statichuntThemes} tools={tools} />
        </div>
      </section>
    </Base>
  );
};

export default StatichuntThemes;

// for regular page data
export const getStaticProps = async () => {
  const data = await getListPage("content/statichunt-themes/_index.md");

  // all themes
  const themes = getSinglePage("content/themes");
  // statichunt themes
  const statichuntThemes = themes.filter(
    (theme) => theme.frontmatter.author === "Statichunt"
  );

  // get taxonomies
  const ssg = getSinglePage("content/ssg");
  const cms = getSinglePage("content/cms");
  const css = getSinglePage("content/css");
  const category = getSinglePage("content/category");

  // all tools
  const tools = [...ssg, ...cms, ...css, ...category];

  return {
    props: {
      data: data,
      tools: tools,
      statichuntThemes: statichuntThemes,
    },
  };
};
