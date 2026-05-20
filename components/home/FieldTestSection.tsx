"use client";

import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

type ScrollAnimatedVideoProps = {
  src: string;
  label: string;
};

function ScrollAnimatedVideo({ src, label }: ScrollAnimatedVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const inView = useInView(videoRef, { once: false, amount: 0.5 });

  useEffect(() => {
    const videoElement = videoRef.current;

    if (!videoElement) {
      return;
    }

    if (inView) {
      void videoElement.play().catch(() => {
        // Tarayıcı otomatik oynatmayı engellerse kullanıcı kontrolleri kullanabilir.
      });
      return;
    }

    videoElement.pause();
  }, [inView]);

  return (
    <div className="w-full">
      <div className="mb-3 font-sans text-sm font-semibold text-slate-dark">{label}</div>
      <video
        ref={videoRef}
        className="w-full rounded-brand border border-[#1414131A] bg-black/5 object-contain"
        controls
        muted
        playsInline
        poster="/images/field-test-poster.svg"
        aria-label={label}
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}

export function FieldTestSection() {
  return (
    <section id="saha-testi" className="section-frame bg-primary">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <SectionHeading
            eyebrow="Saha Doğrulaması"
            title="Saha Testi"
            description="Gerçek ortam koşullarında yapılan denemeler; farklı hız, mesafe ve arka planlarda modelin tutarlılığını ve operatör görünürlüğünü test etmek için kurgulandı. TRT Genel Müdürlüğü'nden özel izin alarak gerçekleştirdiğimiz bu saha testlerinde, profesyonel yayın ve çekim donanımlarıyla çalışma şansı yakaladık. Bu sayede, gerçek endüstriyel şartlarda otonom modelimizin nasıl tepki verdiğini tam anlamıyla deneyimledik."
          />

          <div className="flex w-full flex-col gap-8 sm:gap-10">
            <ScrollAnimatedVideo
              label="TRT Saha Kaydı"
              src="https://ou5njzgsjxvfuoex.public.blob.vercel-storage.com/videos/WhatsApp%20Video%202026-05-18%20at%2002.41.41.mp4"
            />
            <ScrollAnimatedVideo
              label="30 FPS OBS Testi"
              src="https://ou5njzgsjxvfuoex.public.blob.vercel-storage.com/videos/obs_3x_30fps.mp4"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
