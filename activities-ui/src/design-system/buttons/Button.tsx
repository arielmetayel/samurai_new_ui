import React from 'react';
import { Icon } from 'react-feather';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  icon?: Icon;
  iconPosition?: 'left' | 'right';
  iconSize?: number;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  disabled = false,
  loading = false,
  icon: IconComponent,
  iconPosition = 'left',
  iconSize,
  className = '',
  ...props
}) => {
  const classNames = [styles.btn, styles[variant], styles[size], className]
    .filter(Boolean)
    .join(' ');

  // Add iconOnly class if no children
  const finalClassNames = !children ? `${classNames} ${styles.iconOnly}` : classNames;

  const renderIcon = () => {
    if (!IconComponent) return null;
    
    // Use custom icon size if provided, otherwise calculate based on button size
    let finalIconSize = iconSize;
    if (!finalIconSize) {
      finalIconSize = 18; // default medium
      if (size === 'sm') finalIconSize = 16;
      else if (size === 'lg') finalIconSize = 20;
      
      // For icon-only buttons, make icon slightly larger
      if (!children) {
        finalIconSize += 2;
      }
    }
    
    return (
      <IconComponent className={styles.icon} size={finalIconSize} />
    );
  };

  const renderLoading = () => {
    if (!loading) return null;
    return (
      <span className={styles.icon}>
        <div className={styles.loadingSpinner} />
      </span>
    );
  };

  return (
    <button
      className={finalClassNames}
      disabled={disabled || loading}
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
  );
};
