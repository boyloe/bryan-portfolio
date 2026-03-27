"use client";

import { useEffect, useState } from "react";

interface TypingAnimationProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export default function TypingAnimation({
  phrases,
  typingSpeed = 60,
  deletingSpeed = 35,
  pauseDuration = 2000,
}: TypingAnimationProps) {
  const [displayed, setDisplayed] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIndex];

    if (isPaused) {
      const t = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(t);
    }

    if (isDeleting) {
      if (displayed.length === 0) {
        setIsDeleting(false);
        setPhraseIndex((i) => (i + 1) % phrases.length);
        return;
      }
      const t = setTimeout(() => {
        setDisplayed((d) => d.slice(0, -1));
      }, deletingSpeed);
      return () => clearTimeout(t);
    }

    if (displayed.length === current.length) {
      setIsPaused(true);
      return;
    }

    const t = setTimeout(() => {
      setDisplayed(current.slice(0, displayed.length + 1));
    }, typingSpeed);
    return () => clearTimeout(t);
  }, [displayed, isDeleting, isPaused, phraseIndex, phrases, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span>
      <span>{displayed}</span>
      <span
        className="cursor-blink ml-0.5 inline-block w-0.5 h-5 align-middle"
        style={{ background: "var(--accent-primary)" }}
      />
    </span>
  );
}
