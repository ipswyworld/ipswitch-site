"use client";

import { useEffect } from "react";

// Privacy-friendly analytics (GoatCounter: no cookies, no consent banner needed).
// Inert until NEXT_PUBLIC_GOATCOUNTER is set to the account code at build time.
// Respects Do Not Track.
const CODE = process.env.NEXT_PUBLIC_GOATCOUNTER;

export function Analytics() {
  useEffect(() => {
    if (!CODE) return;
    if (navigator.doNotTrack === "1") return;
    const s = document.createElement("script");
    s.async = true;
    s.src = "https://gc.zgo.at/count.js";
    s.dataset.goatcounter = `https://${CODE}.goatcounter.com/count`;
    document.body.appendChild(s);
    return () => {
      s.remove();
    };
  }, []);
  return null;
}
