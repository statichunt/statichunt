import { useFilterContext } from "context/state";
import React, { useState } from "react";
import { IoChevronDownOutline, IoChevronForwardOutline } from "react-icons/io5";

const PricingFilter = ({ filterFree, filterPremium }) => {
  const { arrayFree, setArrayFree, arrayPremium, setArrayPremium, allReset } =
    useFilterContext();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <div className="mb-8">
      <h3
        onClick={handleOpen}
        className="mb-2 flex cursor-pointer items-center justify-between py-1 pl-0 font-primary text-h6 font-medium lg:pl-3"
      >
        Filter
        <span className="mr-2 inline-block align-middle">
          {!open ? <IoChevronDownOutline /> : <IoChevronForwardOutline />}
        </span>
      </h3>
      <div className={`sort-sidebar-buttons ${!open && "show"}`}>
        {filterFree.length > 0 && (
          <a
            onClick={() =>
              setArrayFree(arrayFree.length === 0 ? filterFree : [])
            }
            // className={arrayFree.length > 0 ? "active" : undefined}
            className={`filter-list ${
              arrayFree.length > 0 ? "active" : undefined
            }`}
          >
            <span className="ml-2 block"> Free</span>
            <span className="ml-auto">{filterFree.length}</span>
          </a>
        )}
        {filterPremium.length > 0 && (
          <a
            onClick={() =>
              setArrayPremium(arrayPremium.length === 0 ? filterPremium : [])
            }
            className={`filter-list ${
              arrayPremium.length > 0 ? "active" : undefined
            }`}
          >
            <span className="ml-2 block"> Premium</span>
            <span className="ml-auto">{filterPremium.length}</span>
          </a>
        )}
      </div>
    </div>
  );
};

export default PricingFilter;
