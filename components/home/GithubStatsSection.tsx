import { Code2, GitCommitHorizontal, Users2 } from "lucide-react";

import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Container } from "@/components/ui/Container";
import { getGithubStats } from "@/lib/github";

type StatCard = {
  title: string;
  description: string;
  value: number;
  icon: typeof GitCommitHorizontal;
  suffix: string;
  decimals?: number;
};

export async function GithubStatsSection() {
  const stats = await getGithubStats();

  const cards: StatCard[] = [
    {
      title: "Toplam Commit",
      description: "Depodaki sürekli geliştirme ritmini gösteren tahmini commit hacmi.",
      value: stats.commits,
      icon: GitCommitHorizontal,
      suffix: ""
    },
    {
      title: "Katkı Sağlayan Kişi",
      description: "Kod tabanına doğrudan katkı veren ekip üyesi sayısı.",
      value: stats.contributors,
      icon: Users2,
      suffix: ""
    },
    {
      title: `${stats.primaryLanguage} Payı`,
      description: "Kaynak kod içinde en baskın teknolojinin yaklaşık dağılım oranı.",
      value: stats.primaryLanguageShare,
      icon: Code2,
      suffix: "%",
      decimals: 1
    }
  ];

  return (
    <section className="section-frame bg-primary">
      <Container>
        <div className="max-w-3xl">
          <span className="eyebrow">Canlı GitHub Verisi</span>
          <h2 className="headline-section text-wrap-balance">
            Geliştirme Süreci ve Canlı Metrikler
          </h2>
          <p className="body-large mt-6 text-wrap-balance">
            Projemizin kaynak kod deposundan alınan anlık veriler.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <article
                key={card.title}
                className="card-surface flex h-full flex-col justify-between p-6 sm:p-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-sans text-sm font-semibold uppercase tracking-[0.14em] text-accent-primary">
                      {card.title}
                    </p>
                    <AnimatedCounter
                      value={card.value}
                      decimals={card.decimals ?? 0}
                      suffix={card.suffix}
                      className="mt-4 block font-sans text-4xl font-black tracking-[-0.05em] text-slate-dark"
                    />
                  </div>
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-neutral-border bg-secondary text-accent-primary">
                    <Icon size={22} />
                  </div>
                </div>

                <p className="mt-8 text-base leading-[1.5]">{card.description}</p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
