import React from 'react';
import NumberInput from './NumberInput.jsx';
import Badge from '../feedback/Badge.jsx';

/**
 * CurrencyInput Component
 * 
 * A currency input component that wraps NumberInput with currency-specific defaults.
 * Automatically handles currency symbol display, decimal places, and formatting.
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
 * @param {string} props.currency - Currency code: 'USD', 'JPY', 'EUR', 'GBP', etc. Default: 'USD'
 * @param {boolean} props.showSymbol - Whether to show currency symbol as prefix. Default: true
 * @param {number} props.decimalPlaces - Number of decimal places. Defaults to currency-specific (USD=2, JPY=0). Override if needed.
 * @param {boolean} props.formatOnBlur - Format number on blur with thousand separators. Default: true
 * @param {number} props.min - Minimum value allowed
 * @param {number} props.max - Maximum value allowed
 * @param {boolean} props.allowNegative - Whether negative numbers are allowed. Default: false
 * @param {string} props.name - Name attribute for form submission
 * @param {string} props.id - Unique ID for the input (auto-generated if not provided)
 * @param {string} props.className - Additional CSS classes
 * @param {string} props['aria-label'] - Accessible label (required if no visible label)
 * @param {Object} props...rest - Other HTML input attributes
 */
const CurrencyInput = ({
  value,
  defaultValue,
  onChange,
  onFocus,
  onBlur,
  disabled = false,
  readOnly = false,
  placeholder,
  size = 'md',
  currency = 'USD',
  showSymbol = true,
  decimalPlaces,
  formatOnBlur = true,
  min,
  max,
  allowNegative = false,
  name,
  id,
  className = '',
  'aria-label': ariaLabel,
  ...rest
}) => {
  // Currency defaults
  const currencyDefaults = {
    USD: { symbol: 'USD', decimalPlaces: 2 },
    JPY: { symbol: 'JPY', decimalPlaces: 0 },
    EUR: { symbol: 'EUR', decimalPlaces: 2 },
    GBP: { symbol: 'GBP', decimalPlaces: 2 },
    CAD: { symbol: 'CAD', decimalPlaces: 2 },
    AUD: { symbol: 'AUD', decimalPlaces: 2 },
    CNY: { symbol: 'CNY', decimalPlaces: 2 },
  };

  // Get currency config
  const currencyConfig = currencyDefaults[currency.toUpperCase()] || currencyDefaults.USD;
  
  // Determine decimal places (use prop if provided, otherwise use currency default)
  const finalDecimalPlaces = decimalPlaces !== undefined ? decimalPlaces : currencyConfig.decimalPlaces;
  
  // Calculate step based on decimal places
  const step = Math.pow(10, -finalDecimalPlaces);
  
  // Build prefix (currency symbol as Badge)
  const prefix = showSymbol ? <Badge size="micro">{currencyConfig.symbol}</Badge> : undefined;
  
  // Build placeholder if not provided
  const finalPlaceholder = placeholder !== undefined 
    ? placeholder 
    : (finalDecimalPlaces === 0 ? '0' : '0.00');

  return (
    <NumberInput
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      disabled={disabled}
      readOnly={readOnly}
      placeholder={finalPlaceholder}
      size={size}
      prefix={prefix}
      decimalPlaces={finalDecimalPlaces}
      step={step}
      formatOnBlur={formatOnBlur}
      min={min}
      max={max}
      allowNegative={allowNegative}
      name={name}
      id={id}
      className={className}
      aria-label={ariaLabel}
      {...rest}
    />
  );
};

export default CurrencyInput;

