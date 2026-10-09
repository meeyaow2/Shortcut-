import type { Metadata } from "next";
import { PromptBuilder, PromptCard } from "@/components/ai/Ai";
import { EditorialLabel } from "@/components/craft/Craft";
import { PageHeader } from "@/components/ui/primitives";
import { promptCategories, prompts } from "@/data/prompts";

export const metadata: Metadata = { title: "Prompt Library" };

const slug = (category: string) => `cat-${category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

export default function PromptsPage() {
  return (
    <div className="page">
      <PageHeader
        title="Prompt Library"
        lede="Task-specific prompts for design work. Each says what to provide, what to expect back, and what to verify yourself."
      >
        <div className="mt-5 space-y-2">
          <EditorialLabel kind="craft-guidance" />
          <p className="max-w-read text-sm text-ink-2">
            Written from practice, not benchmarked. Fill in the square brackets; the more real material you paste, the
            better the answer.
          </p>
        </div>
      </PageHeader>

      <div className="pt-8">
        <PromptBuilder />
      </div>

      <div className="grid gap-10 pt-10 lg:grid-cols-[13rem_1fr]">
        <nav aria-label="Prompt categories" className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
          <p className="text-sm font-semibold">Categories</p>
          <ul className="mt-2 space-y-0.5 border-l border-line">
            {promptCategories.map((category) => (
              <li key={category}>
                <a href={`#${slug(category)}`} className="-ml-px block border-l border-transparent py-1 pl-3 text-ink-2 hover:border-ink hover:text-ink">
                  {category}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="min-w-0 max-w-3xl stack-sections">
          {promptCategories.map((category) => (
            <section key={category} id={slug(category)} aria-labelledby={`${slug(category)}-title`}>
              <h2 id={`${slug(category)}-title`} className="border-b-2 border-ink pb-2 text-2xl font-semibold">
                {category}
              </h2>
              <div className="pt-4">
                {prompts
                  .filter((prompt) => prompt.category === category)
                  .map((prompt) => (
                    <PromptCard key={prompt.id} prompt={prompt} />
                  ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
