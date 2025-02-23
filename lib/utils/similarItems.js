// similar themes
export const similarThemes = (currentItem, allItems, slug) => {
  let ssg = [];
  let category = [];

  // set ssg
  if (currentItem.frontmatter.ssg?.length > 0) {
    ssg = currentItem.frontmatter.ssg;
  }

  // set category
  if (currentItem.frontmatter.category?.length > 0) {
    category = currentItem.frontmatter.category;
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
export const similarPosts = (currentItem, allItems, slug) => {
  let categories = [];

  // set categories
  if (currentItem.frontmatter.categories?.length > 0) {
    categories = currentItem.frontmatter.categories;
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
