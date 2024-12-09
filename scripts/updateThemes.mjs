import axios from "axios";
import rateLimit from "axios-rate-limit";
import dotenv from "dotenv";
import fs from "fs";
import yaml from "js-yaml";
import ora from "ora";
import parseGithubUrl from "parse-github-url";
import path from "path";
import yamlFront from "yaml-front-matter";

dotenv.config();

const getThemes = JSON.parse(fs.readFileSync(".json/themes.json"));
const spinner = ora("Loading");
const themesFolder = path.join(process.cwd(), "/content/themes");
const crawlerLogPath = "./crawler-log.json";
const token = process.env.GITHUB_TOKEN;

// Check GitHub token
if (!token) {
  throw new Error(
    'Cannot access GitHub API - environment variable "GITHUB_TOKEN" is missing',
  );
}

// Ensure the crawler log file exists
if (!fs.existsSync(crawlerLogPath)) {
  fs.writeFileSync(crawlerLogPath, JSON.stringify([]), "utf8");
}

// Rate-limited Axios instance
const axiosLimit = rateLimit(axios.create(), {
  maxRequests: 2,
  perMilliseconds: 200,
});

// Check rate limit
const checkRateLimit = async () => {
  try {
    const res = await axios.get("https://api.github.com/rate_limit", {
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    const remaining = res.data.rate.remaining;
    const reset = res.data.rate.reset;

    if (remaining === 0) {
      const resetTime = new Date(reset * 1000);
      const waitTime = resetTime - Date.now();
      console.log(
        `Rate limit reached. Waiting until ${resetTime.toLocaleString()}...`,
      );

      // Pause execution until the reset time
      await new Promise((resolve) => setTimeout(resolve, waitTime));
    }
  } catch (err) {
    console.error("Error checking rate limit:", err.message);
  }
};

// Filter GitHub themes
const filterGithubTheme = getThemes.filter(
  (theme) => theme.frontmatter.github && !theme.frontmatter.price,
);

const themes = filterGithubTheme.map((data) => ({
  github: data.frontmatter.github,
  slug: data.slug,
}));

// Get repository name from URL
const getRepoName = (repoUrl) => {
  return parseGithubUrl(repoUrl).repo;
};

// Get the last commit date
const getLastCommit = async (repo, branch) => {
  try {
    const res = await axiosLimit.get(
      `https://api.github.com/repos/${repo}/branches/${branch}`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    );
    return res.data.commit.commit.author.date;
  } catch (err) {
    return null;
  }
};

// Update frontmatter of a theme file
const updateFrontmatter = (slug, update = {}) => {
  const filePath = path.resolve(themesFolder, slug + ".md");
  const fileData = fs.existsSync(filePath) ? fs.readFileSync(filePath) : null;
  const frontmatter = yamlFront.loadFront(fileData);
  const content = frontmatter.__content;
  delete frontmatter.__content;

  Object.keys(update).forEach((key) => {
    frontmatter[key] = update[key];
  });

  const frontmatterWrite = `---\n${yaml.dump(frontmatter)}---${content}`;
  fs.writeFileSync(filePath, frontmatterWrite);
};

// Read crawler log
const getCrawlerLog = () => {
  try {
    const logData = fs.readFileSync(crawlerLogPath, "utf8");
    return JSON.parse(logData);
  } catch (err) {
    console.error("Error reading or parsing crawler-log.json:", err.message);
    return [];
  }
};

// Write crawler log
const saveCrawlerLog = (logs) => {
  try {
    const stringifyLogs = JSON.stringify(logs, null, 2); // Pretty formatting
    fs.writeFileSync(crawlerLogPath, stringifyLogs, "utf8");
  } catch (err) {
    console.error("Error writing to crawler-log.json:", err.message);
  }
};

// Fetch and update GitHub data
const updateGithubData = async (githubURL, slug) => {
  try {
    const repo = getRepoName(githubURL);

    // Check rate limit before proceeding
    await checkRateLimit();

    spinner.text = `${slug} => updating`;
    const res = await axiosLimit.get(`https://api.github.com/repos/${repo}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    const lastCommit = await getLastCommit(repo, res.data.default_branch);

    updateFrontmatter(slug, {
      publish_date: res.data.created_at,
      update_date: lastCommit,
      github_star: res.data.stargazers_count,
      github_fork: res.data.forks_count,
    });

    // Update the crawler log
    const logs = getCrawlerLog();
    logs.push(slug);
    saveCrawlerLog(logs);
  } catch (err) {
    spinner.text = `${slug} => update failed`;
    updateFrontmatter(slug, {
      draft: true,
      disabled_reason: "Github repo not found",
    });
  }
};

// Update all GitHub data with concurrency
const updateAllGithubData = async (themes) => {
  spinner.start("Updating GitHub data");

  // Filter themes not in the crawler log
  const crawlerLog = getCrawlerLog();
  themes = themes.filter((theme) => !crawlerLog.includes(theme.slug));

  const chunkSize = 10; // Number of concurrent updates
  for (let i = 0; i < themes.length; i += chunkSize) {
    const chunk = themes.slice(i, i + chunkSize);

    // Check rate limit before processing each chunk
    await checkRateLimit();

    await Promise.all(
      chunk.map((theme) => updateGithubData(theme.github, theme.slug)),
    );
  }

  spinner.stop("Success - Updating GitHub data");
};

// Main function with a delay to ensure the crawler log file exists
setTimeout(() => {
  updateAllGithubData(themes);
}, 1000);
