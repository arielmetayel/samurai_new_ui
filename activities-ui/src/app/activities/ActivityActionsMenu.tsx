"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Copy, Eye, FileText, MoreVertical, Paperclip, Share, Trash2 } from "react-feather";
import { useI18n } from "@/i18n";
import type { MessageKey } from "@/i18n/messages";
import styles from "./ActivityActionsMenu.module.css";

const ACTIONS = [
  { id: "pdf", labelKey: "actions.pdf" as MessageKey, icon: FileText },
  { id: "duplicate", labelKey: "actions.duplicate" as MessageKey, icon: Copy },
  { id: "share", labelKey: "actions.share" as MessageKey, icon: Share },
  { id: "history", labelKey: "actions.history" as MessageKey, icon: Eye },
  { id: "delete", labelKey: "actions.delete" as MessageKey, icon: Trash2, danger: true },
] as const;

type ActivityActionsMenuProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  iconSize?: number;
  buttonClassName?: string;
  onFiles?: () => void;
};

export default function ActivityActionsMenu({
  open,
  onOpenChange,
  iconSize = 20,
  buttonClassName,
  onFiles,
}: ActivityActionsMenuProps) {
  const { t } = useI18n();
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(null);

  function placeMenu() {
    const button = buttonRef.current;
    if (!button) return;
    const rect = button.getBoundingClientRect();
    const menuWidth = 220;
    const menuHeight = onFiles ? 268 : 220;
    const pad = 8;
    const rtl = document.documentElement.dir === "rtl";
    let left = rtl ? rect.right - menuWidth : rect.left;
    left = Math.min(Math.max(pad, left), window.innerWidth - menuWidth - pad);
    let top = rect.bottom + 4;
    if (top + menuHeight > window.innerHeight - pad) {
      top = Math.max(pad, rect.top - menuHeight - 4);
    }
    setCoords({ top, left });
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
        className={`${styles.menuButton} ${buttonClassName ?? ""}`}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t("actions.menu")}
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
              style={{ top: coords.top, left: coords.left }}
            >
              {onFiles ? (
                <button
                  type="button"
                  role="menuitem"
                  className={styles.menuItem}
                  onClick={() => {
                    onFiles();
                    onOpenChange(false);
                  }}
                >
                  <Paperclip size={16} />
                  <span>{t("panel.files")}</span>
                </button>
              ) : null}
              {ACTIONS.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.id}
                    type="button"
                    role="menuitem"
                    className={
                      "danger" in action && action.danger
                        ? `${styles.menuItem} ${styles.menuItemDanger}`
                        : styles.menuItem
                    }
                    onClick={() => onOpenChange(false)}
                  >
                    <Icon size={16} />
                    <span>{t(action.labelKey)}</span>
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
