import React from 'react';
import './Button.css';

/**
 * Button Component
 * 
 * A flexible button component with support for variants, sizes, icons, and proper text truncation.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Button text content
 * @param {string} props.variant - Button variant: 'primary' | 'secondary-brand' | 'secondary' | 'tertiary' | 'ghost' | 'bare' | 'bare-primary' | 'danger' | 'danger-secondary'
 * @param {string} props.size - Button size: 'mini' | 'sm' | 'md' | 'lg'
 * @param {boolean} props.disabled - Whether the button is disabled
 * @param {React.ReactNode} props.iconLeft - Icon to display on the left
 * @param {React.ReactNode} props.iconRight - Icon to display on the right
 * @param {Function} props.onClick - Click handler function
 * @param {string} props.type - Button type: 'button' | 'submit' | 'reset'
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props...rest - Other HTML button attributes
 */
const Button = ({
  children,
  variant = 'secondary',
  size = 'md',
  disabled = false,
  iconLeft,
  iconRight,
  onClick,
  type = 'button',
  className = '',
  ...rest
}) => {
  const classes = [
    'button',
    variant && variant,
    size && `size-${size}`,
    disabled && 'disabled',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {iconLeft && (
        <span className="button-icon-left" aria-hidden="true">
          {iconLeft}
        </span>
      )}
      {children && (
        <span className="button-text">
          {children}
        </span>
      )}
      {iconRight && (
        <span className="button-icon-right" aria-hidden="true">
          {iconRight}
        </span>
      )}
    </button>
  );
};

export default Button;

