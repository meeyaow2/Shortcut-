import type { Answer, Context } from "@/types";

export interface AskOptions {
  /** The region the reader chose. A provider may override it when the question names a region. */
  context: Context;
}

export interface AskResult {
  /** Null when there is no grounded answer. A provider must never guess. */
  answer: Answer | null;
  /** The region the answer was written for. */
  context: Context;
  /** True when the provider switched region because of the question's wording. */
  contextDetected: boolean;
}

/**
 * The contract Ask UX depends on. The page only knows this interface, so a
 * provider backed by a model with retrieval over verified sources can replace
 * the local one without UI changes. In a regional context, a provider should
 * put that region's sources first and use global standards to supplement.
 */
export interface AskProvider {
  /** Shown under the answer so people know where it came from. */
  description: string;
  ask(question: string, options: AskOptions): Promise<AskResult>;
}
