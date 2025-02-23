import { markdownify } from "@/lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";
import Gravatar from "react-gravatar";
import Social from "./components/Social";

const Authors = ({ authors }) => {
  return (
    <div className="row gx-4 gy-5 justify-center">
      {authors.map((author, i) => (
        <div className="col-12 md:col-6" key={`author-${i}`}>
          <div className="row items-center">
            <div className="col-4 2xl:col-3">
              {author.frontmatter.image ? (
                <Image
                  src={author.frontmatter.image}
                  alt={author.frontmatter.title}
                  height="150px"
                  width="150px"
                  className="rounded"
                />
              ) : (
                <Gravatar
                  email={author.frontmatter.email}
                  size={150}
                  className="rounded"
                />
              )}
            </div>
            <div className="col-8 2xl:col-7">
              <h3 className="h4 mb-2">
                <Link
                  href={`/blog/authors/${author.slug}`}
                  className="block hover:text-primary"
                >
                  {author.frontmatter.title}
                </Link>
              </h3>
              {markdownify(
                author.content.slice(0, 120),
                "p",
                "line-clamp-3 mb-2 text-sm",
              )}
              <Social
                className="social-icons"
                source={author.frontmatter.social}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Authors;
