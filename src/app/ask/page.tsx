import type { Metadata } from "next";
import { Suspense } from "react";
import { AskView } from "@/components/ask/AskView";
import { PageHeader } from "@/components/ui/primitives";

export const metadata: Metadata = { title: "Ask UX" };

export default function AskPage() {
  return (
    <div className="page">
      <PageHeader title="Ask UX" lede="Ask a UI/UX question. Get an answer grounded in trusted design guidelines." />
      <Suspense>
        <AskView />
      </Suspense>
    </div>
  );
}
