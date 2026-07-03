import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, ArrowUpRight, Star, ChevronDown } from 'lucide-react';
import { projects } from '../data/projects';
import { GitHubRepo } from '../types';

const GITHUB_USER = 'FreddyZeta1847';
const CACHE_KEY = 'gh-more-builds-v2';

// Repos already shown as featured projects (from data/projects.ts githubUrl slugs),
// plus the profile-README repo.
const EXCLUDED = new Set(
  [
    ...projects
      .map((p) => p.githubUrl?.split('/').filter(Boolean).pop())
      .filter((n): n is string => !!n),
    GITHUB_USER,
  ].map((n) => n.toLowerCase())
);

// Language dot colors, kept in the Aurora family.
const LANGUAGE_DOT: Record<string, string> = {
  Python: 'bg-accent-400',
  JavaScript: 'bg-primary-300',
  TypeScript: 'bg-primary-500',
  HTML: 'bg-fuchsia-400',
  CSS: 'bg-accent-600',
  'C++': 'bg-primary-700',
  'C#': 'bg-fuchsia-500',
  Java: 'bg-accent-500',
  PHP: 'bg-primary-600',
  GDScript: 'bg-accent-300',
};

async function fetchRepos(): Promise<GitHubRepo[]> {
  const cached = sessionStorage.getItem(CACHE_KEY);
  if (cached) return JSON.parse(cached);

  const res = await fetch(
    `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=100`
  );
  if (!res.ok) throw new Error(`GitHub API ${res.status}`);
  const data: Array<{
    name: string;
    description: string | null;
    html_url: string;
    language: string | null;
    stargazers_count: number;
    updated_at: string;
    fork: boolean;
  }> = await res.json();

  const repos = data
    .filter((r) => !r.fork && !EXCLUDED.has(r.name.toLowerCase()))
    .map((r) => ({
      name: r.name,
      description: r.description,
      htmlUrl: r.html_url,
      language: r.language,
      stars: r.stargazers_count,
      updatedAt: r.updated_at,
    }));

  sessionStorage.setItem(CACHE_KEY, JSON.stringify(repos));
  return repos;
}

/**
 * Compact archive of public GitHub repos, continuing the featured-project
 * numbering. Fetch is deferred until the section nears the viewport and the
 * whole block renders nothing if the fetch fails or returns empty.
 */
export default function MoreBuilds() {
  const [ref, inView] = useInView({ triggerOnce: true, rootMargin: '400px 0px' });
  const [repos, setRepos] = useState<GitHubRepo[] | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!inView) return;
    let cancelled = false;
    fetchRepos()
      .then((r) => {
        if (!cancelled) setRepos(r);
      })
      .catch(() => {
        if (!cancelled) setRepos([]);
      });
    return () => {
      cancelled = true;
    };
  }, [inView]);

  const startIndex = projects.length + 1; // numbering continues after featured rows

  return (
    <div ref={ref}>
      {repos && repos.length > 0 && (
        <div className="mt-12">
          {/* Divider header */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <Github size={14} className="text-accent-600 dark:text-accent-400" />
            <p className="font-mono text-xs tracking-widest uppercase text-accent-600 dark:text-accent-400">
              More builds — live from GitHub
            </p>
          </div>

          <div className="flex justify-center mb-6">
            <button
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              className="inline-flex items-center gap-2 glass px-6 py-3 rounded-full text-sm font-medium text-surface-700 dark:text-surface-200 hover:shadow-glow hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300"
            >
              {open ? 'Show less' : `Show more builds (${repos.length})`}
              <ChevronDown
                size={16}
                className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
              />
            </button>
          </div>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                key="archive"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="overflow-hidden"
              >
                <div className="border-t border-surface-200 dark:border-white/[0.06]">
                  {repos.map((repo, i) => (
                    <motion.a
                      key={repo.name}
                      href={repo.htmlUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: i * 0.05 }}
                      className="group flex items-center gap-4 md:gap-8 py-4 md:py-5 border-b border-surface-200 dark:border-white/[0.06]"
                    >
                      <span className="w-8 shrink-0 font-mono text-sm font-bold tabular-nums text-accent-500/80 dark:text-accent-400/80">
                        {String(startIndex + i).padStart(2, '0')}
                      </span>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-display font-semibold text-surface-800 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                          {repo.name}
                        </h4>
                        {repo.description && (
                          <p className="text-sm text-surface-500 dark:text-surface-400 truncate">
                            {repo.description}
                          </p>
                        )}
                      </div>
                      {repo.language && (
                        <span className="hidden sm:flex items-center gap-1.5 shrink-0 font-mono text-xs text-surface-500 dark:text-surface-400">
                          <span
                            className={`w-2 h-2 rounded-full ${LANGUAGE_DOT[repo.language] ?? 'bg-primary-400'}`}
                          />
                          {repo.language}
                        </span>
                      )}
                      {repo.stars > 0 && (
                        <span className="hidden sm:flex items-center gap-1 shrink-0 font-mono text-xs text-surface-500 dark:text-surface-400">
                          <Star size={12} className="text-accent-500 dark:text-accent-400" />
                          {repo.stars}
                        </span>
                      )}
                      <ArrowUpRight
                        size={16}
                        className="shrink-0 text-surface-400 group-hover:text-primary-500 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
