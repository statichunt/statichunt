import Social from "@components/Social";
import Base from "@layouts/Baseof";
import { markdownify } from "@lib/utils/textConverter";
import shortcodes from "@shortcodes/all";
import { MDXRemote } from "next-mdx-remote";
import Image from "next/image";

const AuthorSingle = ({ frontmatter, content, mdxContent }) => {
  const { description, social, title, image } = frontmatter;

  return (
    <Base
      title={title}
      description={description ? description : content.slice(0, 120)}
    >
      <section className="section">
        <div className="container">
          <div className="mb-4 text-center md:px-24">
            {image && (
              <div className="mb-8">
                <Image
                  src={image}
                  className="rounded-lg"
                  height="150"
                  width="150"
                  alt={title}
                />
              </div>
            )}
            {markdownify(title, "h1", "h2 mb-8")}
            <Social source={social} className="social-icons-simple" />
            <div className="content">
              <MDXRemote {...mdxContent} components={shortcodes} />
            </div>
          </div>
        </div>
      </section>
    </Base>
  );
};

export default AuthorSingle;
