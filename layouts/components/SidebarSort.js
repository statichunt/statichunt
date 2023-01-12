import { humanize } from "@lib/utils/textConverter";
import sortButton from "config/sort.json";
import { useFilterContext } from "context/state";
import Image from "next/image";
import { IoChevronDownOutline, IoChevronForwardOutline } from "react-icons/io5";

const SidebarSort = ({
  sortMenuShow,
  sortValue,
  handleSortThemes,
  handleSortMenu,
}) => {
  const { sortAsc,
    setSortAsc,}=useFilterContext()
  const { button } = sortButton;
  return (
    <div className="mb-8">
      <h3
        onClick={handleSortMenu}
        className="mb-2 flex cursor-pointer items-center justify-between py-1 pl-0 font-primary text-h6 font-medium lg:pl-3"
      >
        Sort by
        <span className="mr-2 inline-block align-middle">
          {!sortMenuShow ? (
            <IoChevronDownOutline />
          ) : (
            <IoChevronForwardOutline />
          )}
        </span>
      </h3>
      <div className={`sort-sidebar-buttons ${!sortMenuShow && "show"}`}>
        {button.map((button, i) => (
          <button
            key={`button-${i}`}
            className={sortValue === button.value ? "active" : undefined}
            value={button.value}
            onClick={(e) => handleSortThemes(e, button.type)}
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
         <span className="m-2 block border-t border-border dark:border-darkmode-theme-light" />
        <button
          className={!sortAsc ? "active" : undefined}
          onClick={() => setSortAsc(false)}
        >
          Descending
        </button>
        <button
          className={sortAsc ? "active" : undefined}
          onClick={() => setSortAsc(true)}
        >
          Ascending
        </button>
      </div>
    </div>
  );
};

export default SidebarSort;
