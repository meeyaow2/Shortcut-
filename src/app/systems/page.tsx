import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { EditorialLabel } from "@/components/craft/Craft";
import { FreshnessStatus } from "@/components/source/Source";
import { CaseStudyCard, ResponsiveBlock } from "@/components/systems/Systems";
import { Tag } from "@/components/ui/Tag";
import { ExternalLink, PageHeader } from "@/components/ui/primitives";
import { referenceCaseStudies } from "@/data/references";
import { caseStudies, learnFrom, responsiveGuidance, systems, type SystemProfile } from "@/data/systems";

export const metadata: Metadata = { title: "Design System Library" };

const accent = "font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent";

function SystemCard({ system }: { system: SystemProfile }) {
  return (
    <li id={system.id} className="anchor-target flex flex-col rounded-md border border-line p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-sm text-ink-3">{system.organisation}</p>
          <h3 className="text-xl font-semibold">{system.name}</h3>
        </div>
        <Tag tone={system.type === "Public design system" ? "ok" : "outline"}>{system.type}</Tag>
      </div>
      <p className="mt-2 flex-1 text-ink-2">{system.summary}</p>
      {system.caveat && <p className="mt-2 text-sm text-warn">{system.caveat}</p>}
      {responsiveGuidance[system.id] && (
        <p className="mt-2 text-sm text-ink-3">
          <a href="#responsive" className="underline decoration-line-strong underline-offset-4 hover:text-ink">
            {responsiveGuidance[system.id].label}
          </a>
        </p>
      )}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-line pt-3 text-sm">
        {system.dateVerified ? <FreshnessStatus dateVerified={system.dateVerified} /> : <span className="text-ink-3">Not yet read by Shortcut</span>}
        {system.status === "profiled" && (
          <Link href={`/systems/${system.id}`} className={`inline-flex items-center gap-1 ${accent}`}>
            Open profile
            <ArrowRight aria-hidden className="size-4" />
          </Link>
        )}
        {system.status === "listed" && (
          <Link href="/explorer" className={accent}>
            See it compared
          </Link>
        )}
        {system.status === "planned" && <ExternalLink href={system.officialUrl}>Official site</ExternalLink>}
      </div>
    </li>
  );
}

function Group({ id, title, note, list }: { id: string; title: string; note: string; list: SystemProfile[] }) {
  return (
    <section aria-labelledby={id} className="pt-12">
      <h2 id={id} className="border-b-2 border-ink pb-2 text-2xl font-semibold md:text-3xl">
        {title}
      </h2>
      <p className="mt-3 max-w-read text-ink-2">{note}</p>
      <ul className="grid gap-4 pt-5 md:grid-cols-2 lg:grid-cols-3">
        {list.map((system) => (
          <SystemCard key={system.id} system={system} />
        ))}
      </ul>
    </section>
  );
}

export default function SystemsPage() {
  const publicSystems = systems.filter((s) => s.type === "Public design system");
  const profiled = publicSystems.filter((s) => s.status === "profiled");
  const compared = publicSystems.filter((s) => s.status === "listed");
  const planned = publicSystems.filter((s) => s.status === "planned");
  const references = systems.filter((s) => s.type === "Product design reference");

  return (
    <div className="page">
      <PageHeader
        title="Design System Library"
        lede="Real design systems, and what a designer can learn from each. Every entry says what the organisation actually publishes, and links to it."
      >
        <dl className="mt-6 grid max-w-3xl gap-x-8 gap-y-3 sm:grid-cols-2">
          <div>
            <dt className="font-semibold">Public design system</dt>
            <dd className="text-ink-2">Structured guidance and components the organisation publishes officially.</dd>
          </div>
          <div>
            <dt className="font-semibold">Product design reference</dt>
            <dd className="text-ink-2">Useful design material from a company that has no public system Shortcut could verify.</dd>
          </div>
        </dl>
        <p className="mt-5">
          <Link href="/explorer" className={`inline-flex items-center gap-1 ${accent}`}>
            Compare systems topic by topic
            <ArrowRight aria-hidden className="size-4" />
          </Link>
        </p>
      </PageHeader>

      <section aria-labelledby="learn" className="pt-8">
        <div className="flex flex-wrap items-end justify-between gap-2 border-b-2 border-ink pb-2">
          <h2 id="learn" className="text-2xl font-semibold md:text-3xl">
            Learn from real design systems
          </h2>
          <EditorialLabel kind="craft-guidance" />
        </div>
        <p className="mt-3 max-w-read text-ink-2">Starting points by subject, in no ranked order. Only systems Shortcut has read on that subject are named.</p>
        <dl className="mt-4 divide-y divide-line">
          {learnFrom.map((row) => (
            <div key={row.want} className="grid gap-x-6 gap-y-1 py-3 sm:grid-cols-[16rem_1fr]">
              <dt className="font-semibold">{row.want}</dt>
              <dd className="flex flex-wrap gap-x-5 gap-y-1">
                {row.where.map((item) => (
                  <Link key={item.label} href={item.href} className={accent}>
                    {item.label}
                  </Link>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <Group id="profiled" title="Profiles" note="Systems Shortcut has read in full and written up." list={profiled} />
      <Group id="compared" title="In the comparison" note="Compared topic by topic, up to four at a time. Each card says which pages Shortcut has read. Their profiles are not written yet." list={compared} />
      <Group id="planned" title="Not yet read" note="Named for completeness. Shortcut says nothing about them until it has read their own pages." list={planned} />
      <Group
        id="references"
        title="Product design references"
        note="Companies whose published design material is worth studying. Shortcut found no public design system for either, so neither is described as having one."
        list={references}
      />

      <section aria-labelledby="responsive" className="pt-12">
        <h2 id="responsive" className="border-b-2 border-ink pb-2 text-2xl font-semibold md:text-3xl">
          Responsive and device guidance
        </h2>
        <p className="mt-3 max-w-read text-ink-2">
          What each system itself says about viewports, touch and devices, on the pages Shortcut has read. No values are filled in for a system that does not
          publish them.{" "}
          <Link href="/explorer#kind-Viewport" className={accent}>
            Compare by viewport and platform
          </Link>
        </p>
        <div className="max-w-3xl space-y-8 pt-6">
          {systems
            .filter((system) => responsiveGuidance[system.id])
            .map((system) => (
              <ResponsiveBlock key={system.id} name={system.name} guidance={responsiveGuidance[system.id]} />
            ))}
        </div>
      </section>

      <section aria-labelledby="cases" className="pt-12">
        <h2 id="cases" className="border-b-2 border-ink pb-2 text-2xl font-semibold md:text-3xl">
          Design and AI: case studies
        </h2>
        <div className="space-y-5 pt-5">
          {caseStudies.map((study) => (
            <CaseStudyCard key={study.id} study={study} />
          ))}
          {referenceCaseStudies.map((study) => (
            <CaseStudyCard key={study.id} study={study} lessonLabel="What designers can take from it" />
          ))}
        </div>
      </section>
    </div>
  );
}
