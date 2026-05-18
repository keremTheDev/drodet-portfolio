"use client";

import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";

import { Card } from "@/components/ui/Card";
import { SecondaryButton } from "@/components/ui/SecondaryButton";

type ProfileCardProps = {
  name: string;
  role: string;
  bio: string;
  initials: string;
  linkedin: string;
  github: string;
  cvHref: string;
};

export function ProfileCard({
  name,
  role,
  bio,
  initials,
  linkedin,
  github,
  cvHref
}: ProfileCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 170, damping: 18 }}
      className="group transform-gpu"
    >
      <Card className="relative h-full overflow-hidden p-8 sm:p-10">
        <div
          aria-hidden="true"
          className="hud-grid absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-px bg-[linear-gradient(180deg,rgba(116,196,118,0),rgba(116,196,118,0.75),rgba(217,119,87,0.82),rgba(116,196,118,0))] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />

        <div className="relative z-10 flex items-start justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[linear-gradient(135deg,rgba(217,119,87,0.18),rgba(198,97,63,0.32))] font-sans text-lg font-black text-slate-dark">
              {initials}
            </div>
            <div>
              <h2 className="text-2xl font-black">{name}</h2>
              <p className="mt-2 font-sans text-sm font-medium text-slate-light">
                {role}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label={`${name} LinkedIn profili`}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-border text-slate-dark transition-colors hover:bg-secondary"
            >
              <Linkedin size={18} />
            </a>
            <a
              href={github}
              target="_blank"
              rel="noreferrer"
              aria-label={`${name} GitHub profili`}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-border text-slate-dark transition-colors hover:bg-secondary"
            >
              <Github size={18} />
            </a>
          </div>
        </div>

        <p className="relative z-10 mt-8">{bio}</p>

        <div className="relative z-10 mt-10">
          <SecondaryButton href={cvHref}>Özgeçmişi İndir</SecondaryButton>
        </div>
      </Card>
    </motion.div>
  );
}
