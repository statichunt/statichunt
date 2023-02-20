import useWindow from "@hooks/useWindow";
import { useSerachContext } from "context/searchContext";
import { useEffect, useState } from "react";

const TabItem = [
  {
    label: "Everything",
    value: "all",
  },
  {
    label: "Themes",
    value: "themes",
  },
  {
    label: "Resources",
    value: "resource",
  },
  {
    label: "Blog",
    value: "blog",
  },
];

const SearchTab = () => {
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
    <div className="mx-auto p-6 md:p-8">
      <ul className="-ml-5 flex  sm:-ml-4">
        {TabItem.map((item, i) => (
          <li
            key={`item-${i}`}
            className={`ml-5 flex-1 sm:ml-4  ${
              windowSize < 1024 && item.value === "all" ? "hidden" : "block"
            }`}
            onClick={() => handleChange(item.value)}
          >
            <button
              className={`btn w-full text-sm sm:text-lg ${
                isActive === item.value ? "btn-primary" : "btn-outline-primary"
              }`}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchTab;
