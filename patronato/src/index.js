import React from 'react';
import ReactDOM from 'react-dom/client';
import './importCss';
import Menu from './view/menu';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';

import NovaPagina from './view/novaPagina';
import CadastroAnimais from './view/cadastroAnimais';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Menu />
      <Routes>
        <Route path='/novaPagina' element={<NovaPagina />} />
        <Route path='/cadastroAnimais' element={<CadastroAnimais />} />
        <Route path="/" element={true ? <Navigate to="/novaPagina"/> : <Navigate to="/outraPagina"/>}/>
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();