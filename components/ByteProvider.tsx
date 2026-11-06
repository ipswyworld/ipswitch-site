"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { INTRO_ORDER, TARGET_BITS, sum } from "@/lib/byte";

type ByteState = {
  bits: number[];
  value: number;
  intro: boolean;
  landed: number;
  active: string | null;
  toggle: (index: number, letter: string) => void;
  reset: () => void;
};

const Ctx = createContext<ByteState | null>(null);

export function useByte(): ByteState {
  const c = useContext(Ctx);
  if (!c) throw new Error("useByte must be used inside <ByteProvider>");
  return c;
}

export function ByteProvider({ children }: { children: React.ReactNode }) {
  const [bits, setBits] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0]);
  const [intro, setIntro] = useState(true);
  const [landed, setLanded] = useState(0);
  const [active, setActive] = useState<string | null>(null);

  // The one authored moment: from all-zero, levers S, I and T throw in turn (32, 40, 44).
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const finish = () => {
      setIntro(false);
      setLanded((n) => n + 1);
    };
    if (reduce) {
      setBits([...TARGET_BITS]);
      finish();
      return;
    }
    INTRO_ORDER.forEach((bit, n) => {
      timers.push(
        setTimeout(() => {
          setBits((b) => b.map((v, i) => (i === bit ? 1 : v)));
          if (n === INTRO_ORDER.length - 1) timers.push(setTimeout(finish, 480));
        }, 700 + n * 520),
      );
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  const toggle = useCallback((index: number, letter: string) => {
    setBits((b) => b.map((v, i) => (i === index ? (v ? 0 : 1) : v)));
    setActive(letter);
  }, []);

  const reset = useCallback(() => {
    setBits([...TARGET_BITS]);
    setActive(null);
    setIntro(false);
  }, []);

  const value = useMemo(() => sum(bits), [bits]);

  return (
    <Ctx.Provider value={{ bits, value, intro, landed, active, toggle, reset }}>{children}</Ctx.Provider>
  );
}
