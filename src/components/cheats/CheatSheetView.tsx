"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { sheetAiLinks } from "@/data/ai";
import { useContentContext } from "@/hooks/useLibrary";
import { useViewport } from "@/hooks/useViewport";
import { useToday } from "@/hooks/useToday";
import { formatDate } from "@/lib/dates";
import { sheetStats } from "@/lib/sheets";
import { library } from "@/lib/store";
import type { CheatSheet } from "@/types";
import { ComponentQABlock, CraftBlock } from "../craft/Craft";
import { ContextNotice } from "../layout/ContextSwitch";
import { FreshnessStatus, SourceBadge } from "../source/Source";
import { isSpecificTo } from "../viewport/Scope";
import { ComponentComparisons, FoldableGuide, FoldableNote, RelatedLinks, TestMatrix } from "../viewport/Viewport";
import { ViewportBar } from "../viewport/ViewportBar";
import { InThirty } from "../ui/Scan";
import { RuleBlock } from "./RuleBlock";

// Blocks that follow the sections on one sheet, listed so the side navigation can link to them.
const extras: Record<string, { id: string; title: string }[]> = {
  "responsive-design": [
    { id: "components", title: "Same component, different viewports" },
    { id: "test-matrix", title: "Responsive test matrix" },
    { id: "related", title: "Related" },
  ],
  foldables: [
    { id: "closed-open", title: "Closed and open" },
    { id: "iphone-duo", title: "What Apple says" },
    { id: "recommends", title: "What Shortcut recommends" },
    { id: "testing", title: "Testing across states" },
    { id: "sources", title: "Official sources" },
    { id: "related", title: "Related" },
  ],
};

export function CheatSheetView({ sheet }: { sheet: CheatSheet }) {
  const today = useToday();
  const router = useRouter();
  const { ruleCount, sourceIds, dateVerified } = sheetStats(sheet);
  const context = useContentContext();
  const aiLink = sheetAiLinks[sheet.slug];
  const { viewport, key } = useViewport();
  const more = extras[sheet.slug] ?? [];
  // Choosing a viewport reorders, it never removes: what speaks to that viewport comes first.
  const first = <T extends Parameters<typeof isSpecificTo>[0]>(items: T[]) => [...items.filter((i) => isSpecificTo(i, viewport, key)), ...items.filter((i) => !isSpecificTo(i, viewport, key))];
  // Global context hides region-specific rules. A regional context keeps the
  // global ones, because regional guidance builds on them.
  const sections = sheet.sections
    .map((section) => ({
      ...section,
      entries: section.entries && first(section.entries),
      rules: first(section.rules.filter((rule) => context !== "global" || !rule.context)),
    }))
    .filter((section) => section.rules.length > 0 || (section.entries?.length ?? 0) > 0);

  // The foldable material used to live on the responsive sheet. Old links to it still land in the right place.
  useEffect(() => {
    if (sheet.slug !== "responsive-design") return;
    const moved: Record<string, string> = { "#iphone-duo": "#iphone-duo", "#foldables": "#foldables", "#foldable-guide": "#recommends" };
    const target = moved[window.location.hash];
    // Through the router, so the base path the site is served under is added.
    if (target) router.replace(`/cheat-sheets/foldables/${window.location.search}${target}`);
  }, [sheet.slug, router]);

  // Recording the visit is what lets the library flag later changes.
  useEffect(() => {
    if (today) library.markViewed(sheet.slug, today);
  }, [sheet.slug, today]);

  return (
    <div className="page">
      <header className="border-b border-line pb-8 pt-8 md:pt-10">
        <Link href="/cheat-sheets" className="-my-2 inline-flex items-center gap-1.5 py-2 text-sm text-ink-2 hover:text-ink">
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

      <div className="pt-8">
        <ViewportBar />
      </div>

      <div className="grid gap-10 pt-8 lg:grid-cols-[13rem_1fr]">
        <nav aria-label="On this sheet" className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
          <p className="text-sm font-semibold">On this sheet</p>
          <ul className="mt-2 space-y-0.5 border-l border-line">
            {[...sections, ...more].map((section) => (
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

        <div className="stack-sections">
          <div className="-mb-6 empty:hidden">
            <ContextNotice>
              {context === "global"
                ? "Singapore-specific rules and comparison rows on this sheet are hidden."
                : "Singapore guidance is shown alongside the global standards it builds on."}
            </ContextNotice>
          </div>
          <div className="-mb-6 space-y-3 empty:hidden">
            {viewport !== "all" && !sheet.viewportSensitivity && (
              <p role="status" className="rounded-sm bg-wash px-3 py-2 text-sm text-ink-2">
                <span className="font-semibold text-ink">Mostly universal. </span>
                The guidance on this sheet is the same at every viewport, so nothing here changes with your selection.
              </p>
            )}
            <FoldableNote />
          </div>
          {sheet.inThirty && <InThirty items={sheet.inThirty} more="Shortcut's summary of this sheet. The detail, the reasoning and the sources are below." />}
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
          {sheet.slug === "responsive-design" && (
            <>
              <ComponentComparisons />
              <TestMatrix />
              <RelatedLinks
                links={[
                  { href: "/cheat-sheets/foldables", label: "Foldables & Multi-state Devices" },
                  { href: "/cheat-sheets/spacing", label: "Spacing by viewport" },
                  { href: "/cheat-sheets/typography", label: "Type by viewport" },
                  { href: "/cheat-sheets/layout", label: "Columns and content width" },
                  { href: "/cheat-sheets/navigation", label: "Navigation by viewport" },
                  { href: "/cheat-sheets/tables", label: "Tables by viewport" },
                  { href: "/cheat-sheets/modals", label: "Modal sizes" },
                  { href: "/cheat-sheets/drawers", label: "Drawers" },
                ]}
              />
            </>
          )}
          {sheet.slug === "foldables" && (
            <>
              <FoldableGuide />
              <RelatedLinks
                links={[
                  { href: "/cheat-sheets/responsive-design", label: "Responsive & Viewports" },
                  { href: "/cheat-sheets/responsive-design#test-matrix", label: "Viewport testing" },
                  { href: "/checks/before-you-send-it#responsive", label: "Responsive QA checklist" },
                  { href: "/explorer/foldables", label: "Apple and Google compared" },
                ]}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
