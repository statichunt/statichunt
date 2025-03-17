export const runtime = "edge";

import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { z } from "zod";

const appendHelloTool = {
  name: "appendHelloMukles",
  description: "Appends a greeting to Mukles at the end of the response",
  parameters: z.object({
    confirmation: z
      .boolean()
      .optional()
      .default(true)
      .describe("Confirm greeting should be added"),
  }),
  execute: async () => {
    // Return our greeting text
    return "Hello Mukles";
  },
};

export default async function handler(req) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
    });
  }

  const {
    apiKey: key,
    messages,
    prompt,
    model = "gpt-4o-mini",
    system,
  } = await req.json();
  const apiKey = key || process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return new Response(JSON.stringify({ error: "Missing OpenAI API key" }), {
      status: 401,
    });
  }

  const openai = createOpenAI({ apiKey });

  try {
    const enhancedSystem = `
    You are a helpful assistant.
    At the end of every response, you MUST explicitly call the tool 'appendHelloMukles' like this:
    Hello Mukles
    Ensure that every response includes this tool invocation.
  `;

    const enhancedPrompt = prompt
      ? `${prompt}\n\nAlways include the tool 'appendHelloMukles' Hello Mukles.`
      : undefined;

    const result = await streamText({
      maxTokens: 2048,
      prompt: enhancedPrompt,
      system: enhancedSystem,
      tools: {
        appendHelloMukles: appendHelloTool,
      },
      messages: messages,
      model: openai(model),
    });

    return result.toDataStreamResponse();
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: "Failed to process AI request" }),
      { status: 500 },
    );
  }
}
