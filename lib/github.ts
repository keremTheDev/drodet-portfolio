import "server-only";

type GithubStats = {
  commits: number;
  linesOfCode: number;
  topLanguage: string;
  topLanguagePercentage: number;
};

const FALLBACK_STATS: GithubStats = {
  commits: 184,
  linesOfCode: 12500,
  topLanguage: "TypeScript",
  topLanguagePercentage: 78.4
};

type GithubRepoResponse = {
  default_branch: string;
  language?: string | null;
};

type GithubLanguageResponse = Record<string, number>;
type GithubContributorStatsResponse = Array<{
  total: number;
  weeks: Array<{
    a: number;
  }>;
}>;

async function fetchGithub(path: string) {
  const repo = process.env.GITHUB_REPO;
  const token = process.env.GITHUB_TOKEN;

  if (!repo || !token) {
    throw new Error("GitHub ortam değişkenleri eksik.");
  }

  return fetch(`https://api.github.com/repos/${repo}${path}`, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28"
    },
    next: { revalidate: 3600 }
  });
}

function getTopLanguage(languagesData: GithubLanguageResponse) {
  const totalLanguageBytes = Object.values(languagesData).reduce(
    (sum, value) => sum + value,
    0
  );

  const [topLanguage = FALLBACK_STATS.topLanguage, topLanguageBytes = 0] =
    Object.entries(languagesData).sort(([, left], [, right]) => right - left)[0] ?? [];

  const topLanguagePercentage = totalLanguageBytes
    ? Number(((topLanguageBytes / totalLanguageBytes) * 100).toFixed(1))
    : FALLBACK_STATS.topLanguagePercentage;

  return {
    topLanguage,
    topLanguagePercentage
  };
}

export async function getGithubStats(): Promise<GithubStats> {
  try {
    const [contributorsStatsResponse, languagesResponse] = await Promise.all([
      fetchGithub("/stats/contributors"),
      fetchGithub("/languages")
    ]);

    if (!languagesResponse.ok) {
      throw new Error("Dil istatistikleri alınamadı.");
    }

    const languagesData = (await languagesResponse.json()) as GithubLanguageResponse;
    const languageSummary = getTopLanguage(languagesData);

    if (
      !contributorsStatsResponse.ok ||
      contributorsStatsResponse.status === 202 ||
      contributorsStatsResponse.status === 204
    ) {
      throw new Error("Contributors stats henüz hazır değil.");
    }

    const contributorsStats =
      (await contributorsStatsResponse.json()) as GithubContributorStatsResponse;

    if (!Array.isArray(contributorsStats) || contributorsStats.length === 0) {
      throw new Error("Contributors stats boş döndü.");
    }

    const commits = contributorsStats.reduce(
      (sum, contributor) => sum + contributor.total,
      0
    );
    const linesOfCode = contributorsStats.reduce(
      (sum, contributor) =>
        sum +
        contributor.weeks.reduce((weekSum, week) => weekSum + Math.max(week.a, 0), 0),
      0
    );

    return {
      commits: commits || FALLBACK_STATS.commits,
      linesOfCode: linesOfCode || FALLBACK_STATS.linesOfCode,
      topLanguage: languageSummary.topLanguage,
      topLanguagePercentage: languageSummary.topLanguagePercentage
    };
  } catch {
    try {
      const [repoResponse, languagesResponse] = await Promise.all([
        fetchGithub(""),
        fetchGithub("/languages")
      ]);

      const repoData = repoResponse.ok
        ? ((await repoResponse.json()) as GithubRepoResponse)
        : null;
      const languagesData = languagesResponse.ok
        ? ((await languagesResponse.json()) as GithubLanguageResponse)
        : {};
      const languageSummary =
        Object.keys(languagesData).length > 0
          ? getTopLanguage(languagesData)
          : {
              topLanguage: repoData?.language || FALLBACK_STATS.topLanguage,
              topLanguagePercentage: FALLBACK_STATS.topLanguagePercentage
            };

      return {
        commits: FALLBACK_STATS.commits,
        linesOfCode: FALLBACK_STATS.linesOfCode,
        topLanguage: languageSummary.topLanguage,
        topLanguagePercentage: languageSummary.topLanguagePercentage
      };
    } catch {
      return FALLBACK_STATS;
    }
  }
}
