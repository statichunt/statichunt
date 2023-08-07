import PostSingle from "@/layouts/PostSingle";
import { getSinglePage } from "@/lib/contentParser";
import { parseMDX } from "@/lib/utils/mdxParser";

// post single layout
const Article = ({ post, posts, authors, mdxContent, slug }) => {
  const { frontmatter, content } = post[0];

  return (
    <PostSingle
      frontmatter={frontmatter}
      content={content}
      mdxContent={mdxContent}
      authors={authors}
      slug={slug}
      post={post}
      posts={posts}
    />
  );
};

// get post single slug
export const getStaticPaths = () => {
  const allSlug = getSinglePage("content/blog");
  const paths = allSlug.map((item) => ({
    params: {
      single: item.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

// get post single content
export const getStaticProps = async ({ params }) => {
  const { single } = params;
  const posts = getSinglePage("content/blog");
  const post = posts.filter((post) => post.slug === single);
  const authors = getSinglePage("content/blog-authors");
  const mdxContent = await parseMDX(post[0].content);

  return {
    props: {
      post: post,
      posts: posts,
      authors: authors,
      mdxContent: mdxContent,
      slug: single,
    },
  };
};

export default Article;
