import type { Source, SourceId } from "@/types";

export const sources: Source[] = [
  { id: "wcag", name: "W3C / WCAG", short: "WCAG", url: "https://www.w3.org/WAI/", color: "#0B4F9C", tint: "#E7F0FB", context: "global", organisation: "W3C", sourceType: "standard", requirementLevel: "requirement" },
  { id: "figma", name: "Figma", short: "Figma", url: "https://www.figma.com/release-notes/", color: "#6A28B8", tint: "#F2EAFC", context: "global", organisation: "Figma", sourceType: "tool-documentation", requirementLevel: "recommendation" },
  { id: "apple", name: "Apple Human Interface Guidelines", short: "Apple", url: "https://developer.apple.com/design/human-interface-guidelines/", color: "#3A3F4B", tint: "#ECEDF0", context: "global", organisation: "Apple", sourceType: "design-system", requirementLevel: "design-system-guidance" },
  { id: "material", name: "Material Design / Android", short: "Material", url: "https://m3.material.io/", color: "#17633F", tint: "#E4F3EA", context: "global", organisation: "Google", sourceType: "design-system", requirementLevel: "design-system-guidance" },
  { id: "govuk", name: "GOV.UK Design System", short: "GOV.UK", url: "https://design-system.service.gov.uk/", color: "#0A5E66", tint: "#E0F2F3", context: "global", organisation: "UK Government Digital Service", sourceType: "design-system", requirementLevel: "design-system-guidance" },
  { id: "sgds", name: "Singapore Government Design System", short: "SGDS", url: "https://www.designsystem.tech.gov.sg/", color: "#A3231C", tint: "#FBE9E7", context: "sg", organisation: "GovTech Singapore", sourceType: "design-system", requirementLevel: "design-system-guidance" },
  { id: "sgictss", name: "Singapore Government ICT&SS, Digital Service Standards", short: "SG Gov", url: "https://info.standards.tech.gov.sg/control-catalog/dss/", color: "#5A4A00", tint: "#F5F0D0", context: "sg", organisation: "Singapore Government", sourceType: "government-control", requirementLevel: "requirement" },
  { id: "nng", name: "Nielsen Norman Group", short: "NN/g", url: "https://www.nngroup.com/articles/", color: "#8E2456", tint: "#FAE8F0", context: "global", organisation: "Nielsen Norman Group", sourceType: "research", requirementLevel: "best-practice" },
  { id: "baymard", name: "Baymard Institute", short: "Baymard", url: "https://baymard.com/blog", color: "#8A4300", tint: "#FBEEDC", context: "global", organisation: "Baymard Institute", sourceType: "research", requirementLevel: "best-practice" },
  { id: "claude", name: "Claude (Anthropic)", short: "Claude", url: "https://support.claude.com/en/articles/12138966-release-notes", color: "#7A3B1D", tint: "#F8EAE1", context: "global", organisation: "Anthropic", sourceType: "tool-documentation", requirementLevel: "recommendation" },
  { id: "framer", name: "Framer", short: "Framer", url: "https://www.framer.com/updates", color: "#0B4FB3", tint: "#E6EEFB", context: "global", organisation: "Framer", sourceType: "tool-documentation", requirementLevel: "recommendation" },
  { id: "cursor", name: "Cursor", short: "Cursor", url: "https://cursor.com/changelog", color: "#30343B", tint: "#E9EAEC", context: "global", organisation: "Anysphere", sourceType: "tool-documentation", requirementLevel: "recommendation" },
  { id: "v0", name: "v0 (Vercel)", short: "v0", url: "https://v0.app/changelog", color: "#1F2328", tint: "#EDEEF0", context: "global", organisation: "Vercel", sourceType: "tool-documentation", requirementLevel: "recommendation" },
  { id: "openai", name: "OpenAI", short: "OpenAI", url: "https://openai.com/news/", color: "#0F5C4D", tint: "#E2F2EE", context: "global", organisation: "OpenAI", sourceType: "tool-documentation", requirementLevel: "recommendation" },
  { id: "uber", name: "Uber Base design system", short: "Uber Base", url: "https://base.uber.com/", color: "#1A1A1A", tint: "#EBEBEB", context: "global", organisation: "Uber", sourceType: "design-system", requirementLevel: "design-system-guidance" },
  { id: "atlassian", name: "Atlassian Design System", short: "Atlassian", url: "https://atlassian.design/", color: "#0747A6", tint: "#E6EFFC", context: "global", organisation: "Atlassian", sourceType: "design-system", requirementLevel: "design-system-guidance" },
  { id: "carbon", name: "Carbon Design System", short: "Carbon", url: "https://carbondesignsystem.com/", color: "#0043CE", tint: "#E5EDFF", context: "global", organisation: "IBM", sourceType: "design-system", requirementLevel: "design-system-guidance" },
  { id: "primer", name: "Primer", short: "Primer", url: "https://primer.style/", color: "#24292F", tint: "#EAEEF2", context: "global", organisation: "GitHub", sourceType: "design-system", requirementLevel: "design-system-guidance" },
  { id: "uswds", name: "U.S. Web Design System", short: "USWDS", url: "https://designsystem.digital.gov/", color: "#1A4480", tint: "#E1EBF7", context: "global", organisation: "U.S. General Services Administration", sourceType: "design-system", requirementLevel: "design-system-guidance" },
  { id: "fluent", name: "Fluent 2 Design System", short: "Fluent", url: "https://fluent2.microsoft.design/", color: "#0F548C", tint: "#E3F0FA", context: "global", organisation: "Microsoft", sourceType: "design-system", requirementLevel: "design-system-guidance" },
  { id: "grab", name: "Grab", short: "Grab", url: "https://engineering.grab.com/categories/design/", color: "#00632B", tint: "#E2F4E8", context: "global", organisation: "Grab", sourceType: "article", requirementLevel: "best-practice" },
  { id: "granola", name: "Granola", short: "Granola", url: "https://www.granola.ai/updates", color: "#4A5A1E", tint: "#EEF2DD", context: "global", organisation: "Granola", sourceType: "tool-documentation", requirementLevel: "recommendation" },
];

const byId = new Map(sources.map((s) => [s.id, s]));

export function getSource(id: SourceId): Source {
  return byId.get(id)!;
}
