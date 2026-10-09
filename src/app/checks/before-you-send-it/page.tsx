import type { Metadata } from "next";
import Link from "next/link";
import { Checklist } from "@/components/checks/Checklist";
import { EditorialLabel } from "@/components/craft/Craft";
import { PageHeader } from "@/components/ui/primitives";

export const metadata: Metadata = { title: "Before You Send It" };

export default function BeforeYouSendItPage() {
  return (
    <div className="page">
      <PageHeader title="Before You Send It" lede="A final design QA before your design lead sees it.">
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
          <EditorialLabel kind="craft-guidance" />
          <p className="text-sm">
            <span className="font-semibold text-ink-3">AI-assisted review </span>
            <Link href="/ai/review" className="font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent">
              Run a structured critique before handoff
            </Link>
          </p>
        </div>
      </PageHeader>
      <Checklist />
    </div>
  );
}
