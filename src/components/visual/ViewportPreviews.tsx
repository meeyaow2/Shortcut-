"use client";

import { useState, type ReactNode } from "react";
import { resolveViewportValue, viewportKeyLabels } from "@/data/viewports";
import { useViewport } from "@/hooks/useViewport";
import type { FoldState, ViewportKey } from "@/types";
import { Specimen } from "./Specimens";

/**
 * Small wireframes that follow the selected viewport. They are schematic:
 * frame widths and paddings are scaled down and are not to scale with one
 * another. With every viewport shown, mobile, tablet and desktop sit side by
 * side; with one chosen, a single frame resizes to it.
 */
const frameWidth: Record<ViewportKey, number> = { mobile: 92, tablet: 160, laptop: 216, desktop: 256, large: 300, foldableClosed: 104, foldableOpen: 188 };
const overview: ViewportKey[] = ["mobile", "tablet", "desktop"];

const line = "block h-1 rounded-full bg-ink-3/40";

function Frame({ vkey, value, height = 132, children }: { vkey: ViewportKey; value?: string; height?: number; children: ReactNode }) {
  return (
    <div className="shrink-0">
      <div aria-hidden className="demo-motion overflow-hidden rounded-md border border-ink bg-wash" style={{ width: frameWidth[vkey], height }}>
        {children}
      </div>
      <p className="mt-2 text-sm font-semibold">{viewportKeyLabels[vkey]}</p>
      {value && <p className="max-w-[16rem] text-sm text-ink-2">{value}</p>}
    </div>
  );
}

/** One frame when a viewport is chosen, three when all are shown. */
function Preview({ caption, values, render }: { caption: string; values?: Partial<Record<ViewportKey, string>>; render: (vkey: ViewportKey) => ReactNode }) {
  const { key } = useViewport();
  const keys = key ? [key] : overview;
  return (
    <Specimen caption={caption}>
      <div className="flex flex-wrap items-start gap-x-6 gap-y-5">
        {keys.map((vkey, index) => (
          // Keyed by position, so the one frame resizes when the selection changes.
          <Frame key={key ? "one" : index} vkey={vkey} value={resolveViewportValue(values, vkey)?.value}>
            {render(vkey)}
          </Frame>
        ))}
      </div>
    </Specimen>
  );
}

const cardPadding: Record<ViewportKey, number> = { mobile: 7, tablet: 9, laptop: 11, desktop: 11, large: 14, foldableClosed: 7, foldableOpen: 9 };

/** A card whose padding is drawn in yellow, growing with the viewport. */
export function PaddingPreview({ values }: { values?: Partial<Record<ViewportKey, string>> }) {
  return (
    <Preview
      values={values}
      caption="The yellow band is the card's padding. Schematic, not to scale: the frames are small, so the padding is drawn in proportion."
      render={(vkey) => (
        <div className="p-2">
          <div className="demo-motion rounded-[5px] border border-ink bg-mark" style={{ padding: cardPadding[vkey] }}>
            <div className="space-y-1.5 rounded-[2px] bg-paper p-1.5">
              <span className={`${line} w-3/5 bg-ink/70`} />
              <span className={`${line} w-full`} />
              <span className={`${line} w-4/5`} />
            </div>
          </div>
        </div>
      )}
    />
  );
}

const columnCount: Record<ViewportKey, number> = { mobile: 1, tablet: 2, laptop: 3, desktop: 3, large: 3, foldableClosed: 1, foldableOpen: 2 };

/** Six items that reflow into more columns as the frame widens, then stop. */
export function ColumnsPreview({ values }: { values?: Partial<Record<ViewportKey, string>> }) {
  return (
    <Preview
      values={values}
      caption="Six items reflowing as the frame widens. On the large frame the column count holds and the margins grow instead."
      render={(vkey) => {
        const columns = columnCount[vkey];
        return (
          <div className="demo-motion h-full" style={{ padding: vkey === "large" ? "8px 34px" : "8px" }}>
            <div className="flex flex-wrap gap-1">
              {Array.from({ length: 6 }, (_, index) => (
                <span key={index} className="demo-motion h-9 rounded-[3px] border border-ink bg-paper" style={{ width: `calc((100% - ${(columns - 1) * 4}px) / ${columns})` }} />
              ))}
            </div>
          </div>
        );
      }}
    />
  );
}

function Menu() {
  return (
    <span className="flex flex-col gap-[3px]">
      <span className="block h-px w-3 bg-ink" />
      <span className="block h-px w-3 bg-ink" />
      <span className="block h-px w-3 bg-ink" />
    </span>
  );
}

function Content() {
  return (
    <div className="space-y-1.5 p-2">
      <span className={`${line} w-2/5 bg-ink/70`} />
      <span className={`${line} w-full`} />
      <span className={`${line} w-4/5`} />
      <span className={`${line} w-3/5`} />
    </div>
  );
}

/** What stays visible in the navigation at each width. */
export function NavPreview({ values }: { values?: Partial<Record<ViewportKey, string>> }) {
  const items: Partial<Record<ViewportKey, number>> = { tablet: 3, laptop: 5, desktop: 6, large: 6 };
  return (
    <Preview
      values={values}
      caption="Yellow marks the navigation. On the folding frames it sits at the side, as Apple's guidance for iPhone Duo describes."
      render={(vkey) => {
        if (vkey === "foldableClosed" || vkey === "foldableOpen") {
          return (
            <div className="flex h-full">
              <div className="flex-1">
                <Content />
              </div>
              <div className="flex w-5 flex-col items-center gap-1.5 border-l border-ink bg-mark py-2">
                {[0, 1, 2, 3].map((index) => (
                  <span key={index} className="size-2 rounded-full border border-ink bg-paper" />
                ))}
              </div>
            </div>
          );
        }
        return (
          <div className="flex h-full flex-col">
            <div className="flex h-6 items-center justify-between gap-2 border-b border-ink bg-mark px-2">
              <span className="size-2.5 shrink-0 rounded-[2px] bg-ink" />
              {vkey === "mobile" ? (
                <Menu />
              ) : (
                <span className="flex flex-1 items-center gap-1.5 overflow-hidden">
                  {Array.from({ length: items[vkey] ?? 0 }, (_, index) => (
                    <span key={index} className="block h-1 w-5 shrink-0 rounded-full bg-ink" />
                  ))}
                  {vkey === "tablet" && <Menu />}
                </span>
              )}
            </div>
            <div className="flex-1">
              <Content />
            </div>
            {vkey === "mobile" && (
              <div className="flex h-6 items-center justify-around border-t border-ink bg-mark/50">
                {[0, 1, 2, 3].map((index) => (
                  <span key={index} className="size-2 rounded-full border border-ink bg-paper" />
                ))}
              </div>
            )}
          </div>
        );
      }}
    />
  );
}

/**
 * A folding device, closed and open. Opening it widens the screen, keeps the
 * list where it was and brings a detail pane in beside it: the same place in
 * the same task, with one more level showing.
 */
export function FoldSchematic({ state }: { state: FoldState }) {
  const open = state === "open";
  return (
    <div aria-hidden className="flex items-end gap-4">
      <div className="demo-motion relative flex h-32 overflow-hidden rounded-lg border-2 border-ink bg-wash" style={{ width: open ? 208 : 104 }}>
        <div className="flex w-5 shrink-0 flex-col items-center gap-1.5 border-r border-ink bg-mark py-2">
          {[0, 1, 2, 3].map((index) => (
            <span key={index} className="size-2 rounded-full border border-ink bg-paper" />
          ))}
        </div>
        <div className="w-[78px] shrink-0 space-y-1.5 p-2">
          {[0, 1, 2, 3].map((index) => (
            <span key={index} className={`block h-4 rounded-[3px] border ${index === 1 ? "border-ink bg-mark" : "border-line-strong bg-paper"}`} />
          ))}
        </div>
        <div className="demo-motion min-w-0 flex-1 space-y-1.5 border-l border-ink bg-paper p-2" style={{ opacity: open ? 1 : 0 }}>
          <span className={`${line} w-3/5 bg-ink/70`} />
          <span className={`${line} w-full`} />
          <span className={`${line} w-4/5`} />
          <span className={`${line} w-full`} />
          <span className={`${line} w-2/5`} />
        </div>
        {/* The fold line, at the centre of the open screen. */}
        <span className="demo-motion absolute inset-y-0 left-1/2 border-l border-dashed border-ink-3" style={{ opacity: open ? 1 : 0 }} />
      </div>
    </div>
  );
}

/** The schematic with its own Closed and Open switch, for the foldable reference. */
export function FoldDemo() {
  const [state, setState] = useState<FoldState>("closed");
  return (
    <Specimen caption="Schematic, not to scale. Opening keeps the selected item and the bar at the side, and adds the detail beside the list. The dashed line is the fold.">
      <div className="flex flex-wrap items-start gap-x-8 gap-y-4">
        <FoldSchematic state={state} />
        <div>
          <div className="inline-flex rounded-sm border border-line-strong p-0.5">
            {(["closed", "open"] as const).map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={option === state}
                onClick={() => setState(option)}
                className={`min-h-9 rounded-[3px] px-3 text-sm capitalize ${option === state ? "bg-ink font-medium text-paper" : "text-ink-2 hover:text-ink"}`}
              >
                {option}
              </button>
            ))}
          </div>
          <p className="mt-2 max-w-[18rem] text-sm text-ink-2">
            {state === "closed" ? "Closed: a compact width layout. One pane, with the bar at the side." : "Open: a regular width layout. The same list, with its detail beside it."}
          </p>
        </div>
      </div>
    </Specimen>
  );
}
