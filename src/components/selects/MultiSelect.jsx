import React, { useState, useRef, useEffect, useId } from 'react';
import './MultiSelect.css';

/**
 * MultiSelect Component
 * 
 * A multi-select dropdown component with size variants, optional search, checkbox selection, and Select All/Clear All actions.
 * 
 * @param {Object} props
 * @param {Array<{value: any, label: string, disabled?: boolean}>} props.options - Array of option objects with value and label
 * @param {Array<any>} props.value - Selected values array (controlled mode)
 * @param {Array<any>} props.defaultValue - Default selected values array (uncontrolled mode)
 * @param {Function} props.onChange - Change handler: (values: Array<any>) => void
 * @param {string} props.placeholder - Placeholder text when no options are selected
 * @param {boolean} props.disabled - Whether the select is disabled
 * @param {boolean} props.searchable - Whether options can be filtered by search
 * @param {boolean} props.showSelectAll - Whether to show Select All/Clear All actions. Default: true
 * @param {string} props.size - Size variant: 'mini' (32px), 'sm' (36px), 'md' (40px), 'lg' (48px). Default: 'md'
 * @param {string} props.name - Name attribute for form submission
 * @param {string} props.id - Unique ID for the select (auto-generated if not provided)
 * @param {string} props.className - Additional CSS classes
 * @param {string} props['aria-label'] - Accessible label (required if no visible label)
 * @param {Object} props...rest - Other HTML attributes
 */
const MultiSelect = ({
  options = [],
  value,
  defaultValue = [],
  onChange,
  placeholder = 'Select options...',
  disabled = false,
  searchable = false,
  showSelectAll = true,
  size = 'md',
  name,
  id,
  className = '',
  'aria-label': ariaLabel,
  ...rest
}) => {
  // Generate unique ID if not provided
  const uniqueId = useId();
  const selectId = id || `multiselect-${uniqueId}`;
  
  // State
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [openAbove, setOpenAbove] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue);
  
  // Refs
  const selectRef = useRef(null);
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);
  
  // Determine if controlled or uncontrolled
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  
  // Filter options based on search query
  const filteredOptions = searchable && searchQuery
    ? options.filter(option => 
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;
  
  // Get selected labels
  const getSelectedLabels = () => {
    return currentValue.map(val => options.find(opt => opt.value === val)?.label).filter(Boolean);
  };
  
  // Get button text
  const getButtonText = () => {
    if (currentValue.length === 0) return placeholder;
    if (currentValue.length === 1) return getSelectedLabels()[0];
    return `${currentValue.length} selected`;
  };
  
  // Handle option toggle
  const handleToggle = (optionValue) => {
    if (disabled) return;
    
    const newValue = currentValue.includes(optionValue)
      ? currentValue.filter(v => v !== optionValue)
      : [...currentValue, optionValue];
    
    if (!isControlled) {
      setInternalValue(newValue);
    }
    
    if (onChange) {
      onChange(newValue);
    }
  };
  
  // Handle Select All
  const handleSelectAll = () => {
    if (disabled) return;
    
    const availableOptions = filteredOptions.filter(opt => !opt.disabled).map(opt => opt.value);
    const newValue = [...new Set([...currentValue, ...availableOptions])];
    
    if (!isControlled) {
      setInternalValue(newValue);
    }
    
    if (onChange) {
      onChange(newValue);
    }
  };
  
  // Handle Clear All
  const handleClearAll = () => {
    if (disabled) return;
    
    const filteredValues = filteredOptions.map(opt => opt.value);
    const newValue = currentValue.filter(v => !filteredValues.includes(v));
    
    if (!isControlled) {
      setInternalValue(newValue);
    }
    
    if (onChange) {
      onChange(newValue);
    }
  };
  
  // Handle toggle dropdown
  const handleToggleDropdown = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
    if (!isOpen && searchable) {
      // Focus search input when opening
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 0);
    }
  };
  
  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);
  
  // Calculate dropdown position (above or below)
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      requestAnimationFrame(() => {
        if (buttonRef.current) {
          const buttonRect = buttonRef.current.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          
          const availableBottom = viewportHeight - buttonRect.bottom;
          const availableTop = buttonRect.top;
          
          // Estimate dropdown height (approximate)
          const estimatedDropdownHeight = 260;
          
          // Check if we should open above (with 8px buffer)
          const shouldOpenAbove = availableBottom < estimatedDropdownHeight + 8 && availableTop > availableBottom;
          
          setOpenAbove(shouldOpenAbove);
        }
      });
    } else {
      setOpenAbove(false);
    }
  }, [isOpen, filteredOptions.length]);
  
  // Build classes
  const wrapperClasses = [
    'multi-select-wrapper',
    className
  ].filter(Boolean).join(' ');
  
  const buttonClasses = [
    'multi-select-button',
    `size-${size}`,
    currentValue.length === 0 && 'placeholder',
    isOpen && 'open',
    disabled && 'disabled'
  ].filter(Boolean).join(' ');
  
  const dropdownClasses = [
    'multi-select-dropdown',
    openAbove && 'above'
  ].filter(Boolean).join(' ');
  
  return (
    <div className={wrapperClasses} ref={selectRef}>
      <button
        ref={buttonRef}
        id={selectId}
        type="button"
        className={buttonClasses}
        onClick={handleToggleDropdown}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-multiselectable="true"
        {...rest}
      >
        <span className="multi-select-button-text">{getButtonText()}</span>
        <svg 
          className="multi-select-button-icon"
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      
      {isOpen && !disabled && (
        <div className={dropdownClasses} ref={dropdownRef} role="listbox" aria-multiselectable="true">
          {searchable && (
            <div className="multi-select-search">
              <input
                ref={searchInputRef}
                type="text"
                className="multi-select-search-input"
                placeholder="Search options..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
          
          {showSelectAll && filteredOptions.length > 0 && (
            <div className="multi-select-actions">
              <button
                type="button"
                className="multi-select-action"
                onClick={handleSelectAll}
              >
                Select All
              </button>
              <button
                type="button"
                className="multi-select-action"
                onClick={handleClearAll}
              >
                Clear All
              </button>
            </div>
          )}
          
          <div className="multi-select-options">
            {filteredOptions.length === 0 ? (
              <div className="multi-select-no-options">No options found</div>
            ) : (
              filteredOptions.map((option) => {
                const isSelected = currentValue.includes(option.value);
                return (
                  <label
                    key={option.value}
                    className={`multi-select-option ${option.disabled ? 'disabled' : ''}`}
                    onClick={(e) => {
                      if (!option.disabled && !disabled) {
                        e.preventDefault();
                        handleToggle(option.value);
                      }
                    }}
                  >
                    <input
                      type="checkbox"
                      className="multi-select-checkbox"
                      checked={isSelected}
                      readOnly
                      disabled={option.disabled || disabled}
                    />
                    <span className="multi-select-option-label">{option.label}</span>
                  </label>
                );
              })
            )}
          </div>
        </div>
      )}
      
      {/* Hidden input for form submission */}
      {name && (
        <input
          type="hidden"
          name={name}
          value={JSON.stringify(currentValue)}
        />
      )}
    </div>
  );
};

export default MultiSelect;

