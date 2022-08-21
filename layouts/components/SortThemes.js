import { humanize } from "@lib/utils/textConverter";
import sort from "config/sort.json";
import { TbChevronDown } from "react-icons/tb";

const SortThemes = ({ isShow, isValue, handleSortTheme, handleClick }) => {
  const { button } = sort;
  return (
    <div className="sort-dropdown">
      Sort by:
      <span onClick={handleClick} className="sort-dropdown-input">
        {humanize(isValue)} <TbChevronDown />
      </span>
      <div className={`sort-dropdown-buttons ${isShow && "show"}`}>
        {button.map((button, i) => (
          <button
            key={`button-${i}`}
            className={isValue === button.value ? "active" : undefined}
            value={button.value}
            onClick={(e) => handleSortTheme(e, button.type)}
          >
            {humanize(button.value)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SortThemes;
