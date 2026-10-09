"use client";

import Link from "next/link";
import {
  componentComparisons,
  continuityItems,
  duoApple,
  duoQuestions,
  foldComparison,
  foldableDevices,
  foldableTopics,
  pixelsNote,
  testFoldStates,
  testWidths,
  viewportCite,
  viewportKeyLabels,
} from "@/data/viewports";
import { useViewport } from "@/hooks/useViewport";
import type { FoldState } from "@/types";
import { EditorialLabel } from "../craft/Craft";
import { SourceMeta } from "../source/Source";
import { FoldDemo, FoldSchematic } from "../visual/ViewportPreviews";

const sectionTitle = "border-b-2 border-ink pb-2 text-2xl font-semibold";

function DisplayFacts({ mode }: { mode?: FoldState }) {
  const device = foldableDevices[0];
  const displays = device.displays.filter((d) => !mode || d.mode === mode);
  return (
    <dl className={`grid gap-4 ${displays.length > 1 ? "sm:grid-cols-2" : ""}`}>
      {displays.map((display) => (
        <div key={display.mode} className="rounded-md border border-line p-4">
          <dt className="font-display text-lg font-semibold tracking-tight">
            {device.name}, {display.mode}
          </dt>
          <dd className="mt-1 text-ink-2">
            {display.name}. {display.size}, {display.resolution}.
          </dd>
          <dd className="mt-2">
            <span className="text-sm font-semibold text-ink-3">Apple&rsquo;s size class </span>
            <span className="font-medium">{display.sizeClass}</span>
          </dd>
          <dd className="mt-2 border-l-2 border-mark pl-3">
            <span className="block text-sm font-semibold text-ink-3">Shortcut&rsquo;s reading</span>
            {display.treatAs}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** Shown on any sheet while Foldable is selected: the device facts, and what they do not tell you. */
export function FoldableNote() {
  const { viewport, foldState } = useViewport();
  if (viewport !== "foldable") return null;
  const device = foldableDevices[0];
  return (
    <aside aria-label={`${device.name}, ${foldState}`} className="space-y-3 rounded-md bg-wash p-4">
      <div className="flex flex-wrap items-start gap-x-6 gap-y-4">
        <FoldSchematic state={foldState} />
        <div className="min-w-[14rem] flex-1">
          <DisplayFacts mode={foldState} />
        </div>
      </div>
      <p className="text-sm text-ink-2">{pixelsNote}</p>
      <p className="text-sm text-ink-2">
        Where an entry has no value of its own for a folding screen, it shows the {foldState === "closed" ? "mobile" : "tablet"} one and says so.{" "}
        <Link href="/cheat-sheets/responsive-design#iphone-duo" className="font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent">
          Designing for {device.name}
        </Link>
      </p>
      <SourceMeta citations={[device.citation, viewportCite.duoHig]} heading="Official sources" />
    </aside>
  );
}

/** The foldable reference: topics, the iPhone Duo in each state, continuity, and how each subject reads. */
export function FoldableGuide() {
  const device = foldableDevices[0];
  return (
    <>
      <section id="foldable-guide" aria-labelledby="foldable-guide-title">
        <div className="flex flex-wrap items-end justify-between gap-2 border-b-2 border-ink pb-2">
          <h2 id="foldable-guide-title" className="text-2xl font-semibold">
            Foldable reference
          </h2>
          <EditorialLabel kind="craft-guidance" />
        </div>
        <dl className="mt-2 divide-y divide-line">
          {foldableTopics.map((topic) => (
            <div key={topic.title} className="grid gap-x-6 gap-y-0.5 py-3 sm:grid-cols-[12rem_1fr]">
              <dt className="font-semibold">{topic.title}</dt>
              <dd className="text-ink-2">{topic.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="iphone-duo" aria-labelledby="iphone-duo-title" className="anchor-target">
        <h2 id="iphone-duo-title" className={sectionTitle}>
          Designing for {device.name}
        </h2>
        <div className="space-y-5 pt-5">
          <FoldDemo />
          <DisplayFacts />
          <p className="max-w-read text-ink-2">{pixelsNote}</p>
          <SourceMeta citations={[device.citation]} heading="Display specifications" />
          <div>
            <h3 className="text-lg font-semibold">What Apple says</h3>
            <ul className="mt-2 space-y-1.5">
              {duoApple.map((item) => (
                <li key={item} className="border-l border-line-strong pl-3 text-ink-2">
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-3">
              <SourceMeta citations={[viewportCite.duoHig]} heading="Official source" />
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line pt-4">
            <p className="max-w-read text-sm text-ink-2">
              From here down is Shortcut&rsquo;s, not Apple&rsquo;s: questions to ask of your own design in each state.
            </p>
            <EditorialLabel kind="craft-guidance" />
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {(["closed", "open"] as const).map((mode) => (
              <div key={mode}>
                <h3 className="text-lg font-semibold capitalize">{mode}</h3>
                <p className="mt-1 text-ink-2">{duoQuestions[mode].lead}</p>
                <ul className="mt-2 space-y-1">
                  {duoQuestions[mode].items.map((item) => (
                    <li key={item} className="border-l border-line-strong pl-3">
                      {item}
                    </li>
                  ))}
                </ul>
                {duoQuestions[mode].caution && <p className="mt-3 border-l-2 border-mark pl-3 font-medium">{duoQuestions[mode].caution}</p>}
              </div>
            ))}
          </div>
          <div>
            <h3 className="text-lg font-semibold">Continuity</h3>
            <p className="mt-1 max-w-read text-ink-2">
              Someone starts a task on the outer display, then opens the device. It should not feel like arriving in a different app. Keep:
            </p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {continuityItems.map((item) => (
                <li key={item} className="rounded-sm bg-wash px-2 py-0.5 text-sm text-ink-2">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">How each subject reads, closed and open</h3>
            <dl className="mt-2 divide-y divide-line rounded-md border border-line">
              {foldComparison.map((row) => (
                <div key={row.subject} className="grid gap-x-4 gap-y-1 px-4 py-3 md:grid-cols-[8rem_1fr_1fr]">
                  <dt className="font-semibold">{row.subject}</dt>
                  <dd>
                    <span className="text-sm font-semibold text-ink-3 md:hidden">Closed. </span>
                    {row.closed}
                  </dd>
                  <dd>
                    <span className="text-sm font-semibold text-ink-3 md:hidden">Open. </span>
                    {row.open}
                  </dd>
                  {row.apple && (
                    <dd className="text-sm text-ink-2 md:col-span-2 md:col-start-2">
                      <span className="font-semibold text-ink-3">Apple: </span>
                      {row.apple}
                    </dd>
                  )}
                </div>
              ))}
            </dl>
            <p className="mt-2 text-sm text-ink-3">Closed is the middle column and open the right, from tablet width up. The rows are Shortcut&rsquo;s reading; the Apple line restates Apple&rsquo;s page.</p>
          </div>
        </div>
      </section>
    </>
  );
}

/** One component at three widths. On a phone each component stacks; wider, it is a row. */
export function ComponentComparisons() {
  return (
    <section id="components" aria-labelledby="components-title">
      <div className="flex flex-wrap items-end justify-between gap-2 border-b-2 border-ink pb-2">
        <h2 id="components-title" className="text-2xl font-semibold">
          Same component, different viewports
        </h2>
        <EditorialLabel kind="industry-convention" />
      </div>
      <p className="mt-3 max-w-read text-ink-2">Common ways a component changes with the space available. Patterns to choose from, not rules.</p>
      <div className="mt-3 hidden gap-x-6 border-b border-line pb-2 text-sm font-semibold text-ink-3 md:grid md:grid-cols-[8rem_1fr_1fr_1fr]">
        <span>Component</span>
        <span>Mobile</span>
        <span>Tablet</span>
        <span>Desktop</span>
      </div>
      <ul className="divide-y divide-line">
        {componentComparisons.map((row) => (
          <li key={row.component} className="grid gap-x-6 gap-y-2 py-3.5 md:grid-cols-[8rem_1fr_1fr_1fr]">
            <p className="font-semibold">
              {row.sheet ? (
                <Link href={`/cheat-sheets/${row.sheet}`} className="underline decoration-line-strong underline-offset-4 hover:decoration-ink">
                  {row.component}
                </Link>
              ) : (
                row.component
              )}
            </p>
            {(["mobile", "tablet", "desktop"] as const).map((key) => (
              <p key={key} className="text-ink-2">
                <span className="block text-sm font-semibold text-ink-3 md:hidden">{viewportKeyLabels[key]}</span>
                {row[key]}
              </p>
            ))}
          </li>
        ))}
      </ul>
    </section>
  );
}

/** The widths to open a design at, and the reminder that the breaks are between them. */
export function TestMatrix() {
  return (
    <section id="test-matrix" aria-labelledby="test-matrix-title">
      <div className="flex flex-wrap items-end justify-between gap-2 border-b-2 border-ink pb-2">
        <h2 id="test-matrix-title" className="text-2xl font-semibold">
          Responsive test matrix
        </h2>
        <EditorialLabel kind="craft-guidance" />
      </div>
      <p className="mt-3 max-w-read border-l-2 border-mark pl-3 font-medium">
        Do not only check these exact widths. Drag through the widths between them and look for the point where the layout actually breaks.
      </p>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {testWidths.map((item) => (
          <li key={item.width} className="flex items-baseline gap-3 rounded-sm border border-line px-3 py-2">
            <span className="w-14 shrink-0 font-display text-lg font-semibold tabular-nums tracking-tight">{item.width}</span>
            <span className="text-sm text-ink-2">{item.note}</span>
          </li>
        ))}
        {testFoldStates.map((state) => (
          <li key={state} className="rounded-sm border border-line px-3 py-2 font-medium">
            {state}
          </li>
        ))}
      </ul>
      <p className="mt-3 text-sm text-ink-2">
        Reference widths in CSS pixels, not required breakpoints.{" "}
        <Link href="/checks/before-you-send-it#responsive" className="font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent">
          Tick them off in Before You Send It
        </Link>
      </p>
      <div className="mt-3">
        <SourceMeta citations={[viewportCite.androidSizeClasses]} heading="Related official guidance" />
      </div>
    </section>
  );
}
