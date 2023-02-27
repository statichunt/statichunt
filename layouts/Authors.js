import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";

const Authors = ({ authors }) => {
  return (
    <div className="row justify-center">
      {authors.map((author, i) => (
        <div className="col-12 mb-8 sm:col-6 md:col-4" key={`key-${i}`}>
          {author.frontmatter.image && (
            <div className="mb-4">
              <Image
                src={author.frontmatter.image}
                alt={author.frontmatter.title}
                height="150px"
                width="150px"
                className="rounded-lg"
              />
            </div>
          )}
          <h3 className="h4 mb-2">
            <Link
              href={`/authors/${author.slug}`}
              className="block hover:text-primary"
            >
              {author.frontmatter.title}
            </Link>
          </h3>
          {markdownify(author.content.slice(0, 120), "p")}
        </div>
      ))}
    </div>
  );
};

export default Authors;
