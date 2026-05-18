"use client";

import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FieldTestSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const inView = useInView(videoRef, { once: false, amount: 0.5 });

  useEffect(() => {
    const videoElement = videoRef.current;

    if (!videoElement) {
      return;
    }

    if (inView) {
      void videoElement.play().catch(() => {
        // Tarayici otomatik oynatmayi engellerse kullanici kontrolleri kullanabilir.
      });
      return;
    }

    videoElement.pause();
  }, [inView]);

  return (
    <section className="section-frame bg-primary">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <SectionHeading
            eyebrow="Saha Doğrulaması"
            title="Saha Testi"
            description="Gerçek ortam koşullarında yapılan denemeler; farklı hız, mesafe ve arka planlarda modelin tutarlılığını ve operatör görünürlüğünü test etmek için kurgulandı. TRT Genel Müdürlüğü'nden özel izin alarak gerçekleştirdiğimiz bu saha testlerinde, profesyonel yayın ve çekim donanımlarıyla çalışma şansı yakaladık. Bu sayede, gerçek endüstriyel şartlarda otonom modelimizin nasıl tepki verdiğini tam anlamıyla deneyimledik."
          />

          <div className="overflow-hidden rounded-brand border border-[#1414131A] bg-white">
            <div className="flex justify-center bg-[#1a1a18] p-3 sm:p-4">
              <video
                ref={videoRef}
                className="block max-h-[78vh] w-auto max-w-full rounded-brand object-contain"
                controls
                muted
                playsInline
                poster="/images/field-test-poster.svg"
                aria-label="Drone tespit saha testi videosu"
              >
                <source
                  src="https://ou5njzgsjxvfuoex.public.blob.vercel-storage.com/videos/WhatsApp%20Video%202026-05-18%20at%2002.41.41.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
