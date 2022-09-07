import fs from "fs-extra";
import ora from "ora";
import Pageres from "pageres";
import path from "path";
import getThemes from "../.json/themes.json" assert { type: "json" };
const spinner = ora("Loading");
const imagesFolder = path.join(process.cwd(), "/public/themes");

const themes = getThemes.map((data) => ({
  demo: data.frontmatter.demo,
  slug: data.slug,
}));

const captureScreenshot = async (demo, slug, overwrite) => {
  const themeImage = `${slug}.png`;

  if (!overwrite && fs.existsSync(path.join(imagesFolder, themeImage))) {
    return false;
  }

  try {
    const page = await new Pageres({
      delay: 2,
      filename: slug,
    })
      .source(demo, ["1500x1000"], {
        crop: true,
      })
      .destination(imagesFolder)
      .run();
    spinner.text = `${demo} => capturing`;
    return page;
  } catch {
    spinner.text = `${demo} => failed capturing`;
    return false;
  }
};

const generateScreenshots = async (themes, overwrite) => {
  spinner.start("Capturing Screenshots");
  for (const data of themes) {
    await captureScreenshot(data.demo, data.slug, overwrite);
  }
  spinner.succeed("Success - Capturing Screenshots");
};

generateScreenshots(
  themes,
  false // overwrite value
);
