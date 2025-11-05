import React, { useId, useRef, useEffect, useState } from 'react';
import './TextInput.css';

/**
 * TextInput Component
 * 
 * A text input component with size variants, optional prefix/suffix, and icon support.
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
 * @param {string|React.ReactNode} props.prefix - Prefix text or component (e.g., Badge) to display before input
 * @param {string|React.ReactNode} props.suffix - Suffix text or component (e.g., Badge) to display after input
 * @param {React.ReactNode} props.iconLeft - Icon to display on the left
 * @param {React.ReactNode} props.iconRight - Icon to display on the right
 * @param {string} props.type - Input type: 'text', 'email', 'url', 'search', etc. Default: 'text'
 * @param {string} props.name - Name attribute for form submission
 * @param {string} props.id - Unique ID for the input (auto-generated if not provided)
 * @param {string} props.className - Additional CSS classes
 * @param {string} props['aria-label'] - Accessible label (required if no visible label)
 * @param {Object} props...rest - Other HTML input attributes
 */
const TextInput = ({
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
  type = 'text',
  name,
  id,
  className = '',
  'aria-label': ariaLabel,
  ...rest
}) => {
  // Generate unique ID if not provided
  const uniqueId = useId();
  const inputId = id || `text-input-${uniqueId}`;
  
  // Refs for measuring badge widths
  const prefixRef = useRef(null);
  const suffixRef = useRef(null);
  const wrapperRef = useRef(null);
  
  // State for dynamic padding
  const [prefixPadding, setPrefixPadding] = useState(null);
  const [suffixPadding, setSuffixPadding] = useState(null);
  
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
  
  // Handle change event
  const handleChange = (event) => {
    if (disabled || readOnly) return;
    
    if (onChange) {
      onChange(event.target.value, event);
    }
  };
  
  // Build classes
  const inputClasses = [
    'text-input',
    `size-${size}`,
    className
  ].filter(Boolean).join(' ');
  
  // Determine if controlled or uncontrolled
  const isControlled = value !== undefined;
  const inputProps = isControlled
    ? { value }
    : { defaultValue };
  
  // Check if we need wrapper for affixes/icons
  const needsWrapper = prefix || suffix || iconLeft || iconRight;
  
  // Build inline style for dynamic padding
  // If icon is present alongside badge, use the larger padding value
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
      type={type}
      id={inputId}
      className={inputClasses}
      name={name}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readOnly}
      onChange={handleChange}
      onFocus={onFocus}
      onBlur={onBlur}
      aria-label={ariaLabel}
      style={inputStyle}
      {...inputProps}
      {...rest}
    />
  );
  
  if (!needsWrapper) {
    return (
      <div className="text-input-wrapper">
        {inputElement}
      </div>
    );
  }
  
  // Build wrapper classes
  const wrapperClasses = [
    'text-input-wrapper',
    prefix && 'text-input-with-prefix',
    suffix && 'text-input-with-suffix',
    iconLeft && 'text-input-with-icon-left',
    iconRight && 'text-input-with-icon-right',
  ].filter(Boolean).join(' ');
  
  // Check if prefix/suffix is a Badge component and force neutral styling
  const wrapPrefix = (prefixContent) => {
    if (!prefixContent) return null;
    
    // Try multiple ways to detect Badge component
    if (React.isValidElement(prefixContent)) {
      const componentType = prefixContent.type;
      const isBadge = 
        componentType?.displayName === 'Badge' ||
        componentType?.name === 'Badge' ||
        (typeof componentType === 'function' && componentType.name === 'Badge');
      
      if (isBadge) {
        return React.cloneElement(prefixContent, {
          sentiment: 'neutral',
        });
      }
    }
    
    // If it's not a Badge or we can't detect it, CSS will force neutral styling
    return prefixContent;
  };
  
  const wrapSuffix = (suffixContent) => {
    if (!suffixContent) return null;
    
    // Try multiple ways to detect Badge component
    if (React.isValidElement(suffixContent)) {
      const componentType = suffixContent.type;
      const isBadge = 
        componentType?.displayName === 'Badge' ||
        componentType?.name === 'Badge' ||
        (typeof componentType === 'function' && componentType.name === 'Badge');
      
      if (isBadge) {
        return React.cloneElement(suffixContent, {
          sentiment: 'neutral',
        });
      }
    }
    
    // If it's not a Badge or we can't detect it, CSS will force neutral styling
    return suffixContent;
  };
  
  return (
    <div className={wrapperClasses} ref={wrapperRef}>
      {prefix && (
        <span className="text-input-prefix" ref={prefixRef}>
          {wrapPrefix(prefix)}
        </span>
      )}
      {iconLeft && (
        <span className="text-input-icon-left">{iconLeft}</span>
      )}
      {inputElement}
      {iconRight && (
        <span className="text-input-icon-right">{iconRight}</span>
      )}
      {suffix && (
        <span className="text-input-suffix" ref={suffixRef}>
          {wrapSuffix(suffix)}
        </span>
      )}
    </div>
  );
};

export default TextInput;

