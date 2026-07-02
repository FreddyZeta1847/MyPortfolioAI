import { useEffect, useState } from 'react';
import { Github, Star, ExternalLink } from 'lucide-react';
import { githubUsername, githubUrl } from '../data/about';

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
}

export default function GitHubActivity() {
  const [repos, setRepos] = useState<Repo[] | null>(null);
  const [error, setError] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(`https://api.github.com/users/${githubUsername}/repos?sort=pushed&per_page=4`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d: Repo[]) => {
        if (!cancelled) setRepos(Array.isArray(d) ? d.slice(0, 4) : []);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Github size={18} className="text-primary-500" />
          <span className="font-semibold text-surface-800 dark:text-white">GitHub activity</span>
        </div>
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-medium text-primary-600 hover:underline dark:text-primary-400"
        >
          @{githubUsername}
          <ExternalLink size={12} />
        </a>
      </div>

      {/* Contribution heatmap (third-party image, themed teal) */}
      {!imgError && (
        <img
          src={`https://ghchart.rshah.org/14b8a6/${githubUsername}`}
          alt={`${githubUsername}'s GitHub contribution graph`}
          className="mb-4 w-full rounded-lg opacity-90"
          loading="lazy"
          onError={() => setImgError(true)}
        />
      )}

      {/* Recent repositories */}
      <div className="grid flex-1 gap-3 sm:grid-cols-2">
        {repos === null && !error &&
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-20 animate-pulse rounded-lg bg-surface-100/70 dark:bg-surface-800/60" />
          ))}

        {error && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="col-span-full flex items-center justify-center gap-2 rounded-lg border border-dashed border-surface-300 p-6 text-sm text-surface-500 transition-colors hover:border-primary-400 hover:text-primary-600 dark:border-surface-700 dark:text-surface-400"
          >
            <Github size={16} />
            View my repositories on GitHub
            <ExternalLink size={13} />
          </a>
        )}

        {repos &&
          repos.map((r) => (
            <a
              key={r.id}
              href={r.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-lg border border-surface-200/60 bg-surface-50 p-3 transition-colors hover:border-primary-400 dark:border-surface-700/40 dark:bg-surface-800/60"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="truncate text-sm font-medium text-surface-800 transition-colors group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400">
                  {r.name}
                </span>
                {r.stargazers_count > 0 && (
                  <span className="flex items-center gap-0.5 text-xs text-surface-400">
                    <Star size={11} />
                    {r.stargazers_count}
                  </span>
                )}
              </div>
              {r.description && (
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-surface-500 dark:text-surface-400">
                  {r.description}
                </p>
              )}
              {r.language && (
                <span className="mt-2 inline-block text-[11px] font-medium text-primary-600 dark:text-primary-400">
                  {r.language}
                </span>
              )}
            </a>
          ))}
      </div>
    </div>
  );
}
