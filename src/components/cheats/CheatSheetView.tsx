"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { sheetAiLinks } from "@/data/ai";
import { useContentContext } from "@/hooks/useLibrary";
import { useToday } from "@/hooks/useToday";
import { formatDate } from "@/lib/dates";
import { sheetStats } from "@/lib/sheets";
import { library } from "@/lib/store";
import type { CheatSheet } from "@/types";
import { ComponentQABlock, CraftBlock } from "../craft/Craft";
import { ContextNotice } from "../layout/ContextSwitch";
import { FreshnessStatus, SourceBadge } from "../source/Source";
import { RuleBlock } from "./RuleBlock";

export function CheatSheetView({ sheet }: { sheet: CheatSheet }) {
  const today = useToday();
  const { ruleCount, sourceIds, dateVerified } = sheetStats(sheet);
  const context = useContentContext();
  const aiLink = sheetAiLinks[sheet.slug];
  // Global context hides region-specific rules. A regional context keeps the
  // global ones, because regional guidance builds on them.
  const sections = sheet.sections
    .map((section) => ({ ...section, rules: section.rules.filter((rule) => context !== "global" || !rule.context) }))
    .filter((section) => section.rules.length > 0 || (section.entries?.length ?? 0) > 0);

  // Recording the visit is what lets the library flag later changes.
  useEffect(() => {
    if (today) library.markViewed(sheet.slug, today);
  }, [sheet.slug, today]);

  return (
    <div className="page">
      <header className="border-b border-line pb-8 pt-8 md:pt-10">
        <Link href="/cheat-sheets" className="inline-flex items-center gap-1.5 text-sm text-ink-2 hover:text-ink">
          <ArrowLeft aria-hidden className="size-4" />
          All cheat sheets
        </Link>
        <div className="mt-5 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-4xl font-semibold md:text-5xl">{sheet.title} cheat sheet</h1>
            <p className="mt-3 max-w-read text-lg text-ink-2">{sheet.description}</p>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-2">
          <span className="flex flex-wrap gap-1.5">
            {sourceIds.map((id) => (
              <SourceBadge key={id} id={id} />
            ))}
          </span>
          <span>
            {ruleCount} rules, updated {formatDate(sheet.dateUpdated)}
          </span>
          <FreshnessStatus dateVerified={dateVerified} />
        </div>
        {aiLink && (
          <p className="mt-4 text-sm">
            <span className="font-semibold text-ink-3">AI workflow </span>
            <Link href={aiLink.href} className="font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent">
              {aiLink.label}
            </Link>
          </p>
        )}
      </header>

      <div className="grid gap-10 pt-8 lg:grid-cols-[13rem_1fr]">
        <nav aria-label="On this sheet" className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
          <p className="text-sm font-semibold">On this sheet</p>
          <ul className="mt-2 space-y-0.5 border-l border-line">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="-ml-px block border-l border-transparent py-1 pl-3 text-ink-2 hover:border-ink hover:text-ink"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-12">
          <div className="-mb-6 empty:hidden">
            <ContextNotice>
              {context === "global"
                ? "Singapore-specific rules and comparison rows on this sheet are hidden."
                : "Singapore guidance is shown alongside the global standards it builds on."}
            </ContextNotice>
          </div>
          {sheet.component && <ComponentQABlock qa={sheet.component} />}
          {sections.map((section) => (
            <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`}>
              <h2 id={`${section.id}-title`} className="border-b-2 border-ink pb-2 text-2xl font-semibold">
                {section.title}
              </h2>
              <div className="pt-4">
                {section.entries?.map((entry) => (
                  <CraftBlock key={entry.id} entry={entry} />
                ))}
                {section.rules.map((rule) => (
                  <RuleBlock key={rule.id} rule={rule} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
