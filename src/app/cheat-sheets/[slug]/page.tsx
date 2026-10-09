import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CheatSheetView } from "@/components/cheats/CheatSheetView";
import { cheatSheets, getCheatSheet } from "@/data/cheat-sheets";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return cheatSheets.map((sheet) => ({ slug: sheet.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const sheet = getCheatSheet((await params).slug);
  return { title: sheet ? `${sheet.title} cheat sheet` : "Cheat sheet" };
}

async function Sheet({ params }: Props) {
  const sheet = getCheatSheet((await params).slug);
  if (!sheet) notFound();
  return <CheatSheetView sheet={sheet} />;
}

// Route params are read inside Suspense, as this Next.js version expects.
export default function CheatSheetPage({ params }: Props) {
  return (
    <Suspense>
      <Sheet params={params} />
    </Suspense>
  );
}
