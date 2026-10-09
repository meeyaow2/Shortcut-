// Shared content types. Everything the UI renders comes from src/data in these
// shapes, so a backend, RSS ingest or CMS can replace the files without
// touching components.

export type SourceId =
  | "wcag"
  | "figma"
  | "apple"
  | "material"
  | "govuk"
  | "sgds"
  | "sgictss"
  | "nng"
  | "baymard"
  | "claude"
  | "framer"
  | "cursor"
  | "v0"
  | "openai"
  | "uber"
  | "atlassian"
  | "carbon"
  | "primer"
  | "uswds"
  | "grab"
  | "granola";

export interface Source {
  id: SourceId;
  name: string;
  /** Short label used in badges and filters. */
  short: string;
  url: string;
  /** Badge colours: text and tint. Both pass 4.5:1 against each other. */
  color: string;
  tint: string;
  context: Context;
  organisation: string;
  sourceType: SourceType;
  /** The authority its guidance carries unless a citation says otherwise. */
  requirementLevel: RequirementLevel;
}

/**
 * A pointer to the original guidance.
 * `dateVerified` is the day Shortcut last checked the claim against the live
 * page. `null` means nobody has checked it yet and the UI must say so.
 */
export interface Citation {
  sourceId: SourceId;
  label: string;
  url: string;
  datePublished?: string;
  dateVerified: string | null;
  /** Overrides the source default, e.g. a recommendation inside a control. */
  requirementLevel?: RequirementLevel;
}

export type UpdateCategory =
  | "Accessibility"
  | "UI"
  | "UX"
  | "Research"
  | "Design Systems"
  | "Tools"
  | "AI"
  | "Product Design";

export type UpdateKind = "new" | "updated" | "guideline" | "tool" | "research";

export interface Update {
  id: string;
  title: string;
  sourceId: SourceId;
  category: UpdateCategory;
  kind: UpdateKind;
  datePublished: string;
  dateVerified: string | null;
  /** What changed. Taken from the source. */
  summary: string;
  /** Shortcut's reading, not the source's words. */
  whyItMatters: string;
  /** Shortcut's reading, not the source's words. */
  designerAction: string;
  sourceUrl: string;
  /** Present when the update is about an AI capability. */
  ai?: AiUpdateDetail;
  /** Open questions the change raises for designers. Shortcut editorial. */
  questions?: string[];
  /** Where to go next inside Shortcut. */
  links?: { label: string; href: string }[];
}

export interface ComparisonRow {
  sourceId: SourceId;
  label: string;
  value: string;
  unit?: string;
  qualifier: string;
  /** Side length in platform units, when the value can be drawn to scale. */
  size?: number;
  citation: Citation;
}

export interface Comparison {
  caption: string;
  note?: string;
  rows: ComparisonRow[];
  /** Shortcut's synthesis of what to do, given the differences. */
  takeaway?: string;
}

export interface Rule {
  id: string;
  title: string;
  /** The number or phrase a designer came for, e.g. "4.5:1". */
  value?: string;
  body: string;
  citations: Citation[];
  comparison?: Comparison;
  /** Set when the rule is region-specific. Absent means global. */
  context?: Context;
  /** Set when the rule is a view of a Guidance record. */
  guidanceId?: string;
}

export interface CheatSheetSection {
  id: string;
  title: string;
  rules: Rule[];
  /** Editorial entries, shown before the sourced rules. */
  entries?: CraftEntry[];
}

export interface CheatSheet {
  slug: string;
  title: string;
  description: string;
  dateUpdated: string;
  sections: CheatSheetSection[];
  group?: SheetGroup;
  component?: ComponentQA;
}

export interface ResourceIntent {
  id: string;
  /** Completes the sentence "I need ...". */
  need: string;
}

export interface Resource {
  id: string;
  name: string;
  description: string;
  intentId: string;
  category: string;
  url: string;
  context?: Context;
}

export interface Answer {
  id: string;
  question: string;
  /** Word stems used by the local provider to match a typed question. */
  triggers: string[];
  shortAnswer: string;
  explanation: string;
  checklist: string[];
  citations: Citation[];
  relatedSheet?: string;
  /** Region the answer is written for. Absent means global. */
  context?: Context;
  /** Source-by-source breakdown, used when an answer combines authorities. */
  sections?: AnswerSection[];
  /** Present on design-director answers, which are editorial. */
  director?: DirectorAnswer;
}

// ---------------------------------------------------------------------------
// Regional context and authority
// ---------------------------------------------------------------------------

/** Where guidance applies. Add a value here to support another region. */
export type Context = "global" | "sg";
export type ContextFilter = "all" | Context;

export type SourceType =
  | "standard"
  | "government-control"
  | "design-system"
  | "guideline"
  | "research"
  | "tool-documentation"
  | "article";

export type RequirementLevel = "requirement" | "recommendation" | "best-practice" | "design-system-guidance";

export type ContentType = "Control" | "Guideline" | "Component" | "Foundation";

/**
 * One piece of guidance from one source. This is the atomic record: cheat
 * sheets, comparisons, the Singapore page, search and Ask UX all reference
 * these, so a correction lands everywhere.
 */
export interface Guidance {
  id: string;
  title: string;
  context: Context;
  jurisdiction: string;
  organisation: string;
  sourceId: SourceId;
  sourceType: SourceType;
  contentType: ContentType;
  /** Official identifier, e.g. "BD-7". */
  controlId?: string;
  /** Topic id on the regional landing page. */
  category: string;
  requirementLevel: RequirementLevel;
  /** The source's own wording. Never edited. */
  officialText: string;
  /** The source's own recommendations, when it gives them separately. */
  officialRecommendation?: string;
  /** Who the source says this applies to. */
  appliesTo?: string;
  /** Cases the source excludes. */
  exceptions?: string;
  /** Plain-language explanation. Shortcut's words. */
  summary: string;
  /** What to do about it. Shortcut's words. */
  designerTakeaway: string;
  /** The source's stated reason. */
  rationale?: string;
  /** Shortcut's note, with the standards it leans on in `related`. */
  accessibilityNotes?: string;
  example?: string;
  related?: Citation[];
  /** Extra words people search with that the text does not contain. */
  keywords?: string;
  datePublished?: string;
  dateUpdated?: string;
  dateVerified: string | null;
  sourceUrl: string;
}

export interface AnswerSection {
  /** Which source this part of the answer comes from. */
  citation: Citation;
  points: string[];
}

export interface ExplorerCell {
  headline: string;
  points: string[];
  citation: Citation;
  /** True when the system publishes nothing on the topic; the absence is the finding. */
  none?: boolean;
}

export interface ExplorerTopic {
  id: string;
  title: string;
  kind: "Foundation" | "Component";
  status: "verified" | "planned";
  summary?: string;
  cells?: Partial<Record<SourceId, ExplorerCell>>;
  /** Shortcut's synthesis across systems. */
  takeaway?: string;
  /** What the systems read agree on, and where they part. Shortcut's reading of the cells. */
  themes?: string[];
  differences?: string[];
}

// ---------------------------------------------------------------------------
// Editorial guidance: conventions and craft
// ---------------------------------------------------------------------------

/**
 * Guidance with no organisation behind it. It is written by Shortcut and is
 * always labelled as such, so it can never be mistaken for a standard.
 * - industry-convention: ranges many shipping products use.
 * - craft-guidance: judgement of the kind given in design review.
 */
export type EditorialKind = "industry-convention" | "craft-guidance";

/** What an official source says on the same subject, kept apart from the editorial text. */
export interface OfficialNote {
  text: string;
  citation: Citation;
}

export interface ScaleStep {
  value: string;
  label: string;
  use: string;
}

export interface CraftEntry {
  id: string;
  title: string;
  kind: EditorialKind;
  safeStartingPoint?: string;
  commonRange?: string;
  summary: string;
  why: string;
  whenToUse?: string[];
  whenNotToUse?: string[];
  whenToDeviate?: string;
  commonMistakes?: string[];
  /** One short review-style remark. Used sparingly. */
  mentorNote?: string;
  scale?: ScaleStep[];
  official?: OfficialNote[];
  /** Set when overuse is a common mark of generated UI. */
  aiWarning?: string;
  /** Present when the entry belongs on the Safe Starting Points table. */
  starter?: { label: string; context: string };
  dateReviewed: string;
}

/** The QA block on a component cheat sheet. */
export interface ComponentQA {
  anatomy: string[];
  states: string[];
  edgeCases: string[];
  checklist: string[];
}

export type SheetGroup = "Foundations" | "Components" | "Patterns and standards" | "Figma";

export interface DesignCheck {
  id: string;
  category: string;
  /** What to check, phrased as a question to ask of your own screen. */
  title: string;
  why: string;
  failure: string;
  fix: string;
  deeper: string;
  kind: EditorialKind;
  /** Official sources that also bear on this check. */
  citations?: Citation[];
  /** Cheat sheet to read next. */
  sheet?: string;
}

export interface ChecklistSection {
  id: string;
  title: string;
  items: { id: string; label: string }[];
  /** Design Checks category with the detail behind this section. */
  checkCategory?: string;
}

export interface AiSignal {
  id: string;
  group: string;
  /** What it looks like. */
  label: string;
  /** Why AI often does this. */
  why: string;
  /** Why it can be a problem. */
  problem: string;
  /** How a designer can improve it. */
  instead: string;
}

/** The practical, review-style part of an answer. */
export interface DirectorAnswer {
  commonPractice: string;
  whenToBreak: string;
  /** Cheat sheet entry or check to read next, as a path. */
  readNext?: { label: string; href: string };
}

// ---------------------------------------------------------------------------
// AI + Design
// ---------------------------------------------------------------------------

/** Extra fields on an update about an AI capability. */
export interface AiUpdateDetail {
  updateType: string;
  useFor: string[];
  carefulWith: string[];
  /** A short workflow to try. Shortcut editorial. */
  workflow: string;
}

/** One stage of the design process, and how AI fits into it. Shortcut editorial. */
export interface AiWorkflow {
  id: string;
  stage: string;
  useWhen: string;
  goodUse: string;
  weakUse: string;
  inputNeeded: string[];
  /** Id of the prompt in the library that fits this stage. */
  promptId: string;
  reviewAfter: string[];
  designerOwns: string[];
  commonFailure: string;
  /** A hard limit worth stating outright, e.g. on accessibility. */
  warning?: string;
}

export interface Prompt {
  id: string;
  title: string;
  category: string;
  prompt: string;
  whyItWorks: string;
  whenToUse: string;
  inputsNeeded: string[];
  expectedOutput: string;
  verify: string[];
}

export interface AiTool {
  id: string;
  name: string;
  vendor: string;
  /** Jobs the tool is listed under. */
  jobs: string[];
  /** What it does, restating the vendor's own description. */
  description: string;
  /** Shortcut editorial, inferred from the description. */
  goodFor: string[];
  lessSuitableFor: string[];
  workflowExample: string;
  difficulty: "Low" | "Medium" | "High";
  platform: string;
  /** Null until checked against the vendor's pricing page. */
  pricing: string | null;
  dateVerified: string;
  officialUrl: string;
  /** The page the description was checked against. */
  sourceLabel: string;
  sourceUrl: string;
}

export interface ToolComparison {
  id: string;
  task: string;
  intro: string;
  options: { toolId: string; useWhen: string }[];
}

export interface Lesson {
  id: string;
  title: string;
  takeaway: string;
  points: string[];
  links: { label: string; href: string }[];
}
