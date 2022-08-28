import { markdownify } from "@lib/utils/textConverter";
import Themes from "./components/Themes";

const Statichunt = ({ statichuntThemes, tools, data }) => {
  const { frontmatter, content } = data[0];
  const { title } = frontmatter;
  return (
    <section className="section">
      <div className="container">
        <div className="row justify-center">
          <div className="sm:col-10 md:col-9 lg:col-7">
            {markdownify(title, "h1", "mb-8")}
            {markdownify(content, "div", "content")}
          </div>
        </div>
        <Themes themes={statichuntThemes} tools={tools} />
      </div>
    </section>
  );
};

export default Statichunt;
