import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { EditorialLabel } from "@/components/craft/Craft";
import { FreshnessStatus, SourceBadge, SourceMeta } from "@/components/source/Source";
import { Breakdown, CaseStudyCard, Flow, PolishList } from "@/components/systems/Systems";
import { Tag } from "@/components/ui/Tag";
import { ExternalLink } from "@/components/ui/primitives";
import { polishExamples, refCite, uxBreakdowns } from "@/data/references";
import { getCaseStudy, getSystem, systemToAiFlow, systems } from "@/data/systems";
import type { SourceId } from "@/types";

type Props = { params: Promise<{ id: string }> };

const profiled = systems.filter((s) => s.status === "profiled");

// The badge to show for each profiled system.
const badge: Record<string, SourceId> = { "uber-base": "uber", atlassian: "atlassian", grab: "grab", granola: "granola" };

export function generateStaticParams() {
  return profiled.map((system) => ({ id: system.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const system = getSystem((await params).id);
  // "Atlassian Design System" already names its organisation; "Base" does not.
  const title = system && (system.name.includes(system.organisation) ? system.name : `${system.organisation} ${system.name}`);
  return { title: title ?? "Design System Library" };
}

const accessTone = { Public: "ok", Mixed: "warn", "Staff login": "outline" } as const;

async function Profile({ params }: Props) {
  const system = getSystem((await params).id);
  if (!system || system.status !== "profiled") notFound();

  const studies = (system.caseStudyIds ?? []).map(getCaseStudy).filter((s) => s !== undefined);
  const isSystem = system.type === "Public design system";
  const breakdowns = uxBreakdowns[system.id] ?? [];
  const polish = polishExamples[system.id] ?? [];

  return (
    <div className="page">
      <header className="border-b border-line pb-8 pt-8 md:pt-10">
        <Link href="/systems" className="inline-flex items-center gap-1.5 text-sm text-ink-2 hover:text-ink">
          <ArrowLeft aria-hidden className="size-4" />
          Design System Library
        </Link>
        <p className="mt-5 text-ink-3">{system.organisation}</p>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-4xl font-semibold md:text-5xl">{system.name}</h1>
          <Tag tone={isSystem ? "ok" : "outline"}>{system.type}</Tag>
        </div>
        <p className="mt-3 max-w-read text-lg text-ink-2">{system.summary}</p>
        <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
          <div>
            <dt className="text-sm text-ink-3">Used for</dt>
            <dd className="font-medium">{system.usedFor}</dd>
          </div>
          <div>
            <dt className="text-sm text-ink-3">Last checked</dt>
            <dd>
              <FreshnessStatus dateVerified={system.dateVerified} />
            </dd>
          </div>
          {isSystem && (
            <div>
              <dt className="text-sm text-ink-3">Last updated</dt>
              <dd className="font-medium">{system.lastUpdated ?? "Not stated on the pages read"}</dd>
            </div>
          )}
        </dl>
        <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
          {badge[system.id] && <SourceBadge id={badge[system.id]} />}
          <ExternalLink href={system.officialUrl}>Official source</ExternalLink>
        </p>
        {system.caveat && (
          <p className="mt-5 max-w-read rounded-sm bg-warn-wash px-3 py-2 text-[0.9375rem] text-warn">
            <span className="font-semibold">{isSystem ? "What Shortcut could read. " : "Read this first. "}</span>
            {system.caveat}
          </p>
        )}
      </header>

      <div className="space-y-12 pt-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <section aria-labelledby="interesting">
            <div className="flex flex-wrap items-end justify-between gap-2 border-b-2 border-ink pb-2">
              <h2 id="interesting" className="text-2xl font-semibold">
                What makes it interesting
              </h2>
              <EditorialLabel kind="craft-guidance" />
            </div>
            <ul className="mt-4 space-y-2">
              {(system.interesting ?? []).map((item) => (
                <li key={item} className="border-l border-line-strong pl-3 text-ink-2">
                  {item}
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="learn">
            <h2 id="learn" className="border-b-2 border-ink pb-2 text-2xl font-semibold">
              What designers can learn from it
            </h2>
            <ul className="mt-4 space-y-2">
              {(system.learn ?? []).map((item) => (
                <li key={item} className="border-l-2 border-mark pl-3">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {system.explore && (
        <section aria-labelledby="explore">
          <h2 id="explore" className="border-b-2 border-ink pb-2 text-2xl font-semibold">
            Explore
          </h2>
          <dl className="divide-y divide-line">
            {(system.explore ?? []).map((row) => (
              <div key={row.area} className="grid gap-x-6 gap-y-1 py-3.5 md:grid-cols-[14rem_1fr_auto] md:items-baseline">
                <dt className="font-semibold">{row.area}</dt>
                <dd className="text-ink-2">{row.items}</dd>
                <dd>
                  <Tag tone={accessTone[row.access]}>{row.access === "Mixed" ? "Partly behind login" : row.access}</Tag>
                </dd>
              </div>
            ))}
          </dl>
        </section>
        )}

        {breakdowns.length > 0 && (
          <section aria-labelledby="breakdowns">
            <h2 id="breakdowns" className="border-b-2 border-ink pb-2 text-2xl font-semibold">
              UX breakdowns
            </h2>
            <p className="mt-3 max-w-read text-ink-2">
              Each one keeps what {system.organisation} wrote apart from what Shortcut takes from it. Read the original for the full account.
            </p>
            <div className="space-y-5 pt-5">
              {breakdowns.map((item) => (
                <Breakdown key={item.id} item={item} organisation={system.organisation} />
              ))}
            </div>
          </section>
        )}

        {polish.length > 0 && (
          <section aria-labelledby="polish">
            <h2 id="polish" className="border-b-2 border-ink pb-2 text-2xl font-semibold">
              Small changes, from its own changelog
            </h2>
            <PolishList items={polish} organisation={system.organisation} citation={refCite.granola} />
          </section>
        )}

        {system.sections?.map((section) => (
          <section key={section.title} aria-label={section.title} className="max-w-3xl">
            <h2 className="border-b-2 border-ink pb-2 text-2xl font-semibold">{section.title}</h2>
            <p className="mt-4">{section.body}</p>
            {section.points && (
              <ul className="mt-3 space-y-1.5">
                {section.points.map((point) => (
                  <li key={point} className="border-l border-line-strong pl-3 text-ink-2">
                    {point}
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-4">
              <SourceMeta citations={[section.citation]} heading="Official source" />
            </div>
          </section>
        ))}

        {studies.length > 0 && (
          <section aria-labelledby="ai">
            <h2 id="ai" className="border-b-2 border-ink pb-2 text-2xl font-semibold">
              {isSystem ? "AI and the design system" : "AI in the design team"}
            </h2>
            <div className={isSystem ? "grid gap-8 pt-5 lg:grid-cols-[14rem_1fr]" : "pt-5"}>
              {isSystem && (
              <div>
                <p className="mb-3 text-sm text-ink-2">How a design system becomes context for AI. Shortcut&rsquo;s summary of these case studies.</p>
                <Flow steps={systemToAiFlow} emphasise={5} />
              </div>
              )}
              <div className="space-y-5">
                {studies.map((study) => (
                  <CaseStudyCard key={study.id} study={study} lessonLabel={isSystem ? undefined : "What designers can take from it"} />
                ))}
                <p>
                  <Link href={isSystem ? "/ai/generative-ui" : "/ai/workflow"} className="font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent">
                    {isSystem ? "What this means for generative UI" : "AI in your design workflow"}
                  </Link>
                </p>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

// Route params are read inside Suspense, as this Next.js version expects.
export default function SystemPage({ params }: Props) {
  return (
    <Suspense>
      <Profile params={params} />
    </Suspense>
  );
}
