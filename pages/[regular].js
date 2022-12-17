import MobileSidebar from "@components/MobileSidebar";
import Sidebar from "@components/Sidebar";
import SortSidebar from "@components/SortSidebar";
import config from "@config/config.json";
import { setOthersCategory } from "@hooks/setOthersCategory";
import SortReducer from "@hooks/sortReducer";
import Base from "@layouts/Baseof";
import Default from "@layouts/Default";
import ResourceTaxonomy from "@layouts/ResourceTaxonomy";
import ThemeTaxonomy from "@layouts/ThemeTaxonomy";
import {
  getRegularPage,
  getRegularPageSlug,
  getSinglePage,
  getSinglePageSlug,
} from "@lib/contentParser";
import { slugify } from "@lib/utils/textConverter";
import { useEffect, useState } from "react";

// for all regular pages
const RegularPages = ({
  slug,
  ssgSlug,
  cssSlug,
  toolSlug,
  currentPage,
  data,
  tools,
  category,
}) => {
  const { title, meta_title, description, image, noindex, canonical } =
    currentPage[0]?.frontmatter;
  const { sidebar } = config;
  const { content } = currentPage[0];
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
            currentPage={currentPage}
            data={filterCategory}
            tools={tools}
            isIntro={isIntro}
          />
        </div>
      ) : cssSlug.includes(slug) ? (
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
            currentPage={currentPage}
            data={filterCategory}
            tools={tools}
            isIntro={isIntro}
          />
        </div>
      ) : toolSlug.includes(slug) ? (
        <>
          <MobileSidebar />
          <ResourceTaxonomy data={data} currentPage={currentPage} />
        </>
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

  // get taxonomies
  const ssg = getSinglePage("content/ssg");
  const cms = getSinglePage("content/cms");
  const css = getSinglePage("content/css");
  const category = getSinglePage("content/category");
  const tool = getSinglePage("content/tool");

  // get taxonomies slug
  const ssgSlug = getSinglePageSlug("content/ssg");
  const cssSlug = getSinglePageSlug("content/css");
  const toolSlug = getSinglePageSlug("content/tool");

  // ssg page
  const ssgPage =
    ssg.length &&
    ssg.filter((page) =>
      page.frontmatter.url
        ? page.frontmatter?.url === `/${regular}`
        : page.slug === regular
    );

  // css page
  const cssPage =
    css.length &&
    css.filter((page) =>
      page.frontmatter.url
        ? page.frontmatter?.url === `/${regular}`
        : page.slug === regular
    );

  // tool page
  const toolPage =
    tool.length &&
    tool.filter((page) =>
      page.frontmatter.url
        ? page.frontmatter?.url === `/${regular}`
        : page.slug === regular
    );

  // current page data
  const getCurrentPage = ssgPage.length
    ? slugify(ssgPage[0]?.frontmatter.title)
    : cssPage.length
    ? slugify(cssPage[0]?.frontmatter.title)
    : toolPage.length
    ? slugify(toolPage[0]?.frontmatter.title)
    : regular;
  const currentPageData = await getRegularPage(getCurrentPage);

  // layout filtering
  const defaultPage = currentPageData.filter(
    (data) => !data.frontmatter.layout
  );

  // current page
  const currentPage = ssgPage.length
    ? ssgPage
    : cssPage.length
    ? cssPage
    : toolPage.length
    ? toolPage
    : defaultPage;

  // all tools
  const tools = [...ssg, ...cms, ...css, ...category];

  return {
    props: {
      slug: regular,
      ssgSlug: ssgSlug,
      cssSlug: cssSlug,
      toolSlug: toolSlug,
      currentPage: currentPage,
      data: currentPageData,
      tools: tools,
      category: category,
    },
  };
};
