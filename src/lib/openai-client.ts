import OpenAI from "openai";

export function createOpenAIClient(base_url: string, api_key: string) {
  return new OpenAI({ baseURL: base_url, apiKey: api_key });
}

export async function translateText(
  api_key: string,
  base_url: string,
  sourceText: string,
  sourceLang: string,
  targetLang: string,
  model: string
): Promise<string> {
  const client = createOpenAIClient(base_url, api_key);
  try {
    const response = await client.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a professional, authentic translation engine. You only return the translated text, without any explanations. Translate from ${sourceLang} to ${targetLang}.`,
        },
        { role: "user", content: sourceText },
      ],
      model: model,
      temperature: 1,
      max_tokens: 1000,
      top_p: 1,
    });

    return response.choices[0].message.content || "Translation failed";
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error("Translation failed");
  }
}
