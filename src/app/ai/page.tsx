import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { WeekList } from "@/components/ai/WeekList";
import { PageHeader } from "@/components/ui/primitives";
import { aiTools, aiWorkflows, designerStillOwns, lessons } from "@/data/ai";
import { aiSignals } from "@/data/checks";
import { prompts } from "@/data/prompts";

export const metadata: Metadata = { title: "AI + Design" };

const doors = [
  { href: "/ai/workflow", title: "AI in your workflow", detail: `${aiWorkflows.length} stages, from discovery to handoff: where AI helps, what to give it, what to check.` },
  { href: "/ai/prompts", title: "Prompt Library", detail: `${prompts.length} task-specific prompts, each with what to provide and what to verify.` },
  { href: "/ai/tools", title: "AI tools", detail: `${aiTools.length} tools, organised by the job you are doing, with when to reach for each.` },
  { href: "/ai/review", title: "AI design review", detail: "A review prompt and a five-way rubric to run in your own AI tool." },
  { href: "/checks/ai-look", title: "AI-look signals", detail: `${aiSignals.length} patterns that make UI read as generated, and what to do instead.` },
  { href: "/ai/learn", title: "AI for product designers", detail: `${lessons.length} short lessons. A reading order through everything here.` },
];

export default function AiPage() {
  return (
    <div className="page">
      <PageHeader
        title="AI + Design"
        lede="Keep up with what AI changes for designers, and use it to think faster without handing over the thinking."
      />

      <section aria-labelledby="week" className="pt-8">
        <div className="flex items-end justify-between gap-4 border-b-2 border-ink pb-2">
          <h2 id="week" className="text-2xl font-semibold md:text-3xl">
            What changed this week
          </h2>
          <Link href="/ai/updates" className="inline-flex items-center gap-1 whitespace-nowrap text-sm font-medium text-ink-2 hover:text-accent">
            All AI updates
            <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
        <WeekList />
      </section>

      <section aria-labelledby="use" className="mt-14">
        <h2 id="use" className="border-b-2 border-ink pb-2 text-2xl font-semibold md:text-3xl">
          Use AI better
        </h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {doors.map((door) => (
            <li key={door.href}>
              <Link href={door.href} className="flex h-full flex-col rounded-md border border-line p-4 transition-colors hover:border-ink">
                <span className="font-display text-lg font-semibold tracking-tight">{door.title}</span>
                <span className="mt-1 text-ink-2">{door.detail}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="owns" className="mt-14 max-w-3xl border-l-2 border-ink pl-4 sm:pl-5">
        <h2 id="owns" className="text-xl font-semibold">
          The designer still owns
        </h2>
        <p className="mt-1.5 text-ink-2">
          Use AI to increase the quality and speed of your thinking. It can explore, surface what you missed, critique
          and organise. These stay with you:
        </p>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {designerStillOwns.map((item) => (
            <li key={item} className="rounded-sm bg-wash px-2.5 py-1 text-[0.9375rem]">
              {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
