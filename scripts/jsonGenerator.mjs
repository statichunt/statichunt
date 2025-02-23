import fs from "fs";
import matter from "gray-matter";
import path from "path";
const jsonDir = "./.json";
const features = [
  "search",
  "seo",
  "speed",
  "contact",
  "author",
  "dark",
  "pwa",
  "i18n",
  "syntax",
  "analytics",
  "blog",
  "e-commerce",
];

// get list page data (ex: about.md)
const getListPageData = (folder, filename, includeContent) => {
  const slug = filename.replace(".md", "");
  const fileData = fs.readFileSync(path.join(folder, filename), "utf-8");
  const { data } = matter(fileData);
  const content = matter(fileData).content;

  if (includeContent) {
    return {
      slug: slug,
      frontmatter: data,
      content: content,
    };
  }

  return {
    slug: slug,
    frontmatter: data,
    // content: content,
  };
};

// get single page data (ex: blog/*.md)
const getSinglePageData = (folder, includeDrafts, includeContent) => {
  const getPath = fs.readdirSync(path.join(folder));
  const sanitizeData = getPath.filter((item) => item.includes(".md"));
  const filterData = sanitizeData.filter((item) => item.match(/^(?!_)/));
  const allPages = filterData.map((filename) =>
    getListPageData(folder, filename, includeContent),
  );
  const publishedPages = allPages.filter(
    (page) => !page.frontmatter?.draft && page,
  );
  return includeDrafts ? allPages : publishedPages;
};

// get theme features
function getThemeFeatures(data, features) {
  const content = data.content?.toLowerCase();
  const description = data.frontmatter?.description?.toLowerCase();

  // Find features present in content or description
  const matchedFeatures = features.filter(
    (feature) => content?.includes(feature) || description?.includes(feature),
  );

  return {
    slug: data.slug,
    ssg: data.frontmatter.ssg,
    category: data.frontmatter.category,
    cms: data.frontmatter.cms,
    features: matchedFeatures,
  };
}

// get themes name
const getThemesName = () => {
  const getAllData = getSinglePageData("content/themes", false);
  return getAllData.map((item) => item.slug);
};

// get themes github data
const getThemesGithub = () => {
  const getAllData = getSinglePageData("content/themes", false);
  return getAllData
    .map((item) => (item.frontmatter.github ? item.frontmatter.github : ""))
    .filter((item) => item !== "");
};

// get custom data
const getCustomData = () => {
  const getAllData = getSinglePageData("content/themes", false);
  const customData = getAllData.map((item) => item.frontmatter.author);
  // unique authors
  const uniqueAuthors = [...new Set(customData)];
  return uniqueAuthors;
};

// get all data
const themes = getSinglePageData("content/themes", false, false);
const tools = getSinglePageData("content/tools", false, false);
const examples = getSinglePageData("content/examples", false, false);
const authors = getSinglePageData("content/authors", false, false);
const blog = getSinglePageData("content/blog", false, false);
const ssg = getSinglePageData("content/ssg", true, false);
const css = getSinglePageData("content/css", true, false);
const ui = getSinglePageData("content/ui", true, false);
const cms = getSinglePageData("content/cms", true, false);
const category = getSinglePageData("content/category", true, false);
const themeTools = [...ssg, ...css, ...ui, ...cms, ...category];

const themesWithContent = getSinglePageData("content/themes", false, true);
const themesFeatures = themesWithContent.map((theme) =>
  getThemeFeatures(theme, features),
);

try {
  if (!fs.existsSync(jsonDir)) {
    fs.mkdirSync(jsonDir);
  }
  // json data
  fs.writeFileSync(`${jsonDir}/themes.json`, JSON.stringify(themes));
  fs.writeFileSync(`${jsonDir}/tools.json`, JSON.stringify(tools));
  fs.writeFileSync(`${jsonDir}/examples.json`, JSON.stringify(examples));
  fs.writeFileSync(`${jsonDir}/authors.json`, JSON.stringify(authors));
  fs.writeFileSync(`${jsonDir}/theme-tools.json`, JSON.stringify(themeTools));
  fs.writeFileSync(`${jsonDir}/blog.json`, JSON.stringify(blog));
  fs.writeFileSync(
    `${jsonDir}/theme-finder.json`,
    JSON.stringify(themesFeatures),
  );
  fs.writeFileSync(
    `${jsonDir}/themes-name.json`,
    JSON.stringify(getThemesName()),
  );
  fs.writeFileSync(
    `${jsonDir}/themes-github.json`,
    JSON.stringify(getThemesGithub()),
  );
  fs.writeFileSync(
    `${jsonDir}/custom-data.json`,
    JSON.stringify(getCustomData()),
  );

  // public data
  fs.writeFileSync(`public/data/themes.json`, JSON.stringify(themes));
  fs.writeFileSync(`public/data/tools.json`, JSON.stringify(tools));
  fs.writeFileSync(`public/data/examples.json`, JSON.stringify(examples));
} catch (err) {
  console.error(err);
}
