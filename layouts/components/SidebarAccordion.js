/* eslint-disable @next/next/no-img-element */
import config from "@/config/config.json";
import useTaxonomyHandler from "@/hooks/useAccordionHandler";
import { slugify } from "@/lib/utils/textConverter";
import { useFilterContext } from "context/filterContext";
import { useEffect, useState } from "react";

const SidebarAccordion = ({
  data,
  slug,
  type,
  params,
  themes,
  SetShowIntro,
}) => {
  const [taxonomy, setTaxonomy] = useState(type);
  const { dark_icon_list } = config;
  const {
    arraySSG,
    arrayCMS,
    arrayCSS,
    arrayCategory,
    allReset,
    parameter,
    setParameter,
    taxonomyArray,
  } = useFilterContext();

  // add select property
  useEffect(() => {
    const filterAddition = taxonomy.map((item) => ({
      ...item,
      selected: false,
    }));
    setTaxonomy(filterAddition);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, allReset]);

  // call custom hook
  const {
    taxonomyArrayHandler,
    filteringTaxonomy,
    filterState,
    handleTaxonomyArray,
  } = useTaxonomyHandler(themes);

  // add data inside taxonomy array
  useEffect(() => {
    switch (parameter) {
      case "ssg":
        handleTaxonomyArray(arraySSG);
        break;
      case "css":
        handleTaxonomyArray(arrayCSS);
        break;
      case "cms":
        handleTaxonomyArray(arrayCMS);
        break;
      case "category":
        handleTaxonomyArray(arrayCategory);
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parameter, arraySSG, arrayCMS, arrayCSS, arrayCategory]);

  // add value inside it`s type array
  const handleOnClick = (label, type) => {
    setParameter(type);
    // scroll to top
    window.scrollTo({ top: 0 });
    // set active state
    const temp = [...taxonomy];
    for (let i in temp) {
      const item = temp[i];
      if (slugify(item.frontmatter.title) === label) {
        item.selected = !item.selected;
      }
    }
    setTaxonomy(temp);
    taxonomyArrayHandler(label, type);
  };

  // hide intro function
  useEffect(() => {
    if (SetShowIntro) {
      if (
        arraySSG?.length > 0 ||
        arrayCMS?.length > 0 ||
        arrayCSS?.length > 0
      ) {
        SetShowIntro(false);
      } else {
        SetShowIntro(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    arraySSG?.length,
    arrayCategory?.length,
    arrayCMS?.length,
    arrayCSS?.length,
  ]);

  // filter content by taxonomy
  useEffect(() => {
    switch (parameter) {
      case "ssg":
        filteringTaxonomy(
          { array: arraySSG, params: "ssg" },
          { array: arrayCSS, params: "css" },
          { array: arrayCMS, params: "cms" },
          { array: arrayCategory, params: "category" },
        );
        break;
      case "css":
        filteringTaxonomy(
          { array: arrayCSS, params: "css" },
          { array: arraySSG, params: "ssg" },
          { array: arrayCMS, params: "cms" },
          { array: arrayCategory, params: "category" },
        );
        break;
      case "cms":
        filteringTaxonomy(
          { array: arrayCMS, params: "cms" },
          { array: arraySSG, params: "ssg" },
          { array: arrayCSS, params: "css" },
          { array: arrayCategory, params: "category" },
        );
        break;
      case "category":
        filteringTaxonomy(
          { array: arrayCategory, params: "category" },
          { array: arraySSG, params: "ssg" },
          { array: arrayCSS, params: "css" },
          { array: arrayCMS, params: "cms" },
        );
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    arrayCMS,
    arrayCSS,
    arraySSG,
    arrayCategory,
    taxonomyArray,
    themes,
    parameter,
  ]);

  // category items count
  const countItems = (params, item) => {
    return themes.filter((theme) =>
      theme.frontmatter[params]
        ?.map((theme) => slugify(theme))
        .includes(slugify(item.frontmatter.title)),
    ).length;
  };

  return (
    <>
      {data.selected &&
        data.type === params &&
        taxonomy.map(
          (item, i) =>
            countItems(params, item) >= 0 && (
              <button
                onClick={() =>
                  handleOnClick(slugify(item.frontmatter.title), data.type)
                }
                key={`item-${i}`}
                className={`sidebar-checkbox filter-${slugify(
                  item.frontmatter.title,
                )} ${item.selected ? "active" : ""}`}
                style={{ order: item.frontmatter.weight || "100" }}
              >
                <img
                  className={`ml-2 max-h-[18px] ${
                    dark_icon_list.includes(slugify(item.frontmatter.title))
                      ? "dark:brightness-0 dark:invert"
                      : ""
                  }`}
                  src={item.frontmatter.icon}
                  alt={`${item.frontmatter.title} icon`}
                  height={18}
                  width={18}
                />
                <span className="ml-2 block">{item.frontmatter.title}</span>
                {parameter && [...new Set(taxonomyArray)][0] === params ? (
                  <span className="ml-auto">{countItems(params, item)}</span>
                ) : taxonomyArray.length === 0 ? (
                  <span className="ml-auto">
                    {countItems(params.replace("tools-", ""), item)}
                  </span>
                ) : parameter && params !== [...new Set(taxonomyArray)][0] ? (
                  <span className="ml-auto">
                    {
                      filterState.filter((data) =>
                        data.frontmatter[params]
                          ?.map((d) => slugify(d))
                          ?.includes(slugify(item.frontmatter.title)),
                      ).length
                    }
                  </span>
                ) : (
                  <span className="ml-auto">{countItems(params, item)}</span>
                )}
              </button>
            ),
        )}
    </>
  );
};

export default SidebarAccordion;
