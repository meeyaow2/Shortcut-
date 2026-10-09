"use client";

import { getSource } from "@/data/sources";
import { getAuthority } from "@/lib/authority";
import { formatDate } from "@/lib/dates";
import type { Guidance } from "@/types";
import { AuthorityLabel, ContextTag, FreshnessStatus, SourceBadge, SourceMeta } from "../source/Source";
import { Tag } from "../ui/Tag";
import { ExternalLink } from "../ui/primitives";

function Row({ label, note, children }: { label: string; note?: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1 py-3 sm:grid-cols-[10rem_1fr] sm:gap-4">
      <dt className="text-sm font-semibold text-ink-3">
        {label}
        {note && <span className="block font-normal">{note}</span>}
      </dt>
      <dd className="min-w-0">{children}</dd>
    </div>
  );
}

/**
 * A structured record of one piece of official guidance. Reads top to bottom
 * as: what the source says, what it means, what to do, an example, and the
 * way back to the original. Official wording and Shortcut's reading are
 * always labelled apart.
 */
export function GuidanceCard({ guidance: g }: { guidance: Guidance }) {
  const source = getSource(g.sourceId);
  return (
    <article id={g.id} className="anchor-target rounded-md border border-line p-4 sm:p-5 md:p-6">
      <div className="flex flex-wrap items-center gap-1.5">
        <SourceBadge id={g.sourceId} />
        <ContextTag context={g.context} />
        <Tag tone="outline">{g.contentType}</Tag>
        <span className="ml-1">
          <AuthorityLabel authority={getAuthority(g.sourceType, g.requirementLevel)} />
        </span>
      </div>

      <div className="mt-3 flex flex-wrap items-baseline gap-x-4">
        {g.controlId && <p className="font-display text-3xl font-semibold tracking-tight">{g.controlId}</p>}
        <h3 className="text-2xl font-semibold">{g.title}</h3>
      </div>

      <dl className="mt-3 divide-y divide-line border-y border-line">
        <Row label={g.controlId ? "Requirement" : "Official guidance"} note={`${source.short}'s wording`}>
          <p className="font-medium">{g.officialText}</p>
          {g.exceptions && <p className="mt-1.5 text-sm text-ink-2">Exception: {g.exceptions}</p>}
        </Row>
        {g.officialRecommendation && (
          <Row label="Official recommendation" note={`${source.short}'s wording`}>
            <p className="text-ink-2">{g.officialRecommendation}</p>
          </Row>
        )}
        <Row label="In plain language" note="Shortcut's reading">
          <p className="text-ink-2">{g.summary}</p>
        </Row>
        <Row label="Designer takeaway" note="Shortcut's reading">
          <p className="border-l-2 border-mark pl-3">{g.designerTakeaway}</p>
        </Row>
        {g.accessibilityNotes && (
          <Row label="Accessibility" note="Shortcut's reading">
            <p className="text-ink-2">{g.accessibilityNotes}</p>
          </Row>
        )}
        {g.example && (
          <Row label="Example" note="Illustrative">
            <p className="text-ink-2">{g.example}</p>
          </Row>
        )}
        {g.rationale && (
          <Row label="Why" note={`${source.short}'s wording`}>
            <p className="text-ink-2">{g.rationale}</p>
          </Row>
        )}
      </dl>

      <div className="mt-4 grid gap-x-8 gap-y-3 text-sm sm:grid-cols-[10rem_1fr]">
        <p className="font-semibold text-ink-3">Source</p>
        <div>
          <p className="font-medium">{source.name}</p>
          {g.appliesTo && <p className="mt-1 text-ink-2">Applies to: {g.appliesTo}</p>}
          <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-ink-2">
            {g.dateUpdated && <span>Source updated {formatDate(g.dateUpdated)}</span>}
            <FreshnessStatus dateVerified={g.dateVerified} />
            <ExternalLink href={g.sourceUrl}>View official guidance</ExternalLink>
          </div>
        </div>
      </div>

      {g.related && g.related.length > 0 && (
        <div className="mt-4 border-t border-line pt-4">
          <SourceMeta citations={g.related} heading="Related standard" />
        </div>
      )}
    </article>
  );
}
