"use client";

import { IconChevronDown, IconChevronRight } from "@intentui/icons";
import { useState, ReactNode } from "react";

interface CustomDisclosureProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  menu?: ReactNode; // Menu dots atau actions lainnya
}

export function CustomDisclosure({
  title,
  children,
  defaultOpen = false,
  menu,
}: CustomDisclosureProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="group/disclosure w-full min-w-60 border-b border-border disabled:opacity-60">
      {/* Header */}
      <div className="flex items-center gap-x-2 py-3 text-left font-medium text-fg sm:text-sm">
        {/* Trigger hanya icon */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center w-5 h-5 hover:bg-accent rounded transition-colors text-muted-fg hover:text-fg"
          aria-label={isOpen ? "Collapse" : "Expand"}
        >
          {isOpen ? (
            <IconChevronDown className="size-4 shrink-0 transition duration-300" />
          ) : (
            <IconChevronRight className="size-4 shrink-0 transition duration-300" />
          )}
        </button>

        {/* Title (bisa buat rename/edit) */}
        <span className="flex-1 truncate">{title}</span>

        {/* Menu (create/rename/delete dsb) */}
        {menu && <div className="ml-auto">{menu}</div>}
      </div>

      {/* Panel konten */}
      <div
        className={`overflow-hidden text-muted-fg transition-all duration-300 ${
          isOpen
            ? "animate-disclosure-expanded"
            : "animate-disclosure-collapsed"
        }`}
      >
        <div className="text-pretty pt-0 pb-3 text-sm/6">{children}</div>
      </div>
    </div>
  );
}

// Untuk nesting (misal: Sprint -> List -> Task)
interface CustomDisclosureGroupProps {
  children: ReactNode;
  className?: string;
}

export function CustomDisclosureGroup({
  children,
  className = "",
}: CustomDisclosureGroupProps) {
  return (
    <div className={`space-y-3 border-t border-border ${className}`}>
      {children}
    </div>
  );
}
