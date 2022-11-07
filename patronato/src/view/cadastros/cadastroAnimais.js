import React, { useState } from 'react';
import { Form, Col, Row, Container } from 'react-bootstrap';
import Toolbar from '../toolbar';
import PesquisaAnimais from "../pesquisas/pesquisaAnimais";
import { registroSalvo, avisoCustomizado, registroExcluido } from "../../utilitario/mensagemUtil";
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { api } from "../../utilitario/baseComunicacao";
import Menu from "../menu";
import Footer from "../footer";
import HTTP_STATUS from "../../utilitario/httpStatus";

function cadastroAnimais() {
    const [abrirPesquisa, setAbrirPesquisa] = useState(false);

    //Variáveis de cadastro
    const [aniId, setAniId] = useState("");
    const [aniNome, setAniNome] = useState("");
    const [aniIdade, setAniIdade] = useState("");
    const [aniPorte, setAniPorte] = useState("");
    const [aniComportamento, setAniComportamento] = useState("");
    const [aniAndadura, setAniAndadura] = useState("");

    //variáveis da dialog de pesquisa
    var [list, setList] = useState('[]');

    const atualizaDlgPesquisa = async () => {
        setList(await (await api.get("/pesquisaAnimal")).data);
        setAbrirPesquisa(true);
    }

    const atualizaItemSelecionado = (item) => {
        setAniId(item.aniId);
        setAniNome(item.aniNome);
        setAniIdade(item.aniIdade);
        setAniPorte(item.aniPorte);
        setAniComportamento(item.aniComportamento);
        setAniAndadura(item.aniAndadura);
        setAbrirPesquisa(false);
    }

    const enviaJsonGravar = () => {
        const json = {
            "aniId": aniId,
            "aniNome": aniNome,
            "aniIdade": aniIdade,
            "aniPorte": aniPorte,
            "aniComportamento": aniComportamento,
            "aniAndadura": aniAndadura
        };
        api.post("/cadastraAnimal", json);
        registroSalvo();
    }

    const enviaJsonRemove = async () => {
        if(aniId === ""){
            return;
        }
        const response = await (await api.delete("/removeAnimal?aniId=" + aniId));
        console.log(response.status);
        if(response.status === HTTP_STATUS.OK){
            registroExcluido();
            limparCamposFormulario();
        }
    }

    const limparCamposFormulario = () => {
        setAniId("");
        setAniNome("");
        setAniIdade("");
        setAniPorte("");
        setAniComportamento("");
        setAniAndadura("");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(aniPorte === ""){
            avisoCustomizado("Selecione um porte para o Animal");
            return; 
        }
        enviaJsonGravar();
        limparCamposFormulario();
    }

    const cadastroAnimais = () => {
        return (
            <div>
                <Menu />
                <ReactNotifications />
                <Container className="vh-100">
                    <Form onSubmit={handleSubmit}>
                        <br />
                        <Row>
                            <h3>Cadastro de Animais</h3>
                        </Row>
                        <Row>
                            <Col md="2">
                                <Form.Label htmlFor="inputId">Código</Form.Label>
                                <Form.Control value={aniId} type="text" id="id" disabled />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <Form.Label htmlFor="inputNome">Nome</Form.Label>
                                <Form.Control value={aniNome} maxLength={60}
                                    onChange={(e) => setAniNome(e.target.value)}
                                    type="text" id="nome" required />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="3">
                                <Form.Label htmlFor="inputIdade">Idade</Form.Label>
                                <Form.Control value={aniIdade} min={1} max={200}
                                    onChange={(e) => setAniIdade(e.target.value)}
                                    type="number" id="idade" />
                            </Col>
                            <Col md="3">
                                <Form.Label htmlFor="inputPorte">Porte</Form.Label>
                                <Form.Select aria-label="Default select example" id='porte' required
                                    value={aniPorte}
                                    onChange={(e) => setAniPorte(e.target.value)}>
                                    <option>Selecione</option>
                                    <option value="P">Pequeno</option>
                                    <option value="M">Médio</option>
                                    <option value="G">Grande</option>
                                </Form.Select>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <Form.Label htmlFor="inputComportamento">Comportamento</Form.Label>
                                <Form.Control type="text" id="comportamento"
                                    value={aniComportamento} maxLength={60}
                                    onChange={(e) => setAniComportamento(e.target.value)} />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <Form.Label htmlFor="inputAndadura">Andadura</Form.Label>
                                <Form.Control type="text" id="andadura"
                                    value={aniAndadura} maxLength={60}
                                    onChange={(e) => setAniAndadura(e.target.value)} />
                            </Col>
                        </Row>
                        <br />
                        <Toolbar jsonRemove={enviaJsonRemove} abrirPesquisa={atualizaDlgPesquisa} />
                    </Form>
                </Container>
                {abrirPesquisa &&
                    <PesquisaAnimais setValores={setList} valores={list} atualizaItemSelecionado={atualizaItemSelecionado} setAbrirPesquisa={setAbrirPesquisa} />
                }
                <Footer />
            </div >
        )
    }
    return cadastroAnimais();
}
export default cadastroAnimais;