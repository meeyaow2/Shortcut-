import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ChapterLinks, ChapterNav, ChapterSections, ContextFiles, CopyBlock, ExampleAgents, TrustTools, UseBlocks } from "@/components/agents/Agents";
import { EditorialLabel } from "@/components/craft/Craft";
import { InThirty } from "@/components/ui/Scan";
import { AGENTS_REVIEWED, agentChapters, getAgentChapter } from "@/data/agents";
import { formatDate } from "@/lib/dates";

type Props = { params: Promise<{ chapter: string }> };

export function generateStaticParams() {
  return agentChapters.map((chapter) => ({ chapter: chapter.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const chapter = getAgentChapter((await params).chapter);
  return { title: chapter ? `${chapter.title} | Designing with Agents` : "Designing with Agents" };
}

async function Chapter({ params }: Props) {
  const chapter = getAgentChapter((await params).chapter);
  if (!chapter) notFound();
  const index = agentChapters.indexOf(chapter);
  const previous = agentChapters[index - 1];
  const next = agentChapters[index + 1];

  return (
    <div className="page">
      <header className="border-b border-line pb-8 pt-8 md:pt-10">
        <Link href="/ai/agents" className="-my-2 inline-flex items-center gap-1.5 py-2 text-sm text-ink-2 hover:text-ink">
          <ArrowLeft aria-hidden className="size-4" />
          Designing with Agents
        </Link>
        <p className="mt-5 font-display text-2xl font-semibold tabular-nums text-ink-3">{chapter.number}</p>
        <h1 className="text-4xl font-semibold md:text-5xl">{chapter.title}</h1>
        <p className="mt-2 text-xl text-ink-2">{chapter.subtitle}</p>
        <p className="mt-4 max-w-read text-lg">{chapter.summary}</p>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1">
          <EditorialLabel kind="craft-guidance" />
          <span className="text-sm text-ink-3">Shortcut editorial, reviewed {formatDate(AGENTS_REVIEWED)}</span>
        </div>
      </header>

      <div className="grid gap-x-10 gap-y-6 pt-6 lg:grid-cols-[14rem_1fr] lg:pt-8">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <ChapterNav current={chapter.id} />
        </div>

        <div className="stack-sections min-w-0">
          <InThirty items={chapter.thirty} />
          <UseBlocks chapter={chapter} />
          <ChapterSections sections={chapter.sections} />
          {chapter.id === "prologue" && <ContextFiles />}
          {chapter.id === "building-agents" && (
            <section aria-labelledby="example-agents">
              <h2 id="example-agents" className="border-b-2 border-ink pb-2 text-2xl font-semibold">
                Example agents
              </h2>
              <div className="pt-4">
                <ExampleAgents />
              </div>
            </section>
          )}
          {chapter.id === "trust" && <TrustTools />}
          {chapter.copy?.map((block) => (
            <CopyBlock key={block.title} title={block.title} text={block.text} />
          ))}
          <ChapterLinks links={chapter.links} />

          <nav aria-label="Previous and next chapter" className="flex flex-wrap justify-between gap-3 border-t border-line pt-5">
            {previous ? (
              <Link href={`/ai/agents/${previous.id}`} className="inline-flex min-h-11 items-center gap-1.5 text-ink-2 hover:text-ink">
                <ArrowLeft aria-hidden className="size-4" />
                {previous.number} {previous.title}
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link href={`/ai/agents/${next.id}`} className="inline-flex min-h-11 items-center gap-1.5 font-medium hover:text-accent">
                {next.number} {next.title}
                <ArrowRight aria-hidden className="size-4" />
              </Link>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}

// Route params are read inside Suspense, as this Next.js version expects.
export default function AgentChapterPage({ params }: Props) {
  return (
    <Suspense>
      <Chapter params={params} />
    </Suspense>
  );
}
