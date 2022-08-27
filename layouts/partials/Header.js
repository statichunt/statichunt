import Logo from "@components/Logo";
import ThemeSwitcher from "@components/ThemeSwitcher";
import config from "@config/config.json";
import menu from "@config/menu.json";
import Link from "next/link";

const Header = () => {
  // distructuring the main menu from menu object
  const { main } = menu;
  const { logo, title, favicon } = config.site;

  return (
    <header className="header">
      <nav className="navbar">
        <div className="sidebar-toggler mr-lg-0 d-block invisible mr-3 opacity-0 lg:hidden">
          <svg className="sidebar-toggle-icon" viewBox="0 0 100 100" width="40">
            <path
              className="line top"
              d="m 70,33 h -40 c 0,0 -8.5,-0.149796 -8.5,8.5 0,8.649796 8.5,8.5 8.5,8.5 h 20 v -20"
            ></path>
            <path className="line middle" d="m 70,50 h -40"></path>
            <path
              className="line bottom"
              d="m 30,67 h 40 c 0,0 8.5,0.149796 8.5,-8.5 0,-8.649796 -8.5,-8.5 -8.5,-8.5 h -20 v 20"
            ></path>
          </svg>
        </div>
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
            className="btn-follow"
            href="https://twitter.com/heyStatichunt"
            target="_blank"
            rel="nofollow noreferrer"
          >
            <span className="hidden not-italic md:inline">Follow </span>
            <span>
              <span className="inline-block -translate-y-[2px]">@</span>
              Statichunt
            </span>
          </a>
        </div>

        <ul className="navbar-nav hidden lg:flex">
          {main.map((menu, i) => (
            <li className="nav-item" key={`menu-${i}`}>
              <Link href={menu.url} passHref>
                <a className="nav-link block">{menu.name}</a>
              </Link>
            </li>
          ))}
        </ul>

        <ThemeSwitcher />
        <a
          className="btn btn-primary ml-auto origin-right scale-90 md:scale-100 lg:ml-0"
          href="https://github.com/statichunt/statichunt"
          target="_blank"
          rel="nofollow noreferrer"
        >
          Submit{" "}
          <span className="hidden md:inline-block">Theme / Resource</span>
        </a>
      </nav>
    </header>
  );
};

export default Header;
