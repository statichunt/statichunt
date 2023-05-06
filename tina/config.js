import { defineConfig } from "tinacms";
import posts from "./collections/posts";
import taxonomies from "./collections/taxonomies";
import themes from "./collections/themes";
import tools from "./collections/tools";
import config from "./global/config";
import menu from "./global/menu";

export default defineConfig({
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  branch:
    process.env.NEXT_PUBLIC_TINA_BRANCH || // custom branch env override
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF || // Vercel branch env
    process.env.HEAD || // Netlify branch env
    "main", // default branch
  token: process.env.TINA_TOKEN,
  client: { skip: true },
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [posts, themes, tools, ...taxonomies, menu, config],
  },
});
