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
const token = process.env.GITHUB_TOKEN;

// check github token
if (!token) {
  throw new Error(
    'Cannot access Github API - environment variable "GITHUB_TOKEN" is missing',
  );
}

// axios limit
const axiosLimit = rateLimit(axios.create(), {
  maxRequests: 2,
  perMilliseconds: 200,
});

// get new themes
const filterNewTheme = getThemes.filter(
  (theme) =>
    theme.frontmatter.github &&
    !theme.frontmatter.publish_date &&
    !theme.frontmatter.price,
);

const themes = filterNewTheme.map((data) => ({
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
    // if demo already exists, then don't update the demo value
    if (key === "demo" && frontmatter.demo) {
      return;
    } else {
      frontmatter[key] = update[key];
    }
  });

  if (
    (!update.demo && !frontmatter.demo) ||
    frontmatter.github === update.demo
  ) {
    fs.unlinkSync(filePath);
  } else {
    const frontmatterWrite = `---\n${yaml.dump(frontmatter)}---${content}`;
    fs.writeFileSync(filePath, frontmatterWrite);
  }
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
      demo: res.data.homepage,
      publish_date: res.data.created_at,
      update_date: lastCommit,
      github_star: res.data.stargazers_count,
      github_fork: res.data.forks_count,
    });
  } catch (err) {
    spinner.text = `${slug} => update failed`;
    updateFrontmatter(slug, {
      draft: true,
      disabled_reason: "Github repo not found",
    });
  }
};

// update all github data
const updateAllGithubData = async (themes) => {
  spinner.start("Updating github data");
  for (const data of themes) {
    await updateGithubData(data.github, data.slug);
  }
  spinner.stop("Success - Updating github data");
};

updateAllGithubData(themes);
