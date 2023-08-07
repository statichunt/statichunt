import Social from "@/components/Social";
import Base from "@/layouts/Baseof";
import { markdownify, slugify } from "@/lib/utils/textConverter";
import MobileSidebar from "@/partials/MobileSidebar";
import shortcodes from "@/shortcodes/all";
import { MDXRemote } from "next-mdx-remote";
import Image from "next/image";
import Gravatar from "react-gravatar";
import Posts from "./Posts";

const AuthorSingle = ({ frontmatter, content, mdxContent, posts, authors }) => {
  const { description, social, title, image, email } = frontmatter;

  const filterPostByAuthor = posts.filter((post) =>
    post.frontmatter.authors
      .map((author) => slugify(author))
      .includes(slugify(title)),
  );

  return (
    <Base
      title={title}
      description={description ? description : content.slice(0, 120)}
    >
      <MobileSidebar />
      <section className="section relative after:absolute after:left-0 after:top-0 after:h-[700px] after:max-h-full after:w-full after:bg-theme-light after:content-[''] dark:bg-darkmode-body dark:after:bg-darkmode-theme-light">
        <div className="container relative z-20">
          <div className="row justify-center">
            <div className="mb-12 md:col-10 lg:col-8">
              <div className="text-center">
                {image ? (
                  <Image
                    src={image}
                    className="mb-6 rounded"
                    height={150}
                    width={150}
                    alt={title}
                  />
                ) : (
                  <Gravatar email={email} size={150} className="mb-6 rounded" />
                )}
                {markdownify(title, "h1", "h2 mb-4")}
                <Social source={social} className="social-icons" />
                <div className="content">
                  <MDXRemote {...mdxContent} components={shortcodes} />
                </div>
              </div>
            </div>
            <div className="lg:col-10">
              <div className="rounded bg-white px-6 shadow dark:bg-darkmode-theme-dark">
                <Posts posts={filterPostByAuthor} authors={authors} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Base>
  );
};

export default AuthorSingle;
