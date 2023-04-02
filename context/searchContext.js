import { createContext, useContext, useState } from "react";
import blogs from "../.json/blog.json";
import themeTools from "../.json/theme-tools.json";
import themes from "../.json/themes.json";
import tools from "../.json/tools.json";

const AppsarchContext = createContext();
export const SearchContext = ({ children }) => {
  const [searchKey, setSearchkey] = useState("");
  const [isTheme, setIsTheme] = useState(false);
  const [isTool, setIsTool] = useState(false);
  const [isBlog, setIsBlog] = useState(false);
  const [searchModal, setSeachModal] = useState(false);

  const state = {
    searchModal,
    setSeachModal,
    themeTools,
    searchKey,
    setSearchkey,
    themes,
    tools,
    blogs,
    setIsBlog,
    setIsTool,
    setIsTheme,
    isTool,
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
