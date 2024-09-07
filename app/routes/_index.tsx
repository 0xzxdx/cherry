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
import {
  MoonIcon,
  SunIcon,
  ArrowRightIcon,
  WidthIcon,
  ClipboardIcon,
  GitHubLogoIcon,
} from "@radix-ui/react-icons";
import { useTheme } from "~/components/theme-provider";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { useFetcher } from "@remix-run/react";
import {
  LANGUAGE_OPTIONS,
  MODEL_OPTIONS,
  TITLE,
  DESCRIPTION,
  KEYWORDS,
} from "~/constants/options";

export const meta: MetaFunction = () => {
  return [
    { title: TITLE },
    { name: "description", content: DESCRIPTION },
    { name: "keywords", content: KEYWORDS },
  ];
};

type FetcherData = {
  translatedText?: string;
  error?: string;
};

export default function Index() {
  const { theme, setTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [sourceLang, setSourceLang] = useState("English");
  const [targetLang, setTargetLang] = useState("Chinese");
  const [inputText, setInputText] = useState("");
  const [model, setModel] = useState("gpt-4o");
  const [translatedText, setTranslatedText] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const fetcher = useFetcher<FetcherData>();

  const toggleLanguage = () => {
    const newLang = currentLanguage === "en" ? "zh" : "en";
    i18n.changeLanguage(newLang);
    setCurrentLanguage(newLang);
  };

  const swapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (newText.length <= 5000) {
      setInputText(newText);
    }
  };

  const handleTranslate = () => {
    fetcher.submit(
      JSON.stringify({
        sourceLang,
        sourceText: inputText,
        targetLang,
        model,
      }),
      {
        method: "post",
        action: "/api/translate",
        encType: "application/json",
      }
    );
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text.length <= 5000) {
        setInputText(text);
      } else {
        setInputText(text.slice(0, 5000));
      }
    } catch (err) {
      console.error("Failed to read clipboard contents: ", err);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(translatedText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  useEffect(() => {
    if (fetcher.data) {
      if (fetcher.data.translatedText) {
        setTranslatedText(fetcher.data.translatedText);
      } else if (fetcher.data.error) {
        setTranslatedText(JSON.stringify(fetcher.data.error));
      }
    }
  }, [fetcher.data]);

  return (
    <div className="min-h-screen bg-background text-foreground">
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
              <a
                href="https://github.com/0xzxdx/cherry"
                target="_blank"
                rel="noopener noreferrer"
              >
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

      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <div className="flex flex-col space-y-2 sm:flex-row sm:justify-between sm:items-center mb-2">
              <div className="flex flex-wrap items-center gap-2">
                <Select value={sourceLang} onValueChange={setSourceLang}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder={t("selectSourceLang")} />
                  </SelectTrigger>
                  <SelectContent>
                    {LANGUAGE_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {t(option.label)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={model} onValueChange={setModel}>
                  <SelectTrigger className="w-full sm:w-[140px]">
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    {MODEL_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="ghost" size="sm" onClick={handlePaste}>
                  <ClipboardIcon className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={swapLanguages}>
                  <WidthIcon className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  onClick={handleTranslate}
                  disabled={
                    fetcher.state === "submitting" || inputText.trim() === ""
                  }
                >
                  {fetcher.state === "submitting" ? (
                    t("translating")
                  ) : (
                    <>
                      {t("translateButton")}
                      <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
            <Textarea
              className="min-h-[200px] sm:min-h-[300px]"
              placeholder={t("inputPlaceholder")}
              value={inputText}
              onChange={handleInputChange}
            />
            <div className="flex justify-end items-center mt-2">
              <span
                className={`text-sm ${
                  inputText.length === 5000
                    ? "text-red-500"
                    : "text-muted-foreground"
                }`}
              >
                {inputText.length} / 5000
              </span>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
              <Select value={targetLang} onValueChange={setTargetLang}>
                <SelectTrigger className="w-full sm:w-[180px] mb-2 sm:mb-0">
                  <SelectValue placeholder={t("selectTargetLang")} />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGE_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {t(option.label)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="ghost" size="sm" onClick={handleCopy}>
                {isCopied ? <ClipboardIcon className="h-4 w-4 mr-2" /> : null}
                {isCopied ? t("copied") : t("copy")}
              </Button>
            </div>
            <Textarea
              className="min-h-[200px] sm:min-h-[300px]"
              placeholder={t("outputPlaceholder")}
              value={translatedText}
              readOnly
            />
          </div>
        </div>
      </main>
    </div>
  );
}
