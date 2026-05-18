"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export function ScrollRadar() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.2
  });
  const pulsePosition = useTransform(
    progress,
    (value) => `calc(${(value * 100).toFixed(3)}% - 20px)`
  );

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="relative h-px w-full bg-[#14141314]">
        <motion.div
          className="absolute inset-y-0 left-0 origin-left transform-gpu bg-[linear-gradient(90deg,rgba(116,196,118,0.3)_0%,rgba(116,196,118,0.88)_36%,rgba(217,119,87,0.92)_100%)] shadow-[0_0_14px_rgba(116,196,118,0.28)] will-change-transform"
          style={{ scaleX: progress }}
        />
        <motion.div
          className="absolute top-1/2 h-2.5 w-10 -translate-y-1/2 rounded-full bg-[linear-gradient(90deg,rgba(116,196,118,0),rgba(116,196,118,0.9),rgba(217,119,87,0.95),rgba(217,119,87,0))] blur-[2px]"
          style={{ left: pulsePosition }}
        />
      </div>
    </div>
  );
}
