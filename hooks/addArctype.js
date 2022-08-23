export const addArctype = (themes) => {
  const addcategorys = themes.map((theme) => ({
    ...theme,
    frontmatter: {
      ...theme.frontmatter,
      category: !theme.frontmatter.category
        ? ["Others"]
        : theme.frontmatter.category,
    },
  }));
  return addcategorys;
};
