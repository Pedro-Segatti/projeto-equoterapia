import React, { useState } from 'react';
import { Form, Col, Row, Container } from 'react-bootstrap';
import Toolbar from '../toolbar';
import PesquisaMontaria from "../pesquisas/pesquisaMontaria";
import { registroSalvo } from "../../utilitario/mensagemUtil"
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { api } from "../../utilitario/baseComunicacao";
import Menu from "../menu"
import Footer from "../footer"

function cadastroMontaria() {
    const [abrirPesquisa, setAbrirPesquisa] = useState(false);

    //Variáveis de cadastro
    const [montId, setMontId] = useState("");
    const [montDescricao, setMontDescricao] = useState("");

    //variáveis da dialog de pesquisa
    var [list, setList] = useState('[]');

    const atualizaDlgPesquisa = async () => {
        setList(await (await api.get("/pesquisaMontaria")).data);
        setAbrirPesquisa(true);
    }

    const atualizaItemSelecionado = (item) => {
        setMontId(item.montId);
        setMontDescricao(item.montDescricao);
        setAbrirPesquisa(false);
    }

    const enviaJsonGravar = () => {
        const json = {
            "montId": montId,
            "montDescricao": montDescricao
        };
        api.post("/cadastraMontaria", json);
        registroSalvo();
    }

    const enviaJsonRemove = () => {
        api.delete("/removeMontaria?montId=" + montId);
    }

    const cadastroMontaria = () => {
        return (
            <div>
                <Menu />
                <Container className="vh-100">
                    <ReactNotifications />
                    <Form>
                        <br />
                        <Row>
                            <h3>Cadastro de Montaria</h3>
                        </Row>
                        <Row>
                            <Col md="2">
                                <Form.Label htmlFor="inputId">Código</Form.Label>
                                <Form.Control value={montId} type="text" id="id" disabled />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <Form.Label htmlFor="inputDescricao">Descrição</Form.Label>
                                <Form.Control value={montDescricao}
                                    onChange={(e) => setMontDescricao(e.target.value)}
                                    type="text" id="descricao" required />
                            </Col>
                        </Row>
                        <br />
                        <Toolbar jsonCadastro={enviaJsonGravar} jsonRemove={enviaJsonRemove} abrirPesquisa={atualizaDlgPesquisa} />
                    </Form>
                </Container>
                {abrirPesquisa &&
                    <PesquisaMontaria setValores={setList} valores={list} atualizaItemSelecionado={atualizaItemSelecionado} setAbrirPesquisa={setAbrirPesquisa} />
                }
                <Footer />
            </div >
        )
    }
    return cadastroMontaria();
}
export default cadastroMontaria;