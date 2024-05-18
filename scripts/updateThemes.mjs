import axios from "axios";
import rateLimit from "axios-rate-limit";
import dotenv from "dotenv";
import fs, { readFileSync } from "fs";
import yaml from "js-yaml";
import ora from "ora";
import parseGithubUrl from "parse-github-url";
import path from "path";
import yamlFront from "yaml-front-matter";

dotenv.config();

const getThemes = JSON.parse(readFileSync(".json/themes.json"));
const spinner = ora("Loading");
const themesFolder = path.join(process.cwd(), "/content/themes");
const crawlerLogPath = "./crawler-log.json";
const token = process.env.GITHUB_TOKEN;

// check github token
if (!token) {
  throw new Error(
    'Cannot access Github API - environment variable "GITHUB_TOKEN" is missing',
  );
}

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

// axios limit
const axiosLimit = rateLimit(axios.create(), {
  maxRequests: 2,
  perMilliseconds: 200,
});

// get all github themes
const filterGithubTheme = getThemes.filter(
  (theme) => theme.frontmatter.github && !theme.frontmatter.price,
);

const themes = filterGithubTheme.map((data) => ({
  github: data.frontmatter.github,
  slug: data.slug,
}));

// get github repo name
const getRepoName = (repoUrl) => {
  return parseGithubUrl(repoUrl).repo;
};

// get last commit
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
    const lastCommit = res.data.commit.commit.author.date;
    return lastCommit;
  } catch (err) {
    return null;
  }
};

// update frontmatter
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

// fetch github data
const updateGithubData = async (githubURL, slug) => {
  try {
    const repo = getRepoName(githubURL);
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

    // Read the crawler log file
    fs.readFile(crawlerLogPath, "utf8", (err, result) => {
      if (err) {
        console.log("Error reading file from disk:", err);
        return;
      }
      try {
        const logs = JSON.parse(result);
        logs.push(slug);
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
  } catch (err) {
    spinner.text = `${slug} => update failed`;
    // updateFrontmatter(slug, {
    //   draft: true,
    //   disabled_reason: "Github repo not found",
    // });
  }
};

// update all github data
const updateAllGithubData = async (themes) => {
  spinner.start("Updating github data");

  // filter crawler log themes
  const crawlerLog = fs.readFileSync(crawlerLogPath, "utf8");
  themes = themes.filter((theme) => !crawlerLog.includes(theme.slug));
  themes = themes.slice(0, 2500);

  for (const theme of themes) {
    await updateGithubData(theme.github, theme.slug);
  }
  spinner.stop("Success - Updating github data");
};

// main function delay 1s for create crawler log file
setTimeout(() => {
  updateAllGithubData(themes);
}, 1000);
