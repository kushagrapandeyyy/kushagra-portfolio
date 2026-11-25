import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found section-shell">
      <p className="section-kicker">404</p>
      <h1>Page not found<span className="accent">.</span></h1>
      <Link className="button button-primary" href="/">Return home</Link>
    </main>
  );
}
