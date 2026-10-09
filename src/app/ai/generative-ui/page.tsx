import type { Metadata } from "next";
import Link from "next/link";
import { EditorialLabel } from "@/components/craft/Craft";
import { SourceMeta } from "@/components/source/Source";
import { Flow } from "@/components/systems/Systems";
import { PageHeader } from "@/components/ui/primitives";
import { UpdateCard } from "@/components/updates/UpdateCard";
import { fixedVsGenerated, generativeDesignQuestions, systemCite, systemToAiFlow, systemUpdates, uiConcepts } from "@/data/systems";

export const metadata: Metadata = { title: "Generative UI" };

const accent = "font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent";

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="border-b-2 border-ink pb-2 text-2xl font-semibold md:text-3xl">
      {children}
    </h2>
  );
}

export default function GenerativeUiPage() {
  return (
    <div className="page">
      <PageHeader title="Generative UI" lede="Designing interfaces that are composed dynamically around user intent.">
        <div className="mt-5 space-y-2">
          <EditorialLabel kind="craft-guidance" />
          <p className="max-w-read text-sm text-ink-2">
            This is a fast-moving area. The terms below have no agreed definitions; they are working concepts. What
            vendors say they have built is cited to their own pages.
          </p>
        </div>
      </PageHeader>

      <section aria-labelledby="shift" className="pt-8">
        <H2 id="shift">What is changing</H2>
        <div className="grid gap-8 pt-5 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold">Traditional software</h3>
            <div className="mt-3 max-w-sm">
              <Flow steps={fixedVsGenerated.fixed} />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Generated interfaces</h3>
            <div className="mt-3 max-w-sm">
              <Flow steps={fixedVsGenerated.generated} emphasise={2} />
            </div>
          </div>
        </div>
        <p className="mt-6 max-w-read border-l-2 border-mark pl-3">
          <span className="block text-sm font-semibold text-ink-3">Designer takeaway</span>
          Interfaces may increasingly be generated around what someone is trying to do, instead of predefined as a
          fixed set of screens. That makes component systems, interaction rules, content hierarchy and design
          constraints matter more, because a model needs structured design context to produce something coherent.
        </p>
      </section>

      <section aria-labelledby="concepts" className="pt-14">
        <H2 id="concepts">Four working concepts</H2>
        <dl className="grid gap-4 pt-5 sm:grid-cols-2">
          {uiConcepts.map((concept) => (
            <div key={concept.name} className="rounded-md border border-line p-4 sm:p-5">
              <dt className="font-display text-xl font-semibold tracking-tight">{concept.name}</dt>
              <dd className="mt-1">{concept.meaning}</dd>
              <dd className="mt-2 text-sm text-ink-2">
                <span className="font-semibold text-ink-3">For example. </span>
                {concept.example}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 max-w-read text-ink-2">
          One product can be several of these at once. They are useful for asking which problem you are designing
          for, not for classifying products.
        </p>
      </section>

      <section aria-labelledby="shipping" className="pt-14">
        <H2 id="shipping">What has shipped</H2>
        <div className="max-w-3xl pt-5">
          {systemUpdates.map((update) => (
            <UpdateCard key={update.id} update={update} />
          ))}
        </div>
        <div className="mt-6 max-w-3xl rounded-md border border-line p-4 sm:p-5">
          <h3 className="text-lg font-semibold">A design system for AI experiences already exists</h3>
          <p className="mt-2 text-ink-2">
            Atlassian publishes Rovo UI, which it calls the AI voice of its design language. Two of its eight
            interaction guidelines speak directly to generated interfaces: content and form are dynamic, and make it
            easy to &ldquo;pop the hood&rdquo; so people can see system state and how an outcome was produced.
          </p>
          <p className="mt-3">
            <Link href="/systems/atlassian" className={accent}>
              Atlassian Design System profile
            </Link>
          </p>
          <div className="mt-4 border-t border-line pt-3">
            <SourceMeta citations={[systemCite.rovoGuidelines]} heading="Official source" />
          </div>
        </div>
      </section>

      <section aria-labelledby="system" className="pt-14">
        <H2 id="system">Why the design system matters more</H2>
        <div className="grid gap-8 pt-5 lg:grid-cols-[14rem_1fr]">
          <Flow steps={systemToAiFlow} emphasise={5} />
          <div className="max-w-read space-y-4">
            <p>
              A model composes from what it has been given. OpenAI describes a library of components that gives each
              response a familiar foundation. Uber&rsquo;s agent writes accurate specs because it reads real token
              names and variants. Atlassian found that without structured guidance, agents produced outdated patterns
              and invented components.
            </p>
            <p className="text-ink-2">
              The common thread: the design system is becoming the instructions a model follows, as well as the
              reference people read. Where the system is vague, the output is generic.
            </p>
            <p className="flex flex-wrap gap-x-5 gap-y-1">
              <Link href="/systems#cases" className={accent}>
                Read the three case studies
              </Link>
              <Link href="/cheat-sheets/design-tokens" className={accent}>
                Design Tokens cheat sheet
              </Link>
              <Link href="/checks/ai-look" className={accent}>
                AI-look signals
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="questions" className="pt-14">
        <H2 id="questions">What designers now have to decide</H2>
        <dl className="max-w-3xl divide-y divide-line">
          {generativeDesignQuestions.map((item) => (
            <div key={item.area} className="grid gap-x-6 gap-y-1 py-3.5 sm:grid-cols-[11rem_1fr]">
              <dt className="font-semibold">{item.area}</dt>
              <dd className="text-ink-2">{item.text}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-5">
          <Link href="/cheat-sheets/accessibility" className={accent}>
            Accessibility cheat sheet
          </Link>
        </p>
      </section>
    </div>
  );
}
