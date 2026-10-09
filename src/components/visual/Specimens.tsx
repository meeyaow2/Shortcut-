import type { ReactNode } from "react";

/**
 * Specimens: a value drawn at its real size, so it can be judged by eye.
 * One illustration language throughout: thin ink lines, flat fills, and the
 * highlighter yellow for the thing being measured. Values in pixels are
 * rendered at exactly that size.
 */
export function Specimen({ caption, children }: { caption: string; children: ReactNode }) {
  return (
    <figure className="rounded-md border border-line">
      <div className="overflow-x-auto p-4">{children}</div>
      <figcaption className="border-t border-line bg-wash px-4 py-2 text-sm text-ink-2">{caption}</figcaption>
    </figure>
  );
}

const block = "h-7 w-12 shrink-0 rounded-[3px] border border-ink bg-paper";

/** Two blocks with the gap between them drawn in, one row per step. */
export function SpacingSpecimen() {
  return (
    <Specimen caption="Each yellow bar is the gap at actual size. Small gaps read as one thing; large gaps read as separate things.">
      <ul className="space-y-2">
        {[4, 8, 12, 16, 24, 32, 48, 64].map((px) => (
          <li key={px} className="flex items-center gap-4">
            <span className="w-12 shrink-0 font-display font-semibold tabular-nums tracking-tight">{px} px</span>
            <span aria-hidden className="flex items-center">
              <span className={block} />
              <span className="h-7 bg-mark" style={{ width: px }} />
              <span className={block} />
            </span>
          </li>
        ))}
      </ul>
    </Specimen>
  );
}

/** The same rectangle at each radius. */
export function RadiusSpecimen() {
  const steps: { label: string; radius: number }[] = [
    { label: "0", radius: 0 },
    { label: "4", radius: 4 },
    { label: "8", radius: 8 },
    { label: "12", radius: 12 },
    { label: "16", radius: 16 },
    { label: "24", radius: 24 },
    { label: "Full", radius: 999 },
  ];
  return (
    <Specimen caption="The same 88 by 48 px shape at each radius, in px. On a control this size, 24 is already nearly a pill.">
      <ul className="flex flex-wrap gap-x-4 gap-y-4">
        {steps.map((step) => (
          <li key={step.label} className="text-center">
            <span aria-hidden className="block h-12 w-[5.5rem] border border-ink bg-wash" style={{ borderRadius: step.radius }} />
            <span className="mt-1.5 block font-display text-sm font-semibold tabular-nums tracking-tight">{step.label}</span>
          </li>
        ))}
      </ul>
    </Specimen>
  );
}

/** One sample card at each elevation level. */
export function ElevationSpecimen() {
  const levels = [
    { label: "Level 0", shadow: "none", border: true },
    { label: "Level 1", shadow: "0 1px 2px rgb(20 23 31 / 0.10)", border: false },
    { label: "Level 2", shadow: "0 4px 12px rgb(20 23 31 / 0.12)", border: false },
    { label: "Level 3", shadow: "0 12px 32px rgb(20 23 31 / 0.18)", border: false },
  ];
  return (
    <Specimen caption="The same card at each level. Level 0 is separated by a border, not a shadow. The shadow values here are examples, not a standard.">
      <ul className="flex flex-wrap gap-6 rounded-sm bg-wash p-5">
        {levels.map((level) => (
          <li key={level.label} className="text-center">
            <span aria-hidden className={`block h-16 w-24 rounded-md bg-paper ${level.border ? "border border-line-strong" : ""}`} style={{ boxShadow: level.shadow }} />
            <span className="mt-2.5 block text-sm font-semibold">{level.label}</span>
          </li>
        ))}
      </ul>
    </Specimen>
  );
}

function Swatch({ hex, label, dark }: { hex: string; label: string; dark: boolean }) {
  return (
    <li className="w-24">
      <span aria-hidden className="flex h-16 items-end rounded-sm border border-line-strong p-2 font-display text-lg font-semibold" style={{ background: hex, color: dark ? "#ffffff" : "#14171f" }}>
        Aa
      </span>
      <span className="mt-1.5 block text-sm font-semibold">{label}</span>
      <span className="block text-sm tabular-nums text-ink-3">{hex}</span>
    </li>
  );
}

/** Pure and softened neutrals, side by side. */
export function NeutralSpecimen() {
  return (
    <Specimen caption="Pure and softened neutrals. Neither is better in general: it depends on the brand, the screen and what sits on top.">
      <div className="space-y-4">
        <ul className="flex flex-wrap gap-3">
          <Swatch hex="#000000" label="Pure" dark />
          <Swatch hex="#111111" label="Softened" dark />
          <Swatch hex="#171717" label="Surface" dark />
          <Swatch hex="#1F1F1F" label="Raised surface" dark />
        </ul>
        <ul className="flex flex-wrap gap-3">
          <Swatch hex="#FFFFFF" label="Pure" dark={false} />
          <Swatch hex="#FAFAFA" label="Softened" dark={false} />
          <Swatch hex="#F8F8F8" label="Background" dark={false} />
        </ul>
      </div>
    </Specimen>
  );
}

const sentence = "Send the invoice before Friday.";
const paragraph =
  "Most of what people do in a product is read. A comfortable size, a little air between lines and a line that is not too long do more for an interface than any typeface.";

/** One sentence at each size. */
export function TypeScaleSpecimen() {
  return (
    <Specimen caption="The same sentence at each size, in px. Body text usually sits at 14 or 16.">
      <ul className="space-y-1.5">
        {[12, 14, 16, 20, 24, 32].map((px) => (
          <li key={px} className="flex items-baseline gap-4">
            <span className="w-12 shrink-0 text-sm font-semibold tabular-nums text-ink-3">{px}</span>
            <span className="whitespace-nowrap leading-tight" style={{ fontSize: px }}>
              {sentence}
            </span>
          </li>
        ))}
      </ul>
    </Specimen>
  );
}

/** One paragraph at three line heights. */
export function LineHeightSpecimen() {
  return (
    <Specimen caption="The same paragraph at 15 px, at three line heights.">
      <ul className="grid gap-5 sm:grid-cols-3">
        {[1.2, 1.4, 1.6].map((value) => (
          <li key={value}>
            <span className="font-display font-semibold tabular-nums tracking-tight">{value}</span>
            <p className="mt-1 text-[0.9375rem] text-ink-2" style={{ lineHeight: value }}>
              {paragraph}
            </p>
          </li>
        ))}
      </ul>
    </Specimen>
  );
}

/** One paragraph at three widths. */
export function LineLengthSpecimen() {
  const widths = [
    { label: "Short", detail: "about 30 characters", width: "30ch" },
    { label: "Comfortable", detail: "about 65 characters", width: "65ch" },
    { label: "Too wide", detail: "as wide as the container", width: "none" },
  ];
  return (
    <Specimen caption="The same paragraph at three widths. On a narrow screen all three end up the width of the screen, which is the point: the limit only matters when there is room to exceed it.">
      <ul className="space-y-4">
        {widths.map((item) => (
          <li key={item.label}>
            <p className="text-sm">
              <span className="font-semibold">{item.label}</span> <span className="text-ink-3">{item.detail}</span>
            </p>
            <p className="mt-1 border-l border-line-strong pl-3 text-[0.9375rem] text-ink-2" style={{ maxWidth: item.width }}>
              {paragraph} {item.width === "none" && paragraph}
            </p>
          </li>
        ))}
      </ul>
    </Specimen>
  );
}
