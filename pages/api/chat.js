export const runtime = "edge";

import themes from "@/json/theme-finder.json";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

const allowedOptions = {
  ssg: [
    "Hugo",
    "Nextjs",
    "Astro",
    "Jekyll",
    "Eleventy",
    "Nuxtjs",
    "Hexo",
    "Gatsby",
  ],
  css: ["Tailwind", "Bootstrap", "Bulma", "SCSS", "PostCSS", "Stylus"],
  ui: [
    "Material",
    "Chakra",
    "Headless",
    "Shadcn",
    "Ant",
    "Vuetify",
    "Radix",
    "Flowbite",
    "Mantine",
    "Semantic",
    "Next",
    "Daisy",
  ],
  cms: [
    "Tina",
    "Cloudcannon",
    "Datocms",
    "Sanity",
    "Contentful",
    "Ghost",
    "Graphcms",
    "Decap",
    "Spinal",
    "Markdown",
  ],
  category: [
    "Business",
    "Blog",
    "Portfolio",
    "Boilerplate",
    "Documentation",
    "Ecommerce",
    "Saas",
    "Dashboard",
  ],
  features: [
    "search",
    "seo",
    "speed",
    "contact",
    "author",
    "dark",
    "pwa",
    "i18n",
    "syntax",
    "analytics",
    "blog",
    "e-commerce",
  ],
};

const extractFilters = (message) => {
  let filters = {
    ssg: [],
    css: [],
    ui: [],
    cms: [],
    category: [],
    features: [],
  };

  for (let key in allowedOptions) {
    allowedOptions[key].forEach((option) => {
      if (message.toLowerCase().includes(option.toLowerCase())) {
        filters[key].push(option);
      }
    });
  }
  return filters;
};

const filterThemes = (filters) => {
  return themes.filter((theme) => {
    return Object.keys(filters).every(
      (key) =>
        filters[key].length === 0 ||
        filters[key].some((value) => theme[key]?.includes(value)),
    );
  });
};

export default async function handler(req) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
    });
  }

  const { apiKey: key, messages, model = "gpt-4o-mini" } = await req.json();
  const apiKey = key || process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return new Response(JSON.stringify({ error: "Missing OpenAI API key" }), {
      status: 401,
    });
  }

  const openai = createOpenAI({ apiKey });
  const userMessage = messages[messages.length - 1].content;
  const filters = extractFilters(userMessage);
  const matchedThemes = filterThemes(filters);

  let responseText = matchedThemes.length
    ? `Here are some themes that match your criteria: ${matchedThemes.map((t) => t.slug).join(", ")}`
    : "I couldn't find a matching theme. Could you provide more details?";

  const systemPrompt =
    "You are a theme-finding assistant. Only respond with theme recommendations based on the user's input.";

  const result = streamText({
    maxTokens: 2048,
    system: systemPrompt,
    messages: [...messages, { role: "assistant", content: responseText }],
    model: openai(model),
  });

  return result.toDataStreamResponse();
}
