#!/usr/bin/env node
const fs = require("fs-extra");
const path = require("path");
const Pageres = require("pageres");
const Spinner = require("cli-spinner").Spinner;
const spinner = new Spinner("Loading");
const getThemes = require("../json/themes.json");
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
      .src(demo, ["1500x1000"], {
        crop: true,
      })
      .dest(imagesFolder)
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
  spinner.stop("Success - Capturing Screenshots");
};

generateScreenshots(
  themes,
  false // overwrite value
);
