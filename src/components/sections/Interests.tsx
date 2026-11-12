import { siteConfig } from "@/content/site";
import Station from "@/components/station/Station";
import Icon from "@/components/ui/Icon";
import s from "./Sections.module.scss";

export default function Interests() {
  const interests = siteConfig.interests.filter((i) => i.title.trim() !== "");

  return (
    <Station
      id="interests"
      tone="noon"
      intro="Areas I am curious about. These are interests — not a list of skills or a claim of expertise."
    >
      {interests.length === 0 ? (
        <p className={s.empty}>Interests will appear here once they are added.</p>
      ) : (
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
      )}
    </Station>
  );
}
