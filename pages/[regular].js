import MobileSidebar from "@components/MobileSidebar";
import Sidebar from "@components/Sidebar";
import SortSidebar from "@components/SortSidebar";
import config from "@config/config.json";
import { setOthersCategory } from "@hooks/setOthersCategory";
import SortReducer from "@hooks/sortReducer";
import Base from "@layouts/Baseof";
import Default from "@layouts/Default";
import ResourceTaxonomy from "@layouts/ResourceTaxonomy";
import ThemeByUs from "@layouts/ThemeByUs";
import ThemeTaxonomy from "@layouts/ThemeTaxonomy";
import {
  getRegularPage,
  getRegularPageSlug,
  getSinglePages,
  getSinglePagesSlug,
} from "@lib/contentParser";
import { slugify } from "@lib/utils/textConverter";
import { useEffect, useState } from "react";

// for all regular pages
const RegularPages = ({
  slug,
  data,
  ssgSlug,
  taxonomies,
  tools,
  category,
  toolSlug,
  resources,
  statichuntThemes,
}) => {
  const { title, meta_title, description, image, noindex, canonical } =
    taxonomies[0]?.frontmatter;
  const { sidebar } = config;
  const { content } = taxonomies[0];
  const [arrayCategory, setArrayCategory] = useState([]);
  const [isIntro, setIsIntro] = useState(true);

  const getCategories = setOthersCategory(data);
  const {
    currentTheme,
    handleSortTheme,
    isShow,
    isValue,
    defaultSort,
    handleClick,
  } = SortReducer(getCategories, true, slug);
  useEffect(() => {
    setArrayCategory([]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const filterCategory = currentTheme.filter((theme) =>
    arrayCategory.length
      ? arrayCategory.find((type) =>
          theme.frontmatter.category
            ?.map((category) => slugify(category))
            .includes(slugify(type))
        )
      : defaultSort
  );

  // change others position
  const indexOfOthers = category.map((data) => data.slug).indexOf("others");
  const element = category.splice(indexOfOthers, 1)[0];
  category.splice(category.length, 0, element);

  return (
    <Base
      title={title}
      description={description ? description : content.slice(0, 120)}
      meta_title={meta_title}
      image={image}
      noindex={noindex}
      canonical={canonical}
    >
      {ssgSlug.includes(slug) ? (
        <div className="flex">
          <Sidebar
            sidebar={sidebar}
            themes={getCategories}
            slug={slug}
            category={category}
            setArrayCategory={setArrayCategory}
            arrayCategory={arrayCategory}
            setIsIntro={setIsIntro}
            isIntro={isIntro}
          >
            <SortSidebar
              isShow={isShow}
              isValue={isValue}
              handleSortTheme={handleSortTheme}
              handleClick={handleClick}
            />
          </Sidebar>
          <ThemeTaxonomy
            taxonomies={taxonomies}
            data={filterCategory}
            tools={tools}
            isIntro={isIntro}
          />
        </div>
      ) : toolSlug.includes(slug) ? (
        <>
          <MobileSidebar />
          <ResourceTaxonomy data={resources} taxonomies={taxonomies} />
        </>
      ) : slug === "theme-by-us" ? (
        <ThemeByUs
          statichuntThemes={statichuntThemes}
          tools={tools}
          data={data}
        />
      ) : (
        <Default data={data} />
      )}
    </Base>
  );
};
export default RegularPages;

// for regular page routes
export const getStaticPaths = async () => {
  const slugs = getRegularPageSlug();
  const paths = slugs.map((slug) => ({
    params: {
      regular: slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

// for regular page data
export const getStaticProps = async ({ params }) => {
  const { regular } = params;

  const ssg = getSinglePages("content/ssg");
  const cms = getSinglePages("content/cms");
  const css = getSinglePages("content/css");
  const tool = getSinglePages("content/tool");
  const toolPage = tool.filter((data) => data.slug === regular);

  // taxonomy slug
  const ssgSlug = getSinglePagesSlug("content/ssg");
  const toolSlug = getSinglePagesSlug("content/tool");

  // taxonomy page data
  const singleListPage =
    ssg.length &&
    ssg.filter((page) =>
      page.frontmatter.url
        ? page.frontmatter?.url === `/${regular}`
        : page.slug === regular
    );

  const allThemes = await getRegularPage(
    singleListPage.length
      ? slugify(singleListPage[0]?.frontmatter.title)
      : regular
  );

  // tool page
  const allResources = getSinglePages("content/resources");

  const singleToolPage =
    tool.length &&
    tool.filter((page) =>
      page.frontmatter.url
        ? page.frontmatter?.url === `/${regular}`
        : page.slug === regular
    );

  const singleResources = allResources.filter((data) =>
    data.frontmatter.tool
      .map((tool) => slugify(tool))
      .includes(slugify(singleToolPage[0]?.frontmatter.title))
  );

  // layout filtering
  const filterByLayout = (layout) => {
    const layoutFilter = allThemes.filter(
      (data) => data.frontmatter.layout === layout
    );
    return layoutFilter;
  };
  const aboutPage = filterByLayout("about");
  const defaultPage = filterByLayout("default");
  const statichunt = filterByLayout("theme-by-us");

  // taxonomies data
  const taxonomies = statichunt.length
    ? statichunt
    : aboutPage.length
    ? aboutPage
    : singleListPage.length
    ? singleListPage
    : toolPage.length
    ? toolPage
    : defaultPage;

  // all taxonomies
  const category = getSinglePages("content/category");
  const tools = [...ssg, ...cms, ...css, ...category];

  // all themes
  const themes = getSinglePages("content/themes");

  // statichunt themes
  const statichuntThemes = themes.filter(
    (theme) => theme.frontmatter.author === "Statichunt"
  );

  return {
    props: {
      slug: regular,
      data: allThemes,
      ssgSlug: ssgSlug,
      taxonomies: taxonomies,
      tools: tools,
      resources: singleResources,
      category: category,
      themes: themes,
      toolSlug: toolSlug,
      allResources: allResources,
      statichuntThemes: statichuntThemes,
    },
  };
};
