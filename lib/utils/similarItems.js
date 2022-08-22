// similer products
export const similerItems = (currentItem, allItems, slug) => {
  let ssg = [];
  let archetype = [];

  // set ssg
  if (currentItem[0].frontmatter.ssg.length > 0) {
    ssg = currentItem[0].frontmatter.ssg;
  }

  // set archetype
  if (currentItem[0].frontmatter.archetype.length > 0) {
    archetype = currentItem[0].frontmatter.archetype;
  }

  // filter by ssg
  const filterBySSG = allItems.filter((item) =>
    ssg.find((ssg) => item.frontmatter.ssg?.includes(ssg))
  );

  // filter by archetype
  const filterByArchetype = filterBySSG.filter((item) =>
    archetype.find((archetype) =>
      item.frontmatter.archetype?.includes(archetype)
    )
  );

  // merged after filter
  // const mergedItems = [...new Set([...filterBySSG, ...filterByArchetype])];

  // filter by slug
  const filterBySlug = filterByArchetype.filter(
    (product) => product.slug !== slug
  );

  return filterBySlug;
};
