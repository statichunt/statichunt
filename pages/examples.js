import Base from "@/layouts/Baseof";
import Examples from "@/layouts/Examples";
import MobileSidebar from "@/layouts/partials/MobileSidebar";
import { getListPage, getSinglePage } from "@/lib/contentParser";
import { sortByDate, sortByWeight } from "@/lib/utils/sortFunctions";
import { humanize, markdownify, slugify } from "@/lib/utils/textConverter";
import { useState } from "react";

const getSortedSsg = (examples) => {
  // Extract and slugify all SSGs
  const allSsg = examples
    .flatMap((item) => item.frontmatter.ssg.map(slugify))
    .filter((value, index, self) => self.indexOf(value) === index); // Remove duplicates

  // Sort by number of occurrences in examples
  return allSsg.sort((a, b) => {
    const aLength = examples.filter((item) =>
      item.frontmatter.ssg.map(slugify).includes(a),
    ).length;
    const bLength = examples.filter((item) =>
      item.frontmatter.ssg.map(slugify).includes(b),
    ).length;
    return bLength - aLength;
  });
};

const Home = ({ frontmatter, content, examples }) => {
  const [selectedSsg, setSelectedSsg] = useState("all");

  // Sort examples by weight and date
  const examplesSortedByDate = sortByDate(examples);
  const examplesSortedByWeight = sortByWeight(examplesSortedByDate);

  // Get sorted SSGs
  const sortedSg = getSortedSsg(examplesSortedByWeight);

  // Filter examples based on selected SSG
  const filteredExamples =
    selectedSsg === "all"
      ? examplesSortedByWeight
      : examplesSortedByWeight.filter((item) =>
          item.frontmatter.ssg.map(slugify).includes(selectedSsg),
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
              className={`${selectedSsg === "all" ? "active" : ""}`}
            >
              All
              <span>{examplesSortedByWeight.length}</span>
            </li>
            {sortedSg.map((item, i) => (
              <li
                onClick={() => setSelectedSsg(item)}
                key={`item-${i}`}
                className={`${selectedSsg === item ? "active" : ""}`}
              >
                {humanize(item)}
                <span>
                  {
                    examplesSortedByWeight.filter((a) =>
                      a.frontmatter.ssg.map(slugify).includes(item),
                    ).length
                  }
                </span>
              </li>
            ))}
            {/* <li className="border-none p-0">
              <a
                className="btn btn-border border-border px-4 py-1 transition duration-300 hover:border-dark dark:border-darkmode-border hover:dark:border-white/60"
                href="https://github.com/statichunt/statichunt#submit-a-jamstack-example-site"
                target="_blank"
                rel="nofollow noreferrer"
              >
                Submit Yours
              </a>
            </li> */}
          </ul>
          <Examples examples={filteredExamples} />
        </div>
      </section>
    </Base>
  );
};

export default Home;

// Fetch data for the example page
export const getStaticProps = async () => {
  const examplePage = await getListPage("content/examples/_index.md");
  const { frontmatter, content } = examplePage;
  const examples = getSinglePage("content/examples");

  return {
    props: {
      frontmatter,
      content,
      examples,
    },
  };
};
