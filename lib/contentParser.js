import { parseMDX } from "@lib/utils/mdxParser";
import { slugify } from "@lib/utils/textConverter";
import fs from "fs";
import matter from "gray-matter";
import path from "path";

// get index page data, ex: _index.md
export const getListPage = async (folder) => {
  const indexData = fs.readFileSync(path.join(folder, "_index.md"), "utf-8");
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
export const getSinglePages = (folder) => {
  const filesPath = fs.readdirSync(path.join(folder));
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
  const publishedPages = getSinglePages("content");
  const publishedTheme = getSinglePages("content/themes");

  // filter by css
  const ssgData = publishedTheme.filter((theme) =>
    theme.frontmatter.ssg.map((ssg) => slugify(ssg)).includes(slug)
  );
  //  filter by cms
  const cmsData = publishedTheme.filter(
    (theme) =>
      theme.frontmatter.cms &&
      theme.frontmatter.cms.map((cms) => slugify(cms)).includes(slug)
  );
  //  filter by css
  const cssData = publishedTheme.filter(
    (theme) =>
      theme.frontmatter.css &&
      theme.frontmatter.css.map((css) => slugify(css)).includes(slug)
  );

  // filter by archtype
  const categoryData = publishedTheme.filter(
    (theme) =>
      theme.frontmatter.category &&
      theme.frontmatter.category
        .map((category) => slugify(category))
        .includes(slug)
  );

  const pageData = publishedPages.filter((data) => data.slug === slug);
  const regulerData = ssgData.length
    ? ssgData
    : cssData.length
    ? cssData
    : cmsData.length
    ? cmsData
    : categoryData.length
    ? categoryData
    : pageData;

  const allRegulerData = regulerData.map((data) => {
    const { frontmatter, content } = data;
    const slug = data.slug;

    return {
      frontmatter,
      content,
      slug,
    };
  });

  return allRegulerData;
};

// get single pages slug
export const getSinglePagesSlug = (folder) => {
  const publishedPages = getSinglePages(folder);
  const slugs = publishedPages.map((page) => page.slug);

  return slugs;
};

// get regulerpage slug
export const getRegularPageSlug = () => {
  const regularPage = getSinglePagesSlug("content");
  const ssgFile = getSinglePagesSlug(`content/ssg`);
  const toolFile = getSinglePagesSlug(`content/tool`);
  const allThemes = getSinglePages("content/themes");

  const allSlug = [...regularPage, ...toolFile, ...ssgFile];

  return allSlug;
};
