import React from 'react';
import './Radio.css';

/**
 * Radio Component
 * 
 * A single radio button option. Must be used within a RadioGroup for proper functionality.
 * 
 * @param {Object} props
 * @param {string} props.value - Value of this radio option
 * @param {boolean} props.checked - Whether this radio is checked
 * @param {Function} props.onChange - Change handler function: (value: string, event: Event) => void
 * @param {boolean} props.disabled - Whether the radio is disabled
 * @param {string} props.label - Label text to display next to radio
 * @param {React.ReactNode} props.children - Alternative to label prop - can be used for custom label content
 * @param {string} props.name - Name attribute for form submission (should match RadioGroup name)
 * @param {string} props.id - Unique ID for the radio input (auto-generated if not provided)
 * @param {string} props.className - Additional CSS classes
 * @param {string} props['aria-label'] - Accessible label (required if no visible label)
 * @param {Object} props...rest - Other HTML input attributes
 */
const Radio = ({
  value,
  checked = false,
  onChange,
  disabled = false,
  label,
  children,
  name,
  id,
  className = '',
  'aria-label': ariaLabel,
  ...rest
}) => {
  // Generate unique ID if not provided
  const radioId = id || `radio-${Math.random().toString(36).substr(2, 9)}`;
  
  // Handle change event
  const handleChange = (event) => {
    if (disabled) return;
    
    if (onChange) {
      onChange(value, event);
    }
  };
  
  // Build classes
  const classes = [
    'radio',
    disabled && 'disabled',
    className
  ].filter(Boolean).join(' ');
  
  // Label content: children take precedence over label prop
  const labelContent = children || label;
  
  return (
    <label className={classes} htmlFor={radioId}>
      <input
        type="radio"
        id={radioId}
        className="radio-input"
        name={name}
        value={value}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        aria-label={ariaLabel || (!labelContent ? 'Radio option' : undefined)}
        {...rest}
      />
      {labelContent && (
        <span className="radio-label">
          {labelContent}
        </span>
      )}
    </label>
  );
};

export default Radio;

