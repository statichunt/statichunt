import SidebarAccordion from "@/components/SidebarAccordion";
import config from "@/config/config.json";
import menu from "@/config/menu.json";
import useWindow from "@/hooks/useWindow";
import { slugify } from "@/lib/utils/textConverter";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoChevronDownOutline, IoChevronForwardOutline } from "react-icons/io5";

const Sidebar = ({
  slug,
  ssg,
  cms,
  css,
  category,
  toolsCategory,
  themes,
  SetShowIntro,
  children,
  showIntro,
}) => {
  const { main } = menu;
  const { sidebar } = config;
  const [sidebarData, setSidebarData] = useState(sidebar);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // getWindowDimensions
  const windowSize = useWindow();
  const ssgData = ssg?.map((data) => {
    return {
      ...data,
      taxonomy: "ssg",
    };
  });
  const cmsData = cms?.map((data) => {
    return {
      ...data,
      taxonomy: "cms",
    };
  });
  const cssData = css?.map((data) => {
    return {
      ...data,
      taxonomy: "css",
    };
  });

  useEffect(() => {
    const filterAddition = sidebar.map((item) => ({
      ...item,
      selected: windowSize < 1024 ? false : true,
      taxonomy:
        item.type == "ssg"
          ? ssgData
          : item.type == "cms"
            ? cmsData
            : item.type == "css"
              ? cssData
              : item.type == "category"
                ? category
                : toolsCategory,
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
          className={`sidebar-toggler-icon ${isSidebarOpen ? "active" : ""}`}
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
      <aside className={`sidebar scroll-box ${isSidebarOpen ? "show" : ""}`}>
        <div className="order-1">
          {sidebarData.map(
            (data, i) =>
              data.taxonomy && (
                <div key={`sidebar-accordion-${i}`} className="mb-4 lg:mb-8">
                  <h3
                    className="mb-2 flex cursor-pointer items-center justify-between py-1 pl-0 font-primary text-h6 font-medium lg:pl-3"
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
                    <div className="relative flex flex-col">
                      <SidebarAccordion
                        data={data}
                        slug={slug}
                        type={data.taxonomy}
                        params={slugify(data.type)}
                        themes={themes}
                        SetShowIntro={SetShowIntro}
                        showIntro={showIntro}
                      />
                    </div>
                  )}
                </div>
              ),
          )}
        </div>

        {children && children}

        <ul className="sidebar-main-menu order-3 block border-t-2 py-4 dark:border-t-darkmode-theme-light lg:hidden">
          {main.map((menu, i) => (
            <li key={`menu-${i}`}>
              <Link
                href={menu.url}
                className="inline-block py-2 text-black transition-all duration-150 hover:text-primary dark:text-white dark:hover:text-darkmode-primary"
              >
                {menu.name}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
