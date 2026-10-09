"use client";

import { useSyncExternalStore } from "react";
import { localToday } from "@/lib/dates";

const subscribe = () => () => {};

/**
 * Today's date on the client, null on the server. Relative labels such as
 * "Verified today" depend on it, so they only render after hydration.
 */
export function useToday(): string | null {
  return useSyncExternalStore(subscribe, localToday, () => null);
}
