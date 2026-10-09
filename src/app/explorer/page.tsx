import type { Metadata } from "next";
import Link from "next/link";
import { SourceBadge } from "@/components/source/Source";
import { Tag } from "@/components/ui/Tag";
import { PageHeader } from "@/components/ui/primitives";
import { explorerSystems, explorerTopics } from "@/data/explorer";
import type { ExplorerTopic } from "@/types";

export const metadata: Metadata = { title: "Design System Explorer" };

function TopicList({ kind }: { kind: ExplorerTopic["kind"] }) {
  const topics = explorerTopics.filter((t) => t.kind === kind);
  return (
    <section aria-labelledby={`kind-${kind}`}>
      <h2 id={`kind-${kind}`} className="border-b-2 border-ink pb-2 text-2xl font-semibold">
        {kind === "Viewport" ? "Viewport and platform" : `${kind}s`}
      </h2>
      {kind === "Viewport" && (
        <p className="mt-3 max-w-read text-ink-2">
          Where systems speak about screen size, touch or folding directly. Other topics have no viewport filter, because few systems publish per-viewport
          values: where one says nothing, the comparison says so and does not fill the gap.
        </p>
      )}
      <ul className="divide-y divide-line">
        {topics.map((topic) => {
          const ready = topic.status === "verified";
          return (
            <li key={topic.id} className="grid items-center gap-x-6 gap-y-1 py-3.5 sm:grid-cols-[12rem_1fr_auto]">
              {ready ? (
                <Link href={`/explorer/${topic.id}`} className="-my-2 py-2 font-display text-lg font-semibold tracking-tight hover:text-accent">
                  {topic.title}
                </Link>
              ) : (
                <span className="font-display text-lg font-semibold tracking-tight text-ink-3">{topic.title}</span>
              )}
              <span className="text-ink-2">{ready ? topic.summary : "Sources not yet checked. Nothing is shown until they are."}</span>
              {ready ? (
                <Tag tone="ok">
                  {Object.keys(topic.cells ?? {}).length} of {explorerSystems.length} systems read
                </Tag>
              ) : (
                <Tag tone="outline">In progress</Tag>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default function ExplorerPage() {
  return (
    <div className="page">
      <PageHeader
        title="Design System Explorer"
        lede="See how different design systems handle the same foundation or component, up to four side by side, with a link to each original page."
      >
        <p className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-sm text-ink-2">
          <span>Systems read</span>
          {explorerSystems.map((id) => (
            <SourceBadge key={id} id={id} />
          ))}
        </p>
        <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
          <span className="font-semibold text-ink-3">Compare by</span>
          {(["Foundation", "Component", "Viewport"] as const).map((kind) => (
            <a key={kind} href={`#kind-${kind}`} className="py-1 font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent">
              {kind === "Viewport" ? "Viewport and platform" : kind}
            </a>
          ))}
        </p>
        <p className="mt-3 text-sm">
          <span className="font-semibold text-ink-3">AI and design systems </span>
          <Link href="/ai/learn#ai-design-systems" className="font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent">
            Check whether generated UI follows existing tokens
          </Link>
        </p>
      </PageHeader>
      <div className="stack-sections pt-8">
        <TopicList kind="Foundation" />
        <TopicList kind="Component" />
        <TopicList kind="Viewport" />
      </div>
    </div>
  );
}
