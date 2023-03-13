import fs from "fs";
import matter from "gray-matter";
import path from "path";
const jsonDir = "./.json";

const getData = (folder, includeDrafts) => {
  const getPath = fs.readdirSync(path.join(folder));
  const sanitizeData = getPath.filter((item) => item.includes(".md"));
  const filterData = sanitizeData.filter((theme) => theme.match(/^(?!_)/));
  const allPages = filterData.map((filename) => {
    const slug = filename.replace(".md", "");
    const postData = fs.readFileSync(path.join(folder, filename), "utf-8");
    const { data } = matter(postData);
    const content = matter(postData).content;

    return {
      frontmatter: data,
      content: content,
      slug: slug,
    };
  });
  const publishedPages = allPages.filter(
    (page) => !page.frontmatter?.draft && page
  );
  return includeDrafts ? allPages : publishedPages;
};

// get all data
const themes = getData("content/themes", false);
const resources = getData("content/resources", false);
const examples = getData("content/examples", false);
const blog = getData("content/blog", false);
const ssg = getData("content/ssg", true);
const css = getData("content/css", true);
const cms = getData("content/cms", true);
const category = getData("content/category", true);
const tools = [...ssg, ...css, ...cms, ...category];

try {
  if (!fs.existsSync(jsonDir)) {
    fs.mkdirSync(jsonDir);
  }
  fs.writeFileSync(`${jsonDir}/themes.json`, JSON.stringify(themes));
  fs.writeFileSync(`${jsonDir}/resources.json`, JSON.stringify(resources));
  fs.writeFileSync(`${jsonDir}/examples.json`, JSON.stringify(examples));
  fs.writeFileSync(`${jsonDir}/blog.json`, JSON.stringify(blog));
  fs.writeFileSync(`${jsonDir}/tools.json`, JSON.stringify(tools));
} catch (err) {
  console.error(err);
}
