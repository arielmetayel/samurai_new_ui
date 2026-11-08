"use client";

import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "react-feather";
import styles from "./overlay.module.css";

function useOverlayChrome(open: boolean, onClose?: () => void) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);
}

export type OverlayProps = {
  open: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  className?: string;
  /** center = modal; end = edge drawer (RTL-aware flex-end). */
  placement?: "center" | "end";
};

export function Overlay({
  open,
  onClose,
  children,
  className = "",
  placement = "center",
}: OverlayProps) {
  useOverlayChrome(open, onClose);
  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      className={`${styles.backdrop} ${
        placement === "end" ? styles.backdropDrawer : ""
      } ${className}`.trim()}
      onClick={onClose}
      role="presentation"
    >
      <div
        className={placement === "end" ? styles.drawerSlot : undefined}
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

export type ModalProps = {
  title?: string;
  subtitle?: string;
  size?: "md" | "lg";
  onClose?: () => void;
  footer?: React.ReactNode;
  children: React.ReactNode;
};

export function Modal({
  title,
  subtitle,
  size = "md",
  onClose,
  footer,
  children,
}: ModalProps) {
  return (
    <div
      className={`${styles.modal} ${size === "lg" ? styles.modalLg : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "ds-modal-title" : undefined}
    >
      {(title || onClose) && (
        <div className={styles.header}>
          <div>
            {title ? (
              <h2 id="ds-modal-title" className={styles.title}>
                {title}
              </h2>
            ) : null}
            {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
          </div>
          {onClose ? (
            <button type="button" className={styles.close} onClick={onClose} aria-label="סגור">
              <X size={18} />
            </button>
          ) : null}
        </div>
      )}
      <div className={styles.body}>{children}</div>
      {footer ? <div className={styles.footer}>{footer}</div> : null}
    </div>
  );
}

export type DrawerProps = {
  open: boolean;
  onClose?: () => void;
  title?: string;
  subtitle?: string;
  width?: "filter" | "panel";
  footer?: React.ReactNode;
  banner?: React.ReactNode;
  padded?: boolean;
  bodyClassName?: string;
  children: React.ReactNode;
};

export function Drawer({
  open,
  onClose,
  title,
  subtitle,
  width = "filter",
  footer,
  banner,
  padded = true,
  bodyClassName = "",
  children,
}: DrawerProps) {
  useOverlayChrome(open, onClose);
  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      className={`${styles.backdrop} ${styles.backdropDrawer}`}
      onClick={onClose}
      role="presentation"
    >
      <aside
        className={`${styles.drawer} ${width === "panel" ? styles.drawerWide : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "ds-drawer-title" : undefined}
        onClick={(event) => event.stopPropagation()}
      >
        {(title || onClose) && (
          <div className={styles.header}>
            <div>
              {title ? (
                <h2 id="ds-drawer-title" className={styles.title}>
                  {title}
                </h2>
              ) : null}
              {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
            </div>
            {onClose ? (
              <button type="button" className={styles.close} onClick={onClose} aria-label="סגור">
                <X size={18} />
              </button>
            ) : null}
          </div>
        )}
        {banner}
        <div
          className={`${styles.body} ${padded ? "" : styles.bodyBare} ${bodyClassName}`.trim()}
        >
          {children}
        </div>
        {footer ? <div className={styles.footer}>{footer}</div> : null}
      </aside>
    </div>,
    document.body
  );
}
