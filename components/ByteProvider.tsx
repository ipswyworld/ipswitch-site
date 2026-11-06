"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { INTRO_ORDER, TARGET_BITS, parseByte, sum, toBits } from "@/lib/byte";

type ByteState = {
  bits: number[];
  value: number;
  intro: boolean;
  landed: number;
  active: number | null;
  note: string | null;
  toggle: (index: number) => void;
  setByte: (n: number, note?: string) => void;
  reset: () => void;
};

const Ctx = createContext<ByteState | null>(null);

export function useByte(): ByteState {
  const c = useContext(Ctx);
  if (!c) throw new Error("useByte must be used inside <ByteProvider>");
  return c;
}

const ZERO = [0, 0, 0, 0, 0, 0, 0, 0];

export function ByteProvider({ children, autoplay = true }: { children: React.ReactNode; autoplay?: boolean }) {
  const [bits, setBits] = useState<number[]>(ZERO);
  const [intro, setIntro] = useState(autoplay);
  const [landed, setLanded] = useState(0);
  const [active, setActive] = useState<number | null>(null);
  const [note, setNote] = useState<string | null>(null);
  const touched = useRef(false);

  // The one authored moment: from all-zero, levers S, I and T throw in turn (32, 40, 44).
  // A ?byte= link skips it and opens straight at that number; so does reduced motion.
  useEffect(() => {
    if (!autoplay) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fromUrl = parseByte(new URLSearchParams(window.location.search).get("byte"));
    if (fromUrl !== null || reduce) {
      // Deferred, so there is no synchronous setState inside the effect.
      timers.push(
        setTimeout(() => {
          setBits(fromUrl !== null ? toBits(fromUrl) : [...TARGET_BITS]);
          setIntro(false);
        }, 0),
      );
      return () => timers.forEach(clearTimeout);
    }
    // While the splash screen is playing, wait for it to finish first.
    const wait = document.documentElement.dataset.splash === "play" ? 1750 : 0;
    const finish = () => {
      setIntro(false);
      setLanded((n) => n + 1);
    };
    INTRO_ORDER.forEach((bit, n) => {
      timers.push(
        setTimeout(() => {
          setBits((b) => b.map((v, i) => (i === bit ? 1 : v)));
          if (n === INTRO_ORDER.length - 1) timers.push(setTimeout(finish, 480));
        }, wait + 700 + n * 520),
      );
    });
    return () => timers.forEach(clearTimeout);
  }, [autoplay]);

  // Keep the address bar in step once the visitor has touched the levers, so the link is shareable.
  useEffect(() => {
    if (!autoplay || !touched.current) return;
    const url = new URL(window.location.href);
    url.searchParams.set("byte", bits.join(""));
    window.history.replaceState(null, "", url);
  }, [bits, autoplay]);

  const toggle = useCallback((index: number) => {
    touched.current = true;
    setBits((b) => b.map((v, i) => (i === index ? (v ? 0 : 1) : v)));
    setActive(index);
    setNote(null);
  }, []);

  const setByte = useCallback((n: number, message?: string) => {
    touched.current = true;
    setBits(toBits(n));
    setIntro(false);
    setActive(null);
    setNote(message ?? null);
  }, []);

  const reset = useCallback(() => {
    touched.current = false;
    setBits([...TARGET_BITS]);
    setActive(null);
    setIntro(false);
    setNote(null);
    const url = new URL(window.location.href);
    if (url.searchParams.has("byte")) {
      url.searchParams.delete("byte");
      window.history.replaceState(null, "", url);
    }
  }, []);

  const value = useMemo(() => sum(bits), [bits]);

  return (
    <Ctx.Provider value={{ bits, value, intro, landed, active, note, toggle, setByte, reset }}>
      {children}
    </Ctx.Provider>
  );
}
