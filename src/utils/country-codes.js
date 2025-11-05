// src/utils/country-codes.js

/**
 * Country Code Data and Utilities
 * 
 * Provides country code data for phone number input components.
 */

/**
 * Country object structure:
 * - code: ISO 2-letter country code (e.g., "JP")
 * - name: Full country name (e.g., "Japan")
 * - dialCode: Phone dial code with + prefix (e.g., "+81")
 * - abbreviation: Country abbreviation (e.g., "JP")
 */

export const countries = [
  { code: 'JP', name: 'Japan', dialCode: '+81', abbreviation: 'JP' },
  { code: 'US', name: 'United States', dialCode: '+1', abbreviation: 'US' },
  { code: 'GB', name: 'United Kingdom', dialCode: '+44', abbreviation: 'GB' },
  { code: 'CA', name: 'Canada', dialCode: '+1', abbreviation: 'CA' },
  { code: 'AU', name: 'Australia', dialCode: '+61', abbreviation: 'AU' },
  { code: 'DE', name: 'Germany', dialCode: '+49', abbreviation: 'DE' },
  { code: 'FR', name: 'France', dialCode: '+33', abbreviation: 'FR' },
  { code: 'IT', name: 'Italy', dialCode: '+39', abbreviation: 'IT' },
  { code: 'ES', name: 'Spain', dialCode: '+34', abbreviation: 'ES' },
  { code: 'NL', name: 'Netherlands', dialCode: '+31', abbreviation: 'NL' },
  { code: 'BE', name: 'Belgium', dialCode: '+32', abbreviation: 'BE' },
  { code: 'CH', name: 'Switzerland', dialCode: '+41', abbreviation: 'CH' },
  { code: 'AT', name: 'Austria', dialCode: '+43', abbreviation: 'AT' },
  { code: 'SE', name: 'Sweden', dialCode: '+46', abbreviation: 'SE' },
  { code: 'NO', name: 'Norway', dialCode: '+47', abbreviation: 'NO' },
  { code: 'DK', name: 'Denmark', dialCode: '+45', abbreviation: 'DK' },
  { code: 'FI', name: 'Finland', dialCode: '+358', abbreviation: 'FI' },
  { code: 'PL', name: 'Poland', dialCode: '+48', abbreviation: 'PL' },
  { code: 'CZ', name: 'Czech Republic', dialCode: '+420', abbreviation: 'CZ' },
  { code: 'IE', name: 'Ireland', dialCode: '+353', abbreviation: 'IE' },
  { code: 'PT', name: 'Portugal', dialCode: '+351', abbreviation: 'PT' },
  { code: 'GR', name: 'Greece', dialCode: '+30', abbreviation: 'GR' },
  { code: 'RU', name: 'Russia', dialCode: '+7', abbreviation: 'RU' },
  { code: 'CN', name: 'China', dialCode: '+86', abbreviation: 'CN' },
  { code: 'KR', name: 'South Korea', dialCode: '+82', abbreviation: 'KR' },
  { code: 'IN', name: 'India', dialCode: '+91', abbreviation: 'IN' },
  { code: 'BR', name: 'Brazil', dialCode: '+55', abbreviation: 'BR' },
  { code: 'MX', name: 'Mexico', dialCode: '+52', abbreviation: 'MX' },
  { code: 'AR', name: 'Argentina', dialCode: '+54', abbreviation: 'AR' },
  { code: 'CL', name: 'Chile', dialCode: '+56', abbreviation: 'CL' },
  { code: 'CO', name: 'Colombia', dialCode: '+57', abbreviation: 'CO' },
  { code: 'PE', name: 'Peru', dialCode: '+51', abbreviation: 'PE' },
  { code: 'VE', name: 'Venezuela', dialCode: '+58', abbreviation: 'VE' },
  { code: 'ZA', name: 'South Africa', dialCode: '+27', abbreviation: 'ZA' },
  { code: 'EG', name: 'Egypt', dialCode: '+20', abbreviation: 'EG' },
  { code: 'NG', name: 'Nigeria', dialCode: '+234', abbreviation: 'NG' },
  { code: 'KE', name: 'Kenya', dialCode: '+254', abbreviation: 'KE' },
  { code: 'SG', name: 'Singapore', dialCode: '+65', abbreviation: 'SG' },
  { code: 'MY', name: 'Malaysia', dialCode: '+60', abbreviation: 'MY' },
  { code: 'TH', name: 'Thailand', dialCode: '+66', abbreviation: 'TH' },
  { code: 'PH', name: 'Philippines', dialCode: '+63', abbreviation: 'PH' },
  { code: 'ID', name: 'Indonesia', dialCode: '+62', abbreviation: 'ID' },
  { code: 'VN', name: 'Vietnam', dialCode: '+84', abbreviation: 'VN' },
  { code: 'TW', name: 'Taiwan', dialCode: '+886', abbreviation: 'TW' },
  { code: 'HK', name: 'Hong Kong', dialCode: '+852', abbreviation: 'HK' },
  { code: 'NZ', name: 'New Zealand', dialCode: '+64', abbreviation: 'NZ' },
  { code: 'IL', name: 'Israel', dialCode: '+972', abbreviation: 'IL' },
  { code: 'AE', name: 'United Arab Emirates', dialCode: '+971', abbreviation: 'AE' },
  { code: 'SA', name: 'Saudi Arabia', dialCode: '+966', abbreviation: 'SA' },
  { code: 'TR', name: 'Turkey', dialCode: '+90', abbreviation: 'TR' },
];

/**
 * Find country by dial code
 * @param {string} dialCode - Dial code with + prefix (e.g., "+81")
 * @returns {Object|null} - Country object or null if not found
 */
export const findCountryByDialCode = (dialCode) => {
  return countries.find(country => country.dialCode === dialCode) || null;
};

/**
 * Find country by code (ISO 2-letter)
 * @param {string} code - ISO 2-letter country code (e.g., "JP")
 * @returns {Object|null} - Country object or null if not found
 */
export const findCountryByCode = (code) => {
  return countries.find(country => country.code === code) || null;
};

/**
 * Get default country (Japan)
 * @returns {Object} - Default country object
 */
export const getDefaultCountry = () => {
  return findCountryByDialCode('+81');
};

/**
 * Search countries by name or code
 * @param {string} query - Search query
 * @returns {Array} - Filtered array of country objects
 */
export const searchCountries = (query) => {
  if (!query) return countries;
  const lowerQuery = query.toLowerCase();
  return countries.filter(country => 
    country.name.toLowerCase().includes(lowerQuery) ||
    country.code.toLowerCase().includes(lowerQuery) ||
    country.dialCode.includes(lowerQuery) ||
    country.abbreviation.toLowerCase().includes(lowerQuery)
  );
};

