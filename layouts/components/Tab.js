import { useSerachContext } from "context/searchContext";
import { useState } from "react";
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
  const { setIsBlog, setIsResource, setIsTheme } = useSerachContext();
  const [isActive, setIsActive] = useState("all");
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
    }
    // else if (label === "Blogs") {
    //   setIsTheme(false);
    //   setIsResource(false);
    //   setIsBlog(true);
    // }
    else if (label === "resource") {
      setIsTheme(false);
      setIsResource(true);
      setIsBlog(false);
    }
  };
  return (
    <div className="mx-auto p-8">
      <ul className="-ml-4 flex">
        {TabItem.map((item, i) => (
          <li
            key={`item-${i}`}
            className="ml-4 w-[calc(100%_/_3_-_16px)] flex-1 "
            onClick={() => handleChange(item.value)}
          >
            <a
              className={`border-primarycursor-pointer block cursor-pointer rounded-[4px]  border border-solid border-[#059669] px-10 py-2 text-center text-lg font-medium decoration-0 dark:border-[#45D19E]  ${
                isActive === item.value
                  ? ` btn-primary border-none text-white dark:text-white`
                  : "text-[#059669] dark:text-[#45D19E]"
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}
        {/* <li
          className="flex-1 text-center"
          onClick={() => handleChange("theme")}
        >
          <span
            className={`block cursor-pointer p-[0.5rem_1rem] font-medium text-[#5a6169] decoration-0 dark:text-darkmode-light ${
              isActive === "theme"
                ? `border-b-2 border-solid border-[#22b0e7] text-[#292d32]`
                : undefined
            }`}
          >
            Themes
          </span>
        </li>
        <li
          className="flex-1 text-center"
          onClick={() => handleChange("resource")}
        >
          <span
            className={`block cursor-pointer p-[0.5rem_1rem] font-medium text-[#5a6169] decoration-0 dark:text-darkmode-light ${
              isActive === "resource"
                ? `border-b-2 border-solid border-[#22b0e7] text-[#292d32]`
                : undefined
            }`}
          >
            Resources
          </span>
        </li> */}
        {/* <li
          className="flex-1 text-center"
          onClick={() => handleChange("Blogs")}
        >
          <span
            className={`block cursor-pointer p-[0.5rem_1rem] font-medium text-[#5a6169] decoration-0 dark:text-darkmode-light ${
              isActive === "Blogs"
                ? `border-b-2 border-solid border-[#22b0e7] text-[#292d32]`
                : undefined
            }`}
          >
            Blogs
          </span>
        </li> */}
      </ul>
    </div>
  );
};

export default Tab;
