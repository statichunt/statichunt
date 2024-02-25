import { getSinglePageServer } from "lib/contentParser";
import { parseMDX } from "lib/utils/mdxParser";
import React from "react";

const ExpertSingle = ({ post, mdxContent, slug }) => {
  return <div>{slug}</div>;
};

// get single page on server side
export const getServerSideProps = async ({ params }) => {
  const { single } = params;

  const post = await getSinglePageServer("content/experts", single);
  const mdxContent = await parseMDX(post.content);
  // const authors = await getMultiPageServer(
  //   "content/blog-authors",
  //   post.frontmatter.authors,
  // );

  // handle 404
  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      slug: single,
      post: post,
      // authors: authors,
      mdxContent: mdxContent,
    },
  };
};

export default ExpertSingle;
