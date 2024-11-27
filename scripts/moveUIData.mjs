import fs from "fs";
import yaml from "js-yaml";
import ora from "ora";
import path from "path";
import yamlFront from "yaml-front-matter";

const getThemes = JSON.parse(fs.readFileSync(".json/themes.json", "utf-8"));
const spinner = ora("Loading");
const themesFolder = path.join(process.cwd(), "/content/themes");

const themes = getThemes.map((data) => ({
  slug: data.slug,
}));

// Update frontmatter
const updateFrontmatter = (slug, updateCallback) => {
  const filePath = path.resolve(themesFolder, slug + ".md");
  if (!fs.existsSync(filePath)) return;

  const fileData = fs.readFileSync(filePath, "utf-8");
  const frontmatter = yamlFront.loadFront(fileData);
  const content = frontmatter.__content; // Preserve original content
  delete frontmatter.__content;

  // Apply updates using the callback function
  const updatedFrontmatter = updateCallback(frontmatter);

  // Write back updated frontmatter
  const frontmatterWrite = `---\n${yaml.dump(updatedFrontmatter)}---\n${content}`;
  fs.writeFileSync(filePath, frontmatterWrite);
};

// Update logic for each theme
const updateData = (slug) => {
  updateFrontmatter(slug, (frontmatter) => {
    const css = frontmatter.css || [];
    const ui = frontmatter.ui || [];

    // Move Mui and Chakra from css to ui
    const movedItems = ["Mui", "Chakra"];
    frontmatter.css = css.filter((item) => !movedItems.includes(item));
    frontmatter.ui = [
      ...ui,
      ...css.filter((item) => movedItems.includes(item)),
    ];

    return frontmatter;
  });
};

// Update all themes
const updateAllData = async (themes) => {
  spinner.start("Updating data");

  for (const theme of themes) {
    updateData(theme.slug);
  }

  spinner.succeed("Success - Updated all data");
};

updateAllData(themes);
