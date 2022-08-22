export const addArctype = (themes) => {
  const addarchetypes = themes.map((theme) => ({
    ...theme,
    frontmatter: {
      ...theme.frontmatter,
      archetype: !theme.frontmatter.archetype
        ? ["Others"]
        : theme.frontmatter.archetype,
    },
  }));
  return addarchetypes;
};
