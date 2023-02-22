import { createContext, useContext, useState } from "react";
import blogs from "../.json/blog.json";
import resources from "../.json/resources.json";
import themes from "../.json/themes.json";
import tools from "../.json/tools.json";

const AppsarchContext = createContext();
export const SearchContext = ({ children }) => {
  const [searchKey, setSearchkey] = useState("");
  const [isTheme, setIsTheme] = useState(false);
  const [isResource, setIsResource] = useState(false);
  const [isBlog, setIsBlog] = useState(false);
  const [searchModal, setSeachModal] = useState(false);

  const state = {
    searchModal,
    setSeachModal,
    tools,
    searchKey,
    setSearchkey,
    themes,
    resources,
    blogs,
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
