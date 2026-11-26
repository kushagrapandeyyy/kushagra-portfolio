import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Page not found | Kushagra Pandey" };

export default function NotFound() {
  return (
    <main className="not-found section-shell">
      <p className="section-kicker">404</p>
      <h1>Page not found</h1>
      <Link className="button button-primary" href="/">Return home</Link>
    </main>
  );
}
