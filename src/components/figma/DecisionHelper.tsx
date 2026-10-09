"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { figmaDecisions, getFigmaTool } from "@/data/figma";

/** "I know what I want to do. Which Figma tool should I open?" */
export function DecisionHelper() {
  const [id, setId] = useState(figmaDecisions[0].id);
  const decision = figmaDecisions.find((d) => d.id === id) ?? figmaDecisions[0];
  const tool = getFigmaTool(decision.toolId)!;
  const alternative = decision.alternative ? getFigmaTool(decision.alternative.toolId) : undefined;

  return (
    <div className="grid gap-6 rounded-md border border-line p-4 sm:p-6 lg:grid-cols-[1fr_1fr]">
      <fieldset>
        <legend className="mb-3 font-display text-xl font-semibold tracking-tight">I want to&hellip;</legend>
        <div className="flex flex-wrap gap-1.5 lg:flex-col lg:gap-0.5">
          {figmaDecisions.map((option) => {
            const selected = option.id === id;
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={selected}
                onClick={() => setId(option.id)}
                className={`min-h-11 md:min-h-10 rounded-sm px-3 text-left text-[0.9375rem] transition-colors ${
                  selected ? "bg-ink font-medium text-paper" : "border border-line text-ink-2 hover:border-ink hover:text-ink lg:border-transparent"
                }`}
              >
                {option.goal}
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Announced when the choice changes, so the answer is not missed by screen-reader users. */}
      <div aria-live="polite" className="min-w-0 lg:border-l lg:border-line lg:pl-6">
        <p className="text-sm font-semibold text-ink-3">Open</p>
        <p className="font-display text-3xl font-semibold tracking-tight">{tool.name}</p>
        <p className="mt-2 text-ink-2">
          <span className="font-semibold text-ink">Why. </span>
          {decision.why}
        </p>
        {alternative && decision.alternative && (
          <p className="mt-3 border-l-2 border-mark pl-3">
            <span className="block text-sm font-semibold text-ink-3">Alternative</span>
            <span className="font-medium">{alternative.name}</span>, when {decision.alternative.when}
          </p>
        )}
        <p className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
          <Link href={`/figma/${tool.id}`} className="inline-flex items-center gap-1 font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent">
            About {tool.name}
            <ArrowRight aria-hidden className="size-4" />
          </Link>
          {decision.related && (
            <Link href={decision.related.href} className="font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent">
              {decision.related.label}
            </Link>
          )}
        </p>
      </div>
    </div>
  );
}
