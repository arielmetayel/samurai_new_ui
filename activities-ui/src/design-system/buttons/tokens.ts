export const checkboxTokens = {
  sizes: {
    sm: {
      width: "16px",
      height: "16px",
      borderRadius: "4px",
    },
    md: {
      width: "20px",
      height: "20px",
      borderRadius: "4px",
    },
    lg: {
      width: "24px",
      height: "24px",
      borderRadius: "6px",
    },
  },

  colors: {
    unchecked: {
      border: "var(--color-border-muted)",
      background: "var(--color-surface)",
      hover: {
        border: "var(--color-text-muted)",
        background: "var(--color-surface-muted)",
      },
    },
    checked: {
      border: "var(--color-primary)",
      background: "var(--color-primary)",
      hover: {
        border: "var(--color-primary-hover)",
        background: "var(--color-primary-hover)",
      },
    },
    disabled: {
      border: "var(--color-border)",
      background: "var(--color-surface-muted)",
      text: "var(--color-text-muted)",
    },
  },

  states: {
    focus: {
      outline: "2px solid var(--color-primary)",
      outlineOffset: "2px",
    },
  },
};

export const iconTokens = {
  sizes: {
    sm: "12px",
    md: "14px",
    lg: "16px",
  },

  colors: {
    checked: "var(--color-surface)",
    disabled: "var(--color-text-muted)",
  },
};
