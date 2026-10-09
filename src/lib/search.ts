import { agentChapters, confidentWrong, contextFiles, exampleAgents, trustCheck } from "@/data/agents";
import { answers } from "@/data/answers";
import { aiTools, aiWorkflows, lessons, toolComparisons } from "@/data/ai";
import { cheatSheets } from "@/data/cheat-sheets";
import { aiSignals, beforeYouSendIt, designChecks } from "@/data/checks";
import { explorerReferences, explorerSystems, explorerTopics } from "@/data/explorer";
import { gojekComponents, gojekNotFound } from "@/data/gojek";
import { androidGuidance, decisionHelpers, expressive, getMaterialComponent, materialBreakpoints, materialComponents } from "@/data/material";
import { figmaComparisons, figmaDecisions, figmaRecipes, figmaTools, getFigmaTool } from "@/data/figma";
import { guidance } from "@/data/guidance";
import { openResources, practiceGuides, practiceTemplates } from "@/data/practice";
import { prompts } from "@/data/prompts";
import { polishExamples, referenceCaseStudies, uxBreakdowns } from "@/data/references";
import { resources } from "@/data/resources";
import { getSource } from "@/data/sources";
import { caseStudies, getSystem, systems, uiConcepts } from "@/data/systems";
import { updates } from "@/data/updates";
import { resolveViewportValue } from "@/data/viewports";
import type { Context, ContextFilter } from "@/types";

export type HitType = "system" | "practice" | "figma" | "guidance" | "cheatsheet" | "check" | "workflow" | "prompt" | "tool" | "explorer" | "update" | "resource" | "answer";

export interface SearchHit {
  type: HitType;
  id: string;
  title: string;
  detail: string;
  href: string;
  external?: boolean;
  /** Region the item belongs to. */
  context: Context;
  /** Short source name, when the item has a single source. */
  source?: string;
  /** Control, Guideline, Component or Foundation, for guidance. */
  contentType?: string;
}

export const hitGroups: { type: HitType; label: string }[] = [
  { type: "system", label: "Design System Library" },
  { type: "practice", label: "UX Practice" },
  { type: "figma", label: "Figma Guide" },
  { type: "guidance", label: "Guidance" },
  { type: "cheatsheet", label: "Cheat sheets" },
  { type: "check", label: "Design checks" },
  { type: "workflow", label: "AI workflows" },
  { type: "prompt", label: "Prompts" },
  { type: "tool", label: "AI tools" },
  { type: "explorer", label: "Design systems" },
  { type: "update", label: "Updates" },
  { type: "answer", label: "Ask UX" },
  { type: "resource", label: "Resources" },
];

interface Doc extends SearchHit {
  titleText: string;
  bodyText: string;
  /** A word the query must contain for this item to appear at all. */
  requires?: string;
  /** Titles to use when the query names a viewport, keyed by that viewport. */
  viewportTitles?: Record<string, string>;
}

/** Lowercased words with a leading space, so a term can be matched at word starts only. */
function words(text: string): string {
  return ` ${text.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim()}`;
}

function doc(hit: SearchHit, body: string, requires?: string, viewportTitles?: Record<string, string>): Doc {
  return { ...hit, titleText: words(hit.title), bodyText: words(`${hit.detail} ${body}`), requires, viewportTitles };
}

const VIEWPORT_WORDS = ["mobile", "tablet", "laptop", "desktop"] as const;

// Words people use for a system or reference that its own text does not.
const systemKeywords: Record<string, string> = {
  grab: "ux ui southeast asia singapore regional superapp ride food low data network emerging markets localisation",
  granola: "ui ux polish changelog release notes craft details small improvements",
  gojek: "southeast asia sea indonesia regional superapp brand tone voice motion illustration typography maison neue design system sea design systems gojek typography gojek motion",
  material: "google m3 material 3 expressive android components",
  "uber-base": "uber",
};

// Words every Singapore item should be findable by, even when its own text does not use them.
const SG_WORDS = "singapore sg government gov";

// Words people use for a guide that its own text does not.
const guideKeywords: Record<string, string> = {
  "user-interview": "interviewing users questions ask",
  "usability-test": "user testing usability test questions tasks ask prepare sample size",
  workshop: "stop stakeholders taking over dominate remote in person facilitate facilitation agenda",
  discovery: "research plan stakeholder interviews problem framing",
  synthesis: "synthesise interview notes affinity mapping themes present presenting research findings insight report",
  "design-critique": "feedback review crit",
  "remote-workshop": "remote online virtual video call zoom breakout rooms time zones cameras fatigue hybrid async asynchronous miro figjam",
  recruiting: "recruit participants screener incentive find users sample",
  "note-taking": "notes note taker recording observation quotes",
  "journey-mapping": "journey map customer journey service blueprint experience map",
  prioritisation: "prioritise prioritize priority backlog roadmap impact effort rice moscow kano",
  "presenting-findings": "present share readout report research findings stakeholders",
  "research-repository": "repository researchops store insights library",
  retrospective: "retro retrospective team process improve",
  "ideation-workshop": "ideation brainstorm ideas how might we hmw sketching",
};

const seenRules = new Set<string>();

// Built once per session. With a backend this becomes a call to a search API
// that returns the same SearchHit shape.
const index: Doc[] = [
  ...guidance.map((g) => {
    const source = getSource(g.sourceId);
    return doc(
      {
        type: "guidance",
        id: g.id,
        title: g.controlId ? `${g.controlId} ${g.title}` : g.sourceId === "sgds" ? `SGDS ${g.title}` : g.title,
        detail: g.summary,
        href: `/singapore#${g.id}`,
        context: g.context,
        source: source.short,
        contentType: g.contentType,
      },
      `${g.officialText} ${g.officialRecommendation ?? ""} ${g.designerTakeaway} ${g.accessibilityNotes ?? ""} ${g.keywords ?? ""} ${g.contentType} ${g.requirementLevel} ${source.name} ${SG_WORDS}`,
    );
  }),
  ...cheatSheets.flatMap((sheet) => [
    doc(
      { type: "cheatsheet", id: sheet.slug, title: `${sheet.title} cheat sheet`, detail: sheet.description, href: `/cheat-sheets/${sheet.slug}`, context: "global" },
      sheet.sections.map((s) => s.title).join(" "),
    ),
    // Editorial entries, labelled as convention or craft so they are not mistaken for standards.
    ...sheet.sections.flatMap((section) =>
      (section.entries ?? [])
        .filter((entry) => !seenRules.has(entry.id) && seenRules.add(entry.id))
        .map((entry) =>
          doc(
            {
              type: "cheatsheet",
              id: `${sheet.slug}#${entry.id}`,
              title: entry.safeStartingPoint ? `${entry.title}: ${entry.safeStartingPoint}` : entry.title,
              detail: entry.summary,
              href: `/cheat-sheets/${sheet.slug}#${entry.id}`,
              context: "global",
              contentType: entry.kind === "industry-convention" ? "Industry convention" : "Craft guidance",
            },
            `${sheet.title} ${entry.viewportValues ? "mobile tablet laptop desktop large viewport responsive screen size " + Object.values(entry.viewportValues).join(" ") : ""} ${(entry.viewportApplicability ?? []).join(" ")} ${(entry.input ?? []).join(" ")} ${(entry.deviceReferences ?? []).map((d) => d.device + " " + d.guidance).join(" ")} ${(entry.whenToUse ?? []).join(" ")} ${entry.commonRange ?? ""} ${entry.why} ${entry.mentorNote ?? ""} ${(entry.commonMistakes ?? []).join(" ")} ${(entry.scale ?? []).map((s) => `${s.label} ${s.use}`).join(" ")} ${(entry.official ?? []).map((o) => `${o.text} ${o.citation.label}`).join(" ")}`,
            undefined,
            entry.viewportValues && Object.fromEntries(VIEWPORT_WORDS.flatMap((word) => { const value = resolveViewportValue(entry.viewportValues, word); return value ? [[word, entry.title + " on " + word + ": " + value.value]] : []; })),
          ),
        ),
    ),
    ...sheet.sections.flatMap((section) =>
      section.rules
        // Guidance records are indexed once, above. A rule shared by several
        // sheets is indexed for the first sheet only, so it appears once.
        .filter((rule) => !rule.guidanceId && !seenRules.has(rule.id) && seenRules.add(rule.id))
        .map((rule) =>
          doc(
            {
              type: "cheatsheet",
              id: `${sheet.slug}#${rule.id}`,
              title: rule.value ? `${rule.title}: ${rule.value}` : rule.title,
              detail: `${sheet.title}, ${section.title}`,
              href: `/cheat-sheets/${sheet.slug}#${rule.id}`,
              context: rule.context ?? "global",
            },
            `${rule.body} ${rule.citations.map((c) => c.label).join(" ")} ${rule.comparison?.rows.map((row) => row.label).join(" ") ?? ""}`,
          ),
        ),
    ),
  ]),
  ...designChecks.map((c) =>
    doc(
      { type: "check", id: c.id, title: c.title, detail: `${c.category}. ${c.failure}`, href: `/checks#${c.id}`, context: "global", contentType: "Craft guidance" },
      `${c.why} ${c.fix} ${c.deeper} check`,
    ),
  ),
  ...aiSignals.map((s) =>
    doc(
      { type: "check", id: s.id, title: `AI-look signal: ${s.label}`, detail: s.instead, href: `/checks/ai-look#${s.id}`, context: "global", contentType: "Craft guidance" },
      `${s.why} ${s.group} ai generated look ui design template generic`,
    ),
  ),
  doc(
    { type: "cheatsheet", id: "iphone-duo", title: "Designing for iPhone Duo", detail: "Apple gives the outer display a compact width layout and the inner display a regular width one. Physical pixels are not the CSS viewport.", href: "/cheat-sheets/foldables#iphone-duo", context: "global", contentType: "Craft guidance" },
    "apple hig foldable folding fold closed open outer inner display continuity hinge dual pane split view toolbar tab bar side vertical controls viewport resolution pixels",
  ),
  doc(
    { type: "cheatsheet", id: "component-viewports", title: "Same component, different viewports", detail: "How cards, buttons, inputs, modals, navigation, tables, tabs, drawers and search change from mobile to tablet to desktop.", href: "/cheat-sheets/responsive-design#components", context: "global", contentType: "Industry convention" },
    "responsive mobile tablet desktop search tabs card button input modal navigation table drawer viewport",
  ),
  doc(
    { type: "cheatsheet", id: "test-matrix", title: "Responsive test matrix", detail: "320, 375, 390, 430, 768, 820, 1024, 1280, 1440 and 1920 px, foldable closed and open, and the widths between.", href: "/cheat-sheets/responsive-design#test-matrix", context: "global", contentType: "Craft guidance" },
    "responsive widths test testing breakpoints qa viewport foldable",
  ),
  doc(
    { type: "check", id: "ai-look", title: "Why does my UI look AI-generated?", detail: "Patterns that make an interface read as generated, and what to try instead.", href: "/checks/ai-look", context: "global", contentType: "Craft guidance" },
    "ai look generated generic template design dashboard screen signals",
  ),
  doc(
    { type: "check", id: "before-you-send-it", title: "Before You Send It checklist", detail: "A final design QA before your design lead sees it.", href: "/checks/before-you-send-it", context: "global", contentType: "Craft guidance" },
    `handoff qa review ${beforeYouSendIt.map((section) => `${section.title} ${section.items.map((i) => i.label).join(" ")}`).join(" ")}`,
  ),
  ...systems
    .filter((sys) => sys.status !== "planned")
    .map((sys) =>
      doc(
        { type: "system", id: sys.id, title: sys.name.includes(sys.organisation) || sys.organisation.length > 20 ? sys.name : sys.organisation + " " + sys.name, detail: sys.summary, href: sys.status === "profiled" ? "/systems/" + sys.id : "/systems#" + sys.id, context: sys.id === "sgds" ? "sg" : "global", source: sys.organisation, contentType: sys.type === "Public design system" ? "System" : "Reference" },
        [sys.usedFor, (sys.explore ?? []).map((x) => x.area + " " + x.items).join(" "), (sys.interesting ?? []).join(" "), (sys.learn ?? []).join(" "), (sys.sections ?? []).map((x) => x.title + " " + x.body + " " + (x.points ?? []).join(" ")).join(" "), "design system library handle", systemKeywords[sys.id] ?? ""].join(" "),
      ),
    ),
  ...[...caseStudies, ...referenceCaseStudies].map((c) =>
    doc(
      { type: "system", id: c.id, title: c.title, detail: c.facts[0], href: "/systems/" + c.systemId + "#" + c.id, context: "global", source: getSystem(c.systemId)?.organisation, contentType: "Case study" },
      [c.facts.join(" "), c.lesson, "ai design system case study agent handle"].join(" "),
    ),
  ),
  ...Object.entries(uxBreakdowns).flatMap(([systemId, list]) =>
    list.map((b) =>
      doc(
        { type: "system", id: b.id, title: `${getSystem(systemId)?.organisation}: ${b.title.charAt(0).toLowerCase()}${b.title.slice(1)}`, detail: b.principle, href: `/systems/${systemId}#${b.id}`, context: "global", source: getSystem(systemId)?.organisation, contentType: "UX breakdown" },
        `${b.problem} ${b.change} ${b.stated} ${b.context} ux ui breakdown product design ${systemKeywords[systemId] ?? ""}`,
      ),
    ),
  ),
  ...Object.entries(polishExamples).map(([systemId, list]) =>
    doc(
      { type: "system", id: `${systemId}-polish`, title: `${getSystem(systemId)?.organisation}: small changes from its changelog`, detail: "Design polish is often hundreds of small decisions.", href: `/systems/${systemId}#polish`, context: "global", source: getSystem(systemId)?.organisation, contentType: "Reference" },
      `${list.map((p) => `${p.what} ${p.lesson}`).join(" ")} ${systemKeywords[systemId] ?? ""}`,
    ),
  ),
  ...materialComponents.map((c) =>
    doc(
      { type: "system", id: "material-" + c.id, title: "Material " + c.name.toLowerCase(), detail: c.summary, href: "/systems/material/components#" + c.id, context: "global", source: "Google", contentType: "Component" },
      [c.group, c.variants ?? "", c.points.join(" "), c.status ?? "", c.watch, "material google m3 design system component handle"].join(" "),
      "material",
    ),
  ),
  ...decisionHelpers.map((h) =>
    doc(
      { type: "system", id: "material-choose-" + h.id, title: h.need + ": which Material component?", detail: h.tradeOff, href: "/systems/material/components#" + h.id, context: "global", source: "Google", contentType: "Decision" },
      h.options.map((o) => (getMaterialComponent(o.componentId)?.name ?? "") + " " + o.when).join(" ") + " which component should i use choose material google",
    ),
  ),
  doc(
    { type: "system", id: "material-expressive", title: "Material 3 Expressive: what changed", detail: expressive.whatItIs, href: "/systems/material#expressive", context: "global", source: "Google", contentType: "System" },
    expressive.changes.map((x) => x.area + " " + x.text).join(" ") + " " + expressive.replaced.map((x) => x.old + " " + x.now).join(" ") + " material google m3 expressive update new springs motion",
  ),
  doc(
    { type: "system", id: "material-breakpoints", title: "Material breakpoints and large screens", detail: materialBreakpoints.points[0], href: "/systems/material#breakpoints", context: "global", source: "Google", contentType: "System" },
    materialBreakpoints.points.join(" ") + " " + materialBreakpoints.why + " material google window size classes responsive tablet large screens panes",
  ),
  doc(
    { type: "system", id: "material-android", title: "Google's Android guidance: window sizes and foldables", detail: "Platform guidance for Android apps, kept apart from Material.", href: "/systems/material#android", context: "global", source: "Google", contentType: "Platform guidance" },
    androidGuidance.map((x) => x.topic + " " + x.text).join(" ") + " google android foldable foldables guidance fold posture tabletop window size classes touch targets platform",
  ),
  doc(
    { type: "system", id: "material-tokens", title: "Material tokens and Figma kit", detail: "Not yet read on Material's own site. Shortcut gives no values, and points to what it has read.", href: "/systems/material#tokens", context: "global", source: "Google", contentType: "System" },
    "material tokens design tokens colour color typography shape elevation figma design kit google m3 foundations",
  ),
  doc(
    { type: "system", id: "google-ai-patterns", title: "Google AI interface patterns: sources in Gemini", detail: "A product pattern, not design-system guidance: how Gemini's help pages say sources are shown.", href: "/systems/material#google-ai", context: "global", source: "Google", contentType: "Product pattern" },
    "google gemini ai interface patterns sources citations side panel ai design systems product pattern trust",
  ),
  doc(
    { type: "system", id: "gojek-inventory", title: "Gojek design system: component names", detail: "Gojek lists " + gojekComponents.length + " component names and publishes no usage guidance for them.", href: "/systems/gojek#inventory", context: "global", source: "Gojek", contentType: "Reference" },
    gojekComponents.join(" ") + " gojek design system components inventory asphalt",
    "gojek",
  ),
  doc(
    { type: "system", id: "gojek-not-found", title: "Gojek: no public guidance found", detail: "What Shortcut looked for on gojek.design and did not find, including colour values, spacing and accessibility.", href: "/systems/gojek#not-found", context: "global", source: "Gojek", contentType: "Reference" },
    gojekNotFound.map((x) => x.topic + " " + x.note).join(" ") + " gojek colours colors spacing accessibility responsive brandmark photography iconography",
    "gojek",
  ),
  doc(
    { type: "system", id: "sea-references", title: "Southeast Asian design references", detail: "SGDS, Grab and Gojek: a design system, a product design reference and a brand reference. Three examples, not a survey.", href: "/systems/gojek#sea", context: "global", contentType: "Reference" },
    "sea southeast asia asian design systems singapore indonesia grab gojek sgds regional",
  ),
  doc(
    { type: "system", id: "material-vs-gojek", title: "Material and Gojek: different kinds of reference", detail: "Material is a documented design system. Gojek's site is a brand showcase. Shortcut can compare them on motion only.", href: "/explorer/motion", context: "global", contentType: "Comparison" },
    "material vs versus gojek compare google difference motion",
    "gojek",
  ),
  // Base's component pages are behind a staff login. Say so instead of returning nothing.
  doc(
    { type: "system", id: "uber-base-components", title: "Uber Base: how it handles a given component", detail: "Base's component pages need an Uber staff login, so Shortcut cannot say. The comparison shows how the systems it has read handle each one.", href: "/systems/uber-base", context: "global", source: "Uber", contentType: "System" },
    "button modal dialog table tabs input select checkbox radio accordion navigation alert spacing colour typography tokens components",
    "uber",
  ),
  doc(
    { type: "system", id: "generative-ui", title: "Generative UI", detail: "Designing interfaces that are composed dynamically around user intent.", href: "/ai/generative-ui", context: "global", contentType: "Topic" },
    uiConcepts.map((c) => c.name + " " + c.meaning).join(" ") + " intelligent ui gpt-6 openai generated interfaces future of ui agentic adaptive conversational",
  ),
  ...practiceGuides.map((g) =>
    doc(
      { type: "practice", id: g.id, title: g.title, detail: g.overview, href: "/practice/" + g.id, context: "global", contentType: "Guide" },
      [g.action, g.prepare.join(" "), g.steps.map((s) => s.title + " " + s.detail).join(" "), g.dos.join(" "), g.donts.join(" "), g.mistakes.join(" "), g.after.join(" "), (g.extras ?? []).map((x) => x.title + " " + x.items.join(" ")).join(" "), (g.script ?? []).join(" "), (g.examples?.pairs ?? []).map((p) => p.better).join(" "), g.mentorNote, guideKeywords[g.id] ?? "", "how do i guide ux research prepare"].join(" "),
    ),
  ),
  ...practiceGuides.map((g) =>
    doc(
      { type: "practice", id: g.id + "-checklist", title: "Checklist: " + g.action.toLowerCase(), detail: g.checklist.slice(0, 3).join(". ") + ".", href: "/practice/" + g.id + "#checklist", context: "global", contentType: "Checklist" },
      g.checklist.join(" ") + " prepare before checklist " + g.title,
    ),
  ),
  doc(
    { type: "practice", id: "how-many-users", title: "How many users do I need to test with?", detail: "Often around five per user group for a qualitative round, in several small rounds.", href: "/practice/usability-test", context: "global", contentType: "Guide" },
    "how many users participants sample size five need",
  ),
  ...practiceTemplates.map((t) =>
    doc(
      { type: "practice", id: "template-" + t.id, title: t.title + " template", detail: t.purpose, href: "/practice/templates#" + t.id, context: "global", contentType: "Template" },
      [t.howToUse, t.blank, "template write"].join(" "),
    ),
  ),
  ...openResources.map((r) =>
    doc(
      { type: "practice", id: "open-" + r.id, title: r.name, detail: r.what, href: "/practice/library#" + r.id, context: r.id === "sgds" ? "sg" : "global", contentType: "Reference" },
      [r.category, r.useFor, r.licence ?? "", r.access, "open source free library resource"].join(" "),
    ),
  ),
  ...figmaTools.map((t) =>
    doc(
      { type: "figma", id: t.id, title: t.name, detail: t.tagline, href: "/figma/" + t.id, context: "global", source: "Figma", contentType: "Tool" },
      ["what is", t.what, t.keyFeatures.join(" "), t.bestFor.join(" "), t.whenToUse, "figma should use"].join(" "),
    ),
  ),
  ...figmaComparisons.map((c) =>
    doc(
      { type: "figma", id: c.id, title: c.title, detail: c.difference, href: "/figma#" + c.id, context: "global", source: "Figma", contentType: "Comparison" },
      [c.whenEach.join(" "), c.both, c.mistake, "figma difference versus compare"].join(" "),
    ),
  ),
  ...figmaDecisions.map((d) =>
    doc(
      { type: "figma", id: "decision-" + d.id, title: "In Figma: " + d.goal.toLowerCase(), detail: "Open " + (getFigmaTool(d.toolId)?.name ?? "") + ". " + d.why, href: "/figma#what-should-i-use", context: "global", source: "Figma", contentType: "Decision" },
      "what should i use figma which tool open " + d.toolId,
    ),
  ),
  ...figmaRecipes.map((r) =>
    doc(
      { type: "figma", id: "recipe-" + r.id, title: "Figma workflow: " + r.title.toLowerCase(), detail: r.steps.map((s) => s.tool).join(", then "), href: "/figma#recipe-" + r.id, context: "global", source: "Figma", contentType: "Workflow" },
      r.steps.map((s) => s.action).join(" ") + " figma workflow recipe",
    ),
  ),
  doc(
    { type: "figma", id: "figma-updates", title: "What did Figma release recently?", detail: "Recent Figma release notes, with why each matters to designers.", href: "/figma#whats-new", context: "global", source: "Figma", contentType: "Update" },
    "figma release recently new latest updates",
  ),
  doc(
    { type: "figma", id: "figma-handover", title: "Before you hand your Figma file over", detail: "A file-hygiene checklist: structure, components, values and behaviour.", href: "/figma#handover", context: "global", source: "Figma", contentType: "Checklist" },
    "figma file hygiene organise components naming pages detached instances handoff",
  ),
  ...aiWorkflows.map((w) =>
    doc(
      { type: "workflow", id: w.id, title: "AI for " + w.stage.toLowerCase(), detail: w.useWhen, href: "/ai/workflow#" + w.id, context: "global", contentType: "Craft guidance" },
      [w.goodUse, w.weakUse, w.commonFailure, w.inputNeeded.join(" "), w.designerOwns.join(" "), "ai workflow ux"].join(" "),
    ),
  ),
  ...agentChapters.map((c) =>
    doc(
      { type: "workflow", id: "agents-" + c.id, title: "Designing with Agents: " + c.title, detail: c.summary, href: "/ai/agents/" + c.id, context: "global", contentType: "Learning module" },
      [c.subtitle, c.thirty.join(" "), (c.goodUse ?? []).join(" "), (c.weakUse ?? []).join(" "), (c.give ?? []).join(" "), (c.verify ?? []).join(" "), c.failure ?? "", c.sections.map((s) => s.title + " " + (s.items ?? []).join(" ") + " " + (s.rows ?? []).map((r) => r.label + " " + r.text).join(" ")).join(" "), "agent agents agentic ai design workflow", c.id === "trust" ? "trust ai output hallucination verify confident wrong fake citation " + trustCheck.join(" ") + " " + confidentWrong.map((x) => x.claim).join(" ") : "", c.id === "prologue" ? "context files " + contextFiles.map((f) => f.name).join(" ") : "", c.id === "building-agents" ? "agent template build " + exampleAgents.map((a) => a.name).join(" ") : "", c.id === "design-systems" ? "ai design systems tokens machine readable" : ""].join(" "),
    ),
  ),
  ...lessons.map((l) =>
    doc(
      { type: "workflow", id: l.id, title: "Lesson: " + l.title, detail: l.takeaway, href: "/ai/learn#" + l.id, context: "global", contentType: "Craft guidance" },
      l.points.join(" ") + " ai learn",
    ),
  ),
  ...prompts.map((p) =>
    doc(
      { type: "prompt", id: p.id, title: "Prompt: " + p.title, detail: p.whenToUse, href: "/ai/prompts#" + p.id, context: p.category === "Singapore" ? "sg" : "global", contentType: p.category },
      [p.category, p.whyItWorks, p.expectedOutput, p.prompt, "ai prompt", p.id === "design-review" ? "claude chatgpt design review critique" : ""].join(" "),
    ),
  ),
  ...aiTools.map((t) =>
    doc(
      { type: "tool", id: t.id, title: t.name, detail: t.description, href: "/ai/tools#" + t.id, context: "global", source: t.vendor, contentType: t.jobs[0] },
      [t.jobs.join(" "), t.goodFor.join(" "), t.workflowExample, t.vendor, "ai tool"].join(" "),
    ),
  ),
  ...toolComparisons.map((c) =>
    doc(
      { type: "tool", id: c.id, title: "Which AI tool: " + c.task.replace(/^I want /, "").replace(/^to /, ""), detail: c.intro, href: "/ai/tools#" + c.id, context: "global", contentType: "Comparison" },
      c.options.map((o) => o.toolId + " " + o.useWhen).join(" ") + " best ai tool compare",
    ),
  ),
  ...explorerTopics
    .filter((topic) => topic.status === "verified")
    .flatMap((topic) => [
      doc(
        { type: "explorer", id: topic.id, title: `${topic.title} across design systems`, detail: topic.summary ?? "", href: `/explorer/${topic.id}`, context: "global", contentType: topic.kind },
        `${topic.takeaway ?? ""} ${(topic.themes ?? []).join(" ")} ${(topic.differences ?? []).join(" ")} compare design system ${explorerSystems.map((id) => getSource(id).short).join(" ")}`,
      ),
      // Each other system's column appears only when the query names that system: "Carbon modal".
      ...[...explorerSystems, ...explorerReferences]
        .filter((id) => id !== "sgds" && topic.cells?.[id])
        .map((id) => {
          const cell = topic.cells![id]!;
          const short = getSource(id).short;
          return doc(
            { type: "explorer", id: `${topic.id}:${id}`, title: `${short} ${topic.title.toLowerCase()}, compared`, detail: cell.none ? cell.points[0] : cell.headline, href: `/explorer/${topic.id}`, context: "global", source: short, contentType: topic.kind },
            `${cell.points.join(" ")} ${(topic.themes ?? []).join(" ")} ${(topic.differences ?? []).join(" ")} design system handle compare ${id}`,
            words(short).trim().split(" ")[0],
          );
        }),
      // The Singapore system's column is also findable on its own: "SGDS button".
      doc(
        {
          type: "explorer",
          id: `${topic.id}:sgds`,
          title: `SGDS ${topic.title}, compared`,
          detail: topic.cells?.sgds?.headline ?? "",
          href: `/explorer/${topic.id}`,
          context: "sg",
          source: "SGDS",
          contentType: topic.kind,
        },
        `${topic.cells?.sgds?.points.join(" ") ?? ""} ${SG_WORDS}`,
      ),
    ]),
  ...updates.map((u) => {
    const source = getSource(u.sourceId);
    return doc(
      { type: "update", id: u.id, title: u.title, detail: `${source.short}, ${u.category}`, href: `/updates#${u.id}`, context: source.context, source: source.short },
      `${u.summary} ${u.whyItMatters} ${u.designerAction} ${source.name} ${source.context === "sg" ? SG_WORDS : ""}`,
    );
  }),
  ...answers.map((a) =>
    doc(
      { type: "answer", id: a.id, title: a.question, detail: a.shortAnswer, href: `/ask?q=${encodeURIComponent(a.question)}`, context: a.context ?? "global" },
      `${a.explanation} ${a.triggers.join(" ")} ${a.context === "sg" ? SG_WORDS : ""}`,
    ),
  ),
  ...resources.map((r) =>
    doc(
      { type: "resource", id: r.id, title: r.name, detail: r.description, href: r.url, external: true, context: r.context ?? "global" },
      `${r.category} ${(r.tags ?? []).join(" ")} ${r.context === "sg" ? SG_WORDS : ""}`,
    ),
  ),
];

export type SearchResults = Record<HitType, SearchHit[]>;

function emptyResults(): SearchResults {
  return { system: [], practice: [], figma: [], guidance: [], cheatsheet: [], check: [], workflow: [], prompt: [], tool: [], explorer: [], update: [], answer: [], resource: [] };
}

// Dropped from queries so a question-shaped search still matches.
const STOP_WORDS = new Set(["a", "an", "the", "for", "in", "on", "of", "to", "my", "i", "is", "are", "what", "how", "do", "should", "and", "with", "does", "this", "that", "it", "be", "can", "am", "use", "much", "need", "before", "me", "we", "our", "when", "over", "up", "best", "example", "examples", "handle", "handles", "tall", "wide", "normal", "device", "devices", "there", "moving", "from", "change", "across"]);

// Everyday words mapped to the words the sources use.
const SYNONYMS: Record<string, string> = {
  required: "mandatory",
  multilingual: "language",
  website: "web",
  a11y: "accessibility",
  token: "token",
  vs: "versus",
  synthesise: "synthesis",
  synthesize: "synthesis",
  facilitate: "facilitat",
  facilitation: "facilitat",
  interviewing: "interview",
  testing: "test",
  findings: "finding",
  users: "user",

  prototyping: "prototype",
  prototypes: "prototype",
};

/** "requirements" -> "requirement", so plurals match singular source text. */
function stem(term: string): string {
  const mapped = SYNONYMS[term] ?? term;
  return mapped.length > 4 && mapped.endsWith("s") ? mapped.slice(0, -1) : mapped;
}

/**
 * Every meaningful word in the query must start a word in the item; title
 * matches rank first. `context` narrows results to one region.
 */
export function search(query: string, limitPerGroup = 6, context: ContextFilter = "all"): SearchResults {
  const results = emptyResults();
  // "table" should find "tables" but not "adjustable".
  const terms = words(query)
    .split(" ")
    .filter((term) => term && !STOP_WORDS.has(term))
    .map((term) => ` ${stem(term)}`);
  if (terms.length === 0) return results;

  const scored: { doc: Doc; score: number }[] = [];
  for (const d of index) {
    if (context !== "all" && d.context !== context) continue;
    if (d.requires && !terms.includes(" " + stem(d.requires))) continue;
    let score = 0;
    for (const term of terms) {
      if (d.titleText.includes(term)) score += 3;
      else if (d.bodyText.includes(term)) score += 1;
      else {
        score = 0;
        break;
      }
    }
    if (score > 0) scored.push({ doc: d, score });
  }

  scored.sort((a, b) => b.score - a.score);
  for (const { doc: d } of scored) {
    if (results[d.type].length < limitPerGroup) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { titleText, bodyText, requires, viewportTitles, ...hit } = d;
      // "mobile card padding" should show the mobile value, not the general one.
      const named = VIEWPORT_WORDS.find((word) => terms.includes(" " + word));
      results[d.type].push(named && viewportTitles?.[named] ? { ...hit, title: viewportTitles[named] } : hit);
    }
  }
  return results;
}

/** The same results, split by region, for showing Global and Singapore side by side. */
export function splitByContext(results: SearchResults): Record<Context, SearchResults> {
  const split: Record<Context, SearchResults> = { global: emptyResults(), sg: emptyResults() };
  for (const type of Object.keys(results) as HitType[]) {
    for (const hit of results[type]) split[hit.context][type].push(hit);
  }
  return split;
}

export function countHits(results: SearchResults): number {
  return Object.values(results).reduce((total, hits) => total + hits.length, 0);
}
