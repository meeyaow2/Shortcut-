"use client";

import { Check, CornerDownLeft } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { suggestedDirectorQuestions, suggestedQuestions, suggestedSgQuestions } from "@/data/answers";
import { getCheatSheet } from "@/data/cheat-sheets";
import { useContentContext } from "@/hooks/useLibrary";
import { localProvider } from "@/lib/ask/local-provider";
import type { AskProvider, AskResult } from "@/lib/ask/provider";
import { citationAuthority, contextLabels, contexts } from "@/lib/authority";
import { countHits, search } from "@/lib/search";
import type { Answer, AnswerSection, Context } from "@/types";
import { EditorialLabel } from "../craft/Craft";
import { SearchResults } from "../search/SearchResults";
import { AuthorityLabel, AuthorityLegend, ContextTag, SourceBadge, SourceMeta } from "../source/Source";
import { Button } from "../ui/Button";
import { ExternalLink, Skeleton } from "../ui/primitives";

// Swap this line to connect a real model-backed provider.
const provider: AskProvider = localProvider;

type Asked = { key: string; question: string; result: AskResult };

const sectionHeading = "font-sans text-sm font-semibold tracking-normal text-ink-3";

/** One source's contribution to an answer, with the weight it carries. */
function SourceSection({ section }: { section: AnswerSection }) {
  return (
    <li className="py-4">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <SourceBadge id={section.citation.sourceId} />
        <ExternalLink href={section.citation.url} className="text-sm">
          {section.citation.label}
        </ExternalLink>
        <AuthorityLabel authority={citationAuthority(section.citation)} />
      </div>
      <ul className="mt-2 space-y-1">
        {section.points.map((point) => (
          <li key={point} className="border-l border-line-strong pl-3 text-ink-2">
            {point}
          </li>
        ))}
      </ul>
    </li>
  );
}

function AnswerCard({ question, result }: { question: string; result: AskResult & { answer: Answer } }) {
  const { answer } = result;
  const sheet = answer.relatedSheet ? getCheatSheet(answer.relatedSheet) : undefined;
  return (
    <article className="pop-in rounded-md border border-line">
      <div className="border-b border-line bg-wash px-5 py-3 md:px-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm text-ink-3">Question</p>
          <ContextTag context={answer.context ?? "global"} />
        </div>
        <p className="font-medium">{question}</p>
        {question.trim().toLowerCase() !== answer.question.toLowerCase() && (
          <p className="mt-1 text-sm text-ink-2">Closest answered question: “{answer.question}”</p>
        )}
        {result.contextDetected && (
          <p className="mt-1 text-sm text-ink-2">Answered for Singapore because your question mentions it.</p>
        )}
        {result.context === "sg" && !answer.context && (
          <p className="mt-1 text-sm text-ink-2">
            No Singapore-specific guidance on this yet, so this answer draws on global standards.
          </p>
        )}
      </div>
      <div className="space-y-6 p-5 md:p-6">
        <div>
          <h2 className={sectionHeading}>Short answer</h2>
          <p className="mt-1 font-display text-3xl font-semibold leading-tight tracking-tight">{answer.shortAnswer}</p>
        </div>
        {answer.director && (
          <div>
            <h2 className={sectionHeading}>Common practice</h2>
            <p className="mt-1 max-w-read">{answer.director.commonPractice}</p>
          </div>
        )}
        <div>
          <h2 className={sectionHeading}>{answer.director ? "Why" : "Explanation"}</h2>
          <p className="mt-1 max-w-read">{answer.explanation}</p>
        </div>
        {answer.director && (
          <div>
            <h2 className={sectionHeading}>When to break the rule</h2>
            <p className="mt-1 max-w-read">{answer.director.whenToBreak}</p>
          </div>
        )}
        {answer.sections && (
          <div>
            <h2 className={sectionHeading}>What each source says</h2>
            <ul className="divide-y divide-line">
              {answer.sections.map((section) => (
                <SourceSection key={section.citation.label} section={section} />
              ))}
            </ul>
            <AuthorityLegend />
          </div>
        )}
        <div>
          <h2 className={sectionHeading}>{answer.director ? "Check this" : "Designer checklist"}</h2>
          <ul className="mt-2 space-y-1.5">
            {answer.checklist.map((item) => (
              <li key={item} className="flex gap-2.5">
                <Check aria-hidden className="mt-1 size-4 shrink-0 text-ok" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        {answer.director && (
          <div className="space-y-2">
            <EditorialLabel kind="craft-guidance" />
            <p className="text-sm text-ink-2">
              This is a design-review opinion, not a standard.
              {answer.citations.length > 0
                ? " The official sources below speak to the same subject; they did not write this answer."
                : " No official source Shortcut tracks sets a rule here."}
            </p>
          </div>
        )}
        {answer.citations.length > 0 && <SourceMeta citations={answer.citations} heading={answer.director ? "Related official source" : "Source"} />}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4 text-sm text-ink-2">
          <p>{provider.description}</p>
          {answer.director?.readNext && (
            <Link href={answer.director.readNext.href} className="font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent">
              {answer.director.readNext.label}
            </Link>
          )}
          {sheet && (
            <Link href={`/cheat-sheets/${sheet.slug}`} className="font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent">
              Open the {sheet.title} cheat sheet
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

/** Shown instead of a guess when no sourced answer exists. */
function NoAnswer({ question }: { question: string }) {
  const related = search(question.replace(/[?.!,]/g, " ").split(/\s+/).filter((w) => w.length > 4).slice(0, 1).join(" "), 4);
  return (
    <div className="pop-in rounded-md border border-dashed border-line-strong p-4 sm:p-5 md:p-6">
      <h2 className="text-xl font-semibold">No sourced answer for that yet</h2>
      <p className="mt-2 max-w-read text-ink-2">
        Shortcut only answers when it can point to guidance it has checked, so it will not guess at “{question}”. Try
        rewording it around a pattern, such as tooltips, tables or touch targets.
      </p>
      {countHits(related) > 0 && (
        <div className="-mx-3 mt-5">
          <p className="px-3 pb-2 text-sm font-semibold">Possibly related in the library</p>
          <SearchResults results={related} />
        </div>
      )}
    </div>
  );
}

function AnswerSkeleton() {
  return (
    <div role="status" className="rounded-md border border-line p-4 sm:p-5 md:p-6">
      <span className="sr-only">Looking for a sourced answer</span>
      <Skeleton className="h-4 w-24" />
      <Skeleton className="mt-3 h-9 w-2/3" />
      <Skeleton className="mt-8 h-4 w-full" />
      <Skeleton className="mt-2 h-4 w-11/12" />
      <Skeleton className="mt-2 h-4 w-3/4" />
    </div>
  );
}

export function AskView() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const asked = params.get("q") ?? "";

  // The site-wide context sets the default; the selector here overrides it
  // for this question only. "All" means no regional preference, so Global.
  const siteContext = useContentContext();
  const fallback: Context = siteContext === "sg" ? "sg" : "global";
  const context: Context = params.get("context") === "sg" ? "sg" : params.get("context") === "global" ? "global" : fallback;

  const [draft, setDraft] = useState(asked);
  const [latest, setLatest] = useState<Asked | null>(null);
  const key = `${context}:${asked}`;
  const loading = Boolean(asked) && latest?.key !== key;

  // Question and context live in the URL, so answers can be linked to and shared.
  useEffect(() => {
    if (!asked) return;
    let cancelled = false;
    provider.ask(asked, { context }).then((result) => {
      if (!cancelled) setLatest({ key, question: asked, result });
    });
    return () => {
      cancelled = true;
    };
  }, [asked, context, key]);

  function go(question: string, nextContext: Context) {
    const next = new URLSearchParams();
    if (question) next.set("q", question);
    next.set("context", nextContext);
    router.push(`${pathname}?${next.toString()}`, { scroll: false });
  }

  function ask(question: string) {
    const trimmed = question.trim();
    if (!trimmed) return;
    setDraft(trimmed);
    go(trimmed, context);
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    ask(draft);
  }

  // Two kinds of question: what the guidelines say, and what a design lead would say.
  const [mode, setMode] = useState<"guidelines" | "director">("guidelines");
  const guidelineSuggestions = context === "sg" ? [...suggestedSgQuestions, ...suggestedQuestions.slice(0, 2)] : suggestedQuestions;
  const suggestions = mode === "director" ? suggestedDirectorQuestions : guidelineSuggestions;
  const result = latest?.result;

  return (
    <div className="max-w-3xl pt-8">
      <form onSubmit={onSubmit}>
        <label htmlFor="ask" className="sr-only">
          Your question
        </label>
        <div className="flex items-center gap-2 rounded-lg border-2 border-ink bg-paper p-2 pl-4 focus-within:border-accent">
          <input
            id="ask"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="What are you designing?"
            autoComplete="off"
            className="h-11 min-w-0 flex-1 bg-transparent text-lg outline-none placeholder:text-ink-3"
          />
          <Button type="submit" variant="primary" disabled={!draft.trim()}>
            Ask
            <CornerDownLeft aria-hidden className="size-4" />
          </Button>
        </div>
      </form>

      <fieldset className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5">
        <legend className="sr-only">Answer for which context</legend>
        <span aria-hidden className="text-sm font-semibold">
          Context
        </span>
        <div className="flex rounded-sm border border-line-strong p-0.5">
          {contexts.map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={option === context}
              onClick={() => go(asked, option)}
              className={`min-h-9 md:min-h-7 rounded-[3px] px-2.5 text-sm transition-colors ${
                option === context ? "bg-ink font-medium text-paper" : "text-ink-2 hover:text-ink"
              }`}
            >
              {contextLabels[option]}
            </button>
          ))}
        </div>
        <span className="text-sm text-ink-2">
          {context === "sg"
            ? "Singapore government sources first, global standards to fill the gaps."
            : "Global standards and design systems."}
        </span>
      </fieldset>

      <div className="mt-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <p className="text-sm font-semibold">Try asking</p>
          <div className="flex rounded-sm border border-line-strong p-0.5">
            {(
              [
                ["guidelines", "What the guidelines say"],
                ["director", "A design director"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                aria-pressed={mode === value}
                onClick={() => setMode(value)}
                className={`min-h-9 md:min-h-7 rounded-[3px] px-2.5 text-sm transition-colors ${
                  mode === value ? "bg-ink font-medium text-paper" : "text-ink-2 hover:text-ink"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <ul className="mt-2 flex flex-wrap gap-2">
          {suggestions.map((question) => (
            <li key={question}>
              <button
                type="button"
                onClick={() => ask(question)}
                className="min-h-11 md:min-h-9 rounded-sm border border-line bg-paper px-3 py-1.5 text-left text-[0.9375rem] text-ink-2 transition-colors hover:border-ink hover:text-ink"
              >
                {question}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10" aria-live="polite">
        {loading && <AnswerSkeleton />}
        {!loading && asked && result?.answer && <AnswerCard question={asked} result={{ ...result, answer: result.answer }} />}
        {!loading && asked && result && !result.answer && <NoAnswer question={asked} />}
      </div>
    </div>
  );
}
