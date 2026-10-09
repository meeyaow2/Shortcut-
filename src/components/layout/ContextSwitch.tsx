"use client";

import { useContentContext } from "@/hooks/useLibrary";
import { contextLabels } from "@/lib/authority";
import { library } from "@/lib/store";
import type { ContextFilter } from "@/types";

const options: ContextFilter[] = ["all", "global", "sg"];

/**
 * Chooses which region's guidance the product shows. It filters Updates,
 * Cheat Sheets and Search, and sets the default for Ask UX. The choice is
 * remembered in this browser.
 */
export function ContextSwitch() {
  const context = useContentContext();
  return (
    <fieldset className="flex items-center gap-2">
      <legend className="sr-only">Show guidance for</legend>
      <span aria-hidden className="text-sm text-ink-3">
        Context
      </span>
      <div className="flex rounded-sm border border-line-strong p-0.5">
        {options.map((option) => {
          const selected = option === context;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={selected}
              onClick={() => library.setContext(option)}
              className={`min-h-9 md:min-h-7 rounded-[3px] px-2.5 text-sm transition-colors ${
                selected ? "bg-ink font-medium text-paper" : "text-ink-2 hover:text-ink"
              }`}
            >
              {contextLabels[option]}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

/** One line, shown on filtered pages, saying what the switch is hiding and how to undo it. */
export function ContextNotice({ children }: { children: React.ReactNode }) {
  const context = useContentContext();
  if (context === "all") return null;
  return (
    <p role="status" className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-sm bg-wash px-3 py-2 text-sm text-ink-2">
      <span>
        <span className="font-semibold text-ink">{contextLabels[context]} context. </span>
        {children}
      </span>
      <button type="button" onClick={() => library.setContext("all")} className="font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent">
        Show all
      </button>
    </p>
  );
}
