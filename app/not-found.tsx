import type { Metadata } from "next";
import Link from "@/components/SiteLink";
import { ByteProvider } from "@/components/ByteProvider";
import { LeverFrame } from "@/components/LeverFrame";
import { Footer, Header } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "Not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main">
        <ByteProvider autoplay={false}>
          <LeverFrame />
        </ByteProvider>
        <div className="wrap nf">
          <p className="nf-code" aria-hidden="true">
            404
          </p>
          <h1 className="page-h1">That page is not wired.</h1>
          <p className="tagline">
            Every lever is off. 404 does not even fit in eight bits (a byte stops at 255), and nothing is connected to
            this address.
          </p>
          <Link className="plate-link" href="/">
            Back to the frame
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
