import { createContext, useContext, useEffect, useState } from "react";
import blogs from "../.json/blog.json";
import resources from "../.json/resources.json";
import themes from "../.json/themes.json";

import tools from "../.json/tools.json";

const AppsarchContext = createContext();
export const SearchContext = ({ children }) => {
  const [searchKey, setSearchkey] = useState("");
  const [isTheme, setIsTheme] = useState(true);
  const [isResource, setIsResource] = useState(true);
  const [isBlog, setIsBlog] = useState(true);
  const [searchModal, setSeachModal] = useState(false);
  useEffect(() => {
    setIsBlog(true);
    setIsResource(true);
    setIsTheme(true);
  }, [searchModal]);
  const state = {
    searchModal,
    setSeachModal,
    tools,
    searchKey,
    setSearchkey,
    themes: isTheme ? themes : [],
    resources: isResource ? resources : [],
    blogs: isBlog ? blogs : [],
    setIsBlog,
    setIsResource,
    setIsTheme,
    isResource,
    isTheme,
    isBlog,
    searchModal,
    setSeachModal,
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
