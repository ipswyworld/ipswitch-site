// 1PSW1TCH, one bit per letter. IPSWITCH adds up to 44 in the Pythagorean table
// (I9 P7 S1 W5 I9 T2 C3 H8), and 44 in binary is 00101100.
export const LETTERS = ["1", "P", "S", "W", "1", "T", "C", "H"] as const;
export const ACCESSIBLE_LETTERS = ["I", "P", "S", "W", "I", "T", "C", "H"] as const;
export const PLACES = [128, 64, 32, 16, 8, 4, 2, 1] as const;

// Cap colours mark the owner's personal numbers: P=7 violet, W=5 turquoise, C=3 yellow.
export const CAPS = ["silver", "violet", "silver", "turquoise", "silver", "silver", "yellow", "silver"] as const;

export const TARGET = 44;
export const TARGET_BITS = [0, 0, 1, 0, 1, 1, 0, 0] as const;
export const INTRO_ORDER = [2, 4, 5] as const; // S, I, T throw in turn: 32, 40, 44

export function sum(bits: readonly number[]): number {
  return bits.reduce((s, b, i) => s + (b ? PLACES[i] : 0), 0);
}
