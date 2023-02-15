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
    label: "Blogs",
    value: "blog",
  },
];
const Tab = () => {
  const windowSize = useWindow();
  const { setIsBlog, setIsResource, setIsTheme, searchModal } =
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
  }, [searchModal, windowSize]);
  useEffect(() => {
    if (windowSize < 1024) {
      setIsTheme(true);
      setIsResource(false);
      setIsBlog(false);
      // setIsActive("themes");
    } else {
      // setIsActive("all");
      setIsTheme(true);
      setIsResource(true);
      setIsBlog(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowSize]);

  return (
    <div className="mx-auto p-8">
      <ul className="-ml-4 sm:flex">
        {TabItem.map((item, i) => (
          <li
            key={`item-${i}`}
            className={`ml-4 inline w-[calc(100%_/_3_-_16px)] sm:flex-1  ${
              windowSize < 1024 && item.value === "all" ? "hidden" : "block"
            }`}
            onClick={() => handleChange(item.value)}
          >
            <a
              className={`border-primarycursor-pointer cursor-pointer  rounded-[4px] border  border-solid border-[#059669] px-2 py-1  text-center text-sm  font-medium decoration-0 dark:border-[#45D19E] sm:block sm:px-10 sm:text-lg  ${
                isActive === item.value
                  ? ` btn-primary border-none text-white dark:text-white`
                  : "text-[#059669] dark:text-[#45D19E]"
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tab;
