import type { Metadata } from "next";
import { Suspense } from "react";
import { ResourcesView } from "@/components/resources/ResourcesView";
import { PageHeader } from "@/components/ui/primitives";

export const metadata: Metadata = { title: "Resources" };

export default function ResourcesPage() {
  return (
    <div className="page">
      <PageHeader title="Resources" lede="A few good tools for each job, chosen by what you are trying to do." />
      <Suspense>
        <ResourcesView />
      </Suspense>
    </div>
  );
}
