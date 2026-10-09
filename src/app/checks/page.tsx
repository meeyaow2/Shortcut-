import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { EditorialLabel, Why } from "@/components/craft/Craft";
import { SourceMeta } from "@/components/source/Source";
import { PageHeader } from "@/components/ui/primitives";
import { BeforeAfter } from "@/components/visual/BeforeAfter";
import { getCheatSheet } from "@/data/cheat-sheets";
import { checkCategories, designChecks } from "@/data/checks";
import type { DesignCheck } from "@/types";

export const metadata: Metadata = { title: "Design Checks" };

const slug = (category: string) => category.toLowerCase().replace(/[^a-z0-9]+/g, "-");

function Field({ label, children }: { label: string; children: string }) {
  return (
    <div className="grid gap-1 py-2.5 sm:grid-cols-[9rem_1fr] sm:gap-4">
      <dt className="text-sm font-semibold text-ink-3">{label}</dt>
      <dd className="text-ink-2">{children}</dd>
    </div>
  );
}

function CheckCard({ check }: { check: DesignCheck }) {
  const sheet = check.sheet ? getCheatSheet(check.sheet) : undefined;
  return (
    <article id={check.id} className="anchor-target border-t border-line py-5 first:border-t-0">
      <h3 className="text-xl font-semibold">{check.title}</h3>
      <dl className="mt-2 divide-y divide-line">
        <Field label="Why it matters">{check.why}</Field>
        <Field label="Common failure">{check.failure}</Field>
        <Field label="Quick fix">{check.fix}</Field>
      </dl>
      <BeforeAfter id={check.id} />
      <div className="mt-3 space-y-3">
        <Why label="Deeper explanation">
          <p>{check.deeper}</p>
          {check.citations && <SourceMeta citations={check.citations} heading="Official source" />}
        </Why>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <EditorialLabel kind={check.kind} />
          {sheet && (
            <Link href={`/cheat-sheets/${sheet.slug}`} className="inline-flex items-center gap-1 text-sm font-medium text-ink-2 hover:text-accent">
              {sheet.title} cheat sheet
              <ArrowRight aria-hidden className="size-4" />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

export default function ChecksPage() {
  return (
    <div className="page">
      <PageHeader
        title="Design Checks"
        lede="Questions to ask of your own screen, one area at a time. Use them when something feels off and you cannot say why."
      >
        <div className="mt-6 flex flex-wrap gap-2">
          <Link href="/checks/before-you-send-it" className="inline-flex min-h-11 items-center gap-2 rounded-sm bg-ink px-4 font-medium text-paper hover:bg-accent-strong">
            Before you send it
            <ArrowRight aria-hidden className="size-4" />
          </Link>
          <Link href="/checks/ai-look" className="inline-flex min-h-11 items-center rounded-sm border border-line-strong px-4 font-medium hover:border-ink">
            AI-look signals
          </Link>
        </div>
      </PageHeader>

      <div className="grid gap-10 pt-8 lg:grid-cols-[13rem_1fr]">
        <nav aria-label="Check categories" className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
          <p className="text-sm font-semibold">Check an area</p>
          <ul className="mt-2 space-y-0.5 border-l border-line">
            {checkCategories.map((category) => (
              <li key={category}>
                <a href={`#${slug(category)}`} className="-ml-px block border-l border-transparent py-1 pl-3 text-ink-2 hover:border-ink hover:text-ink">
                  {category}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="max-w-3xl space-y-12">
          {checkCategories.map((category) => (
            <section key={category} id={slug(category)} aria-labelledby={`${slug(category)}-title`}>
              <h2 id={`${slug(category)}-title`} className="border-b-2 border-ink pb-2 text-2xl font-semibold">
                {category}
              </h2>
              <div className="pt-2">
                {designChecks
                  .filter((check) => check.category === category)
                  .map((check) => (
                    <CheckCard key={check.id} check={check} />
                  ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
