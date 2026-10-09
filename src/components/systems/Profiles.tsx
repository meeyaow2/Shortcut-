import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { EditorialLabel } from "@/components/craft/Craft";
import { SourceMeta } from "@/components/source/Source";
import { Tag } from "@/components/ui/Tag";
import { ExternalLink } from "@/components/ui/primitives";
import { KeyTakeaway } from "@/components/ui/Scan";
import { gojekCite, gojekComponents, gojekNotFound, gojekReading, seaReferences } from "@/data/gojek";
import { androidGuidance, androidUnread, componentUrl, decisionHelpers, expressive, getMaterialComponent, googleAiPatterns, googleAiUnread, materialBreakpoints, materialCite, materialComponents, materialGroups } from "@/data/material";

const accent = "font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent";

function Section({ id, title, label, children }: { id: string; title: string; label?: ReactNode; children: ReactNode }) {
  return (
    <section aria-labelledby={id}>
      <div className="flex flex-wrap items-end justify-between gap-2 border-b-2 border-ink pb-2">
        <h2 id={id} className="anchor-target text-2xl font-semibold">
          {title}
        </h2>
        {label}
      </div>
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

/** "I need to…" rows that point at Material components. Shared by the profile and the component reference. */
export function DecisionHelpers() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {decisionHelpers.map((helper) => (
        <article key={helper.id} id={helper.id} className="anchor-target rounded-md border border-line p-4 sm:p-5">
          <h3 className="text-lg font-semibold">{helper.need}</h3>
          <dl className="mt-3 divide-y divide-line">
            {helper.options.map((option) => (
              <div key={option.componentId} className="grid gap-x-4 gap-y-0.5 py-2.5 sm:grid-cols-[10rem_1fr]">
                <dt>
                  <Link href={`/systems/material/components#${option.componentId}`} className={accent}>
                    {getMaterialComponent(option.componentId)?.name}
                  </Link>
                </dt>
                <dd className="text-ink-2">{option.when}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 border-l-2 border-mark pl-3 text-[0.9375rem]">
            <span className="font-semibold">Shortcut&rsquo;s note. </span>
            {helper.tradeOff}
          </p>
        </article>
      ))}
    </div>
  );
}

/** The extra sections on Material's profile. */
export function MaterialProfile() {
  return (
    <>
      <Section id="components" title="Components">
        <p className="max-w-read text-ink-2">
          Material lists {materialComponents.length} components. Shortcut has read the Overview page of each one and summarised it, with a link to Material&rsquo;s
          own specs, guidelines and accessibility tabs.
        </p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {materialGroups.map((group) => {
            const list = materialComponents.filter((component) => component.group === group);
            return (
              <li key={group}>
                <Link href={`/systems/material/components#group-${group.replace(" ", "-")}`} className="lift flex h-full flex-col rounded-md border border-line p-4 hover:border-ink">
                  <span className="font-display text-lg font-semibold">
                    {group} <span className="font-sans text-sm font-normal text-ink-3">{list.length}</span>
                  </span>
                  <span className="mt-1 text-[0.9375rem] text-ink-2">{list.map((component) => component.name).join(", ")}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        <p className="mt-4">
          <Link href="/systems/material/components" className={`inline-flex items-center gap-1 ${accent}`}>
            Open the component reference
            <ArrowRight aria-hidden className="size-4" />
          </Link>
        </p>
      </Section>

      <Section id="choose" title="Which component?" label={<EditorialLabel kind="craft-guidance" />}>
        <p className="mb-4 max-w-read text-ink-2">The &ldquo;when&rdquo; column restates Material. The note under each is Shortcut&rsquo;s.</p>
        <DecisionHelpers />
      </Section>

      <Section id="expressive" title="What Material 3 Expressive changed">
        <div className="max-w-3xl">
          <p>{expressive.whatItIs}</p>
          <p className="mt-2 text-ink-2">{expressive.research}</p>
          <dl className="mt-4 divide-y divide-line border-y border-line">
            {expressive.changes.map((change) => (
              <div key={change.area} className="grid gap-x-6 gap-y-0.5 py-3 sm:grid-cols-[9rem_1fr]">
                <dt className="font-semibold">{change.area}</dt>
                <dd className="text-ink-2">{change.text}</dd>
              </div>
            ))}
          </dl>
          <h3 className="mt-6 text-lg font-semibold">Replaced or no longer recommended</h3>
          <dl className="mt-2 divide-y divide-line">
            {expressive.replaced.map((row) => (
              <div key={row.old} className="grid gap-x-6 gap-y-0.5 py-2.5 sm:grid-cols-2">
                <dt className="text-ink-2 line-through decoration-line-strong">{row.old}</dt>
                <dd className="font-medium">{row.now}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-5">
            <KeyTakeaway label="Shortcut's reading">{expressive.takeaway}</KeyTakeaway>
          </div>
          <div className="mt-4">
            <SourceMeta citations={[materialCite.expressive]} heading="Official source" />
          </div>
        </div>
      </Section>

      <Section id="breakpoints" title="Breakpoints and large screens">
        <div className="max-w-3xl">
          <Lines items={materialBreakpoints.points} />
          <p className="mt-3 text-ink-2">{materialBreakpoints.why}</p>
          <p className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/cheat-sheets/responsive-design" className={accent}>
              Responsive &amp; Viewports
            </Link>
            <Link href="/cheat-sheets/foldables" className={accent}>
              Foldables &amp; Multi-state Devices
            </Link>
            <Link href="/explorer/breakpoints" className={accent}>
              Breakpoints compared across systems
            </Link>
          </p>
          <div className="mt-4">
            <SourceMeta citations={[materialCite.breakpoints]} heading="Official source" />
          </div>
        </div>
      </Section>

      <Section id="android" title="Android platform guidance" label={<Tag tone="outline">Platform guidance</Tag>}>
        <p className="max-w-read text-ink-2">
          From Google&rsquo;s Android developer documentation, not from Material. It applies to Android apps and does not carry over to the web as written.
        </p>
        <dl className="mt-4 max-w-3xl divide-y divide-line border-y border-line">
          {androidGuidance.map((row) => (
            <div key={row.topic} className="grid gap-x-6 gap-y-1 py-3 sm:grid-cols-[11rem_1fr]">
              <dt className="font-semibold">{row.topic}</dt>
              <dd>
                <p className="text-ink-2">{row.text}</p>
                <p className="mt-1 text-sm">
                  <ExternalLink href={row.citation.url}>{row.citation.label}</ExternalLink>
                </p>
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 max-w-read text-sm text-ink-3">Not yet read by Shortcut: {androidUnread.join(", ").toLowerCase()}.</p>
      </Section>

      <Section id="tokens" title="Tokens, foundations and Figma">
        <div className="max-w-3xl space-y-3">
          <p className="rounded-sm bg-warn-wash px-3 py-2 text-[0.9375rem] text-warn">
            <span className="font-semibold">Not yet read. </span>
            Shortcut has not read Material&rsquo;s own pages on design tokens, colour, typography, shape or elevation, so it gives no values for them here.
          </p>
          <p className="text-ink-2">
            The comparison pages cite Google&rsquo;s Android documentation for colour roles, the type scale and the shape scale.{" "}
            <Link href="/explorer/design-tokens" className={accent}>
              Design tokens compared
            </Link>
          </p>
          <p className="text-ink-2">
            Google&rsquo;s Expressive announcement links to an updated Figma design kit. Shortcut has not opened the file, so it cannot describe what is in it.{" "}
            <ExternalLink href={materialCite.expressive.url}>Find the link in the announcement</ExternalLink>
          </p>
        </div>
      </Section>

      <Section id="google-ai" title="Google AI interface patterns" label={<Tag tone="outline">Product pattern</Tag>}>
        <p className="max-w-read text-ink-2">
          How one Google product behaves, as its help pages describe it. This is a product pattern to learn from. It is not Material guidance, and Material does
          not tell you to copy it.
        </p>
        <div className="mt-4 max-w-3xl space-y-4">
          {googleAiPatterns.map((item) => (
            <article key={item.pattern} className="rounded-md border border-line p-4 sm:p-5">
              <h3 className="text-lg font-semibold">{item.pattern}</h3>
              <p className="mt-2 text-ink-2">{item.what}</p>
              <p className="mt-3 border-l-2 border-mark pl-3">
                <span className="font-semibold">Shortcut&rsquo;s reading. </span>
                {item.lesson}
              </p>
              <div className="mt-3">
                <SourceMeta citations={[item.citation]} heading="Official source" />
              </div>
            </article>
          ))}
          <p className="text-sm text-ink-3">
            Looked for and not yet read in Google&rsquo;s own documentation: {googleAiUnread.join(", ").toLowerCase()}. For published guidance on these, see{" "}
            <Link href="/systems/atlassian" className={accent}>
              Atlassian&rsquo;s AI interaction guidelines
            </Link>
            .
          </p>
        </div>
      </Section>
    </>
  );
}

/** The extra sections on Gojek's profile. */
export function GojekProfile() {
  return (
    <>
      <Section id="inventory" title="Component inventory">
        <p className="max-w-read text-ink-2">
          The names on Gojek&rsquo;s Design System page, as written there. They are names only: none opens a page of guidance, so Shortcut says nothing about how
          any of them looks or behaves.
        </p>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {gojekComponents.map((name) => (
            <li key={name} className="rounded-sm border border-line px-2.5 py-1 text-[0.9375rem]">
              {name}
            </li>
          ))}
        </ul>
        <p className="mt-3 max-w-read text-sm text-ink-3">
          {gojekComponents.length} names. &ldquo;Suffle card&rdquo; is spelled as on the page. To see how documented systems handle the same components, use the{" "}
          <Link href="/explorer" className={accent}>
            comparison
          </Link>
          .
        </p>
        <div className="mt-4">
          <SourceMeta citations={[gojekCite.system]} heading="Official source" />
        </div>
      </Section>

      <Section id="not-found" title="No public guidance found">
        <p className="max-w-read text-ink-2">What Shortcut looked for on the site and did not find. An absence on the pages read, not a claim about what Gojek has internally.</p>
        <dl className="mt-4 max-w-3xl divide-y divide-line border-y border-line">
          {gojekNotFound.map((row) => (
            <div key={row.topic} className="grid gap-x-6 gap-y-0.5 py-3 sm:grid-cols-[14rem_1fr]">
              <dt className="font-semibold">{row.topic}</dt>
              <dd className="text-ink-2">{row.note}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section id="reading" title="What to take from it" label={<EditorialLabel kind="craft-guidance" />}>
        <ul className="grid gap-4 lg:grid-cols-3">
          {gojekReading.map((item) => (
            <li key={item.title} className="rounded-md border border-line p-4 sm:p-5">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-ink-2">{item.text}</p>
            </li>
          ))}
        </ul>
        <p className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/cheat-sheets/ux-writing" className={accent}>
            UX Writing cheat sheet
          </Link>
          <Link href="/explorer/motion" className={accent}>
            Motion compared across systems
          </Link>
        </p>
      </Section>

      <SeaReferences current="Gojek" />
    </>
  );
}

/** Three Southeast Asian references, each labelled by what it is. */
export function SeaReferences({ current }: { current?: string }) {
  return (
    <Section id="sea" title="Southeast Asian references on Shortcut">
      <p className="max-w-read text-ink-2">Three examples of different kinds. They are not a survey of the region, and do not stand for it.</p>
      <ul className="mt-4 grid gap-4 md:grid-cols-3">
        {seaReferences.map((item) => (
          <li key={item.name} className="flex flex-col rounded-md border border-line p-4 sm:p-5">
            <Tag tone={item.kind === "Public design system" ? "ok" : "outline"}>{item.kind}</Tag>
            <h3 className="mt-2 text-lg font-semibold">{item.name}</h3>
            <p className="mt-1 flex-1 text-ink-2">{item.what}</p>
            {item.name === current ? (
              <p className="mt-3 text-sm text-ink-3">This page</p>
            ) : (
              <Link href={item.href} className={`mt-3 text-sm ${accent}`}>
                {item.kind === "Public design system" ? "See it compared" : "Open profile"}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </Section>
  );
}

/** Material's own tabs for one component. Only the Overview was read. */
export function MaterialTabs({ id }: { id: string }) {
  return (
    <p className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
      <ExternalLink href={componentUrl(id)}>Overview</ExternalLink>
      <ExternalLink href={componentUrl(id, "specs")}>Specs</ExternalLink>
      <ExternalLink href={componentUrl(id, "guidelines")}>Guidelines</ExternalLink>
      <ExternalLink href={componentUrl(id, "accessibility")}>Accessibility</ExternalLink>
    </p>
  );
}
