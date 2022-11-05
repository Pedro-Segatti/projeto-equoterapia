import React, { useState } from 'react';
import { Form, Col, Row, Container } from 'react-bootstrap';
import Toolbar from '../toolbar';
import PesquisaAnimais from "../pesquisas/pesquisaAnimais";

import { registroSalvo } from "../../utilitario/mensagemUtil"
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { api } from "../../utilitario/baseComunicacao";
import Menu from "../menu"
import Footer from "../footer"

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
        console.log(list);
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

    const enviaJsonRemove = () => {
        api.delete("/removeAnimal?aniId=" + aniId);
    }

    const cadastroAnimais = () => {
        return (
            <div>
                <Menu />
                <Container className="vh-100">
                    <ReactNotifications />
                    <Form>
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
                                <Form.Control value={aniNome}
                                    onChange={(e) => setAniNome(e.target.value)}
                                    type="text" id="nome" required />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="3">
                                <Form.Label htmlFor="inputIdade">Idade</Form.Label>
                                <Form.Control value={aniIdade}
                                    onChange={(e) => setAniIdade(e.target.value)}
                                    type="text" id="idade" required />
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
                                <Form.Control type="text" id="comportamento" required
                                    value={aniComportamento}
                                    onChange={(e) => setAniComportamento(e.target.value)} />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <Form.Label htmlFor="inputAndadura">Andadura</Form.Label>
                                <Form.Control type="text" id="andadura" required
                                    value={aniAndadura}
                                    onChange={(e) => setAniAndadura(e.target.value)} />
                            </Col>
                        </Row>
                        <br />
                        <Toolbar jsonCadastro={enviaJsonGravar} jsonRemove={enviaJsonRemove} abrirPesquisa={atualizaDlgPesquisa} />
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