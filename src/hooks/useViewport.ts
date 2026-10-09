"use client";

import { toViewportKey } from "@/data/viewports";
import type { FoldState, ViewportFilter, ViewportKey } from "@/types";
import { useLibrary } from "./useLibrary";

export interface ViewportSelection {
  viewport: ViewportFilter;
  foldState: FoldState;
  /** The key values are read by. Undefined when every viewport is shown. */
  key: ViewportKey | undefined;
}

/** The viewport the reader is reading for. "all" until they choose. */
export function useViewport(): ViewportSelection {
  const { viewport, foldState } = useLibrary();
  return { viewport, foldState, key: toViewportKey(viewport, foldState) };
}
