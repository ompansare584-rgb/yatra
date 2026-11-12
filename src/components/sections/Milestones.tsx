import Icon from "@/components/ui/Icon";
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
            <li key={a.title} className={s.medal}>
              <span className={s.medalIcon}>
                <Icon name="Medal" />
              </span>
              <div>
                <p className={s.medalTitle}>{a.title}</p>
                {has(a.date) ? <p className={s.medalMeta}>{a.date}</p> : null}
                {has(a.description) ? <p className={s.medalMeta}>{a.description}</p> : null}
                {proof ? (
                  <a href={proof} target="_blank" rel="noopener noreferrer">
                    View proof<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
