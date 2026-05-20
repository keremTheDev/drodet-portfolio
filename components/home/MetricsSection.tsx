import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { MetricsCarousel } from "@/components/home/MetricsCarousel";
import { metricCards } from "@/lib/data";

export function MetricsSection() {
  return (
    <section id="metrikler" className="section-frame bg-secondary">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Analitik"
              title="Model Başarımı ve Sistem Kanıtı"
              description="Model eğitim sonuçları, saha videosu performansı ve TrackBoost görünürlük kararlılığı birlikte yorumlandı."
            />
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {metricCards.map((item) => (
                <div
                  key={item.label}
                  className={`card-surface flex min-h-[132px] flex-col justify-between p-5 ${
                    item.label === "TrackBoost Stabilite" ? "sm:col-span-2 lg:col-span-1 xl:col-span-2" : ""
                  }`}
                >
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent-primary">
                    {item.label}
                  </p>

                  <div>
                    {typeof item.value === "number" ? (
                      <AnimatedCounter
                        value={item.value}
                        decimals={item.decimals ?? 0}
                        prefix={"prefix" in item ? item.prefix : ""}
                        suffix={"suffix" in item ? item.suffix : ""}
                        className="mt-3 block whitespace-nowrap font-sans text-3xl font-black text-slate-dark"
                      />
                    ) : (
                      <p className="mt-3 break-words font-sans text-[1.45rem] font-black leading-tight text-slate-dark sm:text-[1.7rem]">
                        {item.value}
                      </p>
                    )}

                    {"suffix" in item && typeof item.value !== "number" && item.suffix ? (
                      <p className="mt-1 font-sans text-sm font-semibold text-slate-light">
                        {item.suffix}
                      </p>
                    ) : null}

                    {"note" in item && item.note ? (
                      <p className="mt-2 font-sans text-sm font-semibold text-slate-light">
                        {item.note}
                      </p>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <MetricsCarousel />
        </div>
      </Container>
    </section>
  );
}
