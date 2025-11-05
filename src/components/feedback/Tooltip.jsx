import React, { useState, useRef, useEffect } from 'react';
import './Tooltip.css';

/**
 * Tooltip Component
 * 
 * A tooltip component that displays contextual information on hover, focus, or click.
 * Supports multiple positioning options.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - The element that triggers the tooltip
 * @param {string} props.content - Tooltip content text
 * @param {string} props.position - Position: 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end'. Default: 'top'
 * @param {string} props.trigger - Trigger: 'hover' | 'click' | 'focus' | 'manual'. Default: 'hover'
 * @param {boolean} props.visible - For manual trigger: whether tooltip is visible. Default: undefined
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props...rest - Other HTML attributes
 */
const Tooltip = ({
  children,
  content,
  position = 'top',
  trigger = 'hover',
  visible: controlledVisible,
  className = '',
  ...rest
}) => {
  const [visible, setVisible] = useState(false);
  const wrapperRef = useRef(null);
  const tooltipRef = useRef(null);
  const tooltipId = useRef(`tooltip-${Math.random().toString(36).substr(2, 9)}`);

  // Use controlled visibility if provided, otherwise use internal state
  const isVisible = controlledVisible !== undefined ? controlledVisible : visible;

  useEffect(() => {
    if (!wrapperRef.current) return;

    const wrapper = wrapperRef.current;
    const element = wrapper.firstElementChild;

    if (!element) return;

    const handleMouseEnter = () => {
      if (trigger === 'hover') {
        setVisible(true);
      }
    };

    const handleMouseLeave = () => {
      if (trigger === 'hover') {
        setVisible(false);
      }
    };

    const handleFocus = () => {
      if (trigger === 'focus' || trigger === 'hover') {
        setVisible(true);
      }
    };

    const handleBlur = () => {
      if (trigger === 'focus' || trigger === 'hover') {
        setVisible(false);
      }
    };

    const handleClick = () => {
      if (trigger === 'click') {
        setVisible(prev => !prev);
      }
    };

    if (trigger === 'hover') {
      wrapper.addEventListener('mouseenter', handleMouseEnter);
      wrapper.addEventListener('mouseleave', handleMouseLeave);
      element.addEventListener('focus', handleFocus);
      element.addEventListener('blur', handleBlur);
    } else if (trigger === 'focus') {
      element.addEventListener('focus', handleFocus);
      element.addEventListener('blur', handleBlur);
    } else if (trigger === 'click') {
      wrapper.addEventListener('click', handleClick);
    }

    return () => {
      wrapper.removeEventListener('mouseenter', handleMouseEnter);
      wrapper.removeEventListener('mouseleave', handleMouseLeave);
      wrapper.removeEventListener('click', handleClick);
      element.removeEventListener('focus', handleFocus);
      element.removeEventListener('blur', handleBlur);
    };
  }, [trigger]);

  // Handle click outside for click trigger
  useEffect(() => {
    if (trigger !== 'click' || !isVisible) return;

    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [trigger, isVisible]);

  if (!content) {
    return children;
  }

  const classes = [
    'tooltip',
    `position-${position}`,
    isVisible && 'visible',
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      ref={wrapperRef}
      className="tooltip-wrapper"
      {...rest}
    >
      {React.cloneElement(React.Children.only(children), {
        'aria-describedby': isVisible ? tooltipId.current : undefined
      })}
      {isVisible && (
        <div
          ref={tooltipRef}
          id={tooltipId.current}
          className={classes}
          role="tooltip"
          aria-live="polite"
        >
          <span className="tooltip-content">{content}</span>
        </div>
      )}
    </div>
  );
};

export default Tooltip;

