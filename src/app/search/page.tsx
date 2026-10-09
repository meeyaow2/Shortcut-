"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { SearchResults } from "@/components/search/SearchResults";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState, PageHeader } from "@/components/ui/primitives";
import { ContextNotice } from "@/components/layout/ContextSwitch";
import { useContentContext } from "@/hooks/useLibrary";
import { countHits, search } from "@/lib/search";

function Results() {
  const query = (useSearchParams().get("q") ?? "").trim();
  const context = useContentContext();
  const results = search(query, 50, context);
  const total = countHits(results);

  return (
    <>
      <PageHeader
        title={query ? `Results for “${query}”` : "Search"}
        lede={
          query
            ? `${total} ${total === 1 ? "match" : "matches"} across guidance, cheat sheets, design systems, updates, answers and resources.`
            : "Press / anywhere to search guidance, cheat sheets, design systems, updates, answers and resources."
        }
      />
      <div className="max-w-3xl pt-6">
        <ContextNotice>Results from other regions are hidden.</ContextNotice>
      </div>
      <div className="-mx-3 max-w-3xl pt-6">
        {total > 0 ? (
          <SearchResults results={results} />
        ) : (
          query && (
            <div className="mx-3">
              <EmptyState
                title="Nothing matches that search"
                action={<ButtonLink href={`/ask?q=${encodeURIComponent(query)}`}>Ask UX instead</ButtonLink>}
              >
                Search looks for every word you type. Try fewer words, a pattern name such as “table”, or a source
                such as “WCAG”.
              </EmptyState>
            </div>
          )
        )}
      </div>
    </>
  );
}

export default function SearchPage() {
  return (
    <div className="page">
      <Suspense>
        <Results />
      </Suspense>
    </div>
  );
}
