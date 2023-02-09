import { useSerachContext } from "context/searchContext";
import React from "react";

const ThemesCard = () => {
  const { themes, searchKey } = useSerachContext();

  console.log(themes);
  return <div className="mt-4">ThemesCard</div>;
};

export default ThemesCard;
