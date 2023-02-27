import Share from "@components/Share";
import Base from "@layouts/Baseof";
import { dateFormat } from "@lib/utils/dateFormat";
import { humanize, markdownify, slugify } from "@lib/utils/textConverter";
import shortcodes from "@shortcodes/all";
import { MDXRemote } from "next-mdx-remote";
import Image from "next/image";
import Link from "next/link";

const PostSingle = ({ frontmatter, content, mdxContent, authors, slug }) => {
  let { description, title, date, image, categories, tags } = frontmatter;
  description = description ? description : content.slice(0, 120);

  return (
    <Base title={title} description={description}>
      <section className="section">
        <div className="container">
          <article className="text-center">
            {markdownify(title, "h1", "h2")}
            <ul className="mt-4 mb-8 text-text">
              <li className="mb-2 mr-4 inline-block">
                {authors
                  .filter((author) =>
                    frontmatter.authors
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
                        <span className="mr-2 align-top">
                          <Image
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
              <li className="mb-2 mr-4 inline-block">{dateFormat(date)}</li>
              <li className="mb-2 mr-4 inline-block">
                <ul>
                  {categories.map((category, i) => (
                    <li className="inline-block" key={`category-${i}`}>
                      <Link
                        href={`/categories/${slugify(category)}`}
                        className="mr-3 hover:text-primary"
                      >
                        &#9635; {humanize(category)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
            {image && (
              <Image
                src={image}
                height="500"
                width="1000"
                alt={title}
                className="rounded-lg"
              />
            )}
            <div className="content mb-16 text-left">
              <MDXRemote {...mdxContent} components={shortcodes} />
            </div>
            <div className="flex flex-wrap items-center justify-between">
              <Share
                className="social-share mb-4"
                title={title}
                description={description}
                slug={slug}
              />
            </div>
          </article>
        </div>
      </section>
    </Base>
  );
};

export default PostSingle;
