import useWindow from "@/hooks/useWindow";
import { useFilterContext } from "context/filterContext";
import { useEffect, useState } from "react";
import { IoChevronDownOutline, IoChevronForwardOutline } from "react-icons/io5";

const PricingFilter = ({ filterOpenSource, filterFree, filterPremium }) => {
  const {
    arrayOpenSource,
    setArrayOpenSource,
    arrayFree,
    setArrayFree,
    arrayPremium,
    setArrayPremium,
  } = useFilterContext();

  const [open, setOpen] = useState(true);
  const windowSize = useWindow(1023);
  useEffect(() => {
    if (windowSize < 1024) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [windowSize]);

  return (
    <div className="order-0">
      <div className="mb-4 lg:mb-8">
        <h3
          onClick={() => setOpen(!open)}
          className="mb-2 flex cursor-pointer items-center justify-between py-1 pl-0 font-primary text-h6 font-medium lg:pl-3"
        >
          Price
          <span className="mr-2 inline-block align-middle">
            {open ? <IoChevronDownOutline /> : <IoChevronForwardOutline />}
          </span>
        </h3>
        <div className="flex flex-col">
          {open && (
            <>
              <button
                onClick={() =>
                  setArrayOpenSource(
                    arrayOpenSource.length === 0 ? filterOpenSource : [],
                  )
                }
                className={`sidebar-checkbox ${
                  arrayOpenSource.length > 0 ? "active" : undefined
                }`}
              >
                <img
                  src="/images/icons/open-source.svg"
                  alt="open-source"
                  height="18"
                  width="18"
                  className="ml-2 max-h-[18px] dark:brightness-0 dark:invert"
                />
                <span className="ml-2 block">Open Source</span>
                <span className="ml-auto">{filterOpenSource.length}</span>
              </button>

              <button
                onClick={() =>
                  setArrayFree(arrayFree.length === 0 ? filterFree : [])
                }
                className={`sidebar-checkbox ${
                  arrayFree.length > 0 ? "active" : undefined
                }`}
              >
                <img
                  src="/images/icons/free.svg"
                  alt="free"
                  height="18"
                  width="18"
                  className="ml-2 max-h-[18px] dark:brightness-0 dark:invert"
                />
                <span className="ml-2 block">Free</span>
                <span className="ml-auto">{filterFree.length}</span>
              </button>

              <button
                onClick={() =>
                  setArrayPremium(
                    arrayPremium.length === 0 ? filterPremium : [],
                  )
                }
                className={`sidebar-checkbox ${
                  arrayPremium.length > 0 ? "active" : undefined
                }`}
              >
                <img
                  src="/images/icons/premium.svg"
                  alt="premium"
                  height="18"
                  width="18"
                  className="ml-2 max-h-[18px] dark:invert"
                />
                <span className="ml-2 block">Premium</span>
                <span className="ml-auto">{filterPremium.length}</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PricingFilter;
