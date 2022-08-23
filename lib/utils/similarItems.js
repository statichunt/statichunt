// similer products
export const similerItems = (currentItem, allItems, slug) => {
  let ssg = [];
  let category = [];

  // set ssg
  if (currentItem[0].frontmatter.ssg?.length > 0) {
    ssg = currentItem[0].frontmatter.ssg;
  }

  // set category
  if (currentItem[0].frontmatter.category?.length > 0) {
    category = currentItem[0].frontmatter.category;
  }

  // filter by ssg
  const filterBySSG = allItems.filter((item) =>
    ssg.find((ssg) => item.frontmatter.ssg?.includes(ssg))
  );

  // filter by category
  const filterByCategory = filterBySSG.filter((item) =>
    category.find((category) => item.frontmatter.category?.includes(category))
  );

  // merged after filter
  // const mergedItems = [...new Set([...filterBySSG, ...filterByCategory])];

  // filter by slug
  const filterBySlug = filterByCategory.filter(
    (product) => product.slug !== slug
  );

  return filterBySlug;
};
