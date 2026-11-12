import { siteConfig } from "@/content/site";
import s from "./Sections.module.scss";

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className="container">
        <p>
          Yatra <span lang="mr">(यात्रा)</span> · {siteConfig.name} · {siteConfig.institutionShort} · {siteConfig.academicYear}
        </p>
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
