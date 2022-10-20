import React, { useState } from 'react';
import { Form, Col, Row, Container, Modal, Button, Table } from 'react-bootstrap';
import Toolbar from '../toolbar';
import TableFooter from '../table/tableFooter';
import useTable from '../table/useTable';
import { BsPencilSquare } from "react-icons/bs";
import { registroSalvo } from "../../utilitario/mensagemUtil"
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

import Menu from "../menu"
import Footer from "../footer"
import { api } from "../../utilitario/baseComunicacao";

function cadastroFichaEvol() {
    const [abrirPesquisa, setAbrirPesquisa] = useState(false);
    var [list, setList] = useState('[]');

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

    //variáveis da dialog de pesquisa
    const [evolIdPesquisa, setEvolIdPesquisa] = useState("");

    const TablePaginada = ({ data, rowsPerPage }) => {
        const [pagina, setPage] = useState(1);
        const { slice, range } = useTable(data, pagina, rowsPerPage);
        return (
            <>
                <Table size="sm">
                    <thead>
                        <tr>
                            <th>Codigo</th>
                            <th>Nome</th>
                            <th>Idade</th>
                            <th>Porte</th>
                            <th className='center'>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            slice.map(item => <LinhaTabela key={item.evolId} item={item} />)
                        }
                    </tbody>
                </Table>
                <TableFooter range={range} slice={slice} setPage={setPage} page={pagina} />
            </>
        );
    };

    const atualizaDlgPesquisa = async () => {
        setList(await (await api.get("/pesquisaFichaEvol")).data);
        setAbrirPesquisa(true);
    }

    const buscaRegistros = async () => {
        setList(await (await api.get("/pesquisaFichaEvol?evolId=" + evolIdPesquisa)).data);
        setAbrirPesquisa(true);
    }

    const atualizaItemSelecionado = (item) => {
        setEvolId(item.evolId);
        setAbrirPesquisa(false);
    }

    const LinhaTabela = ({ item }) => {
        const { aniId, aniNome, aniIdade, aniPorte } = item;
        const selecionarItem = e => atualizaItemSelecionado(item);

        return <tr>
            <td width={'80px'}>{aniId}</td>
            <td>{aniNome}</td>
            <td width={'100px'}>{aniIdade}</td>
            <td width={'100px'}>{aniPorte}</td>
            <td width={'80px'} className='center'>
                <Button className='btn-success' onClick={selecionarItem}><BsPencilSquare /></Button>
            </td>
        </tr>
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
            "evolAndAni": evolAndAni
        };
        api.post("/cadastraFichaEvol", json);
        registroSalvo();
    }

    const enviaJsonRemove = () => {
        api.delete("/removeFichaEvol?evolId=" + evolId);
    }

    const atualizaRecursosLudicos = () => {
        selecionaRecLudicos();
        setEvolObsRecLud("");
        setEvolQuaisRecLud("");
    }

    const cadastroFichaEvol = () => {
        return (
            <div>
                <Menu />
                <Container>
                    <ReactNotifications />
                    <Form>
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
                                <Form.Control value={evolAtenc}
                                    onChange={(e) => setEvolAtenc(e.target.value)}
                                    type="text" id="atenc" />
                            </Col>

                            <Col md="6">
                                <Form.Label htmlFor="inputAuton">Autonomia</Form.Label>
                                <Form.Control value={evolAuton}
                                    onChange={(e) => setEvolAuton(e.target.value)}
                                    type="text" id="auton" />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <Form.Label htmlFor="inputPost">Postura</Form.Label>
                                <Form.Control value={evolPost}
                                    onChange={(e) => setEvolPost(e.target.value)}
                                    type="text" id="post" />
                            </Col>
                            <Col md="6">
                                <Form.Label htmlFor="inputClima">Clima</Form.Label>
                                <Form.Control value={evolClima}
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
                                    checked={evolRecLudicos}
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
                                <Form.Control value={evolDecubito}
                                    onChange={(e) => setEvolDecubito(e.target.value)}
                                    type="text" id="decubito" />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <Form.Label htmlFor="compAni">Comportamento do Animal</Form.Label>
                                <Form.Control value={evolCompAni}
                                    onChange={(e) => setEvolCompAni(e.target.value)}
                                    type="text" id="compAni" />
                            </Col>

                            <Col md="6">
                                <Form.Label htmlFor="andAni">Andadura do Animal</Form.Label>
                                <Form.Control value={evolAndAni}
                                    onChange={(e) => setEvolAndAni(e.target.value)}
                                    type="text" id="andAni" />
                            </Col>
                        </Row>
                        <br />
                        <Toolbar jsonCadastro={enviaJsonGravar} jsonRemove={enviaJsonRemove} abrirPesquisa={atualizaDlgPesquisa} />
                        <br />
                    </Form>
                </Container>

                <Modal className='modal-xl' show={abrirPesquisa}>
                    <Modal.Header><b>Pesquisa de Animal</b></Modal.Header>
                    <Modal.Body>
                        {abrirPesquisa &&
                            <>
                                <Container>
                                    <Form>
                                        <Row>
                                            <Col md="2">
                                                <Form.Label>Código</Form.Label>
                                                <Form.Control type="text" id="idPesquisa"
                                                    value={evolIdPesquisa}
                                                    onChange={(e) => setEvolIdPesquisa(e.target.value)} />
                                            </Col>
                                        </Row>
                                        <div className='right'>
                                            <Button className='btnMarginTop' onClick={buscaRegistros}>Pesquisar</Button>
                                        </div>
                                    </Form>
                                </Container>

                                <TablePaginada data={list} rowsPerPage={5} />
                            </>
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" className='btn-danger' onClick={() => setAbrirPesquisa(false)}>Fechar</Button>
                    </Modal.Footer>
                </Modal>

                <Footer />
            </div >
        )
    }
    return cadastroFichaEvol();
}
export default cadastroFichaEvol;