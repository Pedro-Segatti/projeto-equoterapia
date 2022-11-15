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
import PesquisaPicadeiro from '../pesquisas/pesquisaPicadeiro';

function cadastroPicadeiro() {
    const [abrirPesquisa, setAbrirPesquisa] = useState(false);
    var [list, setList] = useState('[]');

    //Variáveis de cadastro
    const [picId, setPicId] = useState("");
    const [picDescricao, setPicDescricao] = useState("");

    const atualizaDlgPesquisa = async () => {
        setList(await (await api.get("/pesquisaPicadeiro?picId=&picDescricao=")).data);
        setAbrirPesquisa(true);
    }

    const atualizaItemSelecionado = (item) => {
        setPicId(item.picId);
        setPicDescricao(item.picDescricao);
        setAbrirPesquisa(false);
    }

    const enviaJsonGravar = () => {
        const json = {
            "picId": picId,
            "picDescricao": picDescricao,
        };
        api.post("/cadastraPicadeiro", json);
        registroSalvo();
    }

    const enviaJsonRemove = async () => {
        if (picId === "") {
            return;
        }
        try {
            const response = await (await api.delete("/removePicadeiro?picId=" + picId));
            if (response.status === HTTP_STATUS.OK) {
                registroExcluido();
                limparCamposFormulario();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const limparCamposFormulario = () => {
        setPicId("");
        setPicDescricao("");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        enviaJsonGravar();
        limparCamposFormulario();
    }

    const cadastroPicadeiro = () => {
        return (
            <div>
                <Menu />
                <ReactNotifications />
                <Container className="vh-100">
                    <Form onSubmit={handleSubmit}>
                        <br />
                        <Row>
                            <h3>Cadastro de Picadeiro</h3>
                        </Row>
                        <Row>
                            <Col md="2">
                                <Form.Label htmlFor="inputId">Código</Form.Label>
                                <Form.Control value={picId} type="text" id="id" disabled />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <Form.Label htmlFor="inputDescricao">Descrição</Form.Label>
                                <Form.Control value={picDescricao} maxLength={50}
                                    onChange={(e) => setPicDescricao(e.target.value)}
                                    type="text" id="descricao" required />
                            </Col>
                        </Row>
                        <br />
                        <Toolbar jsonRemove={enviaJsonRemove} abrirPesquisa={atualizaDlgPesquisa} />
                    </Form>
                </Container>
                {abrirPesquisa &&
                    <PesquisaPicadeiro setValores={setList} valores={list} atualizaItemSelecionado={atualizaItemSelecionado} setAbrirPesquisa={setAbrirPesquisa} />
                }
                <Footer />
            </div >
        )
    }
    return cadastroPicadeiro();
}
export default cadastroPicadeiro;