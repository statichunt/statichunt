import sortButton from "config/sort.json";

const usefilterButton = (arrayFree, arrayPremium) => {
  const { button } = sortButton;
  const sortMenu =
    arrayPremium.length && arrayFree.length
      ? button
      : arrayPremium.length
      ? button.filter((data) => data.premium)
      : arrayFree.length
      ? button.filter((data) => data.free)
      : button;

  return { sortMenu };
};

export default usefilterButton;
