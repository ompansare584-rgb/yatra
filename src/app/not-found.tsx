import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <main id="main" className="container" style={{ paddingBlock: "5rem", minHeight: "70svh" }}>
      <p className="label">Wrong platform</p>
      <h1 style={{ marginBlock: "1rem", fontSize: "clamp(2.2rem, 7vw, 4rem)" }}>This page is not on the route.</h1>
      <p style={{ marginBottom: "2rem" }}>The page you were looking for does not exist.</p>
      <Link className="btn btn-primary" href="/">
        Back to Om Pansare Junction
      </Link>
    </main>
  );
}
