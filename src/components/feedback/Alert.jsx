import React from 'react';
import './Alert.css';
import { SuccessIcon, InfoIcon, DangerIcon, WarningIcon, CloseIcon } from '../../utils/icons.jsx';

/**
 * Alert Component
 * 
 * A persistent banner notification component for displaying success, info, danger, and warning messages.
 * Supports optional title, icon, and dismiss functionality.
 * 
 * @param {Object} props
 * @param {string} props.variant - Alert variant: 'success', 'info', 'danger', 'warning'. Default: 'info'
 * @param {string} props.title - Optional alert title/heading
 * @param {React.ReactNode} props.children - Alert message content
 * @param {React.ReactNode} props.icon - Custom icon (overrides default variant icon)
 * @param {boolean} props.dismissible - Show close button. Default: false
 * @param {Function} props.onDismiss - Callback when dismissed
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props...rest - Other HTML attributes
 */
const Alert = ({
  variant = 'info',
  title,
  children,
  icon,
  dismissible = false,
  onDismiss,
  className = '',
  ...rest
}) => {
  // Get default icon based on variant
  const getDefaultIcon = () => {
    switch (variant) {
      case 'success':
        return <SuccessIcon size={20} />;
      case 'danger':
        return <DangerIcon size={20} />;
      case 'warning':
        return <WarningIcon size={20} />;
      case 'info':
      default:
        return <InfoIcon size={20} />;
    }
  };

  // Build classes
  const classes = [
    'alert',
    `variant-${variant}`,
    className
  ].filter(Boolean).join(' ');

  // Handle dismiss
  const handleDismiss = () => {
    if (onDismiss) {
      onDismiss();
    }
  };

  // Determine if icon should be shown
  // Show icon if: custom icon provided, or icon is undefined (use default)
  // Hide icon if: icon is explicitly null
  const showIcon = icon !== null;
  const iconToShow = icon !== undefined && icon !== null ? icon : getDefaultIcon();

  return (
    <div
      className={classes}
      role="alert"
      aria-live={variant === 'danger' || variant === 'warning' ? 'assertive' : 'polite'}
      {...rest}
    >
      {showIcon && (
        <div className="alert-icon">
          {iconToShow}
        </div>
      )}
      <div className="alert-content">
        {title && (
          <div className="alert-title">{title}</div>
        )}
        {children && (
          <div className="alert-message">{children}</div>
        )}
      </div>
      {dismissible && (
        <button
          className="alert-close"
          onClick={handleDismiss}
          aria-label="Dismiss alert"
          type="button"
        >
          <CloseIcon size={20} />
        </button>
      )}
    </div>
  );
};

export default Alert;

