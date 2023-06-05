import Link from "next/link";

const Download = ({ href, rel }) => {
  return (
    <Link
      href={href}
      target="_blank"
      rel={`noopener noreferrer ${
        rel ? (rel === "follow" ? "" : rel) : "nofollow"
      }`}
      className="btn btn-primary mb-4 mr-4 hover:no-underline dark:text-white"
    >
      Download
    </Link>
  );
};

export default Download;
