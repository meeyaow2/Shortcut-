import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

const bar = "block h-1 rounded-full bg-ink-3/40";

/** Where each tile starts before it settles into the grid. */
const scatter = [
  { dx: "-14px", dy: "-10px", r: "-5deg" },
  { dx: "10px", dy: "-16px", r: "4deg" },
  { dx: "18px", dy: "-4px", r: "-3deg" },
  { dx: "-18px", dy: "8px", r: "3deg" },
  { dx: "-6px", dy: "16px", r: "-4deg" },
  { dx: "14px", dy: "12px", r: "5deg" },
];

const tiles: { label: string; mark?: boolean; body: ReactNode }[] = [
  {
    label: "Spacing",
    body: (
      <span className="flex items-center">
        <span className="size-4 rounded-[2px] border border-ink" />
        <span className="h-4 w-2 bg-mark" />
        <span className="size-4 rounded-[2px] border border-ink" />
      </span>
    ),
  },
  { label: "Type", body: <span className="font-display text-2xl font-semibold leading-none tracking-tight">Aa</span> },
  {
    label: "Colour",
    body: (
      <span className="flex overflow-hidden rounded-[3px] border border-ink">
        <span className="size-4 bg-ink" />
        <span className="size-4 bg-ink-3" />
        <span className="size-4 bg-paper" />
      </span>
    ),
  },
  { label: "WCAG", mark: true, body: <span className="font-display text-lg font-semibold leading-none tracking-tight">4.5:1</span> },
  { label: "AI", body: <span className="font-display text-xl font-semibold leading-none tracking-tight">AI</span> },
  { label: "Systems", body: <span className="flex h-5 w-12 items-center justify-center rounded-[4px] border border-ink"><span className="h-1 w-6 rounded-full bg-ink" /></span> },
];

/**
 * The hero visual: six kinds of design knowledge, drawn as tiles that start
 * loose and settle into one grid, then get joined by a line. It plays once.
 */
export function KnowledgeBlocks() {
  return (
    <div aria-hidden className="relative w-[17.5rem]">
      <svg viewBox="0 0 280 180" className="pointer-events-none absolute inset-0 size-full" fill="none">
        <path className="draw-in" d="M44 44 H236 V136 H44 Z" stroke="var(--color-line-strong)" strokeWidth="1" strokeDasharray="560" style={{ "--len": 560 } as CSSProperties} />
      </svg>
      <ul className="relative grid grid-cols-3 gap-2">
        {tiles.map((tile, index) => (
          <li
            key={tile.label}
            className={`settle flex h-[5.25rem] flex-col items-center justify-center gap-2 rounded-md border border-ink ${tile.mark ? "bg-mark" : "bg-paper"}`}
            style={{ "--i": index, "--dx": scatter[index].dx, "--dy": scatter[index].dy, "--r": scatter[index].r } as CSSProperties}
          >
            <span className="flex h-7 items-center">{tile.body}</span>
            <span className="text-xs font-medium text-ink-2">{tile.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const previews: { href: string; title: string; detail: string; visual: ReactNode }[] = [
  {
    href: "/cheat-sheets",
    title: "Cheat Sheets",
    detail: "Values and rules, with sources.",
    visual: (
      <span className="flex items-end gap-3">
        <span className="flex items-center">
          <span className="size-5 rounded-[2px] border border-ink" />
          <span className="h-5 w-3 bg-mark" />
          <span className="size-5 rounded-[2px] border border-ink" />
        </span>
        <span className="font-display text-2xl font-semibold leading-none tracking-tight">Aa</span>
      </span>
    ),
  },
  {
    href: "/checks",
    title: "Design Checks",
    detail: "What a reviewer looks for.",
    visual: (
      <span className="relative block w-20 rounded-[4px] border border-ink p-1.5">
        <span className={`${bar} w-3/5 bg-ink/75`} />
        <span className={`${bar} mt-1 w-full`} />
        <span className="mt-1.5 block h-2.5 w-8 rounded-[2px] bg-mark ring-1 ring-ink" />
        <span className="absolute -right-2 -top-2 flex size-4 items-center justify-center rounded-full border border-ink bg-paper text-[0.625rem] font-semibold">1</span>
      </span>
    ),
  },
  {
    href: "/ai",
    title: "AI + Design",
    detail: "Where AI helps, and what stays yours.",
    visual: (
      <span className="flex items-center gap-1.5">
        {["", "bg-mark", ""].map((fill, index) => (
          <span key={index} className="flex items-center gap-1.5">
            {index > 0 && <span className="block h-px w-3 bg-ink" />}
            <span className={`block h-5 w-7 rounded-[3px] border border-ink ${fill}`} />
          </span>
        ))}
      </span>
    ),
  },
  {
    href: "/practice",
    title: "UX Practice",
    detail: "Interviews, tests, workshops.",
    visual: (
      <span className="flex items-center gap-2">
        <span className="grid grid-cols-2 gap-0.5">
          {[0, 1, 2, 3].map((index) => (
            <span key={index} className="size-2.5 border border-ink bg-mark" />
          ))}
        </span>
        <span className="block h-px w-3 bg-ink" />
        <span className="block w-10 rounded-[3px] border border-ink p-1">
          <span className={`${bar} w-full bg-ink/75`} />
          <span className={`${bar} mt-1 w-3/5`} />
        </span>
      </span>
    ),
  },
  {
    href: "/systems",
    title: "Design Systems",
    detail: "Real systems, compared.",
    visual: (
      <span className="flex items-center gap-1.5">
        <span className="block h-5 w-9 border border-ink" />
        <span className="block h-5 w-9 rounded-[4px] border border-ink bg-mark" />
        <span className="block h-5 w-9 rounded-full border border-ink" />
      </span>
    ),
  },
];

/** Five ways in, each with a small drawing of what is behind it. */
export function HomePreviews() {
  return (
    <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
      {previews.map((item) => (
        <li key={item.href}>
          <Link href={item.href} className="lift flex h-full flex-col rounded-md border border-line p-3 hover:border-ink">
            <span aria-hidden className="flex h-12 items-center">
              {item.visual}
            </span>
            <span className="mt-2 font-display text-lg font-semibold tracking-tight">{item.title}</span>
            <span className="text-sm text-ink-2">{item.detail}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
