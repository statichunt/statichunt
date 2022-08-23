import { sortByWeight } from "./sortFunctions";

export const taxonomySorted = (taxonomy) => {
  const noWeight = taxonomy.filter((taxo) => !taxo.frontmatter.weight);
  const weightTaxonomy = sortByWeight(
    taxonomy.filter((taxo) => taxo.frontmatter.weight)
  );
  const sortedTaxonomy = [...weightTaxonomy, ...noWeight];
  const slice = sortedTaxonomy.slice(0, 4);

  return slice;
};
