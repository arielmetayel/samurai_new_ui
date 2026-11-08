// Primitive = raw swatches. Semantic = what screens and components consume.
// Hex case is not a product question. Brand primary is #0082C8.

export const primitive = {
  blue: {
    50: "#e6f4ff",
    200: "#9fd0ef",
    500: "#0082C8",
    600: "#026093",
  },
  neutral: {
    0: "#ffffff",
    25: "#f7f9fb",
    50: "#f6f8fa",
    75: "#f3f4f6",
    100: "#eef1f5",
    150: "#e6e9ef",
    200: "#e3e8ee",
    250: "#d5dbe3",
    300: "#c5cad3",
    350: "#c4c7ce",
    400: "#868fa0",
    500: "#464f60",
    600: "#2f3036",
  },
  green: {
    50: "#d1fae5",
    500: "#059669",
  },
  orange: {
    50: "#ffedd5",
    500: "#d97706",
  },
  red: {
    50: "#fee2e2",
    500: "#dc2626",
    600: "#b91c1c",
  },
  pink: {
    50: "#f7d5e6",
    500: "#e477af",
  },
  violet: {
    50: "#efe7ff",
    500: "#7c3aed",
  },
  overlay: "rgba(47, 48, 54, 0.45)",
} as const;

export const semantic = {
  color: {
    primary: primitive.blue[500],
    primaryHover: primitive.blue[600],
    primarySoft: primitive.blue[50],
    primaryMid: primitive.blue[200],
    text: primitive.neutral[600],
    textSecondary: primitive.neutral[500],
    textMuted: primitive.neutral[400],
    canvas: primitive.neutral[25],
    surface: primitive.neutral[0],
    surfaceMuted: primitive.neutral[50],
    chip: primitive.neutral[75],
    border: primitive.neutral[150],
    borderStrong: primitive.neutral[200],
    borderSubtle: primitive.neutral[100],
    borderMuted: primitive.neutral[250],
    borderHover: primitive.neutral[300],
    disabled: primitive.neutral[350],
    success: primitive.green[500],
    successBg: primitive.green[50],
    warning: primitive.orange[500],
    warningBg: primitive.orange[50],
    danger: primitive.red[500],
    dangerHover: primitive.red[600],
    dangerBg: primitive.red[50],
    overlay: primitive.overlay,
  },
} as const;

/** Live mock-status tokens used by screens today. Do not re-point screens until Stage 6. */
export const legacyStatus = {
  progress: primitive.pink[500],
  progressBg: primitive.pink[50],
  tested: primitive.violet[500],
  testedBg: primitive.violet[50],
  review: semantic.color.warning,
  reviewBg: semantic.color.warningBg,
  confirmed: semantic.color.success,
  confirmedBg: semantic.color.successBg,
  done: semantic.color.primary,
  doneBg: semantic.color.primarySoft,
} as const;

/** Current-environment catalog. New CSS vars; unused on screens until Stage 6. */
export const envStatus = {
  open: { he: "פתוח", value: "#d1f0b0", cssVar: "--env-status-open" },
  rejected: { he: "נדחה", value: "#9b9b9b", cssVar: "--env-status-rejected" },
  assignment: { he: "שיבוץ", value: "#7ed321", cssVar: "--env-status-assignment" },
  assignmentConfirmed: { he: "אישור שיבוץ", value: "#497d0c", cssVar: "--env-status-assignment-confirmed" },
  reported: { he: "דיווח", value: "#4abde2", cssVar: "--env-status-reported" },
  forReview: { he: "לעיון", value: "#fc6c85", cssVar: "--env-status-for-review" },
  completed: { he: "בוצע", value: "#2161f3", cssVar: "--env-status-completed" },
  inspected: { he: "נבדק", value: "#bd10e0", cssVar: "--env-status-inspected" },
  inspectorCare: { he: "לטיפול מפקח", value: "#d0021b", cssVar: "--env-status-inspector-care" },
  completeReport: { he: "השלמת דיווח", value: "#244102", cssVar: "--env-status-complete-report" },
  pmCare: { he: "לטיפול מנה״פ", value: "#f8e71c", cssVar: "--env-status-pm-care" },
} as const;

export type PrimitiveColor = typeof primitive;
export type SemanticColor = typeof semantic;
export type EnvStatusToken = typeof envStatus;
