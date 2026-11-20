/**
 * Solo Designer Kit.
 *
 * Everything here is Shortcut editorial (craft guidance): working routines and
 * prompts for a designer who carries a product from brief to build alone. The
 * "what changed" list on the page reuses the AI update records in ai.ts, so the
 * vendor's announcement and Shortcut's suggestion stay labelled separately and
 * are written once.
 */

export const SOLO_REVIEWED = "2026-11-20";

export interface SoloCheckpoint {
  id: string;
  /** When in the work this checkpoint happens. */
  when: string;
  title: string;
  do: string;
  /** The artefact you should have at the end. */
  output: string;
  /** One question to answer honestly before moving on. */
  check: string;
  /** The prompt on this page that supports the checkpoint, by id. */
  promptId?: string;
  link: { href: string; label: string };
}

export interface SoloPrompt {
  id: string;
  label: string;
  useWhen: string;
  text: string;
}

export const soloCheckpoints: SoloCheckpoint[] = [
  {
    id: "brief",
    when: "Before starting",
    title: "Turn an ambiguous request into a problem brief",
    do: "Write the audience, the job to be done, the success condition, the constraints and what is still unknown. Confirm them with a stakeholder before drawing screens.",
    output: "A one-page brief and three open questions",
    check: "Can someone explain the problem without seeing a proposed UI?",
    link: { href: "/practice/discovery", label: "Discovery guide" },
  },
  {
    id: "alternatives",
    when: "Before choosing a layout",
    title: "Compare two real alternatives",
    do: "Sketch two ways to complete the main task. Use the pattern and design-system references to compare their trade-offs, rather than asking AI to pick the prettier one.",
    output: "Two annotated flows and one recorded decision",
    check: "Can you say why the chosen flow is better for this user and this constraint?",
    promptId: "challenge-flow",
    link: { href: "/explorer", label: "Compare design systems" },
  },
  {
    id: "states",
    when: "Before handoff",
    title: "Review the states that usually get missed",
    do: "Check loading, empty, error, success, permissions, long content, keyboard focus, mobile widths and destructive actions. Record behaviour that is still undecided instead of inventing it.",
    output: "A state checklist and an issue log",
    check: "Could an engineer build the edge cases without guessing?",
    promptId: "audit-component",
    link: { href: "/checks/before-you-send-it", label: "Before You Send It" },
  },
  {
    id: "handoff",
    when: "At handoff",
    title: "Hand over behaviour, not only screens",
    do: "List breakpoints, state changes, content rules and open questions next to the approved frames. Mark which parts are decided and which are assumptions.",
    output: "A handoff checklist the engineer has read back to you",
    check: "Is anything in the file still a suggestion that looks like a decision?",
    promptId: "prepare-handoff",
    link: { href: "/figma#handover", label: "Figma handover checklist" },
  },
  {
    id: "build-review",
    when: "After it ships",
    title: "Compare the build with the design",
    do: "Open the live build at your smallest and largest supported widths. Walk the main task with a keyboard, trigger one error, and check copy, spacing and states against the approved file. Without a QA team, this pass is yours.",
    output: "A defect log ranked by user impact",
    check: "Would a user notice any of these before you did?",
    promptId: "build-vs-design",
    link: { href: "/cheat-sheets/responsive-design#test-matrix", label: "Responsive test matrix" },
  },
  {
    id: "decisions",
    when: "After feedback",
    title: "Keep decisions traceable",
    do: "Separate what was observed, what someone asked for, what you inferred and what was approved. Revisit the riskiest assumptions with users when you can.",
    output: "A short decision log with evidence and an owner",
    check: "Could you tell a later reviewer what changed and why?",
    link: { href: "/ai/review", label: "Review AI-assisted work" },
  },
];

export const soloPrompts: SoloPrompt[] = [
  {
    id: "challenge-flow",
    label: "Challenge a flow",
    useWhen: "You have one proposed flow and want it pressure-tested before you commit.",
    text: "You are reviewing a product flow, not choosing its visual style. Here is the user task, the constraints and the proposed steps: [paste]. List missing states, conflicting assumptions and two simpler alternatives. Mark every inference as an inference; do not invent user evidence.",
  },
  {
    id: "audit-component",
    label: "Audit a component",
    useWhen: "A component is designed and you want the state coverage checked.",
    text: "Review this component specification: [paste]. Create a state matrix for default, hover, focus, disabled, loading, empty, success and error where they apply. Flag responsive, keyboard and screen-reader questions. Do not claim WCAG conformance; list what needs testing instead.",
  },
  {
    id: "prepare-handoff",
    label: "Prepare handoff",
    useWhen: "Screens are approved and you are writing notes for engineering.",
    text: "From these approved screens and notes: [paste], draft a handoff checklist covering behaviour, breakpoints, state changes, content rules and open questions. Keep confirmed facts separate from assumptions. Do not add features or behaviour that is not in the material.",
  },
  {
    id: "build-vs-design",
    label: "Compare the build with the design",
    useWhen: "The feature is live or on staging and you have screenshots of both.",
    text: "Here are screenshots of the approved design and of the built feature at the same width: [attach]. List every visible difference in layout, spacing, type, colour, copy and state. For each, say whether it looks like a defect, an intentional change or something you cannot tell from a screenshot. Do not guess at causes in the code.",
  },
];

/** AI update ids, in ai.ts, shown in the kit's "what changed" list. */
export const soloUpdateIds = ["a2ui-1-0", "figma-agent-everyday-2026", "figma-build-by-design-2026"];
