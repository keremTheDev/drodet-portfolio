"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const GLYPHS = "ABCDEFGHIJKLMNOPRSTUVYZ0123456789+-*/#%?<>ĞÜŞİÖÇ";

type DecryptTextProps = {
  text: string;
  className?: string;
};

export function DecryptText({ text, className = "" }: DecryptTextProps) {
  const reduceMotion = useReducedMotion();
  const [displayText, setDisplayText] = useState(reduceMotion ? text : "");

  const characters = useMemo(() => text.split(""), [text]);

  useEffect(() => {
    if (reduceMotion) {
      setDisplayText(text);
      return;
    }

    let frameId = 0;
    let iteration = 0;
    let lastTime = 0;

    const updateText = (timestamp: number) => {
      if (timestamp - lastTime > 42) {
        const next = characters
          .map((character, index) => {
            if (character === " ") {
              return " ";
            }

            if (index < iteration) {
              return character;
            }

            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("");

        setDisplayText(next);
        iteration += 0.45;
        lastTime = timestamp;
      }

      if (iteration <= characters.length) {
        frameId = window.requestAnimationFrame(updateText);
      } else {
        setDisplayText(text);
      }
    };

    frameId = window.requestAnimationFrame(updateText);

    return () => window.cancelAnimationFrame(frameId);
  }, [characters, reduceMotion, text]);

  return (
    <motion.span
      initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {displayText}
    </motion.span>
  );
}
