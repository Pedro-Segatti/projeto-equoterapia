import React from "react";
import Menu from "../menu";
import Footer from "../footer";
import { ReactNotifications } from "react-notifications-component";
import { Form, Button, Row, Container } from "react-bootstrap";
import { gerarRelatorio } from "../../utilitario/baseRelatorios";

const relatorioFuncionarios = () => {

  const handleSubmit = async (e) => {
    e.preventDefault();
    const json = {
      "nomeRelatorio" : 'relatFuncionario',
      "parametros": {
      "nomeFuncionario" : 'Jorge'
      },
      "filtros": {
        "teste" : "teste"
      }
    }
    gerarRelatorio("relatorioFuncionarios","Relatorio_de_funcionarios",json);
  };

  return (
    <div>
      <Menu />
      <ReactNotifications />
      <Container className="vh-100">
        <Form onSubmit={handleSubmit}>
          <br />
          <Row>
            <h3>Relatório de Funcionários</h3>
          </Row>

          <Button
            variant="primary"
            className="btn-success btnToolbar btnMarginTop"
            type="submit"
          >
            Imprimir
          </Button>
        </Form>
      </Container>

      <Footer />
    </div>
  );
};

export default relatorioFuncionarios;
