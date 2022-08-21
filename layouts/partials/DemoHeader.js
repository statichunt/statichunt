/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable react/jsx-no-comment-textnodes */
import config from "@config/config.json";
import Logo from "@layouts/components/Logo";
import Link from "next/link";

const DemoHeader = ({
  themeTitle,
  demo,
  slug,
  github,
  showHeader,
  setShowHeader,
}) => {
  // distructuring the main menu from menu object
  const { logo, title, favicon } = config.site;

  return (
    <header
      className={`header fixed transition-all ${
        !showHeader ? "top-[-66px]" : undefined
      }`}
    >
      <nav className="navbar justify-between">
        <div className="flex items-center">
          <Logo
            className="hidden h-8 sm:inline-block"
            src={logo}
            alt={title}
            height={32}
            width={164}
          />
          <Logo
            className="inline-block h-8 sm:hidden"
            src={favicon}
            alt={title}
            height={32}
            width={32}
          />
          <a
            className="btn-follow hidden lg:inline"
            href="https://twitter.com/heyStatichunt"
            target="_blank"
            rel="nofollow noreferrer"
          >
            Follow @Statichunt
          </a>
        </div>
        <h1 className="mx-10 hidden font-primary text-h4 text-dark md:block">
          {themeTitle}
        </h1>
        <div className="flex flex-wrap items-center justify-center space-x-3 pr-10 md:pr-5 ">
          <Link href={`/themes/${slug}/`}>
            <a className="btn btn-demo">Theme Info</a>
          </Link>
          <a
            className="btn btn-demo btn-sm hidden lg:block"
            href={`${demo}?ref=statichunt.com`}
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            Demo
          </a>
          <a
            className="btn btn-demo hidden lg:block"
            href={`${github}?ref=statichunt.com`}
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            Download
          </a>
        </div>
        <span
          className={`absolute right-4 block h-5 w-5 cursor-pointer border-border text-center leading-4 transition-all ${
            showHeader
              ? "rounded-full border"
              : "top-[62px] bg-primary pt-1 text-white"
          }`}
          onClick={() => setShowHeader(!showHeader)}
        >
          {showHeader ? <>&times;</> : <>&#8681;</>}
        </span>
      </nav>
    </header>
  );
};

export default DemoHeader;
