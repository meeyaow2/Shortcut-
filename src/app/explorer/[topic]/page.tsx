import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { TokenLadder, TopicComparison } from "@/components/explorer/Explorer";
import { Tag } from "@/components/ui/Tag";
import { explorerTopics, getExplorerTopic } from "@/data/explorer";

type Props = { params: Promise<{ topic: string }> };

const verified = explorerTopics.filter((t) => t.status === "verified");

export function generateStaticParams() {
  return verified.map((t) => ({ topic: t.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const topic = getExplorerTopic((await params).topic);
  return { title: topic ? `${topic.title} across design systems` : "Design System Explorer" };
}

// Route params are read inside Suspense, as this Next.js version expects.
export default function ExplorerTopicPage({ params }: Props) {
  return (
    <Suspense>
      <Topic params={params} />
    </Suspense>
  );
}

async function Topic({ params }: Props) {
  const topic = getExplorerTopic((await params).topic);
  if (!topic || topic.status !== "verified") notFound();

  return (
    <div className="page">
      <header className="border-b border-line pb-8 pt-8 md:pt-10">
        <Link href="/explorer" className="inline-flex items-center gap-1.5 text-sm text-ink-2 hover:text-ink">
          <ArrowLeft aria-hidden className="size-4" />
          Design System Explorer
        </Link>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <h1 className="text-4xl font-semibold md:text-5xl">{topic.title}</h1>
          <Tag tone="outline">{topic.kind}</Tag>
        </div>
        <p className="mt-3 max-w-read text-lg text-ink-2">{topic.summary}</p>
        {/* Twenty chips would fill a phone screen, so they scroll sideways there and wrap from md up. */}
        <nav aria-label="Other topics" className="-mx-4 mt-5 flex gap-1.5 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-0">
          {verified.map((t) => (
            <Link
              key={t.id}
              href={`/explorer/${t.id}`}
              aria-current={t.id === topic.id ? "page" : undefined}
              className="inline-flex min-h-9 shrink-0 items-center whitespace-nowrap rounded-sm border border-line px-2.5 text-sm text-ink-2 hover:border-ink hover:text-ink aria-[current]:border-ink aria-[current]:bg-ink aria-[current]:font-medium aria-[current]:text-paper"
            >
              {t.title}
            </Link>
          ))}
        </nav>
      </header>
      <div className="pt-8">
        {topic.id === "design-tokens" && <TokenLadder />}
        {topic.id === "design-tokens" && <h2 className="mb-4 text-2xl font-semibold">How the systems compare</h2>}
        <TopicComparison key={topic.id} topic={topic} />
      </div>
    </div>
  );
}
