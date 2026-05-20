"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const fieldTestVideos = [
  {
    label: "30 FPS OBS Testi",
    src: "https://ou5njzgsjxvfuoex.public.blob.vercel-storage.com/videos/obs_3x_30fps.mp4"
  },
  {
    label: "TRT Saha Kaydı",
    src: "https://ou5njzgsjxvfuoex.public.blob.vercel-storage.com/videos/WhatsApp%20Video%202026-05-18%20at%2002.41.41.mp4"
  }
] as const;

export function FieldTestSection() {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const swipeStartX = useRef<number | null>(null);
  const shouldPlayNextVideo = useRef(false);
  const inView = useInView(videoRef, { once: false, amount: 0.5 });
  const activeVideo = fieldTestVideos[activeVideoIndex];

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
  }, [activeVideoIndex, inView]);

  const goToVideo = (direction: -1 | 1, shouldAutoplay = true) => {
    shouldPlayNextVideo.current = shouldAutoplay;
    setActiveVideoIndex((current) =>
      (current + direction + fieldTestVideos.length) % fieldTestVideos.length
    );
  };

  const playActiveVideo = () => {
    const videoElement = videoRef.current;

    if (!videoElement || !inView || !shouldPlayNextVideo.current) {
      return;
    }

    videoElement.currentTime = 0;
    void videoElement.play().catch(() => {
      // Tarayici otomatik oynatmayi engellerse kullanici kontrolleri kullanabilir.
    });
  };

  const onPointerUp = (clientX: number) => {
    if (swipeStartX.current === null) {
      return;
    }

    const deltaX = clientX - swipeStartX.current;
    swipeStartX.current = null;

    if (Math.abs(deltaX) < 48) {
      return;
    }

    goToVideo(deltaX > 0 ? -1 : 1);
  };

  return (
    <section id="saha-testi" className="section-frame bg-primary">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <SectionHeading
            eyebrow="Saha Doğrulaması"
            title="Saha Testi"
            description="Gerçek ortam koşullarında yapılan denemeler; farklı hız, mesafe ve arka planlarda modelin tutarlılığını ve operatör görünürlüğünü test etmek için kurgulandı. TRT Genel Müdürlüğü'nden özel izin alarak gerçekleştirdiğimiz bu saha testlerinde, profesyonel yayın ve çekim donanımlarıyla çalışma şansı yakaladık. Bu sayede, gerçek endüstriyel şartlarda otonom modelimizin nasıl tepki verdiğini tam anlamıyla deneyimledik."
          />

          <div className="overflow-hidden rounded-brand border border-[#1414131A] bg-white">
            <div
              className="relative flex touch-pan-y justify-center bg-[#1a1a18] p-3 sm:p-4"
              onPointerDown={(event) => {
                swipeStartX.current = event.clientX;
              }}
              onPointerCancel={() => {
                swipeStartX.current = null;
              }}
              onPointerUp={(event) => onPointerUp(event.clientX)}
            >
              <button
                type="button"
                onClick={() => goToVideo(-1)}
                className="button-target absolute left-4 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur-md transition-colors hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Önceki saha testi videosu"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <video
                key={activeVideo.src}
                ref={videoRef}
                className="block max-h-[78vh] w-auto max-w-full rounded-brand object-contain"
                controls
                muted
                playsInline
                poster="/images/field-test-poster.svg"
                aria-label="Drone tespit saha testi videosu"
                onLoadedData={playActiveVideo}
                onEnded={() => goToVideo(1, true)}
              >
                <source src={activeVideo.src} type="video/mp4" />
              </video>

              <button
                type="button"
                onClick={() => goToVideo(1)}
                className="button-target absolute right-4 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur-md transition-colors hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Sonraki saha testi videosu"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              <div className="pointer-events-none absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/15 bg-black/45 px-3 py-1.5 font-sans text-xs font-semibold text-white/85 backdrop-blur-md">
                {fieldTestVideos.map((video, index) => (
                  <span
                    key={video.src}
                    className={`h-1.5 rounded-full transition-all ${
                      index === activeVideoIndex ? "w-7 bg-white" : "w-1.5 bg-white/35"
                    }`}
                  />
                ))}
                <span className="ml-1 hidden sm:inline">{activeVideo.label}</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
