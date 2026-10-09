import type { Metadata } from "next";
import { EditorialLabel } from "@/components/craft/Craft";
import { PageHeader } from "@/components/ui/primitives";
import { StartingPointsView } from "@/components/viewport/StartingPointsView";
import { cheatSheets } from "@/data/cheat-sheets";
import { craftEntries } from "@/data/craft";

export const metadata: Metadata = { title: "Safe Starting Points" };

const starters = craftEntries.filter((entry) => entry.starter);

/** The first sheet each entry appears on, for its "full entry" link. */
const sheets = Object.fromEntries(
  starters.flatMap((entry) => {
    const sheet = cheatSheets.find((s) => s.sections.some((section) => section.entries?.some((item) => item.id === entry.id)));
    return sheet ? [[entry.id, { slug: sheet.slug, title: sheet.title }]] : [];
  }),
);

export default function StartingPointsPage() {
  return (
    <div className="page">
      <PageHeader
        title="Safe Starting Points"
        lede="Sensible values to begin from when no standard gives a hard answer. None of these is a rule, and none changes purely because of the device: each row says what it depends on."
      >
        <div className="mt-5">
          <EditorialLabel kind="industry-convention" />
        </div>
      </PageHeader>
      <StartingPointsView starters={starters} sheets={sheets} />
    </div>
  );
}
