import posts from "@/json/blog.json";
import PostSingle from "@/layouts/PostSingle";
import { parseMDX } from "@/lib/utils/mdxParser";
import { getMultiPageServer, getSinglePageServer } from "lib/contentParser";
import { similarPosts } from "lib/utils/similarItems";

// post single layout
const Article = ({ post, authors, mdxContent, slug }) => {
  const { frontmatter, content } = post;
  const similarItems = similarPosts(post, posts, slug).slice(0, 3);

  return (
    <PostSingle
      frontmatter={frontmatter}
      content={content}
      mdxContent={mdxContent}
      authors={authors}
      similarPosts={similarItems}
    />
  );
};

// get single page on server side
export const getServerSideProps = async ({ params }) => {
  const { single } = params;

  const post = await getSinglePageServer("content/blog", single);
  const mdxContent = await parseMDX(post.content);
  const authors = await getMultiPageServer(
    "content/blog-authors",
    post.frontmatter.authors,
  );

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
      authors: authors,
      mdxContent: mdxContent,
    },
  };
};

export default Article;
