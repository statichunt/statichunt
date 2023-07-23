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
    ssg.find((ssg) => item.frontmatter.ssg?.includes(ssg)),
  );

  // filter by category
  const filterByCategory = filterBySSG.filter((item) =>
    category.find((category) => item.frontmatter.category?.includes(category)),
  );

  // filter by slug
  const filterBySlug = filterByCategory.filter(
    (product) => product.slug !== slug,
  );

  return filterBySlug;
};

// similar posts
export const similerPosts = (currentItem, allItems, slug) => {
  let categories = [];

  // set categories
  if (currentItem[0].frontmatter.categories?.length > 0) {
    categories = currentItem[0].frontmatter.categories;
  }

  // filter by categories
  const filterByCategory = allItems?.filter((item) =>
    categories.find((category) =>
      item.frontmatter.categories?.includes(category),
    ),
  );

  // filter by slug
  const filterBySlug = filterByCategory.filter((post) => post.slug !== slug);

  return filterBySlug;
};
