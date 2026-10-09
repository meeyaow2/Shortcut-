"use client";

import Link from "next/link";
import { useLibrary } from "@/hooks/useLibrary";
import { sheetStats } from "@/lib/sheets";
import type { CheatSheet } from "@/types";
import { FreshnessStatus, SourceBadge, UpdatedSinceViewed } from "../source/Source";

export function CheatSheetCard({ sheet }: { sheet: CheatSheet }) {
  const { lastViewed } = useLibrary();
  const { ruleCount, sourceIds, dateVerified } = sheetStats(sheet);
  const viewed = lastViewed[sheet.slug];
  const updatedSinceViewed = Boolean(viewed) && sheet.dateUpdated > viewed;

  return (
    <article className="lift group relative flex flex-col rounded-md border border-line p-4 sm:p-5 hover:border-ink">
      <div className="flex items-start justify-between gap-2">
        <h2 className="text-xl font-semibold">
          {/* The link stretches over the card; the save control sits above it. */}
          <Link href={`/cheat-sheets/${sheet.slug}`} className="after:absolute after:inset-0 after:rounded-md">
            {sheet.title}
          </Link>
        </h2>
      </div>
      <p className="mt-2 flex-1 text-ink-2">{sheet.description}</p>
      {sheet.viewportSensitivity && (
        <p className="mt-3 text-sm text-ink-3" title={sheet.viewportSensitivity === "high" ? "Most of this sheet changes with viewport" : "Parts of this sheet change with viewport"}>
          {sheet.viewportSensitivity === "high" ? "Mobile · Tablet · Desktop" : "Viewport-aware in part"}
        </p>
      )}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {sourceIds.map((id) => (
          <SourceBadge key={id} id={id} />
        ))}
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-line pt-3 text-sm text-ink-2">
        <span>
          {ruleCount} {ruleCount === 1 ? "rule" : "rules"}
        </span>
        {updatedSinceViewed ? <UpdatedSinceViewed /> : <FreshnessStatus dateVerified={dateVerified} />}
      </div>
    </article>
  );
}
