import type { Metadata } from "next";
import Link from "next/link";
import { EditorialLabel } from "@/components/craft/Craft";
import { PageHeader } from "@/components/ui/primitives";
import { aiSignalGroups, aiSignals } from "@/data/checks";

export const metadata: Metadata = { title: "AI-Look Signals" };

export default function AiLookPage() {
  return (
    <div className="page">
      <PageHeader
        title="Why does my UI look AI-generated?"
        lede="Patterns that commonly make an interface read as generic or generated: why AI tends to produce each one, why it can be a problem, and what to try instead."
      >
        <div className="mt-6 max-w-read border-l-2 border-ink pl-4 text-ink-2">
          <p className="font-semibold text-ink">How to read this</p>
          <p className="mt-1">
            These are heuristic signals, not proof of anything, and none is wrong in itself. One or two on a screen
            means little. Several together, with no reason behind them, is what reviewers notice.
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
            <EditorialLabel kind="craft-guidance" />
            <Link href="/ai/learn#reviewing-generated-ui" className="text-sm font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent">
              Reviewing AI-generated UI
            </Link>
          </div>
        </div>
      </PageHeader>

      <div className="max-w-4xl space-y-12 pt-8">
        {aiSignalGroups.map((group) => (
          <section key={group} aria-labelledby={`signals-${group}`}>
            <h2 id={`signals-${group}`} className="border-b-2 border-ink pb-2 text-2xl font-semibold">
              {group}
            </h2>
            <ul className="divide-y divide-line">
              {aiSignals
                .filter((signal) => signal.group === group)
                .map((signal) => (
                  <li key={signal.id} id={signal.id} className="anchor-target py-5">
                    <h3 className="text-lg font-semibold">{signal.label}</h3>
                    <dl className="mt-2 grid gap-x-8 gap-y-3 md:grid-cols-3">
                      <div>
                        <dt className="text-sm font-semibold text-ink-3">Why AI often does this</dt>
                        <dd className="mt-0.5 text-ink-2">{signal.why}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-semibold text-ink-3">Why it can be a problem</dt>
                        <dd className="mt-0.5 text-ink-2">{signal.problem}</dd>
                      </div>
                      <div className="border-l-2 border-mark pl-3">
                        <dt className="text-sm font-semibold text-ink-3">Try instead</dt>
                        <dd className="mt-0.5">{signal.instead}</dd>
                      </div>
                    </dl>
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
