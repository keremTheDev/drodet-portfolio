import fs from "node:fs";
import path from "node:path";

import Image from "next/image";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const MODEL_STATS_DIR = path.join(process.cwd(), "public", "images", "model-stats");
const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp"]);

function getModelStatImages() {
  if (!fs.existsSync(MODEL_STATS_DIR)) {
    return [];
  }

  return fs
    .readdirSync(MODEL_STATS_DIR)
    .filter((fileName) => IMAGE_EXTENSIONS.has(path.extname(fileName).toLowerCase()))
    .sort((left, right) => left.localeCompare(right, "tr"))
    .map((fileName) => ({
      src: `/images/model-stats/${fileName}`,
      alt: fileName
        .replace(path.extname(fileName), "")
        .replace(/[-_]+/g, " ")
        .trim()
    }));
}

export function ModelStatsSection() {
  const images = getModelStatImages();

  if (images.length === 0) {
    return null;
  }

  return (
    <section className="section-frame bg-primary">
      <Container>
        <SectionHeading
          eyebrow="04. Model İstatistikleri"
          title="Eğitim Çıktıları"
          description="Model eğitim sürecini ve sınıf bazlı davranışı destekleyen görsel çıktılar."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {images.map((image) => (
            <figure
              key={image.src}
              className="overflow-hidden rounded-brand border border-neutral-border bg-white"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={1200}
                height={800}
                className="h-full w-full object-contain"
              />
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
