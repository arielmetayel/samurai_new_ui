import React from 'react';
import { colors } from '@/design-system/colors/tokens';

// Button variants
export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

// Button props interface
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

// Button component
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  className = '',
  ...props
}) => {
  // Base button styles
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    border: 'none',
    borderRadius: '8px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease-in-out',
    fontFamily: 'Rubik',
    fontWeight: '500',
    textDecoration: 'none',
    outline: 'none',
    ...(disabled && {
      opacity: 0.5,
      cursor: 'not-allowed',
    }),
  };

  // Variant-specific styles
  const variantStyles = {
    primary: {
      backgroundColor: colors.primary[500],
      color: 'white',
      '&:hover': !disabled && {
        backgroundColor: colors.primary[600],
        transform: 'translateY(-1px)',
        boxShadow: '0 4px 12px rgba(0, 130, 200, 0.3)',
      },
      '&:active': !disabled && {
        backgroundColor: colors.primary[700],
        transform: 'translateY(0)',
      },
    },
    secondary: {
      backgroundColor: 'transparent',
      color: colors.primary[500],
      border: `2px solid ${colors.primary[500]}`,
      '&:hover': !disabled && {
        backgroundColor: colors.primary[50],
        borderColor: colors.primary[600],
      },
      '&:active': !disabled && {
        backgroundColor: colors.primary[100],
      },
    },
    tertiary: {
      backgroundColor: colors.neutral[100],
      color: colors.neutral[400],
      '&:hover': !disabled && {
        backgroundColor: colors.neutral[200],
        color: colors.neutral[400],
      },
      '&:active': !disabled && {
        backgroundColor: colors.neutral[300],
      },
    },
    ghost: {
      backgroundColor: 'transparent',
      color: colors.neutral[400],
      '&:hover': !disabled && {
        backgroundColor: colors.neutral[100],
        color: colors.neutral[400],
      },
      '&:active': !disabled && {
        backgroundColor: colors.neutral[200],
      },
    },
  };



  // Size-specific styles
  const sizeStyles = {
    sm: {
      padding: '8px 16px',
      fontSize: '0.875rem', // 14px
      lineHeight: '1.25',
      minHeight: '32px',
    },
    md: {
      padding: '12px 20px',
      fontSize: '1rem', // 16px
      lineHeight: '1.25',
      minHeight: '40px',
    },
    lg: {
      padding: '16px 24px',
      fontSize: '1.125rem', // 18px
      lineHeight: '1.25',
      minHeight: '48px',
    },
  };

  // Combine all styles
  const buttonStyles = {
    ...baseStyles,
    ...variantStyles[variant],
    ...sizeStyles[size],
  };

  // Render icon based on position
  const renderIcon = () => {
    if (!icon) return null;
    
    return (
      <span style={{ display: 'flex', alignItems: 'center' }}>
        {icon}
      </span>
    );
  };

  // Render loading spinner
  const renderLoading = () => {
    if (!loading) return null;
    
    return (
      <span style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{
          width: '16px',
          height: '16px',
          border: `2px solid transparent`,
          borderTop: `2px solid currentColor`,
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }} />
      </span>
    );
  };

  return (
    <>
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <button
        style={buttonStyles}
        disabled={disabled || loading}
        className={className}
        {...props}
      >
        {loading ? (
          <>
            {renderLoading()}
            {children}
          </>
        ) : (
          <>
            {iconPosition === 'left' && renderIcon()}
            {children}
            {iconPosition === 'right' && renderIcon()}
          </>
        )}
      </button>
    </>
  );
};
