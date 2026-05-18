"use client";

import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";

import { Card } from "@/components/ui/Card";
import { SecondaryButton } from "@/components/ui/SecondaryButton";

type ProfileCardProps = {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  linkedinUrl: string;
  githubUrl: string;
  cvLinks: ReadonlyArray<{
    label: string;
    url: string;
  }>;
};

export function ProfileCard({
  name,
  role,
  bio,
  imageUrl,
  linkedinUrl,
  githubUrl,
  cvLinks
}: ProfileCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 170, damping: 18 }}
      className="group transform-gpu"
    >
      <Card className="relative h-full overflow-hidden p-0">
        <div
          aria-hidden="true"
          className="hud-grid absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-px bg-[linear-gradient(180deg,rgba(116,196,118,0),rgba(116,196,118,0.75),rgba(217,119,87,0.82),rgba(116,196,118,0))] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />

        <div className="relative z-10">
          <img
            src={imageUrl}
            alt={`${name} profil fotoğrafı`}
            className="mb-6 w-full aspect-[4/5] rounded-t-brand object-cover"
            loading="lazy"
          />

          <div className="px-8 pb-8 sm:px-10 sm:pb-10">
            <div className="flex items-start justify-between gap-6">
              <div>
                <h2 className="text-2xl font-black">{name}</h2>
                <p className="mt-2 font-sans text-sm font-medium text-slate-light">
                  {role}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${name} LinkedIn profili`}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-border text-slate-dark transition-colors hover:bg-secondary"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${name} GitHub profili`}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-border text-slate-dark transition-colors hover:bg-secondary"
                >
                  <Github size={18} />
                </a>
              </div>
            </div>

            <p className="mt-8">{bio}</p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {cvLinks.map((cvLink) => (
                <SecondaryButton key={cvLink.url} href={cvLink.url}>
                  {cvLink.label}
                </SecondaryButton>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
