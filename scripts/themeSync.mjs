import axios from "axios";
import dotenv from "dotenv";
import fs from "fs";
import matter from "gray-matter";
import ora from "ora";
import path from "path";

dotenv.config();

const spinner = ora("Loading");
const BackendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
const Token = process.env.NEXT_PUBLIC_TOKEN;
const getLocalThemes = fs.readdirSync(path.join("content", "themes"));
const sanitizeThemes = getLocalThemes.filter((theme) => theme.includes(".md"));
const removeThemeIndex = sanitizeThemes.filter((theme) =>
  theme.match(/^(?!_)/),
);

const getDbThemes = await axios.get(`${BackendURL}/theme/public`);

const localThemes = removeThemeIndex.map((filename) => {
  const slug = filename.replace(".md", "");
  let theme = fs.readFileSync(
    path.join("content", "themes", filename),
    "utf-8",
  );
  let { data } = matter(theme);
  const { title, author, ssg, category, date } = data;

  return {
    slug,
    title,
    author,
    ssg: ssg?.length > 0 ? ssg[0] : "other",
    category: category?.length > 0 ? category[0] : "other",
    createdAt: date,
  };
});

const dbThemes = getDbThemes.data.result;

// filter out themes that are already in the database, and keep the ones that are not
const filterLocalThemes = localThemes.filter((localTheme) => {
  return !dbThemes.find((dbTheme) => dbTheme.slug === localTheme.slug);
});

// insert themes into the database
const insertTheme = async () => {
  spinner.start("Updating github data");
  for (const theme of filterLocalThemes) {
    spinner.text = `Inserting ${theme.slug}`;
    await axios.post(`${BackendURL}/theme`, theme, {
      headers: {
        authorization_token: `Bearer ${Token}`,
      },
    });
  }
  spinner.succeed("Themes updated");
};

// delete theme that doesn't exist in local
const deleteTheme = async () => {
  spinner.start("Deleting themes");
  for (const theme of dbThemes) {
    if (!localThemes.find((localTheme) => localTheme.slug === theme.slug)) {
      spinner.text = `Deleting ${theme.slug}`;
      await axios.delete(`${BackendURL}/theme/${theme.slug}`, {
        headers: {
          authorization_token: `Bearer ${Token}`,
        },
      });
    }
  }
  spinner.succeed("Themes deleted");
};

// sync theme
const syncTheme = async () => {
  await insertTheme();
  await deleteTheme();
};

syncTheme();
