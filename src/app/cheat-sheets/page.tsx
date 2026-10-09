import type { Metadata } from "next";
import { CheatSheetLibrary } from "@/components/cheats/CheatSheetLibrary";
import { PageHeader } from "@/components/ui/primitives";

export const metadata: Metadata = { title: "Cheat Sheets" };

export default function CheatSheetsPage() {
  return (
    <div className="page">
      <PageHeader
        title="Cheat Sheets"
        lede="Quick references for the things you look up again and again. Every rule names its source, and shows where sources disagree."
      />
      <CheatSheetLibrary />
    </div>
  );
}
