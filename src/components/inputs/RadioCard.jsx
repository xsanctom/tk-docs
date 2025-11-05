import React from 'react';
import './RadioCard.css';

/**
 * RadioCard Component
 * 
 * A card-style radio button option. Displays as a clickable card with label and optional description.
 * Must be used within a RadioCardGroup for proper functionality.
 * 
 * @param {Object} props
 * @param {string} props.value - Value of this radio card option
 * @param {boolean} props.checked - Whether this radio card is checked
 * @param {Function} props.onChange - Change handler function: (value: string, event: Event) => void
 * @param {boolean} props.disabled - Whether the radio card is disabled
 * @param {string} props.label - Label text to display (required)
 * @param {string} props.description - Optional description text below label
 * @param {React.ReactNode} props.children - Custom content (alternative to label/description)
 * @param {string} props.name - Name attribute for form submission (should match RadioCardGroup name)
 * @param {string} props.id - Unique ID for the radio input (auto-generated if not provided)
 * @param {string} props.className - Additional CSS classes
 * @param {string} props['aria-label'] - Accessible label (optional if label provided)
 * @param {Object} props...rest - Other HTML input attributes
 */
const RadioCard = ({
  value,
  checked = false,
  onChange,
  disabled = false,
  label,
  description,
  children,
  name,
  id,
  className = '',
  'aria-label': ariaLabel,
  ...rest
}) => {
  // Generate unique ID if not provided
  const radioId = id || `radio-card-${Math.random().toString(36).substr(2, 9)}`;
  
  // Handle change event
  const handleChange = (event) => {
    if (disabled) return;
    
    if (onChange) {
      onChange(value, event);
    }
  };
  
  // Build classes
  const classes = [
    'radio-card',
    checked && 'active',
    disabled && 'disabled',
    className
  ].filter(Boolean).join(' ');
  
  return (
    <label 
      className={classes} 
      htmlFor={radioId}
    >
      <input
        type="radio"
        id={radioId}
        className="radio-card-input"
        name={name}
        value={value}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        aria-label={ariaLabel || label || 'Radio card option'}
        {...rest}
      />
      <div className="radio-card-content">
        {children ? (
          children
        ) : (
          <>
            {label && (
              <span className="radio-card-label">
                {label}
              </span>
            )}
            {description && (
              <span className="radio-card-description">
                {description}
              </span>
            )}
          </>
        )}
      </div>
    </label>
  );
};

export default RadioCard;

