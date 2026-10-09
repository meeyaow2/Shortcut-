import type { Update } from "@/types";
import { aiDetails, aiUpdates, figmaOnlyUpdates } from "./ai";
import { VERIFIED } from "./citations";
import { systemUpdates } from "./systems";

/**
 * Titles, dates and "summary" come from each source's own changelog or article
 * listing, checked on VERIFIED. "whyItMatters" and "designerAction" are
 * Shortcut's editorial reading and are labelled as such in the UI.
 * Replace this array with an API or RSS ingest; the shape stays the same.
 */
const FIGMA = "https://www.figma.com/release-notes/";
const APPLE = "https://developer.apple.com/design/whats-new/";

const baseUpdates: Update[] = [
  {
    id: "sg-baseline-design-practices",
    title: "Baseline Design Practices page updated",
    sourceId: "sgictss",
    category: "Design Systems",
    kind: "guideline",
    datePublished: "2026-03-05",
    dateVerified: VERIFIED,
    summary:
      "The Baseline Design Practices in Singapore's Digital Service Standards show a last-updated date of 5 March 2026. The page lists nine controls, BD-1 to BD-9, and does not say what changed.",
    whyItMatters:
      "These controls are what government agencies and their industry partners are expected to apply, so a revision can change what a service is reviewed against.",
    designerAction:
      "If you design for a Singapore government service, re-read the nine controls against your current work.",
    sourceUrl: "https://info.standards.tech.gov.sg/control-catalog/dss/bd/",
  },
  {
    id: "figma-agent-ga",
    title: "The Figma agent is generally available",
    sourceId: "figma",
    category: "AI",
    kind: "tool",
    datePublished: "2026-10-06",
    dateVerified: VERIFIED,
    summary:
      "The Figma agent has left beta. The release notes list improved latency, file search and configurable guidelines for design libraries.",
    whyItMatters:
      "An agent that reads library guidelines is only as consistent as those guidelines. Component documentation now shapes generated output, not just human use.",
    designerAction:
      "Review what usage guidance your libraries expose, and agree with your team where agent-made frames need a design review before handoff.",
    sourceUrl: FIGMA,
  },
  {
    id: "figma-github-orgs",
    title: "Connect multiple GitHub organizations to Figma",
    sourceId: "figma",
    category: "Tools",
    kind: "tool",
    datePublished: "2026-10-05",
    dateVerified: VERIFIED,
    summary: "A single Figma plan can now be linked to more than one GitHub organization.",
    whyItMatters:
      "Teams whose code lives across several organizations no longer have to pick one to connect to their design files.",
    designerAction:
      "If your design system and product code sit in different organizations, ask your admin whether both can now be connected.",
    sourceUrl: FIGMA,
  },
  {
    id: "nng-empathy-mapping",
    title: "Empathy Mapping: The First Step in Design Thinking",
    sourceId: "nng",
    category: "Research",
    kind: "research",
    datePublished: "2026-10-02",
    dateVerified: VERIFIED,
    summary:
      "NN/g describes empathy maps as a way for UX teams to visualise user attitudes and behaviours, build a shared understanding of users and expose gaps in existing user data.",
    whyItMatters:
      "The stated value is alignment and gap-finding. An empathy map filled in from assumptions hides the gaps it is meant to reveal.",
    designerAction:
      "Build the map from real research notes, and mark every quadrant entry you cannot trace back to a participant.",
    sourceUrl: "https://www.nngroup.com/articles/empathy-mapping/",
  },
  {
    id: "nng-big-ball-of-mud",
    title: "The New Big Ball of Mud: Why Agentic AI Systems Turn Fragile",
    sourceId: "nng",
    category: "AI",
    kind: "research",
    datePublished: "2026-10-02",
    dateVerified: VERIFIED,
    summary:
      "NN/g argues that because AI makes building nearly free, users grow agentic systems piece by piece into fragile setups they no longer understand.",
    whyItMatters:
      "If people cannot explain what their own automation does, they cannot fix it when it breaks. That is a legibility problem designers own.",
    designerAction:
      "When designing agent builders, show what each step does and what depends on it, and make it easy to remove a step safely.",
    sourceUrl: "https://www.nngroup.com/articles/big-ball-of-mud-ai/",
  },
  {
    id: "baymard-search-bar",
    title: "Search Bar UI: Definition & UX Design Inspiration",
    sourceId: "baymard",
    category: "UX",
    kind: "research",
    datePublished: "2026-10-02",
    dateVerified: VERIFIED,
    summary:
      "Baymard published a guide to designing search interfaces, grounded in its usability research.",
    whyItMatters:
      "Search is often the fastest path to a product or record, and small choices in the field and its suggestions decide whether people trust it.",
    designerAction:
      "Compare your search field, placeholder and suggestion behaviour against the examples before your next search redesign.",
    sourceUrl: "https://baymard.com/blog/search-bar-ui",
  },
  {
    id: "figma-motion",
    title: "Motion adds custom styles, audio, text animations and Lottie export",
    sourceId: "figma",
    category: "Tools",
    kind: "tool",
    datePublished: "2026-09-30",
    dateVerified: VERIFIED,
    summary:
      "Figma Motion gained reusable animation styles, audio on the timeline, character-level text animation and Lottie export.",
    whyItMatters:
      "Reusable animation styles let motion be specified once and shared, the way colour and type styles already are.",
    designerAction:
      "If your team documents motion by hand, try defining your standard durations and easings as animation styles.",
    sourceUrl: FIGMA,
  },
  {
    id: "nng-paced",
    title: "When Should You Disclose AI Use? The PACED Framework",
    sourceId: "nng",
    category: "AI",
    kind: "research",
    datePublished: "2026-09-25",
    dateVerified: VERIFIED,
    summary:
      "NN/g proposes five factors for deciding whether to disclose AI use: policy, audience, context, expectations and degree of AI contribution. It finds no universal rule, and that proactive disclosure is the safer approach.",
    whyItMatters:
      "Disclosure is a design decision with trust consequences. The research suggests being found out later lands worse than saying so up front.",
    designerAction:
      "Run the five questions for any AI-assisted content in your product, and decide where a disclosure label belongs.",
    sourceUrl: "https://www.nngroup.com/articles/disclose-ai-paced/",
  },
  {
    id: "w3c-wcag3-blog",
    title: "Crafting WCAG 3 for more accessible user experiences",
    sourceId: "wcag",
    category: "Accessibility",
    kind: "new",
    datePublished: "2026-09-25",
    dateVerified: VERIFIED,
    summary:
      "W3C WAI Director Shawn Lawton Henry wrote about the challenges of developing WCAG 3.",
    whyItMatters:
      "WCAG 3 is still a draft. WCAG 2.2 remains the standard to design and test against today.",
    designerAction:
      "Keep working to WCAG 2.2, and read the post if you want to understand where conformance is heading.",
    sourceUrl: "https://www.w3.org/WAI/news/2026-09-25/wcag3-blog/",
  },
  {
    id: "baymard-badge-ui",
    title: "What is a UI Badge? Definition & Ecommerce Best Practice Examples",
    sourceId: "baymard",
    category: "UI",
    kind: "research",
    datePublished: "2026-09-23",
    dateVerified: VERIFIED,
    summary:
      "Baymard published research-backed practices for badge copy, placement and visual hierarchy, aimed at preventing clutter.",
    whyItMatters:
      "Badges compete with each other. When every item carries one, none of them signal anything.",
    designerAction:
      "Audit how many badge types your listing pages use, and set a rule for how many can appear on one item.",
    sourceUrl: "https://baymard.com/blog/badge-ui",
  },
  {
    id: "baymard-research-practice",
    title: "Building a UX Research Practice: Team Structure & Tools",
    sourceId: "baymard",
    category: "Research",
    kind: "research",
    datePublished: "2026-09-22",
    dateVerified: VERIFIED,
    summary:
      "Baymard covers structuring key research roles, building a tool stack, running efficient research workflows and measuring the business impact of UX.",
    whyItMatters:
      "A useful reference when you are asked to justify research headcount or tooling.",
    designerAction:
      "Use it as a checklist against how your team currently plans, runs and reports research.",
    sourceUrl: "https://baymard.com/blog/building-ux-research-team",
  },
  {
    id: "apple-iap",
    title: "In-app purchase guidance renamed and refined",
    sourceId: "apple",
    category: "Product Design",
    kind: "updated",
    datePublished: "2026-09-17",
    dateVerified: VERIFIED,
    summary:
      "The HIG page is now titled Apple In-App Purchase, with guidance refined to reflect current best practices.",
    whyItMatters:
      "Purchase flows are reviewed against this page. Wording and naming changes can affect how you label purchase UI.",
    designerAction:
      "Re-read the page before your next paywall or subscription design review.",
    sourceUrl: APPLE,
  },
  {
    id: "w3c-wcag3-draft",
    title: "WCAG 3 Working Draft updated for review",
    sourceId: "wcag",
    category: "Accessibility",
    kind: "guideline",
    datePublished: "2026-09-10",
    dateVerified: VERIFIED,
    summary:
      "The WCAG 3.0 Working Draft was updated with a list of changes and review questions on the conformance model. W3C is asking for feedback by email or GitHub.",
    whyItMatters:
      "The conformance model decides how products will be judged accessible in future. Working Drafts are not requirements.",
    designerAction:
      "Do not design to WCAG 3 yet. If you have views on how conformance should work, this is the window to send them.",
    sourceUrl: "https://www.w3.org/WAI/news/2026-09-10/wcag3/",
  },
  {
    id: "apple-iphone-duo",
    title: "New HIG page: Designing for iPhone Duo",
    sourceId: "apple",
    category: "UI",
    kind: "new",
    datePublished: "2026-09-09",
    dateVerified: VERIFIED,
    summary:
      "A new page introduces the fundamentals of designing for iPhone Duo: device poses, dynamic layouts across dual displays, and toolbars and tab bars on the vertical axis.",
    whyItMatters:
      "A dual-display phone adds layout states that single-screen iPhone designs have never had to handle.",
    designerAction:
      "List which of your screens depend on a fixed bottom tab bar or toolbar, and check them against the new page.",
    sourceUrl: APPLE,
    relevantTo: ["Foldable", "Mobile"],
    links: [{ label: "Designing for iPhone Duo", href: "/cheat-sheets/responsive-design#iphone-duo" }],
  },
  {
    id: "apple-layout",
    title: "HIG Layout guidance updated",
    sourceId: "apple",
    category: "UI",
    kind: "updated",
    datePublished: "2026-09-09",
    dateVerified: VERIFIED,
    summary: "Apple updated the Layout page to reflect current best practices.",
    whyItMatters:
      "Layout is the page most other HIG guidance leans on, so changes here can affect margins, safe areas and adaptivity across your app.",
    designerAction: "Skim the page for changes before starting new iOS layout work.",
    sourceUrl: APPLE,
    relevantTo: ["All Apple platforms"],
  },
  {
    id: "govuk-frontend-6-5",
    title: "GOV.UK Frontend v6.5.0 adds Feedback and Language navigation components",
    sourceId: "govuk",
    category: "Design Systems",
    kind: "new",
    datePublished: "2026-08-27",
    dateVerified: VERIFIED,
    summary:
      "The release adds a Feedback component for gathering feedback from users, and a Language navigation component that lets users switch between the languages a service offers.",
    whyItMatters:
      "Both are patterns teams often build themselves. A tested reference version is worth studying even outside government.",
    designerAction:
      "If you have a custom language switcher or feedback prompt, compare it with these components.",
    sourceUrl: "https://github.com/alphagov/govuk-frontend/releases/tag/v6.5.0",
  },
  {
    id: "w3c-wcag-em-2",
    title: "WCAG Evaluation Methodology (WCAG-EM) 2.0 published",
    sourceId: "wcag",
    category: "Accessibility",
    kind: "guideline",
    datePublished: "2026-07-23",
    dateVerified: VERIFIED,
    summary:
      "WCAG-EM 2.0 is a W3C Group Note describing a step-by-step process for evaluating conformance to WCAG 2. Version 1 covered websites and web pages; version 2 also applies to apps and other digital products.",
    whyItMatters:
      "There is now a W3C-published method for auditing apps, not only websites.",
    designerAction:
      "If you scope or commission accessibility audits for an app, use WCAG-EM 2.0 to frame the sampling and reporting.",
    sourceUrl: "https://www.w3.org/WAI/news/2026-07-23/wcag-em-2/",
  },
];

/** Every update. AI-specific ones come from ai.ts; existing ones gain their AI detail by id. */
export const updates: Update[] = [...systemUpdates, ...aiUpdates, ...figmaOnlyUpdates, ...baseUpdates.map((update) => ({ ...update, ai: aiDetails[update.id] }))];

/** Updates about an AI capability, newest first. */
export const aiFeed: Update[] = updates.filter((u) => u.ai).sort((a, b) => b.datePublished.localeCompare(a.datePublished));

export const updateCategories = [
  "Accessibility",
  "UI",
  "UX",
  "Research",
  "Design Systems",
  "Tools",
  "AI",
  "Product Design",
] as const;

export const kindLabels: Record<Update["kind"], string> = {
  new: "New",
  updated: "Updated",
  guideline: "Guideline",
  tool: "Tool update",
  research: "Research",
};
