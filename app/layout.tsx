import type { Metadata, Viewport } from "next";
import { Barlow, Big_Shoulders_Stencil, Martian_Mono } from "next/font/google";
import "./globals.css";

// The optical-size axis gives the display cut at large sizes, matching the logo outlines.
const display = Big_Shoulders_Stencil({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-display",
  display: "swap",
});
const text = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-text",
  display: "swap",
});
const mono = Martian_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const SITE_URL = process.env.SITE_URL ?? "https://ipswitch.co.ke";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Ipswitch", template: "%s · Ipswitch" },
  description:
    "Ipswitch: a software and DevOps engineer in Nairobi who builds, ships and runs whole systems, often inside hard limits.",
  openGraph: {
    title: "Ipswitch",
    description: "Software and DevOps engineer in Nairobi. One engineer, the whole line.",
    url: SITE_URL,
    siteName: "Ipswitch",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#17171c",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${text.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
