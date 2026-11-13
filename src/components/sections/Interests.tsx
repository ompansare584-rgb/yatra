import { siteConfig } from "@/content/site";
import Station from "@/components/station/Station";
import Icon from "@/components/ui/Icon";
import s from "./Sections.module.scss";

export const INTERESTS_INTRO =
  "Areas I am curious about. These are interests — not a list of skills or a claim of expertise.";

/** The interest cards, without a station frame (used on the home page and /about). */
export function InterestCards() {
  const interests = siteConfig.interests.filter((i) => i.title.trim() !== "");
  if (interests.length === 0) return <p className={s.empty}>Interests will appear here once they are added.</p>;

  return (
    <ul className={s.destinations}>
      {interests.map((interest) => (
        <li key={interest.title} className={s.destination} data-reveal>
          <div className={s.destinationTop}>
            <span className={s.iconWrap}>
              <Icon name={interest.group} />
            </span>
            <p className={s.destinationSign}>{interest.group}</p>
          </div>
          <h3>{interest.title}</h3>
          <p>{interest.description}</p>
        </li>
      ))}
    </ul>
  );
}

export default function Interests() {
  return (
    <Station id="interests" tone="noon" intro={INTERESTS_INTRO}>
      <InterestCards />
    </Station>
  );
}
