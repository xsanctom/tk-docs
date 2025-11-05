import React, { useId, useRef, useState, useCallback } from 'react';
import './ImageUpload.css';
import { CloseIcon } from '../../utils/icons.jsx';

/**
 * ImageUpload Component
 * 
 * A file upload component for images with drag & drop support, preview functionality, and file validation.
 * Supports single file upload.
 * 
 * @param {Object} props
 * @param {File|string} props.value - Current file (File object) or image URL (string) - controlled mode
 * @param {File|string} props.defaultValue - Default file or image URL - uncontrolled mode
 * @param {Function} props.onChange - Change handler: (file: File | null, event: Event) => void
 * @param {Function} props.onError - Error handler: (error: string) => void
 * @param {boolean} props.disabled - Whether the upload is disabled
 * @param {string} props.accept - File types to accept. Default: 'image/*'
 * @param {number} props.maxSize - Maximum file size in bytes. Default: 5MB (5242880)
 * @param {number} props.previewSize - Preview image size in pixels. Default: 200
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.hint - Hint text below placeholder
 * @param {string} props.name - Name attribute for form submission
 * @param {string} props.id - Unique ID (auto-generated if not provided)
 * @param {string} props.className - Additional CSS classes
 * @param {string} props['aria-label'] - Accessible label (required if no visible label)
 * @param {Object} props...rest - Other HTML input attributes
 */
const ImageUpload = ({
  value,
  defaultValue,
  onChange,
  onError,
  disabled = false,
  accept = 'image/*',
  maxSize = 5 * 1024 * 1024, // 5MB default
  previewSize = 200,
  placeholder = 'Click to upload or drag and drop',
  hint = 'PNG, JPG, GIF up to 5MB',
  name,
  id,
  className = '',
  'aria-label': ariaLabel,
  ...rest
}) => {
  // Generate unique ID if not provided
  const uniqueId = useId();
  const inputId = id || `image-upload-${uniqueId}`;
  
  // Refs
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);
  
  // State
  const [dragOver, setDragOver] = useState(false);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);
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
      setError('Failed to read file');
    };
    reader.readAsDataURL(file);
  }, []);
  
  // Handle file selection
  const handleFileSelect = useCallback((file) => {
    setError(null);
    
    const validation = validateFile(file);
    if (!validation.valid) {
      setError(validation.error);
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
  
  // Handle drag events
  const handleDragOver = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!disabled) {
      setDragOver(true);
    }
  }, [disabled]);
  
  const handleDragLeave = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragOver(false);
  }, []);
  
  const handleDrop = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragOver(false);
    
    if (disabled) return;
    
    const file = event.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  }, [disabled, handleFileSelect]);
  
  // Handle remove
  const handleRemove = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    
    if (disabled) return;
    
    // Clear preview
    setPreview(null);
    setError(null);
    
    // Clear input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    // Update state
    if (!isControlled) {
      setInternalFile(null);
    }
    
    // Call onChange with null
    if (onChange) {
      onChange(null, { target: { files: [] } });
    }
  }, [disabled, isControlled, onChange]);
  
  // Handle area click
  const handleAreaClick = useCallback(() => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, [disabled]);
  
  // Initialize preview from defaultValue
  React.useEffect(() => {
    if (defaultValue !== undefined && !isControlled) {
      if (defaultValue instanceof File) {
        createPreview(defaultValue);
        setInternalFile(defaultValue);
      } else if (typeof defaultValue === 'string') {
        setPreview(defaultValue);
      }
    }
  }, [defaultValue, isControlled, createPreview]);
  
  const areaClasses = [
    'image-upload-area',
    dragOver && 'drag-over',
    disabled && 'disabled',
    className
  ].filter(Boolean).join(' ');
  
  return (
    <div className="image-upload-wrapper">
      {!currentPreview ? (
        <div
          className={areaClasses}
          onClick={handleAreaClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-label={ariaLabel || placeholder}
          onKeyDown={(e) => {
            if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault();
              handleAreaClick();
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
            className="image-upload-input"
            aria-label={ariaLabel || placeholder}
            {...rest}
          />
          <div className="image-upload-text">{placeholder}</div>
          {hint && <div className="image-upload-hint">{hint}</div>}
        </div>
      ) : (
        <div className="image-upload-preview" style={{ width: previewSize, height: previewSize }}>
          <img src={currentPreview} alt="Preview" />
          {!disabled && (
            <button
              type="button"
              className="image-upload-remove"
              onClick={handleRemove}
              aria-label="Remove image"
            >
              <CloseIcon size={16} />
            </button>
          )}
        </div>
      )}
      {error && <div className="image-upload-error">{error}</div>}
    </div>
  );
};

export default ImageUpload;

