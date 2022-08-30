import menu from "@config/menu.json";
import Link from "next/link";
import { useState } from "react";

const MobileSidebar = () => {
  const { main } = menu;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <div className="sidebar-toggler mr-lg-0 d-block fixed !top-[1rem] left-[0.75rem] mr-3 sm:left-[1.5rem] lg:hidden">
        <svg
          className={`sidebar-toggle-icon ${isSidebarOpen ? "active" : ""}`}
          viewBox="0 0 100 100"
          width="35"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
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
      <div
        className={`sidebar-overlay ${isSidebarOpen ? "show" : ""}`}
        onClick={() => setIsSidebarOpen(false)}
      />
      <aside
        className={`sidebar block lg:hidden ${isSidebarOpen ? "show" : ""}`}
      >
        <ul className="sidebar-main-menu block lg:hidden">
          {main.map((menu, i) => (
            <li key={`menu-${i}`}>
              <Link href={menu.url} passHref>
                <a className="inline-block py-2 text-black transition-all duration-150 hover:text-primary dark:text-white dark:hover:text-darkmode-primary">
                  {menu.name}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
};

export default MobileSidebar;
