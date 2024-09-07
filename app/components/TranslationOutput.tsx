import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { ClipboardIcon } from "@radix-ui/react-icons";
import { useTranslation } from "react-i18next";
import { LANGUAGE_OPTIONS } from "~/lib/constants";

type TranslationOutputProps = {
  targetLang: string;
  setTargetLang: (lang: string) => void;
  translatedText: string;
};

export default function TranslationOutput({
  targetLang,
  setTargetLang,
  translatedText,
}: TranslationOutputProps) {
  const { t } = useTranslation();
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(translatedText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
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
  );
}
