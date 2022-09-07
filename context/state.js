import { createContext, useContext } from "react";
import resources from "../.json/resources.json";
import themes from "../.json/themes.json";

const FilterContext = createContext();

export const JsonContext = ({ children }) => {
  const state = {
    themes,
    resources,
  };
  return (
    <FilterContext.Provider value={state}>{children}</FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  return useContext(FilterContext);
};
