import { slugify } from "@/lib/utils/textConverter";
import { useFilterContext } from "context/filterContext";
import { useState } from "react";

const useTaxonomyHandler = (themes) => {
  const {
    arraySSG,
    arrayCMS,
    arrayCSS,
    arrayCategory,
    arrayToolsCategory,
    setArraySSG,
    setArrayCSS,
    setArrayCMS,
    setArrayCategory,
    setArrayToolsCategory,
    taxonomyArray,
    setTaxonomyArray,
    parameter,
  } = useFilterContext();
  const [filterState, setFilterState] = useState([]);

  // handle taxonomy change
  const handleTaxonomyChange = (array, setArray, label) => {
    if (array.includes(label)) {
      setArray(array.filter((x) => x !== label));
    } else {
      setArray((prevValue) => [...prevValue, label]);
    }
  };
  const taxonomyArrayHandler = (label, type) => {
    switch (type) {
      case "ssg":
        handleTaxonomyChange(arraySSG, setArraySSG, label);
        break;
      case "css":
        handleTaxonomyChange(arrayCSS, setArrayCSS, label);
        break;
      case "cms":
        handleTaxonomyChange(arrayCMS, setArrayCMS, label);
        break;
      case "category":
        handleTaxonomyChange(arrayCategory, setArrayCategory, label);
        break;
      case "tools-category":
        handleTaxonomyChange(arrayToolsCategory, setArrayToolsCategory, label);
        break;
      default:
        break;
    }
  };

  // filter taxonomy
  const filterStateFunction = (array, filterArray, taxonomy) => {
    const arrayFilter = filterArray.map((item) => {
      const filterTaxonomy = array.filter((params) =>
        params?.frontmatter[taxonomy]?.map((el) => slugify(el)).includes(item),
      );

      return {
        filterTaxonomy,
      };
    });
    return arrayFilter.map((d) => d.filterTaxonomy).flat();
  };

  const filteringTaxonomy = (
    first_params,
    second_params,
    third_params,
    fourth_params,
  ) => {
    if (taxonomyArray[0] === first_params.params) {
      setFilterState(
        filterStateFunction(themes, first_params.array, first_params.params),
      );
    } else {
      if (first_params.array.length) {
        setFilterState(
          filterStateFunction(
            filterState,
            first_params.array,
            first_params.params,
          ),
        );
      } else {
        const filterArray_one = filterStateFunction(
          themes,
          second_params.array,
          second_params.params,
        );
        const filterArray_two = filterStateFunction(
          filterArray_one.length ? filterArray_one : themes,
          third_params.array,
          third_params.params,
        );
        const filterArray_three = filterStateFunction(
          filterArray_one.length
            ? filterArray_one
            : filterArray_two.length
              ? filterArray_two
              : themes,
          fourth_params.array,
          fourth_params.params,
        );

        setFilterState(
          filterArray_three.length
            ? filterArray_three
            : filterArray_two.length
              ? filterArray_two
              : filterArray_one,
        );
      }
    }
  };

  //  adding taxonomy
  const handleTaxonomyArray = (array) => {
    if (!array.length) {
      setTaxonomyArray(taxonomyArray.filter((el) => el !== parameter));
    } else if (array.length && taxonomyArray.includes(parameter)) {
      setTaxonomyArray(taxonomyArray);
    } else if (!taxonomyArray.includes(parameter)) {
      setTaxonomyArray((prevValue) => [...prevValue, parameter]);
    }
  };
  return {
    filterState,
    taxonomyArrayHandler,
    filteringTaxonomy,
    handleTaxonomyArray,
  };
};

export default useTaxonomyHandler;
