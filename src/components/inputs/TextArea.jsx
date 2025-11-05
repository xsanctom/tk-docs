import React, { useId, useRef, useEffect, useCallback } from 'react';
import './TextArea.css';

/**
 * TextArea Component
 * 
 * A multi-line text input component with size variants, optional rows configuration, and resize support.
 * 
 * @param {Object} props
 * @param {string} props.value - Textarea value (controlled mode)
 * @param {string} props.defaultValue - Default textarea value (uncontrolled mode)
 * @param {Function} props.onChange - Change handler: (value: string, event: Event) => void
 * @param {Function} props.onFocus - Focus handler
 * @param {Function} props.onBlur - Blur handler
 * @param {boolean} props.disabled - Whether the textarea is disabled
 * @param {boolean} props.readOnly - Whether the textarea is read-only
 * @param {string} props.placeholder - Placeholder text
 * @param {number} props.rows - Number of visible text rows. Default: 3
 * @param {string} props.size - Size variant: 'mini' (32px min), 'sm' (36px min), 'md' (40px min), 'lg' (48px min). Default: 'md'
 * @param {boolean} props.resize - Whether the textarea can be resized. Default: true (vertical only)
 * @param {boolean} props.autoExpand - Whether the textarea should automatically expand based on content. Default: false
 * @param {number} props.minRows - Minimum number of rows when autoExpand is enabled. Default: 2
 * @param {number} props.maxRows - Maximum number of rows when autoExpand is enabled. Default: null (no limit)
 * @param {string} props.name - Name attribute for form submission
 * @param {string} props.id - Unique ID for the textarea (auto-generated if not provided)
 * @param {string} props.className - Additional CSS classes
 * @param {string} props['aria-label'] - Accessible label (required if no visible label)
 * @param {Object} props...rest - Other HTML textarea attributes
 */
const TextArea = ({
  value,
  defaultValue,
  onChange,
  onFocus,
  onBlur,
  disabled = false,
  readOnly = false,
  placeholder,
  rows = 3,
  size = 'md',
  resize = true,
  autoExpand = false,
  minRows = 2,
  maxRows = null,
  name,
  id,
  className = '',
  'aria-label': ariaLabel,
  ...rest
}) => {
  // Generate unique ID if not provided
  const uniqueId = useId();
  const textareaId = id || `textarea-${uniqueId}`;
  const textareaRef = useRef(null);
  
  // Helper function to calculate and set height
  const calculateHeight = useCallback(() => {
    if (!autoExpand || !textareaRef.current) return;
    
    const textarea = textareaRef.current;
    
    // Reset height to auto to get accurate scrollHeight
    textarea.style.height = 'auto';
    
    // Get scrollHeight
    const scrollHeight = textarea.scrollHeight;
    
    // Calculate line height from computed styles
    const computedStyle = getComputedStyle(textarea);
    const lineHeight = parseFloat(computedStyle.lineHeight) || 21; // fallback: 14px * 1.5
    const paddingTop = parseFloat(computedStyle.paddingTop) || 8;
    const paddingBottom = parseFloat(computedStyle.paddingBottom) || 8;
    const borderTop = parseFloat(computedStyle.borderTopWidth) || 1;
    const borderBottom = parseFloat(computedStyle.borderBottomWidth) || 1;
    
    // Calculate min and max heights
    const minHeight = (lineHeight * minRows) + paddingTop + paddingBottom + borderTop + borderBottom;
    const maxHeight = maxRows 
      ? (lineHeight * maxRows) + paddingTop + paddingBottom + borderTop + borderBottom
      : null;
    
    // Determine final height
    let newHeight = scrollHeight;
    if (newHeight < minHeight) {
      newHeight = minHeight;
    }
    if (maxHeight && newHeight > maxHeight) {
      newHeight = maxHeight;
      textarea.style.overflowY = 'auto';
    } else {
      textarea.style.overflowY = 'hidden';
    }
    
    textarea.style.height = `${newHeight}px`;
  }, [autoExpand, minRows, maxRows]);
  
  // Auto-expand on mount and when value/content changes
  useEffect(() => {
    calculateHeight();
  }, [value, defaultValue, calculateHeight]);
  
  // Handle change event
  const handleChange = (event) => {
    if (disabled || readOnly) return;
    
    // Trigger auto-expand recalculation
    if (autoExpand) {
      // Use setTimeout to ensure DOM has updated
      setTimeout(() => {
        calculateHeight();
      }, 0);
    }
    
    if (onChange) {
      onChange(event.target.value, event);
    }
  };
  
  // Build classes
  const textareaClasses = [
    'text-area',
    `size-${size}`,
    autoExpand && 'text-area-auto-expand',
    className
  ].filter(Boolean).join(' ');
  
  // Determine if controlled or uncontrolled
  const isControlled = value !== undefined;
  const textareaProps = isControlled
    ? { value }
    : { defaultValue };
  
  // Build style for resize
  const style = {
    resize: autoExpand ? 'none' : (resize ? 'vertical' : 'none'),
    ...rest.style,
  };
  
  return (
    <div className="text-area-wrapper">
      <textarea
        ref={textareaRef}
        id={textareaId}
        className={textareaClasses}
        name={name}
        rows={autoExpand ? minRows : rows}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        onChange={handleChange}
        onFocus={onFocus}
        onBlur={onBlur}
        aria-label={ariaLabel}
        style={style}
        {...textareaProps}
        {...rest}
      />
    </div>
  );
};

export default TextArea;
