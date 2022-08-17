import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Menu from './view/menu.js';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Menu />
  </React.StrictMode>
);

reportWebVitals();