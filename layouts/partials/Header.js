import Logo from "@/components/Logo";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import config from "@/config/config.json";
import menu from "@/config/menu.json";
import useOs from "@/hooks/useOs";
import { slugify } from "@/lib/utils/textConverter";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
const SearchWrapper = dynamic(
  () => import("@/components/search/SearchWrapper"),
);

const Header = () => {
  // destructuring the main menu from menu object
  const { main } = menu;
  const { logo, logo_light, title } = config.site;
  const [mounted, setMounted] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const { theme, resolvedTheme } = useTheme();
  const router = useRouter();
  const macOs = useOs();

  // when the component is mounted, set the mounted state to true
  useEffect(() => setMounted(true), []);

  // search function
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        setSearchModal(false);
      } else if (macOs && e.metaKey && e.key === "k") {
        e.preventDefault();
        setSearchModal(!searchModal);
      } else if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        setSearchModal(!searchModal);
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchModal, macOs]);

  return (
    <>
      <header className="header">
        <nav className="navbar">
          <div className="sidebar-toggler mr-lg-0 d-block invisible mr-2 opacity-0 lg:hidden">
            <svg
              className="sidebar-toggler-icon"
              viewBox="0 0 100 100"
              width="40"
            >
              <path
                className="line top"
                d="m 70,33 h -40 c 0,0 -8.5,-0.149796 -8.5,8.5 0,8.649796 8.5,8.5 8.5,8.5 h 20 v -20"
              />
              <path className="line middle" d="m 70,50 h -40" />
              <path
                className="line bottom"
                d="m 30,67 h 40 c 0,0 8.5,0.149796 8.5,-8.5 0,-8.649796 -8.5,-8.5 -8.5,-8.5 h -20 v 20"
              />
            </svg>
          </div>
          <div className="flex items-center">
            <Logo
              className="h-8"
              src={
                mounted && (theme === "dark" || resolvedTheme === "dark")
                  ? logo_light
                  : logo
              }
              alt={title}
              height={32}
              width={164}
            />
            <a
              className="ml-3 mt-1 hidden rounded-full bg-[#21262e] px-3 py-1 text-center text-xs text-white transition dark:bg-[#f5f7f9] dark:text-dark sm:ml-5 md:inline lg:hidden xl:inline"
              href="https://github.com/statichunt/statichunt"
              target="_blank"
              rel="nofollow noreferrer"
            >
              <span>
                <span className="mr-1 inline-block">
                  <FaStar className="mb-0.5" />
                </span>
                Give a Star
              </span>
            </a>
          </div>

          <ul className="navbar-nav hidden lg:flex">
            {main.map((menu, i) => (
              <li className="nav-item" key={`menu-${i}`}>
                <Link
                  href={menu.url}
                  prefetch={false}
                  className={`nav-link nav-${slugify(menu.name)} block ${
                    router.asPath === menu.url &&
                    "pointer-events-none text-primary dark:text-darkmode-primary"
                  }`}
                >
                  {menu.name}
                  {menu.badge && (
                    <span className="text-white bg-accent rounded-2xl px-2 text-[10px] xl:inline-block ml-0.5 align-super hidden">
                      {menu.badge}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* header action buttons */}
          <div className="ml-auto flex items-center lg:ml-0">
            <button
              className="mr-4 hidden sm:block"
              title="Search"
              onClick={() => setSearchModal(!searchModal)}
            >
              <FiSearch className="-mt-1 text-xl" />
            </button>
            <ThemeSwitcher />
            <a
              className="btn btn-primary nav-hire-expert origin-right scale-90 md:scale-100 lg:ml-0"
              href="https://zeon.studio/?ref=statichunt.com"
              target="_blank"
            >
              Need Jamstack Expert?
            </a>
          </div>
        </nav>
      </header>
      <SearchWrapper
        searchModal={searchModal}
        setSearchModal={setSearchModal}
      />
    </>
  );
};

export default Header;
