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
];
const Tab = () => {
  const { setIsExample, setIsResource, setIsTheme } = useSerachContext();
  const [isActive, setIsActive] = useState("all");
  const handleChange = (label) => {
    setIsActive(label);
    if (label === "all") {
      setIsTheme(true);
      setIsResource(true);
      setIsExample(true);
    } else if (label === "themes") {
      setIsTheme(true);
      setIsResource(false);
      setIsExample(false);
    }
    // else if (label === "examples") {
    //   setIsTheme(false);
    //   setIsResource(false);
    //   setIsExample(true);
    // }
    else if (label === "resource") {
      setIsTheme(false);
      setIsResource(true);
      setIsExample(false);
    }
  };
  return (
    <div className="mx-auto p-8">
      <ul className="-ml-4">
        {TabItem.map((item, i) => (
          <li
            key={`item-${i}`}
            className="ml-4 inline w-[calc(100%_/_3_-_16px)] "
            onClick={() => handleChange(item.value)}
          >
            <a
              className={`border-primarycursor-pointer  cursor-pointer  rounded-[4px] border border-solid border-[#059669] px-6 py-2 text-lg font-medium decoration-0 dark:border-[#45D19E]  ${
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
          onClick={() => handleChange("examples")}
        >
          <span
            className={`block cursor-pointer p-[0.5rem_1rem] font-medium text-[#5a6169] decoration-0 dark:text-darkmode-light ${
              isActive === "examples"
                ? `border-b-2 border-solid border-[#22b0e7] text-[#292d32]`
                : undefined
            }`}
          >
            examples
          </span>
        </li> */}
      </ul>
    </div>
  );
};

export default Tab;
