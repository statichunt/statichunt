import config from "@config/config.json";
import { slugify } from "@lib/utils/textConverter";
import { useFilterContext } from "context/state";
import Image from "next/image";
import { useEffect, useState } from "react";

const Accordion = ({ data, slug, type, params, themes, SetShowIntro }) => {
  const [taxonomy, setTaxonomy] = useState(type);
  const [filterState, setFilterState] = useState([]);
  const { darkIconList } = config;
  const {
    setArraySSG,
    arraySSG,
    arrayCMS,
    setArrayCMS,
    arrayCSS,
    setArrayCSS,
    arrayCategory,
    setArrayCategory,
    arrayTool,
    setArrayTool,
    allReset,
    parameter,
    setParameter,
    taxonomyArray,
    setTaxonomyArray,
  } = useFilterContext();

  useEffect(() => {
    const filterAddition = taxonomy.map((item, id) => ({
      ...item,
      selected: false,
    }));
    setTaxonomy(filterAddition);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, allReset]);
  // add data on texonomy array
  useEffect(() => {
    if (parameter === "ssg") {
      if (!arraySSG.length) {
        setTaxonomyArray(taxonomyArray.filter((el) => el !== parameter));
      } else if (arraySSG.length && taxonomyArray.includes(parameter)) {
        setTaxonomyArray(taxonomyArray);
      } else if (!taxonomyArray.includes(parameter)) {
        setTaxonomyArray((prevValue) => [...prevValue, parameter]);
      }
    } else if (parameter === "css") {
      if (!arrayCSS.length) {
        setTaxonomyArray(taxonomyArray.filter((el) => el !== parameter));
      } else if (arrayCSS.length && taxonomyArray.includes(parameter)) {
        setTaxonomyArray(taxonomyArray);
      } else if (!taxonomyArray.includes(parameter)) {
        setTaxonomyArray((prevValue) => [...prevValue, parameter]);
      }
    } else if (parameter === "cms") {
      if (!arrayCMS.length) {
        setTaxonomyArray(taxonomyArray.filter((el) => el !== parameter));
      } else if (arrayCMS.length && taxonomyArray.includes(parameter)) {
        setTaxonomyArray(taxonomyArray);
      } else if (!taxonomyArray.includes(parameter)) {
        setTaxonomyArray((prevValue) => [...prevValue, parameter]);
      }
    } else if (parameter === "category") {
      if (!arrayCategory.length) {
        setTaxonomyArray(taxonomyArray.filter((el) => el !== parameter));
      } else if (arrayCategory.length && taxonomyArray.includes(parameter)) {
        setTaxonomyArray(taxonomyArray);
      } else if (!taxonomyArray.includes(parameter)) {
        setTaxonomyArray((prevValue) => [...prevValue, parameter]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parameter, arraySSG, arrayCMS, arrayCSS, arrayCategory]);

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

    // set ssg array
    if (type === "ssg") {
      if (arraySSG.includes(label)) {
        setArraySSG(arraySSG.filter((x) => x !== label));
      } else {
        setArraySSG((prevValue) => [...prevValue, label]);
      }
    }

    // set cms array
    if (type === "cms") {
      if (arrayCMS.includes(label)) {
        setArrayCMS(arrayCMS.filter((x) => x !== label));
      } else {
        setArrayCMS((prevValue) => [...prevValue, label]);
      }
    }

    // set css array
    if (type === "css") {
      if (arrayCSS.includes(label)) {
        setArrayCSS(arrayCSS.filter((x) => x !== label));
      } else {
        setArrayCSS((prevValue) => [...prevValue, label]);
      }
    }

    // set category array
    if (type === "category") {
      if (arrayCategory.includes(label)) {
        setArrayCategory(arrayCategory.filter((x) => x !== label));
      } else {
        setArrayCategory((prevValue) => [...prevValue, label]);
      }
    }

    // set tool array
    if (type === "tool") {
      if (arrayTool.includes(label)) {
        setArrayTool(arrayTool.filter((x) => x !== label));
      } else {
        setArrayTool((prevValue) => [...prevValue, label]);
      }
    }
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

  const filterStateFunction = (array, filterArray, taxonomy) => {
    const arrayFilter = filterArray.map((item) => {
      const filterTaxonomy = array.filter((params) =>
        params?.frontmatter[taxonomy]?.map((el) => slugify(el)).includes(item)
      );

      return {
        filterTaxonomy,
      };
    });
    return arrayFilter.map((d) => d.filterTaxonomy).flat();
  };

  useEffect(() => {
    if (parameter === "ssg") {
      if (taxonomyArray[0] === "ssg") {
        setFilterState(filterStateFunction(themes, arraySSG, "ssg"));
      } else {
        if (arraySSG.length) {
          setFilterState(filterStateFunction(filterState, arraySSG, "ssg"));
        } else {
          const filterCSS = filterStateFunction(themes, arrayCSS, "css");
          const filterCMS = filterStateFunction(
            filterCSS.length ? filterCSS : themes,
            arrayCMS,
            "cms"
          );
          const filterCategory = filterStateFunction(
            filterCSS.length
              ? filterCSS
              : filterCMS.length
              ? filterCMS
              : themes,
            arrayCategory,
            "category"
          );

          setFilterState(
            filterCategory.length
              ? filterCategory
              : filterCMS.length
              ? filterCMS
              : filterCSS
          );
        }
      }
    } else if (parameter === "css") {
      if (taxonomyArray[0] === "css") {
        setFilterState(filterStateFunction(themes, arrayCSS, "css"));
      } else {
        if (arrayCSS.length) {
          setFilterState(filterStateFunction(filterState, arrayCSS, "css"));
        } else {
          const filterSSG = filterStateFunction(themes, arraySSG, "ssg");
          const filterCMS = filterStateFunction(
            filterSSG.length ? filterSSG : themes,
            arrayCMS,
            "cms"
          );

          const filterCategory = filterStateFunction(
            filterCMS.length
              ? filterCMS
              : filterSSG.length
              ? filterSSG
              : themes,
            arrayCategory,
            "category"
          );
          setFilterState(
            filterCategory.length
              ? filterCategory
              : filterCMS.length
              ? filterCMS
              : filterSSG
          );
        }

        // setFilterState(filterStateFunction(filterState, arrayCSS, "css"));
      }
    } else if (parameter === "cms") {
      if (taxonomyArray[0] === "cms") {
        setFilterState(filterStateFunction(themes, arrayCMS, "cms"));
      } else {
        if (arrayCMS.length) {
          setFilterState(filterStateFunction(filterState, arrayCMS, "cms"));
        } else {
          const filterSSG = filterStateFunction(themes, arraySSG, "ssg");
          const filterCSS = filterStateFunction(
            filterSSG.length ? filterSSG : themes,
            arrayCSS,
            "css"
          );
          const filterCategory = filterStateFunction(
            filterCSS.length
              ? filterCSS
              : filterSSG.length
              ? filterSSG
              : themes,
            arrayCategory,
            "category"
          );
          setFilterState(
            filterCategory.length
              ? filterCategory
              : filterCSS.length
              ? filterCSS
              : filterSSG
          );
        }
      }
    } else if (parameter === "category") {
      if (taxonomyArray[0] === "category") {
        setFilterState(filterStateFunction(themes, arrayCategory, "category"));
      } else {
        if (arrayCategory.length) {
          setFilterState(
            filterStateFunction(filterState, arrayCategory, "category")
          );
        } else {
          const filterSSG = filterStateFunction(themes, arraySSG, "ssg");
          const filterCSS = filterStateFunction(
            filterSSG.length ? filterSSG : themes,
            arrayCSS,
            "css"
          );
          const filterCMS = filterStateFunction(
            filterCSS.length
              ? filterCSS
              : filterSSG.length
              ? filterSSG
              : themes,
            arrayCMS,
            "cms"
          );

          setFilterState(
            filterCMS.length
              ? filterCMS
              : filterCSS.length
              ? filterCSS
              : filterSSG.length
              ? filterSSG
              : themes
          );
        }
      }
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
        .includes(slugify(item.frontmatter.title))
    ).length;
  };

  return (
    <>
      {data.selected &&
        data.type === params &&
        taxonomy.map(
          (item, i) =>
            countItems(params, item) >= 0 && (
              <a
                onClick={() =>
                  handleOnClick(slugify(item.frontmatter.title), data.type)
                }
                key={`item-${i}`}
                className={`filter-list ${
                  item.selected ? "active" : undefined
                }`}
                style={{ order: item.frontmatter.weight || "100" }}
              >
                <Image
                  className={`${
                    darkIconList.includes(slugify(item.frontmatter.title))
                      ? "dark:brightness-0 dark:invert"
                      : ""
                  } ml-2`}
                  src={item.frontmatter.icon}
                  height={18}
                  width={18}
                  alt={item.frontmatter.title}
                  style={{ maxHeight: "18px" }}
                />
                <span className="ml-2 block">{item.frontmatter.title}</span>
                {parameter && [...new Set(taxonomyArray)][0] === params ? (
                  <span className="ml-auto">{countItems(params, item)}</span>
                ) : taxonomyArray.length === 0 ? (
                  <span className="ml-auto">{countItems(params, item)}</span>
                ) : parameter && params !== [...new Set(taxonomyArray)][0] ? (
                  <span className="ml-auto">
                    {
                      filterState.filter((data) =>
                        data.frontmatter[params]
                          ?.map((d) => slugify(d))
                          ?.includes(slugify(item.frontmatter.title))
                      ).length
                    }
                  </span>
                ) : (
                  <span className="ml-auto">{countItems(params, item)}</span>
                )}
              </a>
            )
        )}
    </>
  );
};

export default Accordion;
