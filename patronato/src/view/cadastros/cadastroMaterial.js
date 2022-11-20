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
import PesquisaMaterial from '../pesquisas/pesquisaMaterial';

function cadastroMaterial() {
    const [abrirPesquisa, setAbrirPesquisa] = useState(false);
    var [list, setList] = useState('[]');

    //Variáveis de cadastro
    const [matId, setMatId] = useState("");
    const [matDescricao, setMatDescricao] = useState("");

    const atualizaDlgPesquisa = async () => {
        setList(await (await api.get("/pesquisaMaterial?matId=&matDescricao=")).data);
        setAbrirPesquisa(true);
    }

    const atualizaItemSelecionado = (item) => {
        setMatId(item.matId);
        setMatDescricao(item.matDescricao);
        setAbrirPesquisa(false);
    }

    const enviaJsonGravar = () => {
        const json = {
            "matId": matId,
            "matDescricao": matDescricao,
        };
        api.post("/cadastraMaterial", json);
        registroSalvo();
    }

    const enviaJsonRemove = async () => {
        if (matId === "") {
            return;
        }
        try {
            const response = await (await api.delete("/removeMaterial?matId=" + matId));
            if (response.status === HTTP_STATUS.OK) {
                registroExcluido();
                limparCamposFormulario();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const limparCamposFormulario = () => {
        setMatId("");
        setMatDescricao("");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        enviaJsonGravar();
        limparCamposFormulario();
    }

    const cadastroMaterial = () => {
        return (
            <div>
                <Menu />
                <ReactNotifications />
                <Container className="vh-100">
                    <Form onSubmit={handleSubmit}>
                        <br />
                        <Row>
                            <h3>Cadastro de Materiais</h3>
                        </Row>
                        <Row>
                            <Col md="2">
                                <Form.Label htmlFor="inputId">Código</Form.Label>
                                <Form.Control value={matId} type="text" id="id" disabled />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="12">
                                <Form.Label htmlFor="inputDescricao">Descrição</Form.Label>
                                <Form.Control value={matDescricao} maxLength={60}
                                    onChange={(e) => setMatDescricao(e.target.value)}
                                    type="text" id="descricao" required />
                            </Col>
                        </Row>
                        <br />
                        <Toolbar jsonRemove={enviaJsonRemove} abrirPesquisa={atualizaDlgPesquisa} />
                    </Form>
                </Container>
                {abrirPesquisa &&
                    <PesquisaMaterial setValores={setList} valores={list} atualizaItemSelecionado={atualizaItemSelecionado} setAbrirPesquisa={setAbrirPesquisa} />
                }
                <Footer />
            </div >
        )
    }
    return cadastroMaterial();
}
export default cadastroMaterial;