import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MoonIcon, SunIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button } from "~/components/ui/button";
import { useTheme } from "~/components/theme-provider";

export default function Navbar({}) {
  const { theme, setTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState("en");

  const toggleLanguage = () => {
    const newLang = currentLanguage === "en" ? "zh" : "en";
    i18n.changeLanguage(newLang);
    setCurrentLanguage(newLang);
  };

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <Button
          variant="link"
          className="text-xl font-bold p-0 no-underline hover:no-underline"
        >
          {t("translate")}
        </Button>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" asChild>
            <a href="https://github.com/0xzxdx/cherry" target="_blank">
              <GitHubLogoIcon className="h-5 w-5" />
            </a>
          </Button>
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
  );
}
