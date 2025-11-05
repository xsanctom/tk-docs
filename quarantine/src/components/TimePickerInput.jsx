import React, { useState, useRef, useEffect } from 'react';

const TimePickerInput = ({ value, onChange, placeholder = "09:00", disabled = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value || '');
  const dropdownRef = useRef(null);

  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

  useEffect(() => {
    setInputValue(value || '');
  }, [value]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    // Validate and format time input
    if (newValue.match(/^([0-1]?[0-9]|2[0-3]):?([0-5]?[0-9])?$/)) {
      let formattedTime = newValue;
      if (newValue.length === 1 && parseInt(newValue) > 2) {
        formattedTime = '0' + newValue;
      } else if (newValue.length === 2 && !newValue.includes(':')) {
        formattedTime = newValue + ':';
      } else if (newValue.length === 4 && !newValue.includes(':')) {
        formattedTime = newValue.slice(0, 2) + ':' + newValue.slice(2);
      }
      
      if (formattedTime.match(/^([0-1][0-9]|2[0-3]):([0-5][0-9])$/)) {
        onChange(formattedTime);
      }
    }
  };

  const handleTimeSelect = (hour, minute) => {
    const timeString = `${hour}:${minute}`;
    setInputValue(timeString);
    onChange(timeString);
    setIsOpen(false);
  };

  const handleBlur = () => {
    // Validate final input
    if (inputValue && !inputValue.match(/^([0-1][0-9]|2[0-3]):([0-5][0-9])$/)) {
      setInputValue(value || '');
    }
    setTimeout(() => setIsOpen(false), 150);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="time-picker-container" ref={dropdownRef}>
      <input
        type="text"
        className="edit-input time-picker-input"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={5}
      />
      
      {isOpen && !disabled && (
        <div className="time-picker-dropdown">
          <div className="time-picker-grid">
            <div className="time-picker-column">
              <div className="time-picker-header">Hour</div>
              <div className="time-picker-options">
                {hours.map(hour => (
                  <button
                    key={hour}
                    className={`time-picker-option ${inputValue.startsWith(hour + ':') ? 'selected' : ''}`}
                    onClick={() => {
                      const currentMinute = inputValue.split(':')[1] || '00';
                      handleTimeSelect(hour, currentMinute);
                    }}
                  >
                    {hour}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="time-picker-column">
              <div className="time-picker-header">Minute</div>
              <div className="time-picker-options">
                {minutes.filter((_, i) => i % 5 === 0).map(minute => (
                  <button
                    key={minute}
                    className={`time-picker-option ${inputValue.endsWith(':' + minute) ? 'selected' : ''}`}
                    onClick={() => {
                      const currentHour = inputValue.split(':')[0] || '09';
                      handleTimeSelect(currentHour, minute);
                    }}
                  >
                    {minute}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimePickerInput;
