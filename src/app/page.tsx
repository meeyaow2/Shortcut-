import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { WeekList } from "@/components/ai/WeekList";
import { SearchBox } from "@/components/search/SearchBox";
import { FreshnessStatus, SourceBadge } from "@/components/source/Source";
import { UpdateRow } from "@/components/updates/UpdateCard";
import { cheatSheets, getCheatSheet, popularSheets } from "@/data/cheat-sheets";
import { sources } from "@/data/sources";
import { updates } from "@/data/updates";
import { formatDate } from "@/lib/dates";
import { sheetStats } from "@/lib/sheets";

const latest = [...updates].sort((a, b) => b.datePublished.localeCompare(a.datePublished)).slice(0, 5);
const recentlyUpdated = [...cheatSheets].sort((a, b) => b.dateUpdated.localeCompare(a.dateUpdated)).slice(0, 6);

const quickEntries = [
  { label: "Spacing", href: "/cheat-sheets/spacing" },
  { label: "Typography", href: "/cheat-sheets/typography" },
  { label: "Colour", href: "/cheat-sheets/colour" },
  { label: "Radius", href: "/cheat-sheets/radius" },
  { label: "Shadows", href: "/cheat-sheets/shadows-and-borders" },
  { label: "Forms", href: "/cheat-sheets/forms" },
  { label: "Tables", href: "/cheat-sheets/tables" },
  { label: "Accessibility", href: "/cheat-sheets/accessibility" },
  { label: "Responsive", href: "/cheat-sheets/responsive-design" },
  { label: "Safe starting points", href: "/starting-points" },
  { label: "Design QA", href: "/checks" },
  { label: "Singapore UX", href: "/singapore" },
];

function SectionHeading({ id, title, href, linkLabel }: { id: string; title: string; href: string; linkLabel: string }) {
  return (
    <div className="flex items-end justify-between gap-4 border-b-2 border-ink pb-2">
      <h2 id={id} className="text-2xl font-semibold md:text-3xl">
        {title}
      </h2>
      <Link href={href} className="inline-flex items-center gap-1 whitespace-nowrap text-sm font-medium text-ink-2 hover:text-accent">
        {linkLabel}
        <ArrowRight aria-hidden className="size-4" />
      </Link>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="page">
      {/* The headline steps down with the viewport so it never dominates a small screen. */}
      <section className="pb-12 pt-10 sm:pt-14 md:pb-20 md:pt-24">
        <h1 className="max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:text-7xl">
          Everything UI/UX, without the rabbit hole.
        </h1>
        <p className="mt-4 max-w-read text-lg text-ink-2 sm:mt-5 sm:text-xl">
          Standards, patterns, practical guidance and design checks for product designers. The things your design
          lead tells you in review, before they have to tell you.
        </p>
        <div className="mt-8 max-w-3xl">
          <SearchBox variant="hero" placeholder="Search spacing, accessibility, components, guidelines…" />
        </div>
        <nav aria-label="Quick entry points" className="mt-5 max-w-3xl">
          <ul className="flex flex-wrap gap-1.5">
            {quickEntries.map((entry) => (
              <li key={entry.href}>
                <Link
                  href={entry.href}
                  className="inline-flex min-h-9 items-center rounded-sm border border-line px-3 text-[0.9375rem] text-ink-2 transition-colors hover:border-ink hover:text-ink"
                >
                  {entry.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-8 flex max-w-3xl flex-wrap items-center justify-between gap-4 border-y border-line py-4">
          <div>
            <p className="font-display text-xl font-semibold tracking-tight">Before you send it</p>
            <p className="text-ink-2">A final design QA before your design lead sees it.</p>
          </div>
          <Link
            href="/checks/before-you-send-it"
            className="inline-flex min-h-11 items-center gap-2 rounded-sm bg-ink px-4 font-medium text-paper hover:bg-accent-strong"
          >
            Open the checklist
            <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
        <p className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-sm text-ink-2">
          <span>Tracking</span>
          {sources.map((source) => (
            <SourceBadge key={source.id} id={source.id} />
          ))}
        </p>
      </section>

      <section aria-labelledby="latest">
        <SectionHeading id="latest" title="Latest in UI/UX" href="/updates" linkLabel="All updates" />
        <div className="divide-y divide-line">
          {latest.map((update) => (
            <UpdateRow key={update.id} update={update} />
          ))}
        </div>
      </section>

      <section aria-labelledby="ai" className="mt-16">
        <SectionHeading id="ai" title="AI + Design: what changed this week" href="/ai/updates" linkLabel="All AI updates" />
        <WeekList />
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {[
            { href: "/ai/workflow", label: "AI in your workflow" },
            { href: "/ai/prompts", label: "Prompt Library" },
            { href: "/ai/tools", label: "AI tools" },
            { href: "/ai/review", label: "AI design review" },
          ].map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="inline-flex min-h-9 items-center rounded-sm border border-line px-3 text-[0.9375rem] text-ink-2 transition-colors hover:border-ink hover:text-ink">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="singapore" className="mt-16">
        <SectionHeading id="singapore" title="Designing for Singapore" href="/singapore" linkLabel="Singapore UX" />
        <p className="mt-3 max-w-read text-ink-2">
          Singapore government standards and SGDS, shown beside the global guidance they build on, with the weight
          each one carries.
        </p>
        <ul className="mt-5 grid gap-2 sm:grid-cols-3">
          {[
            { href: "/singapore", title: "9 baseline controls", detail: "BD-1 to BD-9, each with the official wording and a designer takeaway." },
            { href: "/cheat-sheets/forms#mandatory-and-optional-fields", title: "Mandatory fields, compared", detail: "Singapore, SGDS, GOV.UK and WCAG side by side." },
            { href: "/explorer/design-tokens", title: "SGDS tokens, explained", detail: "Five layers and when to use each, against three other systems." },
          ].map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="group flex h-full flex-col rounded-md border border-line p-4 transition-colors hover:border-ink">
                <span className="font-display text-lg font-semibold tracking-tight">{item.title}</span>
                <span className="mt-1 text-sm text-ink-2">{item.detail}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="popular" className="mt-16">
        <SectionHeading id="popular" title="Popular cheat sheets" href="/cheat-sheets" linkLabel="All cheat sheets" />
        <ul className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
          {popularSheets.map((slug) => {
            const sheet = getCheatSheet(slug)!;
            return (
              <li key={slug}>
                <Link
                  href={`/cheat-sheets/${slug}`}
                  className="group flex h-full min-h-20 flex-col justify-between rounded-md border border-line p-3 transition-colors hover:border-ink"
                >
                  <span className="font-display text-lg font-semibold tracking-tight">{sheet.title}</span>
                  <span className="text-sm text-ink-3 group-hover:text-ink-2">{sheetStats(sheet).ruleCount} rules</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section aria-labelledby="recent" className="mt-16">
        <SectionHeading id="recent" title="Recently updated" href="/cheat-sheets" linkLabel="All cheat sheets" />
        <p className="mt-3 max-w-read text-ink-2">
          Every rule is re-checked against its source. You should never have to wonder whether the advice is five
          years old.
        </p>
        <ul className="mt-3 divide-y divide-line">
          {recentlyUpdated.map((sheet) => {
            const { sourceIds, dateVerified } = sheetStats(sheet);
            return (
              <li key={sheet.slug} className="grid items-center gap-x-6 gap-y-1 py-3 sm:grid-cols-[1fr_auto_auto]">
                <Link href={`/cheat-sheets/${sheet.slug}`} className="font-medium hover:text-accent">
                  {sheet.title} cheat sheet
                </Link>
                <span className="text-sm text-ink-2">
                  Updated {formatDate(sheet.dateUpdated)}, {sourceIds.length} {sourceIds.length === 1 ? "source" : "sources"}
                </span>
                <FreshnessStatus dateVerified={dateVerified} />
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
