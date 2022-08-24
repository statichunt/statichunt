import { humanize } from "@lib/utils/textConverter";
import sortButton from "config/sort.json";
import { IoChevronDownOutline, IoChevronForwardOutline } from "react-icons/io5";

const SortSidebar = ({ isShow, isValue, handleSortTheme, handleClick }) => {
  const { button } = sortButton;
  return (
    <div className="sort-dropdown ml-4">
      <span
        onClick={handleClick}
        className="flex cursor-pointer items-center justify-between font-primary text-h6 font-medium"
      >
        Sort by
        <span className="mr-2 inline-block align-middle">
          {!isShow ? <IoChevronDownOutline /> : <IoChevronForwardOutline />}
        </span>
      </span>
      <div className={`sort-dropdown-buttons ${!isShow && "show"} `}>
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

export default SortSidebar;
