"use client";

import { Check, Copy, Download, X } from "lucide-react";
import { useState } from "react";
import type { PracticeTemplate } from "@/data/practice";

const action = "inline-flex min-h-11 md:min-h-9 items-center gap-1.5 rounded-sm px-2.5 text-sm font-medium text-ink-2 hover:bg-paper hover:text-ink";

/** A template's blank structure, with copy and download. Wraps instead of scrolling sideways. */
export function TemplateBlock({ template }: { template: PracticeTemplate }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(template.blank);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked: the text is still selectable by hand.
    }
  }

  function download() {
    const url = URL.createObjectURL(new Blob([template.blank], { type: "text/plain" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `${template.id}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="rounded-md border border-line bg-wash">
      <div className="flex items-center justify-between gap-3 border-b border-line py-1.5 pl-4 pr-1.5">
        <p className="text-sm font-semibold text-ink-3">Blank structure</p>
        <div className="flex">
          <button type="button" onClick={copy} className={action}>
            {copied ? <Check aria-hidden className="size-4 text-ok" /> : <Copy aria-hidden className="size-4" />}
            <span role="status">{copied ? "Copied" : "Copy"}</span>
          </button>
          <button type="button" onClick={download} className={action}>
            <Download aria-hidden className="size-4" />
            <span>
              Download<span className="sr-only"> {template.title} as a text file</span>
            </span>
          </button>
        </div>
      </div>
      <pre className="whitespace-pre-wrap break-words p-4 font-sans text-[0.9375rem] leading-relaxed text-ink">{template.blank}</pre>
    </div>
  );
}

/** Do and Don't, side by side. Each item carries a tick or cross as well as its heading, so colour is not the only signal. */
export function DoDont({ dos, donts }: { dos: string[]; donts: string[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="rounded-md border border-line p-4">
        <h3 className="font-sans text-sm font-semibold tracking-normal text-ok">Do</h3>
        <ul className="mt-2 space-y-1.5">
          {dos.map((item) => (
            <li key={item} className="flex gap-2">
              <Check aria-hidden className="mt-1 size-4 shrink-0 text-ok" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-md border border-line p-4">
        <h3 className="font-sans text-sm font-semibold tracking-normal text-warn">Don&rsquo;t</h3>
        <ul className="mt-2 space-y-1.5">
          {donts.map((item) => (
            <li key={item} className="flex gap-2">
              <X aria-hidden className="mt-1 size-4 shrink-0 text-warn" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
