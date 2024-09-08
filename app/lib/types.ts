export type Theme = "dark" | "light" | "system";

export type Settings = {
  theme: Theme;
  language: string;
};

export type TranslateResponse = {
  translatedText?: string;
  error?: string;
};
