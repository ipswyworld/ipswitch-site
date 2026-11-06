"use client";

import { useEffect, useState } from "react";

type Entry = { ok: boolean; httpStatus: number | null; ms: number };
type Status = { checkedAt: string | null; checks: Record<string, Entry> };

function ago(iso: string): string {
  const mins = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 60000));
  if (mins < 2) return "just now";
  if (mins < 90) return `${mins} minutes ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 36) return `${hrs} hours ago`;
  return `${Math.round(hrs / 24)} days ago`;
}

/**
 * Shows the result of the last scheduled health check for a project, with its age.
 * Renders nothing for projects that have no check. It never claims uptime: only the last result.
 */
export function LiveStatus({ slug }: { slug?: string }) {
  // The result is stored with the project it belongs to, so it can never be shown under another one.
  const [state, setState] = useState<{ slug: string; entry: Entry; checkedAt: string } | null>(null);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    fetch("/status.json", { cache: "no-store" })
      .then((r) => (r.ok ? (r.json() as Promise<Status>) : null))
      .then((s) => {
        if (cancelled || !s || !s.checkedAt || !s.checks[slug]) return;
        setState({ slug, entry: s.checks[slug], checkedAt: s.checkedAt });
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (!slug || !state || state.slug !== slug) return null;
  const { entry, checkedAt } = state;
  return (
    <p className={`livestatus ${entry.ok ? "up" : "down"}`}>
      <span className="dot" aria-hidden="true" />
      {entry.ok
        ? `Health check passed (${entry.ms} ms), checked ${ago(checkedAt)}.`
        : `Health check did not pass, checked ${ago(checkedAt)}.`}{" "}
      <span className="livestatus-note">The last result of a scheduled check, not an uptime figure.</span>
    </p>
  );
}
