"use client";

import Link from "next/link";
import { WIRED } from "@/lib/byte";
import { BY_SLUG } from "@/lib/projects";
import { useByte } from "./ByteProvider";

const IDLE =
  "Tilt the violet P, the turquoise W or the yellow C. Each opens the back of its plate. The silver levers are spare: nothing is wired to them yet.";

export function PlatePanel() {
  const { active } = useByte();
  const slug = active ? WIRED[active] : undefined;
  const p = slug ? BY_SLUG[slug] : undefined;

  const title = p ? p.name : active ? "Spare lever" : "Three plates";
  const note = p
    ? `Lever ${p.letter} · back of the plate`
    : active
      ? "Nothing is wired to this one yet. Try the violet P, the turquoise W or the yellow C."
      : IDLE;

  return (
    <section className="reverse" id="work" aria-live="polite">
      <h2>{title}</h2>
      <p className="state">{note}</p>
      <table>
        <tbody>
          <tr>
            <th>Status</th>
            <td>{p ? p.status : "P · W · C are wired"}</td>
          </tr>
          <tr>
            <th>Role</th>
            <td>{p ? p.role : "Sole builder"}</td>
          </tr>
          <tr>
            <th>Stack</th>
            <td>{p ? p.stack : "Choose a lever"}</td>
          </tr>
          <tr>
            <th>Host</th>
            <td>{p ? p.host : "Choose a lever"}</td>
          </tr>
          <tr>
            <th>Limit</th>
            <td>{p ? p.limit : "Choose a lever"}</td>
          </tr>
        </tbody>
      </table>
      {p ? (
        <Link className="plate-link" href={`/work/${p.slug}/`}>
          Open the full plate
        </Link>
      ) : (
        <ul className="plate-index">
          {Object.values(BY_SLUG).map((q) => (
            <li key={q.slug}>
              <Link href={`/work/${q.slug}/`}>
                <b>{q.letter}</b> {q.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
