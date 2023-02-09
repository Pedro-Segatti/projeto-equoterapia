import React, { useState } from 'react';
import { Form, Col, Row, Container } from 'react-bootstrap';
import Toolbar from '../toolbar';
import PesquisaMontaria from "../pesquisas/pesquisaMontaria";
import { registroSalvo,registroExcluido } from "../../utilitario/mensagemUtil";
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { api } from "../../utilitario/baseComunicacao";
import Menu from "../menu";
import Footer from "../footer";
import HTTP_STATUS from "../../utilitario/httpStatus";

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

    const enviaJsonRemove = async () => {
        if(montId === ""){
            return;
        }
        try{
            const response = await (await api.delete("/removeMontaria?montId=" + montId));
            if(response.status === HTTP_STATUS.OK){
                registroExcluido();
                limparCamposFormulario();
            }
        }catch(error){
            console.log(error);   
        }
    }

    const limparCamposFormulario = () => {
        setMontId("");
        setMontDescricao("");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        enviaJsonGravar();
        limparCamposFormulario();
    }

    const cadastroMontaria = () => {
        return (
            <div>
                <Menu />
                <ReactNotifications />
                <Container className="vh-100">
                    <Form onSubmit={handleSubmit}>
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
                            <Col md="12">
                                <Form.Label htmlFor="inputDescricao">Descrição *</Form.Label>
                                <Form.Control value={montDescricao} maxLength={50}
                                    onChange={(e) => setMontDescricao(e.target.value)}
                                    type="text" id="descricao" required />
                            </Col>
                        </Row>
                        <br />
                        <Toolbar jsonRemove={enviaJsonRemove} abrirPesquisa={atualizaDlgPesquisa} />
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