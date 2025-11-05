import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './examples/App.jsx';
import './tokens/design-tokens.css';
import './tokens/layout-utilities.css';
import './components/buttons/Button.css';
import './components/buttons/IconButton.css';
import './components/buttons/ButtonGroup.css';
import './components/data-display/Card.css';
import './components/feedback/Alert.css';
import './components/inputs/NumberInput.css';
import './components/inputs/PasswordInput.css';
import './components/inputs/PhoneInput.css';
import './components/inputs/InputGroup.css';
import './components/uploads/ImageUpload.css';
import './components/uploads/AvatarUpload.css';
import './components/layout/Modal.css';
import './examples/App.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
