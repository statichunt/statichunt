import { sortByWeight } from "@lib/utils/sortFunctions";
import { reducer } from "@lib/utils/sortReducer";
import { useFilterContext } from "context/state";
import { useEffect, useReducer, useState } from "react";

const useThemesSort = (themes, show, slug) => {
  const { allReset } = useFilterContext();
  const themesSortedByDate = sortByWeight(themes);
  const defaultSortedThemes = sortByWeight(themesSortedByDate);
  const [sortMenuShow, setSortMenuShow] = useState(false);
  const [sortValue, setSortValue] = useState("default");
  const [sortedThemes, dispatch] = useReducer(reducer, defaultSortedThemes);

  const handleSortThemes = (e, type) => {
    dispatch({ type: type });
    setSortValue(e.target.value);
    if (!show) {
      setSortMenuShow(!sortMenuShow);
    }
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
    setSortValue("default");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allReset]);
  const handleSortMenu = () => {
    setSortMenuShow(!sortMenuShow);
  };

  return {
    sortedThemes,
    handleSortThemes,
    sortMenuShow,
    setSortMenuShow,
    sortValue,
    setSortValue,
    defaultSortedThemes,
    handleSortMenu,
  };
};

export default useThemesSort;
