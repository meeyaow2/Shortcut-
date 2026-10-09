"use client";

import Link from "next/link";
import { aiFeed } from "@/data/updates";
import { useToday } from "@/hooks/useToday";
import { daysBetween, formatDate } from "@/lib/dates";
import { SourceBadge } from "../source/Source";

const WEEK = 7;
const SHOWN = 4;

/**
 * "I have five minutes. What should I know?" Shows AI updates from the last
 * seven days by true publish date. A quiet week shows the most recent ones
 * instead, and says that is what it is doing.
 */
export function WeekList() {
  const today = useToday();
  const thisWeek = today ? aiFeed.filter((update) => daysBetween(update.datePublished, today) <= WEEK) : [];
  const quiet = today !== null && thisWeek.length === 0;
  const items = (thisWeek.length > 0 ? thisWeek : aiFeed).slice(0, SHOWN);

  return (
    <div>
      {quiet && <p className="mb-2 text-sm text-ink-2">Nothing new in the last seven days. These are the most recent.</p>}
      <ul className="divide-y divide-line">
        {items.map((update) => (
          <li key={update.id} className="grid gap-x-6 gap-y-1 py-3.5 sm:grid-cols-[6.5rem_1fr_auto] sm:items-baseline">
            <div>
              <SourceBadge id={update.sourceId} />
            </div>
            <div className="min-w-0">
              <Link href={`/ai/updates#${update.id}`} className="font-semibold hover:text-accent">
                {update.title}
              </Link>
              <p className="text-ink-2">{update.whyItMatters}</p>
            </div>
            <p className="whitespace-nowrap text-sm text-ink-3">{formatDate(update.datePublished)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
