import React from 'react';
import ReactDOM from 'react-dom/client';
import './importCss';
import Menu from './view/menu';
import reportWebVitals from './reportWebVitals';
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
        <Route path="/" element={true ? <Navigate to="/novaPagina"/> : <Navigate to="/outraPagina"/>}/>
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();