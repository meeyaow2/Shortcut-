"use client";

import { ChevronDown } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { getSource, sources } from "@/data/sources";
import { updateCategories, updates } from "@/data/updates";
import { useContentContext } from "@/hooks/useLibrary";
import { useToday } from "@/hooks/useToday";
import { matchesContext } from "@/lib/authority";
import { daysBetween } from "@/lib/dates";
import { ContextNotice } from "../layout/ContextSwitch";
import { Button } from "../ui/Button";
import { EmptyState, FilterGroup } from "../ui/primitives";
import { UpdateCard } from "./UpdateCard";

const ALL = "all";

const categoryOptions = [{ value: ALL, label: "All" }, ...updateCategories.map((c) => ({ value: c as string, label: c as string }))];
const sourceOptions = [{ value: ALL, label: "All" }, ...sources.map((s) => ({ value: s.id as string, label: s.short }))];
const timeOptions = [
  { value: "today", label: "Today" },
  { value: "week", label: "This week" },
  { value: "month", label: "This month" },
  { value: ALL, label: "All" },
];
const timeWindows: Record<string, number> = { today: 0, week: 7, month: 30 };

const sorted = [...updates].sort((a, b) => b.datePublished.localeCompare(a.datePublished));

export function UpdatesView() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const today = useToday();
  const context = useContentContext();

  // Filters live in the URL so a filtered feed can be shared or bookmarked.
  const category = params.get("category") ?? ALL;
  const source = params.get("source") ?? ALL;
  const time = params.get("time") ?? ALL;
  const activeCount = [category, source, time].filter((value) => value !== ALL).length;
  const filtered = activeCount > 0;
  const [filtersOpen, setFiltersOpen] = useState(false);

  function setFilter(name: string, value: string) {
    const next = new URLSearchParams(params);
    if (value === ALL) next.delete(name);
    else next.set(name, value);
    const query = next.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  const visible = sorted.filter((update) => {
    if (!matchesContext(getSource(update.sourceId).context, context)) return false;
    if (category !== ALL && update.category !== category) return false;
    if (source !== ALL && update.sourceId !== source) return false;
    if (time !== ALL && today) return daysBetween(update.datePublished, today) <= timeWindows[time];
    return true;
  });

  return (
    <div className="grid gap-6 pt-6 lg:grid-cols-[15rem_1fr] lg:gap-10 lg:pt-8">
      <aside aria-label="Filters" className="lg:sticky lg:top-24 lg:self-start">
        {/* Below lg the filters sit behind a button, so the feed is not pushed down the page. */}
        <button
          type="button"
          aria-expanded={filtersOpen}
          aria-controls="update-filters"
          onClick={() => setFiltersOpen((open) => !open)}
          className="flex min-h-11 w-full items-center justify-between rounded-sm border border-line-strong px-3 font-medium hover:border-ink lg:hidden"
        >
          <span>
            Filters
            {activeCount > 0 && <span className="ml-2 rounded-full bg-ink px-2 py-0.5 text-xs text-paper">{activeCount}</span>}
          </span>
          <ChevronDown aria-hidden className={`size-4 transition-transform ${filtersOpen ? "rotate-180" : ""}`} />
        </button>
        <div id="update-filters" className={`space-y-6 pt-5 lg:block lg:pt-0 ${filtersOpen ? "block" : "hidden"}`}>
          <FilterGroup legend="Time" options={timeOptions} value={time} onChange={(v) => setFilter("time", v)} />
          <FilterGroup legend="Category" options={categoryOptions} value={category} onChange={(v) => setFilter("category", v)} />
          <FilterGroup legend="Source" options={sourceOptions} value={source} onChange={(v) => setFilter("source", v)} />
        </div>
      </aside>

      <div>
        <div className="mb-4 empty:hidden">
          <ContextNotice>Updates from sources in other regions are hidden.</ContextNotice>
        </div>
        <div className="mb-4 flex min-h-8 items-center justify-between gap-4">
          <p role="status" className="text-sm text-ink-2">
            {visible.length} of {updates.length} updates
          </p>
          {filtered && (
            <Button variant="ghost" size="sm" onClick={() => router.replace(pathname, { scroll: false })}>
              Clear filters
            </Button>
          )}
        </div>

        {visible.length > 0 ? (
          <div className="space-y-5">
            {visible.map((update) => (
              <UpdateCard key={update.id} update={update} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No updates match these filters"
            action={<Button onClick={() => router.replace(pathname, { scroll: false })}>Clear filters</Button>}
          >
            {time === "today"
              ? "None of the sources Shortcut tracks has published a change today. Widen the time range to see recent ones."
              : "Shortcut only lists changes it has checked against the source, so some combinations are empty. Try a wider time range or another source."}
          </EmptyState>
        )}
      </div>
    </div>
  );
}
