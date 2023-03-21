import React, { useState } from "react";
import Menu from "../menu";
import Footer from "../footer";
import Carregando from "../carregando";
import { ReactNotifications } from "react-notifications-component";
import { Form, Button, Row, Container, Col } from "react-bootstrap";
import { gerarRelatorio } from "../../utilitario/baseRelatorios";

const relatorioAgendamentos = () => {

  const [agdDataInicial, setAgdDataInicial] = useState("");
  const [agdDataFinal, setAgdDataFinal] = useState("");
  const [agdConcluido, setAgdConcluido] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    
    const json = {
      "nomeRelatorio": 'relatAgendamentos',
      "parametros": {
        "nomeFuncionario": ''
      },
      "filtros": {
        "agdDataIncial": agdDataInicial,
        "agdDataFinal": agdDataFinal,
        "agdConcluido": agdConcluido,
      }
    }
    await gerarRelatorio("relatorioAgendamentos", "Relatorio_de_Agendamentos", json);

    setLoading(false);
  };

  return (
    <div>
      <Menu tituloPagina={"Relatório de Agendamentos"} />
      <ReactNotifications />
      <Carregando showCarregando={loading} />
      <Container className="vh-100">
        <Form onSubmit={handleSubmit}>
          <br />
          <Row>
            <h3>Relatório de Agendamentos</h3>
          </Row>

          <Row>
            <Col md="4">
              <Form.Label htmlFor="inputDataInicial">Data Inicial</Form.Label>
              <Form.Control value={agdDataInicial}
                onChange={(e) => setAgdDataInicial(e.target.value)}
                type="date" id="inputDataInicial" />
            </Col>
            <Col md="4">
              <Form.Label htmlFor="inputDataFinal">Data Final</Form.Label>
              <Form.Control value={agdDataFinal}
                onChange={(e) => setAgdDataFinal(e.target.value)}
                type="date" id="inputDate" />
            </Col>
            <Col md="4">
              <Form.Label htmlFor="checkConcluido"></Form.Label>
              <Form.Check id="checkConcluido" checked={agdConcluido}
                onChange={(e) => setAgdConcluido(e.target.checked)}
                type="checkbox" label="Concluído" />
            </Col>
          </Row>

          <div className="nossoToolbar">
            <br />
            <Button
              variant="primary"
              className="btn-success btnToolbar btnMarginTop"
              type="submit" >
              Imprimir
            </Button>
          </div>
        </Form>
      </Container>

      <Footer />
    </div>
  );
};

export default relatorioAgendamentos;
