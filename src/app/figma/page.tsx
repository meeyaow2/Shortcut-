import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { AiStatus } from "@/components/ai/Ai";
import { EditorialLabel } from "@/components/craft/Craft";
import { DecisionHelper } from "@/components/figma/DecisionHelper";
import { SourceMeta } from "@/components/source/Source";
import { Tag } from "@/components/ui/Tag";
import { ExternalLink, PageHeader } from "@/components/ui/primitives";
import { UpdateCard } from "@/components/updates/UpdateCard";
import { VERIFIED } from "@/data/citations";
import { testFoldStates, testWidths } from "@/data/viewports";
import {
  figmaAiCapabilities,
  figmaCite,
  figmaComparisons,
  figmaHandoverChecklist,
  figmaRecipes,
  figmaSheets,
  figmaSystemSteps,
  figmaTools,
  plannedFigmaSheets,
} from "@/data/figma";
import { updates } from "@/data/updates";

export const metadata: Metadata = { title: "Figma Guide" };

const figmaUpdates = updates.filter((u) => u.sourceId === "figma").sort((a, b) => b.datePublished.localeCompare(a.datePublished));
const link = "font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent";

const jump = [
  ["what-should-i-use", "What should I use?"],
  ["tools", "Tools"],
  ["compare", "Comparisons"],
  ["recipes", "Workflows"],
  ["ai", "AI in Figma"],
  ["system", "Design system"],
  ["handover", "File handover"],
  ["whats-new", "What's new"],
] as const;

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="border-b-2 border-ink pb-2 text-2xl font-semibold md:text-3xl">
      {children}
    </h2>
  );
}

export default function FigmaPage() {
  return (
    <div className="page">
      <PageHeader
        title="Figma Guide"
        lede="What each Figma tool is for, when to open it, and how they fit together. Figma Help explains how features work; this explains which one you need."
      >
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
          <AiStatus dateVerified={VERIFIED} />
          <p className="text-sm text-ink-2">Figma changes quickly. Descriptions restate Figma&rsquo;s own pages as of that date.</p>
        </div>
        <nav aria-label="On this page" className="-mx-4 mt-6 flex gap-1.5 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
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
      </PageHeader>

      <section aria-labelledby="what-should-i-use" className="pt-8">
        <H2 id="what-should-i-use">What should I use in Figma?</H2>
        <div className="pt-5">
          <DecisionHelper />
        </div>
      </section>

      <section aria-labelledby="tools" className="section-gap">
        <H2 id="tools">Products and capabilities</H2>
        {(["Product", "Capability"] as const).map((kind) => (
          <div key={kind} className="pt-6">
            <h3 className="text-lg font-semibold">{kind === "Product" ? "Products" : "Capabilities inside them"}</h3>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {figmaTools
                .filter((tool) => tool.kind === kind)
                .map((tool) => (
                  <li key={tool.id}>
                    <Link href={`/figma/${tool.id}`} className="flex h-full flex-col rounded-md border border-line p-4 transition-colors hover:border-ink">
                      <span className="font-display text-lg font-semibold tracking-tight">{tool.name}</span>
                      <span className="mt-1 text-ink-2">{tool.tagline}</span>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </section>

      <section aria-labelledby="compare" className="section-gap">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <H2 id="compare">This or that?</H2>
        </div>
        <div className="grid gap-4 pt-6 lg:grid-cols-2">
          {figmaComparisons.map((comparison) => (
            <article key={comparison.id} id={comparison.id} className="anchor-target rounded-md border border-line p-4 sm:p-5">
              <h3 className="text-xl font-semibold">{comparison.title}</h3>
              <dl className="mt-3 space-y-3">
                <div>
                  <dt className="text-sm font-semibold text-ink-3">What is the difference?</dt>
                  <dd className="mt-0.5">{comparison.difference}</dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold text-ink-3">When do I use each?</dt>
                  <dd className="mt-1 space-y-1">
                    {comparison.whenEach.map((line) => (
                      <p key={line} className="border-l border-line-strong pl-3 text-ink-2">
                        {line}
                      </p>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold text-ink-3">Can I use both?</dt>
                  <dd className="mt-0.5 text-ink-2">{comparison.both}</dd>
                </div>
                <div className="border-l-2 border-mark pl-3">
                  <dt className="text-sm font-semibold text-ink-3">Common mistake</dt>
                  <dd className="mt-0.5">{comparison.mistake}</dd>
                </div>
              </dl>
              <div className="mt-4 border-t border-line pt-3">
                <SourceMeta citations={comparison.citations} heading="Official source" />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="recipes" className="section-gap">
        <div className="flex flex-wrap items-end justify-between gap-2 border-b-2 border-ink pb-2">
          <h2 id="recipes" className="text-2xl font-semibold md:text-3xl">
            Workflow recipes
          </h2>
          <EditorialLabel kind="craft-guidance" />
        </div>
        <div className="grid gap-4 pt-6 md:grid-cols-2 xl:grid-cols-3">
          {figmaRecipes.map((recipe) => (
            <article key={recipe.id} id={`recipe-${recipe.id}`} className="anchor-target rounded-md border border-line p-4 sm:p-5">
              <h3 className="text-xl font-semibold">{recipe.title}</h3>
              {/* Ordered and numbered: the steps are a sequence. */}
              <ol className="mt-3 space-y-2">
                {recipe.steps.map((step, index) => (
                  <li key={step.tool + step.action} className="grid grid-cols-[1.5rem_1fr] gap-x-2">
                    <span aria-hidden className="font-display font-semibold tabular-nums text-ink-3">
                      {index + 1}
                    </span>
                    <span>
                      <span className="font-semibold">{step.tool}. </span>
                      <span className="text-ink-2">{step.action}</span>
                    </span>
                  </li>
                ))}
              </ol>
              {recipe.note && <p className="mt-3 border-t border-line pt-3 text-sm text-ink-2">{recipe.note}</p>}
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="ai" className="section-gap">
        <div className="flex flex-wrap items-end justify-between gap-2 border-b-2 border-ink pb-2">
          <h2 id="ai" className="text-2xl font-semibold md:text-3xl">
            AI in Figma
          </h2>
          <Link href="/ai" className="inline-flex items-center gap-1 text-sm font-medium text-ink-2 hover:text-accent">
            AI + Design
            <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
        <p className="mt-3 max-w-read text-ink-2">
          Figma notes that AI outputs may be misleading or wrong, and should be verified before you rely on them.{" "}
          <ExternalLink href={figmaCite.aiTools.url}>{figmaCite.aiTools.label}</ExternalLink>
        </p>
        <ul className="mt-4 divide-y divide-line rounded-md border border-line">
          {figmaAiCapabilities.map((capability) => (
            <li key={capability.id} className="p-4 sm:p-5">
              <h3 className="text-lg font-semibold">{capability.name}</h3>
              <dl className="mt-2 grid gap-x-8 gap-y-3 md:grid-cols-2 xl:grid-cols-4">
                <div>
                  <dt className="text-sm font-semibold text-ok">Use it for</dt>
                  <dd className="mt-0.5 text-ink-2">{capability.useFor}</dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold text-warn">Don&rsquo;t rely on it for</dt>
                  <dd className="mt-0.5 text-ink-2">{capability.dontRelyOn}</dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold text-ink-3">Workflow example</dt>
                  <dd className="mt-0.5 text-ink-2">{capability.workflow}</dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold text-ink-3">What to verify</dt>
                  <dd className="mt-0.5 text-ink-2">{capability.verify}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="system" className="section-gap">
        <div className="flex flex-wrap items-end justify-between gap-2 border-b-2 border-ink pb-2">
          <h2 id="system" className="text-2xl font-semibold md:text-3xl">
            Building a design system in Figma
          </h2>
          <EditorialLabel kind="craft-guidance" />
        </div>
        <div className="grid gap-10 pt-5 lg:grid-cols-[1fr_18rem]">
          <ol className="max-w-3xl divide-y divide-line">
            {figmaSystemSteps.map((step, index) => (
              <li key={step.title} className="grid grid-cols-[2rem_1fr] gap-x-3 py-3.5">
                <span aria-hidden className="font-display text-lg font-semibold tabular-nums text-ink-3">
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-sans text-base font-semibold tracking-normal">{step.title}</h3>
                  <p className="text-ink-2">{step.body}</p>
                  <Link href={step.href} className={`mt-1 inline-block text-sm ${link}`}>
                    {step.link}
                  </Link>
                </div>
              </li>
            ))}
          </ol>
          <aside aria-label="Figma cheat sheets" className="lg:pt-3">
            <h3 className="font-sans text-sm font-semibold tracking-normal">Figma cheat sheets</h3>
            <ul className="mt-2 space-y-2">
              {figmaSheets.map((sheet) => (
                <li key={sheet.slug}>
                  <Link href={`/cheat-sheets/${sheet.slug}`} className="block rounded-md border border-line p-3 transition-colors hover:border-ink">
                    <span className="font-semibold">{sheet.title}</span>
                    <span className="block text-sm text-ink-2">{sheet.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-ink-2">Not written yet: {plannedFigmaSheets.join(", ")}.</p>
          </aside>
        </div>
      </section>

      <section aria-labelledby="handover" className="section-gap">
        <div className="flex flex-wrap items-end justify-between gap-2 border-b-2 border-ink pb-2">
          <h2 id="handover" className="text-2xl font-semibold md:text-3xl">
            Before you hand your Figma file over
          </h2>
          <EditorialLabel kind="craft-guidance" />
        </div>
        <div className="grid gap-x-10 gap-y-6 pt-5 sm:grid-cols-2 lg:grid-cols-4">
          {figmaHandoverChecklist.map((group) => (
            <div key={group.group}>
              <h3 className="font-sans text-base font-semibold tracking-normal">{group.group}</h3>
              <ul className="mt-2 space-y-1.5">
                {group.items.map((item) => (
                  <li key={item} className="border-l border-line-strong pl-3 text-ink-2">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-5">
          <Link href="/checks/before-you-send-it" className={link}>
            Then check the design itself with Before You Send It
          </Link>
        </p>
      </section>

      <section aria-labelledby="responsive" className="section-gap">
        <div className="flex flex-wrap items-end justify-between gap-2 border-b-2 border-ink pb-2">
          <h2 id="responsive" className="text-2xl font-semibold md:text-3xl">
            Testing responsive designs in Figma
          </h2>
          <EditorialLabel kind="craft-guidance" />
        </div>
        <p className="mt-4 max-w-read border-l-2 border-mark pl-3 font-medium">Do not design only for one static frame. A frame is one width; people will use all of them.</p>
        <div className="grid gap-x-10 gap-y-8 pt-6 lg:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold">Build frames that resize</h3>
            <ul className="mt-2 space-y-1.5">
              <li className="border-l border-line-strong pl-3 text-ink-2">Use auto layout so content pushes and reflows instead of overlapping.</li>
              <li className="border-l border-line-strong pl-3 text-ink-2">Hug for things sized by their content, Fill for things that share the space left.</li>
              <li className="border-l border-line-strong pl-3 text-ink-2">Set minimum and maximum widths so a card or column cannot collapse or stretch too far.</li>
              <li className="border-l border-line-strong pl-3 text-ink-2">Nest it: a page that resizes needs sections, and items inside them, that resize too.</li>
              <li className="border-l border-line-strong pl-3 text-ink-2">Variable modes hold a different value per context. Light and dark is the common use; the same mechanism can hold values that differ by width or by density.</li>
            </ul>
            <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
              <Link href="/cheat-sheets/figma-auto-layout#auto-layout-sizing" className={link}>
                Hug, Fill or Fixed
              </Link>
              <Link href="/cheat-sheets/figma-variables#figma-modes" className={link}>
                Collections and modes
              </Link>
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Widths to drag a frame through</h3>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {testWidths.map((item) => (
                <li key={item.width} title={item.note} className="rounded-sm border border-line px-2 py-0.5 font-display font-semibold tabular-nums tracking-tight">
                  {item.width}
                </li>
              ))}
              {testFoldStates.map((state) => (
                <li key={state} className="rounded-sm border border-line px-2 py-0.5 text-sm">
                  {state}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-ink-2">
              Small, standard and large mobile; tablet and large tablet; laptop, desktop and large desktop. Figma&rsquo;s frame presets, like these widths, are
              references, not required breakpoints. Resize the frame between them and watch where the layout breaks.
            </p>
            <p className="mt-3">
              <Link href="/cheat-sheets/responsive-design#test-matrix" className={link}>
                Responsive test matrix
              </Link>
            </p>
          </div>
        </div>
        <div className="mt-8 rounded-md border border-line p-4 sm:p-5">
          <h3 className="text-lg font-semibold">After Figma Make or any AI generates a screen</h3>
          <p className="mt-1 max-w-read text-ink-2">Generated UI should not be assumed responsive just because it renders. Check:</p>
          <ul className="mt-3 grid gap-x-8 gap-y-1.5 sm:grid-cols-2 lg:grid-cols-3">
            {["Overflow at mobile widths", "The transition through tablet widths", "How cards stack", "How navigation collapses", "What the table does", "Modal sizing", "Touch targets", "Long text and translated text", "Content that changes length or count"].map((item) => (
              <li key={item} className="border-l border-line-strong pl-3 text-ink-2">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="whats-new" className="section-gap">
        <div className="flex flex-wrap items-end justify-between gap-2 border-b-2 border-ink pb-2">
          <h2 id="whats-new" className="text-2xl font-semibold md:text-3xl">
            What&rsquo;s new in Figma
          </h2>
          <ExternalLink href={figmaCite.releaseNotes.url} className="text-sm">
            View Figma release notes
          </ExternalLink>
        </div>
        <p className="mt-3 text-ink-2">
          {figmaUpdates.length} recent releases that affect design work. <Tag>Tools</Tag> updates need no action unless you want the feature.
        </p>
        <div className="max-w-3xl space-y-5 pt-5">
          {figmaUpdates.map((update) => (
            <UpdateCard key={update.id} update={update} />
          ))}
        </div>
      </section>
    </div>
  );
}
