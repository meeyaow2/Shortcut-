"use client";

import { Check, Copy } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { AI_REVIEW_AFTER_DAYS, getAiTool } from "@/data/ai";
import { buildPrompt, builderFocusAreas, builderGoals, builderProductTypes, getPrompt } from "@/data/prompts";
import { useToday } from "@/hooks/useToday";
import { daysBetween, formatDate } from "@/lib/dates";
import type { AiTool, AiWorkflow, Prompt, ToolComparison } from "@/types";
import { EditorialLabel } from "../craft/Craft";
import { Tag } from "../ui/Tag";
import { ExternalLink } from "../ui/primitives";

const sections = [
  { href: "/ai", label: "Overview" },
  { href: "/ai/updates", label: "Updates" },
  { href: "/ai/generative-ui", label: "Generative UI" },
  { href: "/ai/workflow", label: "Workflow" },
  { href: "/ai/prompts", label: "Prompts" },
  { href: "/ai/tools", label: "Tools" },
  { href: "/ai/review", label: "Design review" },
  { href: "/ai/learn", label: "Learn" },
  { href: "/checks/ai-look", label: "AI-look signals" },
];

/** Secondary navigation shared by the AI + Design pages. Scrolls sideways when it does not fit. */
export function AiSubnav() {
  const pathname = usePathname();
  return (
    <nav aria-label="AI + Design" className="-mx-4 overflow-x-auto border-b border-line px-4 sm:mx-0 sm:px-0">
      <ul className="flex gap-1">
        {sections.map((section) => {
          const current = pathname === section.href;
          return (
            <li key={section.href}>
              <Link
                href={section.href}
                aria-current={current ? "page" : undefined}
                className={`relative flex h-11 items-center whitespace-nowrap px-2.5 text-[0.9375rem] ${
                  current ? "font-semibold text-ink after:absolute after:inset-x-2.5 after:bottom-0 after:h-0.5 after:bg-ink" : "text-ink-2 hover:text-ink"
                }`}
              >
                {section.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/**
 * Freshness for AI content, which dates faster than standards do. Anything
 * not re-checked within AI_REVIEW_AFTER_DAYS is flagged instead of left to
 * look current.
 */
export function AiStatus({ datePublished, dateVerified }: { datePublished?: string; dateVerified: string }) {
  const today = useToday();
  if (!today) return <span className="text-sm text-ink-2">Verified {formatDate(dateVerified)}</span>;

  const stale = daysBetween(dateVerified, today) > AI_REVIEW_AFTER_DAYS;
  const fresh = datePublished !== undefined && daysBetween(datePublished, today) <= 7;
  return (
    <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-2">
      {stale ? <Tag tone="warn">Needs review</Tag> : fresh ? <Tag tone="accent">New</Tag> : <Tag tone="ok">Still current</Tag>}
      <span className="whitespace-nowrap">Verified {formatDate(dateVerified)}</span>
    </span>
  );
}

/** A prompt shown in full, wrapping to the available width, with a copy button. */
export function PromptBlock({ text, label = "Prompt" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked: the text is still selectable by hand.
    }
  }

  return (
    <div className="rounded-md border border-line bg-wash">
      <div className="flex items-center justify-between gap-3 border-b border-line py-1.5 pl-4 pr-1.5">
        <p className="text-sm font-semibold text-ink-3">{label}</p>
        <button
          type="button"
          onClick={copy}
          className="inline-flex min-h-11 md:min-h-9 items-center gap-1.5 rounded-sm px-2.5 text-sm font-medium text-ink-2 hover:bg-paper hover:text-ink"
        >
          {copied ? <Check aria-hidden className="size-4 text-ok" /> : <Copy aria-hidden className="size-4" />}
          <span role="status">{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
      {/* pre-wrap keeps the prompt's line breaks and never forces sideways scrolling. */}
      <pre className="whitespace-pre-wrap break-words p-4 font-sans text-[0.9375rem] leading-relaxed text-ink">{text}</pre>
    </div>
  );
}

function Lines({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-ink-3">{title}</h4>
      <ul className="mt-1.5 space-y-1">
        {items.map((item) => (
          <li key={item} className="border-l border-line-strong pl-3 text-ink-2">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Para({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-ink-3">{title}</h4>
      <p className="mt-1 text-ink-2">{children}</p>
    </div>
  );
}

export function PromptCard({ prompt }: { prompt: Prompt }) {
  return (
    <article id={prompt.id} className="anchor-target border-t border-line py-7 first:border-t-0 first:pt-2">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <h3 className="text-xl font-semibold">{prompt.title}</h3>
        <Tag>{prompt.category}</Tag>
      </div>
      <p className="mt-1.5 max-w-read text-ink-2">{prompt.whenToUse}</p>
      <div className="mt-4">
        <PromptBlock text={prompt.prompt} />
      </div>
      <div className="mt-4 grid gap-5 md:grid-cols-2">
        <Para title="Why this works">{prompt.whyItWorks}</Para>
        <Para title="Expected output">{prompt.expectedOutput}</Para>
        <Lines title="What you should provide" items={prompt.inputsNeeded} />
        <Lines title="What to verify" items={prompt.verify} />
      </div>
    </article>
  );
}

/** One stage of the design process: where AI helps, what to give it, and what stays yours. */
export function WorkflowCard({ workflow }: { workflow: AiWorkflow }) {
  const prompt = getPrompt(workflow.promptId);
  return (
    <article id={workflow.id} className="anchor-target border-t border-line py-8 first:border-t-0 first:pt-2">
      <h2 className="text-2xl font-semibold">{workflow.stage}</h2>
      <p className="mt-1.5 max-w-read text-ink-2">
        <span className="font-semibold text-ink">When to use AI. </span>
        {workflow.useWhen}
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-md border border-line p-4">
          <p className="text-sm font-semibold text-ok">Good use</p>
          <p className="mt-1">{workflow.goodUse}</p>
        </div>
        <div className="rounded-md border border-line p-4">
          <p className="text-sm font-semibold text-warn">Weak use</p>
          <p className="mt-1">{workflow.weakUse}</p>
        </div>
      </div>

      {workflow.warning && <p className="mt-4 rounded-sm bg-warn-wash px-3 py-2 text-[0.9375rem] text-warn">{workflow.warning}</p>}

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <Lines title="What to give the AI" items={workflow.inputNeeded} />
        <Lines title="What to review afterwards" items={workflow.reviewAfter} />
        <Lines title="What the designer still owns" items={workflow.designerOwns} />
        <Para title="Common failure">{workflow.commonFailure}</Para>
      </div>

      <details className="group mt-5 rounded-sm border border-line">
        <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-2 px-3 font-medium hover:bg-wash [&::-webkit-details-marker]:hidden">
          <span>Example prompt: {prompt.title}</span>
          <span className="text-sm text-ink-3 group-open:hidden">Show</span>
          <span className="hidden text-sm text-ink-3 group-open:inline">Hide</span>
        </summary>
        <div className="space-y-3 border-t border-line p-3">
          <PromptBlock text={prompt.prompt} />
          <Link href={`/ai/prompts#${prompt.id}`} className="inline-block font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent">
            Why this prompt works, and what to verify
          </Link>
        </div>
      </details>
    </article>
  );
}

export function ToolCard({ tool }: { tool: AiTool }) {
  return (
    <article id={tool.id} className="anchor-target flex flex-col rounded-md border border-line p-4 sm:p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <h3 className="text-xl font-semibold">{tool.name}</h3>
        <p className="text-sm text-ink-3">{tool.vendor}</p>
      </div>
      <p className="mt-2 text-ink-2">{tool.description}</p>
      <p className="mt-1 text-sm text-ink-3">
        From <ExternalLink href={tool.sourceUrl}>{tool.sourceLabel}</ExternalLink>
      </p>

      <div className="mt-4 grid flex-1 gap-4 sm:grid-cols-2">
        <Lines title="Good for" items={tool.goodFor} />
        <Lines title="Less suitable for" items={tool.lessSuitableFor} />
      </div>
      <div className="mt-4">
        <Para title="Try it for">{tool.workflowExample}</Para>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-line pt-3 text-sm">
        <div>
          <dt className="text-ink-3">Learning curve</dt>
          <dd className="font-medium">{tool.difficulty}</dd>
        </div>
        <div>
          <dt className="text-ink-3">Platform</dt>
          <dd className="font-medium">{tool.platform}</dd>
        </div>
        <div>
          <dt className="text-ink-3">Price</dt>
          <dd className="font-medium">{tool.pricing ?? "Not checked. See the official site."}</dd>
        </div>
        <div>
          <dt className="sr-only">Status</dt>
          <dd>
            <AiStatus dateVerified={tool.dateVerified} />
          </dd>
        </div>
      </dl>
      <p className="mt-3">
        <ExternalLink href={tool.officialUrl}>Official site</ExternalLink>
      </p>
    </article>
  );
}

/** "Use A when…, use B when…". No scores and no winner. */
export function ComparisonBlock({ comparison }: { comparison: ToolComparison }) {
  return (
    <section id={comparison.id} aria-labelledby={`${comparison.id}-title`} className="anchor-target border-t border-line py-6 first:border-t-0 first:pt-2">
      <h3 id={`${comparison.id}-title`} className="text-xl font-semibold">
        “{comparison.task}”
      </h3>
      <p className="mt-1.5 max-w-read text-ink-2">{comparison.intro}</p>
      <ul className="mt-3 divide-y divide-line rounded-md border border-line">
        {comparison.options.map((option) => {
          const tool = getAiTool(option.toolId);
          return (
            <li key={option.toolId} className="grid gap-x-4 gap-y-1 px-4 py-3 sm:grid-cols-[11rem_1fr]">
              <a href={`#${tool.id}`} className="font-semibold hover:text-accent">
                {tool.name}
              </a>
              <p className="text-ink-2">
                <span className="font-medium text-ink">Use it when </span>
                {option.useWhen}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

const chip = (selected: boolean) =>
  `min-h-11 md:min-h-9 rounded-sm border px-3 text-[0.9375rem] transition-colors ${
    selected ? "border-ink bg-ink font-medium text-paper" : "border-line bg-paper text-ink-2 hover:border-line-strong hover:text-ink"
  }`;

/** A guided form that assembles a structured prompt from a few choices. No model is involved. */
export function PromptBuilder() {
  const [goalId, setGoalId] = useState<string>(builderGoals[0].id);
  const [productType, setProductType] = useState(builderProductTypes[0]);
  const [focus, setFocus] = useState<string[]>(["Hierarchy", "Spacing"]);
  const [context, setContext] = useState("");

  const toggle = (area: string) => setFocus((current) => (current.includes(area) ? current.filter((a) => a !== area) : [...current, area]));

  return (
    <section id="builder" aria-labelledby="builder-title" className="anchor-target rounded-md border border-line p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 id="builder-title" className="text-2xl font-semibold">
          Prompt Builder
        </h2>
        <EditorialLabel kind="craft-guidance" />
      </div>
      <p className="mt-1.5 max-w-read text-ink-2">Pick what you want, and Shortcut assembles a structured prompt to paste into your own AI tool.</p>

      <div className="mt-5 grid gap-6 lg:grid-cols-2">
        <div className="space-y-5">
          <fieldset>
            <legend className="mb-2 text-sm font-semibold">I want to</legend>
            <div className="flex flex-wrap gap-1.5">
              {builderGoals.map((goal) => (
                <button key={goal.id} type="button" aria-pressed={goal.id === goalId} onClick={() => setGoalId(goal.id)} className={chip(goal.id === goalId)}>
                  {goal.label}
                </button>
              ))}
            </div>
          </fieldset>

          <div>
            <label htmlFor="builder-product" className="mb-2 block text-sm font-semibold">
              Product type
            </label>
            <select
              id="builder-product"
              value={productType}
              onChange={(event) => setProductType(event.target.value)}
              className="h-11 w-full rounded-sm border border-line-strong bg-paper px-3"
            >
              {builderProductTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </div>

          <fieldset>
            <legend className="mb-2 text-sm font-semibold">Focus on</legend>
            <div className="flex flex-wrap gap-1.5">
              {builderFocusAreas.map((area) => (
                <button key={area} type="button" aria-pressed={focus.includes(area)} onClick={() => toggle(area)} className={chip(focus.includes(area))}>
                  {area}
                </button>
              ))}
            </div>
          </fieldset>

          <div>
            <label htmlFor="builder-context" className="mb-2 block text-sm font-semibold">
              User and task <span className="font-normal text-ink-3">(optional)</span>
            </label>
            <input
              id="builder-context"
              value={context}
              onChange={(event) => setContext(event.target.value)}
              placeholder="e.g. Finance officers approving claims"
              className="h-11 w-full rounded-sm border border-line-strong px-3 placeholder:text-ink-3"
            />
          </div>
        </div>

        <div className="min-w-0">
          <PromptBlock text={buildPrompt({ goalId, productType, focus, context })} label="Your prompt" />
          <p className="mt-2 text-sm text-ink-2">Fill in anything left in square brackets before you send it.</p>
        </div>
      </div>
    </section>
  );
}
