import { reducer } from "@lib/utils/filterReducer";
import { useReducer, useState } from "react";

const SortReducer = (addcategorys) => {
  const defaultSort = addcategorys.sort(
    (a, b) => new Date(b.frontmatter?.date) - new Date(a.frontmatter?.date)
  );
  const [isShow, setIsShow] = useState(false);
  const [isValue, setIsValue] = useState("default");
  const [currentTheme, dispatch] = useReducer(reducer, defaultSort);
  const handleSortTheme = (e, type) => {
    dispatch({ type: type });
    setIsValue(e.target.value);
    setIsShow(!isShow);
  };
  return {
    currentTheme,
    handleSortTheme,
    isShow,
    setIsShow,
    isValue,
    setIsValue,
    defaultSort,
  };
};

export default SortReducer;
