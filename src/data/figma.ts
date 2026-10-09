import type { CheatSheet, Citation, CraftEntry } from "@/types";
import { VERIFIED } from "./citations";

/**
 * The Figma Guide. It does not repeat Figma Help; it says what each tool is
 * for and when to open it.
 *
 * - `what` and `keyFeatures` restate Figma's own product and help pages,
 *   checked on VERIFIED. Figma changes quickly, so treat these as dated.
 * - `bestFor`, `notFor`, `overlaps`, the decision helper, comparisons,
 *   recipes and checklists are Shortcut editorial.
 */

const fig = (label: string, url: string): Citation => ({ sourceId: "figma", label, url, dateVerified: VERIFIED });

const HELP = "https://help.figma.com/hc/en-us/articles/";

/** A Figma Help page read on 9 October 2026. */
const figLater = (label: string, url: string): Citation => ({ ...fig(label, url), dateVerified: "2026-10-09" });

export const figmaCite = {
  devMode: figLater("Figma Help, Guide to Dev Mode", `${HELP}15023124644247-Guide-to-Dev-Mode-in-Figma`),
  prototyping: figLater("Figma Help, Guide to prototyping", `${HELP}360040314193-Guide-to-prototyping-in-Figma`),
  autoLayout: fig("Figma Help, Guide to auto layout", `${HELP}360040451373-Guide-to-auto-layout`),
  variables: fig("Figma Help, Guide to variables", `${HELP}15339657135383-Guide-to-variables-in-Figma`),
  variablesVsStyles: fig("Figma Help, The difference between variables and styles", `${HELP}15871097384471-The-difference-between-variables-and-styles`),
  components: fig("Figma Help, Guide to components", `${HELP}360038662654-Guide-to-components-in-Figma`),
  properties: fig("Figma Help, Explore component properties", `${HELP}5579474826519-Explore-component-properties`),
  libraries: fig("Figma Help, Guide to libraries", `${HELP}360041051154-Guide-to-libraries-in-Figma`),
  codeConnect: fig("Figma Help, Code Connect", `${HELP}23920389749655-Code-Connect`),
  aiTools: fig("Figma Help, Use AI tools in Figma Design", `${HELP}23870272542231-Use-AI-tools-in-Figma-Design`),
  make: fig("Figma, Make", "https://www.figma.com/make/"),
  ai: fig("Figma, AI", "https://www.figma.com/ai/"),
  releaseNotes: fig("Figma release notes", "https://www.figma.com/release-notes/"),
};

export interface FigmaTool {
  id: string;
  name: string;
  kind: "Product" | "Capability";
  /** One line for lists and the decision helper. */
  tagline: string;
  what: string;
  keyFeatures: string[];
  bestFor: string[];
  notFor: string[];
  whenToUse: string;
  /** A typical sequence, in order. */
  workflow: string[];
  overlaps: string;
  related: string[];
  docs: Citation;
}

export const figmaTools: FigmaTool[] = [
  {
    id: "design",
    name: "Figma Design",
    kind: "Product",
    tagline: "The main product-design workspace.",
    what: "Figma describes it as the place to design and prototype together, on an infinite canvas.",
    keyFeatures: [
      "Auto layout: frames that resize and reflow as content changes",
      "Variables: reusable values for colour, spacing, text and more",
      "Components: reusable UI elements",
      "Prototyping",
      "Branching and merging",
      "Vector tools",
      "Multiplayer files and comments",
    ],
    bestFor: ["UI design, from wireframes to high fidelity", "Components, variables and design systems", "Click-through prototypes", "Responsive layouts"],
    notFor: ["Workshops and loose thinking", "Prototypes that need real data or logic", "Slide decks"],
    whenToUse: "Whenever the output is screens or a design system. It is where most of a product designer's time goes.",
    workflow: ["Research", "Wireframe", "Design", "Prototype", "Design review", "Dev handoff"],
    overlaps: "It can prototype, but Make builds working prototypes. It has vector tools, but Draw has more of them. It can present, but Slides is built for that.",
    related: ["figjam", "dev-mode", "make", "slides"],
    docs: fig("Figma, Design", "https://www.figma.com/design/"),
  },
  {
    id: "figjam",
    name: "FigJam",
    kind: "Product",
    tagline: "A shared whiteboard for thinking together.",
    what: "A digital whiteboard for defining ideas, aligning on decisions and moving work forward, with shapes and connectors for flows and systems.",
    keyFeatures: [
      "Stickies, shapes and connectors",
      "Templates for stand-ups, retros and planning",
      "Prompt to create meeting templates and timelines",
      "Sort stickies into themes and summarise output with AI",
    ],
    bestFor: ["Workshops and brainstorming", "Journey and affinity mapping", "Research synthesis with a team", "Diagrams and planning"],
    notFor: ["Screen design", "A long-term research repository with traceable evidence", "Anything that needs pixel precision"],
    whenToUse: "Before design, and whenever a group needs to think on one surface.",
    workflow: ["Set the goal and agenda", "Prepare the board", "Run the session", "Sort and summarise", "Carry decisions into Design"],
    overlaps: "Figma Design can hold diagrams too, but its tools assume precision. FigJam's AI sorting is a first pass, not analysis: a dedicated research tool keeps findings linked to their evidence.",
    related: ["design", "slides"],
    docs: fig("Figma, FigJam", "https://www.figma.com/figjam/"),
  },
  {
    id: "dev-mode",
    name: "Dev Mode",
    kind: "Product",
    tagline: "The developer's view of a design file.",
    what: "Figma describes it as translating designs into code: code snippets, component properties and structured layer data from the canvas.",
    keyFeatures: [
      "Ready-for-dev statuses and notifications",
      "Compare changes side by side",
      "Focus view of the frames being built",
      "Component playground for properties and variants",
      "Links to GitHub files, Jira tickets and Storybook stories",
      "Code Connect and the MCP server",
    ],
    bestFor: ["Handing work to developers", "Showing what changed since last time", "Letting developers inspect without editing"],
    notFor: ["Designing", "Replacing the handoff conversation"],
    whenToUse: "When a design is settled enough to build. Mark it ready, annotate what must not be missed, and walk the developer through it.",
    workflow: ["Clean the file", "Mark frames ready for dev", "Annotate behaviour", "Developer inspects", "Compare changes on updates"],
    overlaps: "Developers can open Figma Design, but Dev Mode hides what they do not need and adds what they do.",
    related: ["design", "code-connect", "mcp"],
    docs: fig("Figma, Dev Mode", "https://www.figma.com/dev-mode/"),
  },
  {
    id: "make",
    name: "Figma Make",
    kind: "Product",
    tagline: "Prompt to a working, code-backed prototype.",
    what: "A prompt-to-code tool. Figma says what you build is code-backed and visually editable, and uses your design context, from systems to images.",
    keyFeatures: [
      "Attach Figma frames, PDFs and other files to a prompt",
      "Bring in design systems through Make kits and npm packages",
      "Move between code and canvas",
      "Start from a codebase, design assets or from scratch",
    ],
    bestFor: ["A realistic prototype of one flow, to test an interaction", "Ideas that need real behaviour to judge", "Working from screens you have already designed"],
    notFor: ["Replacing the design work: it needs requirements and a system to start from", "\"Generate my whole product\" with no brief"],
    whenToUse: "After the key screen and system exist, when a static prototype cannot show what you need to test.",
    workflow: ["Design the key screen in Figma Design", "Attach it and your system to a prompt", "Build the interaction", "Test with users", "Return to Design to refine"],
    overlaps: "Figma Design prototypes are click-through and visual. Make is code-backed. Sites also produces code, but for publishing a website.",
    related: ["design", "agent", "sites"],
    docs: figmaCite.make,
  },
  {
    id: "slides",
    name: "Figma Slides",
    kind: "Product",
    tagline: "Presentations, with live prototypes inside.",
    what: "Figma calls it a presentation tool built for designers and their teams, included with all seats on every plan.",
    keyFeatures: [
      "A simple slide interface, with a Design Mode for Figma Design tools",
      "Playable prototypes and live objects in a slide",
      "Presenter notes, chat and comments",
      "AI to adjust the tone and length of text",
    ],
    bestFor: ["Design reviews and research readouts", "Showing a prototype inside the story around it", "Decks that reuse your Figma components"],
    notFor: ["Long written documents", "Audiences who must edit the deck in another tool"],
    whenToUse: "When you are presenting work that lives in Figma and want the audience to try it, not look at screenshots.",
    workflow: ["Outline the story", "Bring in frames and prototypes", "Add presenter notes", "Present and collect comments"],
    overlaps: "You can present from Figma Design, but Slides adds structure, notes and audience interaction.",
    related: ["design", "figjam"],
    docs: fig("Figma, Slides", "https://www.figma.com/slides/"),
  },
  {
    id: "draw",
    name: "Figma Draw",
    kind: "Product",
    tagline: "Illustration and expressive vector work.",
    what: "Advanced vector tools for illustration: vector brushes, stroke settings, fills and effects.",
    keyFeatures: ["Vector brushes, including your own", "Variable stroke width", "Noise, texture and progressive blur effects", "Enhanced vector editing"],
    bestFor: ["Custom icons and spot illustrations", "Brand and marketing artwork", "Adding a hand-drawn quality"],
    notFor: ["Interface layout", "Photo editing"],
    whenToUse: "When the vector tools in Figma Design run out.",
    workflow: ["Sketch the shapes", "Refine strokes and fills", "Add texture", "Use the artwork in Design, Slides or Buzz"],
    overlaps: "Figma Design has vector tools for simple icons. Draw is for work where the drawing is the point.",
    related: ["design", "buzz"],
    docs: fig("Figma, Draw", "https://www.figma.com/draw/"),
  },
  {
    id: "sites",
    name: "Figma Sites",
    kind: "Product",
    tagline: "Design and publish a website.",
    what: "An all-in-one tool to design and build custom, responsive websites and publish them.",
    keyFeatures: [
      "Turn Figma Design frames into flexible layouts",
      "A CMS where content is edited without changing the layout",
      "Preset interactions such as marquee and hover effects",
      "Edit the code, or use AI to create interactions",
    ],
    bestFor: ["Marketing sites, portfolios and landing pages", "Teams who want design and site in one tool", "Content that non-designers update"],
    notFor: ["Application UI behind a login", "Sites that must live in an existing codebase"],
    whenToUse: "When the deliverable is a public website, not a product.",
    workflow: ["Design the pages", "Set responsive behaviour", "Connect CMS content", "Add interactions", "Publish"],
    overlaps: "Make also turns designs into code, but for prototypes and apps. Sites is for publishing websites.",
    related: ["design", "make"],
    docs: fig("Figma, Sites", "https://www.figma.com/sites/"),
  },
  {
    id: "buzz",
    name: "Figma Buzz",
    kind: "Product",
    tagline: "On-brand marketing assets at volume.",
    what: "Asset production from brand templates: social posts, display ads and one-pagers, with edit restrictions to stay within brand guidelines.",
    keyFeatures: [
      "Brand templates teammates can customise",
      "Edit restrictions",
      "Bulk create and multi-edit",
      "Grid view of every asset",
      "AI image tools and text rewriting",
      "Video import and trimming",
    ],
    bestFor: ["Marketing teams producing many variations", "Letting non-designers make assets safely", "Campaigns across many sizes"],
    notFor: ["Product UI", "One-off bespoke artwork"],
    whenToUse: "When a designer sets the template and other people fill it in.",
    workflow: ["Design the template", "Lock what must not change", "Publish to the team", "Bulk-create variations", "Review and export"],
    overlaps: "You could build templates in Figma Design, but Buzz adds restrictions and bulk editing for the people using them.",
    related: ["design", "draw", "weave"],
    docs: fig("Figma, Buzz", "https://www.figma.com/buzz/"),
  },
  {
    id: "agent",
    name: "Figma agent",
    kind: "Capability",
    tagline: "An AI collaborator inside the canvas.",
    what: "Figma describes collaborating with an agent to generate and remix designs, automate busywork and get design feedback. It became generally available on 6 October 2026, with file search and guidelines you can set for design libraries.",
    keyFeatures: ["Generate and remix designs", "Automate repetitive file work", "Search for Figma files from a chat", "Follow guidelines set on design libraries", "Generative plugins and custom skills"],
    bestFor: ["Working within the design canvas", "Modifying existing designs and bulk edits", "Exploring directions quickly", "Using your library's guidance"],
    notFor: ["Working prototypes with real behaviour", "Decisions about what to build"],
    whenToUse: "When the work is editing or extending designs in a file, especially repetitive changes.",
    workflow: ["Write guidelines for your library", "Ask for a change or a direction", "Review against the guidelines", "Refine by hand"],
    overlaps: "Make also takes prompts, but produces code-backed prototypes. The agent works on design layers.",
    related: ["design", "make", "ai-tools"],
    docs: figmaCite.ai,
  },
  {
    id: "ai-tools",
    name: "Figma AI tools",
    kind: "Capability",
    tagline: "Single-purpose AI actions in Figma Design.",
    what: "Actions inside Figma Design, including First Draft, rename layers, replace content, rewrite and translate text, add interactions, and image generation and editing. Figma notes that AI outputs may be misleading or wrong and should be verified.",
    keyFeatures: ["First Draft", "Replace content", "Rewrite, translate and shorten text", "Rename layers", "Add interactions", "Make and edit images, remove backgrounds, boost resolution, vectorise"],
    bestFor: ["Realistic placeholder content", "Tidying a file", "Quick image fixes without leaving Figma"],
    notFor: ["Final copy", "Translation you will ship unreviewed"],
    whenToUse: "For small, bounded tasks where checking the result is quick.",
    workflow: ["Select the layers", "Run the action", "Check the result", "Fix what it got wrong"],
    overlaps: "The agent can do many of the same things in a conversation. These are the one-click versions.",
    related: ["agent", "design"],
    docs: figmaCite.aiTools,
  },
  {
    id: "motion",
    name: "Figma Motion",
    kind: "Capability",
    tagline: "Animation, with reusable motion styles.",
    what: "Figma describes creating precise animations and building reusable motion systems. A September 2026 release added animation styles with custom easing and duration, audio, character-level text animation and Lottie export.",
    keyFeatures: ["Animation styles with easing and duration", "Audio on the timeline", "Character-level text animation", "Lottie export", "Styles can be applied by the agent"],
    bestFor: ["Specifying motion precisely for developers", "A shared set of durations and easings", "Animated assets for export"],
    notFor: ["Decoration with no purpose", "Replacing a reduced-motion specification"],
    whenToUse: "When motion explains a change and you need it built the way you designed it.",
    workflow: ["Define a few animation styles", "Apply them to one flow", "Remove animation that explains nothing", "Export or hand off"],
    overlaps: "Prototype transitions in Figma Design cover simple cases. Motion is for designed animation.",
    related: ["design", "agent"],
    docs: figmaCite.releaseNotes,
  },
  {
    id: "weave",
    name: "Figma Weave",
    kind: "Capability",
    tagline: "AI workflows for images, video and audio.",
    what: "Figma describes it as AI workflows for imagery, video, audio and more. A September 2026 release lets Figma Design layers act as inputs to a workflow.",
    keyFeatures: ["Pre-built AI workflows for images and vectors", "A Figma node that connects your designs as inputs", "Choose which text and image layers can change"],
    bestFor: ["Content variations from a fixed layout", "Generated media that stays inside a brand template"],
    notFor: ["Interface design", "Assets that skip rights and brand review"],
    whenToUse: "When you need many versions of designed content, not a new design.",
    workflow: ["Design the layout", "Mark the layers that may change", "Run the workflow", "Review each output"],
    overlaps: "Buzz also produces variations, by hand and in bulk. Weave generates the media itself.",
    related: ["buzz", "design"],
    docs: figmaCite.ai,
  },
  {
    id: "code-connect",
    name: "Code Connect",
    kind: "Capability",
    tagline: "Links Figma components to the real coded ones.",
    what: "A bridge between a codebase and Dev Mode that connects components in repositories to components in design files. Available on Organization and Enterprise plans, with a Full or Dev seat.",
    keyFeatures: ["Dev Mode shows your design system's real code snippets", "A UI option inside Figma and a CLI option in the repository", "Gives AI agents references to your actual code through the MCP server"],
    bestFor: ["Teams with a coded design system", "Making sure new code uses existing components"],
    notFor: ["Teams without coded components yet", "Solo designers: developers set it up with you"],
    whenToUse: "Once your Figma components and coded components both exist and you want them mapped.",
    workflow: ["Agree component names and properties with developers", "Developers map components", "Check snippets in Dev Mode", "Keep the mapping updated"],
    overlaps: "Without it, Dev Mode shows autogenerated snippets. With it, the snippets are yours.",
    related: ["dev-mode", "mcp"],
    docs: figmaCite.codeConnect,
  },
  {
    id: "mcp",
    name: "Figma MCP server",
    kind: "Capability",
    tagline: "Lets AI coding agents read and write Figma.",
    what: "Provides design information and context to AI agents generating code from Figma files. It can also create and modify native Figma content from an MCP client. Only clients in Figma's MCP catalogue can connect.",
    keyFeatures: ["Turn a selected frame into code", "Pull variables, components and layout data into an IDE", "Create frames, components and variables from a client", "A remote server that needs no desktop app"],
    bestFor: ["Developers using AI coding agents", "Design-system work across design and code"],
    notFor: ["Designers who do not work with a coding agent"],
    whenToUse: "When your team builds with an AI coding agent and wants it to use the design, not guess from a screenshot.",
    workflow: ["Developer connects their client", "Select a frame", "Agent generates code using design context", "Review against the design"],
    overlaps: "Dev Mode is for people inspecting. The MCP server is for agents.",
    related: ["dev-mode", "code-connect", "make"],
    docs: fig("Figma Developers, MCP server", "https://developers.figma.com/docs/figma-mcp-server/"),
  },
];

export function getFigmaTool(id: string): FigmaTool | undefined {
  return figmaTools.find((t) => t.id === id);
}

// --- Decision helper -----------------------------------------------------------

export interface FigmaDecision {
  id: string;
  goal: string;
  toolId: string;
  why: string;
  alternative?: { toolId: string; when: string };
  /** A related page in Shortcut. */
  related?: { label: string; href: string };
}

export const figmaDecisions: FigmaDecision[] = [
  { id: "interface", goal: "Design a product interface", toolId: "design", why: "It has the layout, component and variable tools that screens need.", related: { label: "Layout cheat sheet", href: "/cheat-sheets/layout" } },
  { id: "workshop", goal: "Run a workshop", toolId: "figjam", why: "Built for group whiteboarding, mapping and voting.", related: { label: "How to facilitate a workshop", href: "/practice/workshop" } },
  { id: "synthesis", goal: "Sort research notes with my team", toolId: "figjam", why: "Stickies and clustering suit a shared first pass.", alternative: { toolId: "design", when: "never for this. If findings must stay linked to recordings over time, a dedicated research tool is the better choice." }, related: { label: "How to synthesise research", href: "/practice/synthesis" } },
  { id: "present", goal: "Present work to stakeholders", toolId: "slides", why: "Decks that can hold a playable prototype, with presenter notes.", alternative: { toolId: "design", when: "the audience is other designers and you want to walk the file itself." } },
  { id: "working-prototype", goal: "Turn my UI into a working prototype", toolId: "make", why: "It produces code-backed behaviour from screens you attach.", alternative: { toolId: "design", when: "a click-through between screens is enough to answer your question." }, related: { label: "AI-assisted prototyping", href: "/ai/learn#ai-prototyping" } },
  { id: "handoff", goal: "Hand work to developers", toolId: "dev-mode", why: "Statuses, annotations, comparison and code snippets in one view.", related: { label: "Design Handoff cheat sheet", href: "/cheat-sheets/design-handoff" } },
  { id: "website", goal: "Publish a website", toolId: "sites", why: "Responsive layouts, a CMS and publishing from the design.", alternative: { toolId: "make", when: "it is an app or a prototype, not a public site." } },
  { id: "illustration", goal: "Create illustration or vector artwork", toolId: "draw", why: "Brushes, variable strokes and texture effects.", alternative: { toolId: "design", when: "it is a simple icon." } },
  { id: "marketing", goal: "Create branded marketing assets", toolId: "buzz", why: "Templates with edit restrictions, and bulk creation.", alternative: { toolId: "weave", when: "you need the images or video themselves generated." } },
  { id: "bulk-edit", goal: "Make the same change across many frames", toolId: "agent", why: "It works on existing layers and can follow your library's guidelines.", alternative: { toolId: "ai-tools", when: "it is one bounded action, such as renaming layers." } },
  { id: "animate", goal: "Design and specify an animation", toolId: "motion", why: "Reusable animation styles and export.", alternative: { toolId: "design", when: "a prototype transition is all you need." } },
  { id: "ai-code", goal: "Let our coding agent use the design", toolId: "mcp", why: "It gives agents structured design context instead of a screenshot.", alternative: { toolId: "code-connect", when: "you also want the agent to use your real components." } },
];

// --- Comparisons ---------------------------------------------------------------

export interface FigmaComparison {
  id: string;
  title: string;
  difference: string;
  whenEach: string[];
  both: string;
  mistake: string;
  citations: Citation[];
}

export const figmaComparisons: FigmaComparison[] = [
  {
    id: "make-vs-design",
    title: "Make vs Design",
    difference: "Figma Design is for designing and visual, click-through prototyping. Figma Make is code-backed, AI-assisted creation of something that actually works.",
    whenEach: ["Design: to decide what the interface is.", "Make: to find out how it behaves, once you know what it is."],
    both: "Yes, in that order. Attach frames from Design to a Make prompt, test, then return to Design to refine.",
    mistake: "Starting in Make with no requirements or system, and getting a generic product.",
    citations: [figmaCite.make, figmaTools[0].docs],
  },
  {
    id: "agent-vs-make",
    title: "Figma agent vs Figma Make",
    difference: "The agent works on design layers in the canvas. Make produces code.",
    whenEach: ["Agent: modify existing designs, explore directions, bulk edits, find files, apply library guidance.", "Make: functional prototypes, code-backed experiences, interaction exploration."],
    both: "Yes. Use the agent to prepare and vary the screens, then Make to bring one flow to life.",
    mistake: "Asking the agent for behaviour, or asking Make for a tidy design file.",
    citations: [figmaCite.ai, figmaCite.make],
  },
  {
    id: "make-vs-sites",
    title: "Make vs Sites",
    difference: "Both end in code. Make is for prototypes and apps. Sites is for designing and publishing a responsive website, with a CMS.",
    whenEach: ["Make: testing an idea, or an app with behaviour.", "Sites: a public site whose content other people will update."],
    both: "Rarely on the same deliverable.",
    mistake: "Publishing a Make prototype as if it were a maintained site.",
    citations: [figmaCite.make, fig("Figma, Sites", "https://www.figma.com/sites/")],
  },
  {
    id: "figjam-vs-design",
    title: "FigJam vs Design",
    difference: "FigJam is a whiteboard for thinking together. Design is a precise tool for making screens.",
    whenEach: ["FigJam: workshops, mapping, synthesis, early flows.", "Design: anything that will be built."],
    both: "Yes. Decisions made in FigJam are carried into Design.",
    mistake: "Drawing detailed screens in FigJam, or running a workshop in a Design file where people are afraid to touch things.",
    citations: [fig("Figma, FigJam", "https://www.figma.com/figjam/"), figmaTools[0].docs],
  },
  {
    id: "figjam-vs-slides",
    title: "FigJam vs Slides",
    difference: "FigJam is for working something out together. Slides is for presenting what you worked out.",
    whenEach: ["FigJam: the group is contributing, and the outcome is not known yet.", "Slides: you are telling a story to an audience, with a prototype they can try."],
    both: "Yes. Run the workshop in FigJam, then present the decisions in Slides.",
    mistake: "Presenting a workshop board as the readout. A board records the conversation; it does not tell the story.",
    citations: [fig("Figma, FigJam", "https://www.figma.com/figjam/"), fig("Figma, Slides", "https://www.figma.com/slides/")],
  },
  {
    id: "variables-vs-styles",
    title: "Variables vs styles",
    difference: "A variable stores a single raw value: a solid colour, a number, a string or a boolean. A style can store compound properties such as gradients, images and blend modes.",
    whenEach: ["Variables: tokens, anything that changes by mode such as light and dark, and anything you want to scope or alias.", "Styles: gradients, effects, and type styles that combine several properties."],
    both: "Yes. Figma says variables are additive, not a replacement. Variables can be applied to styles; styles cannot be applied to variables.",
    mistake: "Converting everything to variables and losing gradients and effects, or keeping colours as styles and being unable to add a dark mode.",
    citations: [figmaCite.variablesVsStyles],
  },
  {
    id: "variables-vs-properties",
    title: "Variables vs component properties",
    difference: "Variables hold values used across a file. Component properties are the changeable aspects of one component: variant, boolean, instance swap, text and slot.",
    whenEach: ["Variables: colour, spacing and other decisions shared by many components.", "Properties: what a person using this component is allowed to change."],
    both: "Yes. A component's properties control its options; its colours and spacing come from variables.",
    mistake: "Making a variant for every combination when a boolean or instance-swap property would do.",
    citations: [figmaCite.properties, figmaCite.variables],
  },
  {
    id: "slides-vs-other",
    title: "Slides vs other presentation tools",
    difference: "Slides can hold playable prototypes and live Figma objects, and has a Design Mode with Figma's design tools.",
    whenEach: ["Slides: presenting work that lives in Figma.", "Another tool: when the audience must edit the deck there, or the organisation requires it."],
    both: "You can export, but the live prototypes are the reason to use Slides.",
    mistake: "Pasting screenshots of a prototype into slides when the audience could have tried it.",
    citations: [fig("Figma, Slides", "https://www.figma.com/slides/")],
  },
];

// --- Recipes -------------------------------------------------------------------

export interface FigmaRecipe {
  id: string;
  title: string;
  note?: string;
  steps: { tool: string; action: string }[];
}

export const figmaRecipes: FigmaRecipe[] = [
  {
    id: "research",
    title: "User research",
    steps: [
      { tool: "FigJam", action: "Capture notes from each session" },
      { tool: "FigJam", action: "Affinity-map as a team" },
      { tool: "Figma Design", action: "Turn findings into flows" },
      { tool: "Figma Design", action: "Prototype" },
      { tool: "Slides", action: "Research and design readout" },
    ],
    note: "For ongoing research with many contributors, a dedicated research tool keeps evidence linked better than a board.",
  },
  {
    id: "workshop",
    title: "Workshop",
    steps: [
      { tool: "Shortcut", action: "Decide whether it needs a workshop at all" },
      { tool: "FigJam", action: "Prepare the board and agenda" },
      { tool: "FigJam", action: "Run the session" },
      { tool: "FigJam", action: "Sort, summarise and record decisions" },
      { tool: "Figma Design", action: "Design from the decisions" },
    ],
  },
  {
    id: "design-to-dev",
    title: "Design to development",
    steps: [
      { tool: "Figma Design", action: "Build with components and variables" },
      { tool: "Figma Design", action: "Clean the file" },
      { tool: "Dev Mode", action: "Mark ready, annotate, hand over" },
      { tool: "Code Connect", action: "Map to real components, if you have them" },
      { tool: "Developer", action: "Implement, and compare changes on updates" },
    ],
  },
  {
    id: "ai-prototype",
    title: "AI prototype",
    steps: [
      { tool: "Figma Design", action: "Prepare the key screen and system" },
      { tool: "Figma Make", action: "Create the interactive prototype" },
      { tool: "You", action: "Test with users" },
      { tool: "Figma Design", action: "Refine from what you learned" },
    ],
  },
  {
    id: "figma-and-ai",
    title: "Figma with other AI tools",
    note: "One possible sequence. No single workflow fits every team.",
    steps: [
      { tool: "An AI assistant", action: "Help structure the requirements" },
      { tool: "Figma Design", action: "Visual design" },
      { tool: "Figma agent", action: "Explore and edit" },
      { tool: "Figma Make", action: "Working prototype" },
      { tool: "Shortcut", action: "QA with Before You Send It" },
      { tool: "Dev Mode", action: "Developer implementation" },
    ],
  },
];

// --- AI in Figma ---------------------------------------------------------------

export const figmaAiCapabilities = [
  {
    id: "content",
    name: "Replace and rewrite content",
    useFor: "Realistic placeholder text, and resizing copy to fit.",
    dontRelyOn: "Final copy or facts about your product.",
    workflow: "Replace lorem ipsum on a screen, then check the layout with the longest strings.",
    verify: "That every label is true for your product.",
  },
  {
    id: "translate",
    name: "Translate text",
    useFor: "Seeing how a layout copes with another language's length.",
    dontRelyOn: "Translation you will ship.",
    workflow: "Translate a screen into your longest supported language and fix what overflows.",
    verify: "Have a fluent speaker review anything that ships.",
  },
  {
    id: "images",
    name: "Generate and edit images",
    useFor: "Placeholder imagery, background removal, upscaling.",
    dontRelyOn: "Brand imagery, or anything needing rights clearance.",
    workflow: "Generate stand-in images so reviewers react to layout, not grey boxes.",
    verify: "Rights, brand fit, and that generated people and products are not misleading.",
  },
  {
    id: "first-draft",
    name: "First Draft",
    useFor: "Getting past a blank canvas, or seeing a typical layout to react against.",
    dontRelyOn: "A design. It is a typical screen, not yours.",
    workflow: "Generate a draft, list what is wrong with it for your users, and design from that list.",
    verify: "Against the AI-look signals, and against your design system.",
  },
  {
    id: "agent",
    name: "The agent",
    useFor: "Bulk edits, variations and applying library guidance.",
    dontRelyOn: "Judgement about hierarchy or what to build.",
    workflow: "Write two or three library guidelines, ask for a screen, and check each guideline was followed.",
    verify: "Detached instances, off-system values and anything it invented.",
  },
];

// --- Design system and file hygiene ---------------------------------------------

export const figmaSystemSteps = [
  { title: "Foundations first", body: "Decide colour, spacing, type, radius and elevation before any component.", href: "/cheat-sheets/spacing", link: "Spacing cheat sheet" },
  { title: "Raw values as primitive variables", body: "One collection for the palette and the scales. Nothing in a design should point at these directly.", href: "/cheat-sheets/design-tokens", link: "Design Tokens cheat sheet" },
  { title: "Semantic variables that alias them", body: "Name by role: background, text, border, action. These are what designs use.", href: "/explorer/design-tokens", link: "How SGDS layers its tokens" },
  { title: "Modes for contexts", body: "Light and dark, density, or brand: each a mode of the semantic collection.", href: "/figma#variables-vs-styles", link: "Variables vs styles" },
  { title: "Styles for what variables cannot hold", body: "Gradients, effects and type styles that combine properties.", href: "/figma#variables-vs-styles", link: "Variables vs styles" },
  { title: "Components, smallest first", body: "Build with auto layout and variables so they resize and re-theme.", href: "/cheat-sheets/figma-components", link: "Components cheat sheet" },
  { title: "Properties before variants", body: "Use boolean, text and instance-swap properties for options; variants for real differences in state or size.", href: "/figma#variables-vs-properties", link: "Variables vs component properties" },
  { title: "Publish as a library", body: "One file as the source. Libraries need a paid plan.", href: "/cheat-sheets/figma-components#figma-libraries", link: "Libraries" },
  { title: "Name for the people using it", body: "Names a newcomer could search for. Match the names in code.", href: "/cheat-sheets/design-handoff", link: "Design Handoff cheat sheet" },
  { title: "Document when to use each", body: "A component nobody knows when to use gets rebuilt.", href: "/explorer", link: "How other systems document theirs" },
];

export const figmaHandoverChecklist = [
  { group: "Structure", items: ["Pages are named and ordered: final screens, explorations, archive", "Explorations are separated from what should be built", "Frames have names a developer could search for", "Sections group flows that belong together"] },
  { group: "Components", items: ["No detached instances that should be components", "No one-off components that duplicate a library one", "Variants and properties are named consistently", "Unused local components and styles are removed"] },
  { group: "Values", items: ["Colours, spacing and radii come from variables or styles", "No near-duplicate values", "Text uses type styles"] },
  { group: "Behaviour", items: ["Prototypes start from an obvious frame and can be followed", "Every state is drawn, including empty, loading and error", "Responsive behaviour is shown or annotated", "Frames to build are marked ready for dev"] },
];

// --- Cheat sheets ----------------------------------------------------------------

/** `writtenLater` marks entries written on 9 October 2026, after the first review pass. */
const entry = ({ dateReviewedOverride, ...input }: Omit<CraftEntry, "dateReviewed" | "kind"> & { kind?: CraftEntry["kind"]; dateReviewedOverride?: boolean }): CraftEntry => ({
  kind: "craft-guidance",
  dateReviewed: dateReviewedOverride ? "2026-10-09" : VERIFIED,
  ...input,
});

const f = {
  sizing: entry({
    id: "auto-layout-sizing",
    title: "Hug, Fill or Fixed",
    safeStartingPoint: "Hug the content",
    summary: "Every layer in an auto layout frame resizes one of three ways on each axis. Most layout problems are the wrong one of these.",
    why: "Choosing how each layer resizes is the whole of responsive behaviour in Figma. Get it right and the frame survives new content and new widths.",
    scale: [
      { value: "Hug", label: "As small as its content", use: "Buttons, tags, labels: anything whose size should follow its text." },
      { value: "Fill", label: "Take the space available", use: "Inputs in a form, the main column beside a sidebar, items that should share a row equally." },
      { value: "Fixed", label: "Stay this size", use: "Icons, avatars, sidebars with a set width." },
    ],
    commonMistakes: ["Fixed widths everywhere, so nothing responds.", "Fill inside a Hug parent, which has no space to fill.", "A button set to Fixed that clips when the label is translated."],
    mentorNote: "Type a much longer label into the component. If it breaks, the sizing is wrong.",
    official: [
      { text: "Hug: the object resizes based on its child objects, keeping the smallest possible dimensions around them.", citation: figmaCite.autoLayout },
      { text: "Fill: layers stretch to occupy all available space in their parent frame, while respecting spacing values.", citation: figmaCite.autoLayout },
      { text: "Fixed: dimensions stay unchanged regardless of changes to surrounding spacing.", citation: figmaCite.autoLayout },
    ],
  }),
  flow: entry({
    id: "auto-layout-flow",
    title: "Direction, wrap and grid",
    summary: "An auto layout frame arranges its children horizontally, vertically or in a grid, and can wrap them when they run out of room.",
    why: "Direction and wrap decide what happens at narrow widths, which is what a developer will build with flexbox or grid.",
    scale: [
      { value: "Horizontal", label: "Along the x-axis", use: "Toolbars, button groups, a label beside its icon." },
      { value: "Vertical", label: "Along the y-axis", use: "Forms, lists, page sections." },
      { value: "Wrap", label: "Onto a new row or column", use: "Tags, card galleries, anything that should reflow." },
      { value: "Grid", label: "Columns and rows", use: "Galleries and dashboard layouts." },
    ],
    whenToDeviate: "Use absolute position only for things that genuinely float over a layout, such as a badge on an avatar.",
    commonMistakes: ["Deeply nested frames where one with wrap would do.", "Absolute positioning used to dodge a layout problem."],
    official: [
      { text: "Wrap moves child objects to a new row or column when they no longer fit in the frame.", citation: figmaCite.autoLayout },
      { text: "Grid flow places objects in columns and rows.", citation: figmaCite.autoLayout },
      { text: "Vertical auto layout can now wrap content into new columns (25 September 2026).", citation: figmaCite.releaseNotes },
    ],
  }),
  spacing: entry({
    id: "auto-layout-spacing",
    title: "Padding, gap and min/max",
    safeStartingPoint: "Values from your spacing scale",
    summary: "Padding is the space inside the frame's edge. Gap is the space between children. Min and max stop a frame growing or shrinking past a sensible size.",
    why: "These map directly to CSS, so using scale values here is what keeps the built product on your spacing system.",
    commonMistakes: ["Spacer rectangles in place of gap.", "Different padding on each instance of the same card.", "No max width on text, so lines run the full width of a wide screen."],
    mentorNote: "Bind padding and gap to spacing variables and off-scale values stop appearing.",
    official: [
      { text: "Padding: empty space between the edge of a parent auto layout frame and its objects.", citation: figmaCite.autoLayout },
      { text: "Gap: the distance between or distribution of objects in an auto layout frame.", citation: figmaCite.autoLayout },
      { text: "Set minimum or maximum width and height on any auto layout frame and its children.", citation: figmaCite.autoLayout },
    ],
  }),
  variableBasics: entry({
    id: "figma-variables",
    title: "What variables hold",
    summary: "A variable stores one raw value: a colour, a number, a string or a boolean. Apply it wherever that value would otherwise be typed in.",
    why: "A value typed in a hundred places has to be changed in a hundred places. A variable is changed once.",
    scale: [
      { value: "Colour", label: "Solid fills and strokes", use: "Palette and semantic colours." },
      { value: "Number", label: "Any numeric property", use: "Spacing, radius, sizes." },
      { value: "String", label: "Text", use: "Copy that changes by language or context." },
      { value: "Boolean", label: "True or false", use: "Showing and hiding layers." },
    ],
    commonMistakes: ["Variables named after their value, such as blue-500, used directly in designs.", "A variable for every one-off value."],
    official: [
      { text: "Variables store reusable values that can be applied to all kinds of design properties and prototyping actions.", citation: figmaCite.variables },
      { text: "Variables can store single, raw values.", citation: figmaCite.variablesVsStyles },
    ],
  }),
  variableModes: entry({
    id: "figma-modes",
    title: "Collections, modes and aliases",
    safeStartingPoint: "Two collections",
    summary: "A common setup: a primitives collection of raw values, and a semantic collection that aliases them and carries the modes, such as light and dark.",
    why: "Designs point at the semantic layer, so switching a frame's mode re-themes everything without touching a component.",
    whenToDeviate: "Add a component-level collection only when one component needs values the semantic layer cannot express.",
    commonMistakes: ["Modes on the primitives, so every colour needs a dark twin.", "Designs pointing at primitives, which do not change with the mode."],
    official: [
      { text: "Use variables and modes to implement design tokens and switch designs between contexts such as light and dark themes.", citation: figmaCite.variables },
      { text: "If you want different contexts for your design elements, you will need variables and variable modes.", citation: figmaCite.variablesVsStyles },
    ],
  }),
  componentBasics: entry({
    id: "figma-components",
    title: "Main components and instances",
    summary: "A main component defines the element. Instances are linked copies that receive its updates and can be overridden in the ways you allow.",
    why: "The link is the value. A detached instance is a copy that will never be updated again.",
    whenToUse: ["The element appears more than twice.", "It needs to stay consistent as it changes.", "Developers have, or will have, a matching coded component."],
    whenNotToUse: ["A one-off layout.", "Something still being explored."],
    commonMistakes: ["Detaching to make a small change, instead of adding a property.", "Components made too early, then fought against.", "Several components that are really one with different properties."],
    mentorNote: "If people keep detaching a component, it is missing a property they need.",
    official: [
      { text: "A main component defines the properties of the component.", citation: figmaCite.components },
      { text: "An instance is a copy you can reuse. Instances are linked to the main component and receive any updates.", citation: figmaCite.components },
    ],
  }),
  componentProperties: entry({
    id: "figma-properties",
    title: "Variants and properties",
    safeStartingPoint: "Properties first",
    summary: "Properties are the parts of a component people may change. Use the lightest one that does the job, and keep variants for real differences.",
    why: "Every variant is a separate design to maintain. A boolean or text property changes one thing on the same design.",
    scale: [
      { value: "Variant", label: "A different version", use: "States, sizes and types that look structurally different." },
      { value: "Boolean", label: "Show or hide a layer", use: "An optional icon, a helper text." },
      { value: "Instance swap", label: "Replace a nested instance", use: "Which icon, which avatar." },
      { value: "Text", label: "Editable text", use: "Labels and content." },
      { value: "Slot", label: "A free area", use: "Content the component cannot predict." },
    ],
    commonMistakes: ["A variant for every combination, giving dozens of near-identical designs.", "Property names that differ from the names in code."],
    official: [
      { text: "Component properties are the changeable aspects of a component.", citation: figmaCite.properties },
      { text: "Variant properties define the different variations of a component, such as states, sizes or colours.", citation: figmaCite.properties },
      { text: "Slots are flexible areas that let you add and arrange content directly inside an instance.", citation: figmaCite.properties },
    ],
  }),
  libraries: entry({
    id: "figma-libraries",
    title: "Libraries",
    summary: "A library is a file whose components, styles and variables are published for use in other files. Updates are offered to each file, and an editor accepts or ignores them.",
    why: "One source of truth only works if there is one file everyone draws from.",
    commonMistakes: ["Copying components between files instead of publishing.", "Publishing work in progress.", "Ignoring updates for months, then facing them all at once."],
    official: [
      { text: "A library is a collection of design assets, like components, styles, and variables.", citation: figmaCite.libraries },
      { text: "Figma makes an update available in every file where the asset is used; anyone with edit access can review and accept or ignore it.", citation: figmaCite.libraries },
      { text: "Available on all paid plans.", citation: figmaCite.libraries },
    ],
  }),
  devMode: entry({
    id: "figma-dev-mode",
    title: "What Dev Mode is for",
    dateReviewedOverride: true,
    summary: "Dev Mode is the view developers use to read a design: sizes, properties, generated code, assets and what changed. It only helps them if the file was prepared for it.",
    why: "A developer in Dev Mode sees exactly what you built, including the detached instances and hard-coded values. The file is the spec.",
    whenToUse: ["The design is decided and someone is about to build it.", "Developers need to compare a frame with its previous version.", "You want design linked to tickets, documentation or code components."],
    commonMistakes: ["Handing over a link to a whole file with nothing marked ready.", "Explorations and final screens on the same page.", "Values that are not variables, so the developer sees a hex code with no name."],
    mentorNote: "Open your own file in Dev Mode before you send it. What a developer will see is rarely what you think you made.",
    official: [
      { text: "Dev Mode is a developer-focused workspace for inspecting designs, viewing properties and generated code, downloading assets, comparing changes and managing design handoff.", citation: figmaCite.devMode },
      { text: "Available on all paid plans, and requires a Full or a Dev seat.", citation: figmaCite.devMode },
      { text: "Developers can compare frame versions, explore all variants in a component set without editing the file, and link designs to tickets, documentation and code components.", citation: figmaCite.devMode },
    ],
  }),
  readyForDev: entry({
    id: "figma-ready-for-dev",
    title: "Marking work ready for development",
    dateReviewedOverride: true,
    safeStartingPoint: "One section per deliverable",
    summary: "Ready for dev is a status, not a feeling. Mark the frames that are decided, group them in a section, and leave everything else unmarked.",
    why: "It tells a developer where to look and what to ignore, and it gives you a record of what you actually handed over.",
    commonMistakes: ["Marking a whole page ready when half of it is still being discussed.", "Changing a ready frame without saying so.", "No annotation on behaviour that a static frame cannot show."],
    official: [
      { text: "Select a frame, component, instance or section and mark it as ready for dev. Objects marked ready appear under Ready for development in the Dev Mode layers panel.", citation: figmaCite.devMode },
      { text: "Anyone can group related content into sections and mark sections as ready for development. Dev Mode prioritises content in a section.", citation: figmaCite.devMode },
      { text: "The navigation panel shows when a frame was last edited.", citation: figmaCite.devMode },
    ],
  }),
  prototypeFlows: entry({
    id: "figma-prototype-flows",
    title: "Flows and starting points",
    dateReviewedOverride: true,
    safeStartingPoint: "One flow per task",
    summary: "A flow is one path through your frames with a named place to start. Make one for each task you want someone to try, not one prototype of everything.",
    why: "A test participant or stakeholder needs to start in the right place and reach an end. A flow per task makes each one a link you can send.",
    commonMistakes: ["One enormous prototype with no clear start.", "Flows named Flow 1, Flow 2.", "Dead ends where a tap does nothing and the participant thinks it is broken."],
    official: [
      { text: "A flow is the network of frames and connections in a single page. A prototype can map a whole journey or focus on one segment through its own flow.", citation: figmaCite.prototyping },
      { text: "Figma creates a flow starting point when you add the first connection between two frames.", citation: figmaCite.prototyping },
      { text: "You can share the entire prototype or copy the link to a flow starting point.", citation: figmaCite.prototyping },
      { text: "Supported on any team or plan. Anyone with can-view access can play prototypes back in Presentation view.", citation: figmaCite.prototyping },
    ],
  }),
  prototypeScope: entry({
    id: "figma-prototype-scope",
    title: "How much to prototype",
    dateReviewedOverride: true,
    summary: "Prototype what you need an answer about, and nothing else. A prototype is a question put to a user or a stakeholder.",
    why: "Every connection you add has to be maintained when the design changes. A prototype of everything is out of date within a week.",
    scale: [
      { value: "Clickable", label: "Does the flow make sense?", use: "Plain taps between frames. Enough for most usability tests." },
      { value: "Interactive", label: "Does the component feel right?", use: "Hover, press and variants on one component, built once in the component." },
      { value: "Detailed", label: "Does the motion matter?", use: "Timing and transitions, only where the motion is the thing being decided." },
    ],
    commonMistakes: ["Polishing transitions before the flow has been tested.", "Testing one fixed frame size and calling the design responsive.", "Using a prototype to show developers behaviour that an annotation would explain better."],
    mentorNote: "If nobody is going to click it, do not wire it.",
  }),
  systemSetup: entry({
    id: "figma-system-setup",
    title: "Setting up a design system file, in order",
    dateReviewedOverride: true,
    safeStartingPoint: "Foundations before components",
    summary: "The order matters more than the tooling. Each step depends on the one before, and skipping ahead to components is why most libraries get rebuilt.",
    why: "A component built before its variables exist carries hard-coded values that someone has to find and replace later.",
    scale: figmaSystemSteps.map((step, index) => ({ value: String(index + 1), label: step.title, use: step.body })),
    commonMistakes: ["Starting with a button.", "Designs that point at primitive variables directly.", "A library nobody is told how to use."],
    mentorNote: "A design system is finished when someone new can use it without asking you.",
    official: [
      { text: "A main component defines the properties of the component. Instances are linked to it and receive any updates.", citation: figmaCite.components },
    ],
  }),
} satisfies Record<string, CraftEntry>;

export const figmaSheets: CheatSheet[] = [
  {
    slug: "figma-auto-layout",
    title: "Figma Auto Layout",
    description: "Hug, Fill and Fixed; direction and wrap; padding, gap and min/max.",
    group: "Figma",
    dateUpdated: VERIFIED,
    sections: [
      { id: "sizing", title: "Sizing", rules: [], entries: [f.sizing] },
      { id: "flow", title: "Flow", rules: [], entries: [f.flow] },
      { id: "spacing", title: "Spacing", rules: [], entries: [f.spacing] },
    ],
  },
  {
    slug: "figma-variables",
    title: "Figma Variables",
    description: "What variables hold, and how collections, modes and aliases fit together.",
    group: "Figma",
    dateUpdated: VERIFIED,
    sections: [
      { id: "basics", title: "Basics", rules: [], entries: [f.variableBasics] },
      { id: "structure", title: "Structure", rules: [], entries: [f.variableModes] },
    ],
  },
  {
    slug: "figma-components",
    title: "Figma Components",
    description: "Main components and instances, variants and properties, and libraries.",
    group: "Figma",
    dateUpdated: VERIFIED,
    sections: [
      { id: "basics", title: "Components", rules: [], entries: [f.componentBasics] },
      { id: "properties", title: "Variants and properties", rules: [], entries: [f.componentProperties] },
      { id: "libraries", title: "Libraries", rules: [], entries: [f.libraries] },
    ],
  },
  {
    slug: "figma-dev-mode",
    title: "Figma Dev Mode",
    description: "What developers see in Dev Mode, and how to mark work ready for them.",
    group: "Figma",
    dateUpdated: "2026-10-09",
    sections: [
      { id: "basics", title: "Dev Mode", rules: [], entries: [f.devMode] },
      { id: "ready", title: "Ready for development", rules: [], entries: [f.readyForDev] },
    ],
  },
  {
    slug: "figma-prototyping",
    title: "Figma Prototyping",
    description: "Flows, starting points, and how much of a design is worth wiring up.",
    group: "Figma",
    dateUpdated: "2026-10-09",
    sections: [
      { id: "flows", title: "Flows", rules: [], entries: [f.prototypeFlows] },
      { id: "scope", title: "Scope", rules: [], entries: [f.prototypeScope] },
    ],
  },
  {
    slug: "figma-design-system-setup",
    title: "Figma Design System Setup",
    description: "The order to build a design system file in, from foundations to a published library.",
    group: "Figma",
    dateUpdated: "2026-10-09",
    sections: [{ id: "order", title: "The order", rules: [], entries: [f.systemSetup] }],
  },
];

/** Cheat sheets from the brief that are not written yet. */
export const plannedFigmaSheets: string[] = [];
