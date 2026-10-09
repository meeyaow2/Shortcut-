"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import { useContentContext } from "@/hooks/useLibrary";
import { countHits, search } from "@/lib/search";
import { Keycap } from "../ui/primitives";
import { SearchResults } from "./SearchResults";

interface SearchBoxProps {
  /** "hero" floats results under the field; "palette" lays them out inline. */
  variant: "hero" | "palette";
  placeholder?: string;
  autoFocus?: boolean;
  /** Called after the user picks a result or submits. */
  onDone?: () => void;
  /** Shown at the right edge of the field. */
  hint?: ReactNode;
}

/** The search field with live grouped results, shared by Home and the command palette. */
export function SearchBox({ variant, placeholder = "Search WCAG, patterns, guidelines, tools…", autoFocus, onDone, hint }: SearchBoxProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const wrapper = useRef<HTMLDivElement>(null);

  const context = useContentContext();
  const results = useMemo(() => search(query, variant === "hero" ? 4 : 5, context), [query, variant, context]);
  const total = countHits(results);
  const hasQuery = query.trim().length > 0;
  const showPanel = hasQuery && (variant === "palette" || open);

  useEffect(() => {
    if (variant !== "hero" || !open) return;
    function onPointerDown(event: PointerEvent) {
      if (!wrapper.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [variant, open]);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!hasQuery) return;
    setOpen(false);
    onDone?.();
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  }

  const panel = showPanel && (
    <div
      className={
        variant === "hero"
          ? "pop-in absolute inset-x-0 top-full z-20 mt-2 max-h-[60vh] overflow-y-auto rounded-lg border border-line-strong bg-paper p-2 shadow-[0_16px_40px_-20px_rgb(20_23_31/0.35)]"
          : "max-h-[55vh] overflow-y-auto border-t border-line p-2"
      }
    >
      {total > 0 ? (
        <>
          <SearchResults results={results} onNavigate={onDone} />
          <Link
            href={`/search?q=${encodeURIComponent(query.trim())}`}
            onClick={onDone}
            className="mt-2 block rounded-sm px-3 py-2 text-sm font-medium text-accent hover:bg-wash"
          >
            See all results for “{query.trim()}”
          </Link>
        </>
      ) : (
        <p className="px-3 py-4 text-ink-2">
          Nothing matches “{query.trim()}”. Try a pattern, a source or a number, such as “contrast” or “WCAG”.
        </p>
      )}
    </div>
  );

  return (
    <div ref={wrapper} className="relative" onKeyDown={(event) => event.key === "Escape" && setOpen(false)}>
      <form role="search" onSubmit={onSubmit}>
        <label className="sr-only" htmlFor={`search-${variant}`}>
          Search Shortcut
        </label>
        <div
          className={`flex items-center gap-3 bg-paper px-4 ${
            variant === "hero" ? "h-16 rounded-lg border-2 border-ink focus-within:border-accent" : "h-14"
          }`}
        >
          <Search aria-hidden className="size-5 shrink-0 text-ink-3" />
          <input
            id={`search-${variant}`}
            type="search"
            value={query}
            autoFocus={autoFocus}
            autoComplete="off"
            placeholder={placeholder}
            onChange={(event) => {
              setQuery(event.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            className="h-full min-w-0 flex-1 bg-transparent text-lg outline-none placeholder:text-ink-3 [&::-webkit-search-cancel-button]:hidden"
          />
          {hint ?? <span className="hidden sm:block"><Keycap>/</Keycap></span>}
        </div>
      </form>
      {/* Tells screen-reader users how many results the live list holds. */}
      <p role="status" className="sr-only">
        {hasQuery ? `${total} result${total === 1 ? "" : "s"}` : ""}
      </p>
      {panel}
    </div>
  );
}
