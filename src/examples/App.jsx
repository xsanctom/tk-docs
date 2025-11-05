import React, { useState, useEffect } from 'react';
import { Routes, Route, useParams, Link, useLocation } from 'react-router-dom';
import {
  Button,
  IconButton,
  ButtonGroup,
  Checkbox,
  RadioGroup,
  RadioCardGroup,
  Toggle,
  TextInput,
  TextArea,
  NumberInput,
  CurrencyInput,
  PasswordInput,
  PhoneInput,
  InputGroup,
  Badge,
  Chip,
  Tooltip,
  Alert,
  Select,
  MultiSelect,
  ImageUpload,
  AvatarUpload,
  Tabs,
  Card,
  Modal
} from '../lib/components/index.js';
import { CloseIcon, SearchIcon, TableIcon, GridIcon, DiamondIcon } from '../utils/icons.jsx';
import DemoSection from './components/DemoSection.jsx';
import DemoLabeledInput from './components/DemoLabeledInput.jsx';
import './App.css';

function App() {
  const [viewMode, setViewMode] = useState('table');
  const [clickCount, setClickCount] = useState(0);
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(true);
  const [checkbox3, setCheckbox3] = useState(false);
  
  // Get active component from URL
  const location = useLocation();
  const getActiveComponent = () => {
    const path = location?.pathname || '/';
    if (path === '/' || path === '/all') {
      return 'all';
    }
    const match = path.match(/^\/components\/(.+)$/);
    return match ? match[1] : 'all';
  };
  const activeComponent = getActiveComponent();
  const [radioValue, setRadioValue] = useState('option1');
  const [radioCardValue, setRadioCardValue] = useState('daily');
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(true);
  const [toggle3, setToggle3] = useState(false);
  const [textInput1, setTextInput1] = useState('');
  const [textInput2, setTextInput2] = useState('');
  const [textArea1, setTextArea1] = useState('');
  const [textArea2, setTextArea2] = useState('');
  const [textAreaAutoExpand, setTextAreaAutoExpand] = useState('');
  const [textAreaAutoExpandLimited, setTextAreaAutoExpandLimited] = useState('');
  const [numberInput1, setNumberInput1] = useState(null);
  const [numberInput2, setNumberInput2] = useState(null);
  const [numberInput3, setNumberInput3] = useState(null);
  const [passwordInput1, setPasswordInput1] = useState('');
  const [passwordInput2, setPasswordInput2] = useState('');
  const [phoneInput1, setPhoneInput1] = useState('');
  const [phoneInput2, setPhoneInput2] = useState('');
  const [phoneCountryCode, setPhoneCountryCode] = useState('+81');
  const [imageUpload1, setImageUpload1] = useState(null);
  const [imageUpload2, setImageUpload2] = useState(null);
  const [avatarUpload1, setAvatarUpload1] = useState(null);
  const [avatarUpload2, setAvatarUpload2] = useState(null);
  const [modalFullscreen, setModalFullscreen] = useState(false);
  const [modalItemEditor, setModalItemEditor] = useState(false);
  const [modalMedium, setModalMedium] = useState(false);
  const [modalSmall, setModalSmall] = useState(false);
  const [select1, setSelect1] = useState(null);
  const [select2, setSelect2] = useState(null);
  const [select3, setSelect3] = useState(null);
  const [selectSearchable, setSelectSearchable] = useState(null);
  const [multiSelect1, setMultiSelect1] = useState([]);
  const [multiSelect2, setMultiSelect2] = useState([]);
  const [multiSelectSearchable, setMultiSelectSearchable] = useState([]);
  const [alwaysUseAllOptions, setAlwaysUseAllOptions] = useState([
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4' }
  ]);
  const [alwaysUseAllSelected, setAlwaysUseAllSelected] = useState([]);
  const [alwaysUseAllToggle, setAlwaysUseAllToggle] = useState(false);
  const [chipSelected, setChipSelected] = useState(null);
  const [tabsValue, setTabsValue] = useState('tab1');

  // Effect to handle "Always use all" toggle: reset and disable MultiSelect when toggle is on
  useEffect(() => {
    if (alwaysUseAllToggle) {
      // Reset selection when toggle is turned on
      setAlwaysUseAllSelected([]);
    }
  }, [alwaysUseAllToggle]);

  const components = [
    { id: 'all', label: 'All' },
    { id: 'button', label: 'Button' },
    { id: 'iconbutton', label: 'IconButton' },
    { id: 'buttongroup', label: 'ButtonGroup' },
    { id: 'checkbox', label: 'Checkbox' },
    { id: 'radio', label: 'Radio' },
    { id: 'radiocard', label: 'RadioCard' },
    { id: 'toggle', label: 'Toggle' },
    { id: 'input', label: 'Input' },
    { id: 'textarea', label: 'TextArea' },
    { id: 'inputgroup', label: 'InputGroup' },
    { id: 'imageupload', label: 'ImageUpload' },
    { id: 'avatarupload', label: 'AvatarUpload' },
    { id: 'select', label: 'Select' },
    { id: 'multiselect', label: 'MultiSelect' },
    { id: 'badge', label: 'Badge' },
    { id: 'chip', label: 'Chip' },
    { id: 'tooltip', label: 'Tooltip' },
    { id: 'alert', label: 'Alert' },
    { id: 'tabs', label: 'Tabs' },
    { id: 'card', label: 'Card' },
    { id: 'modal', label: 'Modal' },
  ];

  const shouldShowSection = (componentId) => {
    return activeComponent === 'all' || activeComponent === componentId;
  };

  return (
    <div className="demo-app">
      {/* Left Sidebar Navigation */}
      <nav className="demo-nav">
        <div className="demo-nav-header">
          <h2>Components</h2>
        </div>
        <ul className="demo-nav-list">
          {components.map((component) => {
            const href = component.id === 'all' ? '/' : `/components/${component.id}`;
            const isActive = activeComponent === component.id;
            return (
              <li key={component.id}>
                <Link
                  to={href}
                  className={`demo-nav-item ${isActive ? 'active' : ''}`}
                >
                  {component.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="demo-main">
        <header className="demo-header">
          <h1>Component Library Demo</h1>
          <p>Testing Component Library</p>
        </header>

        <Routes>
          <Route path="/" element={
            <MainContent
              shouldShowSection={shouldShowSection}
              viewMode={viewMode}
              setViewMode={setViewMode}
              clickCount={clickCount}
              setClickCount={setClickCount}
              checkbox1={checkbox1}
              setCheckbox1={setCheckbox1}
              checkbox2={checkbox2}
              setCheckbox2={setCheckbox2}
              checkbox3={checkbox3}
              setCheckbox3={setCheckbox3}
              radioValue={radioValue}
              setRadioValue={setRadioValue}
              radioCardValue={radioCardValue}
              setRadioCardValue={setRadioCardValue}
              toggle1={toggle1}
              setToggle1={setToggle1}
              toggle2={toggle2}
              setToggle2={setToggle2}
              toggle3={toggle3}
              setToggle3={setToggle3}
              textInput1={textInput1}
              setTextInput1={setTextInput1}
              textInput2={textInput2}
              setTextInput2={setTextInput2}
              textArea1={textArea1}
              setTextArea1={setTextArea1}
              textArea2={textArea2}
              setTextArea2={setTextArea2}
              textAreaAutoExpand={textAreaAutoExpand}
              setTextAreaAutoExpand={setTextAreaAutoExpand}
              textAreaAutoExpandLimited={textAreaAutoExpandLimited}
              setTextAreaAutoExpandLimited={setTextAreaAutoExpandLimited}
              numberInput1={numberInput1}
              setNumberInput1={setNumberInput1}
              numberInput2={numberInput2}
              setNumberInput2={setNumberInput2}
              numberInput3={numberInput3}
              setNumberInput3={setNumberInput3}
              passwordInput1={passwordInput1}
              setPasswordInput1={setPasswordInput1}
              passwordInput2={passwordInput2}
              setPasswordInput2={setPasswordInput2}
              phoneInput1={phoneInput1}
              setPhoneInput1={setPhoneInput1}
              phoneInput2={phoneInput2}
              setPhoneInput2={setPhoneInput2}
              phoneCountryCode={phoneCountryCode}
              setPhoneCountryCode={setPhoneCountryCode}
              imageUpload1={imageUpload1}
              setImageUpload1={setImageUpload1}
              imageUpload2={imageUpload2}
              setImageUpload2={setImageUpload2}
              avatarUpload1={avatarUpload1}
              setAvatarUpload1={setAvatarUpload1}
              avatarUpload2={avatarUpload2}
              setAvatarUpload2={setAvatarUpload2}
              modalFullscreen={modalFullscreen}
              setModalFullscreen={setModalFullscreen}
              modalItemEditor={modalItemEditor}
              setModalItemEditor={setModalItemEditor}
              modalMedium={modalMedium}
              setModalMedium={setModalMedium}
              modalSmall={modalSmall}
              setModalSmall={setModalSmall}
              select1={select1}
              setSelect1={setSelect1}
              select2={select2}
              setSelect2={setSelect2}
              select3={select3}
              setSelect3={setSelect3}
              selectSearchable={selectSearchable}
              setSelectSearchable={setSelectSearchable}
              multiSelect1={multiSelect1}
              setMultiSelect1={setMultiSelect1}
              multiSelect2={multiSelect2}
              setMultiSelect2={setMultiSelect2}
              multiSelectSearchable={multiSelectSearchable}
              setMultiSelectSearchable={setMultiSelectSearchable}
              alwaysUseAllOptions={alwaysUseAllOptions}
              setAlwaysUseAllOptions={setAlwaysUseAllOptions}
              alwaysUseAllSelected={alwaysUseAllSelected}
              setAlwaysUseAllSelected={setAlwaysUseAllSelected}
              alwaysUseAllToggle={alwaysUseAllToggle}
              setAlwaysUseAllToggle={setAlwaysUseAllToggle}
              chipSelected={chipSelected}
              setChipSelected={setChipSelected}
              tabsValue={tabsValue}
              setTabsValue={setTabsValue}
            />
          } />
          <Route path="/components/:componentId" element={
            <MainContent 
              shouldShowSection={shouldShowSection}
              viewMode={viewMode}
              setViewMode={setViewMode}
              clickCount={clickCount}
              setClickCount={setClickCount}
              checkbox1={checkbox1}
              setCheckbox1={setCheckbox1}
              checkbox2={checkbox2}
              setCheckbox2={setCheckbox2}
              checkbox3={checkbox3}
              setCheckbox3={setCheckbox3}
              radioValue={radioValue}
              setRadioValue={setRadioValue}
              radioCardValue={radioCardValue}
              setRadioCardValue={setRadioCardValue}
              toggle1={toggle1}
              setToggle1={setToggle1}
              toggle2={toggle2}
              setToggle2={setToggle2}
              toggle3={toggle3}
              setToggle3={setToggle3}
              textInput1={textInput1}
              setTextInput1={setTextInput1}
              textInput2={textInput2}
              setTextInput2={setTextInput2}
              textArea1={textArea1}
              setTextArea1={setTextArea1}
              textArea2={textArea2}
              setTextArea2={setTextArea2}
              textAreaAutoExpand={textAreaAutoExpand}
              setTextAreaAutoExpand={setTextAreaAutoExpand}
              textAreaAutoExpandLimited={textAreaAutoExpandLimited}
              setTextAreaAutoExpandLimited={setTextAreaAutoExpandLimited}
              numberInput1={numberInput1}
              setNumberInput1={setNumberInput1}
              numberInput2={numberInput2}
              setNumberInput2={setNumberInput2}
              numberInput3={numberInput3}
              setNumberInput3={setNumberInput3}
              passwordInput1={passwordInput1}
              setPasswordInput1={setPasswordInput1}
              passwordInput2={passwordInput2}
              setPasswordInput2={setPasswordInput2}
              phoneInput1={phoneInput1}
              setPhoneInput1={setPhoneInput1}
              phoneInput2={phoneInput2}
              setPhoneInput2={setPhoneInput2}
              phoneCountryCode={phoneCountryCode}
              setPhoneCountryCode={setPhoneCountryCode}
              imageUpload1={imageUpload1}
              setImageUpload1={setImageUpload1}
              imageUpload2={imageUpload2}
              setImageUpload2={setImageUpload2}
              avatarUpload1={avatarUpload1}
              setAvatarUpload1={setAvatarUpload1}
              avatarUpload2={avatarUpload2}
              setAvatarUpload2={setAvatarUpload2}
              modalFullscreen={modalFullscreen}
              setModalFullscreen={setModalFullscreen}
              modalItemEditor={modalItemEditor}
              setModalItemEditor={setModalItemEditor}
              modalMedium={modalMedium}
              setModalMedium={setModalMedium}
              modalSmall={modalSmall}
              setModalSmall={setModalSmall}
              select1={select1}
              setSelect1={setSelect1}
              select2={select2}
              setSelect2={setSelect2}
              select3={select3}
              setSelect3={setSelect3}
              selectSearchable={selectSearchable}
              setSelectSearchable={setSelectSearchable}
              multiSelect1={multiSelect1}
              setMultiSelect1={setMultiSelect1}
              multiSelect2={multiSelect2}
              setMultiSelect2={setMultiSelect2}
              multiSelectSearchable={multiSelectSearchable}
              setMultiSelectSearchable={setMultiSelectSearchable}
              alwaysUseAllOptions={alwaysUseAllOptions}
              setAlwaysUseAllOptions={setAlwaysUseAllOptions}
              alwaysUseAllSelected={alwaysUseAllSelected}
              setAlwaysUseAllSelected={setAlwaysUseAllSelected}
              alwaysUseAllToggle={alwaysUseAllToggle}
              setAlwaysUseAllToggle={setAlwaysUseAllToggle}
              chipSelected={chipSelected}
              setChipSelected={setChipSelected}
              tabsValue={tabsValue}
              setTabsValue={setTabsValue}
            />
          } />
          <Route path="*" element={
            <main className="demo-content">
              <p>Component not found. <Link to="/">Go back to all components</Link></p>
            </main>
          } />
        </Routes>
      </div>
    </div>
  );
}

// Extract main content into separate component for routing
// This component receives all state and handlers as props from App to maintain state across route changes
function MainContent({
  shouldShowSection,
  viewMode, setViewMode,
  clickCount, setClickCount,
  checkbox1, setCheckbox1,
  checkbox2, setCheckbox2,
  checkbox3, setCheckbox3,
  radioValue, setRadioValue,
  radioCardValue, setRadioCardValue,
  toggle1, setToggle1,
  toggle2, setToggle2,
  toggle3, setToggle3,
  textInput1, setTextInput1,
  textInput2, setTextInput2,
  textArea1, setTextArea1,
  textArea2, setTextArea2,
  textAreaAutoExpand, setTextAreaAutoExpand,
  textAreaAutoExpandLimited, setTextAreaAutoExpandLimited,
  numberInput1, setNumberInput1,
  numberInput2, setNumberInput2,
  numberInput3, setNumberInput3,
  passwordInput1, setPasswordInput1,
  passwordInput2, setPasswordInput2,
  phoneInput1, setPhoneInput1,
  phoneInput2, setPhoneInput2,
  phoneCountryCode, setPhoneCountryCode,
  imageUpload1, setImageUpload1,
  imageUpload2, setImageUpload2,
  avatarUpload1, setAvatarUpload1,
  avatarUpload2, setAvatarUpload2,
  modalFullscreen, setModalFullscreen,
  modalItemEditor, setModalItemEditor,
  modalMedium, setModalMedium,
  modalSmall, setModalSmall,
  select1, setSelect1,
  select2, setSelect2,
  select3, setSelect3,
  selectSearchable, setSelectSearchable,
  multiSelect1, setMultiSelect1,
  multiSelect2, setMultiSelect2,
  multiSelectSearchable, setMultiSelectSearchable,
  alwaysUseAllOptions, setAlwaysUseAllOptions,
  alwaysUseAllSelected, setAlwaysUseAllSelected,
  alwaysUseAllToggle, setAlwaysUseAllToggle,
  chipSelected, setChipSelected,
  tabsValue, setTabsValue
}) {
  // Effect to handle "Always use all" toggle: reset and disable MultiSelect when toggle is on
  useEffect(() => {
    if (alwaysUseAllToggle) {
      // Reset selection when toggle is turned on
      setAlwaysUseAllSelected([]);
    }
  }, [alwaysUseAllToggle, setAlwaysUseAllSelected]);

  return (
    <main className="demo-content">
      {/* Button Variants */}
        <DemoSection componentId="button" title="Button Variants" shouldShow={shouldShowSection}>
          <div className="demo-row demo-row-wrap">
            <DemoLabeledInput label="Primary">
              <Button variant="primary">Primary</Button>
            </DemoLabeledInput>
            <DemoLabeledInput label="Secondary Brand">
              <Button variant="secondary-brand">Secondary Brand</Button>
            </DemoLabeledInput>
            <DemoLabeledInput label="Secondary">
              <Button variant="secondary">Secondary</Button>
            </DemoLabeledInput>
            <DemoLabeledInput label="Tertiary">
              <Button variant="tertiary">Tertiary</Button>
            </DemoLabeledInput>
            <DemoLabeledInput label="Ghost">
              <Button variant="ghost">Ghost</Button>
            </DemoLabeledInput>
            <DemoLabeledInput label="Bare">
              <Button variant="bare">Bare</Button>
            </DemoLabeledInput>
            <DemoLabeledInput label="Bare Primary">
              <Button variant="bare-primary">Bare Primary</Button>
            </DemoLabeledInput>
            <DemoLabeledInput label="Danger">
              <Button variant="danger">Danger</Button>
            </DemoLabeledInput>
            <DemoLabeledInput label="Danger Secondary">
              <Button variant="danger-secondary">Danger Secondary</Button>
            </DemoLabeledInput>
          </div>
        </DemoSection>

        {/* Button Sizes */}
        <DemoSection componentId="button" title="Button Sizes" shouldShow={shouldShowSection}>
          <div className="demo-row demo-row-wrap">
            <DemoLabeledInput label="Mini (32px)">
              <Button size="mini">Mini</Button>
            </DemoLabeledInput>
            <DemoLabeledInput label="Small (36px)">
              <Button size="sm">Small</Button>
            </DemoLabeledInput>
            <DemoLabeledInput label="Medium (40px) - Default">
              <Button size="md">Medium</Button>
            </DemoLabeledInput>
            <DemoLabeledInput label="Large (48px)">
              <Button size="lg">Large</Button>
            </DemoLabeledInput>
          </div>
        </DemoSection>

        {/* Buttons with Icons */}
        <DemoSection componentId="button" title="Buttons with Icons" shouldShow={shouldShowSection}>
          <div className="demo-row demo-row-wrap">
            <DemoLabeledInput label="Icon Left">
              <Button variant="primary" iconLeft={<SearchIcon />}>
                Search
              </Button>
            </DemoLabeledInput>
            <DemoLabeledInput label="Icon Right">
              <Button variant="secondary" iconRight={<CloseIcon />}>
                Close
              </Button>
            </DemoLabeledInput>
            <DemoLabeledInput label="Both Icons">
              <Button variant="tertiary" iconLeft={<SearchIcon />} iconRight={<CloseIcon />}>
                Both Icons
              </Button>
            </DemoLabeledInput>
          </div>
        </DemoSection>

        {/* Button States */}
        <DemoSection componentId="button" title="Button States - All Variants" shouldShow={shouldShowSection}>
          <div className="demo-row demo-row-wrap">
            <DemoLabeledInput label="Primary - Normal">
              <Button variant="primary">Primary</Button>
            </DemoLabeledInput>
            <DemoLabeledInput label="Primary - Disabled">
              <Button variant="primary" disabled>Primary</Button>
            </DemoLabeledInput>
            <DemoLabeledInput label="Secondary Brand - Normal">
              <Button variant="secondary-brand">Secondary Brand</Button>
            </DemoLabeledInput>
            <DemoLabeledInput label="Secondary Brand - Disabled">
              <Button variant="secondary-brand" disabled>Secondary Brand</Button>
            </DemoLabeledInput>
            <DemoLabeledInput label="Secondary - Normal">
              <Button variant="secondary">Secondary</Button>
            </DemoLabeledInput>
            <DemoLabeledInput label="Secondary - Disabled">
              <Button variant="secondary" disabled>Secondary</Button>
            </DemoLabeledInput>
            <DemoLabeledInput label="Tertiary - Normal">
              <Button variant="tertiary">Tertiary</Button>
            </DemoLabeledInput>
            <DemoLabeledInput label="Tertiary - Disabled">
              <Button variant="tertiary" disabled>Tertiary</Button>
            </DemoLabeledInput>
            <DemoLabeledInput label="Ghost - Normal">
              <Button variant="ghost">Ghost</Button>
            </DemoLabeledInput>
            <DemoLabeledInput label="Ghost - Disabled">
              <Button variant="ghost" disabled>Ghost</Button>
            </DemoLabeledInput>
            <DemoLabeledInput label="Bare - Normal">
              <Button variant="bare">Bare</Button>
            </DemoLabeledInput>
            <DemoLabeledInput label="Bare - Disabled">
              <Button variant="bare" disabled>Bare</Button>
            </DemoLabeledInput>
            <DemoLabeledInput label="Bare Primary - Normal">
              <Button variant="bare-primary">Bare Primary</Button>
            </DemoLabeledInput>
            <DemoLabeledInput label="Bare Primary - Disabled">
              <Button variant="bare-primary" disabled>Bare Primary</Button>
            </DemoLabeledInput>
            <DemoLabeledInput label="Danger - Normal">
              <Button variant="danger">Danger</Button>
            </DemoLabeledInput>
            <DemoLabeledInput label="Danger - Disabled">
              <Button variant="danger" disabled>Danger</Button>
            </DemoLabeledInput>
            <DemoLabeledInput label="Danger Secondary - Normal">
              <Button variant="danger-secondary">Danger Secondary</Button>
            </DemoLabeledInput>
            <DemoLabeledInput label="Danger Secondary - Disabled">
              <Button variant="danger-secondary" disabled>Danger Secondary</Button>
            </DemoLabeledInput>
          </div>
        </DemoSection>

        {/* Long Text Truncation Test */}
        <DemoSection componentId="button" title="Text Truncation Test" shouldShow={shouldShowSection}>
          <div className="demo-row demo-row-wrap">
            <DemoLabeledInput label="Long Text">
              <Button variant="primary">
                This is a very long button text that should truncate with ellipsis when it gets too long
              </Button>
            </DemoLabeledInput>
            <DemoLabeledInput label="Long Text with Icon">
              <Button variant="secondary" iconLeft={<SearchIcon />}>
                Button with icon and very long text that should truncate properly
              </Button>
            </DemoLabeledInput>
          </div>
        </DemoSection>

        {/* IconButton - Variants */}
        <DemoSection componentId="iconbutton" title="IconButton - Variants" shouldShow={shouldShowSection}>
          <div className="demo-row demo-row-wrap">
            <DemoLabeledInput label="Primary">
              <IconButton icon={<CloseIcon />} aria-label="Close" variant="primary" />
            </DemoLabeledInput>
            <DemoLabeledInput label="Secondary Brand">
              <IconButton icon={<SearchIcon />} aria-label="Search" variant="secondary-brand" />
            </DemoLabeledInput>
            <DemoLabeledInput label="Secondary">
              <IconButton icon={<CloseIcon />} aria-label="Close" variant="secondary" />
            </DemoLabeledInput>
            <DemoLabeledInput label="Tertiary">
              <IconButton icon={<SearchIcon />} aria-label="Search" variant="tertiary" />
            </DemoLabeledInput>
            <DemoLabeledInput label="Ghost">
              <IconButton icon={<CloseIcon />} aria-label="Close" variant="ghost" />
            </DemoLabeledInput>
            <DemoLabeledInput label="Bare (Default)">
              <IconButton icon={<SearchIcon />} aria-label="Search" variant="bare" />
            </DemoLabeledInput>
            <DemoLabeledInput label="Bare Primary">
              <IconButton icon={<CloseIcon />} aria-label="Close" variant="bare-primary" />
            </DemoLabeledInput>
            <DemoLabeledInput label="Danger">
              <IconButton icon={<SearchIcon />} aria-label="Search" variant="danger" />
            </DemoLabeledInput>
            <DemoLabeledInput label="Danger Secondary">
              <IconButton icon={<CloseIcon />} aria-label="Close" variant="danger-secondary" />
            </DemoLabeledInput>
          </div>
        </DemoSection>

        {/* IconButton - Sizes */}
        <DemoSection componentId="iconbutton" title="IconButton - Sizes" shouldShow={shouldShowSection}>
          <div className="demo-row demo-row-wrap">
            <DemoLabeledInput label="Mini (32px)">
              <IconButton icon={<CloseIcon />} aria-label="Close" size="mini" />
            </DemoLabeledInput>
            <DemoLabeledInput label="Small (36px)">
              <IconButton icon={<SearchIcon />} aria-label="Search" size="sm" />
            </DemoLabeledInput>
            <DemoLabeledInput label="Medium (40px) - Default">
              <IconButton icon={<CloseIcon />} aria-label="Close" size="md" />
            </DemoLabeledInput>
            <DemoLabeledInput label="Large (48px)">
              <IconButton icon={<SearchIcon />} aria-label="Search" size="lg" />
            </DemoLabeledInput>
          </div>
        </DemoSection>

        {/* IconButton - States */}
        <DemoSection componentId="iconbutton" title="IconButton - States" shouldShow={shouldShowSection}>
          <div className="demo-row demo-row-wrap">
            <DemoLabeledInput label="Normal">
              <IconButton icon={<CloseIcon />} aria-label="Close" />
            </DemoLabeledInput>
            <DemoLabeledInput label="Disabled">
              <IconButton icon={<SearchIcon />} aria-label="Search" disabled />
            </DemoLabeledInput>
          </div>
        </DemoSection>

        {/* ButtonGroup - Segmented */}
        <DemoSection componentId="buttongroup" title="ButtonGroup - Segmented (Hugs Content)" shouldShow={shouldShowSection}>
          <div className="demo-row demo-row-wrap">
            <ButtonGroup
              options={[
                { value: 'table', icon: <TableIcon /> },
                { value: 'cards', icon: <GridIcon /> }
              ]}
              value={viewMode}
              onChange={setViewMode}
              variant="segmented"
            />
          </div>
          <p>Selected: {viewMode}</p>
        </DemoSection>

        {/* ButtonGroup with Text Labels */}
        <DemoSection componentId="buttongroup" title="ButtonGroup - Segmented with Text" shouldShow={shouldShowSection}>
          <div className="demo-row demo-row-wrap">
            <ButtonGroup
              variant="segmented"
              options={[
                { value: 'all', label: 'All Items' },
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive Items' }
              ]}
              value={viewMode}
              onChange={setViewMode}
            />
          </div>
        </DemoSection>

        {/* ButtonGroup Full Width */}
        <DemoSection componentId="buttongroup" title="ButtonGroup - Full Width (Stretches)" shouldShow={shouldShowSection}>
          <div className="demo-row demo-row-width-400">
            <ButtonGroup
              variant="full-width"
              options={[
                { value: 'all', label: 'All' },
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' }
              ]}
              value={viewMode}
              onChange={setViewMode}
            />
          </div>
        </DemoSection>

        {/* ButtonGroup Edge Cases */}
        <DemoSection componentId="buttongroup" title="ButtonGroup - Edge Cases" shouldShow={shouldShowSection}>
          <div className="demo-row demo-row-column">
            <DemoLabeledInput label={<h3 className="demo-subheading">Single Button</h3>}>
              <ButtonGroup
                options={[
                  { value: 'only', label: 'Only Option' }
                ]}
                value="only"
                onChange={() => {}}
              />
            </DemoLabeledInput>
            <DemoLabeledInput label={<h3 className="demo-subheading">Many Buttons</h3>}>
              <ButtonGroup
                options={[
                  { value: '1', label: 'One' },
                  { value: '2', label: 'Two' },
                  { value: '3', label: 'Three' },
                  { value: '4', label: 'Four' },
                  { value: '5', label: 'Five' }
                ]}
                value="3"
                onChange={() => {}}
              />
            </DemoLabeledInput>
            <DemoLabeledInput label={<h3 className="demo-subheading">Very Long Text</h3>}>
              <ButtonGroup
                options={[
                  { value: 'long1', label: 'This is a very long button label that should expand' },
                  { value: 'long2', label: 'Another long label' }
                ]}
                value="long1"
                onChange={() => {}}
              />
            </DemoLabeledInput>
            <DemoLabeledInput label={<h3 className="demo-subheading">With Disabled</h3>}>
              <ButtonGroup
                options={[
                  { value: 'enabled1', label: 'Enabled' },
                  { value: 'disabled', label: 'Disabled', disabled: true },
                  { value: 'enabled2', label: 'Also Enabled' }
                ]}
                value="enabled1"
                onChange={() => {}}
              />
            </DemoLabeledInput>
            <DemoLabeledInput label={<h3 className="demo-subheading">All Disabled</h3>}>
              <ButtonGroup
                options={[
                  { value: 'disabled1', label: 'Disabled 1', disabled: true },
                  { value: 'disabled2', label: 'Disabled 2', disabled: true },
                  { value: 'disabled3', label: 'Disabled 3', disabled: true }
                ]}
                value="disabled1"
                onChange={() => {}}
              />
            </DemoLabeledInput>
            <DemoLabeledInput label={<h3 className="demo-subheading">Selected & Disabled</h3>}>
              <ButtonGroup
                options={[
                  { value: 'selected-disabled', label: 'Selected Disabled', disabled: true },
                  { value: 'enabled', label: 'Enabled' }
                ]}
                value="selected-disabled"
                onChange={() => {}}
              />
            </DemoLabeledInput>
          </div>
        </DemoSection>

        {/* Checkbox */}
        <DemoSection componentId="checkbox" title="Checkbox" shouldShow={shouldShowSection}>
          <div className="demo-row demo-row-column">
            <Checkbox 
              label="Unchecked checkbox"
              checked={checkbox1}
              onChange={(checked) => setCheckbox1(checked)}
            />
            <Checkbox 
              label="Checked checkbox"
              checked={checkbox2}
              onChange={(checked) => setCheckbox2(checked)}
            />
            <Checkbox 
              label="Disabled unchecked"
              disabled
            />
            <Checkbox 
              label="Disabled checked"
              checked={true}
              disabled
            />
            <Checkbox 
              label="Uncontrolled checkbox (defaultChecked)"
              defaultChecked={checkbox3}
              onChange={(checked) => setCheckbox3(checked)}
            />
            <Checkbox 
              label="Checkbox with very long label text that should wrap properly and not cause layout issues"
              checked={checkbox1}
              onChange={(checked) => setCheckbox1(checked)}
            />
            <Checkbox 
              aria-label="Checkbox without visible label"
              checked={checkbox1}
              onChange={(checked) => setCheckbox1(checked)}
            />
            <Checkbox onChange={(checked) => console.log(checked)}>
              <span>Custom <strong>label</strong> content with <em>formatting</em></span>
            </Checkbox>
          </div>
        </DemoSection>

        {/* RadioGroup */}
        <DemoSection componentId="radio" title="RadioGroup - Vertical" shouldShow={shouldShowSection}>
          <div className="demo-row demo-row-column">
            <DemoLabeledInput label={`Selected: ${radioValue}`}>
              <RadioGroup
                value={radioValue}
                onChange={(value) => setRadioValue(value)}
                options={[
                  { value: 'option1', label: 'Option 1' },
                  { value: 'option2', label: 'Option 2' },
                  { value: 'option3', label: 'Option 3' }
                ]}
              />
            </DemoLabeledInput>
            <DemoLabeledInput label={<h3 className="demo-subheading">With Disabled Option</h3>}>
              <RadioGroup
                value={radioValue}
                onChange={(value) => setRadioValue(value)}
                options={[
                  { value: 'option1', label: 'Option 1' },
                  { value: 'option2', label: 'Option 2 (Disabled)', disabled: true },
                  { value: 'option3', label: 'Option 3' }
                ]}
              />
            </DemoLabeledInput>
            <DemoLabeledInput label={<h3 className="demo-subheading">All Disabled</h3>}>
              <RadioGroup
                value="option1"
                onChange={() => {}}
                disabled
                options={[
                  { value: 'option1', label: 'Option 1' },
                  { value: 'option2', label: 'Option 2' },
                  { value: 'option3', label: 'Option 3' }
                ]}
              />
            </DemoLabeledInput>
          </div>
        </DemoSection>

        <DemoSection componentId="radio" title="RadioGroup - Horizontal" shouldShow={shouldShowSection}>
          <div className="demo-row demo-row-column">
            <RadioGroup
              value={radioValue}
              onChange={(value) => setRadioValue(value)}
              orientation="horizontal"
              options={[
                { value: 'option1', label: 'Option 1' },
                { value: 'option2', label: 'Option 2' },
                { value: 'option3', label: 'Option 3' }
              ]}
            />
            <RadioGroup
              value={radioValue}
              onChange={(value) => setRadioValue(value)}
              orientation="horizontal"
              options={[
                { value: 'left', label: 'Left' },
                { value: 'center', label: 'Center' },
                { value: 'right', label: 'Right' }
              ]}
            />
          </div>
        </DemoSection>

        {/* RadioCardGroup */}
        <DemoSection componentId="radiocard" title="RadioCardGroup - Horizontal" shouldShow={shouldShowSection}>
          <div className="demo-row demo-row-column">
            <div className="demo-card-item">
              <DemoLabeledInput label={`Selected: ${radioCardValue}`}>
                <RadioCardGroup
                  value={radioCardValue}
                  onChange={(value) => setRadioCardValue(value)}
                  options={[
                    { value: 'daily', label: 'Update Daily', description: 'New days become available each day.' },
                    { value: 'monthly', label: 'Update Monthly', description: 'Full months unlock on the 1st of each month.' }
                  ]}
                />
              </DemoLabeledInput>
            </div>
            <div className="demo-card-item">
              <DemoLabeledInput label={<h3 className="demo-subheading">Three Options</h3>}>
                <RadioCardGroup
                  value={radioCardValue}
                  onChange={(value) => setRadioCardValue(value)}
                  options={[
                    { value: 'option1', label: 'Option 1', description: 'First option description' },
                    { value: 'option2', label: 'Option 2', description: 'Second option description' },
                    { value: 'option3', label: 'Option 3', description: 'Third option description' }
                  ]}
                />
              </DemoLabeledInput>
            </div>
            <div className="demo-card-item">
              <DemoLabeledInput label={<h3 className="demo-subheading">Without Descriptions</h3>}>
                <RadioCardGroup
                  value={radioCardValue}
                  onChange={(value) => setRadioCardValue(value)}
                  options={[
                    { value: 'left', label: 'Left' },
                    { value: 'center', label: 'Center' },
                    { value: 'right', label: 'Right' }
                  ]}
                />
              </DemoLabeledInput>
            </div>
            <div className="demo-card-item">
              <DemoLabeledInput label={<h3 className="demo-subheading">With Disabled Option</h3>}>
                <RadioCardGroup
                  value={radioCardValue}
                  onChange={(value) => setRadioCardValue(value)}
                  options={[
                    { value: 'option1', label: 'Option 1', description: 'Available option' },
                    { value: 'option2', label: 'Option 2', description: 'Disabled option', disabled: true },
                    { value: 'option3', label: 'Option 3', description: 'Another available option' }
                  ]}
                />
              </DemoLabeledInput>
            </div>
          </div>
        </DemoSection>

        <DemoSection componentId="radiocard" title="RadioCardGroup - Vertical" shouldShow={shouldShowSection}>
          <div className="demo-row demo-row-column">
            <div className="demo-container-full-max-500">
              <RadioCardGroup
                value={radioCardValue}
                onChange={(value) => setRadioCardValue(value)}
                orientation="vertical"
                options={[
                  { value: 'same-day', label: 'Same-Day Booking', description: 'Accept bookings with short notice.' },
                  { value: 'advance', label: 'Advance Booking', description: 'Require booking days in advance.' }
                ]}
              />
            </div>
          </div>
        </DemoSection>

        <DemoSection componentId="toggle" title="Toggle - Sizes" shouldShow={shouldShowSection}>
          <div className="demo-row demo-row-column">
            <div>
              <DemoLabeledInput label="Small (38x20)">
                <Toggle
                  checked={toggle1}
                  onChange={(checked) => setToggle1(checked)}
                  size="sm"
                  label="Small toggle"
                />
              </DemoLabeledInput>
            </div>
            <div>
              <DemoLabeledInput label="Medium (50x26) - Default">
                <Toggle
                  checked={toggle2}
                  onChange={(checked) => setToggle2(checked)}
                  size="md"
                  label="Medium toggle"
                />
              </DemoLabeledInput>
            </div>
            <div>
              <DemoLabeledInput label="Large (68x38)">
                <Toggle
                  checked={toggle3}
                  onChange={(checked) => setToggle3(checked)}
                  size="lg"
                  label="Large toggle"
                />
              </DemoLabeledInput>
            </div>
          </div>
        </DemoSection>

        {/* Toggle */}
        <DemoSection componentId="toggle" title="Toggle - Basic" shouldShow={shouldShowSection}>
          <div className="demo-row demo-row-column">
            <Toggle
              checked={toggle1}
              onChange={(checked) => setToggle1(checked)}
              label="Unchecked toggle"
            />
            <Toggle
              checked={toggle2}
              onChange={(checked) => setToggle2(checked)}
              label="Checked toggle"
            />
            <Toggle
              checked={toggle3}
              onChange={(checked) => setToggle3(checked)}
              label="Disabled toggle"
              disabled
            />
          </div>
        </DemoSection>

        <DemoSection componentId="toggle" title="Toggle - With Label" shouldShow={shouldShowSection}>
          <div className="demo-row demo-row-column">
            <Toggle
              checked={toggle1}
              onChange={(checked) => setToggle1(checked)}
              label="Enable notifications"
            />
            <Toggle
              checked={toggle2}
              onChange={(checked) => setToggle2(checked)}
              label="Auto-save"
            />
            <Toggle
              checked={false}
              onChange={() => {}}
              label="Premium feature"
              disabled
            />
          </div>
        </DemoSection>

        <DemoSection componentId="toggle" title="Toggle - With Label and Description" shouldShow={shouldShowSection}>
          <div className="demo-row demo-row-column">
            <Toggle
              checked={toggle1}
              onChange={(checked) => setToggle1(checked)}
              label="Enable notifications"
              description="Receive email notifications for important updates"
            />
            <Toggle
              checked={toggle2}
              onChange={(checked) => setToggle2(checked)}
              label="Auto-save documents"
              description="Automatically save your work every 5 minutes"
            />
            <Toggle
              checked={toggle3}
              onChange={(checked) => setToggle3(checked)}
              label="Dark mode"
              description="Switch to dark theme for better night viewing"
            />
            <Toggle
              checked={false}
              onChange={() => {}}
              label="Premium feature"
              description="Upgrade to enable this feature"
              disabled
            />
          </div>
        </DemoSection>

        <DemoSection componentId="toggle" title="Toggle - Uncontrolled" shouldShow={shouldShowSection}>
          <div className="demo-row demo-row-column">
            <Toggle
              defaultChecked={true}
              onChange={(checked) => console.log('Uncontrolled toggle:', checked)}
              label="Remember me"
              description="Keep me signed in"
            />
            <Toggle
              defaultChecked={false}
              onChange={(checked) => console.log('Uncontrolled toggle:', checked)}
              label="Newsletter subscription"
            />
          </div>
        </DemoSection>

        {/* TextInput */}
        <DemoSection componentId="input" title="Input - TextInput - Sizes" shouldShow={shouldShowSection}>
          <div className="demo-row demo-row-column-max-400">
            <div className="demo-card-item">
              <DemoLabeledInput label="Mini (32px)">
                <TextInput size="mini" placeholder="Mini input" />
              </DemoLabeledInput>
            </div>
            <div className="demo-card-item">
              <DemoLabeledInput label="Small (36px)">
                <TextInput size="sm" placeholder="Small input" />
              </DemoLabeledInput>
            </div>
            <div className="demo-card-item">
              <DemoLabeledInput label="Medium (40px) - Default">
                <TextInput size="md" placeholder="Medium input" />
              </DemoLabeledInput>
            </div>
            <div className="demo-card-item">
              <DemoLabeledInput label="Large (48px)">
                <TextInput size="lg" placeholder="Large input" />
              </DemoLabeledInput>
            </div>
          </div>
        </DemoSection>

        <DemoSection componentId="input" title="Input - TextInput - Basic" shouldShow={shouldShowSection}>
          <div className="demo-row demo-row-column-max-400">
            <TextInput
              value={textInput1}
              onChange={(value) => setTextInput1(value)}
              placeholder="Enter text..."
            />
            <TextInput
              value={textInput2}
              onChange={(value) => setTextInput2(value)}
              placeholder="With default value"
              defaultValue="Initial value"
            />
            <TextInput
              value="Disabled input"
              disabled
            />
            <TextInput
              value="Read-only input"
              readOnly
            />
          </div>
        </DemoSection>

        <DemoSection componentId="input" title="Input - TextInput - With Prefix/Suffix" shouldShow={shouldShowSection}>
          <div className="demo-row demo-row-column-max-400">
            <div className="demo-card-item">
              <DemoLabeledInput label="Currency">
                <NumberInput 
                  prefix={<Badge size="micro">USD</Badge>}
                  decimalPlaces={2}
                  step={0.01}
                  placeholder="0.00"
                />
              </DemoLabeledInput>
            </div>
            <div className="demo-card-item">
              <DemoLabeledInput label="Weight">
                <NumberInput 
                  suffix={<Badge size="micro">kg</Badge>}
                  placeholder="Weight"
                />
              </DemoLabeledInput>
            </div>
            <div className="demo-card-item">
              <DemoLabeledInput label="Website">
                <TextInput
                  prefix={<Badge size="micro">https://</Badge>}
                  placeholder="example"
                />
              </DemoLabeledInput>
            </div>
          </div>
        </DemoSection>

        <DemoSection componentId="input" title="Input - TextInput - With Icons" shouldShow={shouldShowSection}>
          <div className="demo-row demo-row-column-max-400">
            <TextInput
              iconLeft={<SearchIcon />}
              placeholder="Search..."
              type="search"
            />
            <TextInput
              iconRight={<CloseIcon />}
              placeholder="With icon on right"
            />
            <TextInput
              iconLeft={<SearchIcon />}
              iconRight={<CloseIcon />}
              placeholder="With both icons"
            />
          </div>
        </DemoSection>

        {/* NumberInput */}
        <DemoSection componentId="input" title="Input - NumberInput - Basic" shouldShow={shouldShowSection}>
          <div className="demo-row demo-row-column-max-400-large">
            <div className="demo-card-item">
              <DemoLabeledInput label="Basic number input">
                <NumberInput 
                  value={numberInput1}
                  onChange={(val) => setNumberInput1(val)}
                  placeholder="Enter number..."
                />
              </DemoLabeledInput>
            </div>
            <div className="demo-card-item">
              <DemoLabeledInput label="With min/max (0-100)">
                <NumberInput 
                  value={numberInput2}
                  onChange={(val) => setNumberInput2(val)}
                  min={0}
                  max={100}
                  placeholder="0-100"
                />
              </DemoLabeledInput>
            </div>
            <div className="demo-card-item">
              <DemoLabeledInput label="Decimal places (2)">
                <NumberInput 
                  decimalPlaces={2}
                  step={0.01}
                  placeholder="0.00"
                />
              </DemoLabeledInput>
            </div>
            <div className="demo-card-item">
              <DemoLabeledInput label="No negative numbers">
                <NumberInput 
                  allowNegative={false}
                  min={0}
                  placeholder="Positive only"
                />
              </DemoLabeledInput>
            </div>
            <div className="demo-card-item">
              <DemoLabeledInput label="Disabled">
                <NumberInput 
                  disabled
                  defaultValue={42}
                  placeholder="Disabled"
                />
              </DemoLabeledInput>
            </div>
          </div>
        </DemoSection>

        {/* CurrencyInput */}
        <DemoSection componentId="input" title="Input - CurrencyInput" shouldShow={shouldShowSection}>
          <div className="demo-row demo-row-column-max-400">
            <div className="demo-card-item">
              <DemoLabeledInput label="USD (default, 2 decimals)">
                <CurrencyInput 
                  currency="USD"
                  placeholder="0.00"
                />
              </DemoLabeledInput>
            </div>
            <div className="demo-card-item">
              <DemoLabeledInput label="JPY (0 decimals)">
                <CurrencyInput 
                  currency="JPY"
                  placeholder="0"
                />
              </DemoLabeledInput>
            </div>
            <div className="demo-card-item">
              <DemoLabeledInput label="EUR (2 decimals)">
                <CurrencyInput 
                  currency="EUR"
                  placeholder="0.00"
                />
              </DemoLabeledInput>
            </div>
            <div className="demo-card-item">
              <DemoLabeledInput label="Without symbol">
                <CurrencyInput 
                  currency="USD"
                  showSymbol={false}
                  placeholder="0.00"
                />
              </DemoLabeledInput>
            </div>
          </div>
        </DemoSection>

        {/* PasswordInput */}
        <DemoSection componentId="input" title="Input - PasswordInput" shouldShow={shouldShowSection}>
          <div className="demo-row demo-row-column-max-400">
            <div className="demo-card-item">
              <DemoLabeledInput label="Basic password input">
                <PasswordInput 
                  value={passwordInput1}
                  onChange={(val) => setPasswordInput1(val)}
                  placeholder="Enter password..."
                />
              </DemoLabeledInput>
            </div>
            <div className="demo-card-item">
              <DemoLabeledInput label="Without toggle">
                <PasswordInput 
                  value={passwordInput2}
                  onChange={(val) => setPasswordInput2(val)}
                  showPasswordToggle={false}
                  placeholder="No toggle button"
                />
              </DemoLabeledInput>
            </div>
            <div className="demo-card-item">
              <DemoLabeledInput label="Disabled">
                <PasswordInput 
                  disabled
                  defaultValue="hidden"
                  placeholder="Disabled password"
                />
              </DemoLabeledInput>
            </div>
          </div>
        </DemoSection>

        {/* TextArea */}
        <DemoSection componentId="textarea" title="TextArea - Sizes" shouldShow={shouldShowSection}>
          <div className="demo-row demo-row-column-max-400">
            <div className="demo-card-item">
              <DemoLabeledInput label="Mini (32px min)">
                <TextArea size="mini" rows={3} placeholder="Mini textarea" />
              </DemoLabeledInput>
            </div>
            <div className="demo-card-item">
              <DemoLabeledInput label="Small (36px min)">
                <TextArea size="sm" rows={3} placeholder="Small textarea" />
              </DemoLabeledInput>
            </div>
            <div className="demo-card-item">
              <DemoLabeledInput label="Medium (40px min) - Default">
                <TextArea size="md" rows={3} placeholder="Medium textarea" />
              </DemoLabeledInput>
            </div>
            <div className="demo-card-item">
              <DemoLabeledInput label="Large (48px min)">
                <TextArea size="lg" rows={3} placeholder="Large textarea" />
              </DemoLabeledInput>
            </div>
          </div>
        </DemoSection>

        <DemoSection componentId="textarea" title="TextArea - Basic" shouldShow={shouldShowSection}>
          <div className="demo-row demo-row-column-max-400">
            <TextArea
              value={textArea1}
              onChange={(value) => setTextArea1(value)}
              placeholder="Enter your message..."
              rows={4}
            />
            <TextArea
              value={textArea2}
              onChange={(value) => setTextArea2(value)}
              placeholder="With default value"
              defaultValue="Initial text content"
              rows={4}
            />
            <TextArea
              value="Disabled textarea"
              disabled
              rows={3}
            />
            <TextArea
              value="Read-only textarea - you can select this text but not edit it"
              readOnly
              rows={3}
            />
          </div>
        </DemoSection>

        <DemoSection componentId="textarea" title="TextArea - Rows and Resize" shouldShow={shouldShowSection}>
          <div className="demo-row demo-row-column-max-400">
            <div className="demo-card-item">
              <DemoLabeledInput label="3 rows (default)">
                <TextArea rows={3} placeholder="Default 3 rows" />
              </DemoLabeledInput>
            </div>
            <div className="demo-card-item">
              <DemoLabeledInput label="5 rows">
                <TextArea rows={5} placeholder="5 rows" />
              </DemoLabeledInput>
            </div>
            <div className="demo-card-item">
              <DemoLabeledInput label="No resize">
                <TextArea resize={false} rows={4} placeholder="Resize disabled" />
              </DemoLabeledInput>
            </div>
          </div>
        </DemoSection>

        <DemoSection componentId="textarea" title="TextArea - Auto-Expand" shouldShow={shouldShowSection}>
          <div className="demo-row demo-row-column-max-600">
            <div className="demo-card-item">
              <DemoLabeledInput label="Basic auto-expand (starts at 2 rows, expands as needed)">
                <TextArea 
                  autoExpand
                  value={textAreaAutoExpand}
                  onChange={(val) => setTextAreaAutoExpand(val)}
                  placeholder="Start typing, it will expand automatically..."
                />
              </DemoLabeledInput>
            </div>
            <div className="demo-card-item">
              <DemoLabeledInput label="Auto-expand with max limit (5 rows)">
                <TextArea 
                  autoExpand
                  minRows={2}
                  maxRows={5}
                  value={textAreaAutoExpandLimited}
                  onChange={(val) => setTextAreaAutoExpandLimited(val)}
                  placeholder="Expands up to 5 rows, then scrolls..."
                />
              </DemoLabeledInput>
            </div>
          </div>
        </DemoSection>

        {/* PhoneInput */}
        <DemoSection componentId="input" title="Input - PhoneInput" shouldShow={shouldShowSection}>
          <div className="demo-row demo-row-column-max-400">
            <div className="demo-card-item">
              <DemoLabeledInput label="Basic phone input (default: Japan +81)">
                <PhoneInput 
                  value={phoneInput1}
                  onChange={(val) => setPhoneInput1(val)}
                  placeholder="Phone number"
                />
              </DemoLabeledInput>
            </div>
            <div className="demo-card-item">
              <DemoLabeledInput label="With country change handler">
                <PhoneInput 
                  value={phoneInput2}
                  onChange={(val) => setPhoneInput2(val)}
                  countryCode={phoneCountryCode}
                  onCountryChange={(dialCode, country) => {
                    setPhoneCountryCode(dialCode);
                    console.log('Country changed to:', country.name, dialCode);
                  }}
                  placeholder="Phone number"
                />
              </DemoLabeledInput>
            </div>
            <div className="demo-card-item">
              <DemoLabeledInput label="United States (+1)">
                <PhoneInput 
                  countryCode="+1"
                  placeholder="Phone number"
                />
              </DemoLabeledInput>
            </div>
            <div className="demo-card-item">
              <DemoLabeledInput label="Disabled">
                <PhoneInput 
                  disabled
                  defaultValue="9012345678"
                  placeholder="Disabled phone"
                />
              </DemoLabeledInput>
            </div>
            <div className="demo-card-item">
              <DemoLabeledInput label="Small size">
                <PhoneInput 
                  size="sm"
                  placeholder="Phone number"
                />
              </DemoLabeledInput>
            </div>
            <div className="demo-card-item">
              <DemoLabeledInput label="Large size">
                <PhoneInput 
                  size="lg"
                  placeholder="Phone number"
                />
              </DemoLabeledInput>
            </div>
            <div className="demo-card-item">
              <DemoLabeledInput label="Read-only">
                <PhoneInput 
                  readOnly
                  defaultValue="9012345678"
                  placeholder="Read-only phone"
                />
              </DemoLabeledInput>
            </div>
          </div>
        </DemoSection>

        {/* InputGroup */}
        <DemoSection componentId="inputgroup" title="InputGroup - Basic" shouldShow={shouldShowSection}>
          <div className="demo-row demo-row-column-max-400">
            <div className="demo-card-item">
              <InputGroup label="Name">
                <TextInput placeholder="Enter your name" />
              </InputGroup>
            </div>
            <div className="demo-card-item">
              <InputGroup label="Email" optional>
                <TextInput type="email" placeholder="Enter your email" />
              </InputGroup>
            </div>
            <div className="demo-card-item">
              <InputGroup label="Phone Number" optional optionalText="(Optional)">
                <PhoneInput placeholder="Phone number" />
              </InputGroup>
            </div>
          </div>
        </DemoSection>

        <DemoSection componentId="inputgroup" title="InputGroup - With Sublabel" shouldShow={shouldShowSection}>
          <div className="demo-row demo-row-column-max-400">
            <div className="demo-card-item">
              <InputGroup 
                label="Password"
                sublabel="Must be at least 8 characters"
              >
                <PasswordInput placeholder="Enter password" />
              </InputGroup>
            </div>
            <div className="demo-card-item">
              <InputGroup 
                label="Description"
                sublabel="This will be visible to all users"
                optional
              >
                <TextArea rows={3} placeholder="Enter description" />
              </InputGroup>
            </div>
          </div>
        </DemoSection>

        <DemoSection componentId="inputgroup" title="InputGroup - With Helper Text" shouldShow={shouldShowSection}>
          <div className="demo-row demo-row-column-max-400">
            <div className="demo-card-item">
              <InputGroup 
                label="Username"
                helperText="This will be your unique identifier"
              >
                <TextInput placeholder="Enter username" />
              </InputGroup>
            </div>
            <div className="demo-card-item">
              <InputGroup 
                label="Website"
                helperText="Include https:// in the URL"
              >
                <TextInput 
                  prefix={<Badge size="micro">https://</Badge>}
                  placeholder="example.com"
                />
              </InputGroup>
            </div>
          </div>
        </DemoSection>

        <DemoSection componentId="inputgroup" title="InputGroup - With Error Message" shouldShow={shouldShowSection}>
          <div className="demo-row demo-row-column-max-400">
            <div className="demo-card-item">
              <InputGroup 
                label="Email"
                error="Please enter a valid email address"
              >
                <TextInput 
                  type="email"
                  placeholder="email@example.com"
                  defaultValue="invalid-email"
                />
              </InputGroup>
            </div>
            <div className="demo-card-item">
              <InputGroup 
                label="Password"
                sublabel="Must be at least 8 characters"
                error="Password must be at least 8 characters long"
              >
                <PasswordInput placeholder="Enter password" defaultValue="123" />
              </InputGroup>
            </div>
            <div className="demo-card-item">
              <InputGroup 
                label="Quantity"
                error="Must be a positive number"
              >
                <NumberInput 
                  placeholder="0"
                  defaultValue={-5}
                  min={0}
                />
              </InputGroup>
            </div>
          </div>
        </DemoSection>

        <DemoSection componentId="inputgroup" title="InputGroup - Complete Example" shouldShow={shouldShowSection}>
          <div className="demo-row demo-row-column-max-400">
            <div className="demo-card-item">
              <InputGroup 
                label="Account Name"
                sublabel="This will be displayed in your profile"
                helperText="Choose a name that represents your account"
                optional
              >
                <TextInput placeholder="Enter account name" />
              </InputGroup>
            </div>
          </div>
        </DemoSection>

        {/* ImageUpload */}
        <DemoSection componentId="imageupload" title="ImageUpload" shouldShow={shouldShowSection}>
          <div className="demo-row demo-row-column-max-400">
            <div className="demo-card-item">
              <DemoLabeledInput label="Basic image upload">
                <ImageUpload 
                  value={imageUpload1}
                  onChange={(file) => setImageUpload1(file)}
                />
              </DemoLabeledInput>
            </div>
            <div className="demo-card-item">
              <DemoLabeledInput label="Custom preview size (300px)">
                <ImageUpload 
                  value={imageUpload2}
                  onChange={(file) => setImageUpload2(file)}
                  previewSize={300}
                />
              </DemoLabeledInput>
            </div>
            <div className="demo-card-item">
              <DemoLabeledInput label="Disabled">
                <ImageUpload 
                  disabled
                  defaultValue="https://via.placeholder.com/200"
                />
              </DemoLabeledInput>
            </div>
          </div>
        </DemoSection>

        {/* AvatarUpload */}
        <DemoSection componentId="avatarupload" title="AvatarUpload" shouldShow={shouldShowSection}>
          <div className="demo-row demo-row-column-max-400">
            <div className="demo-card-item">
              <DemoLabeledInput label="Medium (64px) - Default">
                <AvatarUpload 
                  value={avatarUpload1}
                  onChange={(file) => setAvatarUpload1(file)}
                  size="md"
                />
              </DemoLabeledInput>
            </div>
            <div className="demo-card-item">
              <DemoLabeledInput label="Large (96px)">
                <AvatarUpload 
                  value={avatarUpload2}
                  onChange={(file) => setAvatarUpload2(file)}
                  size="lg"
                />
              </DemoLabeledInput>
            </div>
            <div className="demo-card-item">
              <DemoLabeledInput label="With uploaded image (remove button)">
                <AvatarUpload 
                  defaultValue="https://via.placeholder.com/64"
                  size="md"
                />
              </DemoLabeledInput>
            </div>
            <div className="demo-card-item">
              <DemoLabeledInput label="Without edit overlay">
                <AvatarUpload 
                  showEditOverlay={false}
                  size="md"
                />
              </DemoLabeledInput>
            </div>
            <div className="demo-card-item">
              <DemoLabeledInput label="Disabled">
                <AvatarUpload 
                  disabled
                  defaultValue="https://via.placeholder.com/64"
                  size="md"
                />
              </DemoLabeledInput>
            </div>
          </div>
        </DemoSection>

        {/* Select */}
        <DemoSection componentId="select" title="Select - Sizes" shouldShow={shouldShowSection}>
          <div className="demo-row demo-row-column-max-400">
            <div className="demo-card-item">
              <DemoLabeledInput label="Mini (32px)">
                <Select 
                  size="mini"
                  options={[
                    { value: '1', label: 'Option 1' },
                    { value: '2', label: 'Option 2' },
                    { value: '3', label: 'Option 3' }
                  ]}
                  placeholder="Select option..."
                />
              </DemoLabeledInput>
            </div>
            <div className="demo-card-item">
              <DemoLabeledInput label="Small (36px)">
                <Select 
                  size="sm"
                  options={[
                    { value: '1', label: 'Option 1' },
                    { value: '2', label: 'Option 2' },
                    { value: '3', label: 'Option 3' }
                  ]}
                  placeholder="Select option..."
                />
              </DemoLabeledInput>
            </div>
            <div className="demo-card-item">
              <DemoLabeledInput label="Medium (40px) - Default">
                <Select 
                  size="md"
                  options={[
                    { value: '1', label: 'Option 1' },
                    { value: '2', label: 'Option 2' },
                    { value: '3', label: 'Option 3' }
                  ]}
                  placeholder="Select option..."
                />
              </DemoLabeledInput>
            </div>
            <div className="demo-card-item">
              <DemoLabeledInput label="Large (48px)">
                <Select 
                  size="lg"
                  options={[
                    { value: '1', label: 'Option 1' },
                    { value: '2', label: 'Option 2' },
                    { value: '3', label: 'Option 3' }
                  ]}
                  placeholder="Select option..."
                />
              </DemoLabeledInput>
            </div>
          </div>
        </DemoSection>

        <DemoSection componentId="select" title="Select - Basic" shouldShow={shouldShowSection}>
          <div className="demo-row demo-row-column-max-400-large">
            <div className="demo-card-item">
              <DemoLabeledInput label="Basic select">
                <Select 
                  options={[
                    { value: 'apple', label: 'Apple' },
                    { value: 'banana', label: 'Banana' },
                    { value: 'cherry', label: 'Cherry' },
                    { value: 'date', label: 'Date' }
                  ]}
                  placeholder="Choose a fruit..."
                />
              </DemoLabeledInput>
            </div>
            <div className="demo-card-item">
              <DemoLabeledInput label="Controlled select">
                <Select 
                  options={[
                    { value: 'red', label: 'Red' },
                    { value: 'green', label: 'Green' },
                    { value: 'blue', label: 'Blue' }
                  ]}
                  value={select1}
                  onChange={(val) => setSelect1(val)}
                  placeholder="Select a color..."
                />
              </DemoLabeledInput>
            </div>
            <div className="demo-card-item">
              <DemoLabeledInput label="With default value">
                <Select 
                  options={[
                    { value: 'option1', label: 'Option 1' },
                    { value: 'option2', label: 'Option 2' },
                    { value: 'option3', label: 'Option 3' }
                  ]}
                  defaultValue="option2"
                  placeholder="Select option..."
                />
              </DemoLabeledInput>
            </div>
            <div className="demo-card-item">
              <DemoLabeledInput label="Disabled">
                <Select 
                  options={[
                    { value: '1', label: 'Option 1' },
                    { value: '2', label: 'Option 2' },
                    { value: '3', label: 'Option 3' }
                  ]}
                  disabled
                  defaultValue="1"
                  placeholder="Select option..."
                />
              </DemoLabeledInput>
            </div>
          </div>
        </DemoSection>

        <DemoSection componentId="select" title="Select - Searchable" shouldShow={shouldShowSection}>
          <div className="demo-row demo-row-column-max-400-large">
            <div className="demo-card-item">
              <DemoLabeledInput label="Searchable select">
                <Select 
                  searchable
                  options={[
                    { value: 'alabama', label: 'Alabama' },
                    { value: 'alaska', label: 'Alaska' },
                    { value: 'arizona', label: 'Arizona' },
                    { value: 'arkansas', label: 'Arkansas' },
                    { value: 'california', label: 'California' },
                    { value: 'colorado', label: 'Colorado' },
                    { value: 'connecticut', label: 'Connecticut' },
                    { value: 'delaware', label: 'Delaware' },
                    { value: 'florida', label: 'Florida' },
                    { value: 'georgia', label: 'Georgia' }
                  ]}
                  value={selectSearchable}
                  onChange={(val) => setSelectSearchable(val)}
                  placeholder="Search states..."
                />
              </DemoLabeledInput>
            </div>
            <div className="demo-card-item">
              <DemoLabeledInput label="With disabled options">
                <Select 
                  options={[
                    { value: '1', label: 'Available Option 1' },
                    { value: '2', label: 'Disabled Option', disabled: true },
                    { value: '3', label: 'Available Option 2' },
                    { value: '4', label: 'Another Disabled', disabled: true },
                    { value: '5', label: 'Available Option 3' }
                  ]}
                  placeholder="Select option..."
                />
              </DemoLabeledInput>
            </div>
          </div>
        </DemoSection>

        {/* MultiSelect */}
        <DemoSection componentId="multiselect" title="MultiSelect - Sizes" shouldShow={shouldShowSection}>
          <div className="demo-row demo-row-column-max-400">
            <div className="demo-card-item">
              <DemoLabeledInput label="Mini (32px)">
                <MultiSelect 
                  size="mini"
                  options={[
                    { value: '1', label: 'Option 1' },
                    { value: '2', label: 'Option 2' },
                    { value: '3', label: 'Option 3' }
                  ]}
                  placeholder="Select options..."
                />
              </DemoLabeledInput>
            </div>
            <div className="demo-card-item">
              <DemoLabeledInput label="Small (36px)">
                <MultiSelect 
                  size="sm"
                  options={[
                    { value: '1', label: 'Option 1' },
                    { value: '2', label: 'Option 2' },
                    { value: '3', label: 'Option 3' }
                  ]}
                  placeholder="Select options..."
                />
              </DemoLabeledInput>
            </div>
            <div className="demo-card-item">
              <DemoLabeledInput label="Medium (40px) - Default">
                <MultiSelect 
                  size="md"
                  options={[
                    { value: '1', label: 'Option 1' },
                    { value: '2', label: 'Option 2' },
                    { value: '3', label: 'Option 3' }
                  ]}
                  placeholder="Select options..."
                />
              </DemoLabeledInput>
            </div>
            <div className="demo-card-item">
              <DemoLabeledInput label="Large (48px)">
                <MultiSelect 
                  size="lg"
                  options={[
                    { value: '1', label: 'Option 1' },
                    { value: '2', label: 'Option 2' },
                    { value: '3', label: 'Option 3' }
                  ]}
                  placeholder="Select options..."
                />
              </DemoLabeledInput>
            </div>
          </div>
        </DemoSection>

        <DemoSection componentId="multiselect" title="MultiSelect - Basic" shouldShow={shouldShowSection}>
          <div className="demo-row demo-row-column-max-400-large">
            <div className="demo-card-item">
              <DemoLabeledInput label="Basic multiselect">
                <MultiSelect 
                  options={[
                    { value: 'apple', label: 'Apple' },
                    { value: 'banana', label: 'Banana' },
                    { value: 'cherry', label: 'Cherry' },
                    { value: 'date', label: 'Date' }
                  ]}
                  placeholder="Choose fruits..."
                />
              </DemoLabeledInput>
            </div>
            <div className="demo-card-item">
              <DemoLabeledInput label="Controlled multiselect">
                <MultiSelect 
                  options={[
                    { value: 'red', label: 'Red' },
                    { value: 'green', label: 'Green' },
                    { value: 'blue', label: 'Blue' },
                    { value: 'yellow', label: 'Yellow' }
                  ]}
                  value={multiSelect1}
                  onChange={(vals) => setMultiSelect1(vals)}
                  placeholder="Select colors..."
                />
              </DemoLabeledInput>
            </div>
            <div className="demo-card-item">
              <DemoLabeledInput label="With default values">
                <MultiSelect 
                  options={[
                    { value: 'option1', label: 'Option 1' },
                    { value: 'option2', label: 'Option 2' },
                    { value: 'option3', label: 'Option 3' }
                  ]}
                  defaultValue={['option1', 'option2']}
                  placeholder="Select options..."
                />
              </DemoLabeledInput>
            </div>
            <div className="demo-card-item">
              <DemoLabeledInput label="Disabled">
                <MultiSelect 
                  options={[
                    { value: '1', label: 'Option 1' },
                    { value: '2', label: 'Option 2' },
                    { value: '3', label: 'Option 3' }
                  ]}
                  disabled
                  defaultValue={['1']}
                  placeholder="Select options..."
                />
              </DemoLabeledInput>
            </div>
            <div className="demo-card-item">
              <DemoLabeledInput label="Without Select All/Clear All">
                <MultiSelect 
                  options={[
                    { value: '1', label: 'Option 1' },
                    { value: '2', label: 'Option 2' },
                    { value: '3', label: 'Option 3' }
                  ]}
                  showSelectAll={false}
                  placeholder="Select options..."
                />
              </DemoLabeledInput>
            </div>
          </div>
        </DemoSection>

        <DemoSection componentId="multiselect" title="MultiSelect - Searchable" shouldShow={shouldShowSection}>
          <div className="demo-row demo-row-column-max-400-large">
            <div className="demo-card-item">
              <DemoLabeledInput label="Searchable multiselect">
                <MultiSelect 
                  searchable
                  options={[
                    { value: 'alabama', label: 'Alabama' },
                    { value: 'alaska', label: 'Alaska' },
                    { value: 'arizona', label: 'Arizona' },
                    { value: 'arkansas', label: 'Arkansas' },
                    { value: 'california', label: 'California' },
                    { value: 'colorado', label: 'Colorado' },
                    { value: 'connecticut', label: 'Connecticut' },
                    { value: 'delaware', label: 'Delaware' },
                    { value: 'florida', label: 'Florida' },
                    { value: 'georgia', label: 'Georgia' }
                  ]}
                  value={multiSelectSearchable}
                  onChange={(vals) => setMultiSelectSearchable(vals)}
                  placeholder="Search and select states..."
                />
              </DemoLabeledInput>
            </div>
            <div className="demo-card-item">
              <DemoLabeledInput label="With disabled options">
                <MultiSelect 
                  options={[
                    { value: '1', label: 'Available Option 1' },
                    { value: '2', label: 'Disabled Option', disabled: true },
                    { value: '3', label: 'Available Option 2' },
                    { value: '4', label: 'Another Disabled', disabled: true },
                    { value: '5', label: 'Available Option 3' }
                  ]}
                  placeholder="Select options..."
                />
              </DemoLabeledInput>
            </div>
          </div>
        </DemoSection>

        {/* Badge */}
        <DemoSection componentId="badge" title="Badge - Sizes" shouldShow={shouldShowSection}>
          <div className="demo-row demo-grid-auto-fit">
            <div className="demo-flex-col-center">
              <p className="demo-label-center">Large (48px)</p>
              <Badge size="lg">Large</Badge>
            </div>
            <div className="demo-flex-col-center">
              <p className="demo-label-center">Medium (40px)</p>
              <Badge size="md">Medium</Badge>
            </div>
            <div className="demo-flex-col-center">
              <p className="demo-label-center">Small (32px)</p>
              <Badge size="sm">Small</Badge>
            </div>
            <div className="demo-flex-col-center">
              <p className="demo-label-center">Mini (24px)</p>
              <Badge size="mini">Mini</Badge>
            </div>
            <div className="demo-flex-col-center">
              <p className="demo-label-center">Micro (20px)</p>
              <Badge size="micro">Micro</Badge>
            </div>
            <div className="demo-flex-col-center">
              <p className="demo-label-center">MicroIcon (20px)</p>
              <Badge size="microIcon" icon={<SearchIcon />} sentiment="info" />
            </div>
          </div>
        </DemoSection>

        <DemoSection componentId="badge" title="Badge - Icon Variants (Square)" shouldShow={shouldShowSection}>
          <div className="demo-row demo-grid-auto-fit">
            <div className="demo-flex-col-center">
              <p className="demo-label-center">Large Icon (48px)</p>
              <Badge size="lgIcon" icon={<SearchIcon />} sentiment="success" />
            </div>
            <div className="demo-flex-col-center">
              <p className="demo-label-center">Medium Icon (40px)</p>
              <Badge size="mdIcon" icon={<SearchIcon />} sentiment="info" />
            </div>
            <div className="demo-flex-col-center">
              <p className="demo-label-center">Small Icon (32px)</p>
              <Badge size="smIcon" icon={<SearchIcon />} sentiment="warning" />
            </div>
            <div className="demo-flex-col-center">
              <p className="demo-label-center">Mini Icon (24px)</p>
              <Badge size="miniIcon" icon={<SearchIcon />} sentiment="danger" />
            </div>
            <div className="demo-flex-col-center">
              <p className="demo-label-center">Micro Icon (20px)</p>
              <Badge size="microIcon" icon={<SearchIcon />} sentiment="purple" />
            </div>
          </div>
        </DemoSection>

        <DemoSection componentId="badge" title="Badge - Sentiments" shouldShow={shouldShowSection}>
          <div className="demo-row demo-row-wrap">
            <Badge sentiment="default">Default</Badge>
            <Badge sentiment="success">Success</Badge>
            <Badge sentiment="info">Info</Badge>
            <Badge sentiment="danger">Danger</Badge>
            <Badge sentiment="warning">Warning</Badge>
            <Badge sentiment="neutral">Neutral</Badge>
            <Badge sentiment="purple">Purple</Badge>
            <Badge sentiment="orange">Orange</Badge>
            <Badge sentiment="memo">Memo</Badge>
          </div>
        </DemoSection>

        <DemoSection componentId="badge" title="Badge - In TextInput Prefix/Suffix" shouldShow={shouldShowSection}>
          <div className="demo-row demo-row-column-max-400">
            <TextInput
              prefix={<Badge size="micro">USD</Badge>}
              placeholder="0.00"
              type="number"
            />
            <TextInput
              suffix={<Badge size="micro">kg</Badge>}
              placeholder="Weight"
            />
            <TextInput
              prefix={<Badge size="micro">Active</Badge>}
              placeholder="Account name"
            />
            <TextInput
              prefix={<Badge size="microIcon" icon={<SearchIcon />} />}
              placeholder="Search..."
            />
          </div>
        </DemoSection>

        <DemoSection componentId="badge" title="Badge - With Icons" shouldShow={shouldShowSection}>
          <div className="demo-row demo-row-wrap">
            <Badge icon={<SearchIcon />} sentiment="info">Search</Badge>
            <Badge iconRight={<CloseIcon />}>Dismissible</Badge>
            <Badge icon={<SearchIcon />} iconRight={<CloseIcon />}>Both</Badge>
          </div>
        </DemoSection>

        {/* Chip */}
        <DemoSection componentId="chip" title="Chip - Sizes" shouldShow={shouldShowSection}>
            <div className="demo-row demo-row-column-large">
              <div className="demo-card-item">
                <p className="demo-label-large">Large (48px)</p>
                <div className="demo-row demo-row-wrap-wrap">
                  <div className="demo-flex-col-center-small">
                    <p className="demo-label-center-no-margin">Selected</p>
                    <Chip size="lg" selected>Button</Chip>
                  </div>
                  <div className="demo-flex-col-center-small">
                    <p className="demo-label-center-no-margin">Default</p>
                    <Chip size="lg">Button</Chip>
                  </div>
                  <div className="demo-flex-col-center-small">
                    <p className="demo-label-center-no-margin">Default</p>
                    <Chip size="lg">Button</Chip>
                  </div>
                  <div className="demo-flex-col-center-small">
                    <p className="demo-label-center-no-margin">Disabled</p>
                    <Chip size="lg" disabled>Button</Chip>
                  </div>
                  <div className="demo-flex-col-center-small">
                    <p className="demo-label-center-no-margin">Selected & Disabled</p>
                    <Chip size="lg" selected disabled>Button</Chip>
                  </div>
                </div>
              </div>
              <div className="demo-card-item">
                <p className="demo-label-large">Medium (40px)</p>
                <div className="demo-row demo-row-wrap-wrap">
                  <div className="demo-flex-col-center-small">
                    <p className="demo-label-center-no-margin">Selected</p>
                    <Chip size="md" selected>Button</Chip>
                  </div>
                  <div className="demo-flex-col-center-small">
                    <p className="demo-label-center-no-margin">Default</p>
                    <Chip size="md">Button</Chip>
                  </div>
                  <div className="demo-flex-col-center-small">
                    <p className="demo-label-center-no-margin">Default</p>
                    <Chip size="md">Button</Chip>
                  </div>
                  <div className="demo-flex-col-center-small">
                    <p className="demo-label-center-no-margin">Disabled</p>
                    <Chip size="md" disabled>Button</Chip>
                  </div>
                  <div className="demo-flex-col-center-small">
                    <p className="demo-label-center-no-margin">Selected & Disabled</p>
                    <Chip size="md" selected disabled>Button</Chip>
                  </div>
                </div>
              </div>
              <div className="demo-card-item">
                <p className="demo-label-large">Small (36px)</p>
                <div className="demo-row demo-row-wrap-wrap">
                  <div className="demo-flex-col-center-small">
                    <p className="demo-label-center-no-margin">Selected</p>
                    <Chip size="sm" selected>Button</Chip>
                  </div>
                  <div className="demo-flex-col-center-small">
                    <p className="demo-label-center-no-margin">Default</p>
                    <Chip size="sm">Button</Chip>
                  </div>
                  <div className="demo-flex-col-center-small">
                    <p className="demo-label-center-no-margin">Default</p>
                    <Chip size="sm">Button</Chip>
                  </div>
                  <div className="demo-flex-col-center-small">
                    <p className="demo-label-center-no-margin">Disabled</p>
                    <Chip size="sm" disabled>Button</Chip>
                  </div>
                  <div className="demo-flex-col-center-small">
                    <p className="demo-label-center-no-margin">Selected & Disabled</p>
                    <Chip size="sm" selected disabled>Button</Chip>
                  </div>
                </div>
              </div>
            </div>
        </DemoSection>

        <DemoSection componentId="chip" title="Chip - With Icons" shouldShow={shouldShowSection}>
          <div className="demo-row demo-row-wrap-small">
            <Chip iconLeft={<SearchIcon />}>With Icon</Chip>
            <Chip iconRight={<CloseIcon />}>Icon Right</Chip>
            <Chip iconLeft={<SearchIcon />} iconRight={<CloseIcon />}>Both Icons</Chip>
            <Chip selected iconLeft={<SearchIcon />}>Selected</Chip>
            <Chip size="lg" iconLeft={<SearchIcon />}>Large</Chip>
            <Chip size="sm" iconLeft={<SearchIcon />}>Small</Chip>
          </div>
        </DemoSection>

        <DemoSection componentId="chip" title="Chip - States" shouldShow={shouldShowSection}>
          <div className="demo-row demo-row-wrap-small">
            <div className="demo-flex-col-center-small">
              <p className="demo-label-center-no-margin">Selected</p>
              <Chip selected>Selected</Chip>
            </div>
            <div className="demo-flex-col-center-small">
              <p className="demo-label-center-no-margin">Default</p>
              <Chip>Default</Chip>
            </div>
            <div className="demo-flex-col-center-small">
              <p className="demo-label-center-no-margin">Disabled</p>
              <Chip disabled>Disabled</Chip>
            </div>
            <div className="demo-flex-col-center-small">
              <p className="demo-label-center-no-margin">Selected & Disabled</p>
              <Chip selected disabled>Selected & Disabled</Chip>
            </div>
            <div className="demo-flex-col-center-small">
              <p className="demo-label-center-no-margin">Primary</p>
              <Chip variant="primary">Primary</Chip>
            </div>
          </div>
        </DemoSection>

        <DemoSection componentId="chip" title="Chip - Interactive" shouldShow={shouldShowSection}>
          <div className="demo-row demo-row-wrap-small">
            <Chip 
              selected={chipSelected === 'filter1'}
              onClick={() => setChipSelected(chipSelected === 'filter1' ? null : 'filter1')}
            >
              Filter 1
            </Chip>
            <Chip 
              selected={chipSelected === 'filter2'}
              onClick={() => setChipSelected(chipSelected === 'filter2' ? null : 'filter2')}
            >
              Filter 2
            </Chip>
            <Chip 
              selected={chipSelected === 'filter3'}
              onClick={() => setChipSelected(chipSelected === 'filter3' ? null : 'filter3')}
            >
              Filter 3
            </Chip>
          </div>
          <p className="demo-p-mt">
            Selected: {chipSelected || 'None'}
          </p>
        </DemoSection>

        {/* Tooltip */}
        <DemoSection componentId="tooltip" title="Tooltip - Positions" shouldShow={shouldShowSection}>
          <div className="demo-row demo-tooltip-container">
            <Tooltip content="Top tooltip" position="top">
              <Button>Top</Button>
            </Tooltip>
            <Tooltip content="Bottom tooltip" position="bottom">
              <Button>Bottom</Button>
            </Tooltip>
            <Tooltip content="Left tooltip" position="left">
              <Button>Left</Button>
            </Tooltip>
            <Tooltip content="Right tooltip" position="right">
              <Button>Right</Button>
            </Tooltip>
          </div>
        </DemoSection>

        <DemoSection componentId="tooltip" title="Tooltip - Start/End Alignment" shouldShow={shouldShowSection}>
          <div className="demo-row demo-tooltip-container">
            <Tooltip content="Top start" position="top-start">
              <Button>Top Start</Button>
            </Tooltip>
            <Tooltip content="Top end" position="top-end">
              <Button>Top End</Button>
            </Tooltip>
            <Tooltip content="Bottom start" position="bottom-start">
              <Button>Bottom Start</Button>
            </Tooltip>
            <Tooltip content="Bottom end" position="bottom-end">
              <Button>Bottom End</Button>
            </Tooltip>
            <Tooltip content="Left start" position="left-start">
              <Button>Left Start</Button>
            </Tooltip>
            <Tooltip content="Left end" position="left-end">
              <Button>Left End</Button>
            </Tooltip>
            <Tooltip content="Right start" position="right-start">
              <Button>Right Start</Button>
            </Tooltip>
            <Tooltip content="Right end" position="right-end">
              <Button>Right End</Button>
            </Tooltip>
          </div>
        </DemoSection>

        <DemoSection componentId="tooltip" title="Tooltip - Triggers" shouldShow={shouldShowSection}>
          <div className="demo-row demo-card-column">
            <DemoLabeledInput label="Hover (default)">
              <Tooltip content="This tooltip appears on hover" trigger="hover">
                <Button>Hover me</Button>
              </Tooltip>
            </DemoLabeledInput>
            <DemoLabeledInput label="Click">
              <Tooltip content="This tooltip toggles on click" trigger="click">
                <Button>Click me</Button>
              </Tooltip>
            </DemoLabeledInput>
            <DemoLabeledInput label="Focus">
              <Tooltip content="This tooltip appears on focus" trigger="focus">
                <TextInput placeholder="Focus me" />
              </Tooltip>
            </DemoLabeledInput>
          </div>
        </DemoSection>

        <DemoSection componentId="tooltip" title="Tooltip - With Icons" shouldShow={shouldShowSection}>
          <div className="demo-row demo-tooltip-container">
            <Tooltip content="Close button" position="top">
              <IconButton icon={<CloseIcon />} aria-label="Close" />
            </Tooltip>
            <Tooltip content="Search functionality" position="top">
              <IconButton icon={<SearchIcon />} aria-label="Search" />
            </Tooltip>
            <Tooltip content="Delete item" position="top">
              <Button iconLeft={<CloseIcon />} variant="danger">Delete</Button>
            </Tooltip>
          </div>
        </DemoSection>

        {/* Alert */}
        <DemoSection componentId="alert" title="Alert - Variants" shouldShow={shouldShowSection}>
          <div className="demo-row demo-row-column-large">
            <DemoLabeledInput label="Success">
              <Alert variant="success">
                Your changes have been saved successfully.
              </Alert>
            </DemoLabeledInput>
            <DemoLabeledInput label="Info">
              <Alert variant="info">
                Here's some helpful information for you.
              </Alert>
            </DemoLabeledInput>
            <DemoLabeledInput label="Warning">
              <Alert variant="warning">
                Please review this before proceeding.
              </Alert>
            </DemoLabeledInput>
            <DemoLabeledInput label="Danger">
              <Alert variant="danger">
                Something went wrong. Please try again.
              </Alert>
            </DemoLabeledInput>
          </div>
        </DemoSection>

        <DemoSection componentId="alert" title="Alert - With Title" shouldShow={shouldShowSection}>
          <div className="demo-row demo-row-column-large">
            <DemoLabeledInput label="Success with Title">
              <Alert variant="success" title="Success">
                Your changes have been saved successfully.
              </Alert>
            </DemoLabeledInput>
            <DemoLabeledInput label="Info with Title">
              <Alert variant="info" title="Information">
                Here's some helpful information for you.
              </Alert>
            </DemoLabeledInput>
            <DemoLabeledInput label="Warning with Title">
              <Alert variant="warning" title="Warning">
                Please review this before proceeding.
              </Alert>
            </DemoLabeledInput>
            <DemoLabeledInput label="Danger with Title">
              <Alert variant="danger" title="Error">
                Something went wrong. Please try again.
              </Alert>
            </DemoLabeledInput>
          </div>
        </DemoSection>

        <DemoSection componentId="alert" title="Alert - Dismissible" shouldShow={shouldShowSection}>
          <div className="demo-row demo-row-column-large">
            <DemoLabeledInput label="Dismissible Success">
              <Alert
                variant="success"
                title="Success"
                dismissible
                onDismiss={() => console.log('Dismissed')}
              >
                Your changes have been saved successfully.
              </Alert>
            </DemoLabeledInput>
            <DemoLabeledInput label="Dismissible Info">
              <Alert
                variant="info"
                title="Information"
                dismissible
                onDismiss={() => console.log('Dismissed')}
              >
                Here's some helpful information for you.
              </Alert>
            </DemoLabeledInput>
          </div>
        </DemoSection>

        <DemoSection componentId="alert" title="Alert - Without Icon" shouldShow={shouldShowSection}>
          <div className="demo-row demo-row-column-large">
            <DemoLabeledInput label="Alert without Icon">
              <Alert variant="info" icon={null}>
                This alert has no icon.
              </Alert>
            </DemoLabeledInput>
            <DemoLabeledInput label="Alert without Icon (with Title)">
              <Alert variant="success" title="Success" icon={null}>
                This alert has no icon but includes a title.
              </Alert>
            </DemoLabeledInput>
          </div>
        </DemoSection>

        <DemoSection componentId="alert" title="Alert - Custom Icon" shouldShow={shouldShowSection}>
          <div className="demo-row demo-row-column-large">
            <DemoLabeledInput label="Custom Icon">
              <Alert variant="info" icon={<SearchIcon />}>
                This alert uses a custom icon instead of the default.
              </Alert>
            </DemoLabeledInput>
            <DemoLabeledInput label="Custom Icon (with Title)">
              <Alert variant="warning" title="Custom Warning" icon={<CloseIcon />}>
                This alert uses a custom icon and includes a title.
              </Alert>
            </DemoLabeledInput>
          </div>
        </DemoSection>

        {/* Tabs */}
        <DemoSection componentId="tabs" title="Tabs - Basic" shouldShow={shouldShowSection}>
          <div className="demo-row demo-row-column-large">
            <Tabs defaultValue="tab1">
              <Tabs.TabsList>
                <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
                <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
                <Tabs.Tab value="tab3">Tab 3</Tabs.Tab>
              </Tabs.TabsList>
              <Tabs.TabPanel value="tab1">
                <p>Content for Tab 1</p>
              </Tabs.TabPanel>
              <Tabs.TabPanel value="tab2">
                <p>Content for Tab 2</p>
              </Tabs.TabPanel>
              <Tabs.TabPanel value="tab3">
                <p>Content for Tab 3</p>
              </Tabs.TabPanel>
            </Tabs>
          </div>
        </DemoSection>

        <DemoSection componentId="tabs" title="Tabs - Body Typography" shouldShow={shouldShowSection}>
          <div className="demo-row demo-row-column-xl">
            <div className="demo-card-item">
              <DemoLabeledInput label="Body 1 (16px, 48px min-height)">
                <Tabs defaultValue="tab1">
                  <Tabs.TabsList>
                    <Tabs.Tab value="tab1" body="body1">Body 1 Tab</Tabs.Tab>
                    <Tabs.Tab value="tab2" body="body1">Body 1 Tab</Tabs.Tab>
                    <Tabs.Tab value="tab3" body="body1">Body 1 Tab</Tabs.Tab>
                  </Tabs.TabsList>
                  <Tabs.TabPanel value="tab1">Body 1 tab content</Tabs.TabPanel>
                  <Tabs.TabPanel value="tab2">Body 1 tab content</Tabs.TabPanel>
                  <Tabs.TabPanel value="tab3">Body 1 tab content</Tabs.TabPanel>
                </Tabs>
              </DemoLabeledInput>
            </div>
            <div className="demo-card-item">
              <DemoLabeledInput label="Body 2 (14px, 36px min-height)">
                <Tabs defaultValue="tab1">
                  <Tabs.TabsList>
                    <Tabs.Tab value="tab1" body="body2">Body 2 Tab</Tabs.Tab>
                    <Tabs.Tab value="tab2" body="body2">Body 2 Tab</Tabs.Tab>
                    <Tabs.Tab value="tab3" body="body2">Body 2 Tab</Tabs.Tab>
                  </Tabs.TabsList>
                  <Tabs.TabPanel value="tab1">Body 2 tab content</Tabs.TabPanel>
                  <Tabs.TabPanel value="tab2">Body 2 tab content</Tabs.TabPanel>
                  <Tabs.TabPanel value="tab3">Body 2 tab content</Tabs.TabPanel>
                </Tabs>
              </DemoLabeledInput>
            </div>
          </div>
        </DemoSection>

        <DemoSection componentId="tabs" title="Tabs - Variants" shouldShow={shouldShowSection}>
          <div className="demo-row demo-row-column-xl">
            <div className="demo-card-item">
              <DemoLabeledInput label="Default">
                <Tabs defaultValue="tab1" variant="default">
                  <Tabs.TabsList>
                    <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
                    <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
                    <Tabs.Tab value="tab3">Tab 3</Tabs.Tab>
                  </Tabs.TabsList>
                  <Tabs.TabPanel value="tab1">Default variant content</Tabs.TabPanel>
                  <Tabs.TabPanel value="tab2">Default variant content</Tabs.TabPanel>
                  <Tabs.TabPanel value="tab3">Default variant content</Tabs.TabPanel>
                </Tabs>
              </DemoLabeledInput>
            </div>
            <div className="demo-card-item">
              <DemoLabeledInput label="Contained">
                <Tabs defaultValue="tab1" variant="contained">
                  <Tabs.TabsList>
                    <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
                    <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
                    <Tabs.Tab value="tab3">Tab 3</Tabs.Tab>
                  </Tabs.TabsList>
                  <Tabs.TabPanel value="tab1">Contained variant content</Tabs.TabPanel>
                  <Tabs.TabPanel value="tab2">Contained variant content</Tabs.TabPanel>
                  <Tabs.TabPanel value="tab3">Contained variant content</Tabs.TabPanel>
                </Tabs>
              </DemoLabeledInput>
            </div>
          </div>
        </DemoSection>

        <DemoSection componentId="tabs" title="Tabs - Controlled" shouldShow={shouldShowSection}>
          <div className="demo-row demo-row-column-large">
            <Tabs value={tabsValue} onChange={setTabsValue}>
              <Tabs.TabsList>
                <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
                <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
                <Tabs.Tab value="tab3">Tab 3</Tabs.Tab>
              </Tabs.TabsList>
              <Tabs.TabPanel value="tab1">
                <p>Controlled tab content. Current value: {tabsValue}</p>
              </Tabs.TabPanel>
              <Tabs.TabPanel value="tab2">
                <p>Controlled tab content. Current value: {tabsValue}</p>
              </Tabs.TabPanel>
              <Tabs.TabPanel value="tab3">
                <p>Controlled tab content. Current value: {tabsValue}</p>
              </Tabs.TabPanel>
            </Tabs>
          </div>
        </DemoSection>

        <DemoSection componentId="tabs" title="Tabs - Disabled" shouldShow={shouldShowSection}>
          <div className="demo-row demo-row-column-large">
            <Tabs defaultValue="tab1">
              <Tabs.TabsList>
                <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
                <Tabs.Tab value="tab2" disabled>Disabled Tab</Tabs.Tab>
                <Tabs.Tab value="tab3">Tab 3</Tabs.Tab>
              </Tabs.TabsList>
              <Tabs.TabPanel value="tab1">Content for Tab 1</Tabs.TabPanel>
              <Tabs.TabPanel value="tab2">This content won't be shown</Tabs.TabPanel>
              <Tabs.TabPanel value="tab3">Content for Tab 3</Tabs.TabPanel>
            </Tabs>
          </div>
        </DemoSection>

        {/* Cards */}
        <DemoSection componentId="card" title="Card - States" shouldShow={shouldShowSection}>
          <div className="demo-row demo-card-column">
            <div className="demo-card-item">
              <DemoLabeledInput label="Default">
                <Card
                  icon={<DiamondIcon />}
                  title="Title"
                  badge="New"
                  description="Description - please try to keep card descriptions below 4 lines where possible."
                />
              </DemoLabeledInput>
            </div>
            <div className="demo-card-item">
              <DemoLabeledInput label="Hover (hover over the card)">
                <Card
                  icon={<DiamondIcon />}
                  title="Title"
                  badge="New"
                  description="Description - please try to keep card descriptions below 4 lines where possible."
                />
              </DemoLabeledInput>
            </div>
            <div className="demo-card-item">
              <DemoLabeledInput label="Focus">
                <Card
                  icon={<DiamondIcon />}
                  title="Title"
                  badge="New"
                  description="Description - please try to keep card descriptions below 4 lines where possible."
                  focused
                />
              </DemoLabeledInput>
            </div>
            <div className="demo-card-item">
              <DemoLabeledInput label="Selected">
                <Card
                  icon={<DiamondIcon />}
                  title="Title"
                  badge="New"
                  description="Description - please try to keep card descriptions below 4 lines where possible."
                  selected
                />
              </DemoLabeledInput>
            </div>
            <div className="demo-card-item">
              <DemoLabeledInput label="Disabled">
                <Card
                  icon={<DiamondIcon />}
                  title="Title"
                  badge="New"
                  description="Description - please try to keep card descriptions below 4 lines where possible."
                  disabled
                />
              </DemoLabeledInput>
            </div>
          </div>
        </DemoSection>

        <DemoSection componentId="card" title="Card - Variations" shouldShow={shouldShowSection}>
          <div className="demo-row demo-card-column">
            <div className="demo-card-item">
              <DemoLabeledInput label="Without Badge">
                <Card
                  icon={<DiamondIcon />}
                  title="Title"
                  description="Description - please try to keep card descriptions below 4 lines where possible."
                />
              </DemoLabeledInput>
            </div>
            <div className="demo-card-item">
              <DemoLabeledInput label="Without Icon">
                <Card
                  title="Title"
                  badge="New"
                  description="Description - please try to keep card descriptions below 4 lines where possible."
                />
              </DemoLabeledInput>
            </div>
            <div className="demo-card-item">
              <DemoLabeledInput label="Without Description">
                <Card
                  icon={<DiamondIcon />}
                  title="Title"
                  badge="New"
                />
              </DemoLabeledInput>
            </div>
            <div className="demo-card-item">
              <DemoLabeledInput label="Interactive (Clickable)">
                <Card
                  icon={<DiamondIcon />}
                  title="Title"
                  badge="New"
                  description="Description - please try to keep card descriptions below 4 lines where possible."
                  onClick={() => alert('Card clicked!')}
                />
              </DemoLabeledInput>
            </div>
          </div>
        </DemoSection>

        {/* Edge Cases */}
        <DemoSection componentId="all" title="Edge Cases" shouldShow={shouldShowSection}>
          <div className="demo-row demo-row-wrap">
            <Button size="sm" variant="primary">Small Primary</Button>
            <Button size="lg" variant="tertiary">Large Tertiary</Button>
            <IconButton icon={<CloseIcon />} aria-label="Close" size="sm" />
            <IconButton icon={<SearchIcon />} aria-label="Search" size="lg" />
          </div>
        </DemoSection>

        <DemoSection componentId="multiselect" title='MultiSelect - With "All Venues" Toggle' shouldShow={shouldShowSection}>
          <div className="demo-row demo-row-column-max-400-large">
            <div className="demo-card-item">
              <DemoLabeledInput label="MultiSelect with flush toggle">
                {/* Container for MultiSelect and toggle - flush connection */}
                <div className="multiselect-flush-container multiselect-flush-container-styled">
                  {/* MultiSelect wrapper - override button border */}
                  <div className="multiselect-flush-wrapper">
                    <MultiSelect
                      options={alwaysUseAllOptions}
                      value={alwaysUseAllSelected}
                      onChange={(vals) => {
                        setAlwaysUseAllSelected(vals);
                      }}
                      placeholder="Select venues..."
                      disabled={alwaysUseAllToggle}
                    />
                  </div>
                  
                  {/* Toggle section - flush with MultiSelect */}
                  <div className="multiselect-flush-toggle-section">
                    <Toggle
                      size="sm"
                      checked={alwaysUseAllToggle}
                      onChange={(checked) => {
                        setAlwaysUseAllToggle(checked);
                      }}
                    />
                    <label 
                      className="multiselect-flush-label"
                      onClick={() => setAlwaysUseAllToggle(!alwaysUseAllToggle)}
                    >
                      All venues
                    </label>
                  </div>
                </div>
                
                {/* Demo: Add new option button */}
                <div className="demo-container-mt">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => {
                      const newOption = {
                        value: `option${alwaysUseAllOptions.length + 1}`,
                        label: `Option ${alwaysUseAllOptions.length + 1}`
                      };
                      setAlwaysUseAllOptions([...alwaysUseAllOptions, newOption]);
                    }}
                  >
                    Add New Option (to test auto-select)
                  </Button>
                </div>
              </DemoLabeledInput>
            </div>
          </div>
        </DemoSection>

        {/* Modal */}
        <DemoSection componentId="modal" title="Modal - Sizes" shouldShow={shouldShowSection}>
          <div className="demo-row demo-row-column-max-400">
            <div className="demo-card-item">
              <DemoLabeledInput label="Fullscreen">
                <Button onClick={() => setModalFullscreen(true)}>
                  Open Fullscreen Modal
                </Button>
              </DemoLabeledInput>
            </div>
            <div className="demo-card-item">
              <DemoLabeledInput label="Item Editor (976px)">
                <Button onClick={() => setModalItemEditor(true)}>
                  Open Item Editor Modal
                </Button>
              </DemoLabeledInput>
            </div>
            <div className="demo-card-item">
              <DemoLabeledInput label="Medium (600px)">
                <Button onClick={() => setModalMedium(true)}>
                  Open Medium Modal
                </Button>
              </DemoLabeledInput>
            </div>
            <div className="demo-card-item">
              <DemoLabeledInput label="Small (400px)">
                <Button onClick={() => setModalSmall(true)}>
                  Open Small Modal
                </Button>
              </DemoLabeledInput>
            </div>
          </div>
        </DemoSection>

        {/* Modal Instances */}
        <Modal
          isOpen={modalFullscreen}
          onClose={() => setModalFullscreen(false)}
          title="Fullscreen Modal"
          size="fullscreen"
        >
          <Modal.Body>
            <p>This is a fullscreen modal that takes up the entire viewport.</p>
            <p>Useful for complex views or detailed editing interfaces.</p>
          </Modal.Body>
        </Modal>

        <Modal
          isOpen={modalItemEditor}
          onClose={() => setModalItemEditor(false)}
          title="Edit Item"
          size="item-editor"
        >
          <Modal.Body>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <DemoLabeledInput label="Name">
                <TextInput placeholder="Enter item name..." />
              </DemoLabeledInput>
              <DemoLabeledInput label="Description">
                <TextArea rows={4} placeholder="Enter description..." />
              </DemoLabeledInput>
              <DemoLabeledInput label="Category">
                <Select
                  options={[
                    { value: '1', label: 'Category 1' },
                    { value: '2', label: 'Category 2' },
                    { value: '3', label: 'Category 3' }
                  ]}
                  placeholder="Select category..."
                />
              </DemoLabeledInput>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setModalItemEditor(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setModalItemEditor(false)}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          isOpen={modalMedium}
          onClose={() => setModalMedium(false)}
          title="Simple Form Modal"
          size="medium"
        >
          <Modal.Body>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <DemoLabeledInput label="Email">
                <TextInput type="email" placeholder="Enter email..." />
              </DemoLabeledInput>
              <DemoLabeledInput label="Message">
                <TextArea rows={3} placeholder="Enter message..." />
              </DemoLabeledInput>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setModalMedium(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setModalMedium(false)}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          isOpen={modalSmall}
          onClose={() => setModalSmall(false)}
          title="Confirm Action"
          size="small"
        >
          <Modal.Body>
            <p>Are you sure you want to archive this item? This action cannot be undone.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setModalSmall(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() => setModalSmall(false)}>
              Archive
            </Button>
          </Modal.Footer>
        </Modal>
        </main>
  );
}

export default App;
