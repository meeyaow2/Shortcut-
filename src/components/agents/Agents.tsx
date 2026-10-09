"use client";

import { Check, Copy, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { agentChapters, claimKinds, confidentWrong, contextFiles, exampleAgents, trustCheck, trustLabels, type AgentChapter, type ChapterSection } from "@/data/agents";
import { Why } from "../craft/Craft";
import { SourceMeta } from "../source/Source";
import { Tag } from "../ui/Tag";
import { ProcessStrip } from "../visual/Diagrams";

const accent = "font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent";
const h2 = "border-b-2 border-ink pb-2 text-2xl font-semibold";

/** The chapters as a list beside the content from desktop width, and a scrolling row above it on smaller screens. */
export function ChapterNav({ current }: { current?: string }) {
  return (
    <nav aria-label="Chapters" className="-mx-4 overflow-x-auto px-4 lg:mx-0 lg:overflow-visible lg:px-0">
      <p className="hidden text-sm font-semibold lg:block">Chapters</p>
      <ol className="flex gap-1.5 lg:mt-2 lg:block lg:space-y-0.5 lg:border-l lg:border-line">
        {agentChapters.map((chapter) => {
          const active = chapter.id === current;
          return (
            <li key={chapter.id} className="shrink-0">
              <Link
                href={`/ai/agents/${chapter.id}`}
                aria-current={active ? "page" : undefined}
                className={`flex min-h-11 items-center gap-2 whitespace-nowrap rounded-sm border px-3 text-[0.9375rem] lg:-ml-px lg:min-h-0 lg:whitespace-normal lg:rounded-none lg:border-0 lg:border-l lg:py-1.5 lg:pl-3 lg:pr-0 ${
                  active ? "border-ink bg-ink font-medium text-paper lg:border-ink lg:bg-transparent lg:font-semibold lg:text-ink" : "border-line text-ink-2 hover:text-ink lg:border-transparent lg:hover:border-ink"
                }`}
              >
                <span className="tabular-nums opacity-70">{chapter.number}</span>
                {chapter.title}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function List({ title, items, tone }: { title: string; items: string[]; tone?: "ok" | "warn" }) {
  const Icon = tone === "ok" ? Check : tone === "warn" ? X : null;
  return (
    <div className="rounded-md border border-line p-4">
      <h3 className={`font-sans text-sm font-semibold tracking-normal ${tone === "ok" ? "text-ok" : tone === "warn" ? "text-warn" : "text-ink-3"}`}>{title}</h3>
      <ul className="mt-2 space-y-1.5">
        {items.map((item) => (
          <li key={item} className={Icon ? "flex gap-2" : "border-l border-line-strong pl-3"}>
            {Icon && <Icon aria-hidden className={`mt-1 size-4 shrink-0 ${tone === "ok" ? "text-ok" : "text-warn"}`} />}
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** The six questions every working chapter answers, in the same order each time. */
export function UseBlocks({ chapter }: { chapter: AgentChapter }) {
  if (!chapter.goodUse) return null;
  return (
    <section aria-label="Using an agent here" className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <List title="Good use" items={chapter.goodUse} tone="ok" />
        {chapter.weakUse && <List title="Weak use" items={chapter.weakUse} tone="warn" />}
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {chapter.give && <List title="What to give the agent" items={chapter.give} />}
        {chapter.owns && <List title="You still own" items={chapter.owns} />}
        {chapter.verify && <List title="What to verify" items={chapter.verify} />}
      </div>
      {chapter.failure && (
        <p className="rounded-sm bg-warn-wash px-4 py-3 text-warn">
          <span className="block text-sm font-semibold">Common failure</span>
          {chapter.failure}
        </p>
      )}
    </section>
  );
}

function SectionBody({ section }: { section: ChapterSection }) {
  return (
    <div className="space-y-4">
      {section.intro && <p className="max-w-read text-ink-2">{section.intro}</p>}
      {section.flow && <ProcessStrip steps={section.flow} caption="In order. A person decides each step is right before the next begins." />}
      {section.rows && (
        <dl className="divide-y divide-line rounded-md border border-line">
          {section.rows.map((row) => (
            <div key={row.label} className="grid gap-x-6 gap-y-0.5 px-4 py-2.5 sm:grid-cols-[12rem_1fr]">
              <dt className="font-semibold">{row.label}</dt>
              <dd className="text-ink-2">{row.text}</dd>
            </div>
          ))}
        </dl>
      )}
      {section.items && (
        <ul className="grid gap-x-8 gap-y-1.5 sm:grid-cols-2">
          {section.items.map((item) => (
            <li key={item} className="border-l border-line-strong pl-3">
              {item}
            </li>
          ))}
        </ul>
      )}
      {section.pairs && (
        <ul className="space-y-3">
          {section.pairs.map((pair) => (
            <li key={pair.weak} className="grid gap-3 rounded-md border border-line p-4 md:grid-cols-2">
              <p>
                <span className="block text-sm font-semibold text-warn">Generic</span>
                {pair.weak}
              </p>
              <p>
                <span className="block text-sm font-semibold text-ok">Specific</span>
                {pair.better}
              </p>
              <p className="text-sm text-ink-2 md:col-span-2">{pair.why}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function ChapterSections({ sections }: { sections: ChapterSection[] }) {
  return (
    <>
      {sections.map((section) =>
        section.collapsed ? (
          <Why key={section.title} label={section.title}>
            <div className="text-ink">
              <SectionBody section={section} />
            </div>
          </Why>
        ) : (
          <section key={section.title} aria-label={section.title}>
            <h2 className={h2}>{section.title}</h2>
            <div className="pt-4">
              <SectionBody section={section} />
            </div>
          </section>
        ),
      )}
    </>
  );
}

/** A block of text to copy into a file or a prompt. */
export function CopyBlock({ title, text }: { title: string; text: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked: the text is on screen to select by hand.
    }
  }
  return (
    <figure className="rounded-md border border-line">
      <figcaption className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-2">
        <span className="font-semibold">{title}</span>
        <button type="button" onClick={copy} className="inline-flex min-h-11 items-center gap-1.5 rounded-sm border border-line-strong px-3 text-sm font-medium hover:border-ink md:min-h-9">
          {copied ? <Check aria-hidden className="size-4" /> : <Copy aria-hidden className="size-4" />}
          <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
        </button>
      </figcaption>
      <pre className="overflow-x-auto whitespace-pre-wrap p-4 text-sm leading-relaxed text-ink-2">{text}</pre>
    </figure>
  );
}

/** The nine context files: name and what it holds on show, the rest on request. */
export function ContextFiles() {
  return (
    <ol className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {contextFiles.map((file, index) => (
        <li key={file.name} className="flex flex-col rounded-md border border-line p-4">
          <p className="font-display text-lg font-semibold tracking-tight">
            <span className="mr-2 tabular-nums text-ink-3">{index + 1}</span>
            {file.name}
          </p>
          <p className="mt-1.5 flex-1 text-ink-2">{file.contains}</p>
          <div className="mt-3">
            <Why label="Why, when and an example">
              <dl className="space-y-2 text-ink">
                <div>
                  <dt className="text-sm font-semibold text-ink-3">Why it matters</dt>
                  <dd>{file.why}</dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold text-ink-3">When to use it</dt>
                  <dd>{file.when}</dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold text-ink-3">Example</dt>
                  <dd>{file.example}</dd>
                </div>
              </dl>
            </Why>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function ExampleAgents() {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {exampleAgents.map((agent) => (
        <li key={agent.name} className="flex flex-col rounded-md border border-line p-4">
          <p className="font-display text-lg font-semibold tracking-tight">{agent.name}</p>
          <p className="mt-1.5 flex-1 text-ink-2">{agent.purpose}</p>
          <p className="mt-3 border-l-2 border-mark pl-3 text-[0.9375rem]">
            <span className="block text-sm font-semibold text-ink-3">Its guard rail</span>
            {agent.guard}
          </p>
        </li>
      ))}
    </ul>
  );
}

/** The trust check, the labels, the weights a claim can carry, and worked examples. */
export function TrustTools() {
  return (
    <>
      <section aria-labelledby="trust-check">
        <h2 id="trust-check" className={h2}>
          Trust check
        </h2>
        <ol className="grid gap-x-8 gap-y-2 pt-4 sm:grid-cols-2">
          {trustCheck.map((question, index) => (
            <li key={question} className="flex gap-3">
              <span aria-hidden className="font-display font-semibold tabular-nums text-ink-3">
                {index + 1}
              </span>
              <span className="font-medium">{question}</span>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="trust-labels">
        <h2 id="trust-labels" className={h2}>
          Label what you keep
        </h2>
        <dl className="grid gap-3 pt-4 sm:grid-cols-2 xl:grid-cols-3">
          {trustLabels.map((item) => (
            <div key={item.label} className="rounded-md border border-line p-3">
              <dt>
                <Tag tone={item.tone}>{item.label}</Tag>
              </dt>
              <dd className="mt-1.5 text-ink-2">{item.meaning}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="claim-kinds">
        <h2 id="claim-kinds" className={h2}>
          What kind of claim is it?
        </h2>
        <p className="mt-3 max-w-read text-ink-2">Strongest first. An agent will state all six in the same voice.</p>
        <dl className="mt-3 divide-y divide-line rounded-md border border-line">
          {claimKinds.map((kind) => (
            <div key={kind.label} className="grid gap-x-6 gap-y-0.5 px-4 py-2.5 sm:grid-cols-[12rem_1fr]">
              <dt className="font-semibold">{kind.label}</dt>
              <dd className="text-ink-2">{kind.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="confident-wrong">
        <h2 id="confident-wrong" className={h2}>
          Confident-wrong, worked through
        </h2>
        <ul className="space-y-4 pt-4">
          {confidentWrong.map((example) => (
            <li key={example.id} id={example.id} className="anchor-target rounded-md border border-line p-4 sm:p-5">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <p className="text-sm font-semibold text-ink-3">The AI says</p>
                <Tag tone="warn">{example.label}</Tag>
              </div>
              <p className="mt-1 text-lg font-medium">{example.claim}</p>
              <p className="mt-2 text-ink-2">{example.problem}</p>
              <dl className="mt-3 divide-y divide-line border-y border-line">
                {example.actual.map((row) => (
                  <div key={row.who} className="grid gap-x-4 gap-y-0.5 py-2.5 sm:grid-cols-[11rem_1fr_auto] sm:items-baseline">
                    <dt className="font-semibold">{row.who}</dt>
                    <dd>{row.says}</dd>
                    <dd className="text-sm text-ink-3">{row.kind}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 border-l-2 border-mark pl-3">{example.verdict}</p>
              {example.actual.some((row) => row.citation) && (
                <div className="mt-3">
                  <Why label="Sources for this example">
                    <SourceMeta citations={example.actual.flatMap((row) => (row.citation ? [row.citation] : []))} />
                  </Why>
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

export function ChapterLinks({ links }: { links: { label: string; href: string }[] }) {
  return (
    <section aria-labelledby="go-deeper">
      <h2 id="go-deeper" className={h2}>
        Go deeper in Shortcut
      </h2>
      <ul className="flex flex-wrap gap-x-6 gap-y-2 pt-4">
        {links.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className={accent}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
