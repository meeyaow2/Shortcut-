"use client";

import { ArrowDown, Check } from "lucide-react";
import { useState } from "react";
import { MAX_COMPARED, explorerSystems, sgdsTokenLayers } from "@/data/explorer";
import { getSource } from "@/data/sources";
import { citationAuthority } from "@/lib/authority";
import type { ExplorerCell, ExplorerTopic, SourceId } from "@/types";
import { AuthorityLabel, AuthorityLegend, ContextTag, FreshnessStatus, SourceBadge } from "../source/Source";
import { EditorialLabel } from "../craft/Craft";
import { ExternalLink } from "../ui/primitives";

function SystemColumn({ systemId, cell, selected }: { systemId: SourceId; cell?: ExplorerCell; selected: boolean }) {
  const source = getSource(systemId);
  return (
    // On narrow screens only the selected system shows; from md up all of them do.
    <article className={`flex-col rounded-md border border-line p-4 sm:p-5 md:flex ${selected ? "flex" : "hidden"}`}>
      <div className="flex flex-wrap items-center gap-1.5">
        <SourceBadge id={systemId} />
        <ContextTag context={source.context} />
      </div>
      {cell ? (
        <>
          <h3 className="mt-3 text-lg font-semibold">{cell.headline}</h3>
          <ul className="mt-3 flex-1 space-y-2 text-ink-2">
            {cell.points.map((point) => (
              <li key={point} className="border-l border-line-strong pl-3">
                {point}
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-1 border-t border-line pt-3 text-sm">
            <ExternalLink href={cell.citation.url}>{cell.citation.label}</ExternalLink>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <AuthorityLabel authority={citationAuthority(cell.citation)} />
              <FreshnessStatus dateVerified={cell.citation.dateVerified} />
            </div>
          </div>
        </>
      ) : (
        <p className="mt-3 text-ink-2">Not yet read for this system.</p>
      )}
    </article>
  );
}

function ReadingList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="font-sans text-sm font-semibold tracking-normal text-ink-3">{title}</h3>
      <ul className="mt-2 space-y-2">
        {items.map((item) => (
          <li key={item} className="border-l border-line-strong pl-3">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** One topic, up to four design systems side by side, then Shortcut's synthesis. */
export function TopicComparison({ topic }: { topic: ExplorerTopic }) {
  // Only systems Shortcut has read on this topic can be compared.
  const available = explorerSystems.filter((id) => topic.cells?.[id]);
  const unread = explorerSystems.filter((id) => !topic.cells?.[id]);
  const [chosen, setChosen] = useState<SourceId[]>(available.slice(0, MAX_COMPARED));
  const [selected, setSelected] = useState<SourceId>(chosen[0]);

  const shown = available.filter((id) => chosen.includes(id));
  const active = shown.includes(selected) ? selected : shown[0];
  const full = chosen.length >= MAX_COMPARED;

  function toggle(id: SourceId) {
    setChosen((current) => {
      if (current.includes(id)) return current.length > 1 ? current.filter((c) => c !== id) : current;
      return current.length < MAX_COMPARED ? [...current, id] : current;
    });
  }

  return (
    <div>
      {available.length > MAX_COMPARED && (
        <fieldset className="mb-5">
          <legend className="text-sm font-semibold">
            Systems to compare <span className="font-normal text-ink-2">(up to {MAX_COMPARED})</span>
          </legend>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {available.map((id) => {
              const on = chosen.includes(id);
              return (
                <button
                  key={id}
                  type="button"
                  aria-pressed={on}
                  // The last system stays on, and a fifth cannot be added.
                  disabled={on ? chosen.length === 1 : full}
                  onClick={() => toggle(id)}
                  className={`inline-flex min-h-11 items-center gap-1.5 rounded-sm border px-3 text-sm transition-colors md:min-h-9 ${
                    on ? "border-ink bg-ink font-medium text-paper" : "border-line-strong text-ink-2 hover:border-ink hover:text-ink disabled:border-line disabled:text-ink-3"
                  }`}
                >
                  {on && <Check aria-hidden className="size-3.5" />}
                  {getSource(id).short}
                </button>
              );
            })}
          </div>
          <p aria-live="polite" className="mt-2 text-sm text-ink-2">
            {full ? `Showing ${MAX_COMPARED}. Turn one off to add another.` : `Showing ${chosen.length} of ${available.length}.`}
          </p>
        </fieldset>
      )}

      {/* Several narrow columns are unreadable on a phone, so there the reader switches between the chosen systems. */}
      {shown.length > 1 && (
        <fieldset className="mb-4 md:hidden">
          <legend className="mb-2 text-sm font-semibold">Show system</legend>
          <div className="grid rounded-sm border border-line-strong p-0.5" style={{ gridTemplateColumns: `repeat(${shown.length}, minmax(0, 1fr))` }}>
            {shown.map((id) => (
              <button
                key={id}
                type="button"
                aria-pressed={id === active}
                onClick={() => setSelected(id)}
                className={`min-h-11 truncate rounded-[3px] px-1 text-sm transition-colors ${
                  id === active ? "bg-ink font-medium text-paper" : "text-ink-2 hover:text-ink"
                }`}
              >
                {getSource(id).short}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      <div className={`grid gap-4 md:grid-cols-2 ${shown.length > 3 ? "xl:grid-cols-4" : shown.length === 3 ? "xl:grid-cols-3" : ""}`}>
        {shown.map((id) => (
          <SystemColumn key={id} systemId={id} cell={topic.cells?.[id]} selected={id === active} />
        ))}
      </div>

      {unread.length > 0 && (
        <p className="mt-4 text-sm text-ink-2">
          <span className="font-semibold text-ink-3">Not yet read on this topic: </span>
          {unread.map((id) => getSource(id).short).join(", ")}. Nothing is shown for a system until its own page has been read.
        </p>
      )}

      {topic.takeaway && (
        <div className="mt-8 max-w-3xl border-l-2 border-mark pl-4">
          <h2 className="font-sans text-sm font-semibold tracking-normal text-ink-3">Shortcut takeaway</h2>
          <p className="mt-1 text-lg">{topic.takeaway}</p>
        </div>
      )}

      {(topic.themes || topic.differences) && (
        <section aria-labelledby="across" className="mt-10">
          <div className="flex flex-wrap items-end justify-between gap-2 border-b-2 border-ink pb-2">
            <h2 id="across" className="text-2xl font-semibold">
              Across the systems
            </h2>
            <EditorialLabel kind="craft-guidance" />
          </div>
          <p className="mt-3 max-w-read text-sm text-ink-2">
            Shortcut&rsquo;s reading of the columns above. It covers every system read on this topic, not only the ones
            showing, and is not a rule from any of them.
          </p>
          <div className="mt-5 grid gap-8 md:grid-cols-2">
            {topic.themes && <ReadingList title="Common themes" items={topic.themes} />}
            {topic.differences && <ReadingList title="Differences" items={topic.differences} />}
          </div>
        </section>
      )}

      <div className="mt-8 max-w-3xl">
        <AuthorityLegend />
      </div>
    </div>
  );
}

/**
 * The SGDS token layers drawn as a ladder, from hard-coded values down to
 * component-specific tokens, with when to use each beside it. The two layers
 * SGDS tells designers to work in are emphasised.
 */
export function TokenLadder() {
  return (
    <section aria-labelledby="token-ladder" className="mb-12">
      <h2 id="token-ladder" className="text-2xl font-semibold">
        SGDS token architecture
      </h2>
      <p className="mt-2 max-w-read text-ink-2">
        Each layer points at the one above it. The layer description is SGDS&rsquo;s wording; &ldquo;when to use
        it&rdquo; is Shortcut&rsquo;s reading unless it says SGDS.
      </p>
      <ol className="mt-6 max-w-3xl">
        {sgdsTokenLayers.map((layer, index) => {
          const everyday = index === 2 || index === 3;
          return (
            <li key={layer.name}>
              {index > 0 && (
                <div aria-hidden className="flex h-8 items-center pl-6 text-ink-3">
                  <ArrowDown className="size-4" />
                </div>
              )}
              <div
                className={`grid gap-x-6 gap-y-2 rounded-md border p-4 sm:grid-cols-[15rem_1fr] ${
                  everyday ? "border-ink bg-paper" : "border-line bg-wash"
                }`}
              >
                <div>
                  <p className="font-display text-lg font-semibold tracking-tight">{layer.name}</p>
                  <p className="text-sm text-ink-2">{layer.example}</p>
                  {everyday && <p className="mt-1.5 inline-block rounded-sm bg-mark px-1.5 text-xs font-semibold">Where you work day to day</p>}
                </div>
                <dl className="space-y-1.5 text-[0.9375rem]">
                  <div>
                    <dt className="inline font-semibold text-ink-3">What it is. </dt>
                    <dd className="inline text-ink-2">{layer.official}</dd>
                  </div>
                  <div>
                    <dt className="inline font-semibold text-ink-3">When to use it. </dt>
                    <dd className="inline">{layer.use}</dd>
                  </div>
                </dl>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
