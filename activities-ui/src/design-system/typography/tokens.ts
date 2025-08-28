// Samurai Design System - Typography Tokens
export const typography = {
  // Font Combinations
  combinations: {
    // Small text combinations
    'caption-regular': {
      fontFamily: 'Rubik',
      fontWeight: '400', // normal
      fontSize: '0.6875rem', // 11px
      lineHeight: '1.25',
    },
    'caption-medium': {
      fontFamily: 'Rubik',
      fontWeight: '500', // medium
      fontSize: '0.6875rem', // 11px
      lineHeight: '1.25',
    },
    
    // 12px combinations
    'text-xs-regular': {
      fontFamily: 'Rubik',
      fontWeight: '400', // normal
      fontSize: '0.75rem', // 12px
      lineHeight: '1.25',
    },
    'text-xs-medium': {
      fontFamily: 'Rubik',
      fontWeight: '500', // medium
      fontSize: '0.75rem', // 12px
      lineHeight: '1.25',
    },
    
    // 14px combinations
    'text-sm-regular': {
      fontFamily: 'Rubik',
      fontWeight: '400', // normal
      fontSize: '0.875rem', // 14px
      lineHeight: '1.25',
      letterSpacing: '0.01em',
    },
    'text-sm-medium': {
      fontFamily: 'Rubik',
      fontWeight: '500', // medium
      fontSize: '0.875rem', // 14px
      lineHeight: '1.25',
      letterSpacing: '0.01em',
    },
    'text-sm-semibold': {
      fontFamily: 'Rubik',
      fontWeight: '600', // semibold
      fontSize: '0.875rem', // 14px
      lineHeight: '1.5',
      letterSpacing: '0.14px',
    },
    
    // 16px combinations
    'text-base-regular': {
      fontFamily: 'Rubik',
      fontWeight: '400', // normal
      fontSize: '1rem', // 16px
      lineHeight: '1.25',
    },
    'text-base-medium': {
      fontFamily: 'Rubik',
      fontWeight: '500', // medium
      fontSize: '1rem', // 16px
      lineHeight: '1.25',
    },
    
    // Heading combinations
    'heading-small': {
      fontFamily: 'Rubik',
      fontWeight: '600', // semibold
      fontSize: '1.125rem', // 18px
      lineHeight: '1.25',
    },
    'heading-medium': {
      fontFamily: 'Rubik',
      fontWeight: '600', // semibold
      fontSize: '1.5rem', // 24px
      lineHeight: '1.25',
    },
    'heading-large': {
      fontFamily: 'Rubik',
      fontWeight: '700', // bold
      fontSize: '2.25rem', // 36px
      lineHeight: '1.25',
    },
  },
  
  // Individual tokens (for custom combinations)
  fontFamily: {
    sans: ['Rubik', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'monospace'],
  },
  
  fontSize: {
    '2xs': '0.6875rem', // 11px
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
  },
  
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
  
  lineHeight: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.75',
  },
} as const;

export type TypographyToken = typeof typography;
