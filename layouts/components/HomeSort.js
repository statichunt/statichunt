import { humanize } from "@/lib/utils/textConverter";
import { useFilterContext } from "context/filterContext";
import { useState } from "react";
import { TbChevronDown } from "react-icons/tb";

const HomeSort = ({ sortValue, handleSortThemes, sortMenu }) => {
  const { sortAsc, setSortAsc } = useFilterContext();
  const [sortMenuShow, setSortMenuShow] = useState(false);

  return (
    <div className="sort-dropdown ml-0 mt-4 md:ml-2 md:mt-[6px]">
      Sort by:
      <span
        onClick={() => setSortMenuShow(!sortMenuShow)}
        className="sort-dropdown-input"
      >
        {humanize(sortValue)} <TbChevronDown />
      </span>
      <div className={`sort-dropdown-buttons ${sortMenuShow && "show"}`}>
        {sortMenu.map((button, i) => (
          <button
            key={`button-${i}`}
            className={sortValue === button.value ? "active" : undefined}
            value={button.value}
            onClick={(e) =>
              handleSortThemes(e, button.type) & setSortMenuShow(false)
            }
          >
            {humanize(button.value)}
          </button>
        ))}
        <span className="m-2 block border-t border-border dark:border-darkmode-theme-light" />
        <button
          className={!sortAsc ? "active" : undefined}
          onClick={() => setSortAsc(false) & setSortMenuShow(false)}
        >
          Descending
        </button>
        <button
          className={sortAsc ? "active" : undefined}
          onClick={() => setSortAsc(true) & setSortMenuShow(false)}
        >
          Ascending
        </button>
      </div>
    </div>
  );
};

export default HomeSort;
