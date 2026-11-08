import React from "react";
import styles from "./Table.module.css";

type TableProps = {
  children: React.ReactNode;
  className?: string;
};

export function Table({ children, className = "" }: TableProps) {
  return <div className={`${styles.root} ${className}`.trim()}>{children}</div>;
}

type TableHeaderProps = {
  children: React.ReactNode;
  className?: string;
};

export function TableHeader({ children, className = "" }: TableHeaderProps) {
  return <div className={`${styles.header} ${className}`.trim()}>{children}</div>;
}

type TableRowProps = {
  children: React.ReactNode;
  leading?: React.ReactNode;
  selected?: boolean;
  className?: string;
  onClick?: () => void;
};

export function TableRow({
  children,
  leading,
  selected = false,
  className = "",
  onClick,
}: TableRowProps) {
  return (
    <div
      className={`${styles.item} ${selected ? styles.selected : ""} ${className}`.trim()}
      data-selected={selected ? "true" : undefined}
      onClick={onClick}
    >
      {leading != null ? (
        <div className={styles.lead} onClick={(event) => event.stopPropagation()}>
          {leading}
        </div>
      ) : null}
      {children}
    </div>
  );
}

type TableRowBodyOwnProps<T extends React.ElementType> = {
  as?: T;
  accent?: string;
  children: React.ReactNode;
  className?: string;
};

export type TableRowBodyProps<T extends React.ElementType = "div"> = TableRowBodyOwnProps<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof TableRowBodyOwnProps<T>>;

export function TableRowBody<T extends React.ElementType = "div">({
  as,
  accent,
  className = "",
  children,
  style,
  ...rest
}: TableRowBodyProps<T>) {
  const Comp = as ?? "div";
  const mergedStyle = {
    ...(style as React.CSSProperties | undefined),
    ...(accent ? ({ "--table-accent": accent } as React.CSSProperties) : {}),
  };

  return (
    <Comp
      className={`${styles.body} ${accent ? styles.accent : ""} ${className}`.trim()}
      style={mergedStyle}
      {...rest}
    >
      {children}
    </Comp>
  );
}
