"use client";

import { cheatSheets, plannedSheets, sheetGroups } from "@/data/cheat-sheets";
import { useContentContext } from "@/hooks/useLibrary";
import type { CheatSheet } from "@/types";
import { ContextNotice } from "../layout/ContextSwitch";
import { CheatSheetCard } from "./CheatSheetCard";

const hasRegional = (sheet: CheatSheet) => sheet.sections.some((section) => section.rules.some((rule) => rule.context === "sg"));

/** The cheat sheet library, grouped. In the Singapore context it narrows to sheets that carry Singapore guidance. */
export function CheatSheetLibrary() {
  const context = useContentContext();
  const sheets = context === "sg" ? cheatSheets.filter(hasRegional) : cheatSheets;

  return (
    <div className="stack-sections pt-8">
      <div className="-mb-6 empty:hidden">
        <ContextNotice>
          {context === "sg"
            ? `Showing the ${sheets.length} sheets that include Singapore guidance.`
            : "Singapore-specific rules inside each sheet are hidden."}
        </ContextNotice>
      </div>
      {sheetGroups.map((group) => {
        const inGroup = sheets.filter((sheet) => sheet.group === group);
        if (inGroup.length === 0) return null;
        return (
          <section key={group} aria-labelledby={`group-${group}`}>
            <h2 id={`group-${group}`} className="border-b-2 border-ink pb-2 text-2xl font-semibold">
              {group}
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {inGroup.map((sheet) => (
                <CheatSheetCard key={sheet.slug} sheet={sheet} />
              ))}
            </div>
          </section>
        );
      })}
      {context !== "sg" && (
        <p className="text-ink-2">
          {plannedSheets.length > 0 && (
            <>
              <span className="font-semibold text-ink">Not written yet: </span>
              {plannedSheets.join(", ")}.{" "}
            </>
          )}
          Margins and gaps are covered under Spacing, grid under Layout, elevation under Shadows and Borders, and
          neutrals under Colour.
        </p>
      )}
    </div>
  );
}
