import { referenceCaseStudies, referenceProfiles } from "./references";
import type { Citation, SourceId, Update } from "@/types";

/**
 * The Design System Library, and what generative UI means for it.
 *
 * - `summary`, `explore` and each case study's `facts` restate the
 *   organisation's own pages, read on CHECKED.
 * - `interesting`, `learn`, `lesson` and the Generative UI concepts are
 *   Shortcut editorial.
 * - A company is only called a "Public design system" when its own site
 *   publishes one. Everything else is a "Product design reference".
 */
export const CHECKED = "2026-10-08";

const at = (sourceId: SourceId, label: string, url: string, datePublished?: string): Citation => ({
  sourceId,
  label,
  url,
  datePublished,
  dateVerified: CHECKED,
});

export const systemCite = {
  openaiGpt6: at("openai", "OpenAI, GPT-6 and Intelligent UI for everyone", "https://openai.com/index/gpt-6-for-everyone/", "2026-10-07"),
  uberBase: at("uber", "Uber, Base design system", "https://base.uber.com/"),
  uberSpecs: at("uber", "Uber Blog, How Uber Built an Agentic System to Automate Design Specs in Minutes", "https://www.uber.com/blog/automate-design-specs/", "2026-03-11"),
  adsAbout: at("atlassian", "Atlassian Design System, About", "https://atlassian.design/get-started/about-atlassian-design-system"),
  adsTokens: at("atlassian", "Atlassian Design System, Design tokens", "https://atlassian.design/foundations/tokens/design-tokens"),
  rovo: at("atlassian", "Atlassian Design System, Rovo UI", "https://atlassian.design/rovo-ui"),
  rovoGuidelines: at("atlassian", "Atlassian Design System, AI interaction guidelines", "https://atlassian.design/rovo-ui/ai-interaction-guidelines"),
  adsStructured: at("atlassian", "Atlassian, Teaching AI to speak our design language", "https://www.atlassian.com/blog/ai-at-work/teaching-ai-to-speak-our-design-language", "2026-06-02"),
  adsDesignMd: at("atlassian", "Atlassian, DESIGN.md is here: what we learned testing portable design context in practice", "https://www.atlassian.com/blog/ai-at-work/atlassians-design-md-is-here-what-we-learned-testing-portable-design-context-in-practice", "2026-06-15"),
  adsCli: at("atlassian", "Atlassian, Giving AI agents design system context from the terminal", "https://www.atlassian.com/blog/ai-at-work/giving-ai-agents-design-system-context-from-the-terminal-what-we-learned-building-a-cli", "2026-09-16"),
};

// --- GPT-6 update ---------------------------------------------------------------

export const systemUpdates: Update[] = [
  {
    id: "openai-gpt6-intelligent-ui",
    title: "GPT-6 brings Intelligent UI to ChatGPT",
    sourceId: "openai",
    category: "AI",
    kind: "new",
    datePublished: "2026-10-07",
    dateVerified: CHECKED,
    summary:
      "OpenAI says GPT-6 in ChatGPT can answer with interactive interfaces, composing text, graphics, tappable buttons, forms, charts and interactive elements according to the question. A comparison may appear side by side, an explanation as an interactive diagram, and a simple question still gets text. OpenAI says it built a library of native components and a compiler that renders the interface as the model generates it.",
    whyItMatters:
      "The interface is composed around what the person asked, not laid out in advance. OpenAI's own description is that a component library gives each response a familiar foundation while the model decides how the pieces fit together. That is a design system doing the job of keeping generated screens coherent.",
    designerAction:
      "Nothing in your product has to change. Try it: ask ChatGPT the same comparison question twice and note what stays the same between the two interfaces and what does not. Then ask what your own component library would need to tell a model for it to do this well.",
    sourceUrl: "https://openai.com/index/gpt-6-for-everyone/",
    ai: {
      updateType: "New capability",
      useFor: ["Seeing generated interfaces in a shipping product", "Studying which elements stay fixed across responses", "Quick one-off tools, such as a calculator or bill splitter"],
      carefulWith: ["Assuming a generated interface is accessible", "Treating it as a pattern library: it changes per request", "Reading more into it than OpenAI states; it says the model's design judgment still needs work"],
      workflow: "Ask for a comparison, an explanation and a calculator. For each, list the components used, how state is shown, and what you could not predict before it rendered.",
    },
    questions: [
      "What happens when the interface changes every time?",
      "How does the user build familiarity?",
      "Which elements should remain predictable?",
      "How should accessibility be preserved?",
      "How does a design system constrain generated UI?",
      "Who decides hierarchy: designer or model?",
      "How should generated interfaces communicate state?",
      "How do you test an interface that is not always identical?",
    ],
    links: [
      { label: "Generative UI", href: "/ai/generative-ui" },
      { label: "Design System Library", href: "/systems" },
      { label: "Design Tokens", href: "/cheat-sheets/design-tokens" },
      { label: "Accessibility", href: "/cheat-sheets/accessibility" },
      { label: "AI-look signals", href: "/checks/ai-look" },
    ],
  },
];

// --- Generative UI --------------------------------------------------------------

/** Working concepts. These terms have no agreed definitions; this is how Shortcut uses them. */
export const uiConcepts = [
  { name: "Conversational UI", meaning: "The person communicates mainly through conversation.", example: "A chat assistant that answers in text." },
  { name: "Generative UI", meaning: "The system creates or composes an interface for the request.", example: "A comparison question answered with a side-by-side view built for it." },
  { name: "Adaptive UI", meaning: "An existing interface changes with context.", example: "A dashboard that reorders itself for a role or a device." },
  { name: "Agentic UI", meaning: "The interface supports or represents an AI system that can take actions.", example: "A panel showing what an agent is doing, with a way to stop it." },
];

export const fixedVsGenerated = {
  fixed: ["Designer creates a fixed interface", "User learns how to navigate it"],
  generated: ["User expresses intent", "System determines an appropriate interface", "Interface is composed from components"],
};

/** How a design system becomes context for AI. Shortcut's synthesis of the Uber and Atlassian case studies. */
export const systemToAiFlow = ["Design system", "Tokens", "Components", "Behaviour", "Documentation", "AI context", "Generated or reviewed UI"];

export const generativeDesignQuestions = [
  { area: "Predictability", text: "Decide what must never move: navigation, primary actions, destructive actions, where errors appear." },
  { area: "Components", text: "A model composes from what it is given. Gaps in the library become invented components." },
  { area: "Tokens", text: "Named, purpose-based tokens are instructions a model can follow. Raw values are not." },
  { area: "Accessibility", text: "Build it into the components, because nobody reviews each generated screen." },
  { area: "State and trust", text: "People need to see what the system is doing, and how an outcome was produced." },
  { area: "User control", text: "Offer a way back to plain text, and a way to undo what a generated control did." },
  { area: "Testing", text: "You cannot review every output. Test the components, the rules and a sample of results." },
];

// --- Library --------------------------------------------------------------------

export type SystemType = "Public design system" | "Product design reference";

export interface SystemProfile {
  id: string;
  name: string;
  organisation: string;
  type: SystemType;
  usedFor: string;
  /** Restates the organisation's own description. */
  summary: string;
  /** "profiled" has a full page. "listed" links out only. "planned" is not written yet. */
  status: "profiled" | "listed" | "planned";
  officialUrl: string;
  /** As stated by the source, when it states one. */
  lastUpdated?: string;
  dateVerified: string | null;
  /** Something a reader should know before relying on it. */
  caveat?: string;
  /** Its id in the Explorer, when it is one of the compared systems. */
  explorerSystem?: SourceId;
  explore?: { area: string; items: string; access: "Public" | "Staff login" | "Mixed" }[];
  interesting?: string[];
  learn?: string[];
  sections?: { title: string; body: string; points?: string[]; citation: Citation }[];
  caseStudyIds?: string[];
}

export const systems: SystemProfile[] = [
  {
    id: "uber-base",
    name: "Base",
    organisation: "Uber",
    type: "Public design system",
    usedFor: "Uber's ecosystem of products and services",
    summary: "Uber says Base defines the foundations of user interfaces across its products and services, and brings all Uber experiences together under a single, unified framework.",
    status: "profiled",
    officialUrl: "https://base.uber.com/",
    lastUpdated: "The site showed \"Styleguide updated 5 days ago\" when read.",
    dateVerified: CHECKED,
    caveat: "The section overviews are public. Detail pages, including Design tokens, Color 2.0, What's new and About Base 2.0, ask for Uber's staff login, so Shortcut describes the structure and not the guidance inside.",
    explore: [
      { area: "System principles", items: "Content principles, product inclusion, content heuristics. Design principles are marked coming soon.", access: "Public" },
      { area: "Design language", items: "Border, colour, corner radius, design tokens, dimensions, elevation, layout grids, typography, haptics, icons, motion, illustrations, content.", access: "Mixed" },
      { area: "Components", items: "Grouped as action, input and control, data display, feedback and status, surfaces, navigation, data and tables.", access: "Mixed" },
      { area: "Patterns", items: "Feedback, inputting data, modality, states.", access: "Mixed" },
      { area: "Extension library", items: "Maps, Rider, an AI design-guidelines hub, and a playbook for writing extensions.", access: "Mixed" },
      { area: "Tokens", items: "A Design tokens page exists under Design language, at version 2.0.", access: "Staff login" },
    ],
    interesting: [
      "It separates a core from extensions. Maps, Rider and AI each extend Base instead of forking it.",
      "Components are grouped by what they do for the user, such as feedback and status, not by widget type.",
      "Haptics sits in the design language beside colour and type, which reflects a product used one-handed and on the move.",
      "One spec has to serve seven implementation stacks, according to Uber's own engineering blog.",
    ],
    learn: [
      "How to let product teams extend a system without diluting it: a named extension library with its own playbook.",
      "How to organise components by purpose, so people find them by the problem they have.",
      "That a system this large still marks parts as coming soon. Publishing structure before content is normal.",
    ],
    sections: [
      {
        title: "Accessibility",
        body: "Uber's article on Base says a complete component spec includes a screen-reader section covering VoiceOver, TalkBack and ARIA, and describes its accessibility requirements as strict.",
        citation: systemCite.uberSpecs,
      },
    ],
    caseStudyIds: ["uber-uspec"],
  },
  {
    id: "atlassian",
    name: "Atlassian Design System",
    organisation: "Atlassian",
    type: "Public design system",
    usedFor: "Atlassian's apps, including Jira, Confluence and Loom",
    summary: "Atlassian describes it as a collection of design guidelines, foundations, tools and components, built and supported by its developers, designers and content designers.",
    status: "profiled",
    officialUrl: "https://atlassian.design/",
    dateVerified: CHECKED,
    explorerSystem: "atlassian",
    explore: [
      { area: "Get started", items: "Separate paths for design, development and content design.", access: "Public" },
      { area: "Foundations", items: "Tokens, guidelines and visual styles: colour, spacing, typography and more.", access: "Public" },
      { area: "Components", items: "Reusable building blocks for specific interaction needs.", access: "Public" },
      { area: "Rovo UI", items: "AI interaction guidelines, foundations for Rovo, and components such as a generative border and a skills tag.", access: "Public" },
      { area: "Tools", items: "Includes lint plugins, a Figma plugin and library, an MCP server and a command-line tool for AI agents.", access: "Public" },
      { area: "Content design", items: "Has its own entry point under Get started.", access: "Public" },
    ],
    interesting: [
      "It treats AI agents as a reader of the design system, and publishes what it learned doing so, with numbers.",
      "It has a named design language for AI experiences, Rovo UI, inside the main system instead of beside it.",
      "Token names carry meaning: foundation, property and modifier, as in color.icon.success.",
      "Content design is a first-class entry point, not an appendix.",
    ],
    learn: [
      "How to name tokens so the name tells you when to use it.",
      "What an AI section of a design system can contain.",
      "How to give a model your design system, and the trade-offs between three ways of doing it.",
    ],
    sections: [
      {
        title: "Tokens",
        body: "Atlassian defines design tokens as name and value pairings that represent small, repeatable design decisions. Names have up to three parts: foundation, property and modifier.",
        points: [
          "Choose tokens by meaning, not by a specific value.",
          "Do not pick a token because its colour looks like a match; that can break other themes.",
          "There are dedicated colour tokens for text, links, icons, backgrounds, borders, charts and skeleton loaders.",
        ],
        citation: systemCite.adsTokens,
      },
      {
        title: "Rovo UI",
        body: "Atlassian calls Rovo UI the AI voice of its design language, defining how Rovo looks, moves and behaves. It includes a generative border, an animated border that indicates AI content is being generated.",
        points: [
          "Make workflows proactive.",
          "Keep the flow state: interactions should be natural and unobtrusive.",
          "Content and form are dynamic: let people input or transform information in the form that suits them.",
          "Make it easy to \"pop the hood\": clear insight into system state and how outcomes are produced.",
          "Promote collective intelligence, and expand to multi-player and multi-intelligence.",
          "Weave a bit of Atlassian into the experience.",
          "Always accelerate responsibly: high quality, not rushed.",
        ],
        citation: systemCite.rovoGuidelines,
      },
    ],
    caseStudyIds: ["atlassian-structured-content", "atlassian-design-md", "atlassian-cli"],
  },
  // Systems already compared in the Explorer. Their guidance lives there.
  { id: "sgds", name: "Singapore Government Design System", organisation: "GovTech Singapore", type: "Public design system", usedFor: "Singapore government digital services", summary: "Foundations, components, templates and blocks for government digital products.", status: "listed", officialUrl: "https://www.designsystem.tech.gov.sg/", dateVerified: "2026-10-07", explorerSystem: "sgds" },
  { id: "govuk", name: "GOV.UK Design System", organisation: "UK Government Digital Service", type: "Public design system", usedFor: "UK government services", summary: "Components and patterns, each with the research behind it.", status: "listed", officialUrl: "https://design-system.service.gov.uk/", dateVerified: "2026-10-07", explorerSystem: "govuk" },
  { id: "material", name: "Material Design", organisation: "Google", type: "Public design system", usedFor: "Android and Google products", summary: "Google's design system. Shortcut cites Google's Android developer documentation for it.", status: "listed", officialUrl: "https://m3.material.io/", dateVerified: "2026-10-07", explorerSystem: "material" },
  { id: "apple", name: "Human Interface Guidelines", organisation: "Apple", type: "Public design system", usedFor: "Apple platforms", summary: "Platform conventions for iOS, iPadOS, macOS, watchOS and visionOS.", status: "listed", officialUrl: "https://developer.apple.com/design/human-interface-guidelines/", dateVerified: "2026-10-07", explorerSystem: "apple" },
  // Named in the brief; profiles not written yet. Listed so the gap is visible.
  { id: "fluent", name: "Fluent", organisation: "Microsoft", type: "Public design system", usedFor: "Windows and Microsoft 365", summary: "Microsoft's design system.", status: "planned", officialUrl: "https://fluent2.microsoft.design/", dateVerified: null },
  { id: "carbon", name: "Carbon", organisation: "IBM", type: "Public design system", usedFor: "IBM products", summary: "IBM's design system. Shortcut has read its button, spacing, colour token and modal pages.", status: "listed", officialUrl: "https://carbondesignsystem.com/", dateVerified: CHECKED, explorerSystem: "carbon" },
  { id: "polaris", name: "Polaris", organisation: "Shopify", type: "Public design system", usedFor: "Shopify admin and apps", summary: "Shopify's design system.", status: "planned", officialUrl: "https://polaris.shopify.com/", dateVerified: null },
  { id: "primer", name: "Primer", organisation: "GitHub", type: "Public design system", usedFor: "GitHub", summary: "GitHub's design system. Shortcut has read its button and dialog guidelines.", status: "listed", officialUrl: "https://primer.style/", dateVerified: CHECKED, explorerSystem: "primer" },
  { id: "uswds", name: "U.S. Web Design System", organisation: "U.S. General Services Administration", type: "Public design system", usedFor: "United States federal websites", summary: "The design system for federal websites. Shortcut has read its button, design token and modal pages.", status: "listed", officialUrl: "https://designsystem.digital.gov/", dateVerified: CHECKED, explorerSystem: "uswds" },
  // Companies with useful design material and no verified public design system.
  ...referenceProfiles,
];

export function getSystem(id: string): SystemProfile | undefined {
  return systems.find((s) => s.id === id);
}

// --- Case studies ---------------------------------------------------------------

export interface CaseStudy {
  id: string;
  systemId: string;
  title: string;
  /** What the organisation says it did and found. */
  facts: string[];
  /** Shortcut's reading. */
  lesson: string;
  citation: Citation;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "uber-uspec",
    systemId: "uber-base",
    title: "Uber: an agent that writes component specs in Figma",
    facts: [
      "Uber's design systems team built uSpec, which connects an AI agent in Cursor to Figma through the open-source Figma Console MCP.",
      "The agent reads the real component: structure, tokens, variables and styles. It then writes finished spec pages into the Figma file.",
      "Each part of a spec has its own agent skill: anatomy, API, properties, colour annotation, structure and screen reader.",
      "The screen-reader skill loads platform accessibility references first, so the agent selects from documented properties and does not guess.",
      "Uber says a screen-reader spec covering iOS, Android and web generates in under two minutes, and that the pipeline runs locally so design data stays inside its network.",
      "The specs serve seven implementation stacks.",
    ],
    lesson:
      "A design system is no longer only documentation for people. Uber's agent is useful because the system underneath is structured: real token names, real variants, a spec template. The AI contributes interpretation; the structure contributes accuracy. Without the second, the first has nothing to stand on.",
    citation: systemCite.uberSpecs,
  },
  {
    id: "atlassian-structured-content",
    systemId: "atlassian",
    title: "Atlassian: the design system as structured content for AI",
    facts: [
      "Atlassian found its design-system guidance spread across documentation sites, Confluence, Figma files, videos and code, some of it outdated and most of it written for people to look at.",
      "It broke the guidance into consistent, machine-readable chunks with schemas for components, icons, tokens, lint rules and foundations, kept alongside the code.",
      "Each schema covers usage, code examples, props, content standards and accessibility requirements.",
      "The same source generates its MCP server, its agent skill and its DESIGN.md files.",
      "Atlassian reports that agents using it produced 4.9% more accurate code with 11% fewer errors and finished tasks 34% faster than agents without it.",
      "It says unstructured sources led to outdated patterns, missed accessibility requirements and invented components.",
    ],
    lesson:
      "The old model was a design system read by designers and developers. The emerging one adds AI agents as a third reader, and that reader cannot skim a Figma file or watch a video. If guidance is not written down in a structured form, a model fills the gap with something generic. Atlassian's own line is that documentation which drifts from the code is worse than none.",
    citation: systemCite.adsStructured,
  },
  {
    id: "atlassian-design-md",
    systemId: "atlassian",
    title: "Atlassian: testing DESIGN.md",
    facts: [
      "DESIGN.md is an open Markdown format, designed by Google for its Stitch tool, that Atlassian describes as a portable snapshot of a team's brand and UI patterns.",
      "The first part lists design tokens in machine-readable form. The second is guidance for people and agents on colour, spacing, layout, elevation and components.",
      "Atlassian's summary of the problem it addresses: \"Generic in, generic out.\"",
      "In a one-shot demo in Figma Make, the file moved output from generic to recognisably Atlassian.",
      "In a production test it used about 92% more tokens than the baseline and varied more between runs. Atlassian says these results are not conclusive.",
      "Agents given DESIGN.md were more likely to re-create components than use the existing library.",
      "Atlassian suggests it for art direction, quick prototyping and theming, and MCP servers or skills with lint rules for production work.",
    ],
    lesson:
      "Generated UI looks generic when the model knows nothing about your brand, components, spacing or patterns. A portable design file fixes the look cheaply, which is why it helps prototypes. It does not make a model use your real components, so on its own it can produce a convincing second system. That is the same failure Shortcut lists under AI-look signals, arriving by a more polished route.",
    citation: systemCite.adsDesignMd,
  },
  {
    id: "atlassian-cli",
    systemId: "atlassian",
    title: "Atlassian: three ways to hand a design system to an agent",
    facts: [
      "Atlassian delivers its design system to AI agents three ways: an agent skill, an MCP server and a command-line tool.",
      "All three draw on one structured source, so they stay in step.",
      "The context covers component APIs and usage guidance, tokens, icons, accessibility guidance and lint rules.",
      "It added the command-line tool because many agents have no MCP client but can run a command.",
      "Atlassian reports tasks finished about 8% faster with about 8% fewer tokens using it.",
      "Its advice includes keeping these interfaces in sync, and reading agent transcripts alongside the metrics.",
    ],
    lesson:
      "How the design system reaches the model is now a design-system decision, with costs and trade-offs like any other. Designers do not need to build this, but they should know it exists and ask which route their team's tools use, because it decides whether generated UI follows the system.",
    citation: systemCite.adsCli,
  },
];

export function getCaseStudy(id: string): CaseStudy | undefined {
  return [...caseStudies, ...referenceCaseStudies].find((c) => c.id === id);
}

// --- Learn from real design systems ---------------------------------------------

/** Pointers by subject, in no ranked order. Only systems Shortcut has read on that subject are named. */
export const learnFrom = [
  { want: "Tokens", where: [{ label: "SGDS token layers", href: "/explorer/design-tokens" }, { label: "Atlassian token naming", href: "/systems/atlassian" }, { label: "Seven systems compared", href: "/explorer/design-tokens" }] },
  { want: "Content design", where: [{ label: "GOV.UK error messages", href: "/cheat-sheets/error-states" }, { label: "Atlassian", href: "/systems/atlassian" }] },
  { want: "Public services", where: [{ label: "Singapore UX", href: "/singapore" }, { label: "Compare SGDS, GOV.UK and USWDS", href: "/explorer/button" }] },
  { want: "Designing for Southeast Asia", where: [{ label: "Grab's UX breakdowns", href: "/systems/grab" }, { label: "Singapore UX", href: "/singapore" }] },
  { want: "Product polish", where: [{ label: "Granola's changelog", href: "/systems/granola" }, { label: "Before You Send It", href: "/checks/before-you-send-it" }] },
  { want: "AI interfaces", where: [{ label: "Atlassian Rovo UI", href: "/systems/atlassian" }, { label: "Generative UI", href: "/ai/generative-ui" }] },
  { want: "Large multi-product ecosystems", where: [{ label: "Uber Base extensions", href: "/systems/uber-base" }, { label: "Material across systems", href: "/explorer" }] },
  { want: "Design systems and AI", where: [{ label: "Uber's spec-writing agent", href: "/systems/uber-base#uber-uspec" }, { label: "Atlassian's DESIGN.md test", href: "/systems/atlassian#atlassian-design-md" }] },
];
