"use client";

import { motion, useReducedMotion } from "framer-motion";

type SplitRevealTextProps = {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
};

export function SplitRevealText({
  text,
  className = "",
  wordClassName = "",
  delay = 0
}: SplitRevealTextProps) {
  const reduceMotion = useReducedMotion();
  const words = text.split(" ");

  if (reduceMotion) {
    return <span className={className}>{text}</span>;
  }

  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      transition={{ staggerChildren: 0.045, delayChildren: delay }}
      className={className}
    >
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          variants={{
            hidden: {
              opacity: 0,
              y: 26,
              skewY: 5
            },
            visible: {
              opacity: 1,
              y: 0,
              skewY: 0
            }
          }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 16,
            mass: 0.8
          }}
          className={`inline-block transform-gpu pr-[0.28em] will-change-transform ${wordClassName}`.trim()}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}
