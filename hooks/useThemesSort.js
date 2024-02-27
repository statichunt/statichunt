import { sortByDate, sortByWeight } from "@/lib/utils/sortFunctions";
import { reducer } from "@/lib/utils/sortReducer";
import { useFilterContext } from "context/filterContext";
import { useEffect, useReducer, useState } from "react";

const useThemesSort = ({ themes, weightType, slug }) => {
  const { allReset } = useFilterContext();
  const themesSortedByDate = sortByDate(themes);
  const defaultSortedThemes = sortByWeight(themesSortedByDate, weightType);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  useEffect(() => {
    dispatch({ type: "SLUG", payload: defaultSortedThemes });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
