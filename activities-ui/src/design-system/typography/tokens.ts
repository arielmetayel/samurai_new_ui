// Samurai Design System - Typography Tokens
// Scale matches globals.css: 9 (avatar) / 12 / 14 / 16 / 18 / 22 / 24.

export const typeScale = {
  avatar: '9px',
  caption: '12px',
  sm: '14px',
  md: '16px',
  lg: '18px',
  xl: '22px',
  '2xl': '24px',
} as const;

export const typography = {
  combinations: {
    'caption-regular': {
      fontFamily: 'var(--font-ui)',
      fontWeight: '400',
      fontSize: '0.75rem', // 12px
      lineHeight: '1.25',
    },
    'caption-medium': {
      fontFamily: 'var(--font-ui)',
      fontWeight: '500',
      fontSize: '0.75rem', // 12px
      lineHeight: '1.25',
    },

    'text-xs-regular': {
      fontFamily: 'var(--font-ui)',
      fontWeight: '400',
      fontSize: '0.75rem', // 12px
      lineHeight: '1.25',
    },
    'text-xs-medium': {
      fontFamily: 'var(--font-ui)',
      fontWeight: '500',
      fontSize: '0.75rem', // 12px
      lineHeight: '1.25',
    },

    'text-sm-regular': {
      fontFamily: 'var(--font-ui)',
      fontWeight: '400',
      fontSize: '0.875rem', // 14px
      lineHeight: '1.25',
      letterSpacing: '0.01em',
    },
    'text-sm-medium': {
      fontFamily: 'var(--font-ui)',
      fontWeight: '500',
      fontSize: '0.875rem', // 14px
      lineHeight: '1.25',
      letterSpacing: '0.01em',
    },
    'text-sm-semibold': {
      fontFamily: 'var(--font-ui)',
      fontWeight: '600',
      fontSize: '0.875rem', // 14px
      lineHeight: '1.5',
      letterSpacing: '0.14px',
    },

    'text-base-regular': {
      fontFamily: 'var(--font-ui)',
      fontWeight: '400',
      fontSize: '1rem', // 16px
      lineHeight: '1.25',
    },
    'text-base-medium': {
      fontFamily: 'var(--font-ui)',
      fontWeight: '500',
      fontSize: '1rem', // 16px
      lineHeight: '1.25',
    },
    'text-base-list': {
      fontFamily: 'var(--font-ui)',
      fontWeight: '400',
      fontSize: '1rem', // 16px
      lineHeight: '1.4',
      color: 'var(--color-text-secondary)',
    },

    'heading-small': {
      fontFamily: 'var(--font-ui)',
      fontWeight: '600',
      fontSize: '1.125rem', // 18px
      lineHeight: '1.25',
    },
    'heading-medium': {
      fontFamily: 'var(--font-ui)',
      fontWeight: '600',
      fontSize: '1.5rem', // 24px
      lineHeight: '1.25',
    },
    'header-m02': {
      fontFamily: 'var(--font-ui)',
      fontWeight: '500',
      fontSize: '1.375rem', // 22px
      lineHeight: '1.25',
      color: 'var(--color-text-secondary)',
    },
    'heading-large': {
      fontFamily: 'var(--font-ui)',
      fontWeight: '700',
      fontSize: '2.25rem', // 36px — unused leftover, no CSS var yet
      lineHeight: '1.25',
    },
  },

  fontFamily: {
    sans: 'var(--font-ui)',
  },

  fontSize: {
    avatar: '0.5625rem', // 9px
    caption: '0.75rem',  // 12px
    xs: '0.75rem',       // 12px
    sm: '0.875rem',      // 14px
    base: '1rem',        // 16px
    lg: '1.125rem',      // 18px
    xl: '1.375rem',      // 22px — matches --font-size-xl
    '2xl': '1.5rem',     // 24px
  },

  fontWeight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  lineHeight: {
    tight: '1.25',
    normal: '1.5',
  },
} as const;

export type TypographyToken = typeof typography;
