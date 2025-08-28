import React from 'react';
import { Check } from 'react-feather';
import { checkboxTokens, iconTokens } from './tokens';

export type CheckboxSize = 'sm' | 'md' | 'lg';

export interface CheckboxProps {
  size?: CheckboxSize;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  size = 'md',
  checked = false,
  disabled = false,
  onChange,
  className = '',
}) => {
  const tokens = checkboxTokens.sizes[size];
  const iconSize = iconTokens.sizes[size];
  
  const handleClick = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  const getCheckboxStyles = () => {
    const baseStyles = {
      width: tokens.width,
      height: tokens.height,
      borderRadius: tokens.borderRadius,
      border: '2px solid',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.2s ease-in-out',
    };

    if (disabled) {
      return {
        ...baseStyles,
        borderColor: checkboxTokens.colors.disabled.border,
        backgroundColor: checkboxTokens.colors.disabled.background,
      };
    }

    if (checked) {
      return {
        ...baseStyles,
        borderColor: checkboxTokens.colors.checked.border,
        backgroundColor: checkboxTokens.colors.checked.background,
      };
    }

    return {
      ...baseStyles,
      borderColor: checkboxTokens.colors.unchecked.border,
      backgroundColor: checkboxTokens.colors.unchecked.background,
    };
  };

  return (
    <div
      style={getCheckboxStyles()}
      onClick={handleClick}
      className={className}
      role="checkbox"
      aria-checked={checked}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
    >
      {checked && (
        <Check 
          size={parseInt(iconSize)} 
          color={iconTokens.colors.checked}
        />
      )}
    </div>
  );
};
