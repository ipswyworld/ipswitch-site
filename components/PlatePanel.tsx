"use client";

import Link from "next/link";
import { PLATES } from "@/lib/plates";
import { useByte } from "./ByteProvider";
import { LiveStatus } from "./LiveStatus";

const IDLE =
  "Tilt any lever. Each opens the back of its plate here. Violet, turquoise and yellow are the three flagship projects; the silver ones lead to the rest of the site.";

export function PlatePanel() {
  const { active } = useByte();
  const p = active === null ? null : PLATES[active];

  return (
    <section className="reverse" id="work" aria-live="polite">
      <h2>{p ? p.title : "Eight plates"}</h2>
      <p className="state">{p ? p.note : IDLE}</p>
      {p ? (
        <>
          <table>
            <tbody>
              {p.rows.map((r) => (
                <tr key={r.label}>
                  <th>{r.label}</th>
                  <td>{r.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <LiveStatus key={p.slug ?? p.label} slug={p.slug} />
          <Link className="plate-link" href={p.href}>
            {p.cta}
          </Link>
        </>
      ) : (
        <ul className="plate-index">
          {PLATES.map((q, i) => (
            <li key={`${q.label}-${i}`}>
              <Link href={q.href}>
                <b>{"1PSW1TCH"[i]}</b> {q.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
