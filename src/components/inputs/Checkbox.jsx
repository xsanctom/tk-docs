import React from 'react';
import './Checkbox.css';

/**
 * Checkbox Component
 * 
 * A reusable checkbox component with label support, proper accessibility, and state management.
 * 
 * @param {Object} props
 * @param {boolean} props.checked - Whether the checkbox is checked (controlled mode)
 * @param {boolean} props.defaultChecked - Whether the checkbox is checked by default (uncontrolled mode)
 * @param {Function} props.onChange - Change handler function: (checked: boolean, event: Event) => void
 * @param {boolean} props.disabled - Whether the checkbox is disabled
 * @param {string} props.label - Label text to display next to checkbox
 * @param {React.ReactNode} props.children - Alternative to label prop - can be used for custom label content
 * @param {string} props.id - Unique ID for the checkbox input (auto-generated if not provided)
 * @param {string} props.name - Name attribute for form submission
 * @param {string} props.value - Value attribute for form submission
 * @param {string} props.className - Additional CSS classes
 * @param {string} props['aria-label'] - Accessible label (required if no visible label)
 * @param {Object} props...rest - Other HTML input attributes
 */
const Checkbox = ({
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  label,
  children,
  id,
  name,
  value,
  className = '',
  'aria-label': ariaLabel,
  ...rest
}) => {
  // Generate unique ID if not provided
  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
  
  // Determine if controlled or uncontrolled
  const isControlled = checked !== undefined;
  
  // Handle change event
  const handleChange = (event) => {
    if (disabled) return;
    
    const newChecked = event.target.checked;
    
    if (onChange) {
      onChange(newChecked, event);
    }
  };
  
  // Build classes
  const classes = [
    'checkbox',
    disabled && 'disabled',
    className
  ].filter(Boolean).join(' ');
  
  // Label content: children take precedence over label prop
  const labelContent = children || label;
  
  return (
    <label className={classes} htmlFor={checkboxId}>
      <input
        type="checkbox"
        id={checkboxId}
        className="checkbox-input"
        name={name}
        value={value}
        checked={isControlled ? checked : undefined}
        defaultChecked={!isControlled ? defaultChecked : undefined}
        onChange={handleChange}
        disabled={disabled}
        aria-label={ariaLabel || (!labelContent ? 'Checkbox' : undefined)}
        {...rest}
      />
      {labelContent && (
        <span className="checkbox-label">
          {labelContent}
        </span>
      )}
    </label>
  );
};

export default Checkbox;

