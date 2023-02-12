import React, { useState } from 'react';
import { Form, Col, Row, Container } from 'react-bootstrap';
import Toolbar from '../toolbar';
import { registroSalvo, registroExcluido } from "../../utilitario/mensagemUtil";
import PesquisaCargo from "../pesquisas/pesquisaCargo";
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { api } from "../../utilitario/baseComunicacao";
import Menu from "../menu";
import Footer from "../footer";
import HTTP_STATUS from "../../utilitario/httpStatus";

function cadastroCargo() {
    const [abrirPesquisa, setAbrirPesquisa] = useState(false);
    var [list, setList] = useState([]);

    //Variáveis de cadastro
    const [carId, setCarId] = useState("");
    const [carDescricao, setCarDescricao] = useState("");

    const atualizaDlgPesquisa = async () => {
        setList(await (await api.get("/pesquisaCargo?carId=&carDescricao=")).data);
        setAbrirPesquisa(true);
    }

    const atualizaItemSelecionado = (item) => {
        setCarId(item.carId);
        setCarDescricao(item.carDescricao);
        setAbrirPesquisa(false);
    }

    const enviaJsonGravar = () => {
        const json = {
            "carId": carId,
            "carDescricao": carDescricao,
        };
        api.post("/cadastraCargo", json);
        registroSalvo();
    }

    const enviaJsonRemove = async () => {
        if (carId === "") {
            return;
        }
        try {
            const response = await (await api.delete("/removeCargo?carId=" + carId));
            if (response.status === HTTP_STATUS.OK) {
                registroExcluido();
                limparCamposFormulario();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const limparCamposFormulario = () => {
        setCarId("");
        setCarDescricao("");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        enviaJsonGravar();
        limparCamposFormulario();
    }

    const cadastroCargo = () => {
        return (
            <div>
                <Menu />
                <ReactNotifications />
                <Container className="vh-100">
                    <Form onSubmit={handleSubmit}>
                        <br />
                        <Row>
                            <h3>Cadastro de Cargos</h3>
                        </Row>
                        <Row>
                            <Col md="2">
                                <Form.Label htmlFor="inputId">Código</Form.Label>
                                <Form.Control value={carId} type="text" id="id" disabled />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="12">
                                <Form.Label htmlFor="inputDescricao">Descrição</Form.Label>
                                <Form.Control value={carDescricao} maxLength={100}
                                    onChange={(e) => setCarDescricao(e.target.value)}
                                    type="text" id="descricao" required />
                            </Col>
                        </Row>
                        <br />
                        <Toolbar jsonRemove={enviaJsonRemove} abrirPesquisa={atualizaDlgPesquisa} />
                    </Form>
                </Container>

                {abrirPesquisa &&
                    <PesquisaCargo setValores={setList} valores={list} atualizaItemSelecionado={atualizaItemSelecionado} setAbrirPesquisa={setAbrirPesquisa} />
                }
                
                <Footer />
            </div >
        )
    }
    return cadastroCargo();
}
export default cadastroCargo;