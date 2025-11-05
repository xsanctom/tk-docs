import React from 'react';

/**
 * DemoLabeledInput Component
 * 
 * Wrapper component for labeled form elements in demos.
 * Provides consistent spacing and styling.
 * 
 * @param {Object} props
 * @param {string} props.label - Label text
 * @param {string} props.labelSize - Label size: 'large' | 'small' | undefined (default). Default: 'large'
 * @param {React.ReactNode} props.children - Form element/component
 * @param {string} props.className - Additional CSS classes
 */
const DemoLabeledInput = ({
  label,
  labelSize = 'large',
  children,
  className = ''
}) => {
  const labelClass = labelSize === 'small' ? 'demo-label' : 'demo-label-large';

  return (
    <div className={`demo-labeled-input ${className}`.trim()}>
      {label && <p className={labelClass}>{label}</p>}
      {children}
    </div>
  );
};

export default DemoLabeledInput;

