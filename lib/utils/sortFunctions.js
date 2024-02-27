// sort by date
export const sortByDate = (array) => {
  const sortedArray = array.sort(
    (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date),
  );
  return sortedArray;
};

// sort by weight
export const sortByWeight = (array, weightType = "weight") => {
  const sortedArray = array.sort(
    (a, b) =>
      (a.frontmatter[weightType] ? a.frontmatter[weightType] : 100000) -
      (b.frontmatter[weightType] ? b.frontmatter[weightType] : 100000),
  );
  return sortedArray;
};

// sort by order
export const sortOrder = (items, ascending) => {
  const sortedThemes = ascending ? items.reverse() : items;
  return sortedThemes;
};
