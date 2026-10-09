"use client";

import { ChevronDown, Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type RefObject } from "react";
import { SearchBox } from "../search/SearchBox";
import { Keycap } from "../ui/primitives";
import { ContextSwitch } from "./ContextSwitch";

interface NavItem {
  href: string;
  label: string;
  /** Pages grouped under this item. */
  children?: NavChild[];
}

interface NavChild {
  href: string;
  label: string;
  /** A heading the page sits under, for menus too long to scan as one list. */
  group?: string;
}

/** Children in order, split wherever the group name changes. */
function grouped(children: NavChild[]): { group?: string; items: NavChild[] }[] {
  const sections: { group?: string; items: NavChild[] }[] = [];
  for (const child of children) {
    const last = sections[sections.length - 1];
    if (last && last.group === child.group) last.items.push(child);
    else sections.push({ group: child.group, items: [child] });
  }
  return sections;
}

const nav: NavItem[] = [
  { href: "/", label: "Home" },
  {
    href: "/cheat-sheets",
    label: "Reference",
    children: [
      { href: "/cheat-sheets", label: "Cheat Sheets" },
      { href: "/starting-points", label: "Safe Starting Points" },
      { href: "/cheat-sheets/responsive-design", label: "Responsive & Viewports" },
      { href: "/systems", label: "Design System Library" },
      { href: "/explorer", label: "Compare Design Systems" },
      { href: "/figma", label: "Figma Guide" },
      { href: "/singapore", label: "Singapore UX" },
      { href: "/resources", label: "Resources" },
      { href: "/updates", label: "Updates" },
    ],
  },
  {
    href: "/checks",
    label: "Review",
    children: [
      { href: "/checks", label: "Design Checks" },
      { href: "/checks/before-you-send-it", label: "Before You Send It" },
      { href: "/checks/ai-look", label: "AI-Look Signals" },
    ],
  },
  {
    href: "/practice",
    label: "UX Practice",
    children: [
      { href: "/practice", label: "Overview", group: "Start here" },
      { href: "/practice/templates", label: "Templates", group: "Start here" },
      { href: "/practice/library", label: "Open Design Library", group: "Start here" },
      { href: "/practice/discovery", label: "Discovery", group: "Research" },
      { href: "/practice/recruiting", label: "Recruiting Participants", group: "Research" },
      { href: "/practice/user-interview", label: "User Interviews", group: "Research" },
      { href: "/practice/usability-test", label: "Usability Testing", group: "Research" },
      { href: "/practice/note-taking", label: "Note Taking", group: "Research" },
      { href: "/practice/synthesis", label: "Synthesis and Findings", group: "Research" },
      { href: "/practice/presenting-findings", label: "Presenting Findings", group: "Research" },
      { href: "/practice/research-repository", label: "Research Repositories", group: "Research" },
      { href: "/practice/workshop", label: "Workshop Facilitation", group: "Facilitation" },
      { href: "/practice/remote-workshop", label: "Remote Workshops", group: "Facilitation" },
      { href: "/practice/ideation-workshop", label: "Ideation Workshops", group: "Facilitation" },
      { href: "/practice/design-critique", label: "Design Critique", group: "Facilitation" },
      { href: "/practice/retrospective", label: "Retrospectives", group: "Facilitation" },
      { href: "/practice/journey-mapping", label: "Journey Mapping", group: "Methods" },
      { href: "/practice/prioritisation", label: "Prioritisation", group: "Methods" },
    ],
  },
  {
    href: "/ai",
    label: "AI + Design",
    children: [
      { href: "/ai", label: "Overview" },
      { href: "/ai/updates", label: "AI Updates" },
      { href: "/ai/generative-ui", label: "Generative UI" },
      { href: "/ai/workflow", label: "AI in Your Workflow" },
      { href: "/ai/prompts", label: "Prompt Library" },
      { href: "/ai/tools", label: "AI Tools" },
      { href: "/ai/review", label: "AI Design Review" },
      { href: "/ai/learn", label: "AI for Product Designers" },
    ],
  },
  { href: "/ask", label: "Ask UX" },
];

function isTyping(target: EventTarget | null): boolean {
  return target instanceof HTMLElement && (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));
}

export function Header() {
  const pathname = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const menu = useRef<HTMLDialogElement>(null);
  // Remounts the search box each time the palette opens, so it starts empty.
  const [session, setSession] = useState(0);

  function openPalette() {
    setSession((n) => n + 1);
    dialog.current?.showModal();
  }

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const commandK = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";
      const slash = event.key === "/" && !isTyping(event.target);
      if (commandK || slash) {
        event.preventDefault();
        openPalette();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur-sm">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-sm focus:bg-ink focus:px-3 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <div className="page flex h-14 items-center gap-6">
          <Link href="/" className="flex min-h-11 items-center gap-2 font-display text-lg font-semibold tracking-tight">
            <span
              aria-hidden
              className="inline-flex size-7 items-center justify-center rounded-sm border border-b-[3px] border-ink bg-mark text-sm"
            >
              S
            </span>
            Shortcut
          </Link>

          {/* The full navigation shows from the width at which it fits beside the logo and search. */}
          <nav aria-label="Main" className="hidden flex-1 nav:block">
            <NavList pathname={pathname} />
          </nav>

          <button
            type="button"
            onClick={openPalette}
            className="ml-auto inline-flex h-11 items-center gap-2 rounded-sm border border-line-strong px-3 text-sm text-ink-2 hover:border-ink hover:text-ink nav:ml-0 nav:h-9 nav:px-2.5"
          >
            <Search aria-hidden className="size-4" />
            <span>Search</span>
            <span className="hidden nav:inline-flex">
              <Keycap>/</Keycap>
            </span>
          </button>

          <button
            type="button"
            onClick={() => menu.current?.showModal()}
            aria-haspopup="dialog"
            className="-mr-2 inline-flex size-11 items-center justify-center rounded-sm text-ink hover:bg-wash nav:hidden"
          >
            <Menu aria-hidden className="size-6" />
            <span className="sr-only">Open menu</span>
          </button>
        </div>

        <MobileMenu ref={menu} pathname={pathname} />

        <dialog
          ref={dialog}
          aria-label="Search Shortcut"
          onClick={(event) => event.target === dialog.current && dialog.current?.close()}
          className="m-auto mt-[12vh] w-[min(40rem,calc(100vw-2rem))] overflow-hidden rounded-lg border border-line-strong bg-paper p-0 text-ink shadow-[0_24px_60px_-24px_rgb(20_23_31/0.5)]"
        >
          <SearchBox
            key={session}
            variant="palette"
            autoFocus
            onDone={() => dialog.current?.close()}
            hint={<Keycap>esc</Keycap>}
          />
        </dialog>
      </header>

      {/* Scrolls away with the page; the choice it sets is remembered. */}
      <div className="border-b border-line">
        <div className="page flex h-14 items-center justify-start md:h-11 nav:justify-end">
          <ContextSwitch />
        </div>
      </div>
    </>
  );
}

// Section roots that have their own child pages in the nav match exactly,
// so "/checks" is not marked current on "/checks/ai-look".
const EXACT = new Set(["/", "/checks", "/ai", "/practice"]);

function isCurrent(pathname: string, href: string): boolean {
  return EXACT.has(href) ? pathname === href : pathname.startsWith(href);
}

function linkClass(current: boolean): string {
  const state = current
    ? "font-semibold text-ink after:absolute after:inset-x-2.5 after:bottom-0 after:h-0.5 after:bg-ink"
    : "text-ink-2 hover:text-ink";
  return `relative flex h-14 items-center gap-1.5 whitespace-nowrap px-2.5 text-[0.9375rem] transition-colors ${state}`;
}

/** A nav item that opens a short list of pages. Closes on Escape, an outside click, or choosing a page. */
function NavMenu({ item, pathname }: { item: NavItem; pathname: string }) {
  const [open, setOpen] = useState(false);
  const wrapper = useRef<HTMLLIElement>(null);
  const children = item.children ?? [];
  const current = children.some((child) => isCurrent(pathname, child.href));
  const sections = grouped(children);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: PointerEvent) {
      if (!wrapper.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <li ref={wrapper} className="relative">
      <button type="button" aria-expanded={open} onClick={() => setOpen((value) => !value)} className={linkClass(current)}>
        {item.label}
        <ChevronDown aria-hidden className={`size-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        // A grouped menu sets its sections in two columns, and scrolls inside itself before it can outgrow the window.
        <div
          className={`pop-in absolute left-0 top-full z-30 -mt-1 max-h-[calc(100dvh-5rem)] overflow-y-auto rounded-lg border border-line-strong bg-paper p-1.5 shadow-[0_8px_24px_-12px_rgb(20_23_31/0.3)] ${
            sections.length > 1 ? "w-[32rem] columns-2 gap-1.5" : "w-60"
          }`}
        >
          {sections.map((section) => (
            <div key={section.group ?? "all"} className="break-inside-avoid pb-1.5">
              {section.group && <p className="px-2.5 pb-0.5 pt-1.5 text-sm font-semibold text-ink-3">{section.group}</p>}
              <ul>
                {section.items.map((child) => (
                  <li key={child.href}>
                    <Link
                      href={child.href}
                      onClick={() => setOpen(false)}
                      aria-current={isCurrent(pathname, child.href) ? "page" : undefined}
                      className={`flex items-center rounded-sm px-2.5 text-[0.9375rem] text-ink-2 hover:bg-wash hover:text-ink aria-[current]:font-semibold aria-[current]:text-ink ${section.group ? "min-h-9" : "min-h-10"}`}
                    >
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </li>
  );
}

interface MobileMenuProps {
  ref: RefObject<HTMLDialogElement | null>;
  pathname: string;
}

/**
 * The navigation as a drawer, for widths where the bar does not fit. It is a
 * modal dialog, so focus stays inside it and Escape closes it. It also closes
 * on the close button, on choosing a page, and on a tap outside.
 */
function MobileMenu({ ref, pathname }: MobileMenuProps) {
  const close = () => ref.current?.close();
  const link = (href: string, label: string, nested = false) => {
    const current = isCurrent(pathname, href);
    return (
      <li key={href}>
        <Link
          href={href}
          onClick={close}
          aria-current={current ? "page" : undefined}
          className={`flex min-h-12 items-center justify-between rounded-sm px-3 text-[1.0625rem] ${nested ? "pl-6" : "font-medium"} ${
            current ? "bg-wash font-semibold text-ink" : "text-ink-2 hover:bg-wash hover:text-ink"
          }`}
        >
          {label}
        </Link>
      </li>
    );
  };

  return (
    <dialog
      ref={ref}
      aria-label="Menu"
      onClick={(event) => event.target === ref.current && close()}
      className="my-0 ml-auto mr-0 h-dvh max-h-none w-[min(22rem,100vw)] max-w-none overflow-y-auto border-l border-line-strong bg-paper p-0 text-ink nav:hidden"
    >
      <div className="flex h-14 items-center justify-between border-b border-line pl-5 pr-3">
        <p className="font-display text-lg font-semibold tracking-tight">Menu</p>
        <button type="button" onClick={close} autoFocus className="inline-flex size-11 items-center justify-center rounded-sm hover:bg-wash">
          <X aria-hidden className="size-6" />
          <span className="sr-only">Close menu</span>
        </button>
      </div>
      <nav aria-label="Main" className="p-2">
        <ul className="space-y-0.5">
          {nav.map((item) =>
            item.children ? (
              <li key={item.label} className="pt-3">
                <p className="px-3 pb-1 text-sm font-semibold text-ink-3">{item.label}</p>
                {grouped(item.children).map((section) => (
                  <div key={section.group ?? "all"}>
                    {section.group && <p className="px-6 pb-0.5 pt-2 text-sm text-ink-3">{section.group}</p>}
                    <ul className="space-y-0.5">{section.items.map((child) => link(child.href, child.label, true))}</ul>
                  </div>
                ))}
              </li>
            ) : (
              link(item.href, item.label)
            ),
          )}
        </ul>
      </nav>
      <div className="border-t border-line p-5">
        <ContextSwitch />
      </div>
    </dialog>
  );
}

interface NavListProps {
  pathname: string;
}

function NavList({ pathname }: NavListProps) {
  return (
    <ul className="flex items-center gap-1">
      {nav.map((item) =>
        item.children ? (
          <NavMenu key={item.label} item={item} pathname={pathname} />
        ) : (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
              className={linkClass(isCurrent(pathname, item.href))}
            >
              {item.label}
            </Link>
          </li>
        ),
      )}
    </ul>
  );
}
