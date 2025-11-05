import React from 'react';
import Badge from '../feedback/Badge.jsx';
import './Card.css';

/**
 * Card Component
 * 
 * A card component for displaying content with icon, title, optional badge, and description.
 * Supports multiple interaction states: default, hover, focus, disabled, and selected.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.icon - Icon element to display on the left
 * @param {React.ReactNode} props.title - Title text
 * @param {React.ReactNode|string} props.badge - Optional badge/tag element (e.g., Badge component or string for simple badges)
 * @param {React.ReactNode} props.description - Description text (max 4 lines)
 * @param {boolean} props.selected - Whether the card is selected
 * @param {boolean} props.disabled - Whether the card is disabled
 * @param {boolean} props.focused - Whether the card is focused (for controlled focus)
 * @param {Function} props.onClick - Click handler
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.role - ARIA role ('button', 'link', or default)
 * @param {React.ReactNode} props.children - Optional custom content (replaces default structure)
 */
const Card = ({
  icon,
  title,
  badge,
  description,
  selected = false,
  disabled = false,
  focused = false,
  onClick,
  className = '',
  role,
  children,
  ...rest
}) => {
  const classes = [
    'card',
    selected && 'card-selected',
    disabled && 'card-disabled',
    focused && 'card-focused',
    className
  ].filter(Boolean).join(' ');

  const handleClick = (e) => {
    if (!disabled && onClick) {
      onClick(e);
    }
  };

  const handleKeyDown = (e) => {
    if (!disabled && onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick(e);
    }
  };

  const cardProps = {
    className: classes,
    role: role || (onClick ? 'button' : undefined),
    tabIndex: onClick && !disabled ? 0 : undefined,
    onClick: handleClick,
    onKeyDown: handleKeyDown,
    disabled: disabled || undefined,
    ...rest
  };

  // If children are provided, render custom content
  if (children) {
    return (
      <div {...cardProps}>
        {children}
      </div>
    );
  }

  return (
    <div {...cardProps}>
      {icon && (
        <div className="card-icon">
          {icon}
        </div>
      )}
      <div className={`card-content ${!description ? 'card-content-no-description' : ''}`}>
        {(title || badge) && (
          <div className="card-header">
            {title && (
              <h3 className="card-title">{title}</h3>
            )}
            {badge && (
              typeof badge === 'string' ? (
                <Badge size="micro" sentiment="purple">{badge}</Badge>
              ) : (
                badge
              )
            )}
          </div>
        )}
        {description && (
          <p className="card-description">{description}</p>
        )}
      </div>
    </div>
  );
};

export default Card;

