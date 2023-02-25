import Base from "@layouts/Baseof";
import Examples from "@layouts/components/Examples";
import MobileSidebar from "@layouts/components/MobileSidebar";
import { getListPage, getSinglePage } from "@lib/contentParser";
import { sortByDate, sortByWeight } from "@lib/utils/sortFunctions";
import { humanize, markdownify, slugify } from "@lib/utils/textConverter";
import { useState } from "react";

const Home = ({ frontmatter, content, examples }) => {
  const [selectedSsg, setSelectedSsg] = useState("all");

  const examplesSortedByDate = sortByDate(examples);
  const examplesSortedByWeight = sortByWeight(examplesSortedByDate);

  const getAllSsg = examplesSortedByWeight.map((item) => item.frontmatter.ssg);
  let ssgArray = [];
  for (let i = 0; i < getAllSsg.length; i++) {
    const ssgItem = getAllSsg[i];
    for (let j = 0; j < ssgItem.length; j++) {
      ssgArray.push(slugify(ssgItem[j]));
    }
  }
  const allSsg = [...new Set(ssgArray)];

  const filteredExamples =
    selectedSsg === "all"
      ? examplesSortedByWeight
      : examplesSortedByWeight.filter((item) =>
          item.frontmatter.ssg
            .map((data) => slugify(data))
            .includes(selectedSsg)
        );

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

          <ul className="category-list mb-8">
            <li
              onClick={() => setSelectedSsg("all")}
              className={`${selectedSsg === "all" ? "active" : undefined}`}
            >
              All
              <span>{examplesSortedByWeight.length}</span>
            </li>
            {allSsg.map((item, i) => (
              <li
                onClick={() => setSelectedSsg(item)}
                key={`item-${i}`}
                className={`${selectedSsg === item ? "active" : undefined}`}
              >
                {humanize(item)}
                <span>
                  {
                    examplesSortedByWeight.filter((a) =>
                      a.frontmatter.ssg.map((b) => slugify(b)).includes(item)
                    ).length
                  }
                </span>
              </li>
            ))}
          </ul>
          <Examples examples={filteredExamples} />
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
