import Link from "next/link";

const Demo = ({ href, rel }) => {
  return (
    <Link
      href={href}
      target="_blank"
      rel={`noopener noreferrer ${
        rel ? (rel === "follow" ? "" : rel) : "nofollow"
      }`}
      className="btn btn-outline-primary mb-4 mr-4 hover:no-underline dark:text-white"
    >
      Demo
    </Link>
  );
};

export default Demo;
