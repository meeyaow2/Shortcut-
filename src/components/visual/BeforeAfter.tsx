import type { ReactNode } from "react";

/**
 * Paired wireframes: a pattern, and one direction that avoids it. They show a
 * tendency, not a rule. The right-hand side is a direction, not the answer.
 */
const canvas = "h-28 w-full overflow-hidden rounded-sm border border-line-strong bg-paper p-2.5";
const bar = "block h-1 rounded-full bg-ink-3/40";
const strong = "block h-1.5 rounded-full bg-ink/75";

function Pair({ before, after, note }: { before: ReactNode; after: ReactNode; note: string }) {
  return (
    <figure className="mt-3 max-w-xl">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="mb-1 text-sm font-semibold text-ink-3">Pattern</p>
          <div aria-hidden className={canvas}>
            {before}
          </div>
        </div>
        <div>
          <p className="mb-1 text-sm font-semibold text-ink-3">One direction</p>
          <div aria-hidden className={canvas}>
            {after}
          </div>
        </div>
      </div>
      <figcaption className="mt-1.5 text-sm text-ink-2">{note}</figcaption>
    </figure>
  );
}

const lines = (
  <>
    <span className={`${strong} w-2/5`} />
    <span className={`${bar} mt-1.5 w-full`} />
    <span className={`${bar} mt-1 w-3/4`} />
  </>
);

const pairs: Record<string, { before: ReactNode; after: ReactNode; note: string }> = {
  "cards-everywhere": {
    before: (
      <div className="grid h-full grid-cols-2 gap-1.5">
        {[0, 1, 2, 3].map((index) => (
          <div key={index} className="rounded-md border border-ink p-1.5">
            {lines}
          </div>
        ))}
      </div>
    ),
    after: (
      <div className="space-y-2">
        <div>{lines}</div>
        <span className="block border-t border-line-strong" />
        <div>{lines}</div>
        <span className="block border-t border-line-strong" />
        <div>{lines}</div>
      </div>
    ),
    note: "Not every group needs a container. Spacing and a divider can do the same job.",
  },
  "large-radii": {
    before: (
      <div className="h-full rounded-[22px] border border-ink p-2">
        <div className="h-full rounded-[16px] border border-ink p-2">
          <span className="block h-5 w-16 rounded-[12px] border border-ink bg-mark" />
        </div>
      </div>
    ),
    after: (
      <div className="h-full rounded-md border border-ink p-2">
        {lines}
        <span className="mt-2.5 block h-5 w-16 rounded-[4px] border border-ink bg-mark" />
      </div>
    ),
    note: "A small set of radii, sized to the element. Large radii on everything flatten the difference between a card and a button.",
  },
  pills: {
    before: (
      <div className="flex flex-wrap gap-1.5">
        {[10, 14, 8, 12, 16, 9, 12].map((width, index) => (
          <span key={index} className={`block h-4 rounded-full border border-ink ${index === 0 ? "bg-mark" : ""}`} style={{ width: width * 4 }} />
        ))}
      </div>
    ),
    after: (
      <div>
        <div className="flex gap-3 border-b border-line-strong">
          <span className="block w-10 border-b-2 border-ink pb-1.5">
            <span className={`${strong} w-full`} />
          </span>
          <span className="block w-10 pb-1.5">
            <span className={`${bar} w-full`} />
          </span>
          <span className="block w-10 pb-1.5">
            <span className={`${bar} w-full`} />
          </span>
        </div>
        <div className="mt-3">{lines}</div>
        <span className="mt-2.5 block h-5 w-16 rounded-[4px] border border-ink bg-mark" />
      </div>
    ),
    note: "Tabs, buttons and badges are different things. Giving each its own shape says which is which.",
  },
  gradients: {
    before: (
      <div className="-m-2.5 h-[calc(100%+1.25rem)] p-2.5" style={{ background: "linear-gradient(135deg, #c5c9d3, #f4f5f7 55%, #ffe566)" }}>
        <span className={`${strong} mx-auto w-1/2`} />
        <span className={`${bar} mx-auto mt-1.5 w-2/3 bg-ink/40`} />
      </div>
    ),
    after: (
      <div>
        <span className={`${strong} w-1/2`} />
        <span className={`${bar} mt-1.5 w-2/3`} />
        <div className="mt-3 rounded-[4px] border border-line-strong p-1.5">{lines}</div>
      </div>
    ),
    note: "A flat surface lets the content carry the page. Keep a gradient for when the brand actually has one.",
  },
  "kpi-cards": {
    before: (
      <div className="grid grid-cols-4 gap-1">
        {[0, 1, 2, 3].map((index) => (
          <div key={index} className="rounded-[4px] border border-ink p-1">
            <span className="block h-3 w-4/5 rounded-[2px] bg-ink/75" />
            <span className={`${bar} mt-1 w-full`} />
          </div>
        ))}
        <div className="col-span-4 mt-1 h-12 rounded-[4px] border border-line-strong" />
      </div>
    ),
    after: (
      <div>
        <span className={`${strong} w-3/5`} />
        <span className={`${bar} mt-1.5 w-2/5`} />
        <div className="mt-2.5 space-y-1.5">
          {[0, 1, 2].map((index) => (
            <div key={index} className="flex items-center gap-2">
              <span className={`size-2 shrink-0 rounded-full ${index === 0 ? "bg-mark ring-1 ring-ink" : "bg-line-strong"}`} />
              <span className={`${bar} flex-1`} />
            </div>
          ))}
        </div>
      </div>
    ),
    note: "Lead with what the person needs to do next. A row of big numbers is only useful if someone acts on them.",
  },
  "all-centred": {
    before: (
      <div className="space-y-2">
        {[0, 1, 2].map((index) => (
          <div key={index}>
            <span className={`${strong} mx-auto w-2/5`} />
            <span className={`${bar} mx-auto mt-1 w-3/5`} />
          </div>
        ))}
      </div>
    ),
    after: (
      <div className="grid h-full grid-cols-[1fr_2fr] gap-2.5">
        <div className="space-y-1.5 border-r border-line-strong pr-2">
          <span className={`${strong} w-4/5`} />
          <span className={`${bar} w-3/5`} />
          <span className={`${bar} w-4/5`} />
        </div>
        <div className="space-y-2">
          <div>{lines}</div>
          <div>{lines}</div>
        </div>
      </div>
    ),
    note: "A shared left edge gives the eye a line to follow. Centre the things that deserve it.",
  },
  whitespace: {
    before: (
      <div className="flex h-full flex-col justify-between">
        <span className={`${strong} w-2/5`} />
        <span className={`${bar} w-1/2`} />
        <span className={`${bar} w-1/3`} />
      </div>
    ),
    after: (
      <div className="space-y-3">
        <div>{lines}</div>
        <div>{lines}</div>
      </div>
    ),
    note: "Space should show what belongs together. Related things sit close; the gap goes between groups.",
  },
  "spacing-groups": {
    before: (
      <div className="space-y-2">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <span key={index} className={`${index % 3 === 0 ? strong : bar} ${index % 3 === 0 ? "w-2/5" : "w-4/5"}`} />
        ))}
      </div>
    ),
    after: (
      <div className="space-y-4">
        <div className="space-y-1">
          <span className={`${strong} w-2/5`} />
          <span className={`${bar} w-4/5`} />
          <span className={`${bar} w-3/5`} />
        </div>
        <div className="space-y-1">
          <span className={`${strong} w-2/5`} />
          <span className={`${bar} w-4/5`} />
          <span className={`${bar} w-3/5`} />
        </div>
      </div>
    ),
    note: "Left, everything is the same distance apart. Right, a small gap inside each group and a larger one between them.",
  },
  "cards-needed": {
    before: (
      <div className="h-full rounded-md border border-ink p-1.5">
        <div className="h-full rounded-[5px] border border-ink p-1.5">
          <div className="rounded-[4px] border border-ink p-1.5">{lines}</div>
        </div>
      </div>
    ),
    after: (
      <div className="h-full rounded-md border border-ink p-2">
        {lines}
        <span className="my-2 block border-t border-line-strong" />
        {lines}
      </div>
    ),
    note: "One container, with a divider inside it, in place of three nested ones.",
  },
  "buttons-primary": {
    before: (
      <div>
        {lines}
        <div className="mt-4 flex gap-1.5">
          {[0, 1, 2].map((index) => (
            <span key={index} className="block h-5 w-12 rounded-[4px] border border-ink bg-mark" />
          ))}
        </div>
      </div>
    ),
    after: (
      <div>
        {lines}
        <div className="mt-4 flex items-center gap-2">
          <span className="block h-5 w-12 rounded-[4px] border border-ink bg-mark" />
          <span className="block h-5 w-12 rounded-[4px] border border-line-strong" />
          <span className={`${bar} w-8`} />
        </div>
      </div>
    ),
    note: "One action carries the weight. The others step down so the next step is obvious.",
  },
};

export function hasBeforeAfter(id: string): boolean {
  return id in pairs;
}

/** The paired wireframe for a signal or check, when one is drawn. */
export function BeforeAfter({ id }: { id: string }) {
  const pair = pairs[id];
  return pair ? <Pair {...pair} /> : null;
}
