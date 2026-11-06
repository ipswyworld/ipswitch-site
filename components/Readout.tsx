"use client";

import { useState } from "react";
import { TARGET, nameSum, parseByte } from "@/lib/byte";
import { useByte } from "./ByteProvider";

const HELP = "Try a number from 0 to 255, eight bits like 00101100, or a name.";

export function Readout() {
  const { bits, value, intro, landed, note, setByte, reset } = useByte();
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const hit = value === TARGET;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const raw = text.trim();
    if (!raw) {
      setError(HELP);
      return;
    }
    const direct = parseByte(raw);
    if (direct !== null) {
      setError(null);
      const asBinary = /^[01]{8}$/.test(raw);
      setByte(direct, asBinary ? `${raw} is ${direct}.` : `${direct} in binary is ${direct.toString(2).padStart(8, "0")}.`);
      return;
    }
    if (/^\d+$/.test(raw)) {
      setError(`${raw} does not fit in a byte. The biggest is 255 (11111111).`);
      return;
    }
    if (/[a-z]/i.test(raw)) {
      const total = nameSum(raw);
      if (total === 0) {
        setError(HELP);
        return;
      }
      const n = total % 256;
      setError(null);
      setByte(
        n,
        total > 255
          ? `"${raw}" adds up to ${total}, which wraps to ${n} in a byte.`
          : `"${raw}" adds up to ${total} on the Pythagorean table.`,
      );
      return;
    }
    setError(HELP);
  }

  async function copy() {
    const url = new URL(window.location.href);
    url.searchParams.set("byte", bits.join(""));
    try {
      await navigator.clipboard.writeText(url.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setError("Could not copy automatically. The address bar already holds this link.");
    }
  }

  return (
    <aside className="readout" aria-label="Live byte readout">
      <div className="row">I9 P7 S1 W5 I9 T2 C3 H8 = 44</div>
      <div className="bin" aria-hidden="true">
        {bits.join("")}
      </div>
      <div key={landed} className={`dec${landed > 0 ? " land" : ""}`} aria-live="polite">
        {value}
      </div>
      <p>
        {note ? (
          note
        ) : hit ? (
          <>
            <span className="hit">The name adds up to 44.</span> Eight bits, one byte, set to your number.
          </>
        ) : intro ? (
          "Setting the byte to the number the name adds up to."
        ) : (
          `That is ${value}. Your number is 44, so try to get back to 00101100.`
        )}
      </p>

      <form className="setbyte" onSubmit={submit}>
        <label htmlFor="byte-input">Set the byte</label>
        <div className="setbyte-row">
          <input
            id="byte-input"
            type="text"
            inputMode="text"
            autoComplete="off"
            spellCheck={false}
            placeholder="44, 00101100 or your name"
            value={text}
            onChange={(e) => setText(e.target.value)}
            aria-describedby="byte-help"
          />
          <button type="submit">Set</button>
        </div>
        <p id="byte-help" className={error ? "setbyte-help err" : "setbyte-help"} role={error ? "alert" : undefined}>
          {error ?? HELP}
        </p>
      </form>

      <div className="readout-actions">
        <button type="button" className="reset" onClick={reset}>
          Reset to 44
        </button>
        <button type="button" className="reset" onClick={copy}>
          {copied ? "Link copied" : "Copy link to this byte"}
        </button>
      </div>
    </aside>
  );
}
