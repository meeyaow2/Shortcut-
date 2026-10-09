"use client";

import Link from "next/link";
import { beforeYouSendIt } from "@/data/checks";
import { useLibrary } from "@/hooks/useLibrary";
import { library } from "@/lib/store";
import { Button } from "../ui/Button";

const total = beforeYouSendIt.reduce((sum, section) => sum + section.items.length, 0);
const slug = (category: string) => category.toLowerCase().replace(/[^a-z0-9]+/g, "-");

/** The pre-handoff checklist. Ticks are remembered in this browser until reset. */
export function Checklist() {
  const { checklist } = useLibrary();
  const done = checklist.length;

  return (
    <div className="max-w-3xl pt-6">
      <div className="sticky top-14 z-10 -mx-2 flex flex-wrap items-center justify-between gap-3 border-b border-line bg-paper/95 px-2 py-3 backdrop-blur-sm lg:top-14">
        <p role="status" className="font-medium">
          {done} of {total} checked
        </p>
        <Button variant="ghost" size="sm" onClick={() => library.resetChecklist()} disabled={done === 0}>
          Start a new check
        </Button>
      </div>

      <div className="space-y-10 pt-8">
        {beforeYouSendIt.map((section) => {
          const sectionDone = section.items.filter((item) => checklist.includes(item.id)).length;
          return (
            <fieldset key={section.id} id={section.id}>
              <legend className="flex w-full items-end justify-between gap-3 border-b-2 border-ink pb-2">
                <span className="font-display text-2xl font-semibold tracking-tight">{section.title}</span>
                <span className="text-sm tabular-nums text-ink-2">
                  {sectionDone} of {section.items.length}
                </span>
              </legend>
              <ul className="divide-y divide-line">
                {section.items.map((item) => {
                  const checked = checklist.includes(item.id);
                  return (
                    <li key={item.id}>
                      <label className="flex min-h-11 cursor-pointer items-center gap-3 py-2 hover:bg-wash">
                        <input
                          type="checkbox"
                          className="size-5 shrink-0 accent-accent"
                          checked={checked}
                          onChange={() => library.toggleChecklistItem(item.id)}
                        />
                        <span className={checked ? "text-ink-3 line-through decoration-line-strong" : ""}>{item.label}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
              {section.checkCategory && (
                <p className="mt-2 text-sm">
                  <Link
                    href={`/checks#${slug(section.checkCategory)}`}
                    className="font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent"
                  >
                    How to check {section.checkCategory.toLowerCase()}
                  </Link>
                </p>
              )}
            </fieldset>
          );
        })}
      </div>
    </div>
  );
}
