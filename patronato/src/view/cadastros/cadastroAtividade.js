import React, { useState } from 'react';
import { Form, Col, Row, Container } from 'react-bootstrap';
import Toolbar from '../toolbar';
import { registroSalvo, registroExcluido } from "../../utilitario/mensagemUtil";
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { api } from "../../utilitario/baseComunicacao";
import Menu from "../menu";
import Footer from "../footer";
import HTTP_STATUS from "../../utilitario/httpStatus";
import PesquisaAtividade from '../pesquisas/pesquisaAtividade';

function cadastroAtividade() {
    const [abrirPesquisa, setAbrirPesquisa] = useState(false);
    var [list, setList] = useState('[]');

    //Variáveis de cadastro
    const [atvId, setAtvId] = useState("");
    const [atvDescricao, setAtvDescricao] = useState("");
    const [atvDuracao, setAtvDuracao] = useState("");

    const atualizaDlgPesquisa = async () => {
        setList(await (await api.get("/pesquisaAtividade?atvId=&atvDescricao=")).data);
        setAbrirPesquisa(true);
    }

    const atualizaItemSelecionado = (item) => {
        setAtvId(item.atvId);
        setAtvDescricao(item.atvDescricao);
        setAtvDuracao(item.atvDuracao);
        setAbrirPesquisa(false);
    }

    const enviaJsonGravar = () => {
        const json = {
            "atvId": atvId,
            "atvDescricao": atvDescricao,
            "atvDuracao": atvDuracao,
        };
        api.post("/cadastraAtividade", json);
        registroSalvo();
    }

    const enviaJsonRemove = async () => {
        if (atvId === "") {
            return;
        }
        try {
            const response = await (await api.delete("/removeAtividade?atvId=" + atvId));
            if (response.status === HTTP_STATUS.OK) {
                registroExcluido();
                limparCamposFormulario();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const limparCamposFormulario = () => {
        setAtvId("");
        setAtvDescricao("");
        setAtvDuracao("");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        enviaJsonGravar();
        limparCamposFormulario();
    }

    const cadastroAtividade = () => {
        return (
            <div>
                <Menu tituloPagina={"Cadastro de Atividade"} />
                <ReactNotifications />
                <Container className="vh-100">
                    <Form onSubmit={handleSubmit}>
                        <br />
                        <Row>
                            <h3>Cadastro de Atividade</h3>
                        </Row>
                        <Row>
                            <Col md="2">
                                <Form.Label htmlFor="inputId">Código</Form.Label>
                                <Form.Control value={atvId} type="text" id="id" disabled />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="12">
                                <Form.Label htmlFor="inputDescricao">Descrição *</Form.Label>
                                <Form.Control value={atvDescricao} maxLength={100}
                                    onChange={(e) => setAtvDescricao(e.target.value)}
                                    type="text" id="descricao" required />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <Form.Label htmlFor="inputDuracao">Duração (min) *</Form.Label>
                                <Form.Control value={atvDuracao} min={1} max={1000}
                                    onChange={(e) => setAtvDuracao(e.target.value)}
                                    type="number" id="duracao" required />
                            </Col>
                        </Row>

                        <br />
                        <Toolbar jsonRemove={enviaJsonRemove} abrirPesquisa={atualizaDlgPesquisa} />
                    </Form>
                </Container>
                {abrirPesquisa &&
                    <PesquisaAtividade setValores={setList} valores={list} atualizaItemSelecionado={atualizaItemSelecionado} setAbrirPesquisa={setAbrirPesquisa} />
                }
                <Footer />
            </div >
        )
    }
    return cadastroAtividade();
}
export default cadastroAtividade;