import React from "react";
import styles from "./Card.module.css";

export type CardProps = {
  shadow?: "card" | "tight";
  children: React.ReactNode;
  className?: string;
};

export function Card({ shadow = "card", children, className = "" }: CardProps) {
  return (
    <div
      className={`${styles.card} ${shadow === "tight" ? styles.tight : ""} ${className}`.trim()}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  title,
  children,
}: {
  title?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={styles.header}>
      {title ? <h3 className={styles.title}>{title}</h3> : null}
      {children}
    </div>
  );
}

export function CardBody({ children }: { children: React.ReactNode }) {
  return <div className={styles.body}>{children}</div>;
}
