"use client";

import { resolveViewportValue, valueDependsOn, viewportKeyLabels, viewportKeyOrder } from "@/data/viewports";
import type { InputMethod, ViewportFilter, ViewportKey, ViewportScope } from "@/types";

const scopeLabels: Record<string, string> = { all: "All viewports", mobile: "Mobile", tablet: "Tablet", laptop: "Laptop", desktop: "Desktop", large: "Large desktop", foldable: "Foldable" };
const inputLabels: Record<InputMethod, string> = { touch: "Touch", pointer: "Pointer", keyboard: "Keyboard", mixed: "Mixed" };

/** Where a piece of guidance applies, in words. Guidance with no scope applies everywhere. */
export function appliesTo(scope: ViewportScope, values?: Partial<Record<ViewportKey, string>>): string {
  const parts: string[] = [];
  if (scope.viewportApplicability) parts.push(scope.viewportApplicability.map((v) => scopeLabels[v]).join(" / "));
  // Values given for both ends cover everything between, through the fallbacks.
  else if (values?.mobile && values.desktop) parts.push("Mobile to large desktop");
  else if (values) parts.push(viewportKeyOrder.filter((key) => values[key]).map((key) => viewportKeyLabels[key]).join(" / "));
  if (scope.input) parts.push(`${scope.input.map((i) => inputLabels[i]).join(" and ")} ${scope.input.length > 1 ? "input" : "interfaces"}`);
  return parts.length > 0 ? parts.join(" · ") : "All viewports";
}

/** True when guidance speaks to the chosen viewport in particular, so it can be listed first. */
export function isSpecificTo(item: ViewportScope & { viewportValues?: Partial<Record<ViewportKey, string>> }, filter: ViewportFilter, key: ViewportKey | undefined): boolean {
  if (filter === "all" || !key) return false;
  if (resolveViewportValue(item.viewportValues, key)) return true;
  return item.viewportApplicability?.includes(filter) ?? false;
}

/** The small line that tells a reader why they are seeing something. */
export function AppliesTo({ scope, values, note }: { scope: ViewportScope; values?: Partial<Record<ViewportKey, string>>; note?: string }) {
  return (
    <p className="text-sm text-ink-2">
      <span className="font-semibold text-ink-3">Applies to </span>
      {appliesTo(scope, values)}
      {note && <span className="text-ink-3">. {note}</span>}
    </p>
  );
}

/** Every viewport's starting point for one entry, side by side. */
export function ViewportTable({ values, highlight }: { values: Partial<Record<ViewportKey, string>>; highlight?: ViewportKey }) {
  const keys = viewportKeyOrder.filter((key) => !key.startsWith("foldable") || values[key]);
  return (
    <dl className="divide-y divide-line rounded-md border border-line">
      {keys.map((key) => {
        const resolved = resolveViewportValue(values, key);
        return (
          <div key={key} className={`grid gap-x-4 gap-y-0.5 px-4 py-2 sm:grid-cols-[9rem_1fr] ${key === highlight ? "bg-mark/40" : ""}`}>
            <dt className="text-sm font-semibold text-ink-3 sm:pt-0.5">{viewportKeyLabels[key]}</dt>
            <dd>
              {resolved ? (
                <>
                  <span className="font-medium">{resolved.value}</span>
                  {resolved.from && <span className="ml-2 text-sm text-ink-3">Same as {viewportKeyLabels[resolved.from].toLowerCase()}</span>}
                </>
              ) : (
                <span className="text-sm text-ink-3">No separate value. Use the nearest one.</span>
              )}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}

export function DependsOn({ items = valueDependsOn }: { items?: string[] }) {
  return (
    <p className="text-[0.9375rem] text-ink-2">
      <span className="font-semibold text-ink">Depends on </span>
      {items.join(", ").toLowerCase()}. A starting point, not a correct value.
    </p>
  );
}
