import Base from "@layouts/Baseof";
import Sidebar from "@layouts/components/Sidebar";
import Default from "@layouts/Default";
import ResourcesList from "@layouts/ResourcesList";
import Taxonomy from "@layouts/Taxonomy";
import {
  getRegularPage,
  getRegularPageSlug,
  getSinglePages,
  getSinglePagesSlug,
} from "@lib/contents";
import { slugify } from "@lib/utils/textConverter";
import config from "config/config.json";
import { addArctype } from "hooks/addArctype";
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
}) => {
  const { title, meta_title, description, image, noindex, canonical } =
    taxonomies[0].frontmatter;
  const { sidebar } = config;
  const { content } = taxonomies[0];
  const [arrayCategory, setArrayCategory] = useState([]);

  useEffect(() => {
    setArrayCategory([]);
  }, [slug]);
  const addcategorys = addArctype(data);
  const filterCategory = addcategorys.filter((theme) =>
    arrayCategory.length
      ? arrayCategory.find((type) =>
          theme.frontmatter.category
            ?.map((category) => slugify(category))
            .includes(slugify(type))
        )
      : data
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
            themes={addcategorys}
            slug={slug}
            category={category}
            setArrayCategory={setArrayCategory}
            arrayCategory={arrayCategory}
          />
          <Taxonomy
            taxonomies={taxonomies}
            data={filterCategory}
            tools={tools}
          />
        </div>
      ) : toolSlug.includes(slug) ? (
        <section className="section">
          <ResourcesList title={slug} resources={resources} />
        </section>
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
  const allPages = await getRegularPage(regular.replace("-themes", ""));

  const ssg = getSinglePages("content/ssg");
  const cms = getSinglePages("content/cms");
  const css = getSinglePages("content/css");
  const tool = getSinglePages("content/tool");
  const toolPage = tool.filter((data) => data.slug == regular);

  // taxonomy slug
  const ssgSlug = getSinglePagesSlug("content/ssg");
  const toolSlug = getSinglePagesSlug("content/tool");

  // taxomomy page data

  const singleListPage =
    ssg.length &&
    ssg.filter((page) =>
      page.frontmatter.url
        ? page.frontmatter.url == `/${regular}`
        : page.slug == regular
    );

  const allResources = getSinglePages("content/resources");
  const singleResources = allResources.filter((data) =>
    data.frontmatter.tool.map((tool) => slugify(tool)).includes(regular)
  );

  // layout filtering
  const filterByLayout = (layout) => {
    const layoutFilter = allPages.filter(
      (data) => data.frontmatter.layout == layout
    );
    return layoutFilter;
  };
  const aboutPage = filterByLayout("about");
  const defaultPage = filterByLayout("default");
  // taxonomies data
  const taxonomies = aboutPage.length
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
  return {
    props: {
      slug: regular,
      data: allPages,
      ssgSlug: ssgSlug,
      taxonomies: taxonomies,
      tools: tools,
      resources: singleResources,
      category: category,
      themes: themes,
      toolSlug: toolSlug,
      allResources: allResources,
    },
  };
};
