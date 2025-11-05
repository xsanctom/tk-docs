import React from 'react';
import './IconButton.css';

/**
 * IconButton Component
 * 
 * A square button designed to display only an icon. Perfect for icon-only actions.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.icon - Icon element to display
 * @param {string} props.variant - Button variant: 'primary' | 'secondary-brand' | 'secondary' | 'tertiary' | 'ghost' | 'bare' | 'bare-primary' | 'danger' | 'danger-secondary'. Default: 'bare'
 * @param {string} props.size - Button size: 'mini' | 'sm' | 'md' | 'lg'
 * @param {boolean} props.disabled - Whether the button is disabled
 * @param {Function} props.onClick - Click handler function
 * @param {string} props.type - Button type: 'button' | 'submit' | 'reset'
 * @param {string} props.className - Additional CSS classes
 * @param {string} props['aria-label'] - Accessible label (required for icon-only buttons)
 * @param {Object} props...rest - Other HTML button attributes
 */
const IconButton = ({
  icon,
  variant = 'bare',
  size = 'md',
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  'aria-label': ariaLabel,
  ...rest
}) => {
  const classes = [
    'icon-button',
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
      aria-label={ariaLabel}
      {...rest}
    >
      <span className="icon-button-icon" aria-hidden="true">
        {icon}
      </span>
    </button>
  );
};

export default IconButton;

