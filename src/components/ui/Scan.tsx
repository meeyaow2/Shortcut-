import type { ReactNode } from "react";

/**
 * Blocks for reading a page in thirty seconds. They hold Shortcut's own
 * summaries, so they are never used for a source's wording: official text
 * stays in its own labelled block, with its citation.
 */

/** The one thing to take from a section. Use once per section at most. */
export function KeyTakeaway({ children, label = "Key takeaway" }: { children: ReactNode; label?: string }) {
  return (
    <p className="max-w-read border-l-2 border-ink bg-mark/40 px-4 py-3">
      <span className="block text-sm font-semibold text-ink-2">{label}</span>
      <span className="text-lg font-medium leading-snug">{children}</span>
    </p>
  );
}

/** A short list at the top of a long page, for the reader who only needs the answer. */
export function InThirty({ title = "In 30 seconds", items, more }: { title?: string; items: string[]; more?: ReactNode }) {
  return (
    <section aria-label={title} className="rounded-md border border-ink p-4 sm:p-5">
      <h2 className="font-sans text-sm font-semibold tracking-normal text-ink-2">{title}</h2>
      <ul className="mt-2 grid gap-x-8 gap-y-1.5 md:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5">
            <span aria-hidden className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-ink" />
            <span className="font-medium">{item}</span>
          </li>
        ))}
      </ul>
      {more && <p className="mt-3 text-sm text-ink-2">{more}</p>}
    </section>
  );
}
