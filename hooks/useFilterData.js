import { slugify } from "@/lib/utils/textConverter";

const useFilterData = (
  sortedThemes,
  filterCategory,
  arrayCategory,
  arrayFree,
  arrayPremium,
) => {
  const filterFree = filterCategory?.filter(
    (theme) => !theme.frontmatter.price || theme.frontmatter.price < 0,
  );
  const freeThemeByCategory = filterFree?.filter((theme) =>
    arrayCategory.length
      ? arrayCategory.find((type) =>
          theme.frontmatter.category
            ?.map((category) => slugify(category))
            .includes(slugify(type)),
        )
      : sortedThemes,
  );

  const filterPremium = filterCategory?.filter(
    (theme) => theme.frontmatter.price > 0,
  );

  const premiumThemeByCategory = filterPremium?.filter((theme) =>
    arrayCategory.length
      ? arrayCategory.find((type) =>
          theme.frontmatter.category
            ?.map((category) => slugify(category))
            .includes(slugify(type)),
        )
      : sortedThemes,
  );
  const filteredThemes =
    arrayFree.length > 0 && arrayPremium.length > 0
      ? filterCategory
      : arrayFree.length > 0
      ? freeThemeByCategory
      : arrayPremium.length > 0
      ? premiumThemeByCategory
      : filterCategory;
  return {
    filteredThemes,
    filterFree,
    filterPremium,
  };
};

export default useFilterData;
