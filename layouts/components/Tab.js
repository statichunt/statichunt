import { useSerachContext } from "context/searchContext";
import { useState } from "react";

const Tab = () => {
  const { setIsExample, setIsResource, setIsTheme } = useSerachContext();
  const [isActive, setIsActive] = useState("all");
  const handleChange = (label) => {
    setIsActive(label);
    if (label === "all") {
      setIsTheme(true);
      setIsResource(true);
      setIsExample(true);
    } else if (label === "theme") {
      setIsTheme(true);
      setIsResource(false);
      setIsExample(false);
    } else if (label === "examples") {
      setIsTheme(false);
      setIsResource(false);
      setIsExample(true);
    } else if (label === "resource") {
      setIsTheme(false);
      setIsResource(true);
      setIsExample(false);
    }
  };
  return (
    <div className="my-4 mx-auto">
      <ul className=" flex border-b border-solid border-[#dae1e7]">
        <li className="flex-1 text-center" onClick={() => handleChange("all")}>
          <span
            className={`block cursor-pointer p-[0.5rem_1rem] font-medium text-[#5a6169] decoration-0 ${
              isActive === "all"
                ? `border-b-2 border-solid border-[#22b0e7] text-[#292d32]`
                : undefined
            }`}
          >
            All
          </span>
        </li>
        <li
          className="flex-1 text-center"
          onClick={() => handleChange("theme")}
        >
          <span
            className={`block cursor-pointer p-[0.5rem_1rem] font-medium text-[#5a6169] decoration-0 ${
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
            className={`block cursor-pointer p-[0.5rem_1rem] font-medium text-[#5a6169] decoration-0 ${
              isActive === "resource"
                ? `border-b-2 border-solid border-[#22b0e7] text-[#292d32]`
                : undefined
            }`}
          >
            Resources
          </span>
        </li>
        <li
          className="flex-1 text-center"
          onClick={() => handleChange("examples")}
        >
          <span
            className={`block cursor-pointer p-[0.5rem_1rem] font-medium text-[#5a6169] decoration-0 ${
              isActive === "examples"
                ? `border-b-2 border-solid border-[#22b0e7] text-[#292d32]`
                : undefined
            }`}
          >
            examples
          </span>
        </li>
      </ul>
    </div>
  );
};

export default Tab;
