import React, { useState, useRef, useEffect, useId } from 'react';
import './Select.css';

/**
 * Select Component
 * 
 * A single-select dropdown component with size variants, optional search, and keyboard navigation.
 * 
 * @param {Object} props
 * @param {Array<{value: any, label: string}>} props.options - Array of option objects with value and label
 * @param {any} props.value - Selected value (controlled mode)
 * @param {any} props.defaultValue - Default selected value (uncontrolled mode)
 * @param {Function} props.onChange - Change handler: (value: any, option: Object) => void
 * @param {string} props.placeholder - Placeholder text when no option is selected
 * @param {boolean} props.disabled - Whether the select is disabled
 * @param {boolean} props.searchable - Whether options can be filtered by search
 * @param {string} props.size - Size variant: 'mini' (32px), 'sm' (36px), 'md' (40px), 'lg' (48px). Default: 'md'
 * @param {string} props.name - Name attribute for form submission
 * @param {string} props.id - Unique ID for the select (auto-generated if not provided)
 * @param {string} props.className - Additional CSS classes
 * @param {string} props['aria-label'] - Accessible label (required if no visible label)
 * @param {Object} props...rest - Other HTML attributes
 */
const Select = ({
  options = [],
  value,
  defaultValue,
  onChange,
  placeholder = 'Select an option...',
  disabled = false,
  searchable = false,
  size = 'md',
  name,
  id,
  className = '',
  'aria-label': ariaLabel,
  ...rest
}) => {
  // Generate unique ID if not provided
  const uniqueId = useId();
  const selectId = id || `select-${uniqueId}`;
  
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
  const optionsRef = useRef([]);
  
  // Determine if controlled or uncontrolled
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  
  // Filter options based on search query
  const filteredOptions = searchable && searchQuery
    ? options.filter(option => 
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;
  
  // Find selected option
  const selectedOption = options.find(opt => opt.value === currentValue);
  const buttonText = selectedOption ? selectedOption.label : placeholder;
  
  // Handle option selection
  const handleSelect = (option) => {
    if (disabled || option.disabled) return;
    
    if (!isControlled) {
      setInternalValue(option.value);
    }
    
    if (onChange) {
      onChange(option.value, option);
    }
    
    setIsOpen(false);
    setSearchQuery('');
  };
  
  // Handle toggle dropdown
  const handleToggle = () => {
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
  
  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (event) => {
      if (!selectRef.current?.contains(document.activeElement)) return;
      
      switch (event.key) {
        case 'Escape':
          setIsOpen(false);
          setSearchQuery('');
          buttonRef.current?.focus();
          break;
          
        case 'ArrowDown':
          event.preventDefault();
          const currentIndex = filteredOptions.findIndex(opt => opt.value === currentValue);
          const nextIndex = currentIndex < filteredOptions.length - 1 ? currentIndex + 1 : 0;
          if (filteredOptions[nextIndex] && !filteredOptions[nextIndex].disabled) {
            handleSelect(filteredOptions[nextIndex]);
          }
          break;
          
        case 'ArrowUp':
          event.preventDefault();
          const currentIdx = filteredOptions.findIndex(opt => opt.value === currentValue);
          const prevIndex = currentIdx > 0 ? currentIdx - 1 : filteredOptions.length - 1;
          if (filteredOptions[prevIndex] && !filteredOptions[prevIndex].disabled) {
            handleSelect(filteredOptions[prevIndex]);
          }
          break;
          
        case 'Enter':
          event.preventDefault();
          if (selectedOption && !selectedOption.disabled) {
            handleSelect(selectedOption);
          }
          break;
          
        default:
          break;
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentValue, filteredOptions, selectedOption]);
  
  // Build classes
  const wrapperClasses = [
    'select-wrapper',
    className
  ].filter(Boolean).join(' ');
  
  const buttonClasses = [
    'select-button',
    `size-${size}`,
    !selectedOption && 'placeholder',
    isOpen && 'open',
    disabled && 'disabled'
  ].filter(Boolean).join(' ');
  
  const dropdownClasses = [
    'select-dropdown',
    openAbove && 'above'
  ].filter(Boolean).join(' ');
  
  return (
    <div className={wrapperClasses} ref={selectRef}>
      <button
        ref={buttonRef}
        id={selectId}
        type="button"
        className={buttonClasses}
        onClick={handleToggle}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        {...rest}
      >
        <span className="select-button-text">{buttonText}</span>
        <svg 
          className="select-button-icon"
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
        <div className={dropdownClasses} ref={dropdownRef} role="listbox">
          {searchable && (
            <div className="select-search">
              <input
                ref={searchInputRef}
                type="text"
                className="select-search-input"
                placeholder="Search options..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
          
          <div className="select-options">
            {filteredOptions.length === 0 ? (
              <div className="select-no-options">No options found</div>
            ) : (
              filteredOptions.map((option, index) => {
                const isSelected = option.value === currentValue;
                return (
                  <button
                    key={option.value}
                    ref={(el) => { optionsRef.current[index] = el; }}
                    type="button"
                    className={`select-option ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleSelect(option)}
                    disabled={option.disabled}
                    role="option"
                    aria-selected={isSelected}
                  >
                    {option.label}
                  </button>
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
          value={currentValue || ''}
        />
      )}
    </div>
  );
};

export default Select;

