"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { MetricsChart } from "@/components/home/MetricsChart";

const metricSlides = [
  {
    type: "chart",
    title: "Özet Performans Grafiği",
    description: "Precision, Recall, mAP50 ve TrackBoost stabilite değerleri."
  },
  {
    type: "image",
    title: "Precision - Recall Eğrisi",
    description: "Sınıf bazlı PR davranışı ve genel mAP@0.5 görünümü.",
    src: "https://ou5njzgsjxvfuoex.public.blob.vercel-storage.com/pictures/BoxPR_curve.png",
    alt: "Precision recall eğrisi"
  },
  {
    type: "image",
    title: "F1 Confidence Eğrisi",
    description: "Confidence eşiğine göre F1 skor değişimi.",
    src: "https://ou5njzgsjxvfuoex.public.blob.vercel-storage.com/pictures/BoxF1_curve.png",
    alt: "F1 confidence eğrisi"
  },
  {
    type: "image",
    title: "Precision Confidence Eğrisi",
    description: "Confidence eşiğine göre precision davranışı.",
    src: "https://ou5njzgsjxvfuoex.public.blob.vercel-storage.com/pictures/BoxP_curve.png",
    alt: "Precision confidence eğrisi"
  },
  {
    type: "image",
    title: "Normalize Confusion Matrix",
    description: "Sınıflar arası normalize hata dağılımı.",
    src: "https://ou5njzgsjxvfuoex.public.blob.vercel-storage.com/pictures/confusion_matrix_normalized.png",
    alt: "Normalize edilmiş confusion matrix"
  },
  {
    type: "image",
    title: "Confusion Matrix",
    description: "Ham sınıf karışıklık matrisi.",
    src: "https://ou5njzgsjxvfuoex.public.blob.vercel-storage.com/pictures/confusion_matrix.png",
    alt: "Confusion matrix"
  }
] as const;

export function MetricsCarousel() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [manualResetKey, setManualResetKey] = useState(0);
  const swipeStartX = useRef<number | null>(null);
  const activeSlide = metricSlides[activeSlideIndex];

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActiveSlideIndex((current) => (current + 1) % metricSlides.length);
    }, 5000);

    return () => window.clearTimeout(timer);
  }, [activeSlideIndex, manualResetKey]);

  const goToSlide = (direction: -1 | 1, manual = true) => {
    setActiveSlideIndex(
      (current) => (current + direction + metricSlides.length) % metricSlides.length
    );

    if (manual) {
      setManualResetKey((current) => current + 1);
    }
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

    goToSlide(deltaX > 0 ? -1 : 1);
  };

  return (
    <div
      className="card-surface relative overflow-hidden p-4 sm:p-6"
      onPointerDown={(event) => {
        swipeStartX.current = event.clientX;
      }}
      onPointerCancel={() => {
        swipeStartX.current = null;
      }}
      onPointerUp={(event) => onPointerUp(event.clientX)}
    >
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-accent-primary">
            {String(activeSlideIndex + 1).padStart(2, "0")} / {metricSlides.length}
          </p>
          <h3 className="mt-1 font-sans text-xl font-black leading-tight text-slate-dark">
            {activeSlide.title}
          </h3>
          <p className="mt-1 font-sans text-sm font-semibold leading-5 text-slate-light">
            {activeSlide.description}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => goToSlide(-1)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-border bg-white text-slate-dark transition-colors hover:bg-[#141413] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#141413]"
            aria-label="Önceki metrik görseli"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => goToSlide(1)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-border bg-white text-slate-dark transition-colors hover:bg-[#141413] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#141413]"
            aria-label="Sonraki metrik görseli"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="flex min-h-[320px] items-center justify-center rounded-brand border border-[#14141312] bg-white p-2 sm:min-h-[430px] sm:p-4">
        {activeSlide.type === "chart" ? (
          <div className="w-full">
            <MetricsChart />
          </div>
        ) : (
          <Image
            key={activeSlide.src}
            src={activeSlide.src}
            alt={activeSlide.alt}
            width={1400}
            height={1000}
            className="max-h-[70vh] w-full rounded-[0.35rem] object-contain"
            priority={activeSlideIndex === 1}
          />
        )}
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {metricSlides.map((slide, index) => (
          <button
            key={slide.title}
            type="button"
            onClick={() => {
              setActiveSlideIndex(index);
              setManualResetKey((current) => current + 1);
            }}
            className={`h-1.5 rounded-full transition-all ${
              index === activeSlideIndex ? "w-8 bg-accent-primary" : "w-2 bg-[#14141333]"
            }`}
            aria-label={`${slide.title} slaydına git`}
          />
        ))}
      </div>
    </div>
  );
}
