import React, { useState } from "react";
import Menu from "../menu";
import Footer from "../footer";
import { ReactNotifications } from "react-notifications-component";
import { Form, Button, Row, Container } from "react-bootstrap";
import { gerarRelatorio } from "../../utilitario/baseRelatorios";
import Carregando from "../carregando";

const relatorioFuncionarios = () => {

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const json = {
      "nomeRelatorio" : 'relatFuncionario',
      "parametros": {
      "nomeFuncionario" : 'Jorge'
      },
      "filtros": {
        "teste" : "teste"
      }
    }
    await gerarRelatorio("relatorioFuncionarios","Relatorio_de_funcionarios",json);
    setLoading(false);
  };

  return (
    <div>
      <Menu tituloPagina={"Relatório de Funcionários"} />
      <ReactNotifications />
      <Carregando showCarregando={loading} />
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
