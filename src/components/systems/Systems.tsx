import { ArrowDown } from "lucide-react";
import { EditorialLabel } from "@/components/craft/Craft";
import { SourceMeta } from "@/components/source/Source";
import { Tag } from "@/components/ui/Tag";
import type { UxBreakdown } from "@/data/references";
import type { CaseStudy } from "@/data/systems";
import { formatDate } from "@/lib/dates";
import type { Citation } from "@/types";

/** A sequence drawn top to bottom. Used where the order is the point. */
export function Flow({ steps, emphasise }: { steps: string[]; emphasise?: number }) {
  return (
    <ol>
      {steps.map((step, index) => (
        <li key={step}>
          {index > 0 && (
            <div aria-hidden className="flex h-6 items-center pl-4 text-ink-3">
              <ArrowDown className="size-4" />
            </div>
          )}
          <p className={`rounded-sm border px-3 py-2 ${index === emphasise ? "border-ink bg-mark font-semibold" : "border-line bg-paper"}`}>{step}</p>
        </li>
      ))}
    </ol>
  );
}

/** What an organisation says it did, kept apart from what Shortcut takes from it. */
export function CaseStudyCard({ study, lessonLabel = "The design-system lesson" }: { study: CaseStudy; lessonLabel?: string }) {
  return (
    <article id={study.id} className="anchor-target rounded-md border border-line p-4 sm:p-6">
      <h3 className="text-xl font-semibold">{study.title}</h3>
      <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div>
          <p className="text-sm font-semibold text-ink-3">What they say they did</p>
          <ul className="mt-2 space-y-1.5">
            {study.facts.map((fact) => (
              <li key={fact} className="border-l border-line-strong pl-3 text-ink-2">
                {fact}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <p className="text-sm font-semibold text-ink-3">{lessonLabel}</p>
            <EditorialLabel kind="craft-guidance" />
          </div>
          <p className="mt-2 border-l-2 border-mark pl-3">{study.lesson}</p>
        </div>
      </div>
      <div className="mt-5 border-t border-line pt-3">
        <SourceMeta citations={[study.citation]} heading="Official source" />
      </div>
    </article>
  );
}

/** Past this age an article describes a product that has probably moved on. */
const OLD_AFTER_YEARS = 3;

function Part({ label, children }: { label: string; children: string }) {
  return (
    <div>
      <dt className="text-sm font-semibold text-ink-3">{label}</dt>
      <dd className="mt-0.5">{children}</dd>
    </div>
  );
}

/** A company's own account of a design change, beside Shortcut's reading of it. */
export function Breakdown({ item, organisation }: { item: UxBreakdown; organisation: string }) {
  const published = item.citation.datePublished;
  const old = published !== undefined && Number(item.citation.dateVerified?.slice(0, 4)) - Number(published.slice(0, 4)) >= OLD_AFTER_YEARS;
  return (
    <article id={item.id} className="anchor-target rounded-md border border-line p-4 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3 className="text-xl font-semibold">{item.title}</h3>
        {old && <Tag tone="warn">Published {published.slice(0, 4)}, may be outdated</Tag>}
      </div>
      <div className="mt-4 grid gap-6 lg:grid-cols-2">
        <div>
          <p className="border-b border-line pb-1.5 text-sm font-semibold">What {organisation} says</p>
          <dl className="mt-3 space-y-3 text-ink-2">
            <Part label="Problem">{item.problem}</Part>
            <Part label="Change">{item.change}</Part>
            <Part label="Stated reasoning or result">{item.stated}</Part>
          </dl>
        </div>
        <div>
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-b border-line pb-1.5">
            <p className="text-sm font-semibold">Shortcut&rsquo;s reading</p>
            <EditorialLabel kind="craft-guidance" />
          </div>
          <dl className="mt-3 space-y-3">
            <div className="border-l-2 border-mark pl-3">
              <Part label="UX principle">{item.principle}</Part>
            </div>
            <Part label="Why it fits the context">{item.context}</Part>
          </dl>
        </div>
      </div>
      <div className="mt-5 border-t border-line pt-3">
        <SourceMeta citations={[item.citation]} heading="Official source" />
      </div>
    </article>
  );
}

/** Dated entries from a product's changelog, each with what a designer might notice in it. */
export function PolishList({ items, organisation, citation }: { items: { date: string; what: string; lesson: string }[]; organisation: string; citation: Citation }) {
  return (
    <div>
      <p className="mt-3 max-w-read text-ink-2">
        The left column restates {organisation}&rsquo;s updates page. The right column is Shortcut&rsquo;s reading. This is a list of things to notice, not a
        design to copy.
      </p>
      <div className="mt-2 hidden gap-x-6 border-b border-line py-2 text-sm font-semibold text-ink-3 md:grid md:grid-cols-[8rem_1fr_1fr]">
        <span>Date</span>
        <span>What {organisation} shipped</span>
        <span className="flex flex-wrap items-center justify-between gap-2">
          Worth noticing <EditorialLabel kind="craft-guidance" />
        </span>
      </div>
      <ul className="divide-y divide-line">
        {items.map((item) => (
          <li key={item.date} className="grid gap-x-6 gap-y-1 py-3.5 md:grid-cols-[8rem_1fr_1fr]">
            <span className="text-sm text-ink-3">{formatDate(item.date)}</span>
            <span className="font-medium">{item.what}</span>
            <span className="text-ink-2">{item.lesson}</span>
          </li>
        ))}
      </ul>
      <p className="mt-5 max-w-read border-l-2 border-mark pl-3 text-lg">
        <span className="block text-sm font-semibold text-ink-3">Shortcut takeaway</span>
        Design polish is often hundreds of small decisions. A switcher tidied, a permission prompt reworked, a step removed: none is a redesign, and together
        they are what a product feels like.
      </p>
      <div className="mt-5 border-t border-line pt-3">
        <SourceMeta citations={[citation]} heading="Official source" />
      </div>
    </div>
  );
}
