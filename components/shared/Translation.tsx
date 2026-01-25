"use client";

import { Modal } from "antd";
import axios from "axios";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { mediaProvider } from "@/constants/mediaProvider";
import TextSpech from "./TextSpech";

interface TranslationInModalProps {
  text: string;
  component: React.ReactNode;
}

/**
 * TranslationInModal Component
 * - Displays a modal with translation functionality
 * - Supports nested word-by-word translation for sentences
 * - Uses Next.js Image component for optimized images
 */
const TranslationInModal = ({ text, component }: TranslationInModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);

  const showModal = useCallback(
    (event: React.MouseEvent<HTMLSpanElement>) => {
      event.stopPropagation();
      event.preventDefault();
      setIsModalOpen(true);
    },
    []
  );

  const handleCancel = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      event.stopPropagation();
      event.preventDefault();
      setIsModalOpen(false);
    },
    []
  );

  useEffect(() => {
    const translateText = async () => {
      if (!text?.trim()) return;

      try {
        setLoading(true);
        const response = await axios.post(
          process.env.NEXT_PUBLIC_API_URL + "/api/words/translate/create",
          {
            sourceWords: text,
            sourceLang: "it",
            translatedLang: "bn",
          }
        );
        setTranslatedText(response.data.data.translated);
      } catch (error) {
        console.error("Translation error:", error);
        setTranslatedText("Error translating text.");
      } finally {
        setLoading(false);
      }
    };

    if (isModalOpen && !translatedText && text) {
      translateText();
    }
  }, [text, isModalOpen, translatedText]);

  const words = useMemo(() => {
    if (!text) return [];
    return text.split(" ");
  }, [text]);

  const isOriginalTextSingleWord = useMemo(
    () => text?.trim().split(" ").length === 1,
    [text]
  );

  return (
    <>
      <span className="cursor-pointer" onClick={showModal}>
        {component}
      </span>
      <Modal
        title={
          <div className="flex gap-3 items-center">
            <Image
              src={mediaProvider.dashboard.italy}
              alt="Italy flag"
              width={28}
              height={28}
              className="h-7 w-auto"
            />
            <Image
              src={mediaProvider.dashboard.rightArrow}
              alt="Arrow"
              width={20}
              height={20}
              className="h-5 w-auto"
            />
            <Image
              src={mediaProvider.dashboard.bangladesh}
              alt="Bangladesh flag"
              width={28}
              height={28}
              className="h-7 w-auto"
            />
          </div>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        centered
        zIndex={11000}
      >
        <div className="flex flex-col gap-4 text-xl py-5">
          <div className="flex gap-4 items-center flex-wrap">
            <div className="flex gap-2 flex-wrap text-xl">
              {words.map((item, index) => {
                // If original text is a single word, display as plain text (no modal, no underline)
                if (isOriginalTextSingleWord) {
                  return <span key={index}>{item}</span>;
                }

                // If original text is a sentence, make each word clickable to open a modal
                return (
                  <TranslationInModal
                    key={index}
                    text={item}
                    component={<span className="underline">{item}</span>}
                  />
                );
              })}
            </div>
            <TextSpech text={text} />
          </div>
          <h2 className="text-xl font-semibold">Bengali :</h2>
          <div>
            {loading && "Translating...🤔"}
            {!loading && translatedText && translatedText}
          </div>
        </div>
      </Modal>
    </>
  );
};

interface TranslationFnTextProps {
  inputText: string;
  translateLang?: string;
  inputedLang?: string;
}

/**
 * TranslationFnText Component
 * - Displays translated text for a given input
 * - Automatically translates on mount
 * - Fixed: Now a proper React component (was incorrectly using hooks in a function)
 */
export const TranslationFnText = ({
  inputText,
  translateLang = "it",
  inputedLang = "bn",
}: TranslationFnTextProps) => {
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const translateText = async () => {
      if (!inputText?.trim()) return;

      try {
        setLoading(true);
        const response = await axios.post(
           process.env.NEXT_PUBLIC_API_URL + "/api/words/translate/create",
        {
            sourceWords: inputText,
            sourceLang: translateLang,
            translatedLang: inputedLang,
          }
        );

        setTranslatedText(response.data.data.translated);
      } catch (error) {
        console.error("Translation error:", error);
        setTranslatedText("Error translating text.");
      } finally {
        setLoading(false);
      }
    };

    if (inputText && !translatedText) {
      translateText();
    }
  }, [inputText, translateLang, inputedLang, translatedText]);

  return (
    <>
      {loading && "Translating...🤔"}
      {!loading && translatedText && translatedText}
    </>
  );
};

/**
 * TranslationDynamicSelectedLanguage Component
 * - Hidden component for future use
 * - Allows dynamic language selection for translation
 */
const TranslationDynamicSelectedLanguage = () => {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [targetLang, setTargetLang] = useState("bn");

  const translateText = useCallback(async () => {
    if (!inputText?.trim()) return;

    const options = {
      method: "POST",
      url: "https://deep-translate1.p.rapidapi.com/language/translate/v2",
      headers: {
        "Content-Type": "application/json",
        "x-rapidapi-key":
          process.env.NEXT_PUBLIC_RAPIDAPI_KEY ||
          "32ac7b8134mshefbf35d78a8c3d7p109611jsn074ba77adde0",
        "x-rapidapi-host": "deep-translate1.p.rapidapi.com",
      },
      data: {
        q: inputText,
        source: "it",
        target: targetLang,
      },
    };

    try {
      const response = await axios.request(options);
      setTranslatedText(response.data.data.translations.translatedText);
    } catch (error) {
      console.error("Translation error:", error);
      setTranslatedText("Error translating text.");
    }
  }, [inputText, targetLang]);

  return (
    <>
      {/* Translator - Hidden component for future use */}
      <div className="p-10 border-2 hidden">
        <h1>Language Translator</h1>
        <textarea
          placeholder="Enter text to translate"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <select
          value={targetLang}
          onChange={(e) => setTargetLang(e.target.value)}
        >
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="zh">Chinese</option>
        </select>
        <button onClick={translateText}>Translate</button>
        <h3>Translated Text:</h3>
        <p>{translatedText}</p>
      </div>
    </>
  );
};

export default TranslationInModal;
