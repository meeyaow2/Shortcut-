import type { AiTool, AiUpdateDetail, AiWorkflow, Lesson, ToolComparison, Update } from "@/types";
import { VERIFIED } from "./citations";

/**
 * AI + Design content.
 *
 * - Updates and tool descriptions restate each vendor's own release notes or
 *   documentation, checked on VERIFIED. Nothing is described from memory.
 * - Workflows, "good for / less suitable for", comparisons and lessons are
 *   Shortcut editorial and are labelled as craft guidance in the UI.
 * - AI content dates quickly. Records older than AI_REVIEW_AFTER_DAYS without
 *   a re-check are shown as "Needs review".
 */
export const AI_REVIEW_AFTER_DAYS = 30;

// --- Updates -----------------------------------------------------------------

/** AI detail for updates that already exist in updates.ts, by id. */
export const aiDetails: Record<string, AiUpdateDetail> = {
  "figma-agent-ga": {
    updateType: "Now generally available",
    useFor: ["Applying your library's guidelines to generated frames", "Finding existing files and designs from a chat", "Repetitive file work, such as renaming and tidying"],
    carefulWith: ["Guidelines that are vague or missing: the agent can only follow what you wrote", "Accepting generated frames without a design review"],
    workflow: "Write two or three guidelines for one library, such as which button variant is primary. Ask the agent for a screen that uses it, then check each guideline was followed.",
  },
  "figma-motion": {
    updateType: "New capability",
    useFor: ["Defining standard durations and easings once, as animation styles", "Having the agent apply those styles consistently"],
    carefulWith: ["Motion added because it is easy, not because it explains a change", "Reduced-motion behaviour, which you still have to specify"],
    workflow: "Create three animation styles for your product: quick, standard and emphasised. Apply them to one flow and remove any animation that does not show what changed.",
  },
};

const FIGMA_NOTES = "https://www.figma.com/release-notes/";

/** A Figma update with no AI angle; it lives here only to sit beside the other Figma release notes. */
export const figmaOnlyUpdates: Update[] = [
  {
    id: "figma-vertical-wrap",
    title: "Vertical wrap available in auto layout",
    sourceId: "figma",
    category: "Tools",
    kind: "tool",
    datePublished: "2026-09-25",
    dateVerified: VERIFIED,
    summary: "Vertical auto layout can now wrap content into new columns, mirroring CSS flexbox behaviour.",
    whyItMatters: "Layouts that flow down and then across can be built with auto layout instead of faked with fixed frames.",
    designerAction: "Nothing has to change. Try it on any list you currently split into columns by hand.",
    sourceUrl: FIGMA_NOTES,
  },
];

/** Updates that exist only because of their AI relevance. */
export const aiUpdates: Update[] = [
  {
    id: "v0-team-workspaces",
    title: "v0 personal accounts are now team workspaces",
    sourceId: "v0",
    category: "AI",
    kind: "tool",
    datePublished: "2026-10-06",
    dateVerified: VERIFIED,
    summary: "Personal v0 accounts have been converted to team workspaces, which makes collaboration features available to every user.",
    whyItMatters: "A prototype built from a prompt no longer has to live in one person's account. Others can open and continue it.",
    designerAction: "If you prototype in v0, check who can now see your existing projects, and share one with a developer to test the handover.",
    sourceUrl: "https://v0.app/changelog",
    ai: {
      updateType: "Changed",
      useFor: ["Sharing a working prototype with a developer", "Reviewing a generated prototype as a team"],
      carefulWith: ["Projects that were private by assumption", "Treating a shared prototype as production code"],
      workflow: "Open one prototype, invite the engineer who would build it, and ask what they would keep and what they would rewrite.",
    },
  },
  {
    id: "framer-skills",
    title: "Framer adds Skills for its agent",
    sourceId: "framer",
    category: "AI",
    kind: "tool",
    datePublished: "2026-09-22",
    dateVerified: VERIFIED,
    summary: "Skills let you save instructions for your design system, writing style or CMS workflow and reuse them across tasks. The agent can reference pages, components and styles in your project.",
    whyItMatters: "Reusable instructions are how you stop an agent re-deciding your design system on every request.",
    designerAction: "After refining a page, ask the agent to capture the decisions as a skill, then test it on a new page.",
    sourceUrl: "https://www.framer.com/updates/skills",
    ai: {
      updateType: "New capability",
      useFor: ["Keeping generated pages on your design system", "A consistent writing style across pages", "Repeatable CMS tasks"],
      carefulWith: ["Skills that encode a one-off decision as a rule", "Assuming a skill was followed without checking the result"],
      workflow: "Write a skill that names your heading styles and spacing between sections. Generate a new page with it and compare against a page you built by hand.",
    },
  },
  {
    id: "figma-weave-node",
    title: "Figma designs can feed Weave workflows",
    sourceId: "figma",
    category: "AI",
    kind: "tool",
    datePublished: "2026-09-17",
    dateVerified: VERIFIED,
    summary: "A Figma node connects designs made in Figma Design to Figma Weave workflows. You choose which text and image layers become workflow inputs.",
    whyItMatters: "On-brand variations can be produced from a layout you designed, without the layout itself being regenerated.",
    designerAction: "Pick one template with clear text and image slots and try it as a workflow input before relying on it for a campaign.",
    sourceUrl: FIGMA_NOTES,
    ai: {
      updateType: "New capability",
      useFor: ["Producing content variations from a fixed layout", "Keeping generated assets inside brand templates"],
      carefulWith: ["Text that is longer than the layout allows", "Generated images that need rights or brand review"],
      workflow: "Mark the layers that may change, run five variations, and check each for overflow and off-brand imagery.",
    },
  },
  {
    id: "claude-designs-in-conversation",
    title: "Claude can create designs, decks and docs in any conversation",
    sourceId: "claude",
    category: "AI",
    kind: "tool",
    datePublished: "2026-09-16",
    dateVerified: VERIFIED,
    summary: "You can ask for designs, decks or documents in any Claude conversation. The release notes describe Claude Design as offering on-canvas editing and importing your design system.",
    whyItMatters: "Importing a design system is the difference between a generic mock-up and one that starts from your components and tokens.",
    designerAction: "Import your design system before asking for a screen, and check the result for values that are not in it.",
    sourceUrl: "https://support.claude.com/en/articles/12138966-release-notes",
    ai: {
      updateType: "New capability",
      useFor: ["Early layout exploration from a written brief", "Decks and documents that explain a design", "Variations on a screen using your own system"],
      carefulWith: ["Invented colours, radii or spacing that are not in your system", "Unsupported accessibility claims in generated explanations", "Treating a first draft as a finished design"],
      workflow: "Import your system, describe one screen with its user and task, then ask for a list of every token and component used. Anything unlisted is a deviation.",
    },
  },
  {
    id: "cursor-start-without-repo",
    title: "Cursor cloud agents can start without a repository",
    sourceId: "cursor",
    category: "AI",
    kind: "tool",
    datePublished: "2026-08-27",
    dateVerified: VERIFIED,
    summary: "Cloud agents now work without an external source-control connection. The changelog lists a live preview in the browser and access to design mode.",
    whyItMatters: "Starting a coded prototype no longer needs a repository set up first, which was the step that stopped many designers.",
    designerAction: "Try one interaction prototype from scratch, and note where you needed a developer's help.",
    sourceUrl: "https://cursor.com/changelog",
    ai: {
      updateType: "New capability",
      useFor: ["Interaction prototypes that a static tool cannot show", "Testing a responsive layout in a real browser"],
      carefulWith: ["Prototype code being mistaken for production code", "Accessibility, which generated code often gets wrong"],
      workflow: "Describe one interaction in plain language with its states, watch it in the live preview, then test it by keyboard.",
    },
  },
];

// --- Workflows ---------------------------------------------------------------

export const aiWorkflows: AiWorkflow[] = [
  {
    id: "discovery",
    stage: "Discovery",
    useWhen: "You are framing a problem and planning how to learn about it.",
    goodUse: "\"List the assumptions my research plan depends on, and which questions my method cannot answer.\"",
    weakUse: "\"Tell me what users of this product want.\"",
    inputNeeded: ["The decision the research should inform", "Your draft plan and questions", "What you already know, and how you know it"],
    promptId: "research-plan",
    reviewAfter: ["Whether flagged assumptions are real", "Whether suggested methods fit your access to participants", "Any competitor facts, against the competitor's own site"],
    designerOwns: ["Defining the problem", "Choosing who to talk to", "Deciding what counts as evidence"],
    commonFailure: "Treating a model's description of users as research. It is a summary of what is commonly written, not of your users.",
  },
  {
    id: "research",
    stage: "Research",
    useWhen: "You have raw notes or transcripts and need a first pass at structure.",
    goodUse: "\"Group these notes into candidate themes, with participant IDs and exact quotes for each.\"",
    weakUse: "\"Summarise how participants felt.\"",
    inputNeeded: ["Notes with a participant ID on each", "The research questions", "Consent to process the data in that tool"],
    promptId: "synthesis-themes",
    reviewAfter: ["Every quote against the source", "The count of participants behind each theme", "Notes left unsorted"],
    designerOwns: ["Validating themes against the source material", "Judging what matters", "Protecting participant data"],
    commonFailure: "Invented sentiment. A model will say participants were frustrated when the notes only say what they did.",
    warning: "AI must not invent participant sentiment. Check your organisation's rules before putting participant data into any AI tool.",
  },
  {
    id: "information-architecture",
    stage: "Information architecture",
    useWhen: "You have a draft structure and want it challenged before testing with people.",
    goodUse: "\"For each of these tasks, which top-level item would a new user open, and where are two items plausible?\"",
    weakUse: "\"Create the sitemap for my product.\"",
    inputNeeded: ["The structure as an indented list", "Who the users are", "Their top tasks"],
    promptId: "ia-grouping",
    reviewAfter: ["Whether predicted paths match a real tree test", "Labels flagged as jargon, with someone outside the team"],
    designerOwns: ["The mental model you are designing for", "Final names and groupings", "Testing with real users"],
    commonFailure: "A tidy, symmetrical structure that matches no one's mental model.",
  },
  {
    id: "user-flows",
    stage: "User flows",
    useWhen: "The happy path is drawn and you need to find what you missed.",
    goodUse: "\"Identify edge cases I may have missed at each step.\"",
    weakUse: "\"Design the entire product flow for me.\"",
    inputNeeded: ["Numbered steps", "The user and their goal", "Fixed constraints: platform, permissions, sign-in"],
    promptId: "flow-edge-cases",
    reviewAfter: ["Cases your constraints make impossible", "Priorities, with product and engineering"],
    designerOwns: ["Understanding user needs", "Prioritisation", "Product constraints", "Final flow decisions"],
    commonFailure: "Accepting an added step for every edge case, until the flow is longer than the problem.",
  },
  {
    id: "wireframes",
    stage: "Wireframes",
    useWhen: "You want to check content and structure before drawing.",
    goodUse: "\"List the information this page needs, in priority order, and the states it must handle.\"",
    weakUse: "\"Generate the wireframe.\"",
    inputNeeded: ["The page and its purpose", "Where the user comes from and what they do next"],
    promptId: "wireframe-content",
    reviewAfter: ["Whether the priority order is right for your users", "States against real data conditions"],
    designerOwns: ["What the page is for", "Layout decisions", "What to leave out"],
    commonFailure: "Treating a generated wireframe as a design. It is a typical page, not your page.",
  },
  {
    id: "ui-design",
    stage: "UI design",
    useWhen: "You have a design and want critique, or want variations inside your system.",
    goodUse: "\"Review this screen. Type every finding as standard, design-system, convention, craft or preference.\"",
    weakUse: "\"Make this look more modern.\"",
    inputNeeded: ["The screen", "Product type, user and task", "Your design system's tokens and components"],
    promptId: "design-review",
    reviewAfter: ["Any standard it cites", "Contrast and sizes, measured", "Values that are not in your system"],
    designerOwns: ["Visual direction", "Which critique to act on", "Final design decisions"],
    commonFailure: "Generic generated UI: cards everywhere, large radii, a gradient. See the AI-look signals.",
  },
  {
    id: "ux-writing",
    stage: "UX writing",
    useWhen: "You need consistent labels, errors and empty states across a product.",
    goodUse: "\"Write one error message per validation rule, saying what is wrong and how to fix it.\"",
    weakUse: "\"Write friendly copy for my app.\"",
    inputNeeded: ["The real validation rules and states", "Voice and length limits", "Existing copy to match"],
    promptId: "ux-writing-errors",
    reviewAfter: ["Each message against what the system actually checks", "Tone, read aloud", "Length in your longest supported language"],
    designerOwns: ["Voice", "Whether the message is true", "Terminology across the product"],
    commonFailure: "Copy that sounds fine and describes behaviour the system does not have.",
  },
  {
    id: "accessibility",
    stage: "Accessibility",
    useWhen: "You want to catch likely issues during design, before a proper test.",
    goodUse: "\"List likely WCAG 2.2 AA failures in this design, and separately what cannot be judged from a static image.\"",
    weakUse: "\"Is this accessible?\"",
    inputNeeded: ["The design", "Platform", "The standard and level you are held to"],
    promptId: "a11y-first-pass",
    reviewAfter: ["Every cited criterion, in WCAG itself", "Contrast pairs, measured", "Everything on the must-test list, with real assistive technology"],
    designerOwns: ["Meeting the standard", "Testing with assistive technology", "Involving disabled users"],
    commonFailure: "Unsupported claims: invented criteria, or \"passes AA\" based on a guess at contrast.",
    warning: "An AI accessibility review does not replace accessibility testing. It cannot operate a screen reader, a keyboard or a switch.",
  },
  {
    id: "prototyping",
    stage: "Prototyping",
    useWhen: "You need to feel an interaction or test a flow that static frames cannot show.",
    goodUse: "\"Build this one interaction with these states, so I can test it.\"",
    weakUse: "\"Build my app.\"",
    inputNeeded: ["The interaction and its states, in plain language", "Your tokens and components", "What you want to learn from the prototype"],
    promptId: "ds-follow-system",
    reviewAfter: ["Whether it follows your system", "Keyboard operation", "Behaviour at small widths"],
    designerOwns: ["What the prototype is for", "What you conclude from it", "Being clear it is not production code"],
    commonFailure: "A convincing prototype that quietly introduced its own colours, spacing and components.",
  },
  {
    id: "design-qa",
    stage: "Design QA",
    useWhen: "The design is nearly done and you want a systematic last pass.",
    goodUse: "\"List the states missing from each component, and what triggers each.\"",
    weakUse: "\"Check my design.\"",
    inputNeeded: ["An inventory of components and screens", "The states you have designed", "Your tokens"],
    promptId: "qa-states",
    reviewAfter: ["States that do not apply to your product", "Reported inconsistencies, in the file itself"],
    designerOwns: ["Deciding which inconsistencies are intentional", "The standard the work is held to"],
    commonFailure: "Trusting pixel measurements read from a screenshot. Models estimate spacing and size poorly.",
  },
  {
    id: "handoff",
    stage: "Handoff",
    useWhen: "The design is settled and needs writing up for the people building it.",
    goodUse: "\"Document this component's behaviour. Put anything I have not specified under open questions.\"",
    weakUse: "\"Write the spec.\"",
    inputNeeded: ["Annotated frames or a description", "States and interactions you have decided", "Breakpoints"],
    promptId: "handoff-behaviour",
    reviewAfter: ["Every line: did you decide it?", "The open questions, answered by you"],
    designerOwns: ["The behaviour", "Answering open questions", "The conversation with the developer"],
    commonFailure: "A complete-looking spec in which the model filled the gaps with plausible behaviour nobody chose.",
  },
];

/** What stays with the designer, whatever the stage. */
export const designerStillOwns = [
  "Defining the problem",
  "Understanding users",
  "Context",
  "Prioritisation",
  "Product judgement",
  "Trade-offs",
  "Ethical decisions",
  "Final design decisions",
];

// --- Tools -------------------------------------------------------------------

export const aiToolJobs = ["Research", "UI generation", "Prototyping", "Coding", "Design critique", "UX writing", "Images", "Accessibility", "Documentation"];

const tool = (input: Omit<AiTool, "pricing" | "dateVerified">): AiTool => ({ pricing: null, dateVerified: VERIFIED, ...input });

// Alphabetical by name. Every tool uses the same fields, from its own vendor's pages.
export const aiTools: AiTool[] = [
  tool({
    id: "firefly",
    name: "Adobe Firefly",
    vendor: "Adobe",
    jobs: ["Images"],
    description: "Creates and edits images, videos, audio and vector graphics from text prompts. Adobe states its models are trained on licensed Adobe Stock and public-domain content.",
    goodFor: ["Placeholder and concept imagery", "Vector graphics from a description", "Work where the training source matters to your client"],
    lessSuitableFor: ["Interface layouts", "Imagery that must match an existing illustration style exactly"],
    workflowExample: "Generate three hero-image directions for a concept, pick one, and brief a designer or photographer from it.",
    difficulty: "Low",
    platform: "Web, and inside Adobe apps",
    officialUrl: "https://www.adobe.com/products/firefly.html",
    sourceLabel: "Adobe Firefly product page",
    sourceUrl: "https://www.adobe.com/products/firefly.html",
  }),
  tool({
    id: "claude",
    name: "Claude",
    vendor: "Anthropic",
    jobs: ["Design critique", "Research", "UX writing", "Documentation", "UI generation"],
    description: "A general assistant. Its release notes say you can ask for designs, decks or documents in any conversation, with on-canvas editing and importing your design system.",
    goodFor: ["Structured critique of a screen", "Organising research notes", "Edge cases, states and behaviour documentation", "UX copy from real rules"],
    lessSuitableFor: ["Measuring contrast or pixel values from an image", "Replacing an accessibility audit"],
    workflowExample: "Paste a flow and ask for edge cases per step, then ask for behaviour documentation with open questions listed separately.",
    difficulty: "Low",
    platform: "Web, desktop and mobile apps",
    officialUrl: "https://claude.ai/",
    sourceLabel: "Claude release notes",
    sourceUrl: "https://support.claude.com/en/articles/12138966-release-notes",
  }),
  tool({
    id: "cursor",
    name: "Cursor",
    vendor: "Anysphere",
    jobs: ["Coding", "Prototyping"],
    description: "A coding agent that understands a codebase, plans and builds features, fixes bugs and reviews changes. Its changelog lists a live browser preview and a design mode.",
    goodFor: ["Changing an existing codebase", "Prototypes that need real logic", "Working alongside developers in their tool"],
    lessSuitableFor: ["Designers with no code experience starting alone", "Quick visual exploration"],
    workflowExample: "Ask the agent to add one missing state to an existing component, review the diff with a developer, and test it in the preview.",
    difficulty: "High",
    platform: "Desktop app, with cloud agents",
    officialUrl: "https://cursor.com/",
    sourceLabel: "Cursor documentation and changelog",
    sourceUrl: "https://cursor.com/docs",
  }),
  tool({
    id: "dovetail",
    name: "Dovetail",
    vendor: "Dovetail",
    jobs: ["Research"],
    description: "A customer-research platform. It describes turning studies and transcripts into shared customer intelligence, with automatic analysis that structures feedback.",
    goodFor: ["A shared home for interviews and feedback", "First-pass analysis across many transcripts", "Keeping findings traceable to their source"],
    lessSuitableFor: ["One-off projects with a handful of notes", "Replacing your own reading of the transcripts"],
    workflowExample: "Upload a round of interviews, review the automatic analysis against the transcripts, and correct the themes before sharing.",
    difficulty: "Medium",
    platform: "Web",
    officialUrl: "https://dovetail.com/",
    sourceLabel: "Dovetail website and changelog",
    sourceUrl: "https://dovetail.com/changelog/",
  }),
  tool({
    id: "figma-ai",
    name: "Figma AI and the Figma agent",
    vendor: "Figma",
    jobs: ["UI generation", "UX writing", "Images"],
    description: "AI tools inside Figma Design: First Draft, rename layers, rewrite and translate text, replace content, add interactions, and image generation and editing. The agent can follow guidelines you set for your libraries. Figma notes that AI outputs may be misleading or wrong.",
    goodFor: ["Work that stays in your Figma file and libraries", "Realistic placeholder content", "Tidying files: naming, translating, resizing copy"],
    lessSuitableFor: ["Prototypes that need real data or logic", "Final copy without review"],
    workflowExample: "Replace lorem ipsum across a screen with realistic content, then check the layout with the longest strings.",
    difficulty: "Low",
    platform: "Figma Design",
    officialUrl: "https://www.figma.com/ai/",
    sourceLabel: "Figma Help, Use AI tools in Figma Design",
    sourceUrl: "https://help.figma.com/hc/en-us/articles/23870272542231-Use-AI-tools-in-Figma-Design",
  }),
  tool({
    id: "figma-make",
    name: "Figma Make",
    vendor: "Figma",
    jobs: ["Prototyping", "UI generation"],
    description: "A prompt-to-app tool that turns ideas and existing Figma designs into interactive apps. You can attach your designs, components and other files to a prompt. Figma notes it may include third-party content such as fonts, packages or images.",
    goodFor: ["Turning a designed frame into something clickable", "Designers who want to stay in Figma", "Exploring several solutions quickly"],
    lessSuitableFor: ["Changing an existing production codebase", "Anything you will publish without checking content rights"],
    workflowExample: "Attach a designed frame, ask for the interaction you cannot show statically, and test it with a colleague.",
    difficulty: "Low",
    platform: "Figma",
    officialUrl: "https://www.figma.com/make/",
    sourceLabel: "Figma Help, Explore Figma Make",
    sourceUrl: "https://help.figma.com/hc/en-us/articles/31304412302231-Explore-Figma-Make",
  }),
  tool({
    id: "framer",
    name: "Framer agent",
    vendor: "Framer",
    jobs: ["UI generation", "Prototyping"],
    description: "An agent inside Framer that can reference the pages, components and styles in your project. Skills let you save instructions for your design system, writing style or CMS workflow and reuse them.",
    goodFor: ["Websites you will publish from Framer", "Keeping generated pages on your own styles", "Repeated content and CMS tasks"],
    lessSuitableFor: ["Application UI with complex logic", "Teams whose site is not built in Framer"],
    workflowExample: "Save your section spacing and heading rules as a skill, generate a new page, and compare it with one you built by hand.",
    difficulty: "Low",
    platform: "Framer",
    officialUrl: "https://www.framer.com/",
    sourceLabel: "Framer updates, Skills",
    sourceUrl: "https://www.framer.com/updates/skills",
  }),
  tool({
    id: "lovable",
    name: "Lovable",
    vendor: "Lovable",
    jobs: ["Prototyping", "Coding"],
    description: "A full-stack AI development platform for building, iterating on and deploying web applications using natural language. Each project produces a codebase that can be synced to GitHub, GitLab or Bitbucket.",
    goodFor: ["A working app from a description, including a backend", "Founders and designers without an engineering team", "Prototypes you may hand to developers as code"],
    lessSuitableFor: ["Following an existing design system closely", "Fine visual control"],
    workflowExample: "Describe one end-to-end task, build it, and run a usability test on the working version.",
    difficulty: "Medium",
    platform: "Web",
    officialUrl: "https://lovable.dev/",
    sourceLabel: "Lovable documentation",
    sourceUrl: "https://docs.lovable.dev/introduction/welcome",
  }),
  tool({
    id: "stark",
    name: "Stark",
    vendor: "Stark",
    jobs: ["Accessibility"],
    description: "A suite of accessibility tools that integrates with Figma, FigJam, Sketch, browsers and GitHub. It describes continuous scanning of design files and code, with AI-powered suggestions.",
    goodFor: ["Checking accessibility where you already work", "Catching issues in the design file before build", "Tracking issues from design through to code"],
    lessSuitableFor: ["Replacing manual testing with assistive technology", "Judging whether a flow makes sense to a disabled user"],
    workflowExample: "Scan a file before handoff, fix what it finds, and list for the tester what a scan cannot check.",
    difficulty: "Low",
    platform: "Figma, FigJam, Sketch, browser extensions, GitHub",
    officialUrl: "https://www.getstark.co/",
    sourceLabel: "Stark website",
    sourceUrl: "https://www.getstark.co/",
  }),
  tool({
    id: "v0",
    name: "v0",
    vendor: "Vercel",
    jobs: ["Prototyping", "UI generation", "Coding"],
    description: "An AI agent that creates real code and full-stack apps. Its documentation says it can clone pages from screenshots or Figma files, convert design-system components into code, and deploy in one click.",
    goodFor: ["Going from a screenshot or Figma file to working UI", "Responsive prototypes in real code", "Teams that deploy on Vercel"],
    lessSuitableFor: ["Non-web platforms", "Visual exploration before you know what you want"],
    workflowExample: "Give it a Figma frame and your tokens, ask for the responsive behaviour, and resize the result to find where it breaks.",
    difficulty: "Medium",
    platform: "Web",
    officialUrl: "https://v0.app/",
    sourceLabel: "v0 documentation",
    sourceUrl: "https://v0.app/docs/introduction",
  }),
];

/** Tools that were considered but could not be read for checking, so are not described. */
export const unverifiedTools = ["ChatGPT", "Webflow", "Canva", "Replit"];

export function getAiTool(id: string): AiTool {
  return aiTools.find((t) => t.id === id)!;
}

// Comparisons say when to reach for each tool. They do not score or rank.
export const toolComparisons: ToolComparison[] = [
  {
    id: "idea-to-prototype",
    task: "I want to turn my idea into a working prototype",
    intro: "All four produce something you can click. They differ in where you start and what you are left with.",
    options: [
      { toolId: "figma-make", useWhen: "you already have frames in Figma and want them to come alive without leaving it." },
      { toolId: "v0", useWhen: "you have a screenshot or Figma file and want real, responsive web code you can deploy." },
      { toolId: "lovable", useWhen: "the prototype needs a backend and data, and you have no engineer to hand." },
      { toolId: "cursor", useWhen: "the prototype belongs in an existing codebase, and you are comfortable reading code or working beside someone who is." },
    ],
  },
  {
    id: "critique",
    task: "I want critique on a screen before I show it",
    intro: "A general assistant gives the broadest critique. Specialist tools check one thing properly.",
    options: [
      { toolId: "claude", useWhen: "you want hierarchy, spacing, states and copy reviewed together, with findings typed by how much weight they carry." },
      { toolId: "stark", useWhen: "the question is accessibility, and you want it checked in the file itself instead of estimated from an image." },
      { toolId: "figma-ai", useWhen: "the problem is content: unrealistic placeholder text hiding layout issues." },
    ],
  },
  {
    id: "research-synthesis",
    task: "I want help making sense of research",
    intro: "The choice depends on how much research you run and who needs to see it.",
    options: [
      { toolId: "dovetail", useWhen: "research is ongoing, several people contribute, and findings must stay linked to recordings and transcripts." },
      { toolId: "claude", useWhen: "you have one round of notes and want a first pass at themes you will then verify by hand." },
    ],
  },
  {
    id: "stay-on-system",
    task: "I want generated UI to follow my design system",
    intro: "Each tool has its own way of being told about your system. None follows it unprompted.",
    options: [
      { toolId: "figma-ai", useWhen: "your system lives in Figma libraries: set guidelines for the agent on each library." },
      { toolId: "framer", useWhen: "you build in Framer: save your rules as a skill and reference your components and styles." },
      { toolId: "claude", useWhen: "you want to import the system, then ask for a list of every token and component used." },
      { toolId: "v0", useWhen: "the system exists as coded components you want converted and reused." },
    ],
  },
];

// --- Lessons -----------------------------------------------------------------

export const lessons: Lesson[] = [
  {
    id: "what-ai-is-useful-for",
    title: "What AI is actually useful for",
    takeaway: "Exhaustive, structured, checkable work. Not judgement.",
    points: [
      "It is good at going through a list without getting bored: every step, every state, every rule.",
      "It is good at restructuring what you give it: notes into themes, decisions into a spec.",
      "It is weak at knowing your users, your constraints and what matters.",
      "It is confidently wrong about facts it cannot see, such as exact contrast or what a standard says.",
    ],
    links: [{ label: "AI in your workflow", href: "/ai/workflow" }],
  },
  {
    id: "giving-context",
    title: "Giving AI better context",
    takeaway: "Most weak answers come from a missing product, user or constraint.",
    points: [
      "Say the product type, the user, the task, the platform and the design system.",
      "Paste the real thing: the actual steps, rules, tokens or notes.",
      "State what cannot change.",
      "Say what you want back, and in what shape.",
    ],
    links: [{ label: "Prompt Builder", href: "/ai/prompts#builder" }],
  },
  {
    id: "writing-prompts",
    title: "Writing better design prompts",
    takeaway: "Ask for critique before solutions, and give it somewhere to put uncertainty.",
    points: [
      "\"Do not redesign yet\" gets you analysis instead of a generic alternative.",
      "Ask it to type each finding: standard, system, convention, craft or preference.",
      "Give it an \"open questions\" or \"verify\" bucket, or it will fill gaps with invention.",
      "Skip \"act as an expert\". Specific context does more than a job title.",
    ],
    links: [{ label: "Prompt Library", href: "/ai/prompts" }],
  },
  {
    id: "ai-for-research",
    title: "AI for UX research",
    takeaway: "Use it to organise what people said, never to say it for them.",
    points: [
      "Good: critiquing a discussion guide, grouping notes, drafting a synthesis structure.",
      "Demand participant IDs and exact quotes for every theme.",
      "Check quotes against the source; paraphrase gets presented as quotation.",
      "Check your organisation's rules before uploading participant data.",
    ],
    links: [
      { label: "Research workflow", href: "/ai/workflow#research" },
      { label: "Find candidate themes", href: "/ai/prompts#synthesis-themes" },
    ],
  },
  {
    id: "ai-for-flows",
    title: "AI for user flows",
    takeaway: "Draw the happy path yourself. Let AI find what breaks it.",
    points: [
      "Ask for edge cases per step, by type: input, network, permissions, data size, going back.",
      "Ask for alternatives that are structurally different, with the trade-off of each.",
      "You set the priorities; its sense of \"rare\" is a guess.",
    ],
    links: [
      { label: "User flows workflow", href: "/ai/workflow#user-flows" },
      { label: "Find the edge cases", href: "/ai/prompts#flow-edge-cases" },
    ],
  },
  {
    id: "ai-for-critique",
    title: "AI for UI critique",
    takeaway: "Useful as a first reader, if you make it say what kind of claim each finding is.",
    points: [
      "Give product type, user, task, viewport and design system.",
      "Have every finding typed, so opinion is not dressed as a rule.",
      "It cannot measure from a screenshot. Have it list what to measure.",
      "Look up any standard it cites before repeating it.",
    ],
    links: [
      { label: "AI design review", href: "/ai/review" },
      { label: "Design Checks", href: "/checks" },
    ],
  },
  {
    id: "ai-prototyping",
    title: "AI-assisted prototyping",
    takeaway: "Prototype to learn one thing. Say what it is before you start.",
    points: [
      "Build one interaction or one task, not the product.",
      "Supply your tokens and components, or it will invent its own.",
      "Test by keyboard and at small widths; generated code often fails both.",
      "Label it a prototype. Working code gets mistaken for finished code.",
    ],
    links: [
      { label: "Idea to prototype: which tool", href: "/ai/tools#idea-to-prototype" },
      { label: "Prototyping workflow", href: "/ai/workflow#prototyping" },
    ],
  },
  {
    id: "ai-design-systems",
    title: "AI and design systems",
    takeaway: "AI should follow the design system, not quietly create a second one.",
    points: [
      "Good uses: mapping raw values to tokens, finding one-off styles, documenting component behaviour, generating variants from existing components.",
      "Common failures: new colours, random radii, duplicate components, arbitrary spacing, ignored type styles.",
      "Paste the tokens and component list into the prompt.",
      "Ask for a list of every token and component used. Anything unlisted is a deviation.",
    ],
    links: [
      { label: "Generate UI that follows my system", href: "/ai/prompts#ds-follow-system" },
      { label: "SGDS token architecture", href: "/explorer/design-tokens" },
      { label: "Design Tokens cheat sheet", href: "/cheat-sheets/design-tokens" },
    ],
  },
  {
    id: "reviewing-generated-ui",
    title: "Reviewing AI-generated UI",
    takeaway: "Generated UI fails in predictable ways. Check for those first.",
    points: [
      "Too many containers: cards inside cards, everything boxed.",
      "No hierarchy: every block the same weight.",
      "Decoration standing in for content: gradients, badges, charts with no question to answer.",
      "Off-system values. Compare against your tokens.",
    ],
    links: [
      { label: "AI-look signals", href: "/checks/ai-look" },
      { label: "Do I actually need a card?", href: "/cheat-sheets/cards#do-i-need-a-card" },
    ],
  },
  {
    id: "ai-accessibility-limits",
    title: "AI accessibility limitations",
    takeaway: "It can explain the standard and spot the obvious. It cannot test.",
    points: [
      "It cannot use a screen reader, a keyboard or a switch.",
      "It estimates contrast from images, often wrongly. Measure it.",
      "It sometimes cites criteria that do not exist or do not say what it claims.",
      "Use it to prepare for a real test, not to replace one.",
    ],
    links: [
      { label: "First-pass accessibility review", href: "/ai/prompts#a11y-first-pass" },
      { label: "Accessibility cheat sheet", href: "/cheat-sheets/accessibility" },
    ],
  },
  {
    id: "working-with-developers",
    title: "Working with developers using AI",
    takeaway: "A coded prototype is a conversation starter with engineering, not a pull request.",
    points: [
      "Ask what they would keep and what they would rewrite.",
      "Hand over documented behaviour and acceptance criteria, not only the prototype.",
      "Use their tool when the change belongs in their codebase.",
      "Agree what AI-generated design output needs reviewing before it is built.",
    ],
    links: [
      { label: "Handoff workflow", href: "/ai/workflow#handoff" },
      { label: "Draft acceptance criteria", href: "/ai/prompts#handoff-acceptance" },
    ],
  },
  {
    id: "your-own-workflow",
    title: "Building your own AI-assisted workflow",
    takeaway: "Pick two stages where you lose time to tedium. Start there.",
    points: [
      "Good first candidates: edge cases, missing states, error copy, behaviour documentation.",
      "Keep the prompts that worked, with what you had to correct.",
      "For every use, write down what you still check by hand.",
      "Review it every few months. The tools change faster than habits do.",
    ],
    links: [
      { label: "AI in your workflow", href: "/ai/workflow" },
      { label: "Before You Send It", href: "/checks/before-you-send-it" },
    ],
  },
];

// --- Cross-links ---------------------------------------------------------------

/** Where AI helps with a cheat sheet's subject, keyed by sheet slug. Shown on the sheet itself. */
export const sheetAiLinks: Record<string, { label: string; href: string }> = {
  tables: { label: "Ask AI to identify table edge cases", href: "/ai/prompts#flow-edge-cases" },
  forms: { label: "Write error messages from your real validation rules", href: "/ai/prompts#ux-writing-errors" },
  "error-states": { label: "Write error messages from your real validation rules", href: "/ai/prompts#ux-writing-errors" },
  "empty-states": { label: "Draft copy for each cause of an empty state", href: "/ai/prompts#ux-writing-empty" },
  accessibility: { label: "Run a first-pass review, and see what AI cannot test", href: "/ai/prompts#a11y-first-pass" },
  "design-tokens": { label: "Keep generated UI on your tokens", href: "/ai/prompts#ds-follow-system" },
  "design-handoff": { label: "Document behaviour with open questions listed", href: "/ai/prompts#handoff-behaviour" },
  "ux-research": { label: "Find candidate themes in interview notes", href: "/ai/prompts#synthesis-themes" },
  "responsive-design": { label: "Find where a layout will break as it narrows", href: "/ai/prompts#responsive-risks" },
  navigation: { label: "Challenge a navigation structure against real tasks", href: "/ai/prompts#ia-grouping" },
  cards: { label: "Why generated UI overuses cards", href: "/checks/ai-look#cards-everywhere" },
  radius: { label: "Why generated UI overuses large radii", href: "/checks/ai-look#large-radii" },
};
