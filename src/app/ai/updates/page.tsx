import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/primitives";
import { UpdateCard } from "@/components/updates/UpdateCard";
import { unverifiedUpdateSources } from "@/data/ai";
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
      <p className="mt-8 max-w-read text-sm text-ink-2">
        <span className="font-semibold text-ink">Not covered yet: </span>
        {unverifiedUpdateSources.join(", ")}. Their release pages could not be read for checking, so nothing about them is
        stated here.
      </p>
    </div>
  );
}
