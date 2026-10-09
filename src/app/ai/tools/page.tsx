import type { Metadata } from "next";
import { ComparisonBlock, ToolCard } from "@/components/ai/Ai";
import { EditorialLabel } from "@/components/craft/Craft";
import { PageHeader } from "@/components/ui/primitives";
import { aiToolJobs, aiTools, toolComparisons, unverifiedTools } from "@/data/ai";

export const metadata: Metadata = { title: "AI Tools for Designers" };

export default function AiToolsPage() {
  return (
    <div className="page">
      <PageHeader
        title="AI tools for designers"
        lede="A short list, organised by the work you are trying to do. No tool is best at everything, so each comparison says when to reach for which."
      >
        <ul className="mt-5 max-w-read space-y-1.5 text-sm text-ink-2">
          <li>
            <span className="font-semibold text-ink">What each tool does </span>
            restates its vendor&rsquo;s own pages, checked on the date shown.
          </li>
          <li>
            <span className="font-semibold text-ink">Good for, less suitable for and the comparisons </span>
            are Shortcut&rsquo;s reading. Tools are listed alphabetically and use the same template.
          </li>
        </ul>
      </PageHeader>

      <section aria-labelledby="compare" className="max-w-3xl pt-8">
        <div className="flex flex-wrap items-end justify-between gap-2 border-b-2 border-ink pb-2">
          <h2 id="compare" className="text-2xl font-semibold md:text-3xl">
            Which tool for the job
          </h2>
          <EditorialLabel kind="craft-guidance" />
        </div>
        <div className="pt-4">
          {toolComparisons.map((comparison) => (
            <ComparisonBlock key={comparison.id} comparison={comparison} />
          ))}
        </div>
      </section>

      <section aria-labelledby="all-tools" className="section-gap">
        <h2 id="all-tools" className="border-b-2 border-ink pb-2 text-2xl font-semibold md:text-3xl">
          Tools by job
        </h2>
        <div className="space-y-10 pt-6">
          {aiToolJobs.map((job) => {
            const tools = aiTools.filter((tool) => tool.jobs[0] === job);
            const also = aiTools.filter((tool) => tool.jobs.includes(job) && tool.jobs[0] !== job);
            if (tools.length === 0 && also.length === 0) return null;
            return (
              <section key={job} aria-label={job}>
                <h3 className="text-xl font-semibold">{job}</h3>
                {also.length > 0 && (
                  <p className="mt-1 text-sm text-ink-2">
                    Also useful here:{" "}
                    {also.map((tool, index) => (
                      <span key={tool.id}>
                        {index > 0 && ", "}
                        <a href={`#${tool.id}`} className="font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent">
                          {tool.name}
                        </a>
                      </span>
                    ))}
                  </p>
                )}
                {tools.length > 0 && (
                  <div className="mt-4 grid gap-4 lg:grid-cols-2">
                    {tools.map((tool) => (
                      <ToolCard key={tool.id} tool={tool} />
                    ))}
                  </div>
                )}
              </section>
            );
          })}
        </div>
        {unverifiedTools.length > 0 && (
          <p className="mt-10 max-w-read text-sm text-ink-2">
            <span className="font-semibold text-ink">Not listed yet: </span>
            {unverifiedTools.join(", ")}. Their official pages could not be read for checking, so Shortcut does not
            describe them from memory.
          </p>
        )}
      </section>
    </div>
  );
}
