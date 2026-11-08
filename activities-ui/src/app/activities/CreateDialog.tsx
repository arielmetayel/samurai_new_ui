"use client";

import { Overlay } from "@/design-system";
import styles from "./styles.module.css";

type CreateDialogProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function CreateDialog({ open, onClose, children }: CreateDialogProps) {
  return (
    <Overlay open={open} onClose={onClose}>
      <div className={styles.popupContent}>{children}</div>
    </Overlay>
  );
}
