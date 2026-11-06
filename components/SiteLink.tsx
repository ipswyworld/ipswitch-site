import Link from "next/link";
import type { ComponentProps } from "react";

/**
 * Every internal link goes through this. Pre-fetching is off on purpose: in a static export with
 * trailing slashes, Next writes a page's segment data to `/page/__next.page/__PAGE__.txt` but the
 * browser asks for `/page/__next.page.__PAGE__.txt`, so each pre-fetch is a 404. Navigation falls back
 * to the full page data (`index.txt`), which does exist. Revisit when Next fixes the mismatch.
 */
export default function SiteLink(props: ComponentProps<typeof Link>) {
  return <Link prefetch={false} {...props} />;
}
