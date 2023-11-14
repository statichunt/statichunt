import { createContext, useContext, useState } from "react";
import blogs from "../.json/blog.json";
import themeTools from "../.json/theme-tools.json";
import themes from "../.json/themes.json";
import tools from "../.json/tools.json";

const AppSearchContext = createContext();
export const SearchContext = ({ children }) => {
  const [searchKey, setSearchKey] = useState("");
  const [isTheme, setIsTheme] = useState(false);
  const [isTool, setIsTool] = useState(false);
  const [isBlog, setIsBlog] = useState(false);
  const [searchModal, setSearchModal] = useState(false);

  const state = {
    searchModal,
    setSearchModal,
    themeTools,
    searchKey,
    setSearchKey,
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
    setSearchModal,
  };

  return (
    <AppSearchContext.Provider value={state}>
      {children}
    </AppSearchContext.Provider>
  );
};
export const useSearchContext = () => {
  return useContext(AppSearchContext);
};
