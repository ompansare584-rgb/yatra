import type { Viewport } from "next";
import { Hind, Rozha_One, Special_Elite } from "next/font/google";
import clsx from "clsx";
import SiteHeader from "@/components/layout/SiteHeader";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Footer from "@/components/sections/Footer";
import { buildMetadata } from "@/lib/metadata";
import "./globals.scss";

// Fonts are self-hosted by next/font at build time. Only the display face carries Devanagari
// (for the few Marathi details), so the body font downloads Latin only. The typewriter face is
// used for small labels only, so it is not preloaded (it never competes with the first paint).
const rozha = Rozha_One({
  weight: "400",
  subsets: ["latin", "devanagari"],
  display: "swap",
  variable: "--font-rozha",
});
const hind = Hind({
  weight: ["400", "600"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-hind",
});
const elite = Special_Elite({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-elite",
});

export const metadata = buildMetadata();

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  themeColor: "#12356B",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={clsx(rozha.variable, hind.variable, elite.variable)}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <Footer />
        {/* Effect-only: renders nothing, enhances scrolling on desktop after the page is usable. */}
        <SmoothScroll />
      </body>
    </html>
  );
}
