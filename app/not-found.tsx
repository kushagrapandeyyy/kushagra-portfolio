import Link from "next/link";
export default function NotFound() {
  return <main className="not-found"><span className="section-kicker">404 / NOT FOUND</span><h1>This page went<br /><span className="muted">off the map.</span></h1><Link className="button button-primary" href="/">Return home</Link></main>;
}
