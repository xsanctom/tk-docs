import React from 'react';

/**
 * DemoSection Component
 * 
 * Wrapper component for demo sections that handles conditional rendering
 * based on active component filter.
 * 
 * @param {Object} props
 * @param {string} props.componentId - Component ID to check against activeComponent
 * @param {string} props.title - Section title (h2)
 * @param {React.ReactNode} props.children - Section content
 * @param {string} props.className - Additional CSS classes
 * @param {Function} props.shouldShow - Function to determine if section should show (optional)
 */
const DemoSection = ({
  componentId,
  title,
  children,
  className = '',
  shouldShow
}) => {
  // If shouldShow function is provided, use it; otherwise always show
  if (shouldShow && !shouldShow(componentId)) {
    return null;
  }

  return (
    <section className={`demo-section ${className}`.trim()} data-component={componentId}>
      {title && <h2>{title}</h2>}
      {children}
    </section>
  );
};

export default DemoSection;

