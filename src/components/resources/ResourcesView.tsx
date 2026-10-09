"use client";

import { ArrowUpRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { intents, resources } from "@/data/resources";
import type { Resource } from "@/types";
import { ContextTag } from "../source/Source";
import { Tag } from "../ui/Tag";

export function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <article className="group relative flex items-start gap-4 rounded-md border border-line p-5 transition-colors hover:border-ink">
      <div className="min-w-0 flex-1">
        <h3 className="text-lg font-semibold">
          <a href={resource.url} target="_blank" rel="noreferrer" className="after:absolute after:inset-0 after:rounded-md">
            {resource.name}
            <ArrowUpRight aria-hidden className="ml-1 inline size-4 text-ink-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </h3>
        <p className="mt-1 text-ink-2">{resource.description}</p>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-ink-3">
          <Tag>{resource.category}</Tag>
          {resource.context && <ContextTag context={resource.context} />}
          <span>{new URL(resource.url).hostname.replace(/^www\./, "")}</span>
        </div>
        {resource.tags && <p className="mt-2 text-sm text-ink-3">{resource.tags.join(" · ")}</p>}
      </div>
    </article>
  );
}

export function ResourcesView() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const selected = intents.find((intent) => intent.id === params.get("need")) ?? intents[0];
  const list = resources.filter((resource) => resource.intentId === selected.id);

  return (
    <div className="grid gap-10 pt-8 lg:grid-cols-[18rem_1fr]">
      <fieldset className="lg:sticky lg:top-24 lg:self-start">
        <legend className="mb-3 font-display text-2xl font-semibold tracking-tight">What do you need?</legend>
        <div className="flex flex-wrap gap-1.5 lg:flex-col lg:gap-0.5">
          {intents.map((intent) => {
            const current = intent.id === selected.id;
            return (
              <button
                key={intent.id}
                type="button"
                aria-pressed={current}
                onClick={() => router.replace(`${pathname}?need=${intent.id}`, { scroll: false })}
                className={`min-h-10 rounded-sm px-3 text-left transition-colors ${
                  current ? "bg-ink font-medium text-paper" : "border border-line text-ink-2 hover:border-ink hover:text-ink lg:border-transparent"
                }`}
              >
                I need {intent.need}
              </button>
            );
          })}
        </div>
      </fieldset>

      <section aria-labelledby="resource-heading">
        <h2 id="resource-heading" className="text-2xl font-semibold">
          I need {selected.need}
        </h2>
        <p className="mt-1 text-ink-2" role="status">
          {list.length} picks. A short list on purpose.
        </p>
        <div className="mt-5 space-y-3">
          {list.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </section>
    </div>
  );
}
