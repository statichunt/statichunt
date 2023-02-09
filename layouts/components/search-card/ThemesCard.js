import { useSerachContext } from "context/searchContext";
import Image from "next/image";
import React from "react";

const ThemesCard = () => {
  const { themes, searchKey } = useSerachContext();

  let searchtTheme = themes.filter((theme) => {
    const searchString = searchKey.toLowerCase();
    if (searchString === "") {
      return "";
    } else if (theme.frontmatter.title.toLowerCase().includes(searchString)) {
      return theme;
    } else if (
      theme.frontmatter.description?.toLowerCase().includes(searchString)
    ) {
      return theme;
    } else if (
      theme.frontmatter?.ssg
        ?.map((el) => el?.toLowerCase())
        .includes(searchString)
    ) {
      return theme;
    } else if (
      theme.frontmatter?.category
        ?.map((el) => el?.toLowerCase())
        .includes(searchString)
    ) {
      return theme;
    } else if (
      theme.frontmatter?.css
        ?.map((el) => el?.toLowerCase())
        .includes(searchString)
    ) {
      return theme;
    } else if (
      theme.frontmatter?.cms
        ?.map((el) => el?.toLowerCase())
        .includes(searchString)
    ) {
      return theme;
    } else if (theme.frontmatter.author.toLowerCase().includes(searchString)) {
      return theme;
    }
  });

  console.log("theme", searchtTheme);
  return (
    <div
      className={`max-w-sm overflow-hidden rounded shadow-sm ${
        searchtTheme.length ? "block" : "hidden"
      }`}
    >
      <div className="px-6 py-4">
        <div className="mb-2 text-xl font-bold">Card Title</div>
        <p className="text-base text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod
          mauris vel purus rutrum, in dictum ligula consectetur.
        </p>
      </div>
    </div>
  );
};

export default ThemesCard;
