import usePricingFilter from "@hooks/usePricingFilter";
import useWindow from "@hooks/useWindow";
import { humanize } from "@lib/utils/textConverter";
import { useFilterContext } from "context/state";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoChevronDownOutline, IoChevronForwardOutline } from "react-icons/io5";

const SidebarSort = ({ sortValue, handleSortThemes, handleSortMenu }) => {
  const [open, setOpen] = useState(false);
  // call filterContext
  const { sortAsc, setSortAsc, arrayFree, arrayPremium } = useFilterContext();

  //  button for sorting
  const { sortMenu } = usePricingFilter(arrayFree, arrayPremium);
  const windowSize = useWindow(1023);
  useEffect(() => {
    if (windowSize < 1024) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [windowSize]);
  return (
    <div className="order-2 mb-4 lg:mb-8">
      <h3
        onClick={handleSortMenu}
        className="mb-2 flex cursor-pointer items-center justify-between py-1 pl-0 font-primary text-h6 font-medium lg:pl-3"
      >
        Sort by
        <span className="mr-2 inline-block align-middle">
          {open ? <IoChevronDownOutline /> : <IoChevronForwardOutline />}
        </span>
      </h3>
      <div className={`sort-sidebar-buttons ${open && "show"}`}>
        {sortMenu.map((button, i) => (
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
          <Image
            src="/images/icons/descending.svg"
            alt="Descending"
            height="17"
            width="17"
            className="mx-2 max-h-[17px] dark:invert"
          />
          <span className="dark:invert">Descending</span>
        </button>
        <button
          className={sortAsc ? "active" : undefined}
          onClick={() => setSortAsc(true)}
        >
          <Image
            src="/images/icons/ascending.svg"
            alt="Ascending"
            height="17"
            width="17"
            className="mx-2 max-h-[17px] dark:invert"
          />
          <span className="dark:invert">Ascending</span>
        </button>
      </div>
    </div>
  );
};

export default SidebarSort;
