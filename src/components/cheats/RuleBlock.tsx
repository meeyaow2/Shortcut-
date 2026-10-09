"use client";

import { Fragment } from "react";
import { getSource } from "@/data/sources";
import { useContentContext } from "@/hooks/useLibrary";
import { citationAuthority, contextLabels, contexts, matchesContext } from "@/lib/authority";
import type { Comparison, ComparisonRow, Rule } from "@/types";
import { AuthorityLabel, AuthorityLegend, ContextTag, FreshnessStatus, SourceBadge, SourceMeta } from "../source/Source";
import { ExternalLink } from "../ui/primitives";

// Short values such as "4.5:1" are set large; sentence-length guidance reads as text.
const isFigure = (row: ComparisonRow) => row.value.length <= 12;

/**
 * Shows where sources differ, grouped by region, with the weight each one
 * carries. When rows have a size, the targets are also drawn to scale.
 */
export function ComparisonTable({ comparison }: { comparison: Comparison }) {
  const filter = useContentContext();
  const rows = comparison.rows.filter((row) => matchesContext(getSource(row.sourceId).context, filter));
  const drawable = rows.some((row) => row.size);
  const largest = Math.max(...rows.map((row) => row.size ?? 0));
  const groups = contexts
    .map((context) => ({ context, rows: rows.filter((row) => getSource(row.sourceId).context === context) }))
    .filter((group) => group.rows.length > 0);
  const columns = drawable ? 5 : 4;

  return (
    <figure className="mt-4 overflow-hidden rounded-md border border-line">
      {/* Narrow screens: one stacked block per source, so nothing is squeezed into a tiny table. */}
      <div className="md:hidden">
        <p className="sr-only">{comparison.caption}</p>
        {groups.map((group) => (
          <section key={group.context} aria-label={contextLabels[group.context]}>
            {groups.length > 1 && <h4 className="bg-wash px-4 py-2 text-sm font-semibold">{contextLabels[group.context]}</h4>}
            <ul className="divide-y divide-line border-t border-line first:border-t-0">
              {group.rows.map((row) => (
                <li key={row.label} className="space-y-2 px-4 py-4">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <SourceBadge id={row.sourceId} />
                    <ExternalLink href={row.citation.url} className="text-sm">
                      {row.label}
                    </ExternalLink>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <p>
                      {isFigure(row) ? (
                        <span className="font-display text-2xl font-semibold tabular-nums">{row.value}</span>
                      ) : (
                        <span className="font-medium">{row.value}</span>
                      )}
                      {row.unit && <span className="ml-1.5 text-sm text-ink-2">{row.unit}</span>}
                    </p>
                    {row.size && (
                      <span
                        aria-hidden
                        className="block shrink-0 rounded-[3px] border-2 border-accent bg-accent-wash"
                        style={{ width: row.size, height: row.size }}
                      />
                    )}
                  </div>
                  <p className="text-sm text-ink-2">{row.qualifier}</p>
                  <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
                    <AuthorityLabel authority={citationAuthority(row.citation)} />
                    <FreshnessStatus dateVerified={row.citation.dateVerified} />
                  </p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[40rem] border-collapse text-left">
          <caption className="sr-only">{comparison.caption}</caption>
          <thead>
            <tr className="bg-wash text-sm text-ink-2">
              <th scope="col" className="px-4 py-2 font-semibold">Source</th>
              <th scope="col" className="px-4 py-2 font-semibold">Guidance</th>
              {drawable && <th scope="col" className="whitespace-nowrap px-4 py-2 font-semibold">To scale</th>}
              <th scope="col" className="px-4 py-2 font-semibold">Weight</th>
              <th scope="col" className="px-4 py-2 font-semibold">Checked</th>
            </tr>
          </thead>
          <tbody>
            {groups.map((group) => (
              <Fragment key={group.context}>
                {/* The region heading only earns its row when both regions are present. */}
                {groups.length > 1 && (
                  <tr className="border-t border-line">
                    <th scope="colgroup" colSpan={columns} className="bg-paper px-4 pb-1 pt-3 text-sm font-semibold text-ink">
                      {contextLabels[group.context]}
                    </th>
                  </tr>
                )}
                {group.rows.map((row) => (
                  <tr key={row.label} className="border-t border-line align-middle">
                    <th scope="row" className="w-44 px-4 py-3 font-normal">
                      <div>
                        <SourceBadge id={row.sourceId} />
                      </div>
                      <ExternalLink href={row.citation.url} className="mt-1.5 text-sm">
                        {row.label}
                      </ExternalLink>
                    </th>
                    <td className="min-w-64 px-4 py-3">
                      {isFigure(row) ? (
                        <span className="font-display text-2xl font-semibold tabular-nums">{row.value}</span>
                      ) : (
                        <span className="block font-medium">{row.value}</span>
                      )}
                      {row.unit && <span className="ml-1.5 text-sm text-ink-2">{row.unit}</span>}
                      <span className="block text-sm text-ink-2">{row.qualifier}</span>
                    </td>
                    {drawable && (
                      <td className="px-4 py-3">
                        <span className="flex items-center justify-center" style={{ width: largest, height: largest }}>
                          {row.size ? (
                            <span
                              aria-hidden
                              className="block rounded-[3px] border-2 border-accent bg-accent-wash"
                              style={{ width: row.size, height: row.size }}
                            />
                          ) : (
                            <span className="text-sm text-ink-3">n/a</span>
                          )}
                        </span>
                      </td>
                    )}
                    <td className="px-4 py-3">
                      <AuthorityLabel authority={citationAuthority(row.citation)} />
                    </td>
                    <td className="px-4 py-3">
                      <FreshnessStatus dateVerified={row.citation.dateVerified} />
                    </td>
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="space-y-3 border-t border-line bg-wash px-4 py-3 text-sm text-ink-2">
        {comparison.takeaway && (
          <p className="border-l-2 border-mark pl-3 text-[0.9375rem] text-ink">
            <span className="font-semibold">Shortcut takeaway: </span>
            {comparison.takeaway}
          </p>
        )}
        {comparison.note && <p>{comparison.note}</p>}
        <AuthorityLegend />
      </figcaption>
    </figure>
  );
}

/** One recommendation: the value a designer came for, the rule in a sentence, and its sources. */
export function RuleBlock({ rule }: { rule: Rule }) {
  return (
    <article id={rule.id} className="anchor-target border-t border-line py-6 first:border-t-0 first:pt-2">
      <div className="grid gap-x-8 gap-y-2 md:grid-cols-[9rem_1fr]">
        <p className="font-display text-4xl font-semibold tabular-nums tracking-tight text-ink" aria-hidden={!rule.value}>
          {rule.value}
        </p>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <h3 className="text-xl font-semibold">{rule.title}</h3>
            {rule.context && <ContextTag context={rule.context} />}
          </div>
          <p className="mt-2 max-w-read text-ink-2">{rule.body}</p>
          {rule.comparison && <ComparisonTable comparison={rule.comparison} />}
          {/* Comparison rows link to their own sources, so the list is not repeated. */}
          {!rule.comparison && (
            <div className="mt-4">
              <SourceMeta citations={rule.citations} />
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
