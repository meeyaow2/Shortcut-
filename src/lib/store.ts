import type { ContextFilter, FoldState, ViewportFilter } from "@/types";

// A few reader preferences kept in localStorage behind this small store.
// Components read it through hooks/useLibrary. Nothing here needs an account
// or a backend, and nothing has to be kept in step with the content.

export interface LibraryState {
  /** Cheat sheet slug -> ISO day it was last opened. */
  lastViewed: Record<string, string>;
  /** The regional context the reader is browsing in. */
  context: ContextFilter;
  /** Ticked item ids on the Before You Send It checklist. */
  checklist: string[];
  /** The viewport the cheat sheets are read for. */
  viewport: ViewportFilter;
  /** Which state of a folding screen, when the viewport is "foldable". */
  foldState: FoldState;
}

const STORAGE_KEY = "shortcut.library.v1";

const initialState: LibraryState = {
  lastViewed: {},
  context: "all",
  checklist: [],
  viewport: "all",
  foldState: "closed",
};

let state: LibraryState = initialState;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const stored = JSON.parse(raw) as Partial<LibraryState>;
      // Read known fields only, so data left by removed features is ignored.
      state = {
        lastViewed: stored.lastViewed ?? initialState.lastViewed,
        context: stored.context ?? initialState.context,
        checklist: stored.checklist ?? initialState.checklist,
        viewport: stored.viewport ?? initialState.viewport,
        foldState: stored.foldState ?? initialState.foldState,
      };
    }
  } catch {
    // Unreadable or blocked storage: carry on with in-memory preferences.
  }
}

function update(next: LibraryState) {
  state = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage full or blocked: the change still applies for this visit.
  }
  listeners.forEach((listener) => listener());
}

export function subscribe(listener: () => void): () => void {
  load();
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSnapshot(): LibraryState {
  load();
  return state;
}

export function getServerSnapshot(): LibraryState {
  return initialState;
}

export const library = {
  setContext(context: ContextFilter) {
    if (state.context !== context) update({ ...state, context });
  },

  setViewport(viewport: ViewportFilter) {
    if (state.viewport !== viewport) update({ ...state, viewport });
  },

  setFoldState(foldState: FoldState) {
    if (state.foldState !== foldState) update({ ...state, foldState });
  },

  toggleChecklistItem(id: string) {
    const checklist = state.checklist.includes(id) ? state.checklist.filter((item) => item !== id) : [...state.checklist, id];
    update({ ...state, checklist });
  },

  resetChecklist() {
    update({ ...state, checklist: [] });
  },

  markViewed(slug: string, day: string) {
    if (state.lastViewed[slug] === day) return;
    update({ ...state, lastViewed: { ...state.lastViewed, [slug]: day } });
  },
};
