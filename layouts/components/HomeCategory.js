import useTaxonomyHandler from "@/hooks/useAccordionHandler";
import { slugify } from "@/lib/utils/textConverter";
import { useFilterContext } from "context/filterContext";
import { useEffect, useState } from "react";

const HomeCategory = ({ themes, category }) => {
  const [taxonomy, setTaxonomy] = useState(category);

  const {
    arrayCategory,
    setArrayCategory,
    allReset,
    setParameter,
    taxonomyArray,
    parameter,
    arrayCMS,
    arrayCSS,
    arrayUI,
    arraySSG,
  } = useFilterContext();

  // call custom hook
  const {
    taxonomyArrayHandler,
    filteringTaxonomy,
    filterState,
    handleTaxonomyArray,
  } = useTaxonomyHandler(themes);

  // change others position
  const indexOfOthers = category.map((data) => data.slug).indexOf("others");
  const element = category.splice(indexOfOthers, 1)[0];
  category.splice(category.length, 0, element);

  useEffect(() => {
    const filterAddition = taxonomy.map((item) => ({
      ...item,
      selected: false,
    }));
    setTaxonomy(filterAddition);
  }, [allReset]);

  const handleTaxonomy = (label) => {
    setParameter("category");
    const temp = [...taxonomy];
    for (let i in temp) {
      const item = temp[i];
      if (slugify(item.frontmatter.title) === label) {
        item.selected = !item.selected;
      }
    }
    setTaxonomy(temp);
    taxonomyArrayHandler(label);

    if (arrayCategory.includes(label)) {
      setArrayCategory(arrayCategory.filter((x) => x !== label));
    } else {
      setArrayCategory((prevValue) => [...prevValue, label]);
    }
  };

  // add data inside taxonomy array
  useEffect(() => {
    handleTaxonomyArray(arrayCategory);
  }, [arrayCategory]);

  // filter content by taxonomy
  useEffect(() => {
    filteringTaxonomy(
      { array: arrayCategory, params: "category" },
      { array: arraySSG, params: "ssg" },
      { array: arrayCSS, params: "css" },
      { array: arrayUI, params: "ui" },
      { array: arrayCMS, params: "cms" },
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrayCMS, arrayCSS, arraySSG, arrayCategory, taxonomyArray, parameter]);

  // category items count
  const countItems = (item) => {
    return themes.filter((theme) =>
      theme.frontmatter.category
        ?.map((theme) => slugify(theme))
        .includes(slugify(item.frontmatter.title)),
    ).length;
  };

  return (
    <ul className="category-list flex flex-wrap">
      {taxonomy.map((item, i) => (
        <li
          onClick={() => handleTaxonomy(slugify(item.frontmatter.title))}
          key={`item-${i}`}
          className={`whitespace-nowrap ${
            item.selected ? "active" : ""
          } filter-${slugify(item.frontmatter.title)} ${
            countItems(item) < 1 ? "disabled" : ""
          }`}
          style={{ order: item.frontmatter.weight || "100" }}
        >
          {item.frontmatter.title}
          {parameter && [...new Set(taxonomyArray)][0] === "category" ? (
            <span className="ml-auto">{countItems(item)}</span>
          ) : taxonomyArray.length === 0 ? (
            <span className="ml-auto">{countItems(item)}</span>
          ) : parameter && [...new Set(taxonomyArray)][0] !== "category" ? (
            <span className="ml-auto">
              {
                filterState.filter((data) =>
                  data.frontmatter.category
                    ?.map((d) => slugify(d))
                    ?.includes(slugify(item.frontmatter.title)),
                ).length
              }
            </span>
          ) : (
            <span className="ml-auto">{countItems(item)}</span>
          )}
        </li>
      ))}
    </ul>
  );
};

export default HomeCategory;
