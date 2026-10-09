"use client";

import { useSyncExternalStore } from "react";
import type { ContextFilter } from "@/types";
import { getServerSnapshot, getSnapshot, subscribe, type LibraryState } from "@/lib/store";

/** Reader preferences. Defaults on the server and until localStorage is read. */
export function useLibrary(): LibraryState {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** The regional context the reader is browsing in. "all" until they choose. */
export function useContentContext(): ContextFilter {
  return useLibrary().context;
}
