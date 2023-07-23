import fs from "fs-extra";
import ora from "ora";
import path from "path";
import puppeteer from "puppeteer";
import getThemes from "../.json/tools.json" assert { type: "json" };
const spinner = ora("Loading");
const imagesFolder = path.join(process.cwd(), "/public/tools");

const tools = getThemes.map((data) => ({
  website: data.frontmatter.website,
  slug: data.slug,
}));

const captureScreenshot = async (website, slug, overwrite) => {
  const thumbnail = `${slug}.png`;
  const imagePath = path.join(imagesFolder, thumbnail);
  if (!overwrite && fs.existsSync(imagePath)) {
    return false;
  }

  try {
    const browser = await puppeteer.launch({
      args: [],
      headless: "new",
      executablePath:
        process.platform === "win32"
          ? "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
          : process.platform === "linux"
          ? "/usr/bin/google-chrome"
          : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    });

    spinner.text = `${website} => capturing`;
    const page = await browser.newPage();
    await page.setViewport({
      width: 1500,
      height: 1000,
    });

    await page.goto(website, {
      waitUntil: "networkidle0",
      timeout: 0,
    });

    // remove cookie banner
    const cookieBox = "[class*='cookie']";
    await page.evaluate(
      (cookieBox) =>
        document.querySelectorAll(cookieBox).forEach((el) => el.remove()),
      cookieBox,
    );

    await page.screenshot({ path: imagePath });
    await browser.close();
  } catch {
    spinner.text = `${website} => failed capturing`;
    return false;
  }
};

const generateScreenshots = async (tools, overwrite) => {
  spinner.start("Capturing Screenshots");
  for (const data of tools) {
    await captureScreenshot(data.website, data.slug, overwrite);
  }
  spinner.succeed("Success - Capturing Screenshots");
};

generateScreenshots(
  tools,
  false, // overwrite value
);
