import useWindow from "@/hooks/useWindow";
import { useSearchContext } from "context/searchContext";
import { useCallback, useEffect, useState } from "react";

const SearchTab = ({ themes, blogs, tools, searchModal }) => {
  const TabItem = [
    {
      label: "Everything",
      value: "all",
      count: themes.length + tools.length + blogs.length,
    },
    {
      label: "Themes",
      value: "themes",
      count: themes.length,
    },
    {
      label: "Tools",
      value: "tool",
      count: tools.length,
    },
    {
      label: "Blog",
      value: "blog",
      count: blogs.length,
    },
  ];
  const windowSize = useWindow();
  const { setIsBlog, setIsTool, setIsTheme, searchKey } = useSearchContext();
  const [isActive, setIsActive] = useState(
    windowSize > 1024 ? "all" : "themes",
  );
  useEffect(() => {
    if (searchKey === "") {
      setIsActive("all");
    }
  }, [searchKey]);
  // change tab state
  const handleChange = useCallback((label) => {
    setIsActive(label);
  }, []);
  useEffect(() => {
    if (isActive === "all") {
      setIsTheme(true);
      setIsTool(true);
      setIsBlog(true);
    } else if (isActive === "themes") {
      setIsTheme(true);
      setIsTool(false);
      setIsBlog(false);
    } else if (isActive === "blog") {
      setIsTheme(false);
      setIsTool(false);
      setIsBlog(true);
    } else if (isActive === "tool") {
      setIsTheme(false);
      setIsTool(true);
      setIsBlog(false);
    }
  }, [isActive, setIsBlog, setIsTool, setIsTheme]);

  // const handleChange = () => {};
  useEffect(() => {
    setIsActive("all");
  }, [searchModal]);
  useEffect(() => {
    setIsActive(windowSize > 1024 ? "all" : "themes");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowSize]);
  useEffect(() => {
    if (windowSize < 1024) {
      setIsActive("themes");
      setIsTheme(true);
      setIsTool(false);
      setIsBlog(false);
    } else {
      setIsTheme(true);
      setIsTool(true);
      setIsBlog(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowSize, searchKey]);

  return (
    <ul
      className={
        themes.length + tools.length + blogs.length === 0 ? "hidden" : "flex"
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
