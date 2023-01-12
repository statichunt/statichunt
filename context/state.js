import { createContext, useContext, useState } from "react";
import resources from "../.json/resources.json";
import themes from "../.json/themes.json";

const FilterContext = createContext();

export const JsonContext = ({ children }) => {
  const [test, setTest] = useState("");
  const [arraySSG, setArraySSG] = useState([]);
  const [arrayCMS, setArrayCMS] = useState([]);
  const [arrayCSS, setArrayCSS] = useState([]);
  const state = {
    themes,
    resources,
    setTest,
    test,
    arrayCMS,
    setArrayCMS,
    setArrayCSS,
    arrayCSS,
    setArraySSG,
    arraySSG
  };
  return (
    <FilterContext.Provider value={state}>{children}</FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  return useContext(FilterContext);
};
