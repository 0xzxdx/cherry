import { RemixI18Next } from "remix-i18next/server";
import * as i18n from "./i18n";

const i18nServer = new RemixI18Next({
  detection: {
    supportedLanguages: i18n.supportedLngs,
    fallbackLanguage: i18n.fallbackLng,
  },
  // This is the configuration for i18next used
  // when translating messages server-side only
  i18next: {
    ...i18n,
  },
});

// Rewrite the `getLocale` method to address the issue with the /zh and /en paths.
i18nServer.getLocale = async (request: Request): Promise<string> => {
  if (request.url.endsWith("/zh")) {
    return "zh";
  }
  return i18n.fallbackLng;
};

export default i18nServer;
