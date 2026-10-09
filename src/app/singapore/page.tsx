import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { GuidanceCard } from "@/components/guidance/GuidanceCard";
import { ExternalLink, PageHeader } from "@/components/ui/primitives";
import { getCheatSheet } from "@/data/cheat-sheets";
import { explorerTopics } from "@/data/explorer";
import { guidance, sgTopics } from "@/data/guidance";

export const metadata: Metadata = { title: "Singapore UX" };

const controls = guidance.filter((g) => g.controlId);
const verifiedTopics = explorerTopics.filter((t) => t.status === "verified");

export default function SingaporePage() {
  return (
    <div className="page">
      <PageHeader
        title="Singapore UX"
        lede="Standards, patterns and guidance for designing digital services in Singapore."
      >
        <div className="mt-6 max-w-read border-l-2 border-ink pl-4 text-ink-2">
          <p className="font-semibold text-ink">Who this applies to</p>
          <p className="mt-1">
            The controls here come from the Singapore Government&rsquo;s Digital Service Standards. Government agencies
            and their industry partners are expected to apply them. For other products they are a well-tested
            reference, not an obligation. Shortcut summarises; the official catalogue is the authority.
          </p>
          <p className="mt-2">
            <ExternalLink href="https://info.standards.tech.gov.sg/control-catalog/dss/">
              Open the official Digital Service Standards
            </ExternalLink>
          </p>
          <p className="mt-2 text-sm">
            <span className="font-semibold text-ink-3">AI prompt </span>
            <Link href="/ai/prompts#sg-government-flow" className="font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent">
              Review a government service flow using the official guidance you supply
            </Link>
          </p>
        </div>
      </PageHeader>

      <aside aria-labelledby="sg-responsive" className="mt-8 rounded-md border border-line p-4 sm:p-5">
        <h2 id="sg-responsive" className="font-sans text-base font-semibold tracking-normal">
          Responsive and device guidance from Singapore sources
        </h2>
        <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-1">
          {[
            { href: "#bd-1", label: "BD-1 Responsive Web Design" },
            { href: "#sgds-breakpoints", label: "SGDS breakpoints" },
            { href: "#sgds-button", label: "SGDS button sizes" },
            { href: "#sgds-input", label: "SGDS form inputs" },
            { href: "#topic-navigation", label: "Navigation controls" },
            { href: "#topic-accessibility", label: "Accessibility" },
          ].map((item) => (
            <li key={item.href}>
              <a href={item.href} className="font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-3 max-w-3xl text-sm text-ink-2">
          Only what the Singapore sources themselves state is shown on this page. The per-viewport ranges elsewhere in Shortcut are industry convention, not
          a Singapore Government requirement.{" "}
          <Link href="/cheat-sheets/responsive-design" className="font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent">
            Responsive &amp; Viewports
          </Link>
        </p>
      </aside>

      <div className="grid gap-10 pt-8 lg:grid-cols-[14rem_1fr]">
        <nav aria-label="Topics" className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
          <p className="text-sm font-semibold">Topics</p>
          <ul className="mt-2 space-y-0.5 border-l border-line">
            {sgTopics.map((topic) => (
              <li key={topic.id}>
                <a
                  href={`#topic-${topic.id}`}
                  className="-ml-px flex justify-between gap-2 border-l border-transparent py-1 pl-3 text-ink-2 hover:border-ink hover:text-ink"
                >
                  {topic.title}
                  <span className="text-sm tabular-nums text-ink-3">{guidance.filter((g) => g.category === topic.id).length}</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-ink-2">
            {controls.length} baseline controls, BD-1 to BD-{controls.length}, are filed under the topic they affect.
          </p>
        </nav>

        <div className="stack-sections">
          {sgTopics.map((topic) => {
            const entries = guidance.filter((g) => g.category === topic.id);
            const sheet = topic.sheet ? getCheatSheet(topic.sheet) : undefined;
            return (
              <section key={topic.id} id={`topic-${topic.id}`} aria-labelledby={`topic-${topic.id}-title`}>
                <div className="flex flex-wrap items-end justify-between gap-3 border-b-2 border-ink pb-2">
                  <h2 id={`topic-${topic.id}-title`} className="text-2xl font-semibold md:text-3xl">
                    {topic.title}
                  </h2>
                  {sheet && (
                    <Link
                      href={`/cheat-sheets/${sheet.slug}`}
                      className="inline-flex items-center gap-1 text-sm font-medium text-ink-2 hover:text-accent"
                    >
                      Global guidance: {sheet.title} cheat sheet
                      <ArrowRight aria-hidden className="size-4" />
                    </Link>
                  )}
                </div>

                {entries.length > 0 ? (
                  <div className="mt-5 space-y-5">
                    {entries.map((entry) => (
                      <GuidanceCard key={entry.id} guidance={entry} />
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 max-w-read rounded-md border border-dashed border-line-strong px-5 py-6 text-ink-2">
                    <span className="font-semibold text-ink">No verified guidance yet. </span>
                    The Digital Service Standards include an Understand Users family that Shortcut has not reviewed.
                    Nothing is shown here until it has been checked against the official text.
                  </p>
                )}

                {topic.id === "sgds" && (
                  <div className="mt-5 rounded-md border border-line p-4 sm:p-5">
                    <h3 className="text-lg font-semibold">See SGDS beside other design systems</h3>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {verifiedTopics.map((t) => (
                        <li key={t.id}>
                          <Link
                            href={`/explorer/${t.id}`}
                            className="inline-flex min-h-11 md:min-h-9 items-center rounded-sm border border-line px-3 text-[0.9375rem] text-ink-2 hover:border-ink hover:text-ink"
                          >
                            {t.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
