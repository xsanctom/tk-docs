import React from 'react';
import './ButtonGroup.css';

/**
 * ButtonGroup Component
 * 
 * A group of buttons that work together, typically for selecting a single option.
 * Used for segmented controls, view toggles, etc.
 * 
 * @param {Object} props
 * @param {Array} props.options - Array of option objects: { value, label, icon?, disabled? }
 * @param {string|number} props.value - Currently selected value
 * @param {Function} props.onChange - Callback when selection changes: (value) => void
 * @param {string} props.variant - Group variant: 'segmented' (hug content) | 'full-width' (stretch to fill)
 * @param {string} props.size - Button size: 'mini' | 'sm' | 'md' | 'lg'
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props...rest - Other HTML div attributes
 */
const ButtonGroup = ({
  options = [],
  value,
  onChange,
  variant = 'segmented',
  size = 'md',
  className = '',
  ...rest
}) => {
  const classes = [
    'button-group',
    variant && variant,
    size && `size-${size}`,
    className
  ].filter(Boolean).join(' ');

  const handleClick = (optionValue) => {
    if (onChange && optionValue !== value) {
      onChange(optionValue);
    }
  };

  return (
    <div className={classes} role="group" {...rest}>
      {options.map((option) => {
        const isActive = option.value === value;
        const buttonClasses = [
          'button-group-button',
          isActive && 'active',
          option.disabled && 'disabled'
        ].filter(Boolean).join(' ');

        return (
          <button
            key={option.value}
            type="button"
            className={buttonClasses}
            onClick={() => !option.disabled && handleClick(option.value)}
            disabled={option.disabled}
            aria-pressed={isActive}
            title={option.label}
          >
            {option.icon && (
              <span className="button-group-button-icon" aria-hidden="true">
                {option.icon}
              </span>
            )}
            {option.label && (
              <span className="button-group-button-text">
                {option.label}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default ButtonGroup;

