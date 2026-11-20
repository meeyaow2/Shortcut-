import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/primitives";

export const metadata: Metadata = { title: "For the solo designer" };

const routines = [
  {
    time: "Before starting",
    title: "Turn an ambiguous request into a problem brief",
    do: "Write the audience, job to be done, success condition, constraints, and what is still unknown. Confirm these with a stakeholder before drawing screens.",
    output: "One-page brief + three open questions",
    check: "Can someone explain the problem without seeing a proposed UI?",
    href: "/practice",
    link: "Research and problem framing",
  },
  {
    time: "Before choosing a layout",
    title: "Compare two real alternatives",
    do: "Sketch two ways to complete the main task. Use Shortcut's pattern and design-system references to compare trade-offs, rather than asking AI to pick the prettier one.",
    output: "Two annotated flows and one decision",
    check: "Can you explain why the chosen flow is better for this user and constraint?",
    href: "/explorer",
    link: "Compare design systems",
  },
  {
    time: "Before handoff",
    title: "Review the states that usually get missed",
    do: "Check loading, empty, error, success, permissions, long content, keyboard focus, mobile widths, and destructive actions. Record unresolved behaviour instead of inventing it.",
    output: "States checklist + issue log",
    check: "Could an engineer implement the edge cases without guessing?",
    href: "/checks/before-you-send-it",
    link: "Before You Send It",
  },
  {
    time: "After feedback",
    title: "Keep decisions traceable",
    do: "Separate what was observed, what someone requested, what you inferred, and what was approved. Revisit the important assumptions with users when possible.",
    output: "Short decision log with evidence and owner",
    check: "Can you tell a later reviewer what changed and why?",
    href: "/ai/review",
    link: "Review AI-assisted work",
  },
];

const prompts = [
  {
    label: "Challenge a flow",
    text: "You are reviewing a product flow, not choosing its visual style. Here is the user task, constraints and proposed steps: [paste]. List missing states, conflicting assumptions and two simpler alternatives. Mark every inference; do not invent user evidence.",
  },
  {
    label: "Audit a component",
    text: "Review this component specification: [paste]. Create a state matrix for default, hover, focus, disabled, loading, empty, success and error where applicable. Flag responsive, keyboard and screen-reader questions. Do not claim WCAG conformance without testing.",
  },
  {
    label: "Prepare handoff",
    text: "From these approved screens and notes: [paste], draft a handoff checklist covering behaviours, breakpoints, state changes, content rules and open questions. Keep confirmed facts separate from assumptions. Do not add new features.",
  },
];

export default function SoloDesignerPage() {
  return (
    <div className="page">
      <PageHeader
        title="For the solo designer"
        lede="A compact working kit for when you're the researcher, interaction designer, design-system owner and reviewer. Start with a decision, not another tool."
      />
      <p className="mt-6 max-w-3xl text-ink-2">
        Shortcut editorial · Reviewed 20 November 2026. These are practical working routines, not official requirements. Follow the linked standards and original sources for authoritative guidance.
      </p>

      <section className="section-space max-w-4xl" aria-labelledby="routines">
        <h2 id="routines" className="border-b-2 border-ink pb-2 text-2xl font-semibold">Four checkpoints for your week</h2>
        <ol className="divide-y divide-line">
          {routines.map((routine, index) => (
            <li key={routine.title} className="grid gap-3 py-6 md:grid-cols-[8rem_1fr]">
              <div className="font-mono text-sm text-ink-2">{String(index + 1).padStart(2, "0")} / {routine.time}</div>
              <div className="space-y-2">
                <h3 className="font-display text-xl font-semibold">{routine.title}</h3>
                <p>{routine.do}</p>
                <p className="text-ink-2"><strong className="text-ink">Leave with:</strong> {routine.output}</p>
                <p className="text-ink-2"><strong className="text-ink">Ask yourself:</strong> {routine.check}</p>
                <Link className="inline-flex min-h-11 items-center font-medium underline underline-offset-4 hover:text-accent" href={routine.href}>{routine.link}</Link>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="section-space max-w-4xl" aria-labelledby="reuse">
        <h2 id="reuse" className="border-b-2 border-ink pb-2 text-2xl font-semibold">Three reusable AI review prompts</h2>
        <p className="mt-3 text-ink-2">Copy the one that matches your task. Give the model your actual requirements and approved components; never paste confidential client material into an unapproved service.</p>
        <div className="mt-5 space-y-4">
          {prompts.map((prompt) => (
            <details key={prompt.label} className="rounded-md border border-line px-4 py-3">
              <summary className="cursor-pointer font-semibold">{prompt.label}</summary>
              <p className="mt-3 whitespace-pre-wrap text-ink-2">{prompt.text}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="section-space max-w-4xl" aria-labelledby="new">
        <h2 id="new" className="border-b-2 border-ink pb-2 text-2xl font-semibold">What changed in October–November 2026</h2>
        <div className="mt-4 space-y-5">
          <div>
            <h3 className="font-display text-xl font-semibold">Figma agent: reduce busywork, not design judgement</h3>
            <p className="mt-1">Figma published examples on 9 November of annotating designs from connected feedback and using repeatable agent instructions. For solo work: try one review-to-annotation exercise and manually verify every action item.</p>
            <a className="mt-1 inline-block min-h-11 py-2 underline underline-offset-4" href="https://www.figma.com/blog/6-easy-ways-to-use-the-figma-agent-right-now/" target="_blank" rel="noopener noreferrer">Figma: six practical examples (9 Nov)</a>
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold">Code-backed design: separate thinking from shipping</h3>
            <p className="mt-1">Figma's 15 October update describes ways to bring code-backed explorations onto the canvas. Use prototypes to investigate a flow, but document accessibility, edge states and handoff expectations before treating them as production-ready.</p>
            <a className="mt-1 inline-block min-h-11 py-2 underline underline-offset-4" href="https://www.figma.com/blog/build-by-design/" target="_blank" rel="noopener noreferrer">Figma: Build by Design (15 Oct)</a>
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold">A2UI 1.0: agent interfaces can reuse real components</h3>
            <p className="mt-1">Google announced A2UI 1.0 on 11 November, a protocol where agents describe interfaces and apps render them using registered components. For designers of AI products, focus on confirmation, recoverability, clear action states and design-system boundaries—not generating arbitrary cards.</p>
            <a className="mt-1 inline-block min-h-11 py-2 underline underline-offset-4" href="https://developers.googleblog.com/en/a2ui-10-build-delightful-fast-reliable-agentic-experiences/" target="_blank" rel="noopener noreferrer">Google: A2UI 1.0 (11 Nov)</a>
          </div>
        </div>
        <p className="mt-5 text-sm text-ink-2">Release descriptions above reflect the linked vendor announcements. Suggested designer actions are Shortcut editorial and not vendor instructions.</p>
        <Link href="/ai/updates" className="mt-4 inline-flex min-h-11 items-center underline underline-offset-4 hover:text-accent">See all AI updates</Link>
      </section>
    </div>
  );
}
