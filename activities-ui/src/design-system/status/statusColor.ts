/** Live mock statuses currently on screens. Do not map --env-status-* here. */
const STATUS_COLOR: Record<string, string> = {
  "In Progress": "var(--status-progress)",
  Tested: "var(--status-tested)",
  "To Review": "var(--status-review)",
  Confirmed: "var(--status-confirmed)",
  Done: "var(--status-done)",
  Overdue: "var(--color-danger)",
  Pinned: "var(--color-danger)",
};

/** Extra filter labels still use local hex until Stage 6. */
const FILTER_STATUS_COLOR: Record<string, string> = {
  ...STATUS_COLOR,
  Open: "#8bc34a",
  Reported: "#7b8cff",
  Assigned: "#fb8f4a",
  "Complete Report": "#f07a7a",
  "Instructra Care": "#e879f9",
  Rejected: "#9aa3b2",
};

const STATUS_ACCENT: Record<string, string> = {
  "In Progress": "var(--status-progress-bg)",
  Tested: "var(--status-tested-bg)",
  "To Review": "var(--status-review-bg)",
  Confirmed: "var(--status-confirmed-bg)",
  Done: "var(--color-primary-soft)",
  Overdue: "var(--color-danger-bg)",
  Pinned: "var(--color-danger-bg)",
};

export function statusColor(status: string): string {
  return STATUS_COLOR[status] ?? "var(--status-progress)";
}

export function statusAccent(status: string): string {
  return STATUS_ACCENT[status] ?? "var(--color-border-strong)";
}

export function filterStatusColor(status: string): string {
  return FILTER_STATUS_COLOR[status] ?? "var(--status-progress)";
}
