import type { Metadata } from "next";
import { EditorialLabel } from "@/components/craft/Craft";
import { TemplateBlock } from "@/components/practice/Practice";
import { PageHeader } from "@/components/ui/primitives";
import { practiceTemplates } from "@/data/practice";

export const metadata: Metadata = { title: "Research and Workshop Templates" };

export default function TemplatesPage() {
  return (
    <div className="page">
      <PageHeader
        title="Templates"
        lede="Thirteen plain structures for research and workshops. Copy one into your own document or board, or download it as a text file."
      >
        <div className="mt-5">
          <EditorialLabel kind="craft-guidance" />
        </div>
      </PageHeader>

      <div className="grid gap-10 pt-8 lg:grid-cols-[13rem_1fr]">
        <nav aria-label="Templates" className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
          <p className="text-sm font-semibold">Templates</p>
          <ul className="mt-2 space-y-0.5 border-l border-line">
            {practiceTemplates.map((template) => (
              <li key={template.id}>
                <a href={`#${template.id}`} className="-ml-px block border-l border-transparent py-1 pl-3 text-ink-2 hover:border-ink hover:text-ink">
                  {template.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="min-w-0 max-w-3xl">
          {practiceTemplates.map((template) => (
            <article key={template.id} id={template.id} className="anchor-target border-t border-line py-8 first:border-t-0 first:pt-2">
              <h2 className="text-2xl font-semibold">{template.title}</h2>
              <dl className="mt-3 space-y-2">
                <div>
                  <dt className="inline text-sm font-semibold text-ink-3">What it is for. </dt>
                  <dd className="inline">{template.purpose}</dd>
                </div>
                <div>
                  <dt className="inline text-sm font-semibold text-ink-3">How to use it. </dt>
                  <dd className="inline text-ink-2">{template.howToUse}</dd>
                </div>
                <div className="border-l-2 border-mark pl-3">
                  <dt className="text-sm font-semibold text-ink-3">Example</dt>
                  <dd>{template.example}</dd>
                </div>
              </dl>
              <div className="mt-4">
                <TemplateBlock template={template} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
