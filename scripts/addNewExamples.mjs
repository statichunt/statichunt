import axios from "axios";
import dotenv from "dotenv";
import fs from "fs";
import ora from "ora";
import path from "path";

dotenv.config();

const spinner = ora("Loading");
const BackendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
const Token = process.env.NEXT_PUBLIC_TOKEN;
const examplesPath = path.join("content", "examples");

const getApprovedExample = await axios.get(
  `${BackendURL}/submit-example/approved`,
  {
    headers: {
      authorization_token: `Bearer ${Token}`,
    },
  },
);

const approvedExample = getApprovedExample.data.result;

const addNewExample = async () => {
  spinner.start("Adding new examples...");
  for (const example of approvedExample) {
    const exampleFileName = `${example.title.toLowerCase().replace(/\s+/g, "-")}.md`;
    const exampleFilePath = path.join(examplesPath, exampleFileName);

    if (fs.existsSync(exampleFilePath)) {
      spinner.info(`Skipping ${example.title}, already exists.`);
      continue;
    }

    const markdownContent = `---
title: ${example.title}
date: ${new Date().toISOString()}
website: ${example.website}
ssg: [${example.ssg.join(", ")}]
category: [${example.category.join(", ")}]
css: [${example.css.join(", ")}]
ui: [${example.ui.join(", ")}]
draft: false
---`;

    fs.writeFileSync(exampleFilePath, markdownContent, "utf8");
    spinner.succeed(`Added ${example.title}`);

    await axios.patch(
      `${BackendURL}/submit-example/${example._id}/added`,
      {},
      {
        headers: {
          authorization_token: `Bearer ${Token}`,
        },
      },
    );
  }
  spinner.succeed("All new examples added and updated.");
};

await addNewExample();
