import React from "react";
import { Button, Col, Row } from 'react-bootstrap';


const Toolbar = ({ json, jsonRemove }) => {
  return (
    <div>
      <Button variant="primary" className='btn-success btnToolbar' onClick={json}>Salvar</Button>
      <Button variant="primary" className='btn-danger btnToolbar' onClick={jsonRemove}>Excluir</Button>
    </div>
  );
};
export default Toolbar;
