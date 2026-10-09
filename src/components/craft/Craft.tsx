"use client";

import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import { resolveViewportValue, viewportKeyLabels } from "@/data/viewports";
import { useViewport } from "@/hooks/useViewport";
import { citationAuthority } from "@/lib/authority";
import { formatDate } from "@/lib/dates";
import type { ComponentQA, CraftEntry, EditorialKind, OfficialNote, ScaleStep } from "@/types";
import { AuthorityLabel, SourceBadge } from "../source/Source";
import { ExternalLink } from "../ui/primitives";
import { EntryVisual } from "../visual/EntryVisual";
import { AppliesTo, DependsOn, ViewportTable, appliesTo } from "../viewport/Scope";

const editorial: Record<EditorialKind, { label: string; meaning: string }> = {
  "industry-convention": {
    label: "Industry convention",
    meaning: "A range many shipping products use. No standard or organisation requires it.",
  },
  "craft-guidance": {
    label: "Craft guidance",
    meaning: "Judgement of the kind given in design review. Reasonable designers may disagree.",
  },
};

/**
 * Marks guidance that Shortcut wrote itself. It never shows "Verified",
 * because there is no official page to verify it against.
 */
export function EditorialLabel({ kind, dateReviewed }: { kind: EditorialKind; dateReviewed?: string }) {
  const { label, meaning } = editorial[kind];
  return (
    <span className="inline-flex flex-wrap items-center gap-x-2 text-sm text-ink-2" title={meaning}>
      <span className="inline-flex h-6 items-center whitespace-nowrap rounded-sm border border-dashed border-line-strong px-2 text-xs font-semibold text-ink-2">
        {label}
      </span>
      {dateReviewed && <span className="whitespace-nowrap text-ink-3">Shortcut editorial, reviewed {formatDate(dateReviewed)}</span>}
    </span>
  );
}

/** A short review-style remark. One per entry at most. */
export function MentorNote({ children }: { children: ReactNode }) {
  return (
    <p className="border-l-2 border-mark pl-3">
      <span className="block text-sm font-semibold text-ink-3">Senior designer note</span>
      <span className="font-medium">“{children}”</span>
    </p>
  );
}

/** The reusable "Why?" interaction: reason first, then when to do something else. */
export function Why({ label = "Why?", children }: { label?: string; children: ReactNode }) {
  return (
    <details className="group rounded-sm border border-line">
      <summary className="flex min-h-11 md:min-h-10 cursor-pointer list-none items-center justify-between gap-2 px-3 text-[0.9375rem] font-medium hover:bg-wash [&::-webkit-details-marker]:hidden">
        {label}
        <ChevronDown aria-hidden className="size-4 text-ink-3 transition-transform group-open:rotate-180" />
      </summary>
      <div className="space-y-3 border-t border-line px-3 py-3 text-ink-2">{children}</div>
    </details>
  );
}

function BulletList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-ink-3">{title}</h4>
      <ul className="mt-1.5 space-y-1">
        {items.map((item) => (
          <li key={item} className="border-l border-line-strong pl-3 text-ink-2">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ScaleTable({ steps }: { steps: ScaleStep[] }) {
  return (
    <dl className="divide-y divide-line rounded-md border border-line">
      {steps.map((step) => (
        <div key={step.value} className="grid gap-x-4 gap-y-0.5 px-4 py-2.5 sm:grid-cols-[7rem_1fr]">
          <dt className="font-display text-lg font-semibold tabular-nums tracking-tight">{step.value}</dt>
          <dd>
            <span className="font-medium">{step.label}. </span>
            <span className="text-ink-2">{step.use}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** What official sources say on the same subject. Kept visibly apart from the editorial text above it. */
export function OfficialGuidance({ notes }: { notes: OfficialNote[] }) {
  const { viewport } = useViewport();
  return (
    <div>
      <h4 className="text-sm font-semibold text-ink">Official guidance</h4>
      <ul className="mt-1 divide-y divide-line">
        {notes.map((note) => (
          <li key={note.citation.url + note.text} className="grid gap-x-3 gap-y-1 py-2.5 sm:grid-cols-[5.5rem_1fr]">
            <div>
              <SourceBadge id={note.citation.sourceId} />
            </div>
            <div className="min-w-0">
              <p>{note.text}</p>
              <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-0.5 text-sm">
                <ExternalLink href={note.citation.url}>{note.citation.label}</ExternalLink>
                <AuthorityLabel authority={citationAuthority(note.citation)} />
              </p>
              {/* A source with nothing particular to say about the chosen viewport stays, and says so. */}
              {(viewport !== "all" || note.viewportApplicability || note.input) && (
                <p className="mt-0.5 text-sm text-ink-3">
                  Applies to {appliesTo(note).toLowerCase()}
                  {viewport !== "all" && !note.viewportApplicability && !note.input && ". No viewport-specific value defined"}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** One editorial entry: a starting point, the range, the reasoning, and what official sources add. */
export function CraftBlock({ entry }: { entry: CraftEntry }) {
  const { key } = useViewport();
  const reference = key ? resolveViewportValue(entry.viewportValues, key) : undefined;
  // A short value sits in the margin as a figure; a sentence-length one reads better in the text column.
  const figure = reference && reference.value.length <= 22;
  const referenceLabel = key ? viewportKeyLabels[key] + " reference" : "";
  const borrowed = reference?.from ? "Same as " + viewportKeyLabels[reference.from].toLowerCase() + (key?.startsWith("foldable") ? ", Shortcut’s reading" : "") : undefined;
  return (
    <article id={entry.id} className="anchor-target border-t border-line py-6 first:border-t-0 first:pt-2">
      <div className="grid gap-x-8 gap-y-3 md:grid-cols-[9rem_1fr]">
        <div>
          {reference && figure ? (
            <>
              <p className="text-sm font-semibold text-ink-3">{referenceLabel}</p>
              <p className="font-display text-2xl font-semibold leading-tight tracking-tight">{reference.value}</p>
              {borrowed && <p className="mt-1 text-sm text-ink-3">{borrowed}</p>}
            </>
          ) : (
            entry.safeStartingPoint &&
            !reference && (
              <>
                <p className="text-sm font-semibold text-ink-3">Safe starting point</p>
                <p className="font-display text-2xl font-semibold leading-tight tracking-tight">{entry.safeStartingPoint}</p>
              </>
            )
          )}
        </div>
        <div className="min-w-0 space-y-4">
          <div>
            <h3 className="text-xl font-semibold">{entry.title}</h3>
            <div className="mt-1.5">
              <EditorialLabel kind={entry.kind} dateReviewed={entry.dateReviewed} />
            </div>
            <div className="mt-1">
              <AppliesTo scope={entry} values={entry.viewportValues} />
            </div>
          </div>
          {reference && !figure && (
            <div className="border-l-2 border-mark pl-3">
              <p className="text-sm font-semibold text-ink-3">{referenceLabel}</p>
              <p className="text-lg font-medium">{reference.value}</p>
              {borrowed && <p className="text-sm text-ink-3">{borrowed}</p>}
            </div>
          )}
          <p className="max-w-read text-ink-2">
            {reference && <span className="font-semibold text-ink">General guidance. </span>}
            {entry.summary}
          </p>
          <EntryVisual entry={entry} />
          {entry.viewportValues &&
            (key ? (
              <details className="group rounded-sm border border-line">
                <summary className="flex min-h-11 md:min-h-10 cursor-pointer list-none items-center justify-between gap-2 px-3 text-[0.9375rem] font-medium hover:bg-wash [&::-webkit-details-marker]:hidden">
                  Compare all viewports
                  <ChevronDown aria-hidden className="size-4 text-ink-3 transition-transform group-open:rotate-180" />
                </summary>
                <div className="border-t border-line p-3">
                  <ViewportTable values={entry.viewportValues} highlight={key} />
                </div>
              </details>
            ) : (
              <ViewportTable values={entry.viewportValues} />
            ))}
          {entry.viewportValues && <DependsOn items={entry.dependsOn} />}
          {entry.commonRange && (
            <p>
              <span className="text-sm font-semibold text-ink-3">Common range </span>
              <span className="font-medium">{entry.commonRange}</span>
            </p>
          )}
          {entry.scale && <ScaleTable steps={entry.scale} />}
          <Why>
            <p>{entry.why}</p>
            {entry.whenToDeviate && (
              <p>
                <span className="font-semibold text-ink">When to deviate. </span>
                {entry.whenToDeviate}
              </p>
            )}
          </Why>
          {(entry.whenToUse || entry.whenNotToUse) && (
            <div className="grid gap-4 sm:grid-cols-2">
              {entry.whenToUse && <BulletList title="When to use it" items={entry.whenToUse} />}
              {entry.whenNotToUse && <BulletList title="When not to" items={entry.whenNotToUse} />}
            </div>
          )}
          {entry.commonMistakes && <BulletList title="Common mistakes" items={entry.commonMistakes} />}
          {entry.mentorNote && <MentorNote>{entry.mentorNote}</MentorNote>}
          {entry.aiWarning && (
            <p className="rounded-sm bg-warn-wash px-3 py-2 text-[0.9375rem] text-warn">
              <span className="font-semibold">AI-look warning. </span>
              {entry.aiWarning}
            </p>
          )}
          {entry.official ? (
            <OfficialGuidance notes={entry.official} />
          ) : (
            <p className="text-sm text-ink-3">No official source Shortcut tracks sets a rule for this. It is a judgement call.</p>
          )}
        </div>
      </div>
    </article>
  );
}

function QAList({ title, items, ordered = false }: { title: string; items: string[]; ordered?: boolean }) {
  return (
    <div>
      <h3 className="font-sans text-sm font-semibold tracking-normal text-ink-3">{title}</h3>
      <ul className={`mt-1.5 ${ordered ? "space-y-1" : "flex flex-wrap gap-1.5"}`}>
        {items.map((item) =>
          ordered ? (
            <li key={item} className="border-l border-line-strong pl-3 text-ink-2">
              {item}
            </li>
          ) : (
            <li key={item} className="rounded-sm bg-wash px-2 py-0.5 text-sm text-ink-2">
              {item}
            </li>
          ),
        )}
      </ul>
    </div>
  );
}

/** The at-a-glance QA block at the top of a component cheat sheet. */
export function ComponentQABlock({ qa }: { qa: ComponentQA }) {
  return (
    <section aria-labelledby="component-qa" className="rounded-md border border-line p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 id="component-qa" className="text-xl font-semibold">
          Component QA
        </h2>
        <EditorialLabel kind="craft-guidance" />
      </div>
      <div className="mt-4 grid gap-5 md:grid-cols-2">
        <QAList title="Anatomy" items={qa.anatomy} />
        <QAList title="States to design" items={qa.states} />
        <QAList title="Edge cases" items={qa.edgeCases} ordered />
        <QAList title="Checklist" items={qa.checklist} ordered />
      </div>
    </section>
  );
}
