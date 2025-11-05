import React, { useId, useRef, useState, useCallback, useEffect } from 'react';
import './AvatarUpload.css';
import { UserIcon, EditIcon, CloseIcon } from '../../utils/icons.jsx';

/**
 * AvatarUpload Component
 * 
 * A specialized image upload component for user avatars with square preview (8px border radius), single file support, and default fallback.
 * Click anywhere on avatar to upload, edit icon overlay on hover. Includes remove button when image is uploaded.
 * 
 * @param {Object} props
 * @param {File|string} props.value - Current file (File object) or image URL (string) - controlled mode
 * @param {File|string} props.defaultValue - Default file or image URL - uncontrolled mode
 * @param {Function} props.onChange - Change handler: (file: File | null, event: Event) => void
 * @param {Function} props.onError - Error handler: (error: string) => void
 * @param {boolean} props.disabled - Whether the upload is disabled
 * @param {string} props.size - Size variant: 'md' (64px), 'lg' (96px). Default: 'md'
 * @param {string} props.accept - File types to accept. Default: 'image/*'
 * @param {number} props.maxSize - Maximum file size in bytes. Default: 5MB (5242880)
 * @param {boolean} props.showEditOverlay - Whether to show edit icon overlay on hover. Default: true
 * @param {string} props.name - Name attribute for form submission
 * @param {string} props.id - Unique ID (auto-generated if not provided)
 * @param {string} props.className - Additional CSS classes
 * @param {string} props['aria-label'] - Accessible label (required if no visible label)
 * @param {Object} props...rest - Other HTML input attributes
 */
const AvatarUpload = ({
  value,
  defaultValue,
  onChange,
  onError,
  disabled = false,
  size = 'md',
  accept = 'image/*',
  maxSize = 5 * 1024 * 1024, // 5MB default
  showEditOverlay = true,
  name,
  id,
  className = '',
  'aria-label': ariaLabel,
  ...rest
}) => {
  // Generate unique ID if not provided
  const uniqueId = useId();
  const inputId = id || `avatar-upload-${uniqueId}`;
  
  // Refs
  const fileInputRef = useRef(null);
  
  // State
  const [preview, setPreview] = useState(null);
  const [internalFile, setInternalFile] = useState(null);
  
  // Determine if controlled or uncontrolled
  const isControlled = value !== undefined;
  const currentFile = isControlled 
    ? (value instanceof File ? value : null)
    : internalFile;
  const currentPreview = isControlled && typeof value === 'string' 
    ? value 
    : preview;
  
  // Validate file
  const validateFile = useCallback((file) => {
    if (!file) return { valid: false, error: 'No file provided' };
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      return { valid: false, error: 'File must be an image' };
    }
    
    // Check file size
    if (file.size > maxSize) {
      const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(1);
      return { valid: false, error: `File size must be less than ${maxSizeMB}MB` };
    }
    
    return { valid: true };
  }, [maxSize]);
  
  // Create preview from file
  const createPreview = useCallback((file) => {
    if (!file) {
      setPreview(null);
      return;
    }
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.onerror = () => {
      if (onError) {
        onError('Failed to read file');
      }
    };
    reader.readAsDataURL(file);
  }, [onError]);
  
  // Handle file selection
  const handleFileSelect = useCallback((file) => {
    const validation = validateFile(file);
    if (!validation.valid) {
      if (onError) {
        onError(validation.error);
      }
      return;
    }
    
    // Create preview
    createPreview(file);
    
    // Update state
    if (!isControlled) {
      setInternalFile(file);
    }
    
    // Call onChange
    if (onChange) {
      onChange(file, { target: { files: [file] } });
    }
  }, [validateFile, createPreview, isControlled, onChange, onError]);
  
  // Handle input change
  const handleInputChange = useCallback((event) => {
    if (disabled) return;
    
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  }, [disabled, handleFileSelect]);
  
  // Handle container click
  const handleClick = useCallback(() => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, [disabled]);
  
  // Handle remove button click
  const handleRemove = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation(); // Prevent triggering file input
    
    // Clear preview
    setPreview(null);
    
    // Clear internal file state
    if (!isControlled) {
      setInternalFile(null);
    }
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    // Call onChange with null
    // Note: In controlled mode, if value is a string (URL), parent should handle clearing it
    if (onChange) {
      onChange(null, { target: { files: [] } });
    }
  }, [isControlled, onChange]);
  
  // Initialize preview from defaultValue
  useEffect(() => {
    if (defaultValue !== undefined && !isControlled) {
      if (defaultValue instanceof File) {
        createPreview(defaultValue);
        setInternalFile(defaultValue);
      } else if (typeof defaultValue === 'string') {
        setPreview(defaultValue);
      }
    }
  }, [defaultValue, isControlled, createPreview]);
  
  const containerClasses = [
    'avatar-upload-container',
    `size-${size}`,
    disabled && 'disabled',
    className
  ].filter(Boolean).join(' ');
  
  const editIconSize = {
    md: 20,
    lg: 28
  }[size] || 20;
  
  const userIconSize = {
    md: 24,
    lg: 32
  }[size] || 24;
  
  const removeButtonSize = {
    md: 24,
    lg: 32
  }[size] || 24;
  
  return (
    <div className="avatar-upload-wrapper">
      <div
        className={containerClasses}
        onClick={handleClick}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label={ariaLabel || 'Upload avatar'}
        onKeyDown={(e) => {
          if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            handleClick();
          }
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          id={inputId}
          name={name}
          accept={accept}
          disabled={disabled}
          onChange={handleInputChange}
          className="avatar-upload-input"
          aria-label={ariaLabel || 'Upload avatar'}
          {...rest}
        />
        
        {currentPreview ? (
          <img 
            src={currentPreview} 
            alt="Avatar" 
            className="avatar-upload-image"
          />
        ) : (
          <div className="avatar-upload-placeholder">
            <UserIcon size={userIconSize} />
          </div>
        )}
        
        {showEditOverlay && !disabled && !currentPreview && (
          <div className="avatar-upload-edit-overlay">
            <EditIcon size={editIconSize} className="avatar-upload-edit-icon" />
          </div>
        )}
        
        {currentPreview && !disabled && (
          <button
            type="button"
            className="avatar-upload-remove-button"
            onClick={handleRemove}
            aria-label="Remove avatar image"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleRemove(e);
              }
            }}
          >
            <CloseIcon size={12} />
          </button>
        )}
      </div>
    </div>
  );
};

export default AvatarUpload;

