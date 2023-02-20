import fs from "fs";
import matter from "gray-matter";
import path from "path";
const jsonDir = "./.json";

const getData = (folder) => {
  const getPath = fs.readdirSync(path.join(folder));
  const sanitizeData = getPath.filter((item) => item.includes(".md"));
  const filterData = sanitizeData.filter((theme) => theme.match(/^(?!_)/));
  const getData = filterData.map((filename) => {
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
  const publishedPages = getData.filter(
    (page) => !page.frontmatter?.draft && page
  );
  return publishedPages;
};

// get all data
const themes = getData(`content/themes`);
const resources = getData(`content/resources`);
const blog = getData(`content/blog`);
const ssg = getData("content/ssg");
const css = getData("content/css");
const cms = getData("content/cms");
const tools = [...ssg, ...css, ...cms];

try {
  if (!fs.existsSync(jsonDir)) {
    fs.mkdirSync(jsonDir);
  }
  fs.writeFileSync(`${jsonDir}/themes.json`, JSON.stringify(themes));
  fs.writeFileSync(`${jsonDir}/resources.json`, JSON.stringify(resources));
  fs.writeFileSync(`${jsonDir}/blog.json`, JSON.stringify(blog));
  fs.writeFileSync(`${jsonDir}/tools.json`, JSON.stringify(tools));
} catch (err) {
  console.error(err);
}
