import Link from "next/link";
import { siteConfig } from "@/content/site";
import s from "./Sections.module.scss";

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className="container">
        <p>
          Yatra <span lang="mr">(यात्रा)</span> · {siteConfig.name} · {siteConfig.institutionShort} · {siteConfig.academicYear}
        </p>
        <nav aria-label="Footer">
          <ul className={s.footerLinks}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/projects">Projects</Link></li>
            <li><Link href="/github">GitHub</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </nav>
        <p className={s.footerLinks}>
          <span>Plain-text versions:</span>
          <a href="/md">Markdown</a>
          <a href="/llms.txt">llms.txt</a>
          <a href="/facts.json">facts.json</a>
        </p>
      </div>
    </footer>
  );
}
