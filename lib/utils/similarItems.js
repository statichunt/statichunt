// similer products
export const similerItems = (currentItem, allItems, slug) => {
  let categories = [];
  let tags = [];

  // set categories
  if (currentItem[0].frontmatter.categories.length > 0) {
    categories = currentItem[0].frontmatter.categories;
  }

  // set tags
  if (currentItem[0].frontmatter.tags.length > 0) {
    tags = currentItem[0].frontmatter.tags;
  }

  // filter by categories
  const filterByCategories = allItems.filter((item) =>
    categories.find((category) =>
      item.frontmatter.categories.includes(category)
    )
  );

  // filter by tags
  const filterByTags = allItems.filter((item) =>
    tags.find((tag) => item.frontmatter.tags.includes(tag))
  );

  // merged after filter
  const mergedItems = [...new Set([...filterByCategories, ...filterByTags])];

  // filter by slug
  const filterBySlug = mergedItems.filter((product) => product.slug !== slug);

  return filterBySlug;
};
