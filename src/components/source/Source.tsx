"use client";

import { getSource } from "@/data/sources";
import { useToday } from "@/hooks/useToday";
import { authorityLegend, citationAuthority, contextLabels, type Authority } from "@/lib/authority";
import { formatDate } from "@/lib/dates";
import { getFreshness, getGuidanceAge, type FreshnessState } from "@/lib/freshness";
import type { Citation, Context, SourceId } from "@/types";
import { ExternalLink } from "../ui/primitives";

/** The coloured chip that identifies where something came from. */
export function SourceBadge({ id }: { id: SourceId }) {
  const source = getSource(id);
  return (
    <span
      title={source.name}
      className="inline-flex h-6 items-center whitespace-nowrap rounded-sm px-2 text-xs font-semibold"
      style={{ color: source.color, backgroundColor: source.tint }}
    >
      {source.short}
    </span>
  );
}

/** Marks region-specific content. Global content carries no marker. */
export function ContextTag({ context }: { context: Context }) {
  if (context === "global") return null;
  return (
    <span className="inline-flex h-6 items-center whitespace-nowrap rounded-sm border border-ink px-2 text-xs font-semibold text-ink">
      {contextLabels[context]}
    </span>
  );
}

/** What kind of weight a piece of guidance carries: standard, control, convention or research. */
export function AuthorityLabel({ authority }: { authority: Authority }) {
  return (
    <span title={authority.meaning} className="whitespace-nowrap text-sm text-ink-2 underline decoration-line-strong decoration-dotted underline-offset-4">
      {authority.label}
    </span>
  );
}

/** Explains the authority labels wherever sources are compared. */
export function AuthorityLegend() {
  return (
    <details className="text-sm text-ink-2">
      <summary className="cursor-pointer font-medium text-ink">These sources do not carry equal weight</summary>
      <dl className="mt-2 space-y-1.5">
        {authorityLegend.map((authority) => (
          <div key={authority.label}>
            <dt className="inline font-semibold text-ink">{authority.label}. </dt>
            <dd className="inline">{authority.meaning}</dd>
          </div>
        ))}
      </dl>
    </details>
  );
}

const dots: Record<FreshnessState, string> = {
  today: "bg-ok",
  recent: "bg-ok",
  dated: "bg-ink-3",
  stale: "bg-warn",
  unverified: "border border-ink-3",
};

const text: Record<FreshnessState, string> = {
  today: "text-ok",
  recent: "text-ink-2",
  dated: "text-ink-2",
  stale: "text-warn",
  unverified: "text-ink-3",
};

/** When Shortcut last checked this against the source. Quiet unless there is a problem. */
export function FreshnessStatus({ dateVerified }: { dateVerified: string | null }) {
  const today = useToday();
  const freshness = getFreshness(dateVerified, today);
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap text-sm ${text[freshness.state]}`}
      title={dateVerified ? `Last verified ${formatDate(dateVerified)}` : undefined}
    >
      <span aria-hidden className={`size-1.5 rounded-full ${dots[freshness.state]}`} />
      {freshness.label}
    </span>
  );
}

/** Small status for content that changed after the reader last opened it. */
export function UpdatedSinceViewed() {
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-medium text-accent">
      <span aria-hidden className="size-1.5 rounded-full bg-accent" />
      Updated since you last viewed
    </span>
  );
}

function CitationRow({ citation }: { citation: Citation }) {
  const today = useToday();
  const age = getGuidanceAge(citation.datePublished, today);
  return (
    <li className="grid gap-x-3 gap-y-1 py-2.5 sm:grid-cols-[5.5rem_1fr]">
      <div>
        <SourceBadge id={citation.sourceId} />
      </div>
      <div className="min-w-0">
        <ExternalLink href={citation.url} className="text-sm">
          {citation.label}
        </ExternalLink>
        <dl className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-0.5 text-sm text-ink-2">
          <div>
            <dt className="sr-only">Authority</dt>
            <dd>
              <AuthorityLabel authority={citationAuthority(citation)} />
            </dd>
          </div>
          {citation.datePublished && (
            <div className="flex gap-1.5">
              <dt className="text-ink-3">Published</dt>
              <dd>
                {formatDate(citation.datePublished)}
                {age !== null && <span className="text-warn"> ({age} years ago)</span>}
              </dd>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">Last verified</dt>
            <dd>
              <FreshnessStatus dateVerified={citation.dateVerified} />
            </dd>
          </div>
        </dl>
      </div>
    </li>
  );
}

/**
 * The credibility block: every source behind a claim, what weight it
 * carries, when it was published, and when Shortcut last checked it.
 */
export function SourceMeta({ citations, heading = "Source" }: { citations: Citation[]; heading?: string }) {
  return (
    <div>
      <p className="text-sm font-semibold text-ink">{citations.length > 1 ? `${heading}s` : heading}</p>
      <ul className="divide-y divide-line">
        {citations.map((citation) => (
          <CitationRow key={citation.url + citation.label} citation={citation} />
        ))}
      </ul>
    </div>
  );
}
