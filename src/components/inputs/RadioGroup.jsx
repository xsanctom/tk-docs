import React from 'react';
import Radio from './Radio.jsx';
import './Radio.css';

/**
 * RadioGroup Component
 * 
 * A container for radio button options. Manages the selection state and ensures only one option can be selected.
 * 
 * @param {Object} props
 * @param {string} props.value - Currently selected value
 * @param {Function} props.onChange - Change handler: (value: string, event: Event) => void
 * @param {Array} props.options - Array of option objects: { value: string, label: string, disabled?: boolean }
 * @param {string} props.name - Name attribute for form submission (auto-generated if not provided)
 * @param {string} props.orientation - Layout orientation: 'vertical' | 'horizontal' (default: 'vertical')
 * @param {boolean} props.disabled - Whether all radios in the group are disabled
 * @param {string} props.className - Additional CSS classes
 * @param {React.ReactNode} props.children - Custom Radio components (alternative to options prop)
 * @param {string} props['aria-label'] - Accessible label for the group
 * @param {Object} props...rest - Other HTML attributes
 */
const RadioGroup = ({
  value,
  onChange,
  options = [],
  name,
  orientation = 'vertical',
  disabled = false,
  className = '',
  children,
  'aria-label': ariaLabel,
  ...rest
}) => {
  // Generate unique name if not provided
  const groupName = name || `radio-group-${Math.random().toString(36).substr(2, 9)}`;
  
  // Handle change from child Radio
  const handleRadioChange = (optionValue, event) => {
    if (onChange) {
      onChange(optionValue, event);
    }
  };
  
  // Build classes
  const classes = [
    'radio-group',
    orientation === 'horizontal' && 'horizontal',
    className
  ].filter(Boolean).join(' ');
  
  return (
    <div 
      className={classes}
      role="radiogroup"
      aria-label={ariaLabel}
      {...rest}
    >
      {children ? (
        // Use custom children Radio components
        React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === Radio) {
            return React.cloneElement(child, {
              name: groupName,
              checked: child.props.value === value,
              onChange: handleRadioChange,
              disabled: disabled || child.props.disabled,
            });
          }
          return child;
        })
      ) : (
        // Use options prop
        options.map((option) => (
          <Radio
            key={option.value}
            value={option.value}
            label={option.label}
            name={groupName}
            checked={value === option.value}
            onChange={handleRadioChange}
            disabled={disabled || option.disabled}
            aria-label={option['aria-label']}
          />
        ))
      )}
    </div>
  );
};

export default RadioGroup;

