"use client";

import { ACCESSIBLE_LETTERS, CAPS, LETTERS, PLACES } from "@/lib/byte";
import { useByte } from "./ByteProvider";

export function LeverFrame() {
  const { bits, toggle } = useByte();

  return (
    <section
      className="frame"
      role="group"
      aria-label="Ipswitch: eight levers forming one byte. Tilt a lever to flip its bit."
    >
      <div className="wrap">
        <div className="levers">
          {LETTERS.map((letter, i) => (
            <div className="col" key={i}>
              <div className="letter" aria-hidden="true">
                {letter}
              </div>
              <div className="place" aria-hidden="true">
                {PLACES[i]}
              </div>
              <button
                type="button"
                className="lever"
                aria-pressed={bits[i] === 1}
                aria-label={`Bit ${i + 1} of 8, letter ${ACCESSIBLE_LETTERS[i]}, place value ${PLACES[i]}`}
                onClick={() => toggle(i)}
              >
                <span className="stop l" />
                <span className="stop r" />
                <span className="arm">
                  <span className="head" style={{ ["--cap" as string]: `var(--${CAPS[i]})` }} />
                </span>
                <span className="boss" />
              </button>
              <div className="bitplate" data-on={bits[i]}>
                {bits[i]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
