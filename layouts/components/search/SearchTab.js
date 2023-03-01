import useWindow from "@hooks/useWindow";
import { useSerachContext } from "context/searchContext";
import { useEffect, useState } from "react";

const SearchTab = ({ themes, blogs, resources }) => {
  const TabItem = [
    {
      label: "Everything",
      value: "all",
      count: themes.length + resources.length + blogs.length,
    },
    {
      label: "Themes",
      value: "themes",
      count: themes.length,
    },
    {
      label: "Resources",
      value: "resource",
      count: resources.length,
    },
    {
      label: "Blog",
      value: "blog",
      count: blogs.length,
    },
  ];
  const windowSize = useWindow();
  const { setIsBlog, setIsResource, setIsTheme, searchKey } =
    useSerachContext();
  const [isActive, setIsActive] = useState(
    windowSize > 1024 ? "all" : "themes"
  );
  const handleChange = (label) => {
    setIsActive(label);
    if (label === "all") {
      setIsTheme(true);
      setIsResource(true);
      setIsBlog(true);
    } else if (label === "themes") {
      setIsTheme(true);
      setIsResource(false);
      setIsBlog(false);
    } else if (label === "blog") {
      setIsTheme(false);
      setIsResource(false);
      setIsBlog(true);
    } else if (label === "resource") {
      setIsTheme(false);
      setIsResource(true);
      setIsBlog(false);
    }
  };

  useEffect(() => {
    setIsActive(windowSize > 1024 ? "all" : "themes");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowSize]);
  useEffect(() => {
    if (windowSize < 1024) {
      setIsTheme(true);
      setIsResource(false);
      setIsBlog(false);
    } else {
      setIsTheme(true);
      setIsResource(true);
      setIsBlog(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowSize, searchKey]);

  return (
    <ul
      className={
        themes.length + resources.length + blogs.length === 0
          ? "hidden"
          : "flex"
      }
    >
      {TabItem.map((item, i) => (
        <li
          key={`item-${i}`}
          className={`flex-fill mx-2 ${
            windowSize < 1024 && item.value === "all" ? "hidden" : "block"
          }`}
          onClick={() => handleChange(item.value)}
        >
          <button
            className={`btn btn-sm w-full text-sm sm:text-lg ${
              item.count < 1 && "disabled pointer-events-none"
            } ${
              isActive === item.value ? "btn-primary" : "btn-outline-primary"
            }`}
          >
            {item.label}
            <small className="btn-badge">{item.count}</small>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default SearchTab;
