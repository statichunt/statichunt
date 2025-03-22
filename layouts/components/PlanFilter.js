import { useFilterContext } from "context/filterContext";
import { useEffect, useState } from "react";
import { IoChevronDownOutline, IoChevronForwardOutline } from "react-icons/io5";

const PlanFilter = ({ plans, themes, onPlanToggle }) => {
  const [taxonomy, setTaxonomy] = useState(plans);
  const [isOpen, setIsOpen] = useState(true);
  const { allReset } = useFilterContext();

  // add select property
  useEffect(() => {
    const filterAddition = taxonomy.map((item) => ({
      title: item,
      selected: false,
    }));
    setTaxonomy(filterAddition);
  }, [allReset]);

  // handle plan selection
  const handleOnClick = (plan) => {
    const temp = [...taxonomy];
    for (let i in temp) {
      const item = temp[i];
      if (item.title === plan) {
        item.selected = !item.selected;
      }
    }
    setTaxonomy(temp);
    onPlanToggle(plan);
  };

  // count items for each plan
  const countItems = (plan) => {
    return themes.filter((theme) => theme.frontmatter.plans?.includes(plan))
      .length;
  };

  return (
    <div className="mb-4 lg:mb-8">
      <h3
        className="mb-2 flex cursor-pointer items-center justify-between py-1 pl-0 font-primary text-h6 font-medium lg:pl-3"
        onClick={() => setIsOpen(!isOpen)}
      >
        Plans
        <span className="mr-2 inline-block align-middle">
          {isOpen ? <IoChevronDownOutline /> : <IoChevronForwardOutline />}
        </span>
      </h3>
      {isOpen && (
        <div className="relative flex flex-col">
          {taxonomy.map((item, i) => (
            <button
              onClick={() => handleOnClick(item.title)}
              key={`plan-${i}`}
              className={`sidebar-checkbox ${item.selected ? "active" : ""}`}
            >
              {item.title === "Free" ? (
                <img
                  src="/images/icons/free.svg"
                  alt="free"
                  height="18"
                  width="18"
                  className="ml-2 max-h-[18px] dark:brightness-0 dark:invert"
                />
              ) : item.title === "Premium" ? (
                <img
                  src="/images/icons/premium.svg"
                  alt="premium"
                  height="18"
                  width="18"
                  className="ml-2 max-h-[18px] dark:brightness-0 dark:invert"
                />
              ) : (
                <img
                  src="/images/icons/others.svg"
                  alt="others"
                  height="18"
                  width="18"
                  className="ml-2 max-h-[18px] dark:brightness-0 dark:invert"
                />
              )}
              <span className="ml-2 block">{item.title}</span>
              <span className="ml-auto">{countItems(item.title)}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlanFilter;
