import React from "react";
import { Button } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';


const Toolbar = ({ jsonCadastro, jsonRemove, abrirPesquisa }) => {
  const reloadPage = (e) => {
    e.preventDefault();
    window.location.reload(true);
  };

  return (
    <div className="nossoToolbar">
      <br />

      <Container>
        <Row>
          <Col md="12">
            <Button variant="primary" className='btn-success btnToolbar btnMarginTop' type="submit">Salvar</Button>
            <Button variant="primary" className='btn-warning btnToolbar btnMarginTop' type="button" onClick={reloadPage}>Cancelar</Button>
            <Button variant="primary" className='btn-info btnToolbar btnMarginTop' onClick={abrirPesquisa}>Pesquisar</Button>
            <Button variant="primary" className='btn-danger btnToolbar btnMarginTop' type="submit" onClick={jsonRemove}>Excluir</Button>
          </Col>
        </Row>
      </Container>

      <br />
    </div >
  );
};
export default Toolbar;
