import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { EditorialLabel } from "@/components/craft/Craft";
import { PageHeader } from "@/components/ui/primitives";
import { KeyTakeaway } from "@/components/ui/Scan";
import { agentChapters, agentsPrinciple } from "@/data/agents";

export const metadata: Metadata = { title: "Designing with Agents" };

export default function AgentsPage() {
  return (
    <div className="page">
      <PageHeader title="Designing with Agents" lede="A practical guide to working with AI across the design process, without giving up judgement.">
        <div className="mt-5 space-y-3">
          <EditorialLabel kind="craft-guidance" />
          <p className="max-w-read text-sm text-ink-2">
            A working handbook in nine parts. It names no tool&rsquo;s features, because those change monthly: for what a tool does today, see{" "}
            <Link href="/ai/tools" className="font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent">
              AI Tools
            </Link>
            .
          </p>
        </div>
      </PageHeader>

      <div className="pt-8">
        <KeyTakeaway label="The principle">{agentsPrinciple}</KeyTakeaway>
      </div>

      {/* Numbered because the chapters build on one another, though each can be read alone. */}
      <ol className="grid gap-3 pt-8 sm:grid-cols-2 lg:grid-cols-3">
        {agentChapters.map((chapter) => (
          <li key={chapter.id}>
            <Link href={`/ai/agents/${chapter.id}`} className="lift group flex h-full flex-col rounded-md border border-line p-4 hover:border-ink sm:p-5">
              <span className="font-display text-2xl font-semibold tabular-nums text-ink-3">{chapter.number}</span>
              <span className="mt-1 font-display text-xl font-semibold tracking-tight">{chapter.title}</span>
              <span className="mt-1 flex-1 text-ink-2">{chapter.subtitle}</span>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-ink-2 group-hover:text-accent">
                Read
                <ArrowRight aria-hidden className="size-4" />
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <p className="section-gap max-w-read text-ink-2">
        Already here and not repeated in this track:{" "}
        <Link href="/ai/workflow" className="font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent">
          AI in Your Workflow
        </Link>{" "}
        covers each design stage, and{" "}
        <Link href="/ai/learn" className="font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent">
          AI for Product Designers
        </Link>{" "}
        is twelve short lessons. The chapters link to both.
      </p>
    </div>
  );
}
