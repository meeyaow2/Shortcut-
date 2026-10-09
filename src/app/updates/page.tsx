import type { Metadata } from "next";
import { Suspense } from "react";
import { UpdatesView } from "@/components/updates/UpdatesView";
import { PageHeader } from "@/components/ui/primitives";

export const metadata: Metadata = { title: "Updates" };

export default function UpdatesPage() {
  return (
    <div className="page">
      <PageHeader
        title="Updates"
        lede="What changed across the sources designers rely on, why it matters and what to do about it."
      />
      <Suspense>
        <UpdatesView />
      </Suspense>
    </div>
  );
}
