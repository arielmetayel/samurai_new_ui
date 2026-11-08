import React from 'react';
import { Icon } from 'react-feather';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonShape = 'create' | 'action';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  icon?: Icon;
  iconPosition?: 'left' | 'right';
  iconSize?: number;
  /** create = pill 48px; action = square 40×12. Defaults: primary sm/danger → action, other primary → create. */
  shape?: ButtonShape;
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
  shape,
  className = '',
  ...props
}) => {
  const resolvedShape: ButtonShape | undefined =
    shape ??
    (variant === 'danger'
      ? 'action'
      : variant === 'primary' && size === 'sm'
        ? 'action'
        : variant === 'primary'
          ? 'create'
          : undefined);

  const classNames = [
    styles.btn,
    styles[variant],
    variant === 'danger' ? styles.danger : '',
    styles[size],
    resolvedShape === 'action' && variant === 'primary' ? styles.shapeAction : '',
    resolvedShape === 'create' && variant === 'primary' && size === 'sm' ? styles.shapeCreate : '',
    className,
  ]
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
      data-variant={variant}
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
