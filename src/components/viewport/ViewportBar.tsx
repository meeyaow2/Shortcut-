"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { foldableDevices, getViewport, viewportFilters } from "@/data/viewports";
import { useLibrary } from "@/hooks/useLibrary";
import { contextLabels } from "@/lib/authority";
import { getSnapshot, library } from "@/lib/store";
import type { ContextFilter, FoldState, ViewportFilter } from "@/types";

const contextOptions: { id: ContextFilter; label: string }[] = (["all", "global", "sg"] as const).map((id) => ({ id, label: contextLabels[id] }));
const stateOptions: { id: FoldState; label: string }[] = [
  { id: "closed", label: "Closed" },
  { id: "open", label: "Open" },
];

// How each choice is written in the address, so a view can be bookmarked or shared.
const contextParam: Record<ContextFilter, string> = { all: "", global: "global", sg: "singapore" };
const device = foldableDevices[0];

/** Reads the choices from the address once, then keeps the address in step with them. */
function useUrlState() {
  const { context, viewport, foldState } = useLibrary();
  const applied = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromContext = (Object.keys(contextParam) as ContextFilter[]).find((id) => contextParam[id] && contextParam[id] === params.get("context"));
    const fromViewport = viewportFilters.find((v) => v.id === params.get("viewport"));
    const fromState = stateOptions.find((s) => s.id === params.get("state"));
    // The address wins over the saved preference: it is what someone shared.
    if (fromContext) library.setContext(fromContext);
    if (fromViewport) library.setViewport(fromViewport.id);
    if (fromState) library.setFoldState(fromState.id);
    applied.current = true;
  }, []);

  useEffect(() => {
    if (!applied.current) return;
    // Read the store directly: on the first pass the values above are newer than this render's.
    const now = getSnapshot();
    const params = new URLSearchParams(window.location.search);
    const set = (name: string, value: string) => (value ? params.set(name, value) : params.delete(name));
    set("context", contextParam[now.context]);
    set("viewport", now.viewport === "all" ? "" : now.viewport);
    set("device", now.viewport === "foldable" ? device.id : "");
    set("state", now.viewport === "foldable" ? now.foldState : "");
    const query = params.toString();
    const url = `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`;
    if (url !== `${window.location.pathname}${window.location.search}${window.location.hash}`) {
      window.history.replaceState(window.history.state, "", url);
    }
  }, [context, viewport, foldState]);
}

function Segmented<T extends string>({ legend, options, value, onChange, wrap = false }: { legend: string; options: { id: T; label: string }[]; value: T; onChange: (id: T) => void; wrap?: boolean }) {
  return (
    <fieldset className={wrap ? "" : "flex items-center gap-2"}>
      <legend className={wrap ? "mb-2 text-sm font-semibold" : "sr-only"}>{legend}</legend>
      {!wrap && (
        <span aria-hidden className="text-sm text-ink-3">
          {legend}
        </span>
      )}
      <div className={wrap ? "grid grid-cols-2 gap-1.5 min-[26rem]:grid-cols-3" : "flex rounded-sm border border-line-strong p-0.5"}>
        {options.map((option) => {
          const selected = option.id === value;
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(option.id)}
              className={
                wrap
                  ? `min-h-11 rounded-sm border px-2 text-sm transition-colors ${selected ? "border-ink bg-ink font-medium text-paper" : "border-line-strong text-ink-2"}`
                  : `min-h-7 rounded-[3px] px-2.5 text-sm transition-colors ${selected ? "bg-ink font-medium text-paper" : "text-ink-2 hover:text-ink"}`
              }
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function DeviceSelect({ wrap = false }: { wrap?: boolean }) {
  return (
    <label className={wrap ? "block" : "flex items-center gap-2"}>
      <span className={wrap ? "mb-2 block text-sm font-semibold" : "text-sm text-ink-3"}>Device</span>
      <select defaultValue={device.id} className={`rounded-sm border border-line-strong bg-paper px-2 text-sm ${wrap ? "min-h-11 w-full" : "min-h-8"}`}>
        {foldableDevices.map((d) => (
          <option key={d.id} value={d.id}>
            {d.name}
          </option>
        ))}
      </select>
    </label>
  );
}

/** One line under the control saying what the selection means. */
function Caption({ viewport, foldState }: { viewport: ViewportFilter; foldState: FoldState }) {
  if (viewport === "all") {
    return (
      <>
        Viewport references are useful starting points. Design breakpoints should respond to the content, not specific device models. Choosing a viewport
        changes what is emphasised; nothing is hidden.
      </>
    );
  }
  if (viewport === "foldable") {
    const display = device.displays.find((d) => d.mode === foldState)!;
    return (
      <>
        <span className="font-semibold text-ink">
          {device.name}, {foldState}.{" "}
        </span>
        {display.name}, {display.size}. Apple gives it a {display.sizeClass.toLowerCase()} layout. Where an entry has no value of its own for it, Shortcut
        shows the {foldState === "closed" ? "mobile" : "tablet"} one and says so. General guidance is still shown.
      </>
    );
  }
  const info = getViewport(viewport);
  return (
    <>
      <span className="font-semibold text-ink">{info.label}. </span>
      Reference range {info.range}, not a breakpoint. Widths to open a design at: {info.referenceWidths}. Guidance that applies at every viewport is still
      shown.
    </>
  );
}

/**
 * Chooses the viewport the cheat sheets are read for. It changes emphasis and
 * order, never what is available. Device and state appear only for foldables.
 * On narrow screens every control moves into one sheet behind a single button.
 */
export function ViewportBar() {
  useUrlState();
  const { context, viewport, foldState } = useLibrary();
  const dialog = useRef<HTMLDialogElement>(null);
  const foldable = viewport === "foldable";
  const active = (context === "all" ? 0 : 1) + (viewport === "all" ? 0 : 1);
  const viewportLabel = viewportFilters.find((v) => v.id === viewport)!.label;

  return (
    <section aria-label="Viewport" className="rounded-md border border-line p-3 sm:p-4">
      {/* From tablet width: everything in one wrapping row. */}
      <div className="hidden flex-wrap items-center gap-x-6 gap-y-3 md:flex">
        <Segmented legend="Viewport" options={viewportFilters} value={viewport} onChange={library.setViewport} />
        {foldable && (
          <>
            <DeviceSelect />
            <Segmented legend="State" options={stateOptions} value={foldState} onChange={library.setFoldState} />
          </>
        )}
      </div>

      {/* Narrow screens: one button, with the active choices beside it. */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 md:hidden">
        <button
          type="button"
          onClick={() => dialog.current?.showModal()}
          className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-line-strong px-3 text-sm font-medium"
        >
          <SlidersHorizontal aria-hidden className="size-4" />
          Filters{active > 0 && ` (${active})`}
        </button>
        <p className="text-sm text-ink-2">
          Viewport: <span className="font-medium text-ink">{foldable ? `${device.name}, ${foldState}` : viewportLabel}</span>
          {context !== "all" && (
            <>
              {" · "}Context: <span className="font-medium text-ink">{contextLabels[context]}</span>
            </>
          )}
        </p>
      </div>

      <p className="mt-3 max-w-3xl text-sm text-ink-2">
        <Caption viewport={viewport} foldState={foldState} />
      </p>

      <dialog
        ref={dialog}
        aria-labelledby="filters-title"
        onClick={(event) => event.target === dialog.current && dialog.current?.close()}
        className="fixed inset-x-0 bottom-0 top-auto m-0 max-h-[85dvh] w-full max-w-none overflow-y-auto rounded-t-lg border-t border-line bg-paper p-0 text-ink backdrop:bg-ink/40"
      >
        <div className="space-y-5 p-4 pb-6">
          <div className="flex items-center justify-between">
            <h2 id="filters-title" className="text-xl font-semibold">
              Filters
            </h2>
            <button type="button" onClick={() => dialog.current?.close()} aria-label="Close filters" className="inline-flex size-11 items-center justify-center rounded-sm text-ink-2">
              <X aria-hidden className="size-5" />
            </button>
          </div>
          <Segmented wrap legend="Context" options={contextOptions} value={context} onChange={library.setContext} />
          <Segmented wrap legend="Viewport" options={viewportFilters} value={viewport} onChange={library.setViewport} />
          {foldable && (
            <>
              <DeviceSelect wrap />
              <Segmented wrap legend="State" options={stateOptions} value={foldState} onChange={library.setFoldState} />
            </>
          )}
          <button type="button" onClick={() => dialog.current?.close()} className="min-h-11 w-full rounded-sm bg-ink px-4 font-medium text-paper">
            Show guidance
          </button>
        </div>
      </dialog>
    </section>
  );
}
