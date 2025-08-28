export const checkboxTokens = {
  // Checkbox sizes
  sizes: {
    sm: {
      width: '16px',
      height: '16px',
      borderRadius: '4px',
    },
    md: {
      width: '20px',
      height: '20px',
      borderRadius: '4px',
    },
    lg: {
      width: '24px',
      height: '24px',
      borderRadius: '6px',
    },
  },
  
  // Checkbox colors
  colors: {
    unchecked: {
      border: '#D1D5DB',
      background: '#FFFFFF',
      hover: {
        border: '#9CA3AF',
        background: '#F9FAFB',
      },
    },
    checked: {
      border: '#0082C8',
      background: '#0082C8',
      hover: {
        border: '#026093',
        background: '#026093',
      },
    },
    disabled: {
      border: '#E5E7EB',
      background: '#F3F4F6',
      text: '#9CA3AF',
    },
  },
  
  // Checkbox states
  states: {
    focus: {
      outline: '2px solid #0082C8',
      outlineOffset: '2px',
    },
  },
};

export const iconTokens = {
  // Icon sizes for checkboxes
  sizes: {
    sm: '12px',
    md: '14px',
    lg: '16px',
  },
  
  // Icon colors
  colors: {
    checked: '#FFFFFF',
    disabled: '#9CA3AF',
  },
};
