import sortButton from "config/sort.json";

const usePricingFilter = (arrayOpenSource, arrayFree, arrayPremium) => {
  const { button } = sortButton;
  const sortMenu =
    arrayPremium.length && arrayFree.length && arrayOpenSource.length
      ? button
      : arrayPremium.length
        ? button.filter((data) => data.premium)
        : arrayFree.length
          ? button.filter((data) => data.free)
          : arrayOpenSource.length
            ? button.filter((data) => data.openSource)
            : button;

  return { sortMenu };
};

export default usePricingFilter;
