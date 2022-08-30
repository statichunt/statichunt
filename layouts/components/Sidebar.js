import menu from "@config/menu.json";
import { slugify } from "@lib/utils/textConverter";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoChevronDownOutline, IoChevronForwardOutline } from "react-icons/io5";
import Accordion from "./Accordion";

const Sidebar = ({
  sidebar,
  slug,
  ssg,
  cms,
  css,
  category,
  tool,
  themes,
  arraySSG,
  setArraySSG,
  arrayCMS,
  setArrayCMS,
  arrayCSS,
  setArrayCSS,
  arrayCategory,
  setArrayCategory,
  arrayTool,
  setArrayTool,
  setIsIntro,
  children,
  isIntro,
}) => {
  const { main } = menu;
  const [sidebarData, setSidebarData] = useState(sidebar);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // getWindowDimensions
  const [windowSize, setWindowSize] = useState(1000);
  useEffect(() => {
    function showViewport() {
      var width = Math.max(
        document.documentElement.clientWidth,
        window.innerWidth || 0
      );
      setWindowSize(width);
    }
    showViewport();
    window.onresize = showViewport;
  }, []);

  useEffect(() => {
    const filterAddition = sidebar.map((item, id) => ({
      ...item,
      selected: windowSize < 1024 ? false : true,
      taxonomy:
        item.type == "ssg"
          ? ssg
          : item.type == "cms"
          ? cms
          : item.type == "css"
          ? css
          : item.type == "category"
          ? category
          : tool,
    }));
    setSidebarData(filterAddition);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowSize]);

  const handleOnClick = (label) => {
    const temp = [...sidebarData];
    for (let i in temp) {
      const item = temp[i];
      if (item.title === label) {
        item.selected = !item.selected;
      }
    }
    setSidebarData(temp);
  };

  return (
    <>
      <div className="sidebar-toggler mr-lg-0 d-block fixed !top-[1rem] left-[0.75rem] mr-3 sm:left-[2rem] lg:hidden">
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
      <aside className={`sidebar ${isSidebarOpen ? "show" : ""}`}>
        <div className="accordion">
          {sidebarData.map(
            (data, i) =>
              data.taxonomy && (
                <div key={`accordion-${i}`} className="mb-3 lg:mb-5">
                  <h3
                    className={`mb-2 flex cursor-pointer items-center justify-between py-1 pl-0 font-primary text-h6 font-medium lg:pl-3`}
                    onClick={() => handleOnClick(data.title)}
                  >
                    {data.title}
                    <span className="mr-2 inline-block align-middle">
                      {data.selected ? (
                        <IoChevronDownOutline />
                      ) : (
                        <IoChevronForwardOutline />
                      )}
                    </span>
                  </h3>
                  {data.taxonomy && (
                    <div className="lh:mb-8 relative mb-3 flex flex-col">
                      <Accordion
                        setArraySSG={setArraySSG}
                        arraySSG={arraySSG}
                        data={data}
                        slug={slug}
                        type={data.taxonomy}
                        params={slugify(data.type)}
                        themes={themes}
                        setArrayCMS={setArrayCMS}
                        arrayCMS={arrayCMS}
                        setArrayCSS={setArrayCSS}
                        arrayCSS={arrayCSS}
                        setArrayCategory={setArrayCategory}
                        arrayCategory={arrayCategory}
                        setArrayTool={setArrayTool}
                        arrayTool={arrayTool}
                        setIsIntro={setIsIntro}
                        isIntro={isIntro}
                      />
                    </div>
                  )}
                </div>
              )
          )}
        </div>

        {children && children}

        <ul className="sidebar-main-menu block border-t-2 py-4 dark:border-t-darkmode-theme-light lg:hidden">
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

export default Sidebar;
