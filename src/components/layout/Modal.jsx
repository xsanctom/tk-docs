import React, { useEffect, useRef, useCallback } from 'react';
import './Modal.css';
import { CloseIcon } from '../../utils/icons.jsx';

/**
 * Modal Component
 * 
 * A flexible Modal/Dialog component with 4 size variants for different use cases.
 * Includes overlay, header with close button, scrollable body, and optional footer.
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {Function} props.onClose - Callback function called when modal should close
 * @param {string} props.size - Size variant: 'fullscreen' | 'item-editor' | 'medium' | 'small'. Default: 'medium'
 * @param {string} props.title - Title text displayed in header
 * @param {boolean} props.showCloseButton - Whether to show close button in header. Default: true
 * @param {boolean} props.closeOnOverlayClick - Whether clicking overlay closes modal. Default: true
 * @param {boolean} props.closeOnEscape - Whether ESC key closes modal. Default: true
 * @param {React.ReactNode} props.children - Modal content (can use Modal.Header, Modal.Body, Modal.Footer)
 * @param {string} props.className - Additional CSS classes
 */
const Modal = ({
  isOpen,
  onClose,
  size = 'medium',
  title,
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  children,
  className = ''
}) => {
  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const previousActiveElement = useRef(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      // Store current active element
      previousActiveElement.current = document.activeElement;
      
      // Lock body scroll
      document.body.classList.add('modal-open');
      
      // Focus first focusable element in modal
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements && focusableElements.length > 0) {
        focusableElements[0].focus();
      }
      
      return () => {
        document.body.classList.remove('modal-open');
        // Restore focus to previous element
        if (previousActiveElement.current) {
          previousActiveElement.current.focus();
        }
      };
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeOnEscape, onClose]);

  // Handle overlay click
  const handleOverlayClick = useCallback((event) => {
    if (closeOnOverlayClick && event.target === overlayRef.current) {
      onClose();
    }
  }, [closeOnOverlayClick, onClose]);

  // Handle close button click
  const handleCloseClick = useCallback(() => {
    onClose();
  }, [onClose]);

  if (!isOpen) return null;

  const containerClasses = [
    'modal-container',
    `size-${size}`,
    className
  ].filter(Boolean).join(' ');

  // Extract Header, Body, Footer from children
  let headerContent = null;
  let bodyContent = null;
  let footerContent = null;
  const otherChildren = [];

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      if (child.type === Modal.Header) {
        headerContent = child;
      } else if (child.type === Modal.Body) {
        bodyContent = child;
      } else if (child.type === Modal.Footer) {
        footerContent = child;
      } else {
        otherChildren.push(child);
      }
    } else {
      otherChildren.push(child);
    }
  });

  // If no structured children, render all children in body
  if (!headerContent && !bodyContent && !footerContent) {
    bodyContent = <Modal.Body>{children}</Modal.Body>;
  }

  // Determine if we should show header
  const showHeader = headerContent || title || showCloseButton;
  const headerTitleId = title ? `modal-title-${size}` : undefined;

  return (
    <div
      ref={overlayRef}
      className="modal-overlay"
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className={containerClasses}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={headerTitleId}
      >
        {showHeader && (
          <div className="modal-header">
            <div className="modal-header-left">
              {headerContent ? (
                React.cloneElement(headerContent, {
                  id: headerTitleId
                })
              ) : title ? (
                <h2 className="modal-title" id={headerTitleId}>
                  {title}
                </h2>
              ) : null}
            </div>
            {showCloseButton && (
              <button
                type="button"
                className="modal-close-button"
                onClick={handleCloseClick}
                aria-label="Close modal"
              >
                <CloseIcon size={24} />
              </button>
            )}
          </div>
        )}
        
        {bodyContent && (
          <div className="modal-body">
            {bodyContent.props.children}
          </div>
        )}
        
        {footerContent && (
          <div className="modal-footer">
            {footerContent.props.children}
          </div>
        )}
        
        {otherChildren.length > 0 && (
          <div className="modal-body">
            {otherChildren}
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Modal.Header - Header sub-component
 * Use this for custom header content, or just pass title prop to Modal
 */
Modal.Header = ({ children, className = '', ...props }) => {
  return (
    <div className={`modal-header-custom ${className}`} {...props}>
      {children}
    </div>
  );
};

/**
 * Modal.Body - Body sub-component
 */
Modal.Body = ({ children, className = '', ...props }) => {
  return (
    <div className={`modal-body-content ${className}`} {...props}>
      {children}
    </div>
  );
};

/**
 * Modal.Footer - Footer sub-component
 */
Modal.Footer = ({ children, className = '', align = 'right', ...props }) => {
  const footerClasses = [
    'modal-footer-content',
    align === 'left' && 'modal-footer-left',
    align === 'right' && 'modal-footer-right',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={footerClasses} {...props}>
      {children}
    </div>
  );
};

export default Modal;

