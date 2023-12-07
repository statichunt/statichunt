import useTaxonomyHandler from "@/hooks/useAccordionHandler";
import { slugify } from "@/lib/utils/textConverter";
import { useFilterContext } from "context/filterContext";
import { useEffect, useState } from "react";

const HomeCategory = ({ themes, category, filterFree, filterPremium }) => {
  const [taxonomy, setTaxonomy] = useState(category);

  const {
    arrayCategory,
    setArrayCategory,
    arrayFree,
    setArrayFree,
    arrayPremium,
    setArrayPremium,
    allReset,
    setParameter,
    taxonomyArray,
    parameter,
    arrayCMS,
    arrayCSS,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrayCategory]);
  // filter content by taxonomy
  useEffect(() => {
    filteringTaxonomy(
      { array: arrayCategory, params: "category" },
      { array: arraySSG, params: "ssg" },
      { array: arrayCSS, params: "css" },
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
      <li
        onClick={() =>
          setArrayPremium(arrayPremium.length === 0 ? filterPremium : [])
        }
        className={`filter-premium ${arrayPremium.length > 0 ? "active" : ""} ${
          filterPremium.length < 1 ? "disabled" : ""
        }`}
      >
        Premium
        <span>{filterPremium.length}</span>
      </li>
      <li
        onClick={() => setArrayFree(arrayFree.length === 0 ? filterFree : [])}
        className={`filter-free ${arrayFree.length > 0 ? "active" : ""} ${
          filterFree.length < 1 ? "disabled" : ""
        }`}
      >
        Free
        <span>{filterFree.length}</span>
      </li>
      <li className="!mb-0 mt-1 h-6 !cursor-default !rounded-none !border-y-0 !border-r-0 !p-0 align-middle" />

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
