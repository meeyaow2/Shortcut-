"use client";

import Link from "next/link";
import { kindLabels } from "@/data/updates";
import { formatDate } from "@/lib/dates";
import type { Update } from "@/types";
import { FreshnessStatus, SourceBadge, SourceMeta } from "../source/Source";
import { Tag } from "../ui/Tag";
import { ExternalLink } from "../ui/primitives";

const kindTones = {
  new: "accent",
  updated: "warn",
  guideline: "outline",
  tool: "outline",
  research: "outline",
} as const;

function Labels({ update }: { update: Update }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <SourceBadge id={update.sourceId} />
      <Tag>{update.category}</Tag>
      {update.ai && <Tag tone="outline">{update.ai.updateType}</Tag>}
      {/* A research piece in the Research category would otherwise say so twice. */}
      {kindLabels[update.kind] !== update.category && <Tag tone={kindTones[update.kind]}>{kindLabels[update.kind]}</Tag>}
      {update.relevantTo && <span className="text-sm text-ink-3">Relevant to {update.relevantTo.join(", ").toLowerCase()}</span>}
    </div>
  );
}

/** Short form for the Home feed: what changed, why it matters, and proof. */
export function UpdateRow({ update }: { update: Update }) {
  return (
    <article className="grid gap-x-8 gap-y-3 py-6 md:grid-cols-[1fr_17rem]">
      <div className="min-w-0">
        <Labels update={update} />
        <h3 className="mt-3 text-xl font-semibold">{update.title}</h3>
        <p className="mt-2 text-ink-2">{update.summary}</p>
        <p className="mt-3 border-l-2 border-mark pl-3">
          <span className="font-semibold">Why this matters: </span>
          {update.whyItMatters}
        </p>
      </div>
      <div className="flex flex-col gap-1.5 text-sm text-ink-2 md:items-end md:text-right">
        <p>Published {formatDate(update.datePublished)}</p>
        <FreshnessStatus dateVerified={update.dateVerified} />
        <ExternalLink href={update.sourceUrl} className="text-sm">
          View source
        </ExternalLink>
      </div>
    </article>
  );
}

function Field({ label, children, emphasis = false }: { label: string; children: string; emphasis?: boolean }) {
  return (
    <div className="grid gap-1 py-3 sm:grid-cols-[9rem_1fr] sm:gap-4">
      <dt className="text-sm font-semibold text-ink-3">{label}</dt>
      <dd className={emphasis ? "font-medium text-ink" : "text-ink-2"}>{children}</dd>
    </div>
  );
}

/** Full form for the Updates feed: a structured record, not a blog post. */
export function UpdateCard({ update }: { update: Update }) {
  return (
    <article id={update.id} className="anchor-target rounded-md border border-line p-5 md:p-6">
      <Labels update={update} />
      <h2 className="mt-3 text-2xl font-semibold">{update.title}</h2>

      <dl className="mt-3 divide-y divide-line border-y border-line">
        <Field label="What changed">{update.summary}</Field>
        <Field label="Why it matters">{update.whyItMatters}</Field>
        <Field label="What to do" emphasis>
          {update.designerAction}
        </Field>
      </dl>

      {update.ai && (
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <div>
            <p className="text-sm font-semibold text-ok">Use it for</p>
            <ul className="mt-1.5 space-y-1">
              {update.ai.useFor.map((item) => (
                <li key={item} className="border-l border-line-strong pl-3 text-ink-2">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-warn">Be careful with</p>
            <ul className="mt-1.5 space-y-1">
              {update.ai.carefulWith.map((item) => (
                <li key={item} className="border-l border-line-strong pl-3 text-ink-2">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <p className="border-l-2 border-mark pl-3 sm:col-span-2">
            <span className="block text-sm font-semibold text-ink-3">Try this workflow</span>
            {update.ai.workflow}
          </p>
        </div>
      )}

      {update.questions && (
        <div className="mt-5">
          <p className="text-sm font-semibold text-ink-3">Questions for designers</p>
          <ul className="mt-1.5 grid gap-x-8 gap-y-1 sm:grid-cols-2">
            {update.questions.map((question) => (
              <li key={question} className="border-l border-line-strong pl-3 text-ink-2">
                {question}
              </li>
            ))}
          </ul>
        </div>
      )}

      {update.links && (
        <p className="mt-4 flex flex-wrap gap-x-5 gap-y-1">
          {update.links.map((item) => (
            <Link key={item.href} href={item.href} className="font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent">
              {item.label}
            </Link>
          ))}
        </p>
      )}

      <div className="mt-4">
        <SourceMeta
          citations={[
            {
              sourceId: update.sourceId,
              label: update.title,
              url: update.sourceUrl,
              datePublished: update.datePublished,
              dateVerified: update.dateVerified,
            },
          ]}
        />
      </div>
    </article>
  );
}
