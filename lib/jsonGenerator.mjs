import fs from "fs";
import matter from "gray-matter";
import path from "path";
const jsonDir = "./.json";

// get themes data
const getThemes = fs.readdirSync(path.join(`content/themes`));
const sanitizeThemes = getThemes.filter((theme) => theme.includes(".md"));
const filterThemes = sanitizeThemes.filter((theme) => theme.match(/^(?!_)/));
const themes = filterThemes.map((filename) => {
  const slug = filename.replace(".md", "");
  const postData = fs.readFileSync(
    path.join(`content/themes/`, filename),
    "utf-8"
  );
  const { data } = matter(postData);
  const content = matter(postData).content;

  return {
    frontmatter: data,
    content: content,
    slug: slug,
  };
});

// get resources data
const getResources = fs.readdirSync(path.join(`content/resources`));
const sanitizeResources = getResources.filter((resource) =>
  resource.includes(".md")
);
const filterResources = sanitizeResources.filter((resource) =>
  resource.match(/^(?!_)/)
);
const resources = filterResources.map((filename) => {
  const slug = filename.replace(".md", "");
  const postData = fs.readFileSync(
    path.join(`content/resources/`, filename),
    "utf-8"
  );
  const { data } = matter(postData);
  const content = matter(postData).content;

  return {
    frontmatter: data,
    content: content,
    slug: slug,
  };
});

// get examples data
const getExamples = fs.readdirSync(path.join(`content/examples`));
const sanitizeExamples = getExamples.filter((resource) =>
  resource.includes(".md")
);
const filterExamples = sanitizeExamples.filter((resource) =>
  resource.match(/^(?!_)/)
);
const examples = filterExamples.map((filename) => {
  const slug = filename.replace(".md", "");
  const postData = fs.readFileSync(
    path.join(`content/examples/`, filename),
    "utf-8"
  );
  const { data } = matter(postData);
  const content = matter(postData).content;

  return {
    frontmatter: data,
    content: content,
    slug: slug,
  };
});

try {
  if (!fs.existsSync(jsonDir)) {
    fs.mkdirSync(jsonDir);
  }
  fs.writeFileSync(`${jsonDir}/themes.json`, JSON.stringify(themes));
  fs.writeFileSync(`${jsonDir}/resources.json`, JSON.stringify(resources));
  fs.writeFileSync(`${jsonDir}/examples.json`, JSON.stringify(examples));
} catch (err) {
  console.error(err);
}
