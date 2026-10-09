"use client";

import { useId, useState, type ReactElement, cloneElement, type KeyboardEvent } from "react";

interface TooltipProps {
  label: string;
  children: ReactElement<{ "aria-describedby"?: string }>;
}

/**
 * Follows the rules on Shortcut's own Accessibility sheet (WCAG 1.4.13):
 * opens on hover and on keyboard focus, closes with Escape without moving
 * focus, and stays open while the pointer is over it. Use it for supporting
 * hints only, never for information needed to complete a task.
 */
export function Tooltip({ label, children }: TooltipProps) {
  const id = useId();
  const [open, setOpen] = useState(false);

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") setOpen(false);
  }

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      onKeyDown={onKeyDown}
    >
      {cloneElement(children, { "aria-describedby": open ? id : undefined })}
      {open && (
        <span
          id={id}
          role="tooltip"
          className="pop-in absolute left-1/2 top-full z-30 -translate-x-1/2 whitespace-nowrap pt-1.5"
        >
          <span className="block rounded-sm bg-ink px-2 py-1 text-xs font-medium text-paper">{label}</span>
        </span>
      )}
    </span>
  );
}
