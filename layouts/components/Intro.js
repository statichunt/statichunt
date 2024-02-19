import { markdownify } from "@/lib/utils/textConverter";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import Typewriter from "typewriter-effect";

const Intro = ({ data, themeCount, className }) => {
  const description = data.description.replace(
    "<themes>",
    `${Math.floor(themeCount / 50) * 50}+`,
  );
  return (
    <div className={`mt-4 mb-10 px-2 md:mb-16 ${className}`}>
      <h1 className="mb-3">
        {data.title_start}{" "}
        <Typewriter
          options={{
            strings: data.title_loop,
            autoStart: true,
            loop: true,
            cursor: "",
            wrapperClassName: "text-gradient",
          }}
        />{" "}
        {data.title_end}
      </h1>
      {markdownify(description, "p")}
      <Link
        className="btn btn-github mt-4"
        target="_blank"
        rel="noopener noreferrer nofollow"
        href="https://github.com/statichunt/statichunt"
      >
        <FaGithub className="inline-block mr-2 text-lg -mt-1" />
        Submit Yours
      </Link>
    </div>
  );
};

export default Intro;
