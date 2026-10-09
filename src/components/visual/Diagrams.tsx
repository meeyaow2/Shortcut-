import { ArrowDown, ArrowRight } from "lucide-react";
import { Fragment } from "react";
import { Specimen } from "./Specimens";

/**
 * Diagrams: a sequence, a proportion or a relationship drawn so it can be
 * taken in before the paragraph is read. Same language as the specimens:
 * thin ink lines, flat fills, yellow for the thing the diagram is about.
 */

/** Steps in order. Runs across from tablet width and down on a phone. */
export function ProcessStrip({ steps, emphasise = [], caption }: { steps: string[]; emphasise?: number[]; caption: string }) {
  return (
    <Specimen caption={caption}>
      <ol className="flex flex-col gap-1.5 md:flex-row md:flex-wrap md:items-center">
        {steps.map((step, index) => (
          <Fragment key={step}>
            {index > 0 && (
              <li aria-hidden className="pl-3 text-ink-3 md:pl-0">
                <ArrowDown className="size-4 md:hidden" />
                <ArrowRight className="hidden size-4 md:block" />
              </li>
            )}
            <li className={`rounded-sm border px-3 py-1.5 text-[0.9375rem] font-medium ${emphasise.includes(index) ? "border-ink bg-mark" : "border-line-strong bg-paper"}`}>{step}</li>
          </Fragment>
        ))}
      </ol>
    </Specimen>
  );
}

/** An agenda drawn to scale: each block is as wide as its share of the time. */
export function AgendaTimeline({ rows }: { rows: { time: string; activity: string }[] }) {
  const minutes = rows.map((row) => parseInt(row.time, 10) || 0);
  const total = minutes.reduce((sum, value) => sum + value, 0);
  if (total === 0) return null;
  return (
    <Specimen caption={`${total} minutes, drawn to scale. The widest blocks are where the session's real work happens; the opening and close are short on purpose.`}>
      <div aria-hidden className="flex h-9 min-w-[26rem] overflow-hidden rounded-sm border border-ink">
        {rows.map((row, index) => (
          <span
            key={row.activity}
            className={`flex items-center justify-center border-l border-ink text-sm font-semibold tabular-nums first:border-l-0 ${minutes[index] >= 15 ? "bg-mark" : "bg-paper"}`}
            style={{ width: `${(minutes[index] / total) * 100}%` }}
          >
            {minutes[index]}
          </span>
        ))}
      </div>
    </Specimen>
  );
}

const frame = "relative h-12 rounded-[4px] border border-dashed border-ink-3 bg-wash p-1.5";
const child = "flex h-full items-center justify-center rounded-[3px] border border-ink bg-mark text-xs font-semibold";

/** Hug, Fill and Fixed, each shown in the same parent frame. */
export function SizingDiagram() {
  const modes = [
    { label: "Hug", detail: "As wide as its content.", width: "auto" },
    { label: "Fill", detail: "Takes the space the parent has.", width: "100%" },
    { label: "Fixed", detail: "Stays 96 px, whatever is inside or around it.", width: "96px" },
  ];
  return (
    <Specimen caption="The dashed box is the parent frame; the yellow box is the layer. Only the layer's sizing setting changes between the three.">
      <ul className="grid gap-4 sm:grid-cols-3">
        {modes.map((mode) => (
          <li key={mode.label}>
            <div aria-hidden className={frame}>
              <span className={`${child} px-2`} style={{ width: mode.width }}>
                Label
              </span>
            </div>
            <p className="mt-1.5 text-sm">
              <span className="font-semibold">{mode.label}. </span>
              <span className="text-ink-2">{mode.detail}</span>
            </p>
          </li>
        ))}
      </ul>
    </Specimen>
  );
}

/** A value passing through three names on its way to a component. */
export function TokenChain() {
  const layers = [
    { layer: "Primitive", name: "blue-600", note: "A raw value with a neutral name." },
    { layer: "Semantic", name: "color-action", note: "What the value is for. Modes switch here." },
    { layer: "Component", name: "button-background", note: "Where it is used." },
  ];
  return (
    <Specimen caption="Each layer points at the one before it. The names are examples, not Figma's or any system's. Change the primitive and everything downstream follows.">
      <ol className="flex flex-col gap-1.5 md:flex-row md:items-stretch">
        {layers.map((item, index) => (
          <Fragment key={item.layer}>
            {index > 0 && (
              <li aria-hidden className="flex items-center pl-3 text-ink-3 md:pl-0">
                <ArrowDown className="size-4 md:hidden" />
                <ArrowRight className="hidden size-4 md:block" />
              </li>
            )}
            <li className={`flex-1 rounded-sm border p-3 ${index === 1 ? "border-ink bg-mark" : "border-line-strong"}`}>
              <p className="text-sm font-semibold text-ink-3">{item.layer}</p>
              <p className="font-display font-semibold tracking-tight">{item.name}</p>
              <p className="mt-1 text-sm text-ink-2">{item.note}</p>
            </li>
          </Fragment>
        ))}
      </ol>
    </Specimen>
  );
}

const pill = "flex h-7 w-20 items-center justify-center rounded-[4px] border text-xs font-semibold";

/** One main component, three linked instances, one of them overridden. */
export function InstancesDiagram() {
  return (
    <Specimen caption="A change to the main component reaches every instance. The third instance has its label overridden and keeps that override.">
      <div aria-hidden className="flex flex-wrap items-center gap-x-4 gap-y-3">
        <div>
          <span className={`${pill} border-ink bg-mark`}>Button</span>
          <p className="mt-1 text-xs font-semibold text-ink-3">Main</p>
        </div>
        <ArrowRight className="size-4 text-ink-3" />
        <div className="flex flex-wrap gap-2">
          {["Button", "Button", "Save"].map((label, index) => (
            <div key={index}>
              <span className={`${pill} border-ink bg-paper`}>{label}</span>
              <p className="mt-1 text-xs font-semibold text-ink-3">{index === 2 ? "Instance, overridden" : "Instance"}</p>
            </div>
          ))}
        </div>
      </div>
    </Specimen>
  );
}

/** One component, shown in three of its states. */
export function VariantsDiagram() {
  const states = [
    { label: "Default", className: "border-ink bg-paper" },
    { label: "Hover", className: "border-ink bg-mark" },
    { label: "Disabled", className: "border-line-strong bg-wash text-ink-3" },
  ];
  return (
    <Specimen caption="One component with a State property, not three separate components. Whoever uses it picks the state from a menu.">
      <ul className="flex flex-wrap gap-4">
        {states.map((state) => (
          <li key={state.label}>
            <span aria-hidden className={`${pill} ${state.className}`}>
              Button
            </span>
            <p className="mt-1 text-xs font-semibold text-ink-3">{state.label}</p>
          </li>
        ))}
      </ul>
    </Specimen>
  );
}

/** A small line drawing for an empty result: a magnifier over blank lines. */
export function NothingFound() {
  return (
    <svg aria-hidden viewBox="0 0 96 64" className="mx-auto mb-4 h-16 w-24" fill="none" stroke="var(--color-ink)" strokeWidth="1.5" strokeLinecap="round">
      <rect x="8" y="10" width="52" height="44" rx="4" stroke="var(--color-line-strong)" />
      <path d="M16 22h28M16 31h36M16 40h20" stroke="var(--color-line-strong)" />
      <circle cx="62" cy="34" r="13" fill="var(--color-mark)" />
      <path d="M72 44l12 12" />
    </svg>
  );
}
