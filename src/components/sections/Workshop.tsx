import Station from "@/components/station/Station";
import { has, reviewedTools, toolStatusLabel, toolStatusOrder } from "@/lib/content";
import s from "./Sections.module.scss";

export default function Workshop() {
  // Only tools marked `reviewed: true` in site.ts are ever shown.
  const tools = reviewedTools();

  return (
    <Station
      id="workshop"
      tone="afternoon"
      intro="Tools and concepts I genuinely use or am exploring, labelled by how far along I actually am."
    >
      {tools.length === 0 ? (
        <p className={s.empty} data-reveal>
          Nothing is listed here yet. I will add tools once I have really used them or started learning them — this
          shelf stays empty rather than inventing a skills list.
        </p>
      ) : (
        <div className={s.toolGroups}>
          {toolStatusOrder.map((status) => {
            const group = tools.filter((t) => t.status === status);
            if (group.length === 0) return null;
            return (
              <div key={status} data-reveal>
                <h3 className={s.toolGroupTitle}>{toolStatusLabel[status]}</h3>
                <ul className={s.toolList}>
                  {group.map((tool) => (
                    <li key={tool.name} className={s.tool}>
                      <span>{tool.name}</span>
                      {has(tool.note) ? <small>{tool.note}</small> : null}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </Station>
  );
}
