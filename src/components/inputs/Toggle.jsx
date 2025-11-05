import React, { useId } from 'react';
import './Toggle.css';

/**
 * Toggle Component
 * 
 * A toggle switch component for boolean on/off states. Displays as a sliding switch with optional label and description.
 * 
 * @param {Object} props
 * @param {boolean} props.checked - Whether the toggle is checked (on)
 * @param {boolean} props.defaultChecked - Initial checked state (uncontrolled)
 * @param {Function} props.onChange - Change handler: (checked: boolean, event: Event) => void
 * @param {boolean} props.disabled - Whether the toggle is disabled
 * @param {string} props.size - Size variant: 'sm' (38x20), 'md' (50x26), 'lg' (68x38). Default: 'md'
 * @param {string} props.label - Optional label text to display next to toggle
 * @param {string} props.description - Optional description text below label
 * @param {React.ReactNode} props.children - Custom content (alternative to label/description)
 * @param {string} props.name - Name attribute for form submission
 * @param {string} props.id - Unique ID for the toggle input (auto-generated if not provided)
 * @param {string} props.className - Additional CSS classes
 * @param {string} props['aria-label'] - Accessible label (required if no visible label)
 * @param {Object} props...rest - Other HTML input attributes
 */
const Toggle = ({
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  size = 'md',
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
  const uniqueId = useId();
  const toggleId = id || `toggle-${uniqueId}`;
  
  // Handle change event
  const handleChange = (event) => {
    if (disabled) return;
    
    if (onChange) {
      onChange(event.target.checked, event);
    }
  };
  
  // Build classes
  const classes = [
    'toggle-wrapper',
    disabled && 'disabled',
    className
  ].filter(Boolean).join(' ');
  
  // Determine if controlled or uncontrolled
  const isControlled = checked !== undefined;
  const inputProps = isControlled
    ? { checked }
    : { defaultChecked };
  
  return (
    <label className={classes} htmlFor={toggleId}>
      <div className={`toggle-switch size-${size}`}>
        <input
          type="checkbox"
          id={toggleId}
          className="toggle-input"
          name={name}
          onChange={handleChange}
          disabled={disabled}
          aria-label={ariaLabel || (!label && !description ? 'Toggle switch' : undefined)}
          {...inputProps}
          {...rest}
        />
        <span className="toggle-slider"></span>
      </div>
      {(label || description || children) && (
        <div className="toggle-info">
          {children ? (
            children
          ) : (
            <>
              {label && (
                <span className="toggle-label">
                  {label}
                </span>
              )}
              {description && (
                <span className="toggle-description">
                  {description}
                </span>
              )}
            </>
          )}
        </div>
      )}
    </label>
  );
};

export default Toggle;

