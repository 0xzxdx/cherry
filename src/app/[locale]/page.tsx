"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";
import TranslationInput from "@/components/translation-input";
import TranslationOutput from "@/components/translation-output";
import { useMutation } from "@tanstack/react-query";

export default function HomePage() {
  const [sourceLang, setSourceLang] = useState("English");
  const [targetLang, setTargetLang] = useState("Chinese");
  const [inputText, setInputText] = useState("");
  const [model, setModel] = useState("gpt-4o");

  const handleTranslate = useMutation({
    mutationFn: async (data: {
      sourceLang: string;
      sourceText: string;
      targetLang: string;
      model: string;
    }) => {
      const response = await fetch("/api/translate", {
        method: "POST",
        body: JSON.stringify(data),
      });

      return response.json();
    },
  });

  const swapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
  };

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
            handleTranslate={() =>
              handleTranslate.mutate({
                sourceLang,
                sourceText: inputText,
                targetLang,
                model,
              })
            }
            swapLanguages={swapLanguages}
            isPending={handleTranslate.isPending}
          />

          <TranslationOutput
            targetLang={targetLang}
            setTargetLang={setTargetLang}
            translatedText={handleTranslate.data?.translatedText}
          />
        </div>
      </main>
    </div>
  );
}
