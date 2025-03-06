import axios from "axios";
import dotenv from "dotenv";
import fs from "fs";
import ora from "ora";
import path from "path";

dotenv.config();

const spinner = ora("Loading");
const BackendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
const Token = process.env.NEXT_PUBLIC_TOKEN;
const themesPath = path.join("content", "themes");

const getApprovedThemes = await axios.get(
  `${BackendURL}/submit-theme/approved`,
  {
    headers: {
      authorization_token: `Bearer ${Token}`,
    },
  },
);

const approvedThemes = getApprovedThemes.data.result;

const addNewThemes = async () => {
  spinner.start("Adding new themes...");
  for (const theme of approvedThemes) {
    const themeFileName = `${theme.ssg[0].toLowerCase()}-${theme.title.toLowerCase().replace(/\s+/g, "-")}.md`;
    const themeFilePath = path.join(themesPath, themeFileName);

    if (fs.existsSync(themeFilePath)) {
      spinner.info(`Skipping ${theme.title}, already exists.`);
      continue;
    }

    const markdownContent = `---
title: ${theme.title}
date: ${new Date().toISOString()}
github: ${theme.github}
price: ${theme.price}
download: "${theme.download}"
demo: ${theme.demo}
author: ${theme.author}
author_link: ${theme.author_link}
description: ${theme.description}
ssg: [${theme.ssg.join(", ")}]
css: [${theme.css.join(", ")}]
ui: [${theme.ui.join(", ")}]
cms: [${theme.cms.join(", ")}]
category: [${theme.category.join(", ")}]
draft: false
---
${theme.content}`;

    fs.writeFileSync(themeFilePath, markdownContent, "utf8");
    spinner.succeed(`Added ${theme.title}`);

    await axios.patch(
      `${BackendURL}/submit-theme/${theme._id}/added`,
      {},
      {
        headers: {
          authorization_token: `Bearer ${Token}`,
        },
      },
    );
  }
  spinner.succeed("All new themes added and updated.");
};

await addNewThemes();
