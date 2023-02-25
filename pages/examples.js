import Base from "@layouts/Baseof";
import Examples from "@layouts/components/Examples";
import MobileSidebar from "@layouts/components/MobileSidebar";
import { getListPage, getSinglePage } from "@lib/contentParser";
import { sortByDate, sortByWeight } from "@lib/utils/sortFunctions";
import { markdownify } from "@lib/utils/textConverter";

const Home = ({ frontmatter, content, examples }) => {
  const examplesSortedByDate = sortByDate(examples);
  const examplesSortedByWeight = sortByWeight(examplesSortedByDate);

  return (
    <Base
      title={frontmatter.title}
      meta_title={frontmatter.meta_title}
      description={frontmatter.description}
    >
      <MobileSidebar />
      <section className="section text-center">
        <div className="container">
          <div className="mb-10 md:mb-16">
            <h1 className="mb-3">{frontmatter.title}</h1>
            {markdownify(content, "p")}
          </div>
          <Examples examples={examplesSortedByWeight} />
        </div>
      </section>
    </Base>
  );
};

export default Home;

// for example page data
export const getStaticProps = async () => {
  const examplePage = await getListPage("content/examples/_index.md");
  const { frontmatter, content } = examplePage;
  const examples = getSinglePage("content/examples");

  return {
    props: {
      frontmatter: frontmatter,
      content: content,
      examples: examples,
    },
  };
};
