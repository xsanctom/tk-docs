import React, { createContext, useContext, useState } from 'react';
import './Tabs.css';

/**
 * Tabs Context
 */
const TabsContext = createContext({
  activeTab: null,
  setActiveTab: () => {},
  variant: 'default'
});

/**
 * Tabs Component
 * 
 * Container component for organizing content into multiple panels.
 * 
 * @param {Object} props
 * @param {string} props.defaultValue - Default active tab ID
 * @param {string} props.value - Controlled active tab ID
 * @param {Function} props.onChange - Callback when tab changes
 * @param {string} props.variant - Variant: 'default' | 'contained'. Default: 'default'
 * @param {React.ReactNode} props.children - Tab and TabPanel components
 * @param {string} props.className - Additional CSS classes
 */
const Tabs = ({
  defaultValue,
  value,
  onChange,
  variant = 'default',
  children,
  className = '',
  ...rest
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue || null);
  const activeTab = value !== undefined ? value : internalValue;

  const handleTabChange = (tabId) => {
    if (value === undefined) {
      setInternalValue(tabId);
    }
    if (onChange) {
      onChange(tabId);
    }
  };

  const contextValue = {
    activeTab,
    setActiveTab: handleTabChange,
    variant
  };

  const classes = [
    'tabs',
    variant === 'contained' && 'tabs-contained',
    className
  ].filter(Boolean).join(' ');

  return (
    <TabsContext.Provider value={contextValue}>
      <div className={classes} {...rest}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

/**
 * TabsList Component
 * 
 * Container for Tab components.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Tab components
 * @param {string} props.className - Additional CSS classes
 */
const TabsList = ({ children, className = '', ...rest }) => {
  const { variant } = useContext(TabsContext);

  return (
    <div
      role="tablist"
      className={`tabs-list ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};

/**
 * Tab Component
 * 
 * Individual tab button within a Tabs container.
 * 
 * @param {Object} props
 * @param {string} props.value - Unique identifier for this tab
 * @param {string} props.body - Typography: 'body1' | 'body2'. Default: 'body1'
 * @param {boolean} props.disabled - Whether the tab is disabled
 * @param {React.ReactNode} props.children - Tab label content
 * @param {string} props.className - Additional CSS classes
 */
const Tab = ({ value, body = 'body1', disabled = false, children, className = '', ...rest }) => {
  const { activeTab, setActiveTab } = useContext(TabsContext);

  const isActive = activeTab === value;

  const handleClick = () => {
    if (!disabled && !isActive) {
      setActiveTab(value);
    }
  };

  const classes = [
    'tab',
    `body${body === 'body1' ? '1' : '2'}`,
    isActive && 'tab-active',
    disabled && 'tab-disabled',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      aria-disabled={disabled}
      className={classes}
      onClick={handleClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

/**
 * TabPanel Component
 * 
 * Content panel associated with a tab.
 * 
 * @param {Object} props
 * @param {string} props.value - Unique identifier matching a Tab's value
 * @param {React.ReactNode} props.children - Panel content
 * @param {string} props.className - Additional CSS classes
 */
const TabPanel = ({ value, children, className = '', ...rest }) => {
  const { activeTab } = useContext(TabsContext);

  const isActive = activeTab === value;

  const classes = [
    'tab-panel',
    !isActive && 'tab-panel-hidden',
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      role="tabpanel"
      aria-hidden={!isActive}
      className={classes}
      {...rest}
    >
      {isActive ? children : null}
    </div>
  );
};

// Export all components
Tabs.TabsList = TabsList;
Tabs.Tab = Tab;
Tabs.TabPanel = TabPanel;

export default Tabs;

