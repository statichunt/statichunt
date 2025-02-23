import { sortByDate } from "@/lib/utils/sortFunctions";
import { reducer } from "@/lib/utils/sortReducer";
import { useFilterContext } from "context/filterContext";
import { sortByHandpicked } from "lib/utils/sortFunctions";
import { useEffect, useReducer, useState } from "react";

const useThemesSort = ({ themes, handpicked, slug }) => {
  const { allReset } = useFilterContext();
  const themesSortedByDate = sortByDate(themes);
  const defaultSortedThemes = sortByHandpicked(themesSortedByDate, handpicked);
  const [sortValue, setSortValue] = useState("default");
  const [sortedThemes, dispatch] = useReducer(reducer, defaultSortedThemes);

  const handleSortThemes = (e, type) => {
    dispatch({ type: type });
    setSortValue(e.target.value);
  };

  useEffect(() => {
    if (slug) {
      dispatch({ type: "SLUG", payload: defaultSortedThemes });
      setSortValue("default");
    }
  }, [slug]);

  useEffect(() => {
    dispatch({ type: "SLUG", payload: defaultSortedThemes });
  }, [allReset]);

  return {
    sortedThemes,
    handleSortThemes,
    sortValue,
    setSortValue,
    defaultSortedThemes,
  };
};

export default useThemesSort;
