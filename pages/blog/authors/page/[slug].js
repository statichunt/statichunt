import Pagination from "@/components/Pagination";
import config from "@/config/config.json";
import Authors from "@/layouts/Authors";
import Base from "@/layouts/Baseof";
import MobileSidebar from "@/layouts/partials/MobileSidebar";
import { getListPage, getSinglePage } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";

// blog pagination
const AuthorPagination = ({
  authorIndex,
  authors,
  currentPage,
  pagination,
}) => {
  const indexOfLastAuthor = currentPage * pagination;
  const indexOfFirstAuthor = indexOfLastAuthor - pagination;
  const totalPages = Math.ceil(authors.length / pagination);
  const currentAuthors = authors.slice(indexOfFirstAuthor, indexOfLastAuthor);
  const { frontmatter, content } = authorIndex;
  const { title } = frontmatter;

  return (
    <Base title={title}>
      <MobileSidebar />
      <section className="section relative after:absolute after:left-0 after:top-0 after:h-[700px] after:max-h-full after:w-full after:bg-theme-light after:content-[''] dark:bg-darkmode-body dark:after:bg-darkmode-theme-light">
        <div className="container relative z-20">
          <div className="row justify-center">
            <div className="lg:col-10">
              {markdownify(title, "h1", "h2 mb-8 text-center")}
              <div className="mb-8 rounded bg-white p-6 shadow dark:bg-darkmode-theme-dark">
                <Authors authors={currentAuthors} />
              </div>
              <Pagination
                section={"authors"}
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

export default AuthorPagination;

// get authors pagination slug
export const getStaticPaths = () => {
  const getAllSlug = getSinglePage("content/blog-authors");
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

// get authors pagination content
export const getStaticProps = async ({ params }) => {
  const currentPage = parseInt((params && params.slug) || 1);
  const { pagination } = config.settings;
  const authors = getSinglePage("content/blog-authors");
  const authorIndex = await getListPage("content/blog-authors/_index.md");

  return {
    props: {
      pagination: pagination,
      authors: authors,
      currentPage: currentPage,
      authorIndex: authorIndex,
      mdxContent: authorIndex.mdxContent,
    },
  };
};
