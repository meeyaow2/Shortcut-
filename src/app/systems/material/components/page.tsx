import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { EditorialLabel } from "@/components/craft/Craft";
import { FreshnessStatus, SourceBadge } from "@/components/source/Source";
import { DecisionHelpers, MaterialTabs } from "@/components/systems/Profiles";
import { Tag } from "@/components/ui/Tag";
import { InThirty } from "@/components/ui/Scan";
import { getMaterialComponent, materialCite, materialComponents, materialGroups } from "@/data/material";

export const metadata: Metadata = { title: "Material components" };

const accent = "font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent";
const groupId = (group: string) => `group-${group.replace(" ", "-")}`;

export default function MaterialComponentsPage() {
  return (
    <div className="page">
      <header className="border-b border-line pb-8 pt-8 md:pt-10">
        <Link href="/systems/material" className="-my-2 inline-flex items-center gap-1.5 py-2 text-sm text-ink-2 hover:text-ink">
          <ArrowLeft aria-hidden className="size-4" />
          Material Design
        </Link>
        <p className="mt-5 text-ink-3">Google</p>
        <h1 className="text-4xl font-semibold md:text-5xl">Material components</h1>
        <p className="mt-3 max-w-read text-lg text-ink-2">
          All {materialComponents.length} components on Material&rsquo;s own list: what each is for, its variants, and where it has been replaced.
        </p>
        <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
          <SourceBadge id="material" />
          <FreshnessStatus dateVerified={materialCite.components.dateVerified} />
        </p>
        <p className="mt-5 max-w-read rounded-sm bg-warn-wash px-3 py-2 text-[0.9375rem] text-warn">
          <span className="font-semibold">What Shortcut read. </span>
          The Overview tab of each component. Measurements, anatomy, states and accessibility detail are on Material&rsquo;s Specs, Guidelines and Accessibility
          tabs, which are linked from every entry and not repeated here.
        </p>
      </header>

      <div className="stack-sections pt-8">
        <InThirty
          items={[
            "Six groups: action, communication, containment, navigation, selection, text input.",
            "Five components are new in Material 3 Expressive.",
            "Segmented buttons and the navigation drawer are no longer recommended.",
            "Each entry: Material's summary first, Shortcut's note last.",
          ]}
        />

        <nav aria-label="Component groups">
          <ul className="flex flex-wrap gap-2">
            {materialGroups.map((group) => (
              <li key={group}>
                <a href={`#${groupId(group)}`} className="inline-flex min-h-11 items-center rounded-sm border border-line-strong px-3 font-medium hover:border-ink md:min-h-9">
                  {group}
                </a>
              </li>
            ))}
            <li>
              <a href="#choose" className="inline-flex min-h-11 items-center rounded-sm border border-line-strong px-3 font-medium hover:border-ink md:min-h-9">
                Which component?
              </a>
            </li>
          </ul>
        </nav>

        {materialGroups.map((group) => (
          <section key={group} aria-labelledby={groupId(group)}>
            <h2 id={groupId(group)} className="anchor-target border-b-2 border-ink pb-2 text-2xl font-semibold md:text-3xl">
              {group}
            </h2>
            <div className="grid gap-4 pt-5 lg:grid-cols-2">
              {materialComponents
                .filter((component) => component.group === group)
                .map((component) => (
                  <article key={component.id} id={component.id} className="anchor-target flex flex-col rounded-md border border-line p-4 sm:p-5">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <h3 className="text-xl font-semibold">{component.name}</h3>
                      {component.status && <Tag tone={component.status.startsWith("New") ? "ok" : "warn"}>{component.status.startsWith("New") ? "New in Expressive" : "No longer recommended"}</Tag>}
                    </div>
                    <p className="mt-1 text-lg">{component.summary}</p>
                    {component.status && <p className={`mt-2 text-[0.9375rem] ${component.status.startsWith("New") ? "text-ink-2" : "text-warn"}`}>{component.status}</p>}
                    {component.variants && (
                      <p className="mt-3 text-ink-2">
                        <span className="font-semibold text-ink">Variants. </span>
                        {component.variants}
                      </p>
                    )}
                    <ul className="mt-3 flex-1 space-y-1.5">
                      {component.points.map((point) => (
                        <li key={point} className="border-l border-line-strong pl-3 text-ink-2">
                          {point}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 border-l-2 border-mark pl-3 text-[0.9375rem]">
                      <span className="font-semibold">Shortcut&rsquo;s note. </span>
                      {component.watch}
                    </p>
                    {(component.related || component.shortcut) && (
                      <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                        {component.shortcut && (
                          <Link href={component.shortcut.href} className={accent}>
                            {component.shortcut.label}
                          </Link>
                        )}
                        {component.related?.map((id) => (
                          <a key={id} href={`#${id}`} className="text-ink-2 underline decoration-line-strong underline-offset-4 hover:text-ink">
                            {getMaterialComponent(id)?.name}
                          </a>
                        ))}
                      </p>
                    )}
                    <div className="mt-4 border-t border-line pt-3">
                      <p className="mb-1 text-sm font-semibold text-ink-3">On m3.material.io</p>
                      <MaterialTabs id={component.id} />
                    </div>
                  </article>
                ))}
            </div>
          </section>
        ))}

        <section aria-labelledby="choose">
          <div className="flex flex-wrap items-end justify-between gap-2 border-b-2 border-ink pb-2">
            <h2 id="choose" className="anchor-target text-2xl font-semibold md:text-3xl">
              Which component?
            </h2>
            <EditorialLabel kind="craft-guidance" />
          </div>
          <p className="mt-3 max-w-read text-ink-2">The &ldquo;when&rdquo; column restates Material. The note under each is Shortcut&rsquo;s.</p>
          <div className="pt-5">
            <DecisionHelpers />
          </div>
          <p className="mt-5">
            <Link href="/explorer" className={accent}>
              How do other design systems handle these?
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}
