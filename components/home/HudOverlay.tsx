"use client";

import { motion, useReducedMotion } from "framer-motion";

export function HudOverlay() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0">
      <svg
        viewBox="0 0 1600 900"
        className="absolute inset-0 h-full w-full opacity-80"
        aria-hidden="true"
      >
        <g stroke="rgba(250,249,245,0.42)" strokeWidth="2" fill="none">
          <path d="M540 250H635V270" />
          <path d="M1060 250H965V270" />
          <path d="M540 650H635V630" />
          <path d="M1060 650H965V630" />
          <rect x="540" y="250" width="520" height="400" rx="20" stroke="rgba(250,249,245,0.14)" />
        </g>
        <g stroke="rgba(116,196,118,0.45)" strokeWidth="1.5" fill="none">
          <circle cx="800" cy="450" r="94" />
          <path d="M800 328V388" />
          <path d="M800 512V572" />
          <path d="M678 450H738" />
          <path d="M862 450H922" />
        </g>
        <g fill="rgba(250,249,245,0.56)" fontFamily="Inter, sans-serif" fontSize="19">
          <text x="560" y="236">HEDEF İZLEME</text>
          <text x="1074" y="236" textAnchor="end">AKTİF</text>
        </g>
      </svg>

      <motion.div
        className="absolute left-[33.75%] top-[27.7%] h-[44.4%] w-[32.5%] overflow-hidden rounded-[1.25rem] border border-[#74c47633] bg-[linear-gradient(180deg,rgba(116,196,118,0.05),rgba(217,119,87,0.02))] mix-blend-screen"
        animate={
          reduceMotion
            ? undefined
            : {
                boxShadow: [
                  "0 0 0 rgba(116,196,118,0.0)",
                  "0 0 22px rgba(116,196,118,0.14)",
                  "0 0 0 rgba(116,196,118,0.0)"
                ]
              }
        }
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          className="absolute left-0 right-0 h-px bg-[linear-gradient(90deg,rgba(116,196,118,0),rgba(116,196,118,0.88),rgba(217,119,87,0.85),rgba(116,196,118,0))] shadow-[0_0_12px_rgba(116,196,118,0.38)]"
          animate={reduceMotion ? undefined : { y: ["0%", "980%"] }}
          transition={{ duration: 5.4, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
    </div>
  );
}
