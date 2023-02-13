import React, { createContext, useContext, useState } from "react";
import resources from "../.json/resources.json";
import themes from "../.json/themes.json";
import blog from "../.json/blog.json";

import tools from "../.json/tools.json";

const AppsarchContext = createContext();
export const SearchContext = ({ children }) => {
  const [searchKey, setSearchkey] = useState("");
  const [isTheme, setIsTheme] = useState(true);
  const [isResource, setIsResource] = useState(true);
  const [isBlog, setIsBlog] = useState(true);

  const state = {
    themes,

    resources,
    tools,
    searchKey,
    setSearchkey,
    themes: isTheme ? themes : [],
    resources: isResource ? resources : [],
    blog: isBlog ? blog : [],
    setIsBlog,
    setIsResource,
    setIsTheme,
    isResource,
    isTheme,
    isBlog,
  };

  return (
    <AppsarchContext.Provider value={state}>
      {children}
    </AppsarchContext.Provider>
  );
};
export const useSerachContext = () => {
  return useContext(AppsarchContext);
};
