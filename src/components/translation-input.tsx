"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowRightIcon,
  WidthIcon,
  ClipboardIcon,
} from "@radix-ui/react-icons";
import { LANGUAGE_OPTIONS, MODEL_OPTIONS } from "@/lib/constants";
import { useTranslations } from "next-intl";

type TranslationInputProps = {
  sourceLang: string;
  setSourceLang: (lang: string) => void;
  model: string;
  setModel: (model: string) => void;
  inputText: string;
  setInputText: (text: string) => void;
  handleTranslate: () => void;
  swapLanguages: () => void;
  isPending: boolean;
};

export default function TranslationInput({
  sourceLang,
  setSourceLang,
  model,
  setModel,
  inputText,
  setInputText,
  handleTranslate,
  swapLanguages,
  isPending,
}: TranslationInputProps) {
  const t = useTranslations();

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (newText.length <= 5000) {
      setInputText(newText);
    }
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

  return (
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
          <Button size="sm" onClick={handleTranslate} disabled={isPending}>
            {isPending ? (
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
            inputText.length === 5000 ? "text-red-500" : "text-muted-foreground"
          }`}
        >
          {inputText.length} / 5000
        </span>
      </div>
    </div>
  );
}
