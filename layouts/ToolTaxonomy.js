import Tools from "@/layouts/Tools";
import { markdownify } from "@/lib/utils/textConverter";
import { humanize, slugify } from "lib/utils/textConverter";
import { useEffect, useState } from "react";
import CollapseContent from "./components/CollapseContent";

const ToolTaxonomy = ({ data, currentPage }) => {
  const { frontmatter, content } = currentPage[0];
  const { title, page_title } = frontmatter;
  const [filteredData, setFilteredData] = useState(data);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedPlans, setSelectedPlans] = useState([]);

  // get all type from data as array
  const availableTypes = [
    ...new Set(
      data
        .map((item) => item.frontmatter.type?.map((item) => slugify(item)))
        .flat()
        .filter(Boolean),
    ),
  ];

  // get all plans from data as array
  const availablePlans = [
    ...new Set(
      data
        .map((item) => item.frontmatter.plans?.map((item) => slugify(item)))
        .flat()
        .filter(Boolean),
    ),
  ];

  // filter data by selected types and plans
  const filterData = () => {
    const filtered = data.filter((item) => {
      const itemTypes =
        item.frontmatter.type?.map((item) => slugify(item)) || [];
      const itemPlans =
        item.frontmatter.plans?.map((item) => slugify(item)) || [];
      return (
        (selectedTypes.length === 0 ||
          selectedTypes.every((type) => itemTypes.includes(type))) &&
        (selectedPlans.length === 0 ||
          selectedPlans.every((plan) => itemPlans.includes(plan)))
      );
    });
    setFilteredData(filtered);
  };

  const toggleType = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  const togglePlan = (plan) => {
    setSelectedPlans((prev) =>
      prev.includes(plan) ? prev.filter((p) => p !== plan) : [...prev, plan],
    );
  };

  // Update filtered data whenever selected types or plans change
  useEffect(() => {
    filterData();
  }, [selectedTypes, selectedPlans]);

  const toolCount = data.length - 1;

  return (
    <section className="section">
      <div className="container">
        <div
          className={`mb-16 flex flex-wrap md:flex-nowrap rounded p-6 shadow dark:bg-darkmode-theme-dark`}
        >
          <div className="mb-4 mr-3 md:mb-0">
            <div className="mb-5 flex">
              {markdownify(
                (page_title || title).replace("<tools>", `${toolCount}+`),
                "h1",
                "self-end",
              )}
            </div>
            <CollapseContent className="mb-5" content={content} />
          </div>
        </div>
        <ul className="category-list mb-8 flex flex-wrap">
          {availablePlans.map((item, i) => (
            <li
              onClick={() => togglePlan(slugify(item))}
              key={`plan-${i}`}
              className={`whitespace-nowrap ${selectedPlans.includes(slugify(item)) ? "active" : ""}`}
            >
              {humanize(item)}
            </li>
          ))}
          <li className="border-l-none !p-0" />
          {availableTypes.map((item, i) => (
            <li
              onClick={() => toggleType(slugify(item))}
              key={`type-${i}`}
              className={`whitespace-nowrap ${selectedTypes.includes(slugify(item)) ? "active" : ""}`}
            >
              {humanize(item)}
            </li>
          ))}
        </ul>
        <Tools tools={filteredData} />
      </div>
    </section>
  );
};

export default ToolTaxonomy;
