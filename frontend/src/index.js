import React from 'react';

import ReactDOM from 'react-dom/client';
import './index.css';
import "./importCss"
import reportWebVitals from './reportWebVitals';
import Rotas from './Rotas';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Rotas />
);

reportWebVitals();