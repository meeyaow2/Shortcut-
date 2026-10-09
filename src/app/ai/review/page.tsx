import type { Metadata } from "next";
import Link from "next/link";
import { PromptBlock } from "@/components/ai/Ai";
import { EditorialLabel } from "@/components/craft/Craft";
import { PageHeader } from "@/components/ui/primitives";
import { getPrompt } from "@/data/prompts";

export const metadata: Metadata = { title: "AI Design Review" };

const review = getPrompt("design-review");

// The five kinds of finding, in order of how much weight they carry.
const rubric = [
  { type: "Standard requirement", meaning: "A criterion in a published standard such as WCAG.", act: "Look the criterion up. If it applies, fix it." },
  { type: "Design-system issue", meaning: "A departure from a rule in the system you have adopted.", act: "Check the system's own page. Fix it, or record why you differ." },
  { type: "Industry convention", meaning: "A range or pattern many products use. Nobody requires it.", act: "Follow it unless you have a reason. Know the reason." },
  { type: "Craft guidance", meaning: "Design-review judgement about hierarchy, spacing or clarity.", act: "Weigh it. A good reviewer would say the same, or would not." },
  { type: "Subjective preference", meaning: "Taste.", act: "Yours to take or leave." },
];

const provide = ["A screenshot or frame", "Product type", "Intended user and task", "Platform and target viewport", "The design system in use"];

const reviewed = ["Hierarchy", "Spacing", "Typography", "Alignment", "Colour", "Accessibility", "Component consistency", "States", "Density", "Responsiveness", "AI-like patterns"];

export default function AiReviewPage() {
  return (
    <div className="page">
      <PageHeader
        title="AI design review"
        lede="A structured critique you run in your own AI tool before a person sees the work. Shortcut gives you the prompt and the rubric; it does not inspect your design."
      >
        <div className="mt-5">
          <EditorialLabel kind="craft-guidance" />
        </div>
      </PageHeader>

      <div className="grid gap-10 pt-8 lg:grid-cols-[1fr_20rem]">
        <div className="min-w-0 max-w-3xl space-y-10">
          <section aria-labelledby="prompt">
            <h2 id="prompt" className="border-b-2 border-ink pb-2 text-2xl font-semibold">
              1. Run this prompt
            </h2>
            <p className="mt-3 text-ink-2">Attach your screen, fill in the brackets, and send it.</p>
            <div className="mt-4">
              <PromptBlock text={review.prompt} />
            </div>
            <p className="mt-3">
              <Link href="/ai/prompts#builder" className="font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent">
                Narrow it to a few areas with the Prompt Builder
              </Link>
            </p>
          </section>

          <section aria-labelledby="rubric">
            <h2 id="rubric" className="border-b-2 border-ink pb-2 text-2xl font-semibold">
              2. Read each finding by its type
            </h2>
            <p className="mt-3 text-ink-2">
              The prompt makes the model label every finding. The label tells you how much weight it carries. Never let
              a subjective point pass as an accessibility rule.
            </p>
            <dl className="mt-4 divide-y divide-line rounded-md border border-line">
              {rubric.map((row) => (
                <div key={row.type} className="grid gap-x-6 gap-y-1 px-4 py-3 md:grid-cols-[12rem_1fr]">
                  <dt className="font-semibold">{row.type}</dt>
                  <dd>
                    <span className="text-ink-2">{row.meaning} </span>
                    <span className="font-medium">{row.act}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="verify">
            <h2 id="verify" className="border-b-2 border-ink pb-2 text-2xl font-semibold">
              3. Verify before you act
            </h2>
            <ul className="mt-4 space-y-2">
              {review.verify.map((item) => (
                <li key={item} className="border-l-2 border-mark pl-3">
                  {item}
                </li>
              ))}
              <li className="border-l-2 border-mark pl-3">
                Then run{" "}
                <Link href="/checks/before-you-send-it" className="font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent">
                  Before You Send It
                </Link>{" "}
                yourself. A model&rsquo;s review is a first reader, not a sign-off.
              </li>
            </ul>
          </section>
        </div>

        <aside aria-label="What goes in and what is reviewed" className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div>
            <h2 className="font-sans text-sm font-semibold tracking-normal">Give it</h2>
            <ul className="mt-2 space-y-1">
              {provide.map((item) => (
                <li key={item} className="border-l border-line-strong pl-3 text-ink-2">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-sans text-sm font-semibold tracking-normal">It reviews</h2>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {reviewed.map((item) => (
                <li key={item} className="rounded-sm bg-wash px-2 py-0.5 text-sm text-ink-2">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-sans text-sm font-semibold tracking-normal">It cannot</h2>
            <ul className="mt-2 space-y-1">
              {["Measure contrast or pixel values reliably from an image", "Test with a keyboard or screen reader", "Know your users or constraints unless you tell it"].map((item) => (
                <li key={item} className="border-l border-line-strong pl-3 text-ink-2">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
