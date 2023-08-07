import Base from "@/layouts/Baseof";
import MobileSidebar from "@/layouts/partials/MobileSidebar";
import Posts from "@/layouts/Posts";
import { getSinglePage } from "@/lib/contentParser";
import { getTaxonomy } from "@/lib/taxonomyParser";
import { humanize, slugify } from "@/lib/utils/textConverter";

// category page
const Category = ({ category, posts, authors }) => {
  return (
    <Base title={humanize(category)}>
      <MobileSidebar />
      <div className="section">
        <div className="container">
          <div className="row justify-center">
            <div className="xl:col-10">
              <h1 className="h2 mb-8 text-center">
                Showing Posts From{" "}
                <span className="text-primary underline">
                  {humanize(category)}
                </span>
              </h1>
              <Posts posts={posts} authors={authors} />
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Category;

// category page routes
export const getStaticPaths = () => {
  const allCategories = getTaxonomy("content/blog", "categories");

  const paths = allCategories.map((category) => ({
    params: {
      category: category,
    },
  }));

  return { paths, fallback: false };
};

// category page data
export const getStaticProps = ({ params }) => {
  const posts = getSinglePage("content/blog");
  const filterPosts = posts.filter((post) =>
    post.frontmatter.categories.find((category) =>
      slugify(category).includes(params.category),
    ),
  );
  const authors = getSinglePage("content/blog-authors");

  return {
    props: { posts: filterPosts, category: params.category, authors: authors },
  };
};
