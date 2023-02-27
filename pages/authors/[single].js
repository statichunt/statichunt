import AuthorSingle from "@layouts/AuthorSingle";
import { getSinglePage } from "@lib/contentParser";
import { parseMDX } from "@lib/utils/mdxParser";

// authors single layout
const Article = ({ author, mdxContent }) => {
  const { frontmatter, content } = author[0];

  return (
    <AuthorSingle
      frontmatter={frontmatter}
      content={content}
      mdxContent={mdxContent}
    />
  );
};

// get authors single slug
export const getStaticPaths = () => {
  const allSlug = getSinglePage("content/authors");
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
  const getAuthors = getSinglePage("content/authors");
  const author = getAuthors.filter((author) => author.slug === single);
  const mdxContent = await parseMDX(author[0].content);

  return {
    props: {
      author: author,
      mdxContent: mdxContent,
      slug: single,
    },
  };
};

export default Article;
