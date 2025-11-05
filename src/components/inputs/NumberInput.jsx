import React, { useId, useRef, useEffect, useState } from 'react';
import './NumberInput.css';

/**
 * NumberInput Component
 * 
 * A number input component with size variants, min/max/step support, and optional prefix/suffix.
 * Extends TextInput functionality with number-specific features.
 * 
 * @param {Object} props
 * @param {number} props.value - Input value (controlled mode)
 * @param {number} props.defaultValue - Default input value (uncontrolled mode)
 * @param {Function} props.onChange - Change handler: (value: number | null, event: Event) => void
 * @param {Function} props.onFocus - Focus handler
 * @param {Function} props.onBlur - Blur handler
 * @param {boolean} props.disabled - Whether the input is disabled
 * @param {boolean} props.readOnly - Whether the input is read-only
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.size - Size variant: 'mini' (32px), 'sm' (36px), 'md' (40px), 'lg' (48px). Default: 'md'
 * @param {string|React.ReactNode} props.prefix - Prefix text or component to display before input
 * @param {string|React.ReactNode} props.suffix - Suffix text or component to display after input
 * @param {React.ReactNode} props.iconLeft - Icon to display on the left
 * @param {React.ReactNode} props.iconRight - Icon to display on the right
 * @param {number} props.min - Minimum value allowed
 * @param {number} props.max - Maximum value allowed
 * @param {number} props.step - Step increment/decrement value. Default: 1
 * @param {number} props.decimalPlaces - Number of decimal places (0-20). Affects step if not explicitly set.
 * @param {boolean} props.allowNegative - Whether negative numbers are allowed. Default: true
 * @param {boolean} props.formatOnBlur - Format number on blur (e.g., add thousand separators). Default: false
 * @param {string} props.name - Name attribute for form submission
 * @param {string} props.id - Unique ID for the input (auto-generated if not provided)
 * @param {string} props.className - Additional CSS classes
 * @param {string} props['aria-label'] - Accessible label (required if no visible label)
 * @param {Object} props...rest - Other HTML input attributes
 */
const NumberInput = ({
  value,
  defaultValue,
  onChange,
  onFocus,
  onBlur,
  disabled = false,
  readOnly = false,
  placeholder,
  size = 'md',
  prefix,
  suffix,
  iconLeft,
  iconRight,
  min,
  max,
  step,
  decimalPlaces,
  allowNegative = true,
  formatOnBlur = false,
  name,
  id,
  className = '',
  'aria-label': ariaLabel,
  ...rest
}) => {
  // Generate unique ID if not provided
  const uniqueId = useId();
  const inputId = id || `number-input-${uniqueId}`;
  
  // Refs for measuring badge widths
  const prefixRef = useRef(null);
  const suffixRef = useRef(null);
  const wrapperRef = useRef(null);
  
  // State for dynamic padding
  const [prefixPadding, setPrefixPadding] = useState(null);
  const [suffixPadding, setSuffixPadding] = useState(null);
  
  // State for display value (formatted)
  const [displayValue, setDisplayValue] = useState('');
  
  // Calculate step from decimalPlaces if step not provided
  const calculatedStep = step !== undefined ? step : (decimalPlaces !== undefined ? Math.pow(10, -decimalPlaces) : 1);
  
  // Measure badge width and calculate padding
  useEffect(() => {
    const updatePadding = () => {
      if (prefixRef.current && wrapperRef.current) {
        const badgeWidth = prefixRef.current.offsetWidth;
        if (badgeWidth > 0) {
          // 12px badge position + badge width + 8px gap
          setPrefixPadding(12 + badgeWidth + 8);
        }
      }
      
      if (suffixRef.current && wrapperRef.current) {
        const badgeWidth = suffixRef.current.offsetWidth;
        if (badgeWidth > 0) {
          // 12px badge position + badge width + 8px gap
          setSuffixPadding(12 + badgeWidth + 8);
        }
      }
    };
    
    // Update padding on mount and when content changes
    updatePadding();
    
    // Use ResizeObserver to watch for badge size changes
    const resizeObserver = new ResizeObserver(updatePadding);
    
    if (prefixRef.current) {
      resizeObserver.observe(prefixRef.current);
    }
    if (suffixRef.current) {
      resizeObserver.observe(suffixRef.current);
    }
    
    return () => {
      resizeObserver.disconnect();
    };
  }, [prefix, suffix]);
  
  // Format number with thousand separators
  const formatNumber = (num) => {
    if (num === null || num === undefined || num === '') return '';
    
    const numStr = num.toString();
    
    // If formatOnBlur is false, return as-is
    if (!formatOnBlur) return numStr;
    
    // Handle decimal numbers
    const parts = numStr.split('.');
    const integerPart = parts[0];
    const decimalPart = parts[1];
    
    // Add thousand separators to integer part
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    
    return decimalPart !== undefined ? `${formattedInteger}.${decimalPart}` : formattedInteger;
  };
  
  // Parse formatted number back to number
  const parseNumber = (str) => {
    if (!str || str.trim() === '') return null;
    
    // Remove thousand separators
    const cleaned = str.replace(/,/g, '');
    
    // Parse to number
    const parsed = parseFloat(cleaned);
    
    if (isNaN(parsed)) return null;
    
    return parsed;
  };
  
  // Handle change event
  const handleChange = (event) => {
    if (disabled || readOnly) return;
    
    const inputValue = event.target.value;
    
    // Allow empty input (for clearing)
    if (inputValue === '') {
      if (onChange) {
        onChange(null, event);
      }
      if (formatOnBlur) {
        setDisplayValue('');
      }
      return;
    }
    
    // Parse the input value
    let numValue = parseNumber(inputValue);
    
    // Validate negative numbers
    if (!allowNegative && numValue !== null && numValue < 0) {
      return; // Don't update if negative not allowed
    }
    
    // Validate min/max
    if (numValue !== null) {
      if (min !== undefined && numValue < min) {
        numValue = min;
      }
      if (max !== undefined && numValue > max) {
        numValue = max;
      }
    }
    
    // Apply decimal places formatting
    if (numValue !== null && decimalPlaces !== undefined) {
      numValue = parseFloat(numValue.toFixed(decimalPlaces));
    }
    
    if (onChange) {
      onChange(numValue, event);
    }
    
    // Update display value
    if (formatOnBlur) {
      setDisplayValue(inputValue); // Store raw input while typing
    }
  };
  
  // Handle blur event
  const handleBlur = (event) => {
    if (formatOnBlur && value !== undefined) {
      // Format the value on blur
      const formatted = formatNumber(value);
      setDisplayValue(formatted);
    }
    
    if (onBlur) {
      onBlur(event);
    }
  };
  
  // Handle focus event
  const handleFocus = (event) => {
    if (formatOnBlur && displayValue) {
      // Show raw value when focused
      setDisplayValue(value !== null && value !== undefined ? value.toString() : '');
    }
    
    if (onFocus) {
      onFocus(event);
    }
  };
  
  // Sync display value with controlled value
  useEffect(() => {
    if (value !== undefined) {
      if (formatOnBlur) {
        // When not focused, show formatted value
        const formatted = formatNumber(value);
        setDisplayValue(formatted);
      } else {
        setDisplayValue(value !== null ? value.toString() : '');
      }
    }
  }, [value, formatOnBlur]);
  
  // Build classes
  const wrapperClasses = [
    'number-input-wrapper',
    prefix && 'number-input-with-prefix',
    suffix && 'number-input-with-suffix',
    iconLeft && 'number-input-with-icon-left',
    iconRight && 'number-input-with-icon-right'
  ].filter(Boolean).join(' ');
  
  const inputClasses = [
    'number-input',
    `size-${size}`,
    className
  ].filter(Boolean).join(' ');
  
  // Determine if controlled or uncontrolled
  const isControlled = value !== undefined;
  const inputValue = isControlled 
    ? (formatOnBlur ? displayValue : (value !== null ? value.toString() : ''))
    : undefined;
  
  // Build inline style for dynamic padding
  const iconPadding = 40; // Standard icon padding from CSS
  const inputStyle = {
    ...(prefixPadding !== null && { 
      paddingLeft: `${Math.max(prefixPadding, iconLeft ? iconPadding : prefixPadding)}px` 
    }),
    ...(suffixPadding !== null && { 
      paddingRight: `${Math.max(suffixPadding, iconRight ? iconPadding : suffixPadding)}px` 
    }),
    // If only icon (no badge), use icon padding
    ...(!prefix && iconLeft && { paddingLeft: `${iconPadding}px` }),
    ...(!suffix && iconRight && { paddingRight: `${iconPadding}px` }),
  };
  
  const inputElement = (
    <input
      type="number"
      id={inputId}
      className={inputClasses}
      name={name}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readOnly}
      min={min}
      max={max}
      step={calculatedStep}
      value={inputValue}
      defaultValue={defaultValue}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      style={inputStyle}
      aria-label={ariaLabel}
      {...rest}
    />
  );
  
  // If no affixes or icons, return simple input
  if (!prefix && !suffix && !iconLeft && !iconRight) {
    return inputElement;
  }
  
  // Otherwise, wrap in container
  return (
    <div className={wrapperClasses} ref={wrapperRef}>
      {prefix && (
        <span className="number-input-prefix" ref={prefixRef}>
          {prefix}
        </span>
      )}
      {iconLeft && (
        <span className="number-input-icon-left">
          {iconLeft}
        </span>
      )}
      {inputElement}
      {iconRight && (
        <span className="number-input-icon-right">
          {iconRight}
        </span>
      )}
      {suffix && (
        <span className="number-input-suffix" ref={suffixRef}>
          {suffix}
        </span>
      )}
    </div>
  );
};

export default NumberInput;

