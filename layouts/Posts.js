import ImageFallback from "@components/ImageFallback";
import config from "@config/config.json";
import { dateFormat } from "@lib/utils/dateFormat";
import { humanize, slugify } from "@lib/utils/textConverter";
import Link from "next/link";

const Posts = ({ posts, authors }) => {
  const { summary_length } = config.settings;
  return (
    <div className="row justify-center">
      {posts.map((post, i) => (
        <div key={`key-${i}`} className="col-12 mb-8 md:col-10">
          <div className="row items-center">
            <div className="col-4">
              {post.frontmatter.image && (
                <ImageFallback
                  className=""
                  src={post.frontmatter.image}
                  alt={post.frontmatter.title}
                  width={500}
                  height={330}
                />
              )}
            </div>
            <div className="col-8">
              <ul>
                {post.frontmatter.categories.map((category, i) => (
                  <li className="inline-block" key={`category-${i}`}>
                    <Link
                      href={`/categories/${slugify(category)}`}
                      className="mr-3 hover:text-primary"
                    >
                      {humanize(category)}
                    </Link>
                  </li>
                ))}
              </ul>
              <h2 className="h3 mb-2">
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
                        className="inline-block hover:text-primary"
                      >
                        {author.frontmatter.image && (
                          <span className="mr-2">
                            <ImageFallback
                              src={author.frontmatter.image}
                              alt={author.frontmatter.title}
                              height={25}
                              width={25}
                              className="h-6 w-6 rounded-full"
                            />
                          </span>
                        )}
                        <span>{author.frontmatter.title}</span>
                      </Link>
                    ))}
                </li>
                <li className="mb-2 mr-4 inline-block">
                  {dateFormat(post.frontmatter.date)}
                </li>
              </ul>
              <p className="text-text">
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
