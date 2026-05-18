"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type ArchitectureCardProps = {
  index: number;
  title: string;
  description: string;
};

export function ArchitectureCard({
  index,
  title,
  description
}: ArchitectureCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 170, damping: 18 }}
      className="group relative overflow-hidden rounded-brand border border-neutral-border bg-white p-8 transform-gpu sm:p-10"
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 rounded-brand p-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
        transition={isHovered ? { duration: 3.4, ease: "linear", repeat: Infinity } : { duration: 0.25 }}
        style={{
          background:
            "conic-gradient(from 0deg, rgba(20,20,19,0.04), rgba(20,20,19,0.04), rgba(116,196,118,0.9), rgba(217,119,87,0.92), rgba(20,20,19,0.04))"
        }}
      >
        <div className="h-full w-full rounded-[calc(0.5rem-1px)] bg-white/96" />
      </motion.div>

      <div
        aria-hidden="true"
        className="hud-grid absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <motion.div
        aria-hidden="true"
        animate={isHovered ? { opacity: 1, x: ["-20%", "120%"] } : { opacity: 0, x: "-20%" }}
        transition={isHovered ? { duration: 1.9, repeat: Infinity, ease: "linear" } : { duration: 0.2 }}
        className="absolute inset-y-0 left-0 w-28 bg-[linear-gradient(90deg,rgba(116,196,118,0),rgba(116,196,118,0.08),rgba(217,119,87,0.12),rgba(116,196,118,0))] blur-xl"
      />

      <div className="relative z-10">
        <span className="font-mono text-sm text-accent-primary">0{index + 1}</span>
        <h3 className="mt-8 text-2xl font-black sm:text-[2rem]">{title}</h3>
        <p className="mt-4">{description}</p>
      </div>
    </motion.article>
  );
}
