import type { Metadata } from "next";
import Link from "next/link";
import { EditorialLabel } from "@/components/craft/Craft";
import { PageHeader } from "@/components/ui/primitives";
import { lessons } from "@/data/ai";

export const metadata: Metadata = { title: "AI for Product Designers" };

export default function AiLearnPage() {
  return (
    <div className="page">
      <PageHeader
        title="AI for product designers"
        lede="Twelve short lessons, in order. Each is a few minutes and links to the workflow, prompt or check that puts it into practice."
      >
        <div className="mt-5">
          <EditorialLabel kind="craft-guidance" />
        </div>
      </PageHeader>

      {/* Numbered because the lessons are a sequence: each builds on the one before. */}
      <ol className="max-w-3xl pt-4">
        {lessons.map((lesson, index) => (
          <li key={lesson.id} id={lesson.id} className="anchor-target grid gap-x-6 gap-y-2 border-t border-line py-6 first:border-t-0 sm:grid-cols-[3rem_1fr]">
            <p aria-hidden className="font-display text-2xl font-semibold tabular-nums text-ink-3">
              {String(index + 1).padStart(2, "0")}
            </p>
            <div>
              <h2 className="text-xl font-semibold">{lesson.title}</h2>
              <p className="mt-1 font-medium">{lesson.takeaway}</p>
              <ul className="mt-3 space-y-1.5">
                {lesson.points.map((point) => (
                  <li key={point} className="border-l border-line-strong pl-3 text-ink-2">
                    {point}
                  </li>
                ))}
              </ul>
              <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
                {lesson.links.map((link) => (
                  <Link key={link.href} href={link.href} className="font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent">
                    {link.label}
                  </Link>
                ))}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
