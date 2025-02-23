import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

const FilterContext = createContext();

export const JsonContext = ({ children }) => {
  const [arraySSG, setArraySSG] = useState([]);
  const [arrayCMS, setArrayCMS] = useState([]);
  const [arrayCSS, setArrayCSS] = useState([]);
  const [arrayUI, setArrayUI] = useState([]);
  const [arrayCategory, setArrayCategory] = useState([]);
  const [arrayOpenSource, setArrayOpenSource] = useState([]);
  const [arrayFree, setArrayFree] = useState([]);
  const [arrayPremium, setArrayPremium] = useState([]);
  const [arrayToolsCategory, setArrayToolsCategory] = useState([]);
  const [allReset, setAllReset] = useState(false);
  const [sortAsc, setSortAsc] = useState(false);
  const [parameter, setParameter] = useState("");
  const [taxonomyArray, setTaxonomyArray] = useState([]);

  const router = useRouter();
  const reset = () => {
    setArraySSG([]);
    setArrayCMS([]);
    setArrayCSS([]);
    setArrayUI([]);
    setArrayCategory([]);
    setArrayPremium([]);
    setArrayFree([]);
    setArrayOpenSource([]);
    setAllReset(!allReset);
    setSortAsc(false);
  };

  useEffect(() => {
    setArraySSG([]);
    setArrayCMS([]);
    setArrayCSS([]);
    setArrayUI([]);
    setArrayCategory([]);
    setArrayPremium([]);
    setArrayFree([]);
    setArrayOpenSource([]);
    setTaxonomyArray([]);
  }, [router.asPath]);

  const state = {
    allReset,
    reset,
    arrayCMS,
    setArrayCMS,
    setArrayCSS,
    arrayCSS,
    arrayUI,
    setArrayUI,
    setArraySSG,
    arraySSG,
    arrayCategory,
    setArrayCategory,
    arrayOpenSource,
    setArrayOpenSource,
    arrayFree,
    setArrayFree,
    arrayPremium,
    setArrayPremium,
    arrayToolsCategory,
    setArrayToolsCategory,
    sortAsc,
    setSortAsc,
    parameter,
    setParameter,
    taxonomyArray,
    setTaxonomyArray,
  };

  return (
    <FilterContext.Provider value={state}>{children}</FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  return useContext(FilterContext);
};
