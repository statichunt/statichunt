// theme sorting

export const reducer = (state, action) => {
  switch (action.type) {
    case "STAR":
      const sortByStar = [
        ...state.sort(
          (a, b) =>
            (b.frontmatter.github_star ? b.frontmatter.github_star : 0) -
            (a.frontmatter.github_star ? a.frontmatter.github_star : 0)
        ),
      ];
      const starData = sortByStar.map((data) => {
        return {
          ...data,
          type: "star",
        };
      });
      return starData;
    case "FORK":
      const sortByFork = [
        ...state.sort(
          (a, b) =>
            (b.frontmatter.github_fork ? b.frontmatter.github_fork : 0) -
            (a.frontmatter.github_fork ? a.frontmatter.github_fork : 0)
        ),
      ];
      const forkData = sortByFork.map((data) => {
        return {
          ...data,
          type: "fork",
        };
      });
      return forkData;
    case "UPDATE":
      const sortByUpdate = [
        ...state.sort(
          (a, b) =>
            (b.frontmatter.update_date
              ? new Date(b.frontmatter.update_date)
              : new Date(b.frontmatter.date)) -
            (a.frontmatter.update_date
              ? new Date(a.frontmatter.update_date)
              : new Date(a.frontmatter.date))
        ),
      ];
      const updateData = sortByUpdate.map((data) => {
        return {
          ...data,
          type: "update",
        };
      });
      return updateData;
    case "PRICE":
      const sortByPrice = [
        ...state.sort(
          (a, b) =>
            (b.frontmatter.price ? b.frontmatter.price : 0) -
            (a.frontmatter.price ? a.frontmatter.price : 0)
        ),
      ];
      const priceData = sortByPrice.map((data) => {
        return {
          ...data,
          type: "price",
        };
      });
      return priceData;
    case "DEFAULT":
      const sortByDate = [
        ...state.sort(
          (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
        ),
      ];
      const defaultData = sortByDate.map((data) => {
        return {
          ...data,
          type: "star",
        };
      });

      return defaultData;
    case "SLUG":
      return action.payload;

    default:
      return state;
  }
};
