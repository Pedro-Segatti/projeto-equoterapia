import React, { useState } from 'react';
import Toolbar from '../toolbar';
import Menu from "../menu";
import Footer from "../footer";
import { ReactNotifications } from 'react-notifications-component';
import { registroSalvo, registroExcluido } from "../../utilitario/mensagemUtil"
import HTTP_STATUS from "../../utilitario/httpStatus";
import { Form, Col, Row, Container } from 'react-bootstrap';
import InputConverter from "../inputConverter";
import { api } from "../../utilitario/baseComunicacao";
import PesquisaPraticantes from '../pesquisas/pesquisaPraticantes';
import PesquisaAgendamentos from '../pesquisas/pesquisaAgendamentos';


const movimentoAgendamentoSessao = () => {
    const [agdId, setAgdId] = useState(null);
    const [agdData, setAgdData] = useState("");
    const [agdHora, setAgdHora] = useState("");
    const [agdPraticante, setAgdPraticante] = useState("");
    const [agdDescricaoPraticante, setAgdDescricaoPraticante] = useState("");
    const [agdDescricao, setAgdDescricao] = useState("");

    const [listPraticantes, setListPraticantes] = useState([]);
    const [abrirPesquisaPraticante, setAbrirPesquisaPraticante] = useState(false);

    const [listAgendamentos, setListAgendamentos] = useState([]);
    const [abrirPesquisaAgendamento, setAbrirPesquisaAgendamento] = useState(false);


    const atualizaAgendamentoSelecionado = (item) => {
        setAgdId(item.agdId)
        setAgdData(item.agdData)
        setAgdHora(item.agdHora)
        setAgdPraticante(item.praticante);
        setAgdDescricaoPraticante(item.praticante.pessoa.pesNome);
        setAgdDescricao(item.agdDescricao);
        setAbrirPesquisaAgendamento(false);
    }

    const atualizaDlgPesquisaPraticante = async () => {
        setListPraticantes(await (await api.get("/pesquisaPraticantes")).data);
        setAbrirPesquisaPraticante(true);
    }

    const atualizaPraticanteSelecionado = (item) => {
        setAgdPraticante(item)
        setAgdDescricaoPraticante(item.pessoa.pesNome)
        setAbrirPesquisaPraticante(false);
    }

    const atualizaDlgPesquisa = async () => {
        setListAgendamentos(await (await api.get("/pesquisaAgendamentos")).data);
        setAbrirPesquisaAgendamento(true);
    }

    const removerAgendamento = async () => {
        try {
            const response = await (await api.delete("/removerAgendamento?agdId=" + agdId));
            if (response.status === HTTP_STATUS.OK) {
                registroExcluido();
                limparCamposFormulario();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const jsonAgendamento = {
            "agdId": agdId,
            "agdData": agdData,
            "agdHora": agdHora,
            "agdDescricao": agdDescricao,
            "praticante": agdPraticante
        }

        console.log(jsonAgendamento);

        const response = await api.post("/cadastrarAgendamento", jsonAgendamento);
        if (response.status === HTTP_STATUS.OK) {
            registroSalvo();
            limparCamposFormulario();
        }


    }

    const limparCamposFormulario = () => {
        setAgdId("");
        setAgdData("");
        setAgdHora("");
        setAgdPraticante("");
        setAgdDescricaoPraticante("");
        setAgdDescricao("");
    }

    return (
        <div>
            <Menu />
            <ReactNotifications />
            <Container className="vh-100">
                <Form onSubmit={handleSubmit}>
                    <br />
                    <Row>
                        <h3>Agendamento de Sessões</h3>
                    </Row>
                    
                    <Row>
                        <Col md="2">
                            <Form.Label htmlFor="inputId">Código</Form.Label>
                            <Form.Control value={agdId} type="text" id="id" disabled />
                        </Col>
                        <Col md="2">
                            <Form.Label htmlFor="inputData">Data</Form.Label>
                            <Form.Control value={agdData}
                                    onChange={(e) => setAgdData(e.target.value)}
                                    type="date" id="inputDate" required />
                        </Col>
                        <Col md="2">
                            <Form.Label htmlFor="inputHora">Hora</Form.Label>
                            <Form.Control value={agdHora}
                                    onChange={(e) => setAgdHora(e.target.value)}
                                    type="time" id="inputHora" required />
                        </Col>
                    </Row>

                    <Row>
                        <Col md="12">
                            <Form.Label htmlFor="inputDescricao">Descrição</Form.Label>
                            <Form.Control value={agdDescricao} maxLength={60}
                                onChange={(e) => setAgdDescricao(e.target.value)}
                                type="text" id="descricao" required />
                        </Col>
                    </Row>

                    <Row>
                        <Col md="6">
                            <Form.Label htmlFor="inputLPraticante">Praticante</Form.Label>
                            <InputConverter descricao={agdDescricaoPraticante} atualizaDlgPesquisa={atualizaDlgPesquisaPraticante} />
                        </Col>
                    </Row>

                    <Toolbar jsonRemove={removerAgendamento} abrirPesquisa={atualizaDlgPesquisa} />
                </Form>
            </Container>

            {abrirPesquisaPraticante &&
                <PesquisaPraticantes setValores={setListPraticantes} valores={listPraticantes} atualizaItemSelecionado={atualizaPraticanteSelecionado} setAbrirPesquisa={setAbrirPesquisaPraticante} />
            }

            {abrirPesquisaAgendamento &&
                <PesquisaAgendamentos setValores={setListAgendamentos} valores={listAgendamentos} atualizaItemSelecionado={atualizaAgendamentoSelecionado} setAbrirPesquisa={setAbrirPesquisaAgendamento} />
            }

            <Footer />
        </div >
    )
}

export default movimentoAgendamentoSessao;