import React from "react";
import styles from "./StatusChip.module.css";

export type StatusChipProps = {
  /** Any CSS color. Pass a token, e.g. var(--status-progress) or var(--env-status-open). */
  color: string;
  /** @deprecated Fill is derived from `color` so chips stay uniform. */
  background?: string;
  selected?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export function StatusChip({
  color,
  selected = false,
  children,
  className = "",
  onClick,
}: StatusChipProps) {
  const style = { "--chip-color": color } as React.CSSProperties;
  const classNames = [styles.chip, selected ? styles.selected : "", className]
    .filter(Boolean)
    .join(" ");

  if (onClick) {
    return (
      <button type="button" className={classNames} style={style} onClick={onClick}>
        {children}
      </button>
    );
  }

  return (
    <span className={classNames} style={style}>
      {children}
    </span>
  );
}
