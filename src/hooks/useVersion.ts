/**
 * useVersion.ts
 *
 * The current version of a featured project, read live from the `version` field of a JSON
 * manifest in its GitHub repo (plugin.json or package.json, see `version.file` in
 * data/projects.ts). It goes through raw.githubusercontent.com, not the REST API: no 60-calls-
 * an-hour limit, CORS open, and it follows the default branch (HEAD), so a new release shows up
 * without touching this site. Until the answer arrives, or if it fails, the known version
 * written in the data is shown.
 *
 * One request per repo per tab: the promise is shared by every cover and page that asks, and
 * the answer is kept in sessionStorage like MoreBuilds.tsx does.
 *
 * Usage: const version = useVersion(project); // '3.6.0', or undefined for projects without one
 */
import { useEffect, useState } from 'react';
import type { Project } from '../types';

const CACHE_PREFIX = 'gh-version-v1:';
const pending = new Map<string, Promise<string | null>>();

function manifestUrl(project: Project, file: string) {
  return `${project.githubUrl.replace('https://github.com/', 'https://raw.githubusercontent.com/')}/HEAD/${file}`;
}

function readCache(url: string): string | null {
  try { return sessionStorage.getItem(CACHE_PREFIX + url); } catch { return null; }
}

function writeCache(url: string, version: string) {
  try { sessionStorage.setItem(CACHE_PREFIX + url, version); } catch { /* storage blocked: refetch next time */ }
}

async function fetchVersion(url: string): Promise<string | null> {
  const res = await fetch(url);
  if (!res.ok) return null;
  const version = (await res.json())?.version;
  // The manifest is someone else's file: accept only a plain x.y.z version.
  return typeof version === 'string' && /^\d+\.\d+\.\d+$/.test(version) ? version : null;
}

function liveVersion(url: string): Promise<string | null> {
  if (!pending.has(url)) {
    pending.set(url, fetchVersion(url).then(
      (v) => { if (v) writeCache(url, v); return v; },
      () => null
    ));
  }
  return pending.get(url)!;
}

export function useVersion(project: Project): string | undefined {
  const url = project.version ? manifestUrl(project, project.version.file) : null;
  const [version, setVersion] = useState(() => (url && readCache(url)) || project.version?.known);

  useEffect(() => {
    if (!url || readCache(url)) return;
    let alive = true;
    liveVersion(url).then((v) => { if (alive && v) setVersion(v); });
    return () => { alive = false; };
  }, [url]);

  return version;
}
