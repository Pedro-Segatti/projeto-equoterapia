import React, { useState } from "react";
import Menu from "../menu";
import Footer from "../footer";
import { ReactNotifications } from "react-notifications-component";
import { Form, Button, Row, Container } from "react-bootstrap";
import { api } from "../../utilitario/baseComunicacao";
import { saveAs } from "file-saver";

const relatorioFuncionarios = () => {
    
    const baixarArquivo = async () => {
    const pdf = await api.get("/pdf");
    var blob = new Blob([pdf.data], { type: 'application/pdf' });
    var url = URL.createObjectURL(blob);
    window.open(url);
   // saveAs(pdf.data, "relatorio_de_funcionarios.pdf");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    baixarArquivo();
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
