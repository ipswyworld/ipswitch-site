import Image from "next/image";
import Link from "@/components/SiteLink";

export function Header() {
  return (
    <div className="wrap">
      <header className="bar">
        <Link href="/" className="brand" aria-label="Ipswitch, home">
          <Image src="/brand/lockup-on-dark.svg" alt="Ipswitch" width={252} height={60} priority />
        </Link>
        <nav aria-label="Primary">
          <Link href="/#work">Work</Link>
          <Link href="/#proof">Proof</Link>
          <Link href="/writing/">Writing</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
      </header>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap foot-row">
        <p>Ipswitch · software and DevOps · Nairobi, Kenya</p>
        <nav aria-label="Footer">
          <Link href="/writing/">Writing</Link>
          <a href="/feed.xml">RSS</a>
          <Link href="/cv/">CV</Link>
          <Link href="/work-with-me/">Terms</Link>
        </nav>
      </div>
    </footer>
  );
}
