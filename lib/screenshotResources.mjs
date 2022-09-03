import fs from "fs-extra";
import ora from "ora";
import Pageres from "pageres";
import path from "path";
import getResources from "../.json/resources.json" assert { type: "json" };
const spinner = ora("Loading");
const imagesFolder = path.join(process.cwd(), "/public/resources");

const resources = getResources.map((data) => ({
  website: data.frontmatter.website,
  slug: data.slug,
}));

const captureScreenshot = async (website, slug, overwrite) => {
  const resourceImage = `${slug}.png`;

  if (!overwrite && fs.existsSync(path.join(imagesFolder, resourceImage))) {
    return false;
  }

  try {
    const page = await new Pageres({
      delay: 2,
      filename: slug,
    })
      .source(website, ["1500x1000"], {
        crop: true,
      })
      .destination(imagesFolder)
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
  spinner.succeed("Success - Capturing Screenshots");
};

generateScreenshots(
  resources,
  false // overwrite value
);
