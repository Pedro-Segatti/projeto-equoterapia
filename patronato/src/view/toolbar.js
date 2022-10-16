import React from "react";
import { Button } from 'react-bootstrap';


const Toolbar = ({ jsonCadastro, jsonRemove, abrirPesquisa }) => {
  const reloadPage = (e) => { 
    e.preventDefault();
    window.location.reload(true); 
  };

  return (
    <div className="nossoToolbar">
      <Button variant="primary" className='btn-success btnToolbar btnMarginTop' type="submit" onClick={jsonCadastro}>Salvar</Button>
      <Button variant="primary" className='btn-warning btnToolbar btnMarginTop' type="button" onClick={reloadPage}>Cancelar</Button>
      <Button variant="primary" className='btn-info btnToolbar btnMarginTop' onClick={abrirPesquisa}>Pesquisar</Button>
      <Button variant="primary" className='btn-danger btnToolbar btnMarginTop' type="submit" onClick={jsonRemove}>Excluir</Button>
      <br />
    </div >
  );
};
export default Toolbar;
