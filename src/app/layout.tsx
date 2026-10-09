import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { AuthorityLegend } from "@/components/source/Source";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display-face", display: "swap" });
const body = Instrument_Sans({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Shortcut", template: "%s | Shortcut" },
  description: "Everything UI/UX, without the rabbit hole. Guidelines, updates, patterns and resources, distilled for designers.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="flex min-h-screen flex-col">
        <Header />
        <main id="main" className="flex-1 pb-24">
          {children}
        </main>
        <footer className="border-t border-line">
          {/* Label meanings are also in hover titles; this copy is for touch and keyboard. */}
          <div className="page pt-8">
            <div className="max-w-read">
              <AuthorityLegend />
            </div>
          </div>
          <div className="page flex flex-col gap-2 py-8 text-sm text-ink-2 md:flex-row md:justify-between">
            <p>
              Shortcut links every claim to its source. “Why it matters” and “What to do” are Shortcut’s reading, not
              the source’s words.
            </p>
            <p className="whitespace-nowrap">A portfolio prototype.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
