"use client";

import { useEffect } from "react";

const LETTERS = ["1", "P", "S", "W", "1", "T", "C", "H"];
// Index among the six letters that open up between and after the two 1s.
const MID_INDEX: Record<number, number> = { 1: 0, 2: 1, 3: 2, 5: 3, 6: 4, 7: 5 };

/**
 * Two 1s appear side by side ("11"), then open up and the other six letters grow in between
 * and after them, forming 1PSW1TCH. The timeline is pure CSS (see globals.css); this component
 * only lets the visitor end it early. Whether it plays at all is decided by a tiny script in
 * the page head (home page only, once per session, never with reduced motion).
 */
export function Splash() {
  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.splash !== "play") return;
    const end = () => root.removeAttribute("data-splash");
    const timer = setTimeout(end, 2100);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") end();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div className="splash" aria-hidden="true" onClick={() => document.documentElement.removeAttribute("data-splash")}>
      <div className="sp-row">
        {LETTERS.map((ch, i) => {
          const mid = MID_INDEX[i];
          return (
            <span
              key={i}
              className={mid === undefined ? "sp-l one" : "sp-l mid"}
              style={mid === undefined ? undefined : ({ ["--i" as string]: mid } as React.CSSProperties)}
            >
              {ch}
            </span>
          );
        })}
      </div>
      <p className="sp-hint">Click or press Esc to skip</p>
    </div>
  );
}
