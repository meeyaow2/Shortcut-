import type { Citation } from "@/types";
import { cite, wcag } from "./citations";

/**
 * Designing with Agents: a learning track inside AI + Design.
 *
 * Everything here is Shortcut editorial, written as working advice. It names
 * no capabilities of any particular tool, because those change monthly; tool
 * facts live in `ai.ts` with their own sources. The only cited material is in
 * the worked examples of chapter 08, which reuse citations already verified
 * elsewhere in Shortcut.
 */
export const AGENTS_REVIEWED = "2026-10-09";

export const agentsPrinciple = "Use agents to extend your process, not replace your judgement.";

export interface ChapterSection {
  title: string;
  intro?: string;
  items?: string[];
  /** Label and text rows, for definitions and comparisons. */
  rows?: { label: string; text: string }[];
  /** Steps in order, drawn as a strip. */
  flow?: string[];
  pairs?: { weak: string; better: string; why: string }[];
  /** Closed by default. */
  collapsed?: boolean;
}

export interface AgentChapter {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  summary: string;
  thirty: string[];
  goodUse?: string[];
  weakUse?: string[];
  give?: string[];
  owns?: string[];
  verify?: string[];
  failure?: string;
  sections: ChapterSection[];
  copy?: { title: string; text: string }[];
  links: { label: string; href: string }[];
}

// --- The nine context files -------------------------------------------------------

export interface ContextFile {
  name: string;
  contains: string;
  why: string;
  when: string;
  example: string;
}

export const contextFiles: ContextFile[] = [
  { name: "Product brief", contains: "What the product is, who pays for it, and what this piece of work is for.", why: "Without it, every answer is about a generic product.", when: "Every task.", example: "\"A scheduling tool for clinics. This work: let patients reschedule without calling.\"" },
  { name: "User and audience context", contains: "Who the users are, what they are trying to do, and what you know from research.", why: "It stops the agent designing for an imagined average person.", when: "Research, flows, copy and critique.", example: "\"Mostly over 50, on phones, often rescheduling for a parent.\"" },
  { name: "Design system", contains: "Tokens, components, variants and the rules for using them.", why: "An agent that cannot see your system invents one.", when: "Any interface work.", example: "Token names with values, and a list of components with their variants." },
  { name: "Content and tone guide", contains: "Voice, terminology, and words you never use.", why: "Default AI copy sounds like every other product.", when: "Any text a user will read.", example: "\"Say appointment, not booking. No exclamation marks.\"" },
  { name: "Accessibility requirements", contains: "The standard and level you work to, and the checks you run.", why: "Agents state accessibility claims confidently and often wrongly.", when: "Interface, copy, handoff and review.", example: "\"WCAG 2.2 AA. Targets at least 24 by 24 CSS px. Every input has a visible label.\"" },
  { name: "Technical constraints", contains: "Platform, framework, what is already built, and what cannot change.", why: "It keeps suggestions inside what can ship.", when: "Flows, prototypes and handoff.", example: "\"Web only. The calendar component is third-party and cannot be restyled.\"" },
  { name: "Existing flows and structure", contains: "The current screens, navigation and information architecture.", why: "New work has to fit what is there.", when: "Flows, structure and critique.", example: "A list of screens in order, or screenshots with one line each." },
  { name: "Product principles and UX rules", contains: "The decisions your team has already made and does not want reopened.", why: "It saves arguing the same point with a machine.", when: "Strategy, interface and review.", example: "\"One primary action per screen. Never hide price until checkout.\"" },
  { name: "Output and QA checklist", contains: "The format you want back, and what the output must pass before you use it.", why: "It turns a vague request into something you can check.", when: "Every task.", example: "\"Return a table. Mark every assumption. Cite the file each fact came from.\"" },
];

export const contextFilesText = `CONTEXT FILES FOR AN AGENT
A starting set. Use the ones the task needs.

1. Product brief
   What the product is, who it is for, what this work is for.
2. User and audience context
   Who the users are, their goals, what research says.
3. Design system
   Tokens, components, variants, usage rules.
4. Content and tone guide
   Voice, terminology, words to avoid.
5. Accessibility requirements
   Standard and level, checks to run.
6. Technical constraints
   Platform, framework, what cannot change.
7. Existing flows and structure
   Current screens, navigation, information architecture.
8. Product principles and UX rules
   Decisions already made.
9. Output and QA checklist
   Format wanted, and what the output must pass.`;

export const agentTemplateText = `AGENT TEMPLATE

Purpose
  One sentence: what this agent is for.

Inputs
  What you will give it each time.

Context
  The files it should always read first.

Constraints
  What it must not do or change.

Sources
  What it may rely on, and how it must cite it.

Output format
  The shape of what comes back.

Validation checklist
  What the output must pass before anyone uses it.`;

export const exampleAgents: { name: string; purpose: string; guard: string }[] = [
  { name: "Research assistant", purpose: "Organises notes and transcripts into candidate themes.", guard: "Every theme lists the quotes behind it. No theme without evidence." },
  { name: "UX critique agent", purpose: "Gives a first-pass critique against a stated goal.", guard: "Each finding is typed: standard, convention or opinion." },
  { name: "Design system agent", purpose: "Checks a design against your tokens and components.", guard: "It may only name tokens and components that exist in the file you gave it." },
  { name: "Handoff agent", purpose: "Drafts specs and acceptance criteria from a finished design.", guard: "It documents what was designed. Anything undefined is listed as a question." },
  { name: "Accessibility review agent", purpose: "Flags likely issues for a human to test.", guard: "It cites the criterion for each claim and never declares a design accessible." },
  { name: "Content review agent", purpose: "Checks copy against your tone and terminology.", guard: "It quotes the rule it applied from your guide." },
];

// --- Trusting the output ----------------------------------------------------------

export const trustCheck = [
  "What is the source?",
  "Is it current?",
  "Is this a requirement, a recommendation or a convention?",
  "Did the AI infer something?",
  "Can I verify it?",
  "Does it match the product context?",
  "What happens if this is wrong?",
];

export const trustLabels: { label: string; meaning: string; tone: "ok" | "warn" | "outline" }[] = [
  { label: "Verified", meaning: "You checked it against the original source.", tone: "ok" },
  { label: "Needs review", meaning: "Plausible, not yet checked.", tone: "warn" },
  { label: "Subjective", meaning: "A judgement. Reasonable people would differ.", tone: "outline" },
  { label: "Unsourced", meaning: "No source given, or the source could not be found.", tone: "warn" },
  { label: "Outdated", meaning: "True once. Check the current version.", tone: "warn" },
];

/** The weight a claim can carry, strongest first. */
export const claimKinds: { label: string; text: string }[] = [
  { label: "Standard", text: "A published requirement, such as a WCAG success criterion." },
  { label: "Platform guidance", text: "What Apple or Google recommend for their own platforms." },
  { label: "Design system", text: "A rule inside one organisation's system." },
  { label: "Industry convention", text: "What many products do. Nobody requires it." },
  { label: "Craft recommendation", text: "A senior designer's judgement." },
  { label: "Preference", text: "Taste." },
];

export interface ConfidentWrong {
  id: string;
  claim: string;
  problem: string;
  /** What the sources actually say, each with its citation. */
  actual: { who: string; says: string; citation?: Citation; kind: string }[];
  verdict: string;
  label: string;
}

export const confidentWrong: ConfidentWrong[] = [
  {
    id: "touch-44",
    claim: "\"WCAG requires every touch target to be 44 × 44 px.\"",
    problem: "It mixes three sources and attaches Apple's number to WCAG.",
    actual: [
      { who: "WCAG 2.2, Level AA", says: "At least 24 by 24 CSS pixels, with exceptions.", citation: wcag("2.5.8"), kind: "Standard" },
      { who: "WCAG 2.2, Level AAA", says: "44 by 44 CSS pixels. AAA is rarely the level a product is held to.", citation: wcag("2.5.5"), kind: "Standard" },
      { who: "Apple", says: "A hit region of at least 44 × 44 pt.", citation: cite.appleButtons, kind: "Platform guidance" },
      { who: "Android", says: "Touch targets of at least 48 × 48 dp.", citation: cite.androidTargets, kind: "Platform guidance" },
    ],
    verdict: "The number is real. The attribution is wrong, and the units are not interchangeable.",
    label: "Needs review",
  },
  {
    id: "padding-24",
    claim: "\"Card padding should always be 24 px.\"",
    problem: "It presents a common habit as a rule.",
    actual: [{ who: "Shortcut", says: "16–24 px is a common desktop range. No standard sets card padding.", kind: "Industry convention" }],
    verdict: "A reasonable starting point stated as a requirement. Treat it as convention.",
    label: "Subjective",
  },
  {
    id: "invented-token",
    claim: "\"Use color.surface.raised.subtle from your design system.\"",
    problem: "The name looks right and may not exist. Agents complete patterns.",
    actual: [{ who: "Your design system", says: "Only the tokens in your own file are real. Check the name against it.", kind: "Design system" }],
    verdict: "Plausible is not the same as present. Search your tokens before using it.",
    label: "Unsourced",
  },
  {
    id: "users-prefer",
    claim: "\"Research shows users prefer bottom navigation.\"",
    problem: "No study, no users, no context. It reads as evidence and is not.",
    actual: [{ who: "Ask the agent", says: "Which study, which users, which year? If it cannot say, there is no finding.", kind: "Unsourced" }],
    verdict: "A generic statement dressed as research. Do not carry it into a deck.",
    label: "Unsourced",
  },
];

// --- Chapters ---------------------------------------------------------------------

const BUILD_FLOW = ["Brief", "Requirements", "Flows", "Structure", "Wireframes", "UI", "Prototype", "QA", "Build"];
export const SYSTEM_TO_OUTPUT = ["Design system", "Tokens", "Components", "Content rules", "Accessibility", "Documentation", "Agent context", "Generated output"];

export const agentChapters: AgentChapter[] = [
  {
    id: "prologue",
    number: "00",
    title: "Designing with Agents",
    subtitle: "The mindset shift.",
    summary: "Working with an agent is not asking AI to design something. It is briefing a capable colleague who knows nothing about your product and will never say so.",
    thirty: ["Give context before you give a task", "Hand over source material, not a description of it", "Say what done looks like", "Decide how you will check the result", "Iterate on purpose, not by re-rolling"],
    sections: [
      {
        title: "What changes",
        rows: [
          { label: "Not this", text: "\"Design me a dashboard.\"" },
          { label: "This", text: "Context, sources, constraints, the task, the output you expect, and how it will be checked." },
        ],
      },
      { title: "What you are doing each time", items: ["Giving context", "Providing source material", "Setting constraints", "Defining the task", "Defining the expected output", "Setting validation rules", "Reviewing assumptions", "Checking sources", "Iterating intentionally"] },
      { title: "The nine context files", intro: "A starting framework, not a universal requirement. Most tasks need three or four of them." },
    ],
    copy: [{ title: "The nine context files, as a checklist", text: contextFilesText }],
    links: [
      { label: "Lesson: giving AI the right context", href: "/ai/learn#giving-context" },
      { label: "Prompt Builder", href: "/ai/prompts" },
    ],
  },
  {
    id: "research",
    number: "01",
    title: "UX Research & Synthesis",
    subtitle: "Faster organising. The same amount of thinking.",
    summary: "Agents are good at sorting what you collected and bad at knowing what it means. They will also produce a theme whether or not the data has one.",
    thirty: ["Use it to organise, not to conclude", "Every theme must point to quotes", "Check sentiment against the recording", "Mind consent before pasting anything", "You present the findings, so you verify them"],
    goodUse: ["Drafting a research plan or interview guide to edit", "Reviewing questions for leading wording", "Organising transcripts and notes", "Clustering notes into candidate themes", "Spotting contradictions between participants", "Suggesting follow-up questions"],
    weakUse: ["Deciding which findings matter", "Inferring how participants felt", "Summarising sessions nobody watched", "Standing in for participants"],
    give: ["The research questions", "Raw notes or transcripts, with consent", "Who the participants were", "What you already believe, so it can be challenged"],
    owns: ["What counts as a finding", "How confident to be", "What to recommend", "Participants' privacy"],
    verify: ["Each theme against its quotes", "That quotes are word for word", "That minority views were not dropped", "Counts: how many people actually said it"],
    failure: "A neat set of five themes that the data does not support, each with an invented or tidied quote.",
    sections: [
      { title: "Risks to watch", rows: [
        { label: "Invented themes", text: "It will find a pattern in noise. Ask for the evidence behind each one." },
        { label: "Imagined sentiment", text: "\"Frustrated\" is often the agent's word, not the participant's." },
        { label: "Over-compression", text: "Six interviews become three bullets and the surprising one disappears." },
        { label: "Privacy and consent", text: "Check what participants agreed to before any transcript leaves your machine." },
        { label: "Misrepresentation", text: "\"Users want\" from one person. Keep the numbers attached." },
      ] },
    ],
    links: [
      { label: "AI for research (workflow)", href: "/ai/workflow#research" },
      { label: "How to synthesise research", href: "/practice/synthesis" },
      { label: "How to take research notes", href: "/practice/note-taking" },
      { label: "Research repositories", href: "/practice/research-repository" },
    ],
  },
  {
    id: "strategy",
    number: "02",
    title: "UX Strategy & Methodology",
    subtitle: "Structure for your thinking, not a source of strategy.",
    summary: "An agent can lay out a framework quickly and fill it with something that sounds right. Strategy comes from evidence and choices, and it has neither.",
    thirty: ["Use it to structure, challenge and list", "Bring the evidence yourself", "Generic output is the default, not the exception", "Ask what it assumed", "A framework filled in is not a decision made"],
    goodUse: ["Turning a messy problem into candidate problem statements", "Listing assumptions you have not tested", "Drafting hypotheses and success criteria to argue with", "Laying out a journey or blueprint from your research", "Arguing the other side of a decision"],
    weakUse: ["Choosing the strategy", "Prioritising without your evidence", "Inventing a Jobs To Be Done statement from nothing"],
    give: ["The evidence: research, data, constraints", "The decision being made and who makes it", "What has already been ruled out"],
    owns: ["Which problem to solve", "The trade-off", "What success means"],
    verify: ["Every claim traces to something you gave it", "Assumptions are marked as assumptions", "It would not fit any other product unchanged"],
    failure: "A confident strategy document that could be about any product in your category.",
    sections: [
      { title: "Methods it can help structure", items: ["Problem framing", "Assumptions and hypotheses", "Jobs To Be Done", "Journey mapping", "Opportunity mapping", "Prioritisation", "Service blueprinting", "User flows", "Decision frameworks", "Success criteria"], collapsed: true },
      { title: "When AI sounds strategic but is generic", pairs: [
        { weak: "\"Focus on reducing friction in onboarding.\"", better: "\"Four of six participants stopped at the bank-link step. Test onboarding without it.\"", why: "The first applies to any product. The second came from your evidence." },
        { weak: "\"Users value simplicity and trust.\"", better: "\"Clinic staff will not use anything that needs a second login.\"", why: "A statement nobody could disagree with tells you nothing." },
        { weak: "\"Prioritise high-impact, low-effort items.\"", better: "\"Rescheduling affects 30% of calls and needs no new backend.\"", why: "Naming a method is not applying it." },
      ] },
      { title: "Four signs it is generic", items: ["Vague nouns: friction, value, trust, delight", "Recommendations with no evidence attached", "Strategy that names no user and no number", "Assumptions stated as facts"] },
    ],
    links: [
      { label: "How to run discovery", href: "/practice/discovery" },
      { label: "How to map a user journey", href: "/practice/journey-mapping" },
      { label: "How to prioritise design work", href: "/practice/prioritisation" },
    ],
  },
  {
    id: "brief-to-build",
    number: "03",
    title: "Brief to Build",
    subtitle: "From a brief to something that runs.",
    summary: "There is no single workflow. Agents can help at each step from brief to build, and each step still needs a person to decide it is right before the next one starts.",
    thirty: ["Start by asking what the brief leaves out", "Use it to list edge cases and states", "Explore several structures before any visuals", "A prototype that renders is not a design that works", "Check responsive behaviour and states yourself"],
    goodUse: ["Finding gaps and contradictions in a brief", "Extracting requirements and edge cases", "Exploring several flows or structures quickly", "First-pass wireframes to react to", "Listing component states you forgot", "Code-backed prototypes for testing"],
    weakUse: ["Final visual design inside your system", "Deciding the flow for you", "Anything where the brief itself is wrong"],
    give: ["The brief", "The design system", "Existing flows", "Technical constraints", "What done looks like"],
    owns: ["The flow", "The hierarchy", "What ships"],
    verify: ["Every state exists: empty, loading, error", "It works at narrow widths", "It uses your components, not lookalikes", "It can be used by keyboard"],
    failure: "A polished screen for the happy path, built from invented components, that breaks at 375 px.",
    sections: [
      { title: "The steps", flow: BUILD_FLOW },
      { title: "Where each kind of tool fits", intro: "Tools change quickly. Check the AI Tools page for what each one currently says it does.", rows: [
        { label: "Chat assistants", text: "Reading a brief, requirements, edge cases, critique. For example Claude or ChatGPT." },
        { label: "Inside the design tool", text: "First drafts and variations where your file already lives. For example Figma's AI features and Figma Make." },
        { label: "Prompt to app", text: "A working prototype from a description. For example v0, Lovable or Replit Agent." },
        { label: "In the codebase", text: "Prototypes that belong in real code. For example Cursor." },
      ] },
    ],
    links: [
      { label: "AI tools for designers", href: "/ai/tools" },
      { label: "Which tool: idea to prototype", href: "/ai/tools#idea-to-prototype" },
      { label: "Before You Send It", href: "/checks/before-you-send-it" },
      { label: "Responsive test matrix", href: "/cheat-sheets/responsive-design#test-matrix" },
    ],
  },
  {
    id: "content",
    number: "04",
    title: "Content & Copy",
    subtitle: "Words in your product's voice, not the internet's.",
    summary: "Left alone, an agent writes in the average voice of every product it has read. Given your tone, terms and the state the user is in, it writes usable first drafts.",
    thirty: ["Give it your tone guide and terminology", "Say which state the user is in", "Ask for options, then edit", "Cut every word that could belong to any product", "Read it aloud before it ships"],
    goodUse: ["Options for button labels and headings", "Error messages that say what happened and what to do", "Empty states, confirmations and notifications", "Checking copy against your tone guide", "A first pass at localisation, for a native speaker to review"],
    weakUse: ["Legal or regulated wording", "Final translation", "Naming things your team has not agreed on"],
    give: ["Product and user context", "Tone and terminology", "The interface state", "Length limits", "Examples of copy you already like"],
    owns: ["The voice", "Accuracy", "What the product promises"],
    verify: ["Terms match the rest of the product", "It says what actually happens", "It fits the space", "It reads naturally in each language"],
    failure: "\"Oops! Something went wrong. Please try again later.\" on every error in the product.",
    sections: [
      { title: "Generic copy and specific copy", pairs: [
        { weak: "\"Welcome back! Let's get started.\"", better: "\"3 appointments need confirming today.\"", why: "The second could only be this product, at this moment." },
        { weak: "\"Something went wrong.\"", better: "\"We could not save your changes. Check your connection and try again.\"", why: "Say what happened and what to do next." },
        { weak: "\"Unlock powerful insights.\"", better: "\"See which clinics are overbooked.\"", why: "Name the thing." },
      ] },
      { title: "A tone system in practice", intro: "Gojek describes its tone as clear, casual, witty and empathetic, with a different voice for customers, drivers, merchants and corporate users. A system like that is exactly what an agent needs to be given, and cannot guess." },
    ],
    links: [
      { label: "UX Writing cheat sheet", href: "/cheat-sheets/ux-writing" },
      { label: "Error States cheat sheet", href: "/cheat-sheets/error-states" },
      { label: "Gojek tone and voice", href: "/systems/gojek" },
      { label: "AI for UX writing (workflow)", href: "/ai/workflow#ux-writing" },
    ],
  },
  {
    id: "handoff",
    number: "05",
    title: "Handoff & Documentation",
    subtitle: "Less typing. No invented behaviour.",
    summary: "Documentation is repetitive, which makes it a good job for an agent. The one rule: it may describe what you designed, and nothing else.",
    thirty: ["Let it draft specs from the finished design", "Undefined behaviour becomes a question, not a guess", "Check every number against the file", "Developers need states and edge cases most", "You sign the spec, so you read all of it"],
    goodUse: ["Drafting component specs from a design", "Acceptance criteria from a flow", "Listing states and edge cases to document", "Turning notes into a decision log", "A first draft of accessibility notes for review"],
    weakUse: ["Filling gaps in the design with plausible behaviour", "Describing interactions you never designed", "Certifying accessibility"],
    give: ["The final design", "Token and component names", "What is in and out of scope", "The format your developers use"],
    owns: ["What the behaviour is", "What is decided and what is open", "The accuracy of every value"],
    verify: ["Values match the file", "Token names exist", "Nothing describes behaviour you did not design", "Open questions are listed, not answered"],
    failure: "A confident spec for a loading state, an error state and a keyboard order that nobody designed.",
    sections: [
      { title: "What developers need", items: ["Every state, not only the default", "Responsive behaviour between breakpoints", "Edge cases: long text, no data, slow network", "Interaction details a static frame cannot show", "Accessibility: names, focus order, announcements", "What changed since they last looked"] },
      { title: "A handoff workflow with an agent", flow: ["Finish the design", "Give it the file and tokens", "It drafts the spec", "It lists what is undefined", "You decide those", "You check every value"] },
      { title: "Handoff checklist", items: ["States documented", "Responsive behaviour stated", "Edge cases listed", "Token names verified", "Accessibility notes reviewed by a person", "Open questions answered or assigned", "Decision log updated"], collapsed: true },
    ],
    links: [
      { label: "Design Handoff cheat sheet", href: "/cheat-sheets/design-handoff" },
      { label: "Figma Dev Mode", href: "/cheat-sheets/figma-dev-mode" },
      { label: "Uber's spec-writing agent", href: "/systems/uber-base#uber-uspec" },
    ],
  },
  {
    id: "design-systems",
    number: "06",
    title: "Design Systems",
    subtitle: "The system is now the instructions.",
    summary: "An agent builds from what it has been given. Where your design system is written down and structured, output follows it. Where it is vague, the agent invents.",
    thirty: ["A model cannot skim a Figma file", "Give it names, values and rules, in text", "Semantic tokens carry intent an agent can follow", "Check output for invented values first", "Understand the system and the trade-offs; do not copy a value"],
    goodUse: ["Checking a design against your tokens", "Finding duplicate or near-duplicate components", "Drafting component documentation", "Suggesting semantic names for raw values", "Auditing for off-scale spacing and colour"],
    weakUse: ["Designing the system's foundations", "Deciding when a new variant is justified", "Anything, without the system in front of it"],
    give: ["Tokens with names and values", "Components, variants and states", "Usage rules and content rules", "Accessibility requirements"],
    owns: ["What belongs in the system", "When to break a rule", "Naming"],
    verify: ["Every token and component it names exists", "No new colours, radii or spacing values", "States include focus, disabled and error", "It reused a component where one fits"],
    failure: "A convincing second design system, built beside yours.",
    sections: [
      { title: "How a system reaches an agent", flow: SYSTEM_TO_OUTPUT },
      { title: "Common AI design-system failures", items: ["Inventing colours", "Inventing radius values", "Random spacing", "Duplicate components", "Ignoring existing patterns", "Adding unnecessary variants", "Bypassing accessibility states"] },
      { title: "What a system needs to be usable by an agent", rows: [
        { label: "Foundations", text: "Colour, type, spacing, radius, elevation and motion, as named values." },
        { label: "Semantic tokens", text: "Names that say what a value is for." },
        { label: "Components", text: "Variants, states and when to use each." },
        { label: "Rules", text: "Responsive, content and accessibility rules, written down." },
        { label: "Machine-readable form", text: "Text or structured files a model can read, kept in step with the code." },
      ], collapsed: true },
    ],
    links: [
      { label: "Design System Library", href: "/systems" },
      { label: "Compare Design Systems", href: "/explorer" },
      { label: "Design Tokens cheat sheet", href: "/cheat-sheets/design-tokens" },
      { label: "Atlassian: design context for agents", href: "/systems/atlassian" },
      { label: "Generative UI", href: "/ai/generative-ui" },
    ],
  },
  {
    id: "building-agents",
    number: "07",
    title: "Building Your Agents",
    subtitle: "A reusable brief, not a piece of engineering.",
    summary: "An agent is a set of instructions and files you reuse. If you can write a good brief for a contractor, you can write one. Most tasks do not need one at all.",
    thirty: ["One agent, one job", "Write down what it must not do", "Say what sources it may use", "Fix the output format", "Give it a checklist to run on its own work"],
    sections: [
      { title: "What goes into one", rows: [
        { label: "Role and purpose", text: "One sentence. If it needs two, it is two agents." },
        { label: "Context files", text: "What it reads every time. See the nine files." },
        { label: "Reference files", text: "Material for this task only." },
        { label: "Constraints", text: "What it must not do or change." },
        { label: "Source rules", text: "What it may rely on and how to cite it." },
        { label: "Output format", text: "The same shape every time, so you can compare runs." },
        { label: "Validation steps", text: "Checks it runs before answering." },
        { label: "Permissions", text: "What it can read and change. Start with read-only." },
      ] },
      { title: "One agent or several", rows: [
        { label: "One", text: "The task is a single job with one kind of output." },
        { label: "Split it", text: "One part generates and another checks, or the context for each part is different." },
        { label: "None", text: "You will do it once, or explaining it takes longer than doing it." },
      ] },
      { title: "Quality gates", items: ["It lists its assumptions", "It cites where each fact came from", "It says what it could not do", "A person reviews before anything is shared"] },
    ],
    copy: [{ title: "Agent template", text: agentTemplateText }],
    links: [
      { label: "Prompt Library", href: "/ai/prompts" },
      { label: "AI Design Review", href: "/ai/review" },
      { label: "Lesson: building your own workflow", href: "/ai/learn#your-own-workflow" },
    ],
  },
  {
    id: "trust",
    number: "08",
    title: "Trusting the Output",
    subtitle: "How to catch the confident-wrong before it ships.",
    summary: "An agent sounds the same when it is right and when it is wrong. The skill is not spotting a bad tone; it is checking the claim.",
    thirty: ["Ask for the source, then open it", "Requirement, recommendation and convention are different things", "Check numbers and names first", "Old information is stated as current", "Decide how wrong you can afford to be"],
    sections: [
      { title: "What goes wrong", items: ["Hallucinated UX standards", "Fake citations", "Fabricated WCAG requirements", "Outdated product information", "Incorrect design-system values", "Invented features", "Generic recommendations presented as rules", "Research over-generalised", "Accessibility claims never tested", "Unsupported UI patterns"], collapsed: true },
    ],
    links: [
      { label: "AI Design Review rubric", href: "/ai/review" },
      { label: "Touch target sizes, compared", href: "/cheat-sheets/accessibility#touch-target-size" },
      { label: "What each source label means", href: "/cheat-sheets" },
      { label: "AI-look signals", href: "/checks/ai-look" },
    ],
  },
];

export function getAgentChapter(id: string): AgentChapter | undefined {
  return agentChapters.find((chapter) => chapter.id === id);
}
