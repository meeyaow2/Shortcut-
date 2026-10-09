import { getSource } from "@/data/sources";
import type { Citation, Context, ContextFilter, RequirementLevel, SourceType } from "@/types";

// Shortcut never presents all advice as equal. Every citation resolves to one
// of these labels, shown wherever sources are compared.

export interface Authority {
  label: string;
  /** One line on what kind of weight this carries. */
  meaning: string;
}

const standard: Authority = {
  label: "Standard requirement",
  meaning: "A testable criterion in a published standard. Whether it is legally required depends on your jurisdiction and contract.",
};
const governmentControl: Authority = {
  label: "Government control",
  meaning: "A control the issuing government expects its agencies and their partners to apply. It does not bind other organisations.",
};
const governmentRecommendation: Authority = {
  label: "Government recommendation",
  meaning: "The issuing government's suggested way to meet a control. Other ways may also meet it.",
};
const designSystem: Authority = {
  label: "Design-system convention",
  meaning: "How one design system does it. Binding only on teams that have adopted that system.",
};
const research: Authority = {
  label: "Research-based best practice",
  meaning: "Advice drawn from usability research. Persuasive, not mandatory.",
};
const tool: Authority = {
  label: "Tool documentation",
  meaning: "How a tool works, according to its maker.",
};
const guideline: Authority = {
  label: "Guideline",
  meaning: "Published advice without formal standing.",
};

export function getAuthority(sourceType: SourceType, level: RequirementLevel): Authority {
  if (sourceType === "standard") return standard;
  if (sourceType === "government-control") return level === "requirement" ? governmentControl : governmentRecommendation;
  if (sourceType === "design-system") return designSystem;
  if (sourceType === "research") return research;
  if (sourceType === "tool-documentation") return tool;
  return guideline;
}

export function citationAuthority(citation: Citation): Authority {
  const source = getSource(citation.sourceId);
  return getAuthority(source.sourceType, citation.requirementLevel ?? source.requirementLevel);
}

/** Shown under comparisons, in order of formal weight. */
export const authorityLegend: Authority[] = [
  standard,
  governmentControl,
  designSystem,
  research,
  // The two kinds Shortcut writes itself. They sit last because they carry the least formal weight.
  { label: "Industry convention", meaning: "A range many shipping products use. Written by Shortcut; no standard or organisation requires it." },
  { label: "Craft guidance", meaning: "Judgement of the kind given in design review. Written by Shortcut; reasonable designers may disagree." },
];

export const contextLabels: Record<ContextFilter, string> = {
  all: "All",
  global: "Global",
  sg: "Singapore",
};

/** Regions in display order. Adding a region means adding it here and in the Context type. */
export const contexts: Context[] = ["global", "sg"];

export function matchesContext(itemContext: Context | undefined, filter: ContextFilter): boolean {
  return filter === "all" || (itemContext ?? "global") === filter;
}
