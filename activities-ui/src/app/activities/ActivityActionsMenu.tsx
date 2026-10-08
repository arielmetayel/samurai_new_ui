"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Copy, Eye, FileText, MoreVertical, Paperclip, Share, Trash2 } from "react-feather";
import styles from "./ActivityActionsMenu.module.css";

const ACTIONS = [
  { id: "pdf", label: "Create PDF", icon: FileText },
  { id: "files", label: "Show Files", icon: Paperclip },
  { id: "duplicate", label: "Duplicate", icon: Copy },
  { id: "share", label: "Share", icon: Share },
  { id: "history", label: "Show History", icon: Eye },
  { id: "delete", label: "Delete", icon: Trash2, danger: true },
] as const;

type ActivityActionsMenuProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  iconSize?: number;
};

export default function ActivityActionsMenu({
  open,
  onOpenChange,
  iconSize = 20,
}: ActivityActionsMenuProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [coords, setCoords] = useState<{ top: number; right: number } | null>(null);

  function placeMenu() {
    const button = buttonRef.current;
    if (!button) return;
    const rect = button.getBoundingClientRect();
    setCoords({
      top: rect.bottom + 4,
      right: window.innerWidth - rect.right,
    });
  }

  function toggle() {
    if (open) {
      onOpenChange(false);
      return;
    }
    placeMenu();
    onOpenChange(true);
  }

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      if (containerRef.current?.contains(event.target as Node)) return;
      const menu = document.getElementById("activity-actions-menu");
      if (menu?.contains(event.target as Node)) return;
      onOpenChange(false);
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onOpenChange(false);
    }

    function handleReposition() {
      onOpenChange(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    window.addEventListener("resize", handleReposition);
    window.addEventListener("scroll", handleReposition, true);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
      window.removeEventListener("resize", handleReposition);
      window.removeEventListener("scroll", handleReposition, true);
    };
  }, [open, onOpenChange]);

  return (
    <div
      className={styles.menuContainer}
      ref={containerRef}
      onClick={(event) => event.stopPropagation()}
      onMouseDown={(event) => event.stopPropagation()}
    >
      <button
        ref={buttonRef}
        type="button"
        className={styles.menuButton}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Activity actions"
        onClick={toggle}
      >
        <MoreVertical size={iconSize} />
      </button>
      {open && coords
        ? createPortal(
            <div
              id="activity-actions-menu"
              className={styles.contextMenu}
              role="menu"
              style={{ top: coords.top, right: coords.right }}
            >
              {ACTIONS.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.id}
                    type="button"
                    role="menuitem"
                    className={
                      action.danger ? `${styles.menuItem} ${styles.menuItemDanger}` : styles.menuItem
                    }
                    onClick={() => onOpenChange(false)}
                  >
                    <Icon size={16} />
                    <span>{action.label}</span>
                  </button>
                );
              })}
            </div>,
            document.body
          )
        : null}
    </div>
  );
}
