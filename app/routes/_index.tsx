import type { MetaFunction } from "@remix-run/cloudflare";
import { useState, useEffect } from "react";
import { useFetcher } from "@remix-run/react";
import { TITLE, DESCRIPTION, KEYWORDS } from "~/lib/constants";
import Navbar from "~/components/Navbar";
import TranslationInput from "~/components/TranslationInput";
import TranslationOutput from "~/components/TranslationOutput";
import type { TranslateResponse } from "~/types/translate";

export const meta: MetaFunction = () => [
  { title: TITLE },
  { name: "description", content: DESCRIPTION },
  { name: "keywords", content: KEYWORDS },
];

export default function Index() {
  const [sourceLang, setSourceLang] = useState("English");
  const [targetLang, setTargetLang] = useState("Chinese");
  const [inputText, setInputText] = useState("");
  const [model, setModel] = useState("gpt-4o");
  const [translatedText, setTranslatedText] = useState("");
  const fetcher = useFetcher<TranslateResponse>();

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

  const swapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
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
      <Navbar />
      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <TranslationInput
            sourceLang={sourceLang}
            setSourceLang={setSourceLang}
            model={model}
            setModel={setModel}
            inputText={inputText}
            setInputText={setInputText}
            handleTranslate={handleTranslate}
            swapLanguages={swapLanguages}
            fetcher={fetcher}
          />
          <TranslationOutput
            targetLang={targetLang}
            setTargetLang={setTargetLang}
            translatedText={translatedText}
          />
        </div>
      </main>
    </div>
  );
}
