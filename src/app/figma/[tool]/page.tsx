import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { AiStatus } from "@/components/ai/Ai";
import { EditorialLabel } from "@/components/craft/Craft";
import { SourceBadge } from "@/components/source/Source";
import { Tag } from "@/components/ui/Tag";
import { ExternalLink } from "@/components/ui/primitives";
import { UpdateCard } from "@/components/updates/UpdateCard";
import { figmaComparisons, figmaTools, getFigmaTool } from "@/data/figma";
import { updates } from "@/data/updates";

type Props = { params: Promise<{ tool: string }> };

export function generateStaticParams() {
  return figmaTools.map((tool) => ({ tool: tool.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tool = getFigmaTool((await params).tool);
  return { title: tool ? `${tool.name}: what it is for` : "Figma Guide" };
}

// Words in an update's title or summary that tie it to a tool.
const updateTerms: Record<string, string[]> = {
  agent: ["agent"],
  motion: ["motion"],
  weave: ["weave"],
  design: ["auto layout", "github"],
  "ai-tools": ["agent"],
};

function List({ title, items, tone }: { title: string; items: string[]; tone?: "ok" | "warn" }) {
  const colour = tone === "ok" ? "text-ok" : tone === "warn" ? "text-warn" : "text-ink-3";
  return (
    <div>
      <h2 className={`font-sans text-sm font-semibold tracking-normal ${colour}`}>{title}</h2>
      <ul className="mt-1.5 space-y-1">
        {items.map((item) => (
          <li key={item} className="border-l border-line-strong pl-3 text-ink-2">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

async function Tool({ params }: Props) {
  const tool = getFigmaTool((await params).tool);
  if (!tool) notFound();

  const related = tool.related.map(getFigmaTool).filter((t) => t !== undefined);
  const comparisons = figmaComparisons.filter((c) => c.title.toLowerCase().includes(tool.name.replace("Figma ", "").toLowerCase()));
  const terms = updateTerms[tool.id] ?? [];
  const toolUpdates = updates.filter((u) => u.sourceId === "figma" && terms.some((term) => `${u.title} ${u.summary}`.toLowerCase().includes(term)));

  return (
    <div className="page">
      <header className="border-b border-line pb-8 pt-8 md:pt-10">
        <Link href="/figma" className="inline-flex items-center gap-1.5 text-sm text-ink-2 hover:text-ink">
          <ArrowLeft aria-hidden className="size-4" />
          Figma Guide
        </Link>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <h1 className="text-4xl font-semibold md:text-5xl">{tool.name}</h1>
          <Tag tone="outline">{tool.kind}</Tag>
        </div>
        <p className="mt-3 max-w-read text-lg text-ink-2">{tool.tagline}</p>
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
          <SourceBadge id="figma" />
          <AiStatus dateVerified={tool.docs.dateVerified ?? ""} />
          <ExternalLink href={tool.docs.url} className="text-sm">
            Official documentation: {tool.docs.label}
          </ExternalLink>
        </div>
      </header>

      <div className="grid gap-10 pt-8 lg:grid-cols-[1fr_18rem]">
        <div className="min-w-0 max-w-3xl space-y-8">
          <section aria-labelledby="what">
            <h2 id="what" className="font-sans text-sm font-semibold tracking-normal text-ink-3">
              What it is, in Figma&rsquo;s terms
            </h2>
            <p className="mt-1 text-lg">{tool.what}</p>
          </section>

          <div>
            <EditorialLabel kind="craft-guidance" />
            <div className="mt-3 grid gap-6 sm:grid-cols-2">
              <List title="Best for" items={tool.bestFor} tone="ok" />
              <List title="Not really for" items={tool.notFor} tone="warn" />
            </div>
          </div>

          <section aria-labelledby="when">
            <h2 id="when" className="font-sans text-sm font-semibold tracking-normal text-ink-3">
              When to use it
            </h2>
            <p className="mt-1 border-l-2 border-mark pl-3">{tool.whenToUse}</p>
          </section>

          <section aria-labelledby="workflow">
            <h2 id="workflow" className="font-sans text-sm font-semibold tracking-normal text-ink-3">
              Example workflow
            </h2>
            {/* Numbered: the steps happen in this order. */}
            <ol className="mt-2 divide-y divide-line rounded-md border border-line">
              {tool.workflow.map((step, index) => (
                <li key={step} className="grid grid-cols-[2rem_1fr] gap-x-2 px-4 py-2.5">
                  <span aria-hidden className="font-display font-semibold tabular-nums text-ink-3">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </section>

          <List title="Key features, as Figma lists them" items={tool.keyFeatures} />

          <section aria-labelledby="overlaps">
            <h2 id="overlaps" className="font-sans text-sm font-semibold tracking-normal text-ink-3">
              What it overlaps with
            </h2>
            <p className="mt-1 text-ink-2">{tool.overlaps}</p>
            {comparisons.length > 0 && (
              <p className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
                {comparisons.map((comparison) => (
                  <Link key={comparison.id} href={`/figma#${comparison.id}`} className="font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent">
                    {comparison.title}
                  </Link>
                ))}
              </p>
            )}
          </section>

          {toolUpdates.length > 0 && (
            <section aria-labelledby="updates">
              <h2 id="updates" className="border-b-2 border-ink pb-2 text-2xl font-semibold">
                Latest important updates
              </h2>
              <div className="space-y-5 pt-5">
                {toolUpdates.map((update) => (
                  <UpdateCard key={update.id} update={update} />
                ))}
              </div>
            </section>
          )}
        </div>

        <aside aria-label="Related tools" className="lg:sticky lg:top-24 lg:self-start">
          <h2 className="font-sans text-sm font-semibold tracking-normal">Related tools</h2>
          <ul className="mt-2 space-y-2">
            {related.map((other) => (
              <li key={other.id}>
                <Link href={`/figma/${other.id}`} className="block rounded-md border border-line p-3 transition-colors hover:border-ink">
                  <span className="font-semibold">{other.name}</span>
                  <span className="block text-sm text-ink-2">{other.tagline}</span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}

// Route params are read inside Suspense, as this Next.js version expects.
export default function FigmaToolPage({ params }: Props) {
  return (
    <Suspense>
      <Tool params={params} />
    </Suspense>
  );
}
