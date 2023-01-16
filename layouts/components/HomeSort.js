import { humanize } from "@lib/utils/textConverter";
import { useFilterContext } from "context/state";
import { TbChevronDown } from "react-icons/tb";

const HomeSort = ({
  sortMenuShow,
  sortValue,
  handleSortThemes,
  handleSortMenu,
  sortMenu,
}) => {
  const { sortAsc, setSortAsc } = useFilterContext();
  return (
    <div className="sort-dropdown ml-0 mt-4 md:ml-2 md:mt-[6px]">
      Sort by:
      <span onClick={handleSortMenu} className="sort-dropdown-input">
        {humanize(sortValue)} <TbChevronDown />
      </span>
      <div className={`sort-dropdown-buttons ${sortMenuShow && "show"} `}>
        {sortMenu.map((button, i) => (
          <button
            key={`button-${i}`}
            className={sortValue === button.value ? "active" : undefined}
            value={button.value}
            onClick={(e) => handleSortThemes(e, button.type)}
          >
            {humanize(button.value)}
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

export default HomeSort;
