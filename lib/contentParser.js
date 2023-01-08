import { parseMDX } from "@lib/utils/mdxParser";
import { slugify } from "@lib/utils/textConverter";
import fs from "fs";
import matter from "gray-matter";
import path from "path";

// get index page data, ex: _index.md
export const getListPage = async (filePath) => {
  const indexData = fs.readFileSync(filePath, "utf-8");
  const indexDataParsed = matter(indexData);
  const frontmatterString = JSON.stringify(indexDataParsed.data);
  const frontmatter = JSON.parse(frontmatterString);
  const content = indexDataParsed.content;
  const mdxContent = await parseMDX(content);

  return {
    frontmatter,
    content,
    mdxContent,
  };
};

// get all single pages, ex: blog/post.md
export const getSinglePage = (folder) => {
  const filesPath = fs.readdirSync(folder);
  const sanitizeFiles = filesPath.filter((file) => file.includes(".md"));
  const filterSingleFiles = sanitizeFiles.filter((file) =>
    file.match(/^(?!_)/)
  );
  const singlePages = filterSingleFiles.map((filename) => {
    const slug = filename.replace(".md", "");
    const pageData = fs.readFileSync(path.join(folder, filename), "utf-8");
    const pageDataParsed = matter(pageData);
    const frontmatterString = JSON.stringify(pageDataParsed.data);
    const frontmatter = JSON.parse(frontmatterString);
    const content = pageDataParsed.content;
    const url = frontmatter.url ? frontmatter.url.replace("/", "") : slug;

    return { frontmatter: frontmatter, slug: url, content: content };
  });

  const publishedPages = singlePages.filter(
    (page) => !page.frontmatter.draft && page
  );
  const filterByDate = publishedPages.filter(
    (page) => new Date(page.frontmatter.date || new Date()) <= new Date()
  );

  return filterByDate;
};

// get default page data, ex: about.md
export const getRegularPage = async (slug) => {
  const publishedPages = getSinglePage("content");
  const publishedThemes = getSinglePage("content/themes");
  const publishedResources = getSinglePage("content/resources");
  const publishedExamples = getSinglePage("content/examples");

  // filter by ssg
  const ssgThemesData = publishedThemes.filter(
    (theme) =>
      theme.frontmatter.ssg &&
      theme.frontmatter.ssg.map((ssg) => slugify(ssg)).includes(slug)
  );
  const ssgExamplesData = publishedExamples.filter(
    (example) =>
      example.frontmatter.ssg &&
      example.frontmatter.ssg.map((ssg) => slugify(ssg)).includes(slug)
  );
  //  filter by cms
  const cmsThemesData = publishedThemes.filter(
    (theme) =>
      theme.frontmatter.cms &&
      theme.frontmatter.cms.map((cms) => slugify(cms)).includes(slug)
  );
  //  filter by css
  const cssThemesData = publishedThemes.filter(
    (theme) =>
      theme.frontmatter.css &&
      theme.frontmatter.css.map((css) => slugify(css)).includes(slug)
  );
  // filter by category
  const categoryThemesData = publishedThemes.filter(
    (theme) =>
      theme.frontmatter.category &&
      theme.frontmatter.category
        .map((category) => slugify(category))
        .includes(slug)
  );
  // filter by tool
  const toolResourceData = publishedResources.filter(
    (resource) =>
      resource.frontmatter.tool &&
      resource.frontmatter.tool.map((tool) => slugify(tool)).includes(slug)
  );

  const pageData = publishedPages.filter((data) => data.slug === slug);
  const regularData = ssgThemesData.length
    ? ssgThemesData
    : ssgExamplesData.length
    ? ssgExamplesData
    : cssThemesData.length
    ? cssThemesData
    : cmsThemesData.length
    ? cmsThemesData
    : categoryThemesData.length
    ? categoryThemesData
    : toolResourceData.length
    ? toolResourceData
    : pageData;

  const allRegularData = regularData.map((data) => {
    const { frontmatter, content } = data;
    const slug = data.slug;

    return {
      frontmatter,
      content,
      slug,
    };
  });

  return allRegularData;
};

// get single pages slug
export const getSinglePageSlug = (folder) => {
  const publishedPages = getSinglePage(folder);
  const slugs = publishedPages.map((page) => page.slug);

  return slugs;
};

// get regulerpage slug
export const getRegularPageSlug = () => {
  const regularSlugs = getSinglePageSlug("content");
  const ssgPage = getSinglePage("content/ssg");
  const ssgFiltering = ssgPage.filter((page) => !page.frontmatter.page_draft);
  const ssgThemesSlugs = ssgFiltering.map((page) => page.slug);
  const ssgExamplesSlugs = ssgFiltering
    .map((page) => page.frontmatter?.examples_url?.replace("/", ""))
    .filter((d) => d);

  const cssPage = getSinglePage("content/css");
  const cssFiltering = cssPage.filter((page) => !page.frontmatter.page_draft);
  const cssThemesSlugs = cssFiltering.map((page) => page.slug);

  const toolPage = getSinglePage("content/tool");
  const toolFiltering = toolPage.filter((page) => !page.frontmatter.page_draft);
  const toolThemesSlugs = toolFiltering.map((page) => page.slug);

  const allSlug = [
    ...regularSlugs,
    ...ssgThemesSlugs,
    ...cssThemesSlugs,
    ...toolThemesSlugs,
    ...ssgExamplesSlugs,
  ];

  return allSlug;
};
