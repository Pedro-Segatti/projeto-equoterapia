import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "./importCss"
import Menu from './view/menu.js';
import Footer from './view/footer.js'
import Login from './view/login.js'
import reportWebVitals from './reportWebVitals';
import Rotas from './Rotas';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Rotas />
);

reportWebVitals();