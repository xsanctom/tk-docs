import React from 'react';
import RadioCard from './RadioCard.jsx';
import './RadioCard.css';

/**
 * RadioCardGroup Component
 * 
 * A container for radio card options. Manages selection state and ensures only one card can be selected.
 * Cards are displayed horizontally by default, with equal width distribution.
 * 
 * @param {Object} props
 * @param {string} props.value - Currently selected value
 * @param {Function} props.onChange - Change handler: (value: string, event: Event) => void
 * @param {Array} props.options - Array of option objects: { value: string, label: string, description?: string, disabled?: boolean }
 * @param {string} props.name - Name attribute for form submission (auto-generated if not provided)
 * @param {string} props.orientation - Layout orientation: 'vertical' | 'horizontal' (default: 'horizontal')
 * @param {boolean} props.disabled - Whether all cards in the group are disabled
 * @param {string} props.className - Additional CSS classes
 * @param {React.ReactNode} props.children - Custom RadioCard components (alternative to options prop)
 * @param {string} props['aria-label'] - Accessible label for the group
 * @param {Object} props...rest - Other HTML attributes
 */
const RadioCardGroup = ({
  value,
  onChange,
  options = [],
  name,
  orientation = 'horizontal',
  disabled = false,
  className = '',
  children,
  'aria-label': ariaLabel,
  ...rest
}) => {
  // Generate unique name if not provided
  const groupName = name || `radio-card-group-${Math.random().toString(36).substr(2, 9)}`;
  
  // Handle change from child RadioCard
  const handleCardChange = (cardValue, event) => {
    if (onChange) {
      onChange(cardValue, event);
    }
  };
  
  // Build classes
  const classes = [
    'radio-card-group',
    orientation === 'vertical' && 'vertical',
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
        // Use custom children RadioCard components
        React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === RadioCard) {
            return React.cloneElement(child, {
              name: groupName,
              checked: child.props.value === value,
              onChange: handleCardChange,
              disabled: disabled || child.props.disabled,
            });
          }
          return child;
        })
      ) : (
        // Use options prop
        options.map((option) => (
          <RadioCard
            key={option.value}
            value={option.value}
            label={option.label}
            description={option.description}
            name={groupName}
            checked={value === option.value}
            onChange={handleCardChange}
            disabled={disabled || option.disabled}
            aria-label={option['aria-label']}
          />
        ))
      )}
    </div>
  );
};

export default RadioCardGroup;

