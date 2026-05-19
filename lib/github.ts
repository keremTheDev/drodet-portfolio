import "server-only";

type GithubStats = {
  commits: number;
  contributors: number;
  primaryLanguage: string;
  primaryLanguageShare: number;
};

const FALLBACK_STATS: GithubStats = {
  commits: 184,
  contributors: 2,
  primaryLanguage: "TypeScript",
  primaryLanguageShare: 78.4
};

type GithubRepoResponse = {
  default_branch: string;
};

type GithubLanguageResponse = Record<string, number>;

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

function getCommitCountFromLinkHeader(linkHeader: string | null) {
  if (!linkHeader) {
    return null;
  }

  const match = linkHeader.match(/[?&]page=(\d+)>;\s*rel="last"/);
  return match ? Number(match[1]) : null;
}

export async function getGithubStats(): Promise<GithubStats> {
  try {
    const repoResponse = await fetchGithub("");

    if (!repoResponse.ok) {
      throw new Error(`Repo bilgisi alınamadı: ${repoResponse.status}`);
    }

    const repoData = (await repoResponse.json()) as GithubRepoResponse;

    const [contributorsResponse, languagesResponse, commitsResponse] = await Promise.all([
      fetchGithub("/contributors?per_page=100&anon=1"),
      fetchGithub("/languages"),
      fetchGithub(`/commits?sha=${encodeURIComponent(repoData.default_branch)}&per_page=1`)
    ]);

    if (!contributorsResponse.ok || !languagesResponse.ok || !commitsResponse.ok) {
      throw new Error("GitHub metrikleri eksik döndü.");
    }

    const contributorsData = (await contributorsResponse.json()) as unknown[];
    const languagesData = (await languagesResponse.json()) as GithubLanguageResponse;

    const commitCountFromHeader = getCommitCountFromLinkHeader(
      commitsResponse.headers.get("link")
    );

    let commits = commitCountFromHeader ?? 0;

    if (!commitCountFromHeader) {
      const commitsData = (await commitsResponse.json()) as unknown[];
      commits = Array.isArray(commitsData) ? commitsData.length : 0;
    }

    const totalLanguageBytes = Object.values(languagesData).reduce(
      (sum, value) => sum + value,
      0
    );

    const [primaryLanguage = FALLBACK_STATS.primaryLanguage, primaryLanguageBytes = 0] =
      Object.entries(languagesData).sort(([, left], [, right]) => right - left)[0] ?? [];

    const primaryLanguageShare = totalLanguageBytes
      ? Number(((primaryLanguageBytes / totalLanguageBytes) * 100).toFixed(1))
      : FALLBACK_STATS.primaryLanguageShare;

    return {
      commits: commits || FALLBACK_STATS.commits,
      contributors: contributorsData.length || FALLBACK_STATS.contributors,
      primaryLanguage,
      primaryLanguageShare
    };
  } catch {
    return FALLBACK_STATS;
  }
}
