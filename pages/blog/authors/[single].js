import AuthorSingle from "@/layouts/AuthorSingle";
import { getSinglePage } from "@/lib/contentParser";
import { parseMDX } from "@/lib/utils/mdxParser";

// authors single layout
const BlogAuthor = ({ author, mdxContent, posts, authors }) => {
  const { frontmatter, content } = author[0];

  return (
    <AuthorSingle
      frontmatter={frontmatter}
      content={content}
      mdxContent={mdxContent}
      posts={posts}
      authors={authors}
    />
  );
};

export default BlogAuthor;

// get authors single slug
export const getStaticPaths = () => {
  const allSlug = getSinglePage("content/blog-authors");
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

// get authors single content
export const getStaticProps = async ({ params }) => {
  const { single } = params;
  const authors = getSinglePage("content/blog-authors");
  const posts = getSinglePage("content/blog");
  const author = authors.filter((author) => author.slug === single);
  const mdxContent = await parseMDX(author[0].content);

  return {
    props: {
      author: author,
      mdxContent: mdxContent,
      slug: single,
      posts: posts,
      authors: authors,
    },
  };
};
