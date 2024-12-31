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

function groupDataByAuthorAndSSG(data) {
  const result = [];

  data.forEach((item) => {
    const { author: name, ssg } = item;
    const existingEntry = result.find(
      (entry) => entry.name === name && entry.ssg === ssg,
    );

    if (existingEntry) {
      existingEntry.count += 1;
    } else {
      result.push({ name, ssg, count: 1 });
    }
  });

  return result;
}

const localAuthors = groupDataByAuthorAndSSG(localThemes);

const getDbAuthors = await axios.get(`${BackendURL}/author/public`);
const dbAuthors = getDbAuthors.data.result;

// filter out themes that are already in the database, and keep the ones that are not
const filterLocalAuthors = localAuthors.filter((localAuthor) => {
  return !dbAuthors.find(
    (dbAuthor) =>
      dbAuthor.name === localAuthor.name && dbAuthor.ssg === localAuthor.ssg,
  );
});

// insert authors into the database
const insertAuthor = async () => {
  spinner.start("Updating github data");
  for (const author of filterLocalAuthors) {
    spinner.text = `Inserting ${author.name}`;
    await axios.post(`${BackendURL}/author`, author, {
      headers: {
        authorization_token: `Bearer ${Token}`,
      },
    });
  }
  spinner.succeed("Authors updated");
};

// delete author that doesn't exist in local
const deleteAuthor = async () => {
  spinner.start("Deleting authors");
  for (const author of dbAuthors) {
    if (!localAuthors.find((localAuthor) => localAuthor.name === author.name)) {
      spinner.text = `Deleting ${author.name}`;
      await axios.delete(`${BackendURL}/author/${author.name}/${author.ssg}`, {
        headers: {
          authorization_token: `Bearer ${Token}`,
        },
      });
    }
  }
  spinner.succeed("Authors deleted");
};

// sync author
const syncAuthor = async () => {
  await insertAuthor();
  await deleteAuthor();
};

syncAuthor();
