const useOthersCategory = (themes) => {
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

export default useOthersCategory;
