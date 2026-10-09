import type { Prompt } from "@/types";

/**
 * The prompt library. Shortcut editorial: these are written from practice,
 * not tested against a benchmark, and "whyItWorks" is reasoning, not a
 * measured result. Square brackets mark what the reader must fill in.
 */
export const REVIEWED_PROMPTS = "2026-10-07";

// Lines every review-style prompt ends with, so the model does not invent authority.
const HONESTY = `Do not invent WCAG requirements, design-system rules or research findings. If you are unsure whether something is a rule, say so.`;

export const prompts: Prompt[] = [
  {
    id: "research-plan",
    title: "Pressure-test a research plan",
    category: "Research",
    prompt: `I am planning research for [product and the decision this research should inform].

My current plan:
[paste plan: goals, method, participants, questions]

Before suggesting improvements:
1. List the assumptions my plan depends on.
2. For each research question, say whether my method can actually answer it, and why.
3. Point out any question that is leading, double-barrelled or asks people to predict their own behaviour.

Then suggest changes, keeping to my timeline of [timeline] and [number] participants.

Do not write findings or guess what participants will say.`,
    whyItWorks: "It asks for critique before suggestions, names the specific ways interview questions go wrong, and blocks the model from inventing results.",
    whenToUse: "After drafting a plan, before recruiting.",
    inputsNeeded: ["The decision the research should inform", "Your draft plan and questions", "Timeline and participant count"],
    expectedOutput: "A list of assumptions, a question-by-question check, then proposed changes.",
    verify: ["Do the flagged questions really have the problem named?", "Do the suggested methods fit your access to participants?"],
  },
  {
    id: "synthesis-themes",
    title: "Find candidate themes in interview notes",
    category: "UX synthesis",
    prompt: `Below are notes from [number] user interviews about [topic]. Each note starts with a participant ID.

[paste notes]

Group the notes into candidate themes.

For each theme give:
- a neutral name
- the participant IDs that support it
- two or three direct quotes, copied exactly
- any participant who contradicts it

Rules:
- Use only what is in the notes. Do not add sentiment, motivation or frequency that is not stated.
- If a theme rests on one participant, label it "single source".
- List notes that fit no theme under "Unsorted".`,
    whyItWorks: "Participant IDs and exact quotes make every theme traceable, and asking for contradictions and unsorted notes stops the model smoothing the data into a tidy story.",
    whenToUse: "As a first pass on raw notes, before your own affinity mapping.",
    inputsNeeded: ["Notes with a participant ID on each", "The research topic"],
    expectedOutput: "Themes with supporting IDs, exact quotes, contradictions and an unsorted list.",
    verify: ["Check every quote against the source: models paraphrase and call it a quote.", "Count the IDs yourself.", "Read the unsorted list; the surprise is often there."],
  },
  {
    id: "ia-grouping",
    title: "Challenge a navigation structure",
    category: "Information architecture",
    prompt: `Here is the proposed navigation for [product], used by [who].

[paste the structure as an indented list]

Their top tasks are:
[list 5 to 8 tasks]

For each task, say which top-level item a first-time user would most likely open, and how confident you are. Flag any task where two items are plausible.

Then list:
- labels that are jargon or internal names
- categories that overlap
- items a user might expect that are missing

Do not propose a new structure yet.`,
    whyItWorks: "It runs a rough tree test against real tasks, which surfaces overlap and ambiguity, and holds back the redesign so the critique comes first.",
    whenToUse: "Before a tree test with real users, to remove the obvious problems first.",
    inputsNeeded: ["The structure as an indented list", "The users", "Their top tasks"],
    expectedOutput: "A task-by-task prediction with confidence, then lists of label and category problems.",
    verify: ["This predicts; it does not test. Confirm with a real tree test.", "Check the model has not assumed domain knowledge your users lack."],
  },
  {
    id: "flow-edge-cases",
    title: "Find the edge cases in a flow",
    category: "User flows",
    prompt: `Here is a user flow for [task] in [product], for [user].

[paste the steps, numbered]

Constraints: [platform, sign-in state, permissions, anything fixed]

For each step, list what could go wrong or differ:
- missing, invalid or unusual input
- the user leaving and returning
- slow or failed network
- permissions and roles
- empty, very large or very long data
- going back or repeating the step

Mark each as "must handle", "should handle" or "rare". Do not redesign the flow.`,
    whyItWorks: "A fixed checklist of failure types applied to each step is exactly the tedious, exhaustive pass a model does well and a person skips.",
    whenToUse: "Once the happy path is drawn, before wireframes.",
    inputsNeeded: ["Numbered steps", "The user and task", "Fixed constraints"],
    expectedOutput: "A step-by-step table of edge cases with priority.",
    verify: ["Remove cases your constraints make impossible.", "The priorities are guesses: set them with your product and engineering leads."],
  },
  {
    id: "flow-alternatives",
    title: "Explore alternative flows",
    category: "User flows",
    prompt: `Current flow for [task]:
[paste steps]

What the user is trying to achieve: [goal]
What the business needs from this flow: [need]
What cannot change: [constraints]

Propose three structurally different flows, not variations of mine. For each:
- the steps
- what it makes easier
- what it makes harder
- the assumption it depends on

Do not recommend one.`,
    whyItWorks: "Asking for structural difference and the trade-off of each keeps the options honest, and withholding a recommendation leaves the decision with you.",
    whenToUse: "When you suspect you have anchored on your first idea.",
    inputsNeeded: ["Current steps", "User goal", "Business need", "Fixed constraints"],
    expectedOutput: "Three distinct flows, each with gains, costs and its key assumption.",
    verify: ["Are they really different, or the same flow reordered?", "Test the stated assumptions against what you know of your users."],
  },
  {
    id: "wireframe-content",
    title: "Check what a page must contain",
    category: "Wireframes",
    prompt: `I am wireframing the [page name] page of [product].

The user arrives from [where] wanting to [goal].
After this page they should be able to [next step].

List:
1. The information the user needs to decide or act, in priority order.
2. The actions available, primary first.
3. The states this page needs: empty, loading, error, partial, no permission.
4. Content that is commonly added to pages like this but is not needed here.

Describe content and priority only. Do not describe layout, components or visual style.`,
    whyItWorks: "Separating content priority from layout gets a useful inventory without a generic page design attached.",
    whenToUse: "Before drawing, to make sure nothing important is missing.",
    inputsNeeded: ["The page and product", "Where the user comes from and their goal", "What they do next"],
    expectedOutput: "A prioritised content list, actions, states, and things to leave out.",
    verify: ["Is the priority order right for your users, or just typical?", "Check the states against real data conditions."],
  },
  {
    id: "design-review",
    title: "Review my design",
    category: "UI critique",
    prompt: `Review this interface as a senior product designer.

Context:
- Product type: [e.g. enterprise dashboard]
- User and task: [who, doing what]
- Platform and viewport: [e.g. web, 1440 px]
- Design system: [name, or "custom"]

Do not redesign it immediately.

First evaluate: information hierarchy, alignment, spacing, typography, colour, accessibility, interaction states, information density, consistency and responsive behaviour.

Give every finding one type:
1. Standard requirement (name the standard and criterion)
2. Design-system issue (name the rule)
3. Industry convention
4. Craft guidance
5. Subjective preference

For every finding explain what you noticed, why it matters, its severity, and what I could try.

Where you cannot tell from the image, such as exact contrast or pixel values, say "verify" and tell me what to measure.

${HONESTY}`,
    whyItWorks: "The context stops generic advice, the five types stop opinion being dressed as a rule, and the \"verify\" instruction makes the model admit what it cannot see in a screenshot.",
    whenToUse: "Before showing work to a senior designer, or before handoff.",
    inputsNeeded: ["A screenshot or frame", "Product type, user and task", "Platform, viewport and design system"],
    expectedOutput: "Findings grouped by area, each typed, with severity and a suggestion.",
    verify: ["Look up any WCAG criterion it cites.", "Measure contrast and sizes yourself; models estimate these badly from images.", "Treat type 4 and 5 findings as opinion."],
  },
  {
    id: "critique-hierarchy",
    title: "Check the visual hierarchy",
    category: "UI critique",
    prompt: `Look at this screen for [product]. The user's main goal here is to [goal].

Without reading the text closely, list the first five things your attention goes to, in order, and say what draws it to each: size, weight, colour, position or contrast.

Then compare that order with the goal:
- Is the primary action among the first three?
- What is prominent but unimportant?
- What is important but quiet?

Suggest the smallest changes that would fix the order. Prefer reducing emphasis over adding it.`,
    whyItWorks: "It turns the squint test into explicit steps and biases the fix toward removing emphasis, which is usually the right move.",
    whenToUse: "When a screen feels flat or busy and you cannot say why.",
    inputsNeeded: ["A screenshot", "The user's main goal on the screen"],
    expectedOutput: "An attention order, a comparison with the goal, and minimal changes.",
    verify: ["A model's attention order is a guess. Try a five-second test with a person."],
  },
  {
    id: "a11y-first-pass",
    title: "First-pass accessibility review",
    category: "Accessibility",
    prompt: `Do a first-pass accessibility review of this design against WCAG 2.2 Level AA.

Design: [attach or describe]
Platform: [web / iOS / Android]

Report in three groups:
A. Likely failures visible in the design. Cite the success criterion number and name.
B. Things that cannot be judged from a static design and must be tested: keyboard order, focus management, screen reader output, zoom and reflow.
C. Questions for the designer, where intent is unclear.

For contrast, do not estimate ratios from the image. List the text and background pairs I should measure.

This is not a conformance audit. ${HONESTY}`,
    whyItWorks: "Group B forces the model to state what a static review cannot cover, and refusing estimated contrast removes its most common false claim.",
    whenToUse: "During design, to catch the obvious before a proper audit.",
    inputsNeeded: ["The design", "Platform"],
    expectedOutput: "Likely failures with criteria, a must-test list, and open questions.",
    verify: ["Look up every cited criterion.", "Measure each contrast pair.", "This does not replace testing with assistive technology or with disabled users."],
  },
  {
    id: "ux-writing-errors",
    title: "Write error messages for a form",
    category: "UX writing",
    prompt: `Write error messages for this form in [product].

Fields and validation rules:
[field: rule, for each]

Voice: [e.g. plain, direct, no apology]

For each rule give one message that:
- says what is wrong
- says how to fix it
- uses the field's own label
- is under [number] words

Avoid "invalid", "illegal", "oops" and blaming the user. Give the same message for the inline error and the summary.

If a rule is ambiguous, ask me instead of guessing.`,
    whyItWorks: "Listing the real rules produces specific messages, the constraints mirror established guidance on error wording, and the last line stops it inventing rules.",
    whenToUse: "When you have validation rules and need consistent copy across a form.",
    inputsNeeded: ["Every field with its rule", "Voice", "Length limit"],
    expectedOutput: "One message per rule, consistent in voice.",
    verify: ["Does each message match what the system actually checks?", "Read them aloud; check they survive translation if you localise."],
  },
  {
    id: "ux-writing-empty",
    title: "Draft empty-state copy",
    category: "UX writing",
    prompt: `Draft copy for the empty state of [screen or list] in [product].

It can be empty because:
1. [first use: nothing created yet]
2. [filters or search returned nothing]
3. [the user lacks permission, if applicable]

For each cause write:
- a heading of five words or fewer saying what is true
- one sentence on what will appear here
- the label for the action that fills it

Voice: [describe]. No jokes, no exclamation marks.`,
    whyItWorks: "It makes the model handle each cause of emptiness separately, which is where most empty states fail.",
    whenToUse: "When designing lists, tables and dashboards.",
    inputsNeeded: ["The screen", "Each reason it can be empty", "Voice"],
    expectedOutput: "Heading, sentence and action label for each cause.",
    verify: ["Does the action exist for that user?", "Is the no-results copy different from the first-use copy?"],
  },
  {
    id: "ds-follow-system",
    title: "Generate UI that follows my design system",
    category: "Design systems",
    prompt: `You are working inside an existing design system. Follow it; do not extend it.

Tokens:
[paste spacing, radius, colour and type tokens]

Components available:
[list components and their variants]

Task: [what to design or build]

Rules:
- Use only the tokens and components above.
- If the task needs something the system lacks, stop and tell me what is missing. Do not invent a colour, radius, spacing value or component.
- After the output, list every token and component you used.`,
    whyItWorks: "Supplying the tokens removes the need to guess, the stop-and-ask rule prevents a quiet second system, and the usage list makes deviations easy to spot.",
    whenToUse: "Whenever you ask an AI tool for UI in a product that already has a system.",
    inputsNeeded: ["Your tokens", "Your component list", "The task"],
    expectedOutput: "UI built from your system, plus a list of what was used and what was missing.",
    verify: ["Search the output for raw hex values and pixel values not in your tokens.", "Check it did not recreate a component you already have."],
  },
  {
    id: "ds-audit",
    title: "Find one-off styles",
    category: "Design systems",
    prompt: `Here are the styles used in [file, page or stylesheet]:
[paste values, or a list of colours, radii, spacing and font sizes with counts]

Here are our tokens:
[paste tokens]

List:
1. Values that match no token, with how often each appears.
2. Values within 2 px or a near-identical colour of a token, and which token they probably meant.
3. Tokens that are never used.

Do not suggest new tokens. Sort by frequency.`,
    whyItWorks: "It is a matching task with clear inputs, which models do reliably, and it forbids the tempting answer of adding more tokens.",
    whenToUse: "Before a cleanup, or when a file has drifted from the system.",
    inputsNeeded: ["The values in use, ideally with counts", "Your tokens"],
    expectedOutput: "Three lists: off-system values, near misses, unused tokens.",
    verify: ["Spot-check the counts.", "A near miss may be deliberate; ask before changing it."],
  },
  {
    id: "responsive-risks",
    title: "Find responsive risks",
    category: "Responsive design",
    prompt: `This screen is designed at [width] px. It must work from 320 px to [max] px.

[attach or describe the layout: regions, columns, fixed elements]

List what is likely to break as the width narrows, in the order it would break:
- content that will wrap, truncate or overflow
- side-by-side regions that will not fit
- tables and comparisons
- fixed or sticky elements that will cover content
- touch targets that become too small or too close

For each, give the approximate width where it fails and two ways to handle it. Do not choose for me.`,
    whyItWorks: "It asks for failure points in order of width, which maps directly onto where breakpoints belong.",
    whenToUse: "After the desktop design, before the smaller sizes.",
    inputsNeeded: ["The layout", "Design width and supported range"],
    expectedOutput: "An ordered list of break points with options for each.",
    verify: ["Widths are estimates: drag the real frame to find the actual point.", "Test with your longest real content."],
  },
  {
    id: "qa-states",
    title: "List the missing states",
    category: "Design QA",
    prompt: `Here are the components and screens in this design:
[list them, with the states I have already designed for each]

For each one, list the states that are missing from: default, hover, focus, active, disabled, loading, empty, error, success, read-only, selected.

Only list a state if it applies to that component. For each missing state, say in one line what would trigger it.

Sort by the states users are most likely to hit.`,
    whyItWorks: "A fixed list checked against an inventory is mechanical work, and asking for the trigger filters out states that do not apply.",
    whenToUse: "Before handoff.",
    inputsNeeded: ["Your components and screens", "The states you have designed"],
    expectedOutput: "Missing states per component, each with its trigger, sorted by likelihood.",
    verify: ["Remove states your product genuinely does not have.", "Check focus is designed for every interactive element."],
  },
  {
    id: "handoff-behaviour",
    title: "Document component behaviour",
    category: "Handoff",
    prompt: `Write behaviour documentation for [component or screen] for the developers building it.

What I have designed:
[describe, or attach frames with annotations]

Write:
1. Purpose, in one sentence.
2. States, and what triggers each.
3. Interactions: click, keyboard, touch.
4. Content rules: limits, truncation, wrapping.
5. Responsive behaviour at each breakpoint.
6. Open questions, where my design does not say.

Only document what I have described. Put anything you would have to assume under Open questions, not in the spec.`,
    whyItWorks: "The open-questions section gives the model somewhere to put gaps, so it does not fill them with plausible invention.",
    whenToUse: "When the design is settled and needs writing up.",
    inputsNeeded: ["The component or screen", "Your annotations or description"],
    expectedOutput: "A six-part spec with gaps listed separately.",
    verify: ["Read every line: is it something you decided?", "Answer the open questions yourself before sharing."],
  },
  {
    id: "handoff-acceptance",
    title: "Draft acceptance criteria",
    category: "Handoff",
    prompt: `Draft acceptance criteria for this feature.

Feature: [name]
User story: [as a..., I want..., so that...]
Design behaviour: [paste the behaviour documentation]

Write criteria in Given / When / Then form covering:
- the main path
- each error and empty state
- keyboard operation
- the smallest supported screen width

One behaviour per criterion. Do not add behaviour that is not in the design; list it as a question instead.`,
    whyItWorks: "It derives criteria from documented behaviour only, so the criteria and the design cannot drift apart.",
    whenToUse: "After behaviour is documented, when writing tickets.",
    inputsNeeded: ["The user story", "The behaviour documentation"],
    expectedOutput: "Testable criteria, plus questions.",
    verify: ["Can each one be tested as written?", "Agree them with the engineer and the tester."],
  },
  {
    id: "requirements-gaps",
    title: "Find gaps in a requirements brief",
    category: "Product requirements",
    prompt: `Here is a product brief:
[paste]

As the designer who has to act on it, list:
1. What the brief states clearly.
2. What it assumes without evidence.
3. Decisions it leaves open that design cannot proceed without.
4. Requirements that conflict with each other.

Then write the five questions I should ask the product manager first, most blocking first.

Do not fill the gaps yourself.`,
    whyItWorks: "It reads the brief the way a designer has to, and turns gaps into questions, not guesses.",
    whenToUse: "On receiving a brief, before any design.",
    inputsNeeded: ["The brief"],
    expectedOutput: "Four lists and five prioritised questions.",
    verify: ["Check the conflicts are real, not a misreading.", "You know context the model does not: add your own questions."],
  },
  {
    id: "stakeholder-rationale",
    title: "Explain a design decision",
    category: "Stakeholder communication",
    prompt: `Help me explain a design decision to [audience: e.g. engineering lead, marketing director].

The decision: [what I chose]
The alternatives I rejected: [list]
My reasons: [evidence, constraints, principles]
What they care about: [their goal or worry]

Write a short explanation that:
- leads with what it means for them
- gives my reasons in my order of strength
- names the trade-off honestly
- states what would change my mind

Use only the reasons I gave. Do not add research, statistics or standards I did not mention.`,
    whyItWorks: "It restructures your own reasoning for the audience and forbids borrowed authority, which is what gets a rationale challenged.",
    whenToUse: "Before a review where a decision will be questioned.",
    inputsNeeded: ["The decision and alternatives", "Your reasons", "The audience and what they care about"],
    expectedOutput: "A short, honest explanation in the audience's terms.",
    verify: ["Every claim should be one you can back up in the room."],
  },
  {
    id: "portfolio-case-study",
    title: "Tighten a case study",
    category: "Portfolio",
    prompt: `Here is a draft case study:
[paste]

Read it as a hiring manager with three minutes.

Tell me:
1. What you understood my role and decisions to be, in two sentences. If you cannot tell, say so.
2. Where I describe process without saying what I decided or why.
3. Claims of impact with no evidence.
4. What I could cut.

Do not rewrite it. Do not add outcomes, numbers or praise.`,
    whyItWorks: "Playing the reader back shows what actually comes across, and banning rewrites keeps the voice and the facts yours.",
    whenToUse: "On a finished draft.",
    inputsNeeded: ["The draft"],
    expectedOutput: "A plain reading of the story, and lists of weak spots.",
    verify: ["If its summary of your role is wrong, the draft is unclear, not the model."],
  },
  {
    id: "sg-government-flow",
    title: "Review a Singapore government service flow",
    category: "Singapore",
    prompt: `Review this flow for a Singapore government digital service.

Flow: [paste steps or attach screens]
Users: [who]

Use only the guidance I paste below. Do not rely on your memory of Singapore standards.

Baseline Design Practices:
[paste the BD controls that apply, from the official catalogue]

SGDS guidance:
[paste the relevant component and foundation guidance]

For each control, say whether the flow meets it, does not meet it, or cannot be judged from what I gave you. Quote the control text you are applying.

Then list SGDS components the flow could use in place of custom ones.`,
    whyItWorks: "Pasting the official text removes the risk of the model misremembering a control, and the three-way verdict includes \"cannot be judged\".",
    whenToUse: "On a government service flow, with the official pages open beside you.",
    inputsNeeded: ["The flow", "The applicable controls, copied from the official catalogue", "Relevant SGDS guidance"],
    expectedOutput: "A control-by-control verdict with quoted text, and component suggestions.",
    verify: ["Check each quoted control against the official catalogue.", "A model's verdict is not a compliance decision."],
  },
];

export const promptCategories = [...new Set(prompts.map((p) => p.category))];

export function getPrompt(id: string): Prompt {
  return prompts.find((p) => p.id === id)!;
}

// --- Prompt Builder ---------------------------------------------------------

export const builderGoals = [
  { id: "review", label: "Review my UI", opening: "Review this interface as a senior product designer. Do not redesign it immediately; evaluate it first." },
  { id: "edge-cases", label: "Find edge cases in a flow", opening: "Go through this user flow step by step and list what could go wrong or differ at each step. Do not redesign the flow." },
  { id: "states", label: "List missing states", opening: "List the states that are missing from each component and screen in this design, and what would trigger each." },
  { id: "handoff", label: "Document for handoff", opening: "Write behaviour documentation for the developers building this. Only document what I have described; list anything you would have to assume as an open question." },
] as const;

export const builderProductTypes = ["Enterprise dashboard", "Admin tool", "Consumer app", "Content site", "Mobile app", "Government service", "Marketing page"];

export const builderFocusAreas = ["Hierarchy", "Spacing", "Typography", "Colour", "Accessibility", "Forms", "Tables", "States", "Responsive", "Consistency"];

export interface BuilderChoices {
  goalId: string;
  productType: string;
  focus: string[];
  context: string;
}

/** Assembles a prompt from the builder's choices. Plain string work; no model is involved. */
export function buildPrompt({ goalId, productType, focus, context }: BuilderChoices): string {
  const goal = builderGoals.find((g) => g.id === goalId) ?? builderGoals[0];
  const lines = [
    goal.opening,
    "",
    "Context:",
    `- Product type: ${productType}`,
    `- User and task: ${context.trim() || "[who is using this, and what they are trying to do]"}`,
    "- Platform and viewport: [e.g. web, 1440 px]",
    "- Design system: [name, or \"custom\"]",
  ];
  if (focus.length > 0) lines.push("", `Focus on: ${focus.join(", ").toLowerCase()}. Mention other problems only if they are serious.`);
  if (goal.id === "review") {
    lines.push(
      "",
      "Give every finding one type: standard requirement, design-system issue, industry convention, craft guidance or subjective preference.",
      "For every finding explain what you noticed, why it matters, its severity, and what I could try.",
      "Where you cannot tell from the image, such as exact contrast or pixel values, say \"verify\" and tell me what to measure.",
    );
  }
  lines.push("", HONESTY);
  return lines.join("\n");
}
