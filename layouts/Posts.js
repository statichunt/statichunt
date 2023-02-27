import ImageFallback from "@components/ImageFallback";
import config from "@config/config.json";
import { dateFormat } from "@lib/utils/dateFormat";
import { humanize, slugify } from "@lib/utils/textConverter";
import Link from "next/link";

const Posts = ({ posts, authors, customRowClass, customColClass }) => {
  const { summary_length } = config.settings;
  return (
    <div
      className={customRowClass ? customRowClass : "row justify-center px-4"}
    >
      {posts.map((post, i) => (
        <div
          key={`key-${i}`}
          className="col-12 border-b py-8 px-0 xl:col-10 last:border-0"
        >
          <div className="row lg:items-center">
            <div
              className={
                customColClass
                  ? customColClass
                  : "mb-5 md:col-6 lg:col-5 md:mb-0"
              }
            >
              {post.frontmatter.image ? (
                <ImageFallback
                  className="w-full rounded object-cover"
                  src={post.frontmatter.image}
                  alt={post.frontmatter.title}
                  width={500}
                  height={330}
                />
              ) : (
                <span className="flex h-[220px] max-h-full w-[500px] max-w-full items-center justify-center rounded bg-theme-light text-[10rem] text-dark dark:bg-darkmode-theme-light dark:text-darkmode-dark">
                  {post.frontmatter.title.charAt(0)}
                </span>
              )}
            </div>
            <div className="md:col-6 lg:col-7">
              <ul className="space-x-2">
                {post.frontmatter.categories.map((category, i) => (
                  <li className="mb-4 inline-block" key={`category-${i}`}>
                    <Link
                      href={`/blog/categories/${slugify(category)}`}
                      className="rounded bg-theme-light from-primary to-secondary px-3 py-1 text-primary hover:bg-gradient-to-r hover:text-white dark:bg-darkmode-theme-light dark:text-darkmode-light"
                    >
                      {humanize(category)}
                    </Link>
                  </li>
                ))}
              </ul>
              <h2 className="h3 mb-4">
                <Link
                  href={`/blog/${post.slug}`}
                  className="block hover:text-primary"
                >
                  {post.frontmatter.title}
                </Link>
              </h2>

              <ul className="text-text">
                <li className="mb-2 mr-4 inline-block">
                  {authors
                    .filter((author) =>
                      post.frontmatter.authors
                        .map((author) => slugify(author))
                        .includes(slugify(author.frontmatter.title))
                    )
                    .map((author, i) => (
                      <Link
                        href={`/authors/${slugify(author.frontmatter.title)}`}
                        key={`author-${i}`}
                        className="inline-block font-bold text-dark hover:text-primary dark:text-darkmode-dark"
                      >
                        <span className="mr-2">
                          <ImageFallback
                            src={author.frontmatter.image}
                            alt={author.frontmatter.title}
                            fallback="/images/author-placeholder.png"
                            height={40}
                            width={40}
                            className="h-9 w-9 rounded-full border-2"
                          />
                        </span>
                        <span>{author.frontmatter.title}</span>
                      </Link>
                    ))}
                </li>
                <li className="mb-2 mr-4 inline-block border-l pl-3 leading-none text-dark dark:text-darkmode-dark">
                  {dateFormat(post.frontmatter.date)}
                </li>
              </ul>
              <p className="mb-0">
                {post.content.slice(0, Number(summary_length))}...
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
