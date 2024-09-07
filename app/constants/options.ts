export const LANGUAGE_OPTIONS = [
  { value: "English", label: "english" },
  { value: "Chinese", label: "chinese" },
] as const;

export const MODEL_OPTIONS = [
  { value: "gpt-4o", label: "GPT-4o" },
  { value: "gpt-4o-mini", label: "GPT-4o mini" },
] as const;

export type LanguageCode = (typeof LANGUAGE_OPTIONS)[number]["value"];
export type ModelCode = (typeof MODEL_OPTIONS)[number]["value"];

export const TITLE = "Cherry Translate | AI-Powered Online Translation Tool";
export const DESCRIPTION =
  "Cherry Translate is an advanced AI-powered translation tool that offers fast, accurate, and context-aware translations across multiple languages. Elevate your communication with the power of artificial intelligence, ensuring smooth and precise translations.";
export const KEYWORDS =
  "AI translation tool,Online translation tool,Cherry Translate,AI-powered translator,Real-time translation,Accurate translation service,Free online translator,Multilingual translation,Translate with AI,Context-aware translations,Language translation tool,AI-based translation platform";
