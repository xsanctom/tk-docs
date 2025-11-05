// src/utils/phone-formatter.js

/**
 * Phone Number Formatting Utilities
 * 
 * Handles formatting and parsing of international phone numbers.
 * Strips all non-numeric characters to keep only digits.
 */

/**
 * Extract only digits from a phone number string
 * Strips all non-numeric characters including parentheses, dashes, spaces, etc.
 * @param {string} str - Phone number string
 * @returns {string} - Digits only
 */
export const extractDigits = (str) => {
  if (!str) return '';
  return str.replace(/\D/g, '');
};

/**
 * Format international phone number
 * Removes all non-numeric characters (parentheses, dashes, spaces, etc.)
 * Keeps only digits. No length restrictions.
 * @param {string} input - Phone number input (may contain formatting)
 * @returns {string} - Digits only
 */
export const formatInternationalPhone = (input) => {
  if (!input) return '';
  return extractDigits(input);
};

/**
 * Parse formatted phone number back to digits only
 * @param {string} formatted - Formatted phone number
 * @returns {string} - Digits only
 */
export const parsePhone = (formatted) => {
  return extractDigits(formatted);
};

// Legacy exports for backward compatibility (deprecated)
/**
 * @deprecated Use formatInternationalPhone instead
 */
export const formatUSPhone = (digits) => {
  if (!digits) return '';
  const limited = digits.slice(0, 10);
  if (limited.length === 0) return '';
  if (limited.length <= 3) return `(${limited}`;
  if (limited.length <= 6) {
    return `(${limited.slice(0, 3)}) ${limited.slice(3)}`;
  }
  return `(${limited.slice(0, 3)}) ${limited.slice(3, 6)}-${limited.slice(6)}`;
};

/**
 * @deprecated Validation removed for international format
 */
export const isValidUSPhone = (digits) => {
  return digits.length === 10 && /^\d+$/.test(digits);
};

