import type { Metadata } from "next";
import { WorkflowCard } from "@/components/ai/Ai";
import { EditorialLabel } from "@/components/craft/Craft";
import { PageHeader } from "@/components/ui/primitives";
import { ProcessStrip } from "@/components/visual/Diagrams";
import { aiWorkflows } from "@/data/ai";

export const metadata: Metadata = { title: "AI in Your Workflow" };

export default function AiWorkflowPage() {
  return (
    <div className="page">
      <PageHeader
        title="AI in your workflow"
        lede="Stage by stage: where AI is worth using, what to give it, what to check afterwards, and what stays with you."
      >
        <div className="mt-5">
          <EditorialLabel kind="craft-guidance" />
        </div>
      </PageHeader>

      <div className="max-w-4xl pt-8">
        <ProcessStrip
          steps={["Research", "AI synthesis", "Designer validation", "Flow", "Prototype", "AI critique", "Designer decision"]}
          emphasise={[2, 6]}
          caption="One way AI fits into product design. The highlighted steps are yours: the model proposes, and a designer checks and decides."
        />
      </div>

      <div className="grid gap-10 pt-8 lg:grid-cols-[13rem_1fr]">
        <nav aria-label="Stages" className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
          <p className="text-sm font-semibold">Stages</p>
          <ol className="mt-2 space-y-0.5 border-l border-line">
            {aiWorkflows.map((workflow) => (
              <li key={workflow.id}>
                <a href={`#${workflow.id}`} className="-ml-px block border-l border-transparent py-1 pl-3 text-ink-2 hover:border-ink hover:text-ink">
                  {workflow.stage}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="max-w-3xl">
          {aiWorkflows.map((workflow) => (
            <WorkflowCard key={workflow.id} workflow={workflow} />
          ))}
        </div>
      </div>
    </div>
  );
}
