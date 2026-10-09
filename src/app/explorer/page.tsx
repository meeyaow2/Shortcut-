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
        {kind}s
      </h2>
      <ul className="divide-y divide-line">
        {topics.map((topic) => {
          const ready = topic.status === "verified";
          return (
            <li key={topic.id} className="grid items-center gap-x-6 gap-y-1 py-3.5 sm:grid-cols-[12rem_1fr_auto]">
              {ready ? (
                <Link href={`/explorer/${topic.id}`} className="font-display text-lg font-semibold tracking-tight hover:text-accent">
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
        <p className="mt-3 text-sm">
          <span className="font-semibold text-ink-3">AI and design systems </span>
          <Link href="/ai/learn#ai-design-systems" className="font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent">
            Check whether generated UI follows existing tokens
          </Link>
        </p>
      </PageHeader>
      <div className="space-y-12 pt-8">
        <TopicList kind="Foundation" />
        <TopicList kind="Component" />
      </div>
    </div>
  );
}
