import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { EditorialLabel, MentorNote } from "@/components/craft/Craft";
import { PageHeader } from "@/components/ui/primitives";
import { mentorNotes, openResources, plannedGuides, practiceGuides, practiceTemplates } from "@/data/practice";

export const metadata: Metadata = { title: "UX Practice" };

const link = "inline-flex items-center gap-1 whitespace-nowrap text-sm font-medium text-ink-2 hover:text-accent";

// The checklist from each guide, for the night before.
const beforeSession = practiceGuides.filter((g) => ["user-interview", "usability-test", "workshop"].includes(g.id));

export default function PracticePage() {
  return (
    <div className="page">
      <PageHeader
        title="UX Practice"
        lede="Practical guides for doing the work. Research, interviews, workshops, critique and synthesis, with checklists, templates and trusted references."
      >
        <nav aria-label="Quick actions" className="mt-6">
          <ul className="flex flex-wrap gap-1.5">
            {practiceGuides.map((guide) => (
              <li key={guide.id}>
                <Link
                  href={`/practice/${guide.id}`}
                  className="inline-flex min-h-11 md:min-h-10 items-center rounded-sm border border-line px-3 text-[0.9375rem] text-ink-2 transition-colors hover:border-ink hover:text-ink"
                >
                  {guide.action}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </PageHeader>

      <section aria-labelledby="guides" className="pt-8">
        <div className="flex flex-wrap items-end justify-between gap-2 border-b-2 border-ink pb-2">
          <h2 id="guides" className="text-2xl font-semibold md:text-3xl">
            Guides
          </h2>
          <EditorialLabel kind="craft-guidance" />
        </div>
        <ul className="grid gap-4 pt-5 sm:grid-cols-2 lg:grid-cols-3">
          {practiceGuides.map((guide) => (
            <li key={guide.id}>
              <Link href={`/practice/${guide.id}`} className="flex h-full flex-col rounded-md border border-line p-4 transition-colors hover:border-ink sm:p-5">
                <span className="font-display text-xl font-semibold tracking-tight">{guide.title}</span>
                <span className="mt-2 flex-1 text-ink-2">{guide.overview}</span>
                <span className="mt-3 border-t border-line pt-3 text-sm text-ink-3">
                  {guide.steps.length} steps, {guide.checklist.length}-item checklist, {guide.references.length} {guide.references.length === 1 ? "reference" : "references"}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        {plannedGuides.length > 0 && (
          <p className="mt-5 max-w-read text-ink-2">
            <span className="font-semibold text-ink">Not written yet: </span>
            {plannedGuides.join(", ")}.
          </p>
        )}
      </section>

      <section aria-labelledby="before" className="section-gap">
        <h2 id="before" className="border-b-2 border-ink pb-2 text-2xl font-semibold md:text-3xl">
          Before your next session
        </h2>
        <div className="grid gap-x-10 gap-y-6 pt-5 md:grid-cols-3">
          {beforeSession.map((guide) => (
            <div key={guide.id}>
              <h3 className="font-sans text-base font-semibold tracking-normal">
                <Link href={`/practice/${guide.id}#checklist`} className="hover:text-accent">
                  {guide.action}
                </Link>
              </h3>
              <ul className="mt-2 space-y-1.5">
                {guide.checklist.map((item) => (
                  <li key={item} className="border-l border-line-strong pl-3 text-ink-2">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="templates" className="section-gap">
        <div className="flex items-end justify-between gap-4 border-b-2 border-ink pb-2">
          <h2 id="templates" className="text-2xl font-semibold md:text-3xl">
            Templates
          </h2>
          <Link href="/practice/templates" className={link}>
            All {practiceTemplates.length} templates
            <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
        <ul className="grid grid-cols-2 gap-2 pt-5 sm:grid-cols-3 lg:grid-cols-5">
          {practiceTemplates.map((template) => (
            <li key={template.id}>
              <Link
                href={`/practice/templates#${template.id}`}
                className="flex h-full min-h-16 items-center rounded-md border border-line p-3 font-medium transition-colors hover:border-ink"
              >
                {template.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="library" className="section-gap">
        <div className="flex items-end justify-between gap-4 border-b-2 border-ink pb-2">
          <h2 id="library" className="text-2xl font-semibold md:text-3xl">
            Open Design Library
          </h2>
          <Link href="/practice/library" className={link}>
            All {openResources.length} resources
            <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
        <p className="mt-3 max-w-read text-ink-2">
          Free and open design systems, research guides, accessibility tools, icons and fonts. Each shows the licence
          its own repository reports, or says it was not checked.
        </p>
      </section>

      <section aria-labelledby="notes" className="section-gap">
        <h2 id="notes" className="border-b-2 border-ink pb-2 text-2xl font-semibold md:text-3xl">
          What senior colleagues tell you
        </h2>
        <div className="grid gap-x-10 gap-y-5 pt-5 md:grid-cols-2">
          {mentorNotes.map((note) => (
            <MentorNote key={note}>{note}</MentorNote>
          ))}
        </div>
      </section>
    </div>
  );
}
