#!/usr/bin/env node
const fs = require("fs-extra");
const path = require("path");
const Pageres = require("pageres");
const Spinner = require("cli-spinner").Spinner;
const spinner = new Spinner("Loading");
const getResources = require("../json/resources.json");
const imagesFolder = path.join(process.cwd(), "/public/resources");

const resources = getResources.map((data) => ({
  website: data.frontmatter.website,
  slug: data.slug,
}));

const captureScreenshot = async (website, slug, overwrite) => {
  const resourcesImage = `${slug}.png`;

  if (!overwrite && fs.existsSync(path.join(imagesFolder, resourcesImage))) {
    return false;
  }

  try {
    const page = await new Pageres({
      delay: 2,
      filename: slug,
    })
      .src(website, ["1500x1000"], {
        crop: true,
      })
      .dest(imagesFolder)
      .run();
    spinner.text = `${website} => capturing`;
    return page;
  } catch {
    spinner.text = `${website} => failed capturing`;
    return false;
  }
};

const generateScreenshots = async (resources, overwrite) => {
  spinner.start("Capturing Screenshots");
  for (const data of resources) {
    await captureScreenshot(data.website, data.slug, overwrite);
  }
  spinner.stop("Success - Capturing Screenshots");
};

generateScreenshots(
  resources,
  false // overwrite value
);
