export const setOthersCategory = (themes) => {
  return themes.map((theme) => ({
    ...theme,
    frontmatter: {
      ...theme.frontmatter,
      category: !theme.frontmatter.category
        ? ["Others"]
        : theme.frontmatter.category,
    },
  }));
};
