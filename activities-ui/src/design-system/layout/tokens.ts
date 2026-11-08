export const space = {
  4: "4px",
  8: "8px",
  12: "12px",
  16: "16px",
  24: "24px",
  32: "32px",
} as const;

export const radius = {
  sm: "8px",
  md: "12px",
  lg: "16px",
  pill: "999px",
  button: "30px",
  buttonAction: "12px",
  field: "10px",
} as const;

export const shadow = {
  card: "0 4px 12px rgba(47, 48, 54, 0.06)",
  cardTight: "1.2px 1.2px 1.2px 0 rgba(232, 232, 232, 0.8)",
  modal: "0 16px 48px rgba(47, 48, 54, 0.2)",
  action:
    "0 -1px 3px 0 rgba(60, 66, 87, 0.08), 0 0 0 1px rgba(60, 66, 87, 0.16), 0 1px 1px 0 rgba(0, 0, 0, 0.12)",
} as const;

export const duration = {
  fast: "150ms",
  normal: "200ms",
} as const;

export const easing = {
  standard: "ease-in-out",
} as const;

export const zIndex = {
  header: 100,
  panel: 1200,
  modal: 1300,
} as const;

export const layout = {
  sidebarWidth: "240px",
  sidebarWidthCollapsed: "72px",
  headerHeight: "72px",
} as const;

export type SpaceToken = typeof space;
export type RadiusToken = typeof radius;
