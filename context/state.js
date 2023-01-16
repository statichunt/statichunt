import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import resources from "../.json/resources.json";
import themes from "../.json/themes.json";

const FilterContext = createContext();

export const JsonContext = ({ children }) => {
  const [arraySSG, setArraySSG] = useState([]);
  const [arrayCMS, setArrayCMS] = useState([]);
  const [arrayCSS, setArrayCSS] = useState([]);
  const [arrayCategory, setArrayCategory] = useState([]);
  const [arrayFree, setArrayFree] = useState([]);
  const [arrayPremium, setArrayPremium] = useState([]);
  const [arrayTool, setArrayTool] = useState([]);
  const [allReset, setAllReset] = useState(false);
  const [sortAsc, setSortAsc] = useState(false);
  const router = useRouter();
  const reset = () => {
    setArraySSG([]);
    setArrayCMS([]);
    setArrayCSS([]);
    setArrayCategory([]);
    setArrayPremium([]);
    setArrayFree([]);
    setAllReset(!allReset);
    setSortAsc(false);
  };
  useEffect(() => {
    setArraySSG([]);
    setArrayCMS([]);
    setArrayCSS([]);
    setArrayCategory([]);
    setArrayPremium([]);
    setArrayFree([]);
  }, [router.asPath]);
  const state = {
    allReset,
    themes,
    resources,
    reset,
    arrayCMS,
    setArrayCMS,
    setArrayCSS,
    arrayCSS,
    setArraySSG,
    arraySSG,
    arrayCategory,
    setArrayCategory,
    arrayFree,
    setArrayFree,
    arrayPremium,
    setArrayPremium,
    arrayTool,
    setArrayTool,
    sortAsc,
    setSortAsc,
  };
  return (
    <FilterContext.Provider value={state}>{children}</FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  return useContext(FilterContext);
};
