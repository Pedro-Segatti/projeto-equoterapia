import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Menu from './view/menu';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';

import NovaPagina from './view/novaPagina';
import OutraPagina from './view/outraPagina';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Menu />
      <Routes>
        <Route path='/novaPagina' element={<NovaPagina />} />
        <Route path='/outraPagina' element={<OutraPagina />} />
        <Route path="/auth" element={<Navigate to="/novaPagina" />}/>
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();