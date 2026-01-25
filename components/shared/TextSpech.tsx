"use client";

import React, { useCallback, useState } from "react";
import Image from "next/image";
import { mediaProvider } from "@/constants/mediaProvider";

interface TextSpechProps {
  text?: string;
  className?: string;
  iconClassName?: string;
  lang?: string;
}

/**
 * TextSpech
 * - Plays provided text via TTS on click using Web Speech API.
 * - Accepts optional class overrides for responsive sizing.
 * - Uses Next.js Image component for optimized image loading.
 */
const TextSpech = ({
  text = "Ciao, come stai?",
  className = "",
  iconClassName = "",
  lang = "it-IT",
}: TextSpechProps) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);

  // Initialize speech synthesis on client side
  React.useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setSpeechSynthesis(window.speechSynthesis);
    }
  }, []);

  const handleSpeak = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();

      if (!speechSynthesis || !text.trim()) {
        return;
      }

      // Stop any ongoing speech
      if (isSpeaking) {
        speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }

      // Create new speech utterance
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;

      // Try to set Italian voice if available
      const voices = speechSynthesis.getVoices();
      const italianVoice =
        voices.find(
          (voice) =>
            voice.lang.startsWith("it") &&
            (voice.name.includes("Google") || voice.name.includes("italiano"))
        ) || voices.find((voice) => voice.lang.startsWith("it"));

      if (italianVoice) {
        utterance.voice = italianVoice;
      }

      // Handle speech events
      utterance.onstart = () => {
        setIsSpeaking(true);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
      };

      utterance.onerror = (error) => {
        console.error("Speech synthesis error:", error);
        setIsSpeaking(false);
      };

      // Speak the text
      speechSynthesis.speak(utterance);
    },
    [text, lang, speechSynthesis, isSpeaking]
  );

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (speechSynthesis) {
        speechSynthesis.cancel();
      }
    };
  }, [speechSynthesis]);

  // Check if speech synthesis is supported
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return null;
  }

  return (
    <button
      onClick={handleSpeak}
      className={`inline-flex items-center justify-center rounded-full bg-slate-100 p-2 sm:p-2.5 md:p-3 cursor-pointer transition-colors hover:bg-slate-200 active:bg-slate-300 ${
        isSpeaking ? "bg-slate-300" : ""
      } ${className}`}
      aria-label="Riproduci audio"
      type="button"
    >
      <Image
        src={mediaProvider.dashboard.sound}
        alt="speaker icon"
        width={24}
        height={24}
        className={`h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 ${iconClassName}`}
        priority={false}
      />
    </button>
  );
};

export default TextSpech;
