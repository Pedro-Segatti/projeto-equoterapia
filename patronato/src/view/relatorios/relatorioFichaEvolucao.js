import React, { useState } from "react";
import Menu from "../menu";
import Footer from "../footer";
import { ReactNotifications } from "react-notifications-component";
import { Col, Form, Button, Row, Container } from "react-bootstrap";
import { gerarRelatorio } from "../../utilitario/baseRelatorios";
import InputConverter from '../componentes/inputConverter';
import { api } from "../../utilitario/baseComunicacao";
import PesquisaPraticantes from '../pesquisas/pesquisaPraticantes';

const relatorioFichaEvolucao = () => {

  const [evolDataIni, setEvolDataIni] = useState("");
  const [evolDataFim, setEvolDataFim] = useState("");
  const [evolIdPrat, setEvolIdPrat] = useState({"pessoa": {"pesNome":""}});
  const [abrirPesquisaPraticante, setAbrirPesquisaPraticante] = useState(false);

  var [listPraticante, setListPraticante] = useState([]);

  const atualizaDlgPesquisaPraticante = async () => {
    setListPraticante(await (await api.get("/pesquisaPraticantes")).data);
    setAbrirPesquisaPraticante(true);
  }

  const atualizaPraticanteSelecionado = (item) => {
    setEvolIdPrat(item);
    setAbrirPesquisaPraticante(false);
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    const json = {
      "nomeRelatorio" : 'fichaEvolucao',
      "parametros": {
      "nomeFuncionario" : ''
      },
      "filtros": {
        "dataIni" : evolDataIni,
        "dataFim" : evolDataFim,
        "pratId": evolIdPrat.pratId
      }
    }
    gerarRelatorio("relatorioFichaEvolucao","Ficha_de_Evolução",json);
  };

  return (
    <div>
      <Menu tituloPagina={"Relatório de Ficha de Evolução"} />
      <ReactNotifications />
      <Container className="vh-100">
        <Form onSubmit={handleSubmit}>
          <br />
          <Row>
            <h3>Relatório de Ficha de Evolução</h3>
          </Row>

          <Row>
            <Col md="2">
                <Form.Label htmlFor="inputDataIni">Data Inicial</Form.Label>
                <Form.Control value={evolDataIni}
                    onChange={(e) => setEvolDataIni(e.target.value)}
                    type="date" id="inputDataIni" required />
            </Col>
            <Col md="2">
                <Form.Label htmlFor="inputDataFim">Data Final</Form.Label>
                <Form.Control value={evolDataFim}
                    onChange={(e) => setEvolDataFim(e.target.value)}
                    type="date" id="inputDataFim" required />
            </Col>
          </Row>

          <Row>
              <Col md="6">
                  <Form.Label id='txTeste' htmlFor="inputPraticante">Praticante</Form.Label>
                  <InputConverter idBtn={"botaoPraticante"} descricao={evolIdPrat.pessoa.pesNome} atualizaDlgPesquisa={atualizaDlgPesquisaPraticante} />
              </Col>
          </Row>

          <div className="nossoToolbar">
            <br/>
            <Button
              variant="primary"
              className="btn-success btnToolbar btnMarginTop"
              type="submit"
            >
              Imprimir
            </Button>
          </div>
        </Form>
      </Container>
      {abrirPesquisaPraticante &&
          <PesquisaPraticantes setValores={setListPraticante} valores={listPraticante} atualizaItemSelecionado={atualizaPraticanteSelecionado} setAbrirPesquisa={setAbrirPesquisaPraticante} />
      }
      <Footer />
    </div>
  );
};

export default relatorioFichaEvolucao;
