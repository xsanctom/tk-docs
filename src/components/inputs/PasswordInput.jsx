import React, { useId, useState } from 'react';
import './PasswordInput.css';
import { EyeIcon, EyeOffIcon } from '../../utils/icons.jsx';

/**
 * PasswordInput Component
 * 
 * A password input component that wraps TextInput with password-specific functionality,
 * including a show/hide toggle button with eye icon.
 * 
 * @param {Object} props
 * @param {string} props.value - Input value (controlled mode)
 * @param {string} props.defaultValue - Default input value (uncontrolled mode)
 * @param {Function} props.onChange - Change handler: (value: string, event: Event) => void
 * @param {Function} props.onFocus - Focus handler
 * @param {Function} props.onBlur - Blur handler
 * @param {boolean} props.disabled - Whether the input is disabled
 * @param {boolean} props.readOnly - Whether the input is read-only
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.size - Size variant: 'mini' (32px), 'sm' (36px), 'md' (40px), 'lg' (48px). Default: 'md'
 * @param {boolean} props.showPasswordToggle - Whether to show the show/hide password toggle button. Default: true
 * @param {boolean} props.defaultShowPassword - Initial visibility state for uncontrolled mode. Default: false
 * @param {string} props.name - Name attribute for form submission
 * @param {string} props.id - Unique ID for the input (auto-generated if not provided)
 * @param {string} props.className - Additional CSS classes
 * @param {string} props['aria-label'] - Accessible label (required if no visible label)
 * @param {Object} props...rest - Other HTML input attributes
 */
const PasswordInput = ({
  value,
  defaultValue,
  onChange,
  onFocus,
  onBlur,
  disabled = false,
  readOnly = false,
  placeholder,
  size = 'md',
  showPasswordToggle = true,
  defaultShowPassword = false,
  name,
  id,
  className = '',
  'aria-label': ariaLabel,
  ...rest
}) => {
  // Generate unique ID if not provided
  const uniqueId = useId();
  const inputId = id || `password-input-${uniqueId}`;
  
  // State for password visibility
  const [showPassword, setShowPassword] = useState(defaultShowPassword);
  
  // Handle change event
  const handleChange = (event) => {
    if (disabled || readOnly) return;
    
    if (onChange) {
      onChange(event.target.value, event);
    }
  };
  
  // Handle toggle visibility
  const handleToggleVisibility = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!disabled && !readOnly) {
      setShowPassword(prev => !prev);
    }
  };
  
  // Build classes
  const inputClasses = [
    'password-input',
    `size-${size}`,
    className
  ].filter(Boolean).join(' ');
  
  // Determine if controlled or uncontrolled
  const isControlled = value !== undefined;
  const inputProps = isControlled
    ? { value }
    : { defaultValue };
  
  // Determine input type based on visibility
  const inputType = showPassword ? 'text' : 'password';
  
  // Determine placeholder
  const finalPlaceholder = placeholder !== undefined ? placeholder : 'Enter password...';
  
  // Determine if toggle should be shown
  const showToggle = showPasswordToggle && !disabled;
  
  return (
    <div className="password-input-wrapper">
      <div className={`password-input-container ${showToggle ? 'has-toggle' : ''}`}>
        <input
          type={inputType}
          id={inputId}
          className={inputClasses}
          name={name}
          placeholder={finalPlaceholder}
          disabled={disabled}
          readOnly={readOnly}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          aria-label={ariaLabel}
          {...inputProps}
          {...rest}
        />
        {showToggle && (
          <button
            type="button"
            className="password-input-toggle"
            onClick={handleToggleVisibility}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            tabIndex={0}
          >
            {showPassword ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default PasswordInput;

