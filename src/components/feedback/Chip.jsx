import React from 'react';
import './Chip.css';

/**
 * Chip Component
 * 
 * A chip component similar to buttons but simpler, with selected state styling like ButtonGroup.
 * Used for filters, tags, and toggleable selections.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to display in the chip
 * @param {string} props.variant - Variant: 'default' | 'primary'. Default: 'default'
 * @param {string} props.size - Size variant: 'lg' (48px) | 'md' (40px) | 'sm' (36px). Default: 'md'
 * @param {boolean} props.selected - Whether the chip is selected (purple styling)
 * @param {boolean} props.disabled - Whether the chip is disabled
 * @param {React.ReactNode} props.iconLeft - Icon to display on the left
 * @param {React.ReactNode} props.iconRight - Icon to display on the right
 * @param {Function} props.onClick - Click handler
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props...rest - Other HTML button attributes
 */
const Chip = ({
  children,
  variant = 'default',
  size = 'md',
  selected = false,
  disabled = false,
  iconLeft,
  iconRight,
  onClick,
  className = '',
  ...rest
}) => {
  const classes = [
    'chip',
    `variant-${variant}`,
    `size-${size}`,
    selected && 'selected',
    disabled && 'disabled',
    className
  ].filter(Boolean).join(' ');

  const handleClick = (e) => {
    if (!disabled && onClick) {
      onClick(e);
    }
  };

  return (
    <button
      type="button"
      className={classes}
      onClick={handleClick}
      disabled={disabled}
      aria-pressed={selected}
      {...rest}
    >
      {iconLeft && (
        <span className="chip-icon-left" aria-hidden="true">
          {iconLeft}
        </span>
      )}
      {children && (
        <span>{children}</span>
      )}
      {iconRight && (
        <span className="chip-icon-right" aria-hidden="true">
          {iconRight}
        </span>
      )}
    </button>
  );
};

export default Chip;
