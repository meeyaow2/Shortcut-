import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/primitives";
import { UpdateCard } from "@/components/updates/UpdateCard";
import { toolChangelogs } from "@/data/ai";
import { ExternalLink } from "@/components/ui/primitives";
import { aiFeed } from "@/data/updates";

export const metadata: Metadata = { title: "AI Updates" };

export default function AiUpdatesPage() {
  return (
    <div className="page">
      <PageHeader
        title="AI updates for designers"
        lede="New AI capabilities that change design work, taken from each vendor's own release notes. General AI news is left out."
      />
      <p role="status" className="pt-6 text-sm text-ink-2">
        {aiFeed.length} updates, newest first
      </p>
      <div className="max-w-3xl space-y-5 pt-4">
        {aiFeed.map((update) => (
          <UpdateCard key={update.id} update={update} />
        ))}
      </div>
      <section aria-labelledby="changelogs" className="section-gap max-w-3xl">
        <h2 id="changelogs" className="border-b-2 border-ink pb-2 text-2xl font-semibold">
          Where these tools publish changes
        </h2>
        <dl className="divide-y divide-line">
          {toolChangelogs.map((item) => (
            <div key={item.tool} className="grid gap-x-6 gap-y-1 py-3.5 sm:grid-cols-[8rem_1fr]">
              <dt className="font-semibold">{item.tool}</dt>
              <dd>
                <p className="text-ink-2">{item.note}</p>
                <p className="mt-1 text-sm">
                  <ExternalLink href={item.url}>{item.label}</ExternalLink>
                </p>
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
