import { Code2, GitCommitHorizontal, Languages } from "lucide-react";

import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Container } from "@/components/ui/Container";
import { getGithubStats } from "@/lib/github";

type StatCard = {
  title: string;
  description: string;
  value: number | null;
  icon: typeof GitCommitHorizontal;
  suffix: string;
  decimals?: number;
  languageName?: string;
  languageColor?: string;
};

export async function GithubStatsSection() {
  const stats = await getGithubStats();

  const languageColors: Record<string, string> = {
    Python: "#3572A5",
    TypeScript: "#3178c6",
    JavaScript: "#f1e05a",
    C: "#555555",
    "C++": "#f34b7d",
    Rust: "#dea584",
    Go: "#00add8"
  };

  const cards: StatCard[] = [
    {
      title: "TOTAL COMMITS",
      description: "GitHub deposunun varsayılan branch'indeki toplam commit sayısı.",
      value: stats.commits,
      icon: GitCommitHorizontal,
      suffix: ""
    },
    {
      title: "TRACKED CODE LINES",
      description: "GitHub repo ağacındaki izlenen kod ve konfigürasyon dosyalarından hesaplanır.",
      value: stats.linesOfCode,
      icon: Code2,
      suffix: ""
    },
    {
      title: "PRIMARY LANGUAGE",
      description: "GitHub linguist verisine göre kod tabanındaki baskın dil.",
      value: stats.topLanguagePercentage,
      icon: Languages,
      suffix: "%",
      decimals: 1,
      languageName: stats.topLanguage ?? undefined,
      languageColor: stats.topLanguage
        ? (languageColors[stats.topLanguage] ?? "#57606a")
        : "#57606a"
    }
  ];

  return (
    <section className="section-frame bg-[#f6f8fa]">
      <Container>
        <div className="max-w-3xl">
          <span className="eyebrow border-[#d0d7de] bg-white text-[#57606a]">
            Canlı GitHub Verisi
          </span>
          <h2 className="headline-section text-wrap-balance">
            Geliştirme Süreci ve Canlı Metrikler
          </h2>
          <p className="body-large mt-6 text-wrap-balance">
            {stats.repo
              ? `${stats.repo} deposundan alınan güncel veriler.`
              : "GitHub repo ve token ayarları yapıldığında canlı veriler burada görünür."}
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <article
                key={card.title}
                className="flex h-full flex-col justify-between rounded-md border border-[#d0d7de] bg-white p-6 text-left"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-[#57606a]" />
                    <p className="font-sans text-xs font-semibold uppercase tracking-[0.08em] text-[#57606a]">
                      {card.title}
                    </p>
                  </div>

                  {card.value === null ? (
                    <span className="mt-4 block font-mono text-2xl font-bold text-[#24292f]">
                      {stats.isConfigured ? "Hesaplanıyor" : "Bağlantı bekleniyor"}
                    </span>
                  ) : (
                    <AnimatedCounter
                      value={card.value}
                      decimals={card.decimals ?? 0}
                      suffix={card.suffix}
                      className="mt-4 block font-mono text-3xl font-bold text-[#24292f]"
                    />
                  )}

                  {card.languageName ? (
                    <div className="mt-4 flex items-center gap-2">
                      <span
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: card.languageColor }}
                      />
                      <span className="font-sans text-sm font-medium text-[#24292f]">
                        {card.languageName}
                      </span>
                    </div>
                  ) : null}
                </div>

                <p className="mt-8 text-sm leading-6 text-[#57606a]">
                  {card.description}
                </p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
