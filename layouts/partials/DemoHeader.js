import Logo from "@/components/Logo";
import config from "@/config/config.json";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  TbDeviceDesktop,
  TbDeviceMobile,
  TbDeviceTablet,
  TbDownload,
  TbExternalLink,
  TbInfoCircle,
} from "react-icons/tb";

const DemoHeader = ({
  themeTitle,
  demo,
  slug,
  github,
  download,
  showHeader,
  setShowHeader,
  device,
  setDevice,
}) => {
  // destructuring the main menu from menu object
  const { logo, logo_light, title, favicon } = config.site;

  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme } = useTheme();
  useEffect(() => setMounted(true), []);

  return (
    <header
      className={`header fixed transition-all ${
        !showHeader ? "top-[-62px]" : undefined
      }`}
    >
      <nav className="navbar justify-between">
        {/* logo and name */}
        <div className="lg:col-7 xl:col-5">
          <div className="flex items-center">
            <Logo
              className="hidden h-8 sm:inline-block"
              src={
                mounted && (theme === "dark" || resolvedTheme === "dark")
                  ? logo_light
                  : logo
              }
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
            <h1 className="ml-3 hidden border-l-2 border-text pl-3 font-primary text-h5 font-medium text-text md:block">
              {themeTitle.slice(0, 30)}
              {themeTitle.length > 30 && "..."}
            </h1>
          </div>
        </div>
        {/* demo switcher */}
        <div className="hidden text-center lg:col-2 lg:block">
          <div className="demo-preview-switcher">
            <button
              className={`tooltip tooltip-bottom svg-block ${
                device === "desktop" && "active"
              }`}
              data-tooltip="Desktop"
              onClick={() => setDevice("desktop")}
            >
              <TbDeviceDesktop />
            </button>
            <button
              className={`tooltip tooltip-bottom svg-block ${
                device === "tablet" && "active"
              }`}
              data-tooltip="Tablet"
              onClick={() => setDevice("tablet")}
            >
              <TbDeviceTablet />
            </button>
            <button
              className={`tooltip tooltip-bottom svg-block ${
                device === "mobile" && "active"
              }`}
              data-tooltip="Mobile"
              onClick={() => setDevice("mobile")}
            >
              <TbDeviceMobile />
            </button>
          </div>
        </div>
        {/* info buttons */}
        <div className="lg:col-3 xl:col-5">
          <div className="flex flex-wrap items-center justify-end space-x-3 pr-10 md:pr-5">
            <Link
              href={`/themes/${slug}/`}
              data-tooltip="Information"
              className="btn btn-outline-primary btn-sm svg-block tooltip tooltip-bottom text-lg !leading-none"
            >
              <TbInfoCircle />
            </Link>
            <a
              className="btn btn-outline-primary btn-sm svg-block tooltip tooltip-bottom text-lg !leading-none"
              href={`${demo}?ref=statichunt.com`}
              target="_blank"
              rel="nofollow noopener noreferrer"
              data-tooltip="Preview Externally"
            >
              <TbExternalLink />
            </a>
            <a
              className="btn btn-outline-primary btn-sm svg-align-bottom tooltip tooltip-bottom text-lg !leading-none"
              href={`${github ? github : download}${download?.includes("?") ? "" : "?ref=statichunt.com"}`}
              target="_blank"
              rel="nofollow noopener noreferrer"
              data-tooltip="Download"
            >
              Get &nbsp;
              <TbDownload />
            </a>
          </div>
        </div>
        {/* header toggler */}
        <span
          className={`absolute right-4 block h-5 w-5 cursor-pointer border-border text-center ${
            showHeader
              ? "rounded-full border leading-[1rem]"
              : "top-[62px] bg-primary leading-5 text-white"
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
