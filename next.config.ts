import type { NextConfig } from "next";

// Fully static export: the same `out/` folder deploys unchanged to GitHub Pages,
// a cPanel host, or Cloudflare Pages / Netlify.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: { root: process.cwd() },
};

export default nextConfig;
