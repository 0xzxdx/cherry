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

export const GITHUB_REPO_URL = "https://github.com/0xzxdx/cherry";
