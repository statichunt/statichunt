import { reducer } from "@lib/utils/filterReducer";
import { useEffect, useReducer, useState } from "react";

const SortReducer = (themes, show, slug) => {
  const defaultSortedThemes = themes.sort(
    (a, b) => new Date(b.frontmatter?.date) - new Date(a.frontmatter?.date)
  );

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

export default SortReducer;
