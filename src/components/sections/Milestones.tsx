import { has, publishedAchievements, safeHttpUrl } from "@/lib/content";
import s from "./Sections.module.scss";

/** Genuine achievements only. Hides itself completely when none are published. */
export default function Milestones() {
  const achievements = publishedAchievements();
  if (achievements.length === 0) return null;

  return (
    <div className={s.milestones} data-reveal>
      <h3 className={s.milestonesTitle}>Milestones</h3>
      <ul className={s.milestoneList}>
        {achievements.map((a) => {
          const proof = safeHttpUrl(a.proofUrl);
          return (
            <li key={a.title} className={s.stamp}>
              <p className={s.stampTitle}>{a.title}</p>
              {has(a.date) ? <p className={s.stampMeta}>{a.date}</p> : null}
              {has(a.description) ? <p className={s.stampMeta}>{a.description}</p> : null}
              {proof ? (
                <a href={proof} target="_blank" rel="noopener noreferrer">
                  View proof<span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
