// theme sorting

export const reducer = (state, action) => {
  switch (action.type) {
    case "STAR":
      const sortByStar = [
        ...state.sort(
          (a, b) => b.frontmatter?.github_star - a.frontmatter?.github_star
        ),
      ];
      return sortByStar;
    case "FORK":
      const sortByFork = [
        ...state.sort(
          (a, b) => b.frontmatter?.github_fork - a.frontmatter?.github_fork
        ),
      ];
      return sortByFork;
    case "UPDATE":
      const sortByUpdate = [
        ...state.sort(
          (a, b) =>
            new Date(b.frontmatter?.update_date) -
            new Date(a.frontmatter?.update_date)
        ),
      ];
      return sortByUpdate;
    case "DEFAULT":
      const sortByDate = [
        ...state.sort(
          (a, b) =>
            new Date(b.frontmatter?.date) - new Date(a.frontmatter?.date)
        ),
      ];
      return sortByDate;

    default:
      return { ...state };
  }
};
