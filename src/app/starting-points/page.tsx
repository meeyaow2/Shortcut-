import type { Metadata } from "next";
import Link from "next/link";
import { EditorialLabel, OfficialGuidance, Why } from "@/components/craft/Craft";
import { PageHeader } from "@/components/ui/primitives";
import { cheatSheets } from "@/data/cheat-sheets";
import { craftEntries } from "@/data/craft";

export const metadata: Metadata = { title: "Safe Starting Points" };

const starters = craftEntries.filter((entry) => entry.starter);

/** The first sheet an entry appears on, for the "full entry" link. */
function sheetFor(entryId: string) {
  return cheatSheets.find((sheet) => sheet.sections.some((section) => section.entries?.some((entry) => entry.id === entryId)));
}

export default function StartingPointsPage() {
  return (
    <div className="page">
      <PageHeader
        title="Safe Starting Points"
        lede="Sensible values to begin from when no standard gives a hard answer. None of these is a rule: open Depends on any row to see when to change it."
      >
        <div className="mt-5">
          <EditorialLabel kind="industry-convention" />
        </div>
      </PageHeader>

      <ul className="max-w-4xl divide-y divide-line pt-4">
        {starters.map((entry) => {
          const sheet = sheetFor(entry.id);
          return (
            <li key={entry.id} id={entry.id} className="anchor-target py-4">
              <div className="grid items-baseline gap-x-6 gap-y-1 sm:grid-cols-[14rem_13rem_1fr]">
                <h2 className="font-sans text-base font-semibold tracking-normal">{entry.starter!.label}</h2>
                <p className="font-display text-2xl font-semibold tabular-nums tracking-tight">{entry.safeStartingPoint}</p>
                <p className="text-ink-2">{entry.starter!.context}</p>
              </div>
              <div className="mt-3">
                <Why label="Depends">
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
                  {entry.official && <OfficialGuidance notes={entry.official} />}
                  {sheet && (
                    <p>
                      <Link
                        href={`/cheat-sheets/${sheet.slug}#${entry.id}`}
                        className="font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent"
                      >
                        Full entry on the {sheet.title} cheat sheet
                      </Link>
                    </p>
                  )}
                </Why>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
