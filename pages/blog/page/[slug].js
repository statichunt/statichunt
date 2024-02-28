import Pagination from "@/components/Pagination";
import config from "@/config/config.json";
import Base from "@/layouts/Baseof";
import Posts from "@/layouts/Posts";
import MobileSidebar from "@/layouts/partials/MobileSidebar";
import { getListPage, getSinglePage } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";

// blog pagination
const BlogPagination = ({
  postIndex,
  posts,
  authors,
  currentPage,
  pagination,
}) => {
  const indexOfLastPost = currentPage * pagination;
  const indexOfFirstPost = indexOfLastPost - pagination;
  const totalPages = Math.ceil(posts.length / pagination);
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const { frontmatter, content } = postIndex;
  const { title, meta_title } = frontmatter;

  return (
    <Base title={title} meta_title={meta_title}>
      <MobileSidebar />
      <section className="section">
        <div className="container">
          <div className="row justify-center">
            <div className="xl:col-10">
              <div className="mb-8 text-center">
                {markdownify(title, "h1", "mb-4")}
                {markdownify(content, "p")}
              </div>
              <Posts posts={currentPosts} authors={authors} />
              <Pagination
                section={"blog"}
                totalPages={totalPages}
                currentPage={currentPage}
              />
            </div>
          </div>
        </div>
      </section>
    </Base>
  );
};

export default BlogPagination;

// get blog pagination slug
export const getStaticPaths = () => {
  const getAllSlug = getSinglePage("content/blog");
  const allSlug = getAllSlug.map((item) => item.slug);
  const { pagination } = config.settings;
  const totalPages = Math.ceil(allSlug.length / pagination);
  let paths = [];

  for (let i = 1; i < totalPages; i++) {
    paths.push({
      params: {
        slug: (i + 1).toString(),
      },
    });
  }

  return {
    paths,
    fallback: false,
  };
};

// get blog pagination content
export const getStaticProps = async ({ params }) => {
  const currentPage = parseInt((params && params.slug) || 1);
  const { pagination } = config.settings;
  const posts = getSinglePage("content/blog");
  const authors = getSinglePage("content/blog-authors");
  const postIndex = await getListPage("content/blog/_index.md");

  return {
    props: {
      pagination: pagination,
      posts: posts,
      authors: authors,
      currentPage: currentPage,
      postIndex: postIndex,
    },
  };
};
