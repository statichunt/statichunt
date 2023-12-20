/* eslint-disable @next/next/no-img-element */
import usePricingFilter from "@/hooks/usePricingFilter";
import useWindow from "@/hooks/useWindow";
import { humanize } from "@/lib/utils/textConverter";
import { useFilterContext } from "context/filterContext";
import { useEffect, useState } from "react";
import { IoChevronDownOutline, IoChevronForwardOutline } from "react-icons/io5";

const SidebarSort = ({ sortValue, handleSortThemes }) => {
  // call filterContext
  const { sortAsc, setSortAsc, arrayFree, arrayPremium } = useFilterContext();

  const [open, setOpen] = useState(true);
  const windowSize = useWindow(1023);
  useEffect(() => {
    if (windowSize < 1024) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [windowSize]);

  //  button for sorting
  const { sortMenu } = usePricingFilter(arrayFree, arrayPremium);
  return (
    <div className="order-2 mb-4 lg:mb-8">
      <h3
        onClick={() => setOpen(!open)}
        className="mb-2 flex cursor-pointer items-center justify-between py-1 pl-0 font-primary text-h6 font-medium lg:pl-3"
      >
        Sort by
        <span className="mr-2 inline-block align-middle">
          {open ? <IoChevronDownOutline /> : <IoChevronForwardOutline />}
        </span>
      </h3>
      <div className={open ? "block" : "hidden"}>
        {sortMenu.map((button, i) => (
          <button
            key={`button-${i}`}
            className={`sidebar-radio ${
              sortValue === button.value ? "active" : undefined
            }`}
            value={button.value}
            onClick={(e) => handleSortThemes(e, button.type)}
          >
            <img
              src={button.icon}
              alt={`${button.value} Icon`}
              height="17"
              width="17"
              className="mx-2 max-h-[17px] dark:invert"
            />
            <span className="dark:invert">{humanize(button.value)}</span>
          </button>
        ))}
        <span className="m-2 block border-t border-border dark:border-darkmode-theme-light" />
        <button
          className={`sidebar-radio ${!sortAsc ? "active" : undefined}`}
          onClick={() => setSortAsc(false)}
        >
          <img
            src="/images/icons/descending.svg"
            alt="Descending Icon"
            height="17"
            width="17"
            className="mx-2 max-h-[17px] dark:invert"
          />
          <span className="dark:invert">Descending</span>
        </button>
        <button
          className={`sidebar-radio ${sortAsc ? "active" : undefined}`}
          onClick={() => setSortAsc(true)}
        >
          <img
            src="/images/icons/ascending.svg"
            alt="Ascending Icon"
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
