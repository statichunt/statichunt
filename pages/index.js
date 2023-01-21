import HomeCategory from "@components/HomeCategory";
import Intro from "@components/Intro";
import Sidebar from "@components/Sidebar";
import Themes from "@components/Themes";
import config from "@config/config.json";
import usePricingFilter from "@hooks/usePricingFilter";
import useSort from "@hooks/useSort";
import Base from "@layouts/Baseof";
import Announcement from "@layouts/components/Announcement";
import HomeSort from "@layouts/components/HomeSort";
import { getListPage, getSinglePage } from "@lib/contentParser";
import setOthersCategory from "@lib/setOthersCategory";
import { sortFilteredThemes } from "@lib/utils/sortFunctions";
import { slugify } from "@lib/utils/textConverter";
import { useFilterContext } from "context/state";
import { useState } from "react";

const Home = ({
  frontmatter: { intro },
  cms,
  css,
  ssg,
  category,
  themes,
  tools,
}) => {
  const { sidebar } = config;
  const [showIntro, SetShowIntro] = useState(true);
  const themesWithOthersCategory = setOthersCategory(themes);
  const {
    sortedThemes,
    handleSortThemes,
    sortMenuShow,
    setSortMenuShow,
    sortValue,
    handleSortMenu,
  } = useSort(themesWithOthersCategory);

  const mouseHandler = () => {
    if (sortMenuShow) {
      setSortMenuShow(!sortMenuShow);
    }
  };
  const {
    arraySSG,
    arrayCMS,
    arrayCSS,
    arrayCategory,
    arrayFree,
    arrayPremium,
    sortAsc,
  } = useFilterContext();

  // theme filtering
  const filterSSG = sortedThemes?.filter((theme) =>
    arraySSG.length
      ? arraySSG.find((type) =>
          theme.frontmatter.ssg
            ?.map((ssg) => slugify(ssg))
            .includes(slugify(type))
        )
      : sortedThemes
  );
  const filterCMS = filterSSG?.filter((theme) =>
    arrayCMS.length
      ? arrayCMS.find((type) =>
          theme.frontmatter.cms
            ?.map((cms) => slugify(cms))
            .includes(slugify(type))
        )
      : sortedThemes
  );
  const filterCSS = filterCMS?.filter((theme) =>
    arrayCSS.length
      ? arrayCSS.find((type) =>
          theme.frontmatter.css
            ?.map((css) => slugify(css))
            .includes(slugify(type))
        )
      : sortedThemes
  );
  const filterCategory = filterCSS?.filter((theme) =>
    arrayCategory.length
      ? arrayCategory.find((type) =>
          theme.frontmatter.category
            ?.map((category) => slugify(category))
            .includes(slugify(type))
        )
      : sortedThemes
  );

  const filterFree = filterCategory?.filter(
    (theme) => !theme.frontmatter.price || theme.frontmatter.price < 0
  );
  const freeThemeByCategory = filterFree?.filter((theme) =>
    arrayCategory.length
      ? arrayCategory.find((type) =>
          theme.frontmatter.category
            ?.map((category) => slugify(category))
            .includes(slugify(type))
        )
      : sortedThemes
  );

  const filterPremium = filterCategory?.filter(
    (theme) => theme.frontmatter.price > 0
  );

  const premiumThemeByCategory = filterPremium?.filter((theme) =>
    arrayCategory.length
      ? arrayCategory.find((type) =>
          theme.frontmatter.category
            ?.map((category) => slugify(category))
            .includes(slugify(type))
        )
      : sortedThemes
  );
  console.log(showIntro);
  // handle filtered themes
  const filteredThemes =
    arrayFree.length > 0 && arrayPremium.length > 0
      ? filterCategory
      : arrayFree.length > 0
      ? freeThemeByCategory
      : arrayPremium.length > 0
      ? premiumThemeByCategory
      : filterCategory;

  //  button for sorting
  const { sortMenu } = usePricingFilter(arrayFree, arrayPremium);
  return (
    <Base>
      <div className="flex" onClick={mouseHandler}>
        <Sidebar
          sidebar={sidebar}
          ssg={ssg}
          cms={cms}
          css={css}
          themes={themesWithOthersCategory}
          SetShowIntro={SetShowIntro}
        />
        <main className="main">
          <div className="container">
            <Announcement />
            <Intro data={intro} toggleClass={showIntro ? "block" : "hidden"} />
            <div className="mb-8 block justify-between md:flex">
              <HomeCategory
                themes={filteredThemes}
                category={category}
                filterFree={filterFree}
                filterPremium={filterPremium}
              />
              <HomeSort
                sortMenu={sortMenu}
                sortMenuShow={sortMenuShow}
                sortValue={sortValue}
                handleSortThemes={handleSortThemes}
                handleSortMenu={handleSortMenu}
              />
            </div>

            <Themes
              themes={sortFilteredThemes(filteredThemes, sortAsc)}
              tools={tools}
            />
          </div>
        </main>
      </div>
    </Base>
  );
};

export default Home;

// for homepage data
export const getStaticProps = async () => {
  const homepage = await getListPage("content/_index.md");
  const { frontmatter } = homepage;
  const ssg = getSinglePage("content/ssg");
  const cms = getSinglePage("content/cms");
  const css = getSinglePage("content/css");
  const category = getSinglePage("content/category");
  const tools = [...ssg, ...cms, ...css, ...category];
  const themes = getSinglePage("content/themes");

  return {
    props: {
      frontmatter: frontmatter,
      ssg: ssg,
      cms: cms,
      css: css,
      category: category,
      themes: themes,
      tools: tools,
    },
  };
};
