import React from "react";
import { Button } from 'react-bootstrap';


const Toolbar = ({ jsonCadastro, jsonRemove, abrirPesquisa }) => {
  return (
    <>
      <div>
        <Button variant="primary" className='btn-success btnToolbar' type="submit" onClick={jsonCadastro}>Salvar</Button>
        <Button variant="primary" className='btn-info btnToolbar' onClick={abrirPesquisa}>Pesquisar</Button>
        <Button variant="primary" className='btn-danger btnToolbar' type="submit" onClick={jsonRemove}>Excluir</Button>
      </div>
      <br />
    </>
  );
};
export default Toolbar;
