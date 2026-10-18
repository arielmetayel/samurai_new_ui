import PlacementShell from "./PlacementShell";
import styles from "./placement.module.css";

export const metadata = {
  title: "שיבוץ",
};

export default function PlacementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PlacementShell className={styles.shell}>{children}</PlacementShell>;
}
