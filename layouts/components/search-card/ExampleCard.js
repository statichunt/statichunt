import { useSerachContext } from "context/searchContext";
import React from "react";

const ExampleCard = () => {
  const { examples, searchKey } = useSerachContext();

  let searchExample = examples.filter((example) => {
    const searchString = searchKey.toLowerCase();
    if (searchString === "") {
      return "";
    } else if (example.frontmatter.title.toLowerCase().includes(searchString)) {
      return example;
    } else if (
      example.frontmatter.description?.toLowerCase().includes(searchString)
    ) {
      return example;
    } else if (
      example.frontmatter?.ssg
        ?.map((el) => el?.toLowerCase())
        .includes(searchString)
    ) {
      return example;
    } else if (
      example.frontmatter?.category
        ?.map((el) => el?.toLowerCase())
        .includes(searchString)
    ) {
      return example;
    } else if (
      example.frontmatter?.css
        ?.map((el) => el?.toLowerCase())
        .includes(searchString)
    ) {
      return example;
    } else if (
      example.frontmatter?.cms
        ?.map((el) => el?.toLowerCase())
        .includes(searchString)
    ) {
      return example;
    }
    // else if (example.frontmatter.author.toLowerCase().includes(searchString)) {
    //   return example;
    // }
  });

  console.log("example",searchExample);
  return <div className="mt-4">ExampleCard</div>;
};

export default ExampleCard;
