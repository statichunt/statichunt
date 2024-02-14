import { parseMDX } from "@/lib/utils/mdxParser";
import { slugify } from "@/lib/utils/textConverter";
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
    file.match(/^(?!_)/),
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
    (page) => !page.frontmatter.draft && page,
  );
  const filterByDate = publishedPages.filter(
    (page) => new Date(page.frontmatter.date || new Date()) <= new Date(),
  );

  return filterByDate;
};

// get single page on server side
export const getSinglePageServer = async (folder, slug) => {
  // handle page data
  try {
    const pageData = await new Promise((resolve, reject) => {
      fs.readFile(
        path.join(process.cwd(), folder, `${slug}.md`),
        "utf-8",
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        },
      );
    });
    const pageDataParsed = matter(pageData);
    const frontmatterString = JSON.stringify(pageDataParsed.data);
    const frontmatter = JSON.parse(frontmatterString);
    const content = pageDataParsed.content;
    return { frontmatter: frontmatter, content: content };
  } catch (err) {
    // redirect to not found page
    return null;
  }
};

// get multi page on server side
export const getMultiPageServer = async (folder, slugs) => {
  const pagesData = slugs.map(async (slug) => {
    slug = slugify(slug);
    const pageData = await new Promise((resolve, reject) => {
      fs.readFile(
        path.join(process.cwd(), folder, `${slug}.md`),
        "utf-8",
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        },
      );
    });
    const pageDataParsed = matter(pageData);
    const frontmatterString = JSON.stringify(pageDataParsed.data);
    const frontmatter = JSON.parse(frontmatterString);
    const content = pageDataParsed.content;

    return { slug: slug, frontmatter: frontmatter, content: content };
  });

  return Promise.all(pagesData);
};

// get default page data, ex: about.md
export const getRegularPage = async (slug, url) => {
  const publishedPages = getSinglePage("content");
  const publishedThemesExamples = url.includes("-examples")
    ? getSinglePage("content/examples")
    : getSinglePage("content/themes");
  const publishedTools = getSinglePage("content/tools");

  // filter by ssg
  const ssgData = publishedThemesExamples.filter((theme) =>
    theme.frontmatter?.ssg?.map((ssg) => slugify(ssg)).includes(slug),
  );
  //  filter by cms
  const cmsData = publishedThemesExamples.filter((theme) =>
    theme.frontmatter?.cms?.map((cms) => slugify(cms)).includes(slug),
  );
  //  filter by css
  const cssData = publishedThemesExamples.filter((theme) =>
    theme.frontmatter?.css?.map((css) => slugify(css)).includes(slug),
  );
  // filter by category
  const categoryData = publishedThemesExamples.filter((theme) =>
    theme.frontmatter?.category
      ?.map((category) => slugify(category))
      .includes(slug),
  );
  // filter by tool
  const toolData = publishedTools.filter((tool) =>
    tool.frontmatter?.category?.map((item) => slugify(item)).includes(slug),
  );

  const pageData = publishedPages.filter((data) => data.slug === slug);
  const regularData = ssgData.length
    ? ssgData
    : cssData.length
      ? cssData
      : cmsData.length
        ? cmsData
        : categoryData.length
          ? categoryData
          : toolData.length
            ? toolData
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

// get regular page slug
export const getRegularPageSlug = () => {
  const regularSlugs = getSinglePageSlug("content");
  const ssgPage = getSinglePage("content/ssg");
  const ssgThemesFiltering = ssgPage.filter(
    (page) => !page.frontmatter.themes_draft,
  );
  const ssgThemesSlugs = ssgThemesFiltering.map((page) =>
    page.frontmatter?.url?.replace("/", ""),
  );
  const ssgExamplesFiltering = ssgPage.filter(
    (page) => !page.frontmatter.examples_draft,
  );
  const ssgExamplesSlugs = ssgExamplesFiltering.map((page) =>
    page.frontmatter?.examples_url?.replace("/", ""),
  );

  const cssPage = getSinglePage("content/css");
  const cssFiltering = cssPage.filter((page) => !page.frontmatter.page_draft);
  const cssThemesSlugs = cssFiltering.map((page) => page.slug);

  const toolsCategoryPage = getSinglePage("content/tools-category");
  const toolFiltering = toolsCategoryPage.filter(
    (page) => !page.frontmatter.page_draft,
  );
  const toolThemesSlugs = toolFiltering.map((page) => page.slug);

  const allSlug = [
    ...regularSlugs,
    ...ssgThemesSlugs,
    ...ssgExamplesSlugs,
    ...cssThemesSlugs,
    ...toolThemesSlugs,
  ];

  return allSlug;
};
