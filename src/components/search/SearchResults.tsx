"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useContentContext } from "@/hooks/useLibrary";
import { contextLabels, contexts } from "@/lib/authority";
import { countHits, hitGroups, splitByContext, type SearchHit, type SearchResults as Results } from "@/lib/search";

/** Region, source and content type, so a result's standing is clear before it is opened. */
function HitMeta({ hit }: { hit: SearchHit }) {
  const parts = [hit.context === "sg" ? contextLabels.sg : null, hit.source, hit.contentType].filter(Boolean);
  if (parts.length === 0) return null;
  return (
    <span className="mt-0.5 flex flex-wrap gap-1">
      {parts.map((part) => (
        <span key={part} className="rounded-sm bg-wash px-1.5 text-xs font-medium text-ink-2 group-hover:bg-paper">
          {part}
        </span>
      ))}
    </span>
  );
}

function Hit({ hit, onNavigate }: { hit: SearchHit; onNavigate?: () => void }) {
  const className = "group flex items-baseline gap-3 rounded-sm px-3 py-2 hover:bg-wash focus-visible:bg-wash";
  const content = (
    <>
      <span className="min-w-0 flex-1">
        <span className="block font-medium text-ink group-hover:text-accent">{hit.title}</span>
        <span className="block truncate text-sm text-ink-2">{hit.detail}</span>
        <HitMeta hit={hit} />
      </span>
      {hit.external && <ArrowUpRight aria-hidden className="size-4 shrink-0 self-center text-ink-3" />}
    </>
  );

  if (hit.external) {
    return (
      <a href={hit.href} target="_blank" rel="noreferrer" className={className} onClick={onNavigate}>
        {content}
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link href={hit.href} className={className} onClick={onNavigate}>
      {content}
    </Link>
  );
}

function Groups({ results, onNavigate }: { results: Results; onNavigate?: () => void }) {
  return (
    <div className="space-y-4">
      {hitGroups.map(({ type, label }) => {
        const hits = results[type];
        if (hits.length === 0) return null;
        return (
          <section key={type} aria-label={label}>
            <h3 className="px-3 pb-1 font-sans text-sm font-semibold tracking-normal text-ink-3">
              {label} <span className="font-normal">({hits.length})</span>
            </h3>
            <ul>
              {hits.map((hit) => (
                <li key={`${hit.type}:${hit.id}`}>
                  <Hit hit={hit} onNavigate={onNavigate} />
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}

/**
 * Search results grouped by type. When the reader is looking at all regions
 * and a query matches more than one, results are split into Global and
 * Singapore blocks so the two can be compared.
 */
export function SearchResults({ results, onNavigate }: { results: Results; onNavigate?: () => void }) {
  const filter = useContentContext();
  const split = splitByContext(results);
  const regions = contexts.filter((context) => countHits(split[context]) > 0);

  if (filter !== "all" || regions.length < 2) return <Groups results={results} onNavigate={onNavigate} />;

  return (
    <div className="space-y-6">
      {regions.map((context) => (
        <section key={context} aria-label={`${contextLabels[context]} results`}>
          <h2 className="mx-3 mb-3 border-b-2 border-ink pb-1 font-display text-lg font-semibold">
            {contextLabels[context]} <span className="font-sans text-sm font-normal text-ink-3">({countHits(split[context])})</span>
          </h2>
          <Groups results={split[context]} onNavigate={onNavigate} />
        </section>
      ))}
    </div>
  );
}
