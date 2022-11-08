import React, { useState } from 'react';
import { Form, Col, Row, Container, Button, Card } from 'react-bootstrap';
import Toolbar from '../toolbar';
import { registroSalvo, registroExcluido } from "../../utilitario/mensagemUtil";
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import PesquisaAnimais from "../pesquisas/pesquisaAnimais";
import { TablePaginada } from "../pesquisas/pesquisaAnimais";
import PesquisaFichaEvol from "../pesquisas/pesquisaFichaEvol";
import PesquisaMontaria from "../pesquisas/pesquisaMontaria";
import InputConverter from "../inputConverter";
import HTTP_STATUS from "../../utilitario/httpStatus";

import Menu from "../menu"
import Footer from "../footer"
import { api } from "../../utilitario/baseComunicacao";

function cadastroFichaEvol() {
    const [abrirPesquisa, setAbrirPesquisa] = useState(false);
    const [abrirPesquisaAnimal, setAbrirPesquisaAnimal] = useState(false);
    const [abrirPesquisaMontaria, setAbrirPesquisaMontaria] = useState(false);
    var [list, setList] = useState([]);
    var [listAnimal, setListAnimal] = useState([]);
    var [listMontaria, setListMontaria] = useState([]);


    const atualizaDlgPesquisa = async () => {
        setList(await (await api.get("/pesquisaFichaEvol")).data);
        setAbrirPesquisa(true);
    }

    const atualizaDlgPesquisaAnimal = async () => {
        setListAnimal(await (await api.get("/pesquisaAnimal")).data);
        setAbrirPesquisaAnimal(true);
    }

    const atualizaDlgPesquisaMontaria = async () => {
        setListMontaria(await (await api.get("/pesquisaMontaria")).data);
        setAbrirPesquisaMontaria(true);
    }

    //Variáveis de cadastro
    const [evolId, setEvolId] = useState("");
    const [evolClima, setEvolClima] = useState("");
    const [evolHumor, setEvolHumor] = useState("");
    const [evolAtenc, setEvolAtenc] = useState("");
    const [evolAuton, setEvolAuton] = useState("");
    const [evolEstereotipia, setEvolEstereotipia] = useState("");
    const [evolPost, setEvolPost] = useState("");
    const [evolProg, setEvolProg] = useState("");
    const [evolReg, setEvolReg] = useState("");
    const [evolObs, setEvolObs] = useState("");
    const [evolRecLudicos, setEvolRecLudicos] = useState(false);
    const selecionaRecLudicos = () => setEvolRecLudicos(!evolRecLudicos)
    const [evolQuaisRecLud, setEvolQuaisRecLud] = useState("");
    const [evolObsRecLud, setEvolObsRecLud] = useState("");
    const [evolDecubito, setEvolDecubito] = useState("");
    const [evolCompAni, setEvolCompAni] = useState("");
    const [evolAndAni, setEvolAndAni] = useState("");
    const [evolIdMont, setEvolIdMont] = useState("");
    const [evolAniSelecionado, setEvolAniSelecionado] = useState([]);

    const atualizaEvolSelecionada = (item) => {
        setEvolId(item.evolId);
        setEvolClima(item.evolClima || '');
        setEvolHumor(item.evolHumor || '');
        setEvolAtenc(item.evolAtenc || '');
        setEvolAuton(item.evolAuton || '');
        setEvolEstereotipia(item.evolEstereotipia || '');
        setEvolPost(item.evolPost || '');
        setEvolProg(item.evolProg || '');
        setEvolReg(item.evolReg || '');
        setEvolObs(item.evolObs || '');
        setEvolRecLudicos(item.evolRecLudicos || '');
        setEvolQuaisRecLud(item.evolQuaisRecLud || '');
        setEvolObsRecLud(item.evolObsRecLud || '');
        setEvolDecubito(item.evolDecubito || '');
        setEvolCompAni(item.evolCompAni || '');
        setEvolAndAni(item.evolAndAni || '');
        setEvolAniSelecionado(item.animalList || []);
        setEvolIdMont(item.evolIdMont || '');
        setAbrirPesquisa(false);
    }

    const atualizaAnimalSelecionado = (item) => {
        setEvolAniSelecionado(current => [...current, item])
        setAbrirPesquisaAnimal(false);
    }

    const atualizaMontariaSelecionada = (item) => {
        setEvolIdMont(item)
        setAbrirPesquisaMontaria(false);
    }

    const removeAnimalSelecionado = (item) => {
        var array = [...evolAniSelecionado];
        var index = array.indexOf(item);
        if (index !== -1) {
            array.splice(index, 1);
            setEvolAniSelecionado(array);
        }
    }

    const enviaJsonGravar = () => {
        const json = {
            "evolId": evolId,
            "evolClima": evolClima,
            "evolHumor": evolHumor,
            "evolAtenc": evolAtenc,
            "evolAuton": evolAuton,
            "evolEstereotipia": evolEstereotipia,
            "evolPost": evolPost,
            "evolProg": evolProg,
            "evolReg": evolReg,
            "evolObs": evolObs,
            "evolRecLudicos": evolRecLudicos,
            "evolQuaisRecLud": evolQuaisRecLud,
            "evolDecubito": evolDecubito,
            "evolObsRecLud": evolObsRecLud,
            "evolCompAni": evolCompAni,
            "evolAndAni": evolAndAni,
            "evolIdMont": evolIdMont,
            "animalList": evolAniSelecionado.map(animal => (animal))
        };
        api.post("/cadastraFichaEvol", json);
        registroSalvo();
    }

    const enviaJsonRemove = async () => {
        if (evolId === "") {
            return;
        }
        try {
            const response = await (await api.delete("/removeFichaEvol?evolId=" + evolId));
            if (response.status === HTTP_STATUS.OK) {
                registroExcluido();
                limparCamposFormulario();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const atualizaRecursosLudicos = () => {
        selecionaRecLudicos();
        setEvolObsRecLud("");
        setEvolQuaisRecLud("");
    }

    const limparCamposFormulario = () => {
        setEvolId("");
        setEvolHumor("");
        //adicionar todos os campos
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        enviaJsonGravar();
        limparCamposFormulario();
    }

    const cadastroFichaEvol = () => {
        return (
            <div>
                <Menu />
                <ReactNotifications />
                <Container>
                    <Form onSubmit={handleSubmit}>
                        <br />
                        <Row>
                            <h3>Ficha de Evolução</h3>
                        </Row>
                        <Row>
                            <Col md="2">
                                <Form.Label htmlFor="inputId">Código</Form.Label>
                                <Form.Control value={evolId} type="text" id="id" disabled />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <Form.Label htmlFor="inputMontaria">Montaria</Form.Label>
                                <InputConverter descricao={evolIdMont.montDescricao} atualizaDlgPesquisa={atualizaDlgPesquisaMontaria} />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="3">
                                <Form.Label htmlFor="inputHumor">Humor</Form.Label>
                                <Form.Select id='porte' required value={evolHumor}
                                    onChange={(e) => setEvolHumor(e.target.value)}>
                                    <option>Selecione</option>
                                    <option value="T">Tranquilo</option>
                                    <option value="A">Agitado</option>
                                </Form.Select>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <Form.Label htmlFor="inputAtenc">Atenção</Form.Label>
                                <Form.Control value={evolAtenc} maxLength={20}
                                    onChange={(e) => setEvolAtenc(e.target.value)}
                                    type="text" id="atenc" />
                            </Col>

                            <Col md="6">
                                <Form.Label htmlFor="inputAuton">Autonomia</Form.Label>
                                <Form.Control value={evolAuton} maxLength={20}
                                    onChange={(e) => setEvolAuton(e.target.value)}
                                    type="text" id="auton" />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <Form.Label htmlFor="inputPost">Postura</Form.Label>
                                <Form.Control value={evolPost} maxLength={20}
                                    onChange={(e) => setEvolPost(e.target.value)}
                                    type="text" id="post" />
                            </Col>
                            <Col md="3">
                                <Form.Label htmlFor="inputClima">Clima</Form.Label>
                                <Form.Control value={evolClima} maxLength={1}
                                    onChange={(e) => setEvolClima(e.target.value)}
                                    type="text" id="clima" />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <Form.Label htmlFor="inputEstereotipia">Estereotipia</Form.Label>
                                <Form.Control value={evolEstereotipia}
                                    onChange={(e) => setEvolEstereotipia(e.target.value)}
                                    type="text" id="estereotipia" as="textarea" className='textArea' />
                            </Col>
                            <Col md="6">
                                <Form.Label htmlFor="inputProg">Programação</Form.Label>
                                <Form.Control value={evolProg}
                                    onChange={(e) => setEvolProg(e.target.value)}
                                    type="text" id="prog" as="textarea" className='textArea' />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <Form.Label htmlFor="inputReg">Registro</Form.Label>
                                <Form.Control value={evolReg}
                                    onChange={(e) => setEvolReg(e.target.value)}
                                    type="text" id="reg" as="textarea" className='textArea' />
                            </Col>

                            <Col md="6">
                                <Form.Label htmlFor="obs">Observação</Form.Label>
                                <Form.Control value={evolObs}
                                    onChange={(e) => setEvolObs(e.target.value)}
                                    type="text" id="obs" as="textarea" className='textArea' />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <Form.Check
                                    defaultChecked={true}
                                    onClick={atualizaRecursosLudicos}
                                    type="checkbox"
                                    id="recLud"
                                    label="Recursos Lúdicos"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <Form.Label htmlFor="quaisRecLud">Quais Recursos Lúdicos</Form.Label>
                                <Form.Control value={evolQuaisRecLud} disabled={!evolRecLudicos}
                                    onChange={(e) => setEvolQuaisRecLud(e.target.value)}
                                    type="text" id="quaisRecLud" as="textarea" className='textArea' />
                            </Col>

                            <Col md="6">
                                <Form.Label htmlFor="obsRecLud">Observação Recursos Lúdicos</Form.Label>
                                <Form.Control value={evolObsRecLud} disabled={!evolRecLudicos}
                                    onChange={(e) => setEvolObsRecLud(e.target.value)}
                                    type="text" id="obsRecLud" as="textarea" className='textArea' />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label htmlFor="decubito">Decubito</Form.Label>
                                <Form.Control value={evolDecubito} maxLength={1}
                                    onChange={(e) => setEvolDecubito(e.target.value)}
                                    type="text" id="decubito" />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <Form.Label htmlFor="compAni">Comportamento do Animal</Form.Label>
                                <Form.Control value={evolCompAni} maxLength={30}
                                    onChange={(e) => setEvolCompAni(e.target.value)}
                                    type="text" id="compAni" />
                            </Col>

                            <Col md="6">
                                <Form.Label htmlFor="andAni">Andadura do Animal</Form.Label>
                                <Form.Control value={evolAndAni} maxLength={30}
                                    onChange={(e) => setEvolAndAni(e.target.value)}
                                    type="text" id="andAni" />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col md="6">
                                <Card>
                                    <div className='marginLeft'>
                                        <b>Animais</b>
                                        <Col md="2">
                                            <Button variant="primary" className='btn-success btnMarginTop' onClick={atualizaDlgPesquisaAnimal}>Adicionar</Button>
                                        </Col>
                                        {evolAniSelecionado.length > 0 &&
                                            <TablePaginada data={evolAniSelecionado} rowsPerPage={5} selecionaLinha={false} removeAnimalSelecionado={removeAnimalSelecionado} />
                                        }
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                        <br />
                        <Toolbar jsonRemove={enviaJsonRemove} abrirPesquisa={atualizaDlgPesquisa} />
                        <br />
                    </Form>
                </Container>
                {abrirPesquisa &&
                    <PesquisaFichaEvol setValores={setList} valores={list} atualizaItemSelecionado={atualizaEvolSelecionada} setAbrirPesquisa={setAbrirPesquisa} />
                }
                {abrirPesquisaAnimal &&
                    <PesquisaAnimais setValores={setListAnimal} valores={listAnimal} atualizaItemSelecionado={atualizaAnimalSelecionado} setAbrirPesquisa={setAbrirPesquisaAnimal} />
                }
                {abrirPesquisaMontaria &&
                    <PesquisaMontaria setValores={setListMontaria} valores={listMontaria} atualizaItemSelecionado={atualizaMontariaSelecionada} setAbrirPesquisa={setAbrirPesquisaMontaria} />
                }
                <Footer />
            </div >
        )
    }
    return cadastroFichaEvol();
}
export default cadastroFichaEvol;