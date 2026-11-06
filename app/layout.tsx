import type { Metadata, Viewport } from "next";
import { Barlow, Big_Shoulders_Stencil, Martian_Mono } from "next/font/google";
import { Analytics } from "@/components/Analytics";
import { Splash } from "@/components/Splash";
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

// Runs before first paint. Decides whether the splash plays: home page only, once per
// session, never for a shared ?byte= link, never with reduced motion.
const SPLASH_GATE = `(function(){try{var p=location.pathname;if(p!=='/'&&p!=='/index.html')return;if(/[?&]byte=/.test(location.search))return;if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;if(sessionStorage.getItem('ipswitch-splash'))return;sessionStorage.setItem('ipswitch-splash','1');document.documentElement.setAttribute('data-splash','play');}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${text.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: SPLASH_GATE }} />
      </head>
      <body>
        <Splash />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
