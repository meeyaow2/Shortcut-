import { daysBetween, formatDate } from "./dates";

export type FreshnessState = "today" | "recent" | "dated" | "stale" | "unverified";

export interface Freshness {
  state: FreshnessState;
  label: string;
}

/** After this many days without a re-check, content is flagged. */
export const STALE_AFTER_DAYS = 90;
/** Guidance first published longer ago than this gets an age note. */
export const OLD_GUIDANCE_YEARS = 5;

/**
 * Turns a verification date into the status shown beside content.
 * `today` is null during server rendering, where only the absolute date is safe.
 */
export function getFreshness(dateVerified: string | null, today: string | null): Freshness {
  if (!dateVerified) return { state: "unverified", label: "Not yet verified" };
  if (!today) return { state: "dated", label: `Verified ${formatDate(dateVerified)}` };

  const days = daysBetween(dateVerified, today);
  if (days <= 0) return { state: "today", label: "Verified today" };
  if (days === 1) return { state: "recent", label: "Verified yesterday" };
  if (days <= 30) return { state: "recent", label: `Verified ${days} days ago` };
  if (days <= STALE_AFTER_DAYS) return { state: "dated", label: `Verified ${formatDate(dateVerified)}` };
  return { state: "stale", label: "Potentially outdated" };
}

/** Years since publication, when old enough to be worth pointing out. */
export function getGuidanceAge(datePublished: string | undefined, today: string | null): number | null {
  if (!datePublished || !today) return null;
  const years = Math.floor(daysBetween(datePublished, today) / 365.25);
  return years >= OLD_GUIDANCE_YEARS ? years : null;
}
