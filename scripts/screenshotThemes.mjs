import fs from "fs-extra";
import ora from "ora";
import path from "path";
import puppeteer from "puppeteer";
import getThemes from "../.json/themes.json" assert { type: "json" };
const spinner = ora("Loading");
const imagesFolder = path.join(process.cwd(), "/public/themes");

const themes = getThemes.map((data) => ({
  demo: data.frontmatter.demo,
  slug: data.slug,
}));

async function captureScreenshot(demo, slug, overwrite) {
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

    spinner.text = `${demo} => capturing`;
    const page = await browser.newPage();
    await page.setViewport({
      width: 1500,
      height: 1000,
    });

    // Set a timeout of 10 seconds
    const timeout = 10000;
    const controller = new AbortController();
    const timer = setTimeout(() => {
      controller.abort();
    }, timeout);

    try {
      await page.goto(demo, {
        waitUntil: "networkidle0",
        signal: controller.signal, // abort the navigation if the timeout is reached
      });
    } catch {
      clearTimeout(timer);
      await browser.close();
      throw new Error("Timeout");
    }

    clearTimeout(timer);

    // Remove cookie banner
    const cookieBox = "[class*='cookie']";
    await page.evaluate(
      (cookieBox) =>
        document.querySelectorAll(cookieBox).forEach((el) => el.remove()),
      cookieBox,
    );

    await page.screenshot({ path: imagePath });
    await browser.close();
  } catch (error) {
    spinner.text = `${demo} => failed capturing`;
    console.error(error);

    // Delete the theme
    fs.unlink(path.join(process.cwd(), `/content/themes/${slug}.md`), (err) => {
      if (err) {
        console.error("Error deleting file:", err);
        return;
      }
    });

    return false;
  }
}

const generateScreenshots = async (themes, overwrite) => {
  spinner.start("Capturing Screenshots");
  for (const data of themes) {
    await captureScreenshot(data.demo, data.slug, overwrite);
  }
  spinner.succeed("Success - Capturing Screenshots");
};

generateScreenshots(
  themes,
  false, // overwrite value
);
