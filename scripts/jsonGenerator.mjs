import fs from "fs";
import matter from "gray-matter";
import path from "path";
const jsonDir = "./.json";

// get list page data (ex: about.md)
const getListPageData = (folder, filename) => {
  const slug = filename.replace(".md", "");
  const filedata = fs.readFileSync(path.join(folder, filename), "utf-8");
  const { data } = matter(filedata);
  const content = matter(filedata).content;

  return {
    frontmatter: data,
    content: content,
    slug: slug,
  };
};

// get single page data (ex: blog/*.md)
const getSinglePageData = (folder, includeDrafts) => {
  const getPath = fs.readdirSync(path.join(folder));
  const sanitizeData = getPath.filter((item) => item.includes(".md"));
  const filterData = sanitizeData.filter((item) => item.match(/^(?!_)/));
  const allPages = filterData.map((filename) =>
    getListPageData(folder, filename),
  );
  const publishedPages = allPages.filter(
    (page) => !page.frontmatter?.draft && page,
  );
  return includeDrafts ? allPages : publishedPages;
};

// get single page data (ex: blog/*.md)
const getCustomData = () => {
  const getAllData = getSinglePageData("content/themes", false);
  const customData = getAllData.map((item) => {
    return {
      theme: item.frontmatter.title,
      demo: item.frontmatter.demo,
      price: item.frontmatter.price ? item.frontmatter.price : 0,
      download: item.frontmatter.github
        ? item.frontmatter.github
        : item.frontmatter.download,
      author: item.frontmatter.author,
      author_link: item.frontmatter.author_link,
    };
  });
  return customData;
};

// get all data
const themes = getSinglePageData("content/themes", false);
const tools = getSinglePageData("content/tools", false);
const examples = getSinglePageData("content/examples", false);
const blog = getSinglePageData("content/blog", false);
const ssg = getSinglePageData("content/ssg", true);
const css = getSinglePageData("content/css", true);
const cms = getSinglePageData("content/cms", true);
const category = getSinglePageData("content/category", true);
const sponsors = getListPageData("content/sponsors", "index.md");
const customData = getCustomData();
const themetools = [...ssg, ...css, ...cms, ...category];

try {
  if (!fs.existsSync(jsonDir)) {
    fs.mkdirSync(jsonDir);
  }
  fs.writeFileSync(`${jsonDir}/themes.json`, JSON.stringify(themes));
  fs.writeFileSync(`${jsonDir}/tools.json`, JSON.stringify(tools));
  fs.writeFileSync(`${jsonDir}/examples.json`, JSON.stringify(examples));
  fs.writeFileSync(`${jsonDir}/blog.json`, JSON.stringify(blog));
  fs.writeFileSync(`${jsonDir}/theme-tools.json`, JSON.stringify(themetools));
  fs.writeFileSync(`${jsonDir}/sponsors.json`, JSON.stringify(sponsors));
  fs.writeFileSync(`${jsonDir}/themes-author.json`, JSON.stringify(customData));
} catch (err) {
  console.error(err);
}
