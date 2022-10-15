#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv").config();
const Spinner = require("cli-spinner").Spinner;
const spinner = new Spinner("Loading");
const yamlFront = require("yaml-front-matter");
const yaml = require("js-yaml");
const axios = require("axios");
const rateLimit = require("axios-rate-limit");
const parseGithubUrl = require("parse-github-url");
const getThemes = require("../.json/themes.json");
const themesFolder = path.join(process.cwd(), "/content/themes");
const token = process.env.GITHUB_TOKEN;

// check github token
if (!token) {
  throw new Error(
    'Cannot access Github API - environment variable "GITHUB_TOKEN" is missing'
  );
}

// axios limit
const axiosLimit = rateLimit(axios.create(), {
  maxRequests: 2,
  perMilliseconds: 200,
});

// filter themes
const filterGithubTheme = getThemes.filter((theme) => !theme.frontmatter.price);
const themes = filterGithubTheme.map((data) => ({
  github: data.frontmatter.github,
  slug: data.slug,
}));

// get github repo name
const getRepoName = (repoUrl) => {
  return parseGithubUrl(repoUrl).repo;
};

// get last commit
const getLastCommit = (repo, branch) => {
  return axiosLimit
    .get(`https://api.github.com/repos/${repo}/branches/${branch}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((res) => {
      const lastCommit = res.data.commit.commit.author.date;
      return lastCommit;
    })
    .catch((err) => {});
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
  const repo = getRepoName(githubURL);

  try {
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
  } catch (err) {
    spinner.text = `${slug} => update failed`;
    updateFrontmatter(slug, {
      draft: true,
      disabled_reason: "Github repo not found",
    });
  }
};

// update all github data
updateAllGithubData = async (themes) => {
  spinner.start("Updating github data");
  for (const data of themes) {
    await updateGithubData(data.github, data.slug);
  }
  spinner.stop("Success - Updating github data");
};

updateAllGithubData(themes);
