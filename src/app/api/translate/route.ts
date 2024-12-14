import { NextRequest, NextResponse } from "next/server";
import {
  LANGUAGE_OPTIONS,
  MODEL_OPTIONS,
  LanguageCode,
  ModelCode,
} from "@/lib/constants";
import { TranslateResponse } from "@/lib/types";
import { translateText } from "@/lib/openai-client";

type TranslateRequest = {
  sourceLang: LanguageCode;
  sourceText: string;
  targetLang: LanguageCode;
  model: ModelCode;
};

export async function POST(request: NextRequest) {
  if (request.method != "POST") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const body = (await request.json()) as TranslateRequest;
    const { sourceLang, sourceText, targetLang, model } = body;

    if (!sourceLang || !sourceText || !targetLang || !model) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (
      !LANGUAGE_OPTIONS.some((option) => option.value === sourceLang) ||
      !LANGUAGE_OPTIONS.some((option) => option.value === targetLang) ||
      !MODEL_OPTIONS.some((option) => option.value === model)
    ) {
      return NextResponse.json(
        { error: "Invalid language or model option" },
        { status: 400 }
      );
    }

    const translatedText = await translateText(
      process.env.OPENAI_API_KEY as string,
      process.env.OPENAI_BASE_URL as string,
      sourceText,
      sourceLang,
      targetLang,
      model
    );

    const response: TranslateResponse = { translatedText };
    return NextResponse.json(response);
  } catch (error) {
    console.error("Translation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
