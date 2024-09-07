import OpenAI from "openai";

const endpoint = "https://models.inference.ai.azure.com";

export function createOpenAIClient(GITHUB_TOKEN?: string) {
  if (!GITHUB_TOKEN) {
    throw new Error("GITHUB_TOKEN is not set");
  }
  return new OpenAI({ baseURL: endpoint, apiKey: GITHUB_TOKEN });
}

export async function translateText(
  GITHUB_TOKEN: string,
  sourceText: string,
  sourceLang: string,
  targetLang: string,
  model: string
): Promise<string> {
  const client = createOpenAIClient(GITHUB_TOKEN);
  try {
    const response = await client.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a translator. Translate from ${sourceLang} to ${targetLang}.`,
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
