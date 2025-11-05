import React, { useId } from 'react';
import './InputGroup.css';

/**
 * InputGroup Component
 * 
 * A wrapper component for form inputs that provides consistent structure for labels,
 * sublabels, helper text, and error messages. Ensures proper spacing and accessibility.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - The input component to wrap
 * @param {string|React.ReactNode} props.label - Label text or element
 * @param {string|React.ReactNode} props.sublabel - Optional sublabel text or element (appears below label)
 * @param {string|React.ReactNode} props.helperText - Optional helper text (appears below input)
 * @param {string|React.ReactNode} props.error - Optional error message (appears below input, above helper text)
 * @param {boolean} props.optional - Whether to show "(Optional)" indicator next to label
 * @param {string} props.optionalText - Custom optional text. Default: "(Optional)"
 * @param {string} props.id - Unique ID for the group (auto-generated if not provided)
 * @param {string} props.className - Additional CSS classes
 * @param {string} props['aria-describedby'] - Additional aria-describedby value (for custom descriptions)
 */
const InputGroup = ({
  children,
  label,
  sublabel,
  helperText,
  error,
  optional = false,
  optionalText = '(Optional)',
  id,
  className = '',
  'aria-describedby': ariaDescribedBy,
  ...rest
}) => {
  // Generate unique ID if not provided
  const uniqueId = useId();
  const groupId = id || `input-group-${uniqueId}`;
  
  // Build aria-describedby attribute
  const describedByParts = [];
  if (error) {
    describedByParts.push(`${groupId}-error`);
  }
  if (helperText) {
    describedByParts.push(`${groupId}-helper`);
  }
  if (ariaDescribedBy) {
    describedByParts.push(ariaDescribedBy);
  }
  const ariaDescribedByValue = describedByParts.length > 0 
    ? describedByParts.join(' ') 
    : undefined;
  
  // Build classes
  const groupClasses = [
    'input-group',
    className
  ].filter(Boolean).join(' ');
  
  // Check if we have a label to show
  const hasLabel = label !== undefined && label !== null && label !== '';
  
  return (
    <div className={groupClasses} id={groupId} {...rest}>
      {/* Label Group */}
      {hasLabel && (
        <div className="input-group-label-group">
          <label 
            className="input-group-label" 
            htmlFor={React.isValidElement(children) && children.props.id 
              ? children.props.id 
              : `${groupId}-input`
            }
          >
            {label}
          </label>
          {optional && (
            <span className="input-group-optional">
              {optionalText}
            </span>
          )}
        </div>
      )}
      
      {/* Sublabel */}
      {sublabel && (
        <div className="input-group-sublabel">
          {sublabel}
        </div>
      )}
      
      {/* Input Wrapper */}
      <div className="input-group-input-wrapper">
        {/* Clone children to add aria-describedby and id if needed */}
        {React.isValidElement(children) 
          ? React.cloneElement(children, {
              ...(hasLabel && !children.props.id && { id: `${groupId}-input` }),
              ...(ariaDescribedByValue && { 'aria-describedby': ariaDescribedByValue }),
              ...(error && { 'aria-invalid': 'true' }),
            })
          : children
        }
        
        {/* Error Message */}
        {error && (
          <div 
            id={`${groupId}-error`}
            className="input-group-error"
            role="alert"
          >
            {error}
          </div>
        )}
      </div>
      
      {/* Helper Text */}
      {helperText && !error && (
        <div 
          id={`${groupId}-helper`}
          className="input-group-helper"
        >
          {helperText}
        </div>
      )}
    </div>
  );
};

export default InputGroup;

