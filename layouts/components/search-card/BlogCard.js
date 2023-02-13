import { useSerachContext } from "context/searchContext";
import React from "react";

const BlogCard = () => {
  const { blog, searchKey } = useSerachContext();

  return <div className="mt-4">blogCard</div>;
};

export default BlogCard;
