import config from "@/config/config.json";
import { dateFormat } from "@/lib/utils/dateFormat";
import { humanize, slugify } from "@/lib/utils/textConverter";
import { plainify } from "lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";
import Gravatar from "react-gravatar";

const Posts = ({ posts, authors, className }) => {
  const { summary_length } = config.settings;
  return (
    <div
      className={`row justify-center px-4 ${className ? className : "col-12"}`}
    >
      {posts.map((post, i) => (
        <div
          key={`post-${i}`}
          className="border-b border-border px-0 py-8 last:border-0 dark:border-darkmode-border"
        >
          <div className="row lg:items-center">
            <div className="mb-5 md:col-6 lg:col-5 md:mb-0">
              {post.frontmatter.image ? (
                <Image
                  className="w-full rounded object-cover"
                  src={post.frontmatter.image}
                  alt={post.frontmatter.title}
                  width={500}
                  height={330}
                />
              ) : (
                <span className="flex h-[240px] max-h-full w-full items-center justify-center rounded bg-theme-light text-[10rem] text-dark dark:bg-darkmode-theme-light dark:text-darkmode-dark">
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
                  className="block hover:text-primary dark:hover:text-darkmode-primary"
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
                        .includes(slugify(author.frontmatter.title)),
                    )
                    .map((author, i) => (
                      <Link
                        href={`/blog/authors/${slugify(
                          author.frontmatter.title,
                        )}`}
                        key={`author-${i}`}
                        className="inline-block font-bold text-dark hover:text-primary dark:text-darkmode-dark dark:hover:text-darkmode-primary"
                      >
                        {author.frontmatter.image ? (
                          <Image
                            src={author.frontmatter.image}
                            alt={author.frontmatter.title}
                            height={40}
                            width={40}
                            className="mr-2 h-9 w-9 rounded-full border-2 border-border dark:border-darkmode-border"
                          />
                        ) : (
                          <Gravatar
                            email={author.frontmatter.email}
                            size={40}
                            className="mr-2 h-9 w-9 rounded-full border-2 border-border dark:border-darkmode-border"
                          />
                        )}
                        <span>{author.frontmatter.title}</span>
                      </Link>
                    ))}
                </li>
                <li className="mb-2 mr-4 inline-block border-l pl-3 leading-none text-dark dark:border-darkmode-border dark:text-darkmode-dark">
                  {dateFormat(post.frontmatter.date)}
                </li>
              </ul>
              <p className="mb-0">
                {plainify(post.content).slice(0, Number(summary_length))}...
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
