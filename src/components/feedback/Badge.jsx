import React from 'react';
import './Badge.css';

/**
 * Badge Component
 * 
 * A badge component for displaying labels, status indicators, or tags. Supports size variants and sentiment colors.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Badge content (text or custom content). Omit for icon-only badges.
 * @param {string} props.size - Size variant: 'lg' (48px), 'md' (40px), 'sm' (32px), 'mini' (24px), 'micro' (20px), 'lgIcon' (48px square), 'mdIcon' (40px square), 'smIcon' (32px square), 'miniIcon' (24px square), 'microIcon' (20px square). Default: 'md'
 * @param {string} props.sentiment - Sentiment variant: 'default', 'success', 'info', 'danger', 'warning', 'neutral', 'purple', 'orange', 'memo'. Default: 'default'
 * @param {React.ReactNode} props.icon - Icon to display before the badge content
 * @param {React.ReactNode} props.iconRight - Icon to display after the badge content
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props...rest - Other HTML attributes
 */
const Badge = ({
  children,
  size = 'md',
  sentiment = 'default',
  icon,
  iconRight,
  className = '',
  ...rest
}) => {
  // Build classes
  const classes = [
    'badge',
    `size-${size}`,
    `sentiment-${sentiment}`,
    className
  ].filter(Boolean).join(' ');
  
  return (
    <span className={classes} {...rest}>
      {icon && (
        <span className="badge-icon">{icon}</span>
      )}
      {children}
      {iconRight && (
        <span className="badge-icon badge-icon-right">{iconRight}</span>
      )}
    </span>
  );
};

// Add displayName for component detection
Badge.displayName = 'Badge';

export default Badge;

