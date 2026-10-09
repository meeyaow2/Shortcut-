"use client";

import Link from "next/link";
import { resolveViewportValue, viewportKeyLabels } from "@/data/viewports";
import { useViewport } from "@/hooks/useViewport";
import type { CheatSheet, CraftEntry } from "@/types";
import { EditorialLabel, OfficialGuidance, Why } from "../craft/Craft";
import { AppliesTo, DependsOn, ViewportTable, isSpecificTo } from "./Scope";
import { FoldableNote } from "./Viewport";
import { ViewportBar } from "./ViewportBar";

/**
 * Starting values, read for one viewport or for all of them. Choosing a
 * viewport puts the rows that have a value for it first and shows that value;
 * rows without one stay, with their general starting point.
 */
export function StartingPointsView({ starters, sheets }: { starters: CraftEntry[]; sheets: Record<string, Pick<CheatSheet, "slug" | "title">> }) {
  const { viewport, key } = useViewport();
  const ordered = [...starters.filter((entry) => isSpecificTo(entry, viewport, key)), ...starters.filter((entry) => !isSpecificTo(entry, viewport, key))];

  return (
    <div className="pt-8">
      <ViewportBar />
      <div className="mt-4 empty:hidden">
        <FoldableNote />
      </div>
      <ul className="max-w-4xl divide-y divide-line pt-4">
        {ordered.map((entry) => {
          const sheet = sheets[entry.id];
          const reference = key ? resolveViewportValue(entry.viewportValues, key) : undefined;
          const value = reference?.value ?? entry.safeStartingPoint;
          const figure = value !== undefined && value.length <= 22;
          return (
            <li key={entry.id} id={entry.id} className="anchor-target space-y-3 py-5">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h2 className="font-sans text-lg font-semibold tracking-normal">{entry.starter!.label}</h2>
                <EditorialLabel kind={entry.kind} />
              </div>
              {value && (
                <div>
                  <p className="text-sm font-semibold text-ink-3">
                    {reference && key ? `${viewportKeyLabels[key]} reference` : key && entry.viewportValues ? "General starting point" : "Safe starting point"}
                  </p>
                  <p className={figure ? "font-display text-2xl font-semibold tabular-nums tracking-tight" : "text-lg font-medium"}>{value}</p>
                  <p className="text-sm text-ink-2">
                    {reference?.from
                      ? `Same as ${viewportKeyLabels[reference.from].toLowerCase()}${key?.startsWith("foldable") ? ", Shortcut’s reading" : ""}.`
                      : reference
                        ? ""
                        : `${entry.starter!.context}.`}
                    {key && !entry.viewportValues && " The same at every viewport."}
                  </p>
                </div>
              )}
              {entry.viewportValues && !key && <ViewportTable values={entry.viewportValues} />}
              {entry.viewportValues ? <DependsOn items={entry.dependsOn} /> : <AppliesTo scope={entry} />}
              <Why label="Why, and when to change it">
                <p>{entry.why}</p>
                {entry.commonRange && (
                  <p>
                    <span className="font-semibold text-ink">Common range. </span>
                    {entry.commonRange}
                  </p>
                )}
                {entry.whenToDeviate && (
                  <p>
                    <span className="font-semibold text-ink">When to deviate. </span>
                    {entry.whenToDeviate}
                  </p>
                )}
                {entry.viewportValues && key && <ViewportTable values={entry.viewportValues} highlight={key} />}
                {entry.official && <OfficialGuidance notes={entry.official} />}
                {sheet && (
                  <p>
                    <Link href={`/cheat-sheets/${sheet.slug}#${entry.id}`} className="font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent">
                      Full entry on the {sheet.title} cheat sheet
                    </Link>
                  </p>
                )}
              </Why>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
