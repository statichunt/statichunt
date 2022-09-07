import { humanize } from "@lib/utils/textConverter";
import sortButton from "config/sort.json";
import Image from "next/future/image";
import { IoChevronDownOutline, IoChevronForwardOutline } from "react-icons/io5";

const SortSidebar = ({ isShow, isValue, handleSortTheme, handleClick }) => {
  const { button } = sortButton;
  return (
    <div className="mb-8">
      <h3
        onClick={handleClick}
        className="mb-2 flex cursor-pointer items-center justify-between py-1 pl-0 font-primary text-h6 font-medium lg:pl-3"
      >
        Sort by
        <span className="mr-2 inline-block align-middle">
          {!isShow ? <IoChevronDownOutline /> : <IoChevronForwardOutline />}
        </span>
      </h3>
      <div className={`sort-sidebar-buttons ${!isShow && "show"}`}>
        {button.map((button, i) => (
          <button
            key={`button-${i}`}
            className={isValue === button.value ? "active" : undefined}
            value={button.value}
            onClick={(e) => handleSortTheme(e, button.type)}
          >
            <Image
              src={button.icon}
              alt={button.value}
              height="17"
              width="17"
              className="mx-2 max-h-[17px] dark:invert"
            />
            <span className="dark:invert">{humanize(button.value)}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SortSidebar;
