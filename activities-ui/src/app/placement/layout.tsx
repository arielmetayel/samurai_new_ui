import { Rubik } from "next/font/google";
import PlacementShell from "./PlacementShell";
import styles from "./placement.module.css";

const rubik = Rubik({
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-rubik",
});

export const metadata = {
  title: "שיבוץ",
};

export default function PlacementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PlacementShell className={`${styles.shell} ${rubik.variable}`}>
      {children}
    </PlacementShell>
  );
}
