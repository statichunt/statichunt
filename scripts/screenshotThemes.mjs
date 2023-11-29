import fs from "fs-extra";
import ora from "ora";
import path from "path";
import puppeteer from "puppeteer";
import getThemes from "../.json/themes.json" assert { type: "json" };
const spinner = ora("Loading");
const imagesFolder = path.join(process.cwd(), "/public/themes");

const crawlerLogPath = "./ss-themes-log.json";

// Check if the log file exists
fs.access(crawlerLogPath, fs.constants.F_OK, (err) => {
  if (err) {
    fs.writeFile(crawlerLogPath, JSON.stringify([]), "utf8", (err) => {
      if (err) {
        console.error("Error creating file:", err);
        return;
      }
    });
  }
});

const themes = getThemes.map((data) => ({
  demo: data.frontmatter.demo,
  slug: data.slug,
}));

const captureScreenshot = async (demo, slug, overwrite) => {
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

    await page.goto(demo, {
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
    spinner.text = `${demo} => failed capturing`;
    // Read and update crawler-log
    fs.readFile(crawlerLogPath, "utf8", (err, result) => {
      if (err) {
        console.log("Error reading file from disk:", err);
        return;
      }
      try {
        const logs = JSON.parse(result);
        logs.push(demo);
        const stringifyLogs = JSON.stringify(logs);

        // Write the crawler log to the file
        fs.writeFile(crawlerLogPath, stringifyLogs, "utf8", (err) => {
          if (err) {
            console.error("Error writing file:", err);
            return;
          }
        });
      } catch (err) {
        console.log("Error parsing JSON string:", err);
      }
    });
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
  false, // overwrite value
);
