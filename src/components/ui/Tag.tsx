import type { ReactNode } from "react";

type Tone = "neutral" | "outline" | "accent" | "ok" | "warn";

const tones: Record<Tone, string> = {
  neutral: "bg-wash text-ink-2",
  outline: "border border-line-strong text-ink-2",
  accent: "bg-accent-wash text-accent-strong",
  ok: "bg-ok-wash text-ok",
  warn: "bg-warn-wash text-warn",
};

export function Tag({ tone = "neutral", children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span className={`inline-flex h-6 items-center whitespace-nowrap rounded-sm px-2 text-xs font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
}
