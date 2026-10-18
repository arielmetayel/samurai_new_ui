// Samurai Design System - Color Tokens
export const colors = {
  primary: {
    50: "#e6f4ff",
    500: "#0082C8",
    600: "#026093",
  },

  neutral: {
    canvas: "#F7F9FB",
    surface: "#FFFFFF",
    muted: "#F6F8FA",
    chip: "#F3F4F6",
    border: "#E6E9EF",
    borderStrong: "#E3E8EE",
    200: "#868FA0",
    300: "#464F60",
    400: "#2F3036",
  },

  semantic: {
    success: "#059669",
    successBg: "#d1fae5",
    warning: "#d97706",
    warningBg: "#ffedd5",
    danger: "#dc2626",
    dangerBg: "#fee2e2",
  },

  status: {
    progress: "#e477af",
    progressBg: "#f7d5e6",
    tested: "#7c3aed",
    testedBg: "#efe7ff",
    review: "#d97706",
    reviewBg: "#ffedd5",
    confirmed: "#059669",
    confirmedBg: "#d1fae5",
    done: "#0082C8",
    doneBg: "#e6f4ff",
  },
} as const;

export type ColorToken = typeof colors;
