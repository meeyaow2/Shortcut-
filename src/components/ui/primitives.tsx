import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

/** A key on a keyboard. The product's one decorative motif, used for real shortcuts only. */
export function Keycap({ children }: { children: ReactNode }) {
  return (
    <kbd className="inline-flex h-6 min-w-6 items-center justify-center rounded-sm border border-b-2 border-line-strong bg-paper px-1.5 font-sans text-xs font-medium text-ink-2">
      {children}
    </kbd>
  );
}

/** Link to a page outside Shortcut. Always opens in a new tab and says so. */
export function ExternalLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-baseline gap-1 py-0.5 font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent ${className}`}
    >
      <span>{children}</span>
      <ArrowUpRight aria-hidden className="size-3.5 shrink-0 self-center" />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

export function Skeleton({ className = "" }: { className?: string }) {
  return <div aria-hidden className={`skeleton ${className}`} />;
}

interface EmptyStateProps {
  /** An optional small drawing above the title. */
  visual?: ReactNode;
  title: string;
  children: ReactNode;
  action?: ReactNode;
}

/** Says why the area is empty, what belongs here, and offers the way to fill it. */
export function EmptyState({ title, children, action, visual }: EmptyStateProps) {
  return (
    <div className="rounded-md border border-dashed border-line-strong px-6 py-10 text-center">
      {visual}
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-ink-2">{children}</p>
      {action && <div className="mt-5 flex justify-center">{action}</div>}
    </div>
  );
}

interface PageHeaderProps {
  title: string;
  lede: string;
  children?: ReactNode;
}

export function PageHeader({ title, lede, children }: PageHeaderProps) {
  return (
    <header className="border-b border-line pb-8 pt-10 md:pt-14">
      <h1 className="text-4xl font-semibold md:text-5xl">{title}</h1>
      <p className="mt-3 max-w-read text-lg text-ink-2">{lede}</p>
      {children}
    </header>
  );
}

interface FilterGroupProps<T extends string> {
  legend: string;
  options: readonly { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}

/** A single-choice filter rendered as toggle buttons. */
export function FilterGroup<T extends string>({ legend, options, value, onChange }: FilterGroupProps<T>) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-semibold text-ink">{legend}</legend>
      <div className="flex flex-wrap gap-1.5">
        {options.map((option) => {
          const selected = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(option.value)}
              className={`min-h-11 rounded-sm border px-3 text-sm transition-colors md:min-h-8 md:px-2.5 ${
                selected
                  ? "border-ink bg-ink font-medium text-paper"
                  : "border-line bg-paper text-ink-2 hover:border-line-strong hover:text-ink"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
