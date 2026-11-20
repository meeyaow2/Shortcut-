import type { Metadata } from "next";
import Link from "next/link";
import { PromptBlock } from "@/components/ai/Ai";
import { EditorialLabel } from "@/components/craft/Craft";
import { SourceBadge } from "@/components/source/Source";
import { ExternalLink, PageHeader } from "@/components/ui/primitives";
import { SOLO_REVIEWED, soloCheckpoints, soloPrompts, soloUpdateIds } from "@/data/solo";
import { updates } from "@/data/updates";
import { formatDate } from "@/lib/dates";
import type { Update } from "@/types";

export const metadata: Metadata = {
  title: "Solo Designer Kit",
  description: "Checkpoints, review prompts and recent AI changes for a designer carrying a product from brief to build alone.",
};

const linkClass = "font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent";

const changes = soloUpdateIds
  .map((id) => updates.find((update) => update.id === id))
  .filter((update): update is Update => update !== undefined);

const contents = [
  { href: "#checkpoints", label: "Checkpoints" },
  { href: "#prompts", label: "Review prompts" },
  { href: "#changed", label: "What changed" },
];

export default function SoloDesignerPage() {
  return (
    <div className="page">
      <PageHeader
        title="Solo Designer Kit"
        lede="For when you are the researcher, interaction designer, design-system owner and reviewer at once. Six checkpoints, the prompts that support them, and the recent AI changes worth acting on."
      >
        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
          <EditorialLabel kind="craft-guidance" dateReviewed={SOLO_REVIEWED} />
          <nav aria-label="On this page">
            <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
              {contents.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="inline-flex min-h-11 items-center text-ink-2 underline decoration-line-strong underline-offset-4 hover:text-ink hover:decoration-ink md:min-h-0">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </PageHeader>

      <section className="max-w-4xl pt-8" aria-labelledby="checkpoints">
        <h2 id="checkpoints" className="anchor-target border-b-2 border-ink pb-2 text-2xl font-semibold md:text-3xl">
          Six checkpoints
        </h2>
        <p className="mt-3 max-w-read text-ink-2">
          Without a team, nobody stops you at the points where a review would normally happen. Run these yourself. Each one ends with something you can show.
        </p>
        <ol className="mt-2 divide-y divide-line">
          {soloCheckpoints.map((checkpoint, index) => (
            <li key={checkpoint.id} id={checkpoint.id} className="anchor-target grid gap-x-8 gap-y-2 py-6 md:grid-cols-[9rem_1fr]">
              <p className="flex gap-3 text-sm text-ink-2 md:flex-col md:gap-0.5">
                <span className="font-mono text-ink-3">{String(index + 1).padStart(2, "0")}</span>
                <span className="font-medium">{checkpoint.when}</span>
              </p>
              <div className="min-w-0 max-w-read">
                <h3 className="font-display text-xl font-semibold tracking-tight">{checkpoint.title}</h3>
                <p className="mt-2">{checkpoint.do}</p>
                <dl className="mt-3 grid gap-x-4 gap-y-1.5 text-[0.9375rem] sm:grid-cols-[7.5rem_1fr]">
                  <dt className="font-semibold text-ink-3">Leave with</dt>
                  <dd className="text-ink-2">{checkpoint.output}</dd>
                  <dt className="font-semibold text-ink-3">Ask yourself</dt>
                  <dd className="text-ink-2">{checkpoint.check}</dd>
                </dl>
                <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
                  <Link href={checkpoint.link.href} className={`inline-flex min-h-11 items-center md:min-h-0 ${linkClass}`}>
                    {checkpoint.link.label}
                  </Link>
                  {checkpoint.promptId && (
                    <a href={`#${checkpoint.promptId}`} className="inline-flex min-h-11 items-center text-ink-2 underline underline-offset-4 hover:text-ink md:min-h-0">
                      Prompt: {soloPrompts.find((p) => p.id === checkpoint.promptId)?.label}
                    </a>
                  )}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="section-space max-w-4xl" aria-labelledby="prompts">
        <h2 id="prompts" className="anchor-target border-b-2 border-ink pb-2 text-2xl font-semibold md:text-3xl">
          Review prompts
        </h2>
        <p className="mt-3 max-w-read text-ink-2">
          Fill in the brackets with your real requirements and approved components. Never paste confidential client material into a service your organisation has not approved.
        </p>
        <div className="mt-6 space-y-8">
          {soloPrompts.map((prompt) => (
            <article key={prompt.id} id={prompt.id} className="anchor-target max-w-read">
              <h3 className="font-display text-lg font-semibold tracking-tight">{prompt.label}</h3>
              <p className="mt-1 text-ink-2">{prompt.useWhen}</p>
              <div className="mt-3">
                <PromptBlock text={prompt.text} />
              </div>
            </article>
          ))}
        </div>
        <p className="mt-6">
          <Link href="/ai/prompts" className={linkClass}>
            More prompts in the Prompt Library
          </Link>
        </p>
      </section>

      <section className="section-space max-w-4xl" aria-labelledby="changed">
        <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-1 border-b-2 border-ink pb-2">
          <h2 id="changed" className="anchor-target text-2xl font-semibold md:text-3xl">
            What changed, October–November 2026
          </h2>
          <Link href="/ai/updates" className="-my-2 inline-flex min-h-11 items-center whitespace-nowrap text-sm font-medium text-ink-2 hover:text-accent">
            All AI updates
          </Link>
        </div>
        <p className="mt-3 max-w-read text-ink-2">
          <strong className="font-semibold text-ink">Announced</strong> restates the vendor&apos;s own post.{" "}
          <strong className="font-semibold text-ink">Try</strong> is Shortcut&apos;s suggestion, not a vendor instruction.
        </p>
        <ul className="mt-2 divide-y divide-line">
          {changes.map((update) => (
            <li key={update.id} className="grid gap-x-8 gap-y-2 py-6 md:grid-cols-[9rem_1fr]">
              <div className="flex items-center gap-3 md:flex-col md:items-start md:gap-1.5">
                <SourceBadge id={update.sourceId} />
                <span className="whitespace-nowrap text-sm text-ink-3">{formatDate(update.datePublished)}</span>
              </div>
              <div className="min-w-0 max-w-read">
                <h3 className="font-display text-xl font-semibold tracking-tight">
                  <Link href={`/ai/updates#${update.id}`} className="hover:text-accent">
                    {update.title}
                  </Link>
                </h3>
                <dl className="mt-2 space-y-2">
                  <div>
                    <dt className="text-sm font-semibold text-ink-3">Announced</dt>
                    <dd className="text-ink-2">{update.summary}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-semibold text-ink-3">Try</dt>
                    <dd className="font-medium">{update.designerAction}</dd>
                  </div>
                </dl>
                <p className="mt-2 text-sm">
                  <ExternalLink href={update.sourceUrl}>Read the original post</ExternalLink>
                  {update.dateVerified && <span className="text-ink-3"> · Checked {formatDate(update.dateVerified)}</span>}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
