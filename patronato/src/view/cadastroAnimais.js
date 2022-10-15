import React, { useState } from 'react';
import { Form, Col, Row, Container, Modal, Button, Table } from 'react-bootstrap';
import Toolbar from './toolbar';
import TableFooter from './table/tableFooter';
import useTable from './table/useTable';
import { BsPencilSquare } from "react-icons/bs";
import { registroSalvo } from "../utilitario/mensagemUtil"
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

import Menu from "./menu"
import Footer from "./footer"

import axios from "axios"

export const api = axios.create({
    baseURL: "http://localhost:8080",
});

function cadastroAnimais() {
    const [abrirPesquisa, setAbrirPesquisa] = useState(false);
    var [list, setList] = useState('[]');
    
    //Variáveis de cadastro
    const [aniId, setAniId] = useState("");
    const [aniNome, setAniNome] = useState("");
    const [aniIdade, setAniIdade] = useState("");
    const [aniPorte, setAniPorte] = useState("");
    const [aniComportamento, setAniComportamento] = useState("");
    const [aniAndadura, setAniAndadura] = useState("");

    //variáveis da dialog de pesquisa
    const [aniIdPesquisa, setAniIdPesquisa] = useState("");
    const [aniNomePesquisa, setAniNomePesquisa] = useState("");

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
                            slice.map(item => <LinhaTabela key={item.aniId} item={item} />)
                        }
                    </tbody>
                </Table>
                <TableFooter range={range} slice={slice} setPage={setPage} page={pagina} />
            </>
        );
    };

    const atualizaDlgPesquisa = async () => {
        setList(await (await api.get("/pesquisaAnimal")).data);
        setAbrirPesquisa(true);
    }

    const buscaRegistros = async () => {
        setList(await (await api.get("/pesquisaAnimal?aniId=" + aniIdPesquisa + "&aniNome=" + aniNomePesquisa)).data);
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
                <Container>
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
                                onChange={(e) => setAniComportamento(e.target.value)}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <Form.Label htmlFor="inputAndadura">Andadura</Form.Label>
                                <Form.Control type="text" id="andadura" required 
                                value={aniAndadura}
                                onChange={(e) => setAniAndadura(e.target.value)}/>
                            </Col>
                        </Row>
                        <br />
                        <Toolbar jsonCadastro={enviaJsonGravar} jsonRemove={enviaJsonRemove} abrirPesquisa={atualizaDlgPesquisa} />
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
                                                value={aniIdPesquisa}
                                                onChange={(e) => setAniIdPesquisa(e.target.value)} />
                                            </Col>
                                            <Col md="6">
                                                <Form.Label>Nome</Form.Label>
                                                <Form.Control type="text" id="nomePesquisa"
                                                initi={aniNomePesquisa}
                                                onChange={(e) => setAniNomePesquisa(e.target.value)} />
                                            </Col>
                                        </Row>
                                        <div className='right'>
                                            <Button onClick={buscaRegistros}>Pesquisar</Button>
                                        </div>
                                    </Form>
                                </Container>

                                <TablePaginada data={list} rowsPerPage={5} />
                            </>
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" className='btn-danger btnToolbar' onClick={() => setAbrirPesquisa(false)}>Fechar</Button>
                    </Modal.Footer>
                </Modal>

                <Footer />
            </div >
        )
    }
    return cadastroAnimais();
}
export default cadastroAnimais;