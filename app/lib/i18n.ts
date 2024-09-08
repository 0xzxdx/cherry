import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      translate: "Cherry Translate",
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
      title: "Cherry Translate | AI-Powered Online Translation Tool",
      description:
        "Cherry Translate is an advanced AI-powered translation tool that offers fast, accurate, and context-aware translations across multiple languages. Elevate your communication with the power of artificial intelligence, ensuring smooth and precise translations.",
      keywords:
        "AI translation tool,Online translation tool,Cherry Translate,AI-powered translator,Real-time translation,Accurate translation service,Free online translator,Multilingual translation,Translate with AI,Context-aware translations,Language translation tool,AI-based translation platform",
    },
  },
  zh: {
    translation: {
      translate: "樱桃翻译",
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
      title: "樱桃翻译 | AI驱动的在线翻译工具",
      description:
        "樱桃翻译是一款先进的AI驱动翻译工具，提供快速、准确和上下文感知的多语言翻译。借助人工智能的力量提升您的沟通，确保流畅精准的翻译。",
      keywords:
        "AI翻译工具,在线翻译工具,樱桃翻译,AI驱动翻译器,实时翻译,准确翻译服务,免费在线翻译器,多语言翻译,AI翻译,上下文感知翻译,语言翻译工具,AI翻译平台",
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
