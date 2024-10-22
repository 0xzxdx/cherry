import { ActionFunction, json } from "@remix-run/node";
import { translateText } from "~/lib/openai-client";
import {
  LANGUAGE_OPTIONS,
  MODEL_OPTIONS,
  LanguageCode,
  ModelCode,
} from "~/lib/constants";
import type { TranslateResponse } from "~/lib/types";

type TranslateRequest = {
  sourceLang: LanguageCode;
  sourceText: string;
  targetLang: LanguageCode;
  model: ModelCode;
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

    if (
      !LANGUAGE_OPTIONS.some((option) => option.value === sourceLang) ||
      !LANGUAGE_OPTIONS.some((option) => option.value === targetLang) ||
      !MODEL_OPTIONS.some((option) => option.value === model)
    ) {
      return json(
        { error: "Invalid language or model option" },
        { status: 400 }
      );
    }

    const translatedText = await translateText(
      context.OPENAI_API_KEY as string,
      context.OPENAI_BASE_URL as string,
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
