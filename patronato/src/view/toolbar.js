import React from "react";
import { Button } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import { reloadPage } from '../utilitario/patronatoUtil';


const Toolbar = ({ jsonRemove, abrirPesquisa, cancelarHidden, pesquisarHidden, excluirHidden }) => {
  return (
    <div className="nossoToolbar">
      <br />

      <Container>
        <Row>
          <Col md="12">
            <Button variant="primary" className='btn-success btnToolbar btnMarginTop' type="submit">Salvar</Button>
            {!cancelarHidden && <Button variant="primary" className='btn-warning btnToolbar btnMarginTop' type="button" onClick={reloadPage}>Cancelar</Button>}
            {!pesquisarHidden && <Button variant="primary" className='btn-info btnToolbar btnMarginTop' onClick={abrirPesquisa}>Pesquisar</Button>}
            {!excluirHidden && <Button variant="primary" className='btn-danger btnToolbar btnMarginTop' onClick={jsonRemove} >Excluir</Button>}
          </Col>
        </Row>
      </Container>

      <br />
    </div >
  );
};
export default Toolbar;
