import React, { useState } from 'react';
import { Form, Col, Row, Container } from 'react-bootstrap';
import Toolbar from '../toolbar';
import { registroSalvo, registroExcluido, mensagemCustomizada } from "../../utilitario/mensagemUtil";
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { api } from "../../utilitario/baseComunicacao";
import Menu from "../menu";
import Footer from "../footer";
import HTTP_STATUS from "../../utilitario/httpStatus";
import PesquisaCidade from "../pesquisas/pesquisaCidade";
import PesquisaBairro from "../pesquisas/pesquisaBairro";
import InputConverter from "../inputConverter";

function cadastroBairro() {
    const [abrirPesquisa, setAbrirPesquisa] = useState(false);
    const [abrirPesquisaCidade, setAbrirPesquisaCidade] = useState(false);
    var [list, setList] = useState([]);
    var [listCidade, setListCidade] = useState([]);

    //Variáveis de cadastro
    const [barId, setBarId] = useState("");
    const [barNome, setBarNome] = useState("");
    const [cidade, setCidade] = useState({"cidNome":""});

    const atualizaDlgPesquisa = async () => {
        setList(await (await api.get("/pesquisaBairro?barNome=")).data);
        setAbrirPesquisa(true);
    }

    const atualizaDlgPesquisaCidade = async () => {
        setListCidade(await (await api.get("/pesquisaCidade?cidNome=")).data);
        setAbrirPesquisaCidade(true);
    }

    const atualizaItemSelecionado = (item) => {
        setBarId(item.barId);
        setBarNome(item.barNome);
        setCidade(item.cidade);
        setAbrirPesquisa(false);
    }

    const atualizaCidadeSelecionada = (item) => {
        setCidade(item);
        setAbrirPesquisaCidade(false);
    }

    const enviaJsonGravar = () => {
        const json = {
            "barId": barId,
            "barNome": barNome,
            "cidade": cidade
        };
        api.post("/cadastraBairro", json);
        registroSalvo();
    }

    const enviaJsonRemove = async () => {
        if (barId === "") {
            return;
        }
        try {
            const response = await (await api.delete("/removeBairro?barId=" + barId));
            if (response.status === HTTP_STATUS.OK) {
                registroExcluido();
                limparCamposFormulario();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const limparCamposFormulario = () => {
        setBarId("");
        setBarNome("");
        setCidade({"cidNome":""});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(cidade.cidNome === ""){
            mensagemCustomizada("Selecione uma Cidade","warning");
            document.getElementById("btnCidade").focus();
            return;
        }
        enviaJsonGravar();
        limparCamposFormulario();
    }

    const cadastroBairro = () => {
        return (
            <div>
                <Menu />
                <ReactNotifications />
                <Container className="vh-100">
                    <Form onSubmit={handleSubmit}>
                        <br />
                        <Row>
                            <h3>Cadastro de Bairro</h3>
                        </Row>
                        <Row>
                            <Col md="2">
                                <Form.Label htmlFor="id">Código</Form.Label>
                                <Form.Control value={barId} type="text" id="id" disabled />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <Form.Label htmlFor="bairro">Nome</Form.Label>
                                <Form.Control value={barNome} maxLength={100}
                                    onChange={(e) => setBarNome(e.target.value)}
                                    type="text" id="bairro" required />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                            <Form.Label>Cidade</Form.Label>
                                <InputConverter idBtn={"btnCidade"} descricao={cidade.cidNome} atualizaDlgPesquisa={atualizaDlgPesquisaCidade} />
                            </Col>
                        </Row>
                        <br />
                        <Toolbar jsonRemove={enviaJsonRemove} abrirPesquisa={atualizaDlgPesquisa} />
                    </Form>
                </Container>
                {abrirPesquisaCidade &&
                    <PesquisaCidade setValores={setListCidade} valores={listCidade} atualizaItemSelecionado={atualizaCidadeSelecionada} setAbrirPesquisa={setAbrirPesquisaCidade} />
                }
                {abrirPesquisa &&
                    <PesquisaBairro setValores={setList} valores={list} atualizaItemSelecionado={atualizaItemSelecionado} setAbrirPesquisa={setAbrirPesquisa} />
                }
                <Footer />
            </div >
        )
    }
    return cadastroBairro();
}
export default cadastroBairro;