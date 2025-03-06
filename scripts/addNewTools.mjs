import axios from "axios";
import dotenv from "dotenv";
import fs from "fs";
import ora from "ora";
import path from "path";

dotenv.config();

const spinner = ora("Loading");
const BackendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
const Token = process.env.NEXT_PUBLIC_TOKEN;
const toolsPath = path.join("content", "tools");

const getApprovedTool = await axios.get(`${BackendURL}/submit-tool/approved`, {
  headers: {
    authorization_token: `Bearer ${Token}`,
  },
});

const approvedTool = getApprovedTool.data.result;

const addNewTool = async () => {
  spinner.start("Adding new tools...");
  for (const tool of approvedTool) {
    const toolFileName = `${tool.title.toLowerCase().replace(/\s+/g, "-")}.md`;
    const toolFilePath = path.join(toolsPath, toolFileName);

    if (fs.existsSync(toolFilePath)) {
      spinner.info(`Skipping ${tool.title}, already exists.`);
      continue;
    }

    const markdownContent = `---
title: ${tool.title}
date: ${new Date().toISOString()}
website: ${tool.website}
description: ${tool.description}
license: ${tool.license}
category: [${tool.category.join(", ")}]
supports: [${tool.supports.join(", ")}]
plans: [${tool.plans.join(", ")}]
type: [${tool.type.join(", ")}]
draft: false
---
${tool.content}`;

    fs.writeFileSync(toolFilePath, markdownContent, "utf8");
    spinner.succeed(`Added ${tool.title}`);

    await axios.patch(
      `${BackendURL}/submit-tool/${tool._id}/added`,
      {},
      {
        headers: {
          authorization_token: `Bearer ${Token}`,
        },
      },
    );
  }
  spinner.succeed("All new tools added and updated.");
};

await addNewTool();
