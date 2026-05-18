import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { MetricsChart } from "@/components/home/MetricsChart";
import { metricsData } from "@/lib/data";

export function MetricsSection() {
  return (
    <section className="section-frame bg-secondary">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <SectionHeading
              eyebrow="Analitik"
              title="Model Başarımı ve Metrikler"
              description="Ölçümler, küçük nesne tespitindeki zorluklar ve saha koşullarındaki görsel belirsizlikler dikkate alınarak yorumlandı. Grafik, anlatımı yalnızca sonuca değil karar güvenine de bağlıyor."
            />
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {metricsData.map((item) => (
                <div key={item.metrik} className="card-surface p-5">
                  <p className="font-mono text-sm uppercase tracking-[0.14em] text-accent-primary">
                    {item.metrik}
                  </p>
                  <AnimatedCounter
                    value={item.oran}
                    decimals={1}
                    prefix="%"
                    className="mt-3 block font-sans text-3xl font-black text-slate-dark"
                  />
                </div>
              ))}
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="card-surface p-5">
                <p className="font-mono text-sm uppercase tracking-[0.14em] text-accent-primary">
                  Ortalama Gecikme
                </p>
                <p className="mt-3 font-sans text-3xl font-black text-slate-dark">41 ms</p>
              </div>
              <div className="card-surface p-5">
                <p className="font-mono text-sm uppercase tracking-[0.14em] text-accent-primary">
                  Çalışma Modu
                </p>
                <p className="mt-3 font-sans text-3xl font-black text-slate-dark">
                  Gerçek Zamanlı
                </p>
              </div>
            </div>
          </div>

          <div className="card-surface p-5 sm:p-8">
            <MetricsChart />
          </div>
        </div>
      </Container>
    </section>
  );
}
