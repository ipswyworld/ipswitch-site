"use client";

import { useEffect, useRef, useState } from "react";

// Disk budget of the live cPanel host (500 MB). Figures are from the project's own CPANEL.md;
// the ~23 MB "other" is derived from the 500 MB total, and says so.
const SEGMENTS = [
  { cls: "s-front", mb: 37, label: "37 MB", text: "Next.js standalone frontend (9 MB compressed)" },
  { cls: "s-venv", mb: 60, label: "60 MB", text: "Python virtualenv, plus a 53 KB backend" },
  { cls: "s-other", mb: 23, label: "~23 MB", text: "everything else (derived from the 500 MB total)" },
  { cls: "s-free", mb: 380, label: "~380 MB", text: "left for the database and every uploaded image" },
] as const;

export function DiskBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);
  const [seen, setSeen] = useState(false);

  // Armed only after mount, so the bar is fully visible without JavaScript or with reduced motion.
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    setArmed(true);
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div
        ref={ref}
        className={`disk${armed ? " armed" : ""}${seen ? " in" : ""}`}
        role="img"
        aria-label="Disk budget of 500 megabytes: frontend 37, Python environment 60, other 23, free about 380"
      >
        {SEGMENTS.map((s) => (
          <span key={s.cls} className={`seg ${s.cls}`} style={{ flex: s.mb }} />
        ))}
      </div>
      <ul className="legend">
        {SEGMENTS.map((s) => (
          <li key={s.cls}>
            <i className={`k ${s.cls}`} />
            <b>{s.label}</b> {s.text}
          </li>
        ))}
      </ul>
    </>
  );
}
