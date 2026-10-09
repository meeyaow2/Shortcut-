import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { EditorialLabel, MentorNote, Why } from "@/components/craft/Craft";
import { DoDont } from "@/components/practice/Practice";
import { SourceMeta } from "@/components/source/Source";
import { AgendaTimeline, ProcessStrip } from "@/components/visual/Diagrams";
import { getPracticeGuide, getPracticeTemplate, practiceGuides } from "@/data/practice";

// The shape of the whole activity, drawn above its steps. The highlighted step is the one the rest exist to serve.
const flows: Record<string, { steps: string[]; emphasise: number[]; caption: string }> = {
  "user-interview": { steps: ["Before", "Interview", "Debrief", "Synthesis", "Finding"], emphasise: [4], caption: "An interview is one step of five. The finding is what it is for; notes that never reach synthesis were not worth taking." },
  synthesis: { steps: ["Notes", "Clusters", "Themes", "Insights", "Opportunities"], emphasise: [3], caption: "Each step says more with fewer items. An insight is the first point at which someone outside the team can act on it." },
};

type Props = { params: Promise<{ guide: string }> };

export function generateStaticParams() {
  return practiceGuides.map((guide) => ({ guide: guide.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const guide = getPracticeGuide((await params).guide);
  return { title: guide ? guide.title : "UX Practice" };
}

const accent = "font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent";

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="anchor-target">
      <h2 id={`${id}-title`} className="border-b-2 border-ink pb-2 text-2xl font-semibold">
        {title}
      </h2>
      <div className="pt-4">{children}</div>
    </section>
  );
}

function Lines({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item) => (
        <li key={item} className="border-l border-line-strong pl-3 text-ink-2">
          {item}
        </li>
      ))}
    </ul>
  );
}

async function Guide({ params }: Props) {
  const guide = getPracticeGuide((await params).guide);
  if (!guide) notFound();

  const templates = guide.templateIds.map(getPracticeTemplate).filter((t) => t !== undefined);
  const related = guide.related.map(getPracticeGuide).filter((g) => g !== undefined);

  // Experienced readers jump straight to the part they need; beginners read down.
  const jump = [
    ["prepare", "Prepare"],
    ["steps", "Step by step"],
    ["do-dont", "Do and don't"],
    ["checklist", "Checklist"],
    ["templates", "Templates"],
    ["references", "References"],
  ];

  return (
    <div className="page">
      <header className="border-b border-line pb-8 pt-8 md:pt-10">
        <Link href="/practice" className="-my-2 inline-flex items-center gap-1.5 py-2 text-sm text-ink-2 hover:text-ink">
          <ArrowLeft aria-hidden className="size-4" />
          UX Practice
        </Link>
        <h1 className="mt-5 text-4xl font-semibold md:text-5xl">{guide.title}</h1>
        <p className="mt-3 max-w-read text-lg text-ink-2">{guide.overview}</p>
        {guide.facts && (
          <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-2">
            {guide.facts.map((fact) => (
              <div key={fact.label}>
                <dt className="text-sm text-ink-3">{fact.label}</dt>
                <dd className="font-medium">{fact.value}</dd>
              </div>
            ))}
          </dl>
        )}
        <div className="mt-5 space-y-2">
          <EditorialLabel kind="craft-guidance" />
          <p className="max-w-read text-sm text-ink-2">
            Written as practical advice. Where a step rests on established research practice, the source is listed
            under References. Nothing here is a universal rule.
          </p>
        </div>
        <nav aria-label="Jump to" className="-mx-4 mt-5 flex gap-1.5 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
          {jump.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className="inline-flex min-h-11 md:min-h-9 shrink-0 items-center whitespace-nowrap rounded-sm border border-line px-3 text-[0.9375rem] text-ink-2 hover:border-ink hover:text-ink"
            >
              {label}
            </a>
          ))}
        </nav>
      </header>

      <div className="grid gap-10 pt-8 lg:grid-cols-[1fr_18rem]">
        <div className="min-w-0 max-w-3xl stack-sections">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h2 className="font-sans text-sm font-semibold tracking-normal text-ok">Use this when</h2>
              <div className="mt-2">
                <Lines items={guide.useWhen} />
              </div>
            </div>
            <div>
              <h2 className="font-sans text-sm font-semibold tracking-normal text-warn">Don&rsquo;t use this when</h2>
              <div className="mt-2">
                <Lines items={guide.dontUseWhen} />
              </div>
            </div>
          </div>

          <Section id="prepare" title="Prepare">
            <Lines items={guide.prepare} />
          </Section>

          <Section id="steps" title="Step by step">
            {/* The shape of the activity before its detail: a drawn flow where one exists, otherwise the step names in order. */}
            <div className="mb-5">
              {flows[guide.id] ? (
                <ProcessStrip {...flows[guide.id]} />
              ) : (
                <ProcessStrip steps={guide.steps.map((step) => step.title)} caption="The steps in order. Each is explained below." />
              )}
            </div>
            {/* Numbered: the steps happen in this order. */}
            <ol className="divide-y divide-line">
              {guide.steps.map((step, index) => (
                <li key={step.title} className="grid grid-cols-[2rem_1fr] gap-x-3 py-3.5 first:pt-0">
                  <span aria-hidden className="font-display text-lg font-semibold tabular-nums text-ink-3">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-sans text-base font-semibold tracking-normal">{step.title}</h3>
                    <p className="text-ink-2">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Section>

          {guide.agenda && (
            <Section id="agenda" title={guide.agendaTitle ?? "Example agenda: problem framing, 80 minutes"}>
              <div className="mb-4">
                <AgendaTimeline rows={guide.agenda} />
              </div>
              <dl className="divide-y divide-line rounded-md border border-line">
                {guide.agenda.map((row) => (
                  <div key={row.activity} className="grid grid-cols-[5rem_1fr] gap-x-4 px-4 py-2.5">
                    <dt className="font-display font-semibold tabular-nums">{row.time}</dt>
                    <dd>{row.activity}</dd>
                  </div>
                ))}
              </dl>
            </Section>
          )}

          {guide.script && (
            <Section id="script" title="What to say">
              <ul className="space-y-2">
                {guide.script.map((line) => (
                  <li key={line} className="border-l-2 border-mark pl-3">
                    {line}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {guide.examples && (
            <Section id="examples" title={guide.examples.heading}>
              <ul className="space-y-4">
                {guide.examples.pairs.map((pair) => (
                  <li key={pair.weak} className="rounded-md border border-line">
                    <div className="grid sm:grid-cols-2">
                      <div className="border-b border-line p-4 sm:border-b-0 sm:border-r">
                        <p className="text-sm font-semibold text-warn">Weak</p>
                        <p className="mt-1">{pair.weak}</p>
                      </div>
                      <div className="p-4">
                        <p className="text-sm font-semibold text-ok">Better</p>
                        <p className="mt-1">{pair.better}</p>
                      </div>
                    </div>
                    <p className="border-t border-line bg-wash px-4 py-2.5 text-[0.9375rem] text-ink-2">
                      <span className="font-semibold text-ink">Why. </span>
                      {pair.why}
                    </p>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {/* Reference blocks specific to this guide. Closed by default: they are for looking up, not reading through. */}
          {guide.extras && (
            <section aria-label="Reference" className="space-y-2">
              {guide.extras.map((extra) => (
                <Why key={extra.title} label={`${extra.title} (${extra.items.length})`}>
                  <div className="text-ink">
                    <Lines items={extra.items} />
                  </div>
                </Why>
              ))}
            </section>
          )}

          <Section id="do-dont" title="Do and don't">
            <DoDont dos={guide.dos} donts={guide.donts} />
          </Section>

          <Section id="mistakes" title="Common mistakes">
            <Lines items={guide.mistakes} />
            <div className="mt-5">
              <MentorNote>{guide.mentorNote}</MentorNote>
            </div>
          </Section>

          <Section id="after" title="After the session">
            <Lines items={guide.after} />
          </Section>

          <Section id="checklist" title="Checklist">
            <ul className="divide-y divide-line rounded-md border border-line">
              {guide.checklist.map((item) => (
                <li key={item} className="flex items-center gap-3 px-4 py-2.5">
                  <span aria-hidden className="size-4 shrink-0 rounded-[3px] border border-line-strong" />
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          <Section id="templates" title="Templates">
            <ul className="grid gap-3 sm:grid-cols-2">
              {templates.map((template) => (
                <li key={template.id}>
                  <Link href={`/practice/templates#${template.id}`} className="block h-full rounded-md border border-line p-4 transition-colors hover:border-ink">
                    <span className="font-semibold">{template.title}</span>
                    <span className="block text-sm text-ink-2">{template.purpose}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Section>

          <Section id="references" title="References">
            <SourceMeta citations={guide.references} heading="Reference" />
          </Section>
        </div>

        <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
          <section aria-labelledby="ai-help">
            <h2 id="ai-help" className="font-sans text-sm font-semibold tracking-normal">
              Where AI may help
            </h2>
            <div className="mt-2">
              <Lines items={guide.ai.canHelp} />
            </div>
            <h3 className="mt-4 font-sans text-sm font-semibold tracking-normal text-warn">AI should not</h3>
            <div className="mt-2">
              <Lines items={guide.ai.shouldNot} />
            </div>
            <p className="mt-3">
              <Link href={guide.ai.link.href} className={accent}>
                {guide.ai.link.label}
              </Link>
            </p>
          </section>

          <section aria-labelledby="related">
            <h2 id="related" className="font-sans text-sm font-semibold tracking-normal">
              Related guides
            </h2>
            <ul className="mt-2 space-y-2">
              {related.map((other) => (
                <li key={other.id}>
                  <Link href={`/practice/${other.id}`} className="block rounded-md border border-line p-3 font-medium transition-colors hover:border-ink">
                    {other.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </div>
  );
}

// Route params are read inside Suspense, as this Next.js version expects.
export default function PracticeGuidePage({ params }: Props) {
  return (
    <Suspense>
      <Guide params={params} />
    </Suspense>
  );
}
