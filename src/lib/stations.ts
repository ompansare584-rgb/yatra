import { stations, type Station } from "@/content/stations";

/** Looks up a station by id; throws at build time if an id is mistyped. */
export function getStation(id: string): Station {
  const found = stations.find((s) => s.id === id);
  if (!found) throw new Error(`Unknown station id: ${id}`);
  return found;
}
