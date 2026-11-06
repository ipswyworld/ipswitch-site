"use client";

import { TARGET } from "@/lib/byte";
import { useByte } from "./ByteProvider";

export function Readout() {
  const { bits, value, intro, landed, reset } = useByte();
  const hit = value === TARGET;

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
        {hit ? (
          <>
            <span className="hit">The name adds up to 44.</span> Eight bits, one byte, set to your number.
          </>
        ) : intro ? (
          "Setting the byte to the number the name adds up to."
        ) : (
          `That is ${value}. Your number is 44, so try to get back to 00101100.`
        )}
      </p>
      <button type="button" className="reset" onClick={reset}>
        Reset to 44
      </button>
    </aside>
  );
}
