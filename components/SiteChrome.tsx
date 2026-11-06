import Image from "next/image";
import Link from "next/link";

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
          <Link href="/#method">Method</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
      </header>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <p>Ipswitch · software and DevOps · Nairobi, Kenya</p>
      </div>
    </footer>
  );
}
