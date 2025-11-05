import React, { useId, useState, useEffect, useRef } from 'react';
import './PhoneInput.css';
import { formatInternationalPhone, parsePhone } from '../../utils/phone-formatter';
import { countries, findCountryByDialCode, getDefaultCountry, searchCountries } from '../../utils/country-codes';
import Badge from '../feedback/Badge.jsx';
import { ChevronDownIcon } from '../../utils/icons.jsx';

/**
 * PhoneInput Component
 * 
 * A phone number input component with country code selector using Badge component.
 * Supports flexible international formatting, stripping all non-numeric characters.
 * 
 * @param {Object} props
 * @param {string} props.value - Input value (controlled mode)
 * @param {string} props.defaultValue - Default input value (uncontrolled mode)
 * @param {Function} props.onChange - Change handler: (value: string, event: Event) => void
 * @param {Function} props.onFocus - Focus handler
 * @param {Function} props.onBlur - Blur handler
 * @param {Function} props.onCountryChange - Country change handler: (dialCode: string, country: Object) => void
 * @param {boolean} props.disabled - Whether the input is disabled
 * @param {boolean} props.readOnly - Whether the input is read-only
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.size - Size variant: 'mini' (32px), 'sm' (36px), 'md' (40px), 'lg' (48px). Default: 'md'
 * @param {string} props.countryCode - Country dial code (e.g., "+81"). Default: "+81" (Japan)
 * @param {string} props.name - Name attribute for form submission
 * @param {string} props.id - Unique ID for the input (auto-generated if not provided)
 * @param {string} props.className - Additional CSS classes
 * @param {string} props['aria-label'] - Accessible label (required if no visible label)
 * @param {Object} props...rest - Other HTML input attributes
 */
const PhoneInput = ({
  value,
  defaultValue,
  onChange,
  onFocus,
  onBlur,
  onCountryChange,
  disabled = false,
  readOnly = false,
  placeholder,
  size = 'md',
  countryCode = '+81',
  name,
  id,
  className = '',
  'aria-label': ariaLabel,
  ...rest
}) => {
  // Generate unique ID if not provided
  const uniqueId = useId();
  const inputId = id || `phone-input-${uniqueId}`;
  
  // Refs
  const wrapperRef = useRef(null);
  const badgeRef = useRef(null);
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);
  const optionsRef = useRef([]);
  
  // State
  const [selectedCountry, setSelectedCountry] = useState(() => {
    return findCountryByDialCode(countryCode) || getDefaultCountry();
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [openAbove, setOpenAbove] = useState(false);
  const [displayValue, setDisplayValue] = useState(() => {
    const initialValue = value !== undefined ? value : defaultValue;
    if (initialValue) {
      return formatInternationalPhone(initialValue);
    }
    return '';
  });
  
  // Update selected country when countryCode prop changes
  useEffect(() => {
    const country = findCountryByDialCode(countryCode);
    if (country) {
      setSelectedCountry(country);
    }
  }, [countryCode]);
  
  // Update display value when controlled `value` prop changes
  useEffect(() => {
    if (value !== undefined) {
      if (value === null || value === '') {
        setDisplayValue('');
      } else {
        setDisplayValue(formatInternationalPhone(value));
      }
    }
  }, [value]);
  
  // Filter countries based on search query
  const filteredCountries = searchCountries(searchQuery);
  
  // Handle country selection
  const handleCountrySelect = (country) => {
    if (disabled || readOnly) return;
    
    setSelectedCountry(country);
    setIsDropdownOpen(false);
    setSearchQuery('');
    
    if (onCountryChange) {
      onCountryChange(country.dialCode, country);
    }
  };
  
  // Handle badge click to toggle dropdown
  const handleBadgeClick = () => {
    if (disabled || readOnly) return;
    setIsDropdownOpen(!isDropdownOpen);
    if (!isDropdownOpen) {
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
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setSearchQuery('');
      }
    };
    
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isDropdownOpen]);
  
  // Calculate dropdown position (above or below)
  useEffect(() => {
    if (isDropdownOpen && badgeRef.current) {
      requestAnimationFrame(() => {
        if (badgeRef.current) {
          const badgeRect = badgeRef.current.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          
          const availableBottom = viewportHeight - badgeRect.bottom;
          const availableTop = badgeRect.top;
          
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
  }, [isDropdownOpen, filteredCountries.length]);
  
  // Keyboard navigation
  useEffect(() => {
    if (!isDropdownOpen) return;
    
    const handleKeyDown = (event) => {
      if (!wrapperRef.current?.contains(document.activeElement)) return;
      
      switch (event.key) {
        case 'Escape':
          setIsDropdownOpen(false);
          setSearchQuery('');
          badgeRef.current?.focus();
          break;
          
        case 'ArrowDown':
          event.preventDefault();
          if (filteredCountries.length > 0) {
            const currentIndex = filteredCountries.findIndex(c => c.dialCode === selectedCountry.dialCode);
            const nextIndex = currentIndex < filteredCountries.length - 1 ? currentIndex + 1 : 0;
            if (filteredCountries[nextIndex]) {
              handleCountrySelect(filteredCountries[nextIndex]);
            }
          }
          break;
          
        case 'ArrowUp':
          event.preventDefault();
          if (filteredCountries.length > 0) {
            const currentIdx = filteredCountries.findIndex(c => c.dialCode === selectedCountry.dialCode);
            const prevIndex = currentIdx > 0 ? currentIdx - 1 : filteredCountries.length - 1;
            if (filteredCountries[prevIndex]) {
              handleCountrySelect(filteredCountries[prevIndex]);
            }
          }
          break;
          
        case 'Enter':
          event.preventDefault();
          if (selectedCountry) {
            handleCountrySelect(selectedCountry);
          }
          break;
          
        default:
          break;
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isDropdownOpen, selectedCountry, filteredCountries]);
  
  // Handle phone input change
  const handleChange = (event) => {
    if (disabled || readOnly) return;
    
    const inputValue = event.target.value;
    
    // Strip all non-numeric characters
    const formatted = formatInternationalPhone(inputValue);
    
    setDisplayValue(formatted);
    
    // Call onChange with digits only
    if (onChange) {
      onChange(formatted, event);
    }
  };
  
  // Handle blur event
  const handleBlur = (event) => {
    if (onBlur) {
      onBlur(event);
    }
  };
  
  // Handle focus event
  const handleFocus = (event) => {
    if (onFocus) {
      onFocus(event);
    }
  };
  
  // Build classes
  const wrapperClasses = [
    'phone-input-wrapper',
    className
  ].filter(Boolean).join(' ');
  
  const inputClasses = [
    'phone-input',
    `size-${size}`,
    'phone-input-with-country-selector'
  ].filter(Boolean).join(' ');
  
  const badgeClasses = [
    'phone-input-country-badge',
    isDropdownOpen && 'open',
    disabled && 'disabled',
    readOnly && 'readonly'
  ].filter(Boolean).join(' ');
  
  const dropdownClasses = [
    'phone-input-country-dropdown',
    openAbove && 'above'
  ].filter(Boolean).join(' ');
  
  // Determine placeholder
  const finalPlaceholder = placeholder !== undefined ? placeholder : 'Phone number';
  
  // Badge display text: abbreviation + dialCode (e.g., "JP +81")
  const badgeText = selectedCountry ? `${selectedCountry.abbreviation} ${selectedCountry.dialCode}` : '';
  
  return (
    <div className={wrapperClasses} ref={wrapperRef}>
      {/* Country selector badge */}
      <button
        type="button"
        ref={badgeRef}
        className={badgeClasses}
        onClick={handleBadgeClick}
        disabled={disabled || readOnly}
        aria-label={`Select country code. Current: ${badgeText}`}
        aria-expanded={isDropdownOpen}
        aria-haspopup="listbox"
      >
        <Badge
          size={size === 'mini' ? 'mini' : size === 'sm' ? 'sm' : size === 'md' ? 'md' : 'lg'}
          sentiment="neutral"
          iconRight={<ChevronDownIcon size={12} />}
        >
          {badgeText}
        </Badge>
      </button>
      
      {/* Phone number input */}
      <input
        type="tel"
        id={inputId}
        className={inputClasses}
        name={name}
        placeholder={finalPlaceholder}
        disabled={disabled}
        readOnly={readOnly}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        aria-label={ariaLabel}
        value={displayValue}
        {...rest}
      />
      
      {/* Country dropdown */}
      {isDropdownOpen && !disabled && !readOnly && (
        <div className={dropdownClasses} ref={dropdownRef} role="listbox">
          {/* Search input */}
          <div className="phone-input-country-search">
            <input
              ref={searchInputRef}
              type="text"
              className="phone-input-country-search-input"
              placeholder="Search countries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          
          {/* Country options */}
          <div className="phone-input-country-options">
            {filteredCountries.length === 0 ? (
              <div className="phone-input-country-no-results">No countries found</div>
            ) : (
              filteredCountries.map((country, index) => {
                const isSelected = country.dialCode === selectedCountry.dialCode;
                return (
                  <button
                    key={country.code}
                    ref={(el) => { optionsRef.current[index] = el; }}
                    type="button"
                    className={`phone-input-country-option ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleCountrySelect(country)}
                    role="option"
                    aria-selected={isSelected}
                  >
                    {country.name} {country.dialCode}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
      
      {/* Hidden input for form submission (includes country code) */}
      {name && (
        <input
          type="hidden"
          name={name}
          value={selectedCountry ? `${selectedCountry.dialCode}${displayValue}` : displayValue}
        />
      )}
    </div>
  );
};

export default PhoneInput;
