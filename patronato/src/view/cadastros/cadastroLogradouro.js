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
import PesquisaLogradouros from "../pesquisas/pesquisaLogradouro";
import PesquisaBairro from "../pesquisas/pesquisaBairro";
import InputConverter from "../componentes/inputConverter";
import Carregando from "../carregando";

function cadastroLogradouro() {
    const [abrirPesquisa, setAbrirPesquisa] = useState(false);
    const [abrirPesquisaBairro, setAbrirPesquisaBairro] = useState(false);
    var [list, setList] = useState([]);
    var [listBairro, setListBairro] = useState([]);

    //Variáveis de cadastro
    const [logId, setLogId] = useState("");
    const [logDescricao, setLogDescricao] = useState("");
    const [logCep, setLogCep] = useState("");
    const [bairro, setBairro] = useState({ "barNome": "" });

    const [loading, setLoading] = useState(false);

    const atualizaDlgPesquisa = async () => {
        setList(await (await api.get("/pesquisaLogradouros?logDesc=")).data);
        setAbrirPesquisa(true);
    }

    const atualizaDlgPesquisaBairro = async () => {
        setListBairro(await (await api.get("/pesquisaBairro?barNome=")).data);
        setAbrirPesquisaBairro(true);
    }

    const atualizaItemSelecionado = (item) => {
        setLogId(item.logId);
        setLogDescricao(item.logDescricao);
        setLogCep(item.logCep);
        setBairro(item.bairro);
        setAbrirPesquisa(false);
    }

    const atualizaBairroSelecionado = (item) => {
        setBairro(item);
        setAbrirPesquisaBairro(false);
    }

    const enviaJsonGravar = async () => {
        const json = {
            "logId": logId,
            "logDescricao": logDescricao,
            "logCep": logCep,
            "bairro": bairro
        };
        await api.post("/cadastraLogradouro", json);
        registroSalvo();
        setLoading(false);
    }

    const enviaJsonRemove = async () => {
        if (logId === "") {
            return;
        }
        try {
            const response = await (await api.delete("/removeLogradouro?logId=" + logId));
            if (response.status === HTTP_STATUS.OK) {
                registroExcluido();
                limparCamposFormulario();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const atualizaCep = async (cep) => {
        setLogCep(cep);
        if (cep.length === 8) {
            try {
                const response = await (await api.get("/logradouroPorCep?cep=" + cep));
                setBairro(response.data.bairro);
                setLogDescricao(response.data.logDescricao);
                setLogCep(response.data.logCep);
                setLogId(response.data.logId);
            } catch (error) {
            }
        }
    }

    const limparCamposFormulario = () => {
        setLogId("");
        setLogDescricao("");
        setLogCep("");
        setBairro({ "barNome": "" });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (bairro.barNome === "") {
            mensagemCustomizada("Selecione um Bairro", "warning");
            document.getElementById("btnBairro").focus();
            return;
        }
        setLoading(true);
        enviaJsonGravar();
        limparCamposFormulario();
    }

    const cadastroLogradouro = () => {
        return (
            <div>
                <Menu tituloPagina={"Cadastro de Logradouro"} />
                <ReactNotifications />
                <Carregando showCarregando={loading} />
                <Container className="vh-100">
                    <Form onSubmit={handleSubmit}>
                        <br />
                        <Row>
                            <h3>Cadastro de Logradouro</h3>
                        </Row>
                        <Row>
                            <Col md="2">
                                <Form.Label htmlFor="id">Código</Form.Label>
                                <Form.Control value={logId} type="text" id="id" disabled />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="12">
                                <Form.Label htmlFor="log">Descrição *</Form.Label>
                                <Form.Control value={logDescricao} maxLength={100}
                                    onChange={(e) => setLogDescricao(e.target.value)}
                                    type="text" id="log" required />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <Form.Label htmlFor="log">CEP *</Form.Label>
                                <Form.Control value={logCep} maxLength="8"
                                    onChange={(e) => atualizaCep(e.target.value)}
                                    type="number" id="log" required />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <Form.Label>Bairro</Form.Label>
                                <InputConverter idBtn={"btnBairro"} descricao={bairro.barNome} atualizaDlgPesquisa={atualizaDlgPesquisaBairro} />
                            </Col>
                        </Row>
                        <br />
                        <Toolbar jsonRemove={enviaJsonRemove} abrirPesquisa={atualizaDlgPesquisa} />
                    </Form>
                </Container>
                {abrirPesquisa &&
                    <PesquisaLogradouros setValores={setList} valores={list} atualizaItemSelecionado={atualizaItemSelecionado} setAbrirPesquisa={setAbrirPesquisa} />
                }
                {abrirPesquisaBairro &&
                    <PesquisaBairro setValores={setListBairro} valores={listBairro} atualizaItemSelecionado={atualizaBairroSelecionado} setAbrirPesquisa={setAbrirPesquisaBairro} />
                }
                <Footer />
            </div >
        )
    }
    return cadastroLogradouro();
}
export default cadastroLogradouro;