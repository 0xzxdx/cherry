import type { MetaFunction } from "@remix-run/cloudflare";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "~/components/theme-provider";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Translate | Online Translation Tool" },
    {
      name: "description",
      content: "Simple and efficient online translation tool",
    },
  ];
};

export default function Index() {
  const { theme, setTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState("en"); // 将初始值设置为 "en"

  const toggleLanguage = () => {
    const newLang = currentLanguage === "en" ? "zh" : "en";
    i18n.changeLanguage(newLang);
    setCurrentLanguage(newLang);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="border-b">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <h1 className="text-xl font-bold">{t("translate")}</h1>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={toggleLanguage}>
              {currentLanguage === "en" ? "中" : "En"}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? (
                <MoonIcon className="h-5 w-5" />
              ) : (
                <SunIcon className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t("selectSourceLang")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">{t("english")}</SelectItem>
                <SelectItem value="zh">{t("chinese")}</SelectItem>
              </SelectContent>
            </Select>
            <Textarea
              className="mt-2"
              placeholder={t("inputPlaceholder")}
              rows={10}
            />
          </div>

          <div>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t("selectTargetLang")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">{t("english")}</SelectItem>
                <SelectItem value="zh">{t("chinese")}</SelectItem>
              </SelectContent>
            </Select>
            <Textarea
              className="mt-2"
              placeholder={t("outputPlaceholder")}
              rows={10}
              readOnly
            />
          </div>
        </div>

        <div className="mt-4 text-center">
          <Button>{t("translateButton")}</Button>
        </div>
      </main>
    </div>
  );
}
