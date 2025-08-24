// Samurai Design System - Color Tokens
export const colors = {
  // Primary Colors
  primary: {
    50: '#e6f4ff',
    100: '#b3e0ff', 
    200: '#80ccff',
    300: '#4db8ff',
    400: '#1aa4ff',
    500: '#0082C8', // Main primary color
    600: '#0066a3',
    700: '#004d7a',
    800: '#003352',
    900: '#001a29',
  },
  
  // Neutral Colors
  neutral: {
    50: '#F6F8FA',  // Lightest gray
    100: '#E3E8EE', // Light gray
    200: '#868FA0', // Medium gray
    300: '#464F60', // Dark gray
    400: '#2F3036', // Darkest gray
  },
  
  // Semantic Colors
  success: {
    500: '#10b981',
    600: '#059669',
  },
  warning: {
    500: '#f59e0b',
    600: '#d97706',
  },
  error: {
    500: '#ef4444',
    600: '#dc2626',
  },
} as const;

export type ColorToken = typeof colors;
