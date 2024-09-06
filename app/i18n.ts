import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      translate: "Translate",
      selectSourceLang: "Select source language",
      selectTargetLang: "Select target language",
      inputPlaceholder: "Enter text to translate",
      outputPlaceholder: "Translation will appear here",
      translateButton: "Translate",
      english: "English",
      chinese: "Chinese",
      copy: "Copy",
      swapLanguages: "Swap languages",
      copied: "Copied",
      translating: "Translating...",
    },
  },
  zh: {
    translation: {
      translate: "翻译",
      selectSourceLang: "选择源语言",
      selectTargetLang: "选择目标语言",
      inputPlaceholder: "在此输入要翻译的文本",
      outputPlaceholder: "翻译结果将显示在这里",
      translateButton: "翻译",
      english: "英语",
      chinese: "中文",
      copy: "复制",
      swapLanguages: "互换语言",
      copied: "已复制",
      translating: "翻译中...",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: "en",
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
});

if (typeof window !== "undefined") {
  i18n.use(LanguageDetector);
}

export default i18n;
