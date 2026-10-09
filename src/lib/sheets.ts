import type { CheatSheet, SourceId } from "@/types";

/** Counts and freshness derived from a sheet's sourced rules and editorial entries. */
export function sheetStats(sheet: CheatSheet) {
  const rules = sheet.sections.flatMap((s) => s.rules);
  const entries = sheet.sections.flatMap((s) => s.entries ?? []);
  const citations = [...rules.flatMap((r) => r.citations), ...entries.flatMap((entry) => (entry.official ?? []).map((o) => o.citation))];
  const sourceIds = [...new Set(citations.map((c) => c.sourceId))] as SourceId[];
  // A sheet is only as fresh as its least recently checked citation.
  const verified = citations.map((c) => c.dateVerified);
  const dateVerified = verified.includes(null) ? null : ((verified as string[]).sort()[0] ?? null);
  return { ruleCount: rules.length + entries.length, sourceIds, dateVerified, editorial: entries.length > 0 };
}
