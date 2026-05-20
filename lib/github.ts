import "server-only";

import { Buffer } from "node:buffer";

export type GithubStats = {
  commits: number | null;
  linesOfCode: number | null;
  topLanguage: string | null;
  topLanguagePercentage: number | null;
  repo: string | null;
  isConfigured: boolean;
};

const EMPTY_STATS: GithubStats = {
  commits: null,
  linesOfCode: null,
  topLanguage: null,
  topLanguagePercentage: null,
  repo: null,
  isConfigured: false
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

type GithubCodeFrequencyResponse = Array<[number, number, number]>;

type GithubTreeResponse = {
  tree: Array<{
    path?: string;
    mode?: string;
    type?: string;
    sha?: string;
    size?: number;
  }>;
  truncated?: boolean;
};

type GithubBlobResponse = {
  content?: string;
  encoding?: string;
};

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function getGithubConfig() {
  const repo = process.env.GITHUB_REPO;
  const token = process.env.GITHUB_TOKEN || process.env.GITHUB_PAT;

  return {
    repo: repo?.trim() || null,
    token: token?.trim() || null
  };
}

async function fetchGithub(path: string) {
  const { repo, token } = getGithubConfig();

  if (!repo) {
    throw new Error("GITHUB_REPO is missing.");
  }

  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28"
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return fetch(`https://api.github.com/repos/${repo}${path}`, {
    headers,
    next: { revalidate: 3600 }
  });
}

function getTopLanguage(languagesData: GithubLanguageResponse) {
  const totalLanguageBytes = Object.values(languagesData).reduce(
    (sum, value) => sum + value,
    0
  );

  const [topLanguage = null, topLanguageBytes = 0] =
    Object.entries(languagesData).sort(([, left], [, right]) => right - left)[0] ?? [];

  return {
    topLanguage,
    topLanguagePercentage: totalLanguageBytes
      ? Number(((topLanguageBytes / totalLanguageBytes) * 100).toFixed(1))
      : null
  };
}

function getLastPageFromLinkHeader(linkHeader: string | null) {
  if (!linkHeader) {
    return null;
  }

  const lastLink = linkHeader
    .split(",")
    .find((part) => part.includes('rel="last"'));
  const pageMatch = lastLink?.match(/[?&]page=(\d+)/);

  return pageMatch ? Number(pageMatch[1]) : null;
}

async function getRepoData() {
  const response = await fetchGithub("");

  if (!response.ok) {
    throw new Error("GitHub repository could not be read.");
  }

  return (await response.json()) as GithubRepoResponse;
}

async function getCommitCount(defaultBranch: string) {
  const response = await fetchGithub(
    `/commits?sha=${encodeURIComponent(defaultBranch)}&per_page=1`
  );

  if (!response.ok) {
    return null;
  }

  const lastPage = getLastPageFromLinkHeader(response.headers.get("link"));

  if (lastPage) {
    return lastPage;
  }

  const commits = (await response.json()) as unknown[];
  return commits.length;
}

async function getLanguageSummary(repoLanguage?: string | null) {
  const response = await fetchGithub("/languages");

  if (!response.ok) {
    return {
      topLanguage: repoLanguage || null,
      topLanguagePercentage: null
    };
  }

  const languagesData = (await response.json()) as GithubLanguageResponse;

  return Object.keys(languagesData).length > 0
    ? getTopLanguage(languagesData)
    : {
        topLanguage: repoLanguage || null,
        topLanguagePercentage: null
      };
}

async function getAdditionsFromContributorStats() {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const response = await fetchGithub("/stats/contributors");

    if (response.status === 202) {
      await wait(900);
      continue;
    }

    if (!response.ok || response.status === 204) {
      return null;
    }

    const contributorsStats =
      (await response.json()) as GithubContributorStatsResponse;

    if (!Array.isArray(contributorsStats) || contributorsStats.length === 0) {
      return null;
    }

    return contributorsStats.reduce(
      (sum, contributor) =>
        sum +
        contributor.weeks.reduce((weekSum, week) => weekSum + Math.max(week.a, 0), 0),
      0
    );
  }

  return null;
}

async function getAdditionsFromCodeFrequency() {
  const response = await fetchGithub("/stats/code_frequency");

  if (!response.ok || response.status === 202 || response.status === 204) {
    return null;
  }

  const codeFrequency = (await response.json()) as GithubCodeFrequencyResponse;

  if (!Array.isArray(codeFrequency)) {
    return null;
  }

  return codeFrequency.reduce((sum, [, additions]) => sum + Math.max(additions, 0), 0);
}

const CODE_FILE_EXTENSIONS = new Set([
  ".bat",
  ".cfg",
  ".ini",
  ".json",
  ".ps1",
  ".py",
  ".sh",
  ".toml",
  ".txt",
  ".yaml",
  ".yml"
]);

const IGNORED_PATH_PARTS = new Set([
  ".git",
  "__pycache__",
  "dataset",
  "datasets",
  "dist",
  "model",
  "models",
  "node_modules",
  "runs",
  "weights"
]);

function isCountableCodeFile(path: string, size = 0) {
  const normalizedPath = path.replaceAll("\\", "/");
  const pathParts = normalizedPath.split("/");

  if (pathParts.some((part) => IGNORED_PATH_PARTS.has(part))) {
    return false;
  }

  if (size > 400_000) {
    return false;
  }

  const extensionMatch = normalizedPath.match(/\.[^.]+$/);
  const extension = extensionMatch?.[0].toLowerCase();

  return extension ? CODE_FILE_EXTENSIONS.has(extension) : false;
}

function countTextLines(content: string) {
  if (!content) {
    return 0;
  }

  return content.endsWith("\n")
    ? content.split(/\r\n|\r|\n/).length - 1
    : content.split(/\r\n|\r|\n/).length;
}

async function getCodeLinesFromTree(defaultBranch: string) {
  const treeResponse = await fetchGithub(
    `/git/trees/${encodeURIComponent(defaultBranch)}?recursive=1`
  );

  if (!treeResponse.ok) {
    return null;
  }

  const treeData = (await treeResponse.json()) as GithubTreeResponse;
  const codeFiles = treeData.tree.filter(
    (entry) =>
      entry.type === "blob" &&
      entry.sha &&
      entry.path &&
      isCountableCodeFile(entry.path, entry.size ?? 0)
  );

  if (codeFiles.length === 0) {
    return null;
  }

  let totalLines = 0;

  for (const file of codeFiles) {
    const blobResponse = await fetchGithub(`/git/blobs/${file.sha}`);

    if (!blobResponse.ok) {
      continue;
    }

    const blobData = (await blobResponse.json()) as GithubBlobResponse;

    if (blobData.encoding !== "base64" || !blobData.content) {
      continue;
    }

    const content = Buffer.from(blobData.content.replace(/\s/g, ""), "base64").toString(
      "utf8"
    );
    totalLines += countTextLines(content);
  }

  return totalLines || null;
}

async function getLinesOfCode(defaultBranch: string) {
  return (
    (await getAdditionsFromContributorStats()) ??
    (await getAdditionsFromCodeFrequency()) ??
    (await getCodeLinesFromTree(defaultBranch))
  );
}

export async function getGithubStats(): Promise<GithubStats> {
  const { repo } = getGithubConfig();

  if (!repo) {
    return EMPTY_STATS;
  }

  try {
    const repoData = await getRepoData();
    const [commits, linesOfCode, languageSummary] = await Promise.all([
      getCommitCount(repoData.default_branch),
      getLinesOfCode(repoData.default_branch),
      getLanguageSummary(repoData.language)
    ]);

    return {
      commits,
      linesOfCode,
      topLanguage: languageSummary.topLanguage,
      topLanguagePercentage: languageSummary.topLanguagePercentage,
      repo,
      isConfigured: true
    };
  } catch {
    return {
      ...EMPTY_STATS,
      repo,
      isConfigured: true
    };
  }
}
