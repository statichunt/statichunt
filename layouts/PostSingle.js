import Share from "@/components/Share";
import Base from "@/layouts/Baseof";
import { dateFormat } from "@/lib/utils/dateFormat";
import { readingTime } from "@/lib/utils/readingTime";
import { humanize, markdownify, slugify } from "@/lib/utils/textConverter";
import MobileSidebar from "@/partials/MobileSidebar";
import shortcodes from "@/shortcodes/all";
import { MDXRemote } from "next-mdx-remote";
import Image from "next/image";
import Link from "next/link";
import Gravatar from "react-gravatar";

const PostSingle = ({
  frontmatter,
  content,
  mdxContent,
  authors,
  similarPosts,
}) => {
  let { description, title, meta_title, date, image, categories } = frontmatter;
  description = description ? description : content.slice(0, 120);

  return (
    <Base title={title} meta_title={meta_title} description={description}>
      <MobileSidebar />
      <section className="section bg-theme-light dark:bg-darkmode-theme-light">
        <div className="container">
          <div className="row justify-center lg:items-center">
            <div className="col-12 mb-6 md:col-5 lg:col-4 md:order-2 md:mb-0">
              {image ? (
                <Image
                  className="w-full rounded object-cover"
                  src={image}
                  alt={title}
                  width={560}
                  height={340}
                />
              ) : (
                <span className="flex h-[240px] max-h-full w-[500px] max-w-full items-center justify-center rounded bg-white text-[10rem] text-dark dark:bg-darkmode-theme-dark dark:text-darkmode-dark">
                  {title.charAt(0)}
                </span>
              )}
            </div>
            <div className="col-12 md:col-7 lg:col-6 md:order-1">
              <ul className="mb-6 space-x-2">
                {categories.map((category, i) => (
                  <li className="inline-block" key={`category-${i}`}>
                    <Link
                      href={`/blog/categories/${slugify(category)}`}
                      className="rounded bg-white from-primary to-secondary px-3 py-1 text-primary hover:bg-gradient-to-r hover:text-white dark:bg-darkmode-theme-dark dark:text-darkmode-light"
                    >
                      {humanize(category)}
                    </Link>
                  </li>
                ))}
              </ul>
              <h1 className="mb-6">{title}</h1>
              <ul>
                <li className="mr-4 inline-block leading-none text-dark dark:text-darkmode-dark">
                  {dateFormat(date)}
                </li>
                <li className="mr-4 inline-block border-l pl-3 leading-none text-dark dark:border-darkmode-border dark:text-darkmode-dark">
                  {readingTime(content)}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="row relative">
            <div className="hidden lg:col-1 lg:block">
              <Share
                className="sticky top-24 mt-2 flex-col space-y-4"
                title={title}
                description={description}
              />
            </div>
            <div className="mb-16 border-border md:col-8 lg:col-7 dark:border-darkmode-border md:mb-0 md:border-r md:pr-6">
              <article className="content">
                <MDXRemote {...mdxContent} components={shortcodes} />
              </article>
            </div>
            <div className="pl-0 md:col-4 lg:col-3 md:pl-6 lg:pl-0">
              {/* author widget */}
              <div className="widget">
                <h4 className="mb-8">About Author :</h4>
                {authors.map((author, i) => (
                  <div
                    className="border-b border-border pb-6 dark:border-darkmode-border"
                    key={i}
                  >
                    {author.frontmatter.image ? (
                      <Image
                        src={author.frontmatter.image}
                        alt={author.frontmatter.title}
                        height={100}
                        width={100}
                        className="mb-6 rounded border-2 border-border dark:border-darkmode-border"
                      />
                    ) : (
                      <Gravatar
                        email={author.frontmatter.email}
                        size={100}
                        className="mb-6 rounded border-2 border-border dark:border-darkmode-border"
                      />
                    )}
                    <h5 className="mb-4">
                      <Link
                        href={`/blog/authors/${author.slug}`}
                        className="hover:text-primary dark:hover:text-darkmode-primary"
                      >
                        {author.frontmatter.title}
                      </Link>
                    </h5>
                    <p>
                      {markdownify(author.content.slice(0, 90))}
                      {author.content.length > 90 && "..."}
                    </p>
                  </div>
                ))}
              </div>

              {/* related posts widget */}
              {similarPosts.length > 0 && (
                <div className="widget">
                  <h4 className="mb-8">Related Posts :</h4>
                  {similarPosts.map((post, i) => (
                    <div key={`post-${i}`} className="mb-8">
                      <div className="mb-5">
                        {post.frontmatter.image ? (
                          <Image
                            className="w-full rounded object-cover"
                            src={post.frontmatter.image}
                            alt={post.frontmatter.title}
                            width={300}
                            height={180}
                          />
                        ) : (
                          <span className="flex h-[120px] max-h-full w-full items-center justify-center rounded bg-theme-light text-[5rem] text-dark dark:bg-darkmode-theme-light dark:text-darkmode-dark">
                            {post.frontmatter.title.charAt(0)}
                          </span>
                        )}
                      </div>
                      <h5 className="mb-4">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="block hover:text-primary dark:hover:text-darkmode-primary"
                        >
                          {post.frontmatter.title}
                        </Link>
                      </h5>
                      <ul className="text-text">
                        <li className="mb-2 mr-4 inline-block">
                          {authors.map((author, i) => (
                            <Link
                              href={`/blog/authors/${slugify(author.slug)}`}
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
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Base>
  );
};

export default PostSingle;
