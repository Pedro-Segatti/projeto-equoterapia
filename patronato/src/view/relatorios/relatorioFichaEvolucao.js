import React from "react";
import Menu from "../menu";
import Footer from "../footer";
import { ReactNotifications } from "react-notifications-component";
import { Form, Button, Row, Container } from "react-bootstrap";
import { gerarRelatorio } from "../../utilitario/baseRelatorios";

const relatorioFichaEvolucao = () => {

  const handleSubmit = async (e) => {
    e.preventDefault();
    const json = {
      "nomeRelatorio" : 'fichaEvolucao',
      "parametros": {
      "nomeFuncionario" : 'Jorge'
      },
      "filtros": {
        "teste" : "teste"
      }
    }
    gerarRelatorio("relatorioFichaEvolucao","Ficha_de_Evolução",json);
  };

  return (
    <div>
      <Menu />
      <ReactNotifications />
      <Container className="vh-100">
        <Form onSubmit={handleSubmit}>
          <br />
          <Row>
            <h3>Relatório de Ficha de Evolução</h3>
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

export default relatorioFichaEvolucao;
