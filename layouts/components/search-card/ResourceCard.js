import { useSerachContext } from "context/searchContext";
import React from "react";

const ResourceCard = () => {
  const { resources, searchKey } = useSerachContext();
  // const searchFunction = (searchtext, existingText) => {
  //   return searchtext
  //     .split(" ")
  //     .map((data) => existingText.split(" ").includes(data))
  //     .includes(true);
  // };

  // search filtering
  let searchResource = resources.filter((resource) => {
    const searchString = searchKey.toLowerCase();
    if (searchString === "") {
      return "";
    } else if (
      resource.frontmatter.title.toLowerCase().includes(searchString)
    ) {
      return resource;
    } else if (
      resource.frontmatter.description.toLowerCase().includes(searchString)
    ) {
      return resource;
    } else if (
      resource.frontmatter.tool
        .map((el) => el.toLowerCase())
        .includes(searchString)
    ) {
      return resource;
    }
  });

  console.log("resource", searchResource);
  return (
    <div
      className={`max-w-sm overflow-hidden rounded shadow-sm ${
        searchResource.length ? "block" : "hidden"
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

export default ResourceCard;
