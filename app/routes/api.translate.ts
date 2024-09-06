import type { ActionFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { translateText } from "../utils/openai-client";

type TranslateRequest = {
  sourceLang: string;
  sourceText: string;
  targetLang: string;
  model: string;
};

type TranslateResponse = {
  translatedText: string;
};

export const action: ActionFunction = async ({ request, context }) => {
  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, { status: 405 });
  }

  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return json(
      { error: "Invalid Content-Type, expected application/json" },
      { status: 400 }
    );
  }

  try {
    const body = (await request.json()) as TranslateRequest;
    const { sourceLang, sourceText, targetLang, model } = body;

    if (!sourceLang || !sourceText || !targetLang || !model) {
      return json({ error: "Missing required fields" }, { status: 400 });
    }

    const translatedText = await translateText(
      context.cloudflare.env.GITHUB_TOKEN,
      sourceText,
      sourceLang,
      targetLang,
      model
    );

    const response: TranslateResponse = { translatedText };
    return json(response);
  } catch (error) {
    console.error("Translation error:", error);
    return json({ error: "Internal server error" }, { status: 500 });
  }
};
