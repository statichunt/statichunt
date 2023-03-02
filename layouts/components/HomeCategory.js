import { slugify } from "@lib/utils/textConverter";
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
   
  } = useFilterContext();

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

    if (arrayCategory.includes(label)) {
      setArrayCategory(arrayCategory.filter((x) => x !== label));
    } else {
      setArrayCategory((prevValue) => [...prevValue, label]);
    }
  };

  // category items count
  const countItems = (item) => {
    return themes.filter((theme) =>
      theme.frontmatter.category
        ?.map((theme) => slugify(theme))
        .includes(slugify(item.frontmatter.title))
    ).length;
  };

  return (
    <ul className="category-list">
      <li
        onClick={() => setArrayFree(arrayFree.length === 0 ? filterFree : [])}
        className={`${arrayFree.length > 0 ? "active" : undefined} ${
          filterFree.length < 1 ? "disabled" : undefined
        }`}
      >
        Free
        <span>{filterFree.length}</span>
      </li>
      <li
        onClick={() =>
          setArrayPremium(arrayPremium.length === 0 ? filterPremium : [])
        }
        className={`${arrayPremium.length > 0 ? "active" : undefined} ${
          filterPremium.length < 1 ? "disabled" : undefined
        }`}
      >
        Premium
        <span>{filterPremium.length}</span>
      </li>
      <li className="!mb-0 h-6 !cursor-default !rounded-none !border-y-0 !border-r-0 !p-0 align-middle" />

      {taxonomy.map((item, i) => (
        <li
          onClick={() => handleTaxonomy(slugify(item.frontmatter.title))}
          key={`item-${i}`}
          className={`${item.selected ? "active" : undefined} ${
            countItems(item) < 1 ? "disabled" : undefined
          }`}
        >
          {item.frontmatter.title}
          <span>{countItems(item)}</span>
        </li>
      ))}
    </ul>
  );
};

export default HomeCategory;
