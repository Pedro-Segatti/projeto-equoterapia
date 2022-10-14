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

    const TablePaginada = ({ data, rowsPerPage }) => {
        const [pagina, setPage] = useState(1);
        const { slice, range } = useTable(data, pagina, rowsPerPage);
        return (
            <>
                <Table>
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
        let id = document.getElementById('idPesquisa').value;
        let nome = document.getElementById('nomePesquisa').value;
        const json = {
            "aniId": id,
            "aniNome": nome
        };
        setList(await (await api.get("/pesquisaAnimal", json)).data);
        setAbrirPesquisa(true);
    }

    const atualizaItemSelecionado = (item) => {
        document.getElementById("id").value = item.aniId;
        document.getElementById("nome").value = item.aniNome;
        document.getElementById("idade").value = item.aniIdade;
        document.getElementById("porte").value = item.aniPorte;
        document.getElementById("comportamento").value = item.aniComportamento;
        document.getElementById("andadura").value = item.aniAndadura;
        setAbrirPesquisa(false);
    }

    const LinhaTabela = ({ item }) => {
        const { aniId, aniNome, aniIdade, aniPorte } = item;
        const selecionarItem = e => atualizaItemSelecionado(item);

        return <tr>
            <td>{aniId}</td>
            <td>{aniNome}</td>
            <td>{aniIdade}</td>
            <td>{aniPorte}</td>
            <td className='center'>
                <Button className='btn-success' onClick={selecionarItem}><BsPencilSquare /></Button>
            </td>
        </tr>
    }

    const enviaJsonGravar = () => {
        let aniNome = document.getElementById('nome').value;
        let aniIdade = document.getElementById('idade').value;
        let aniPorte = document.getElementById('porte').value;
        let aniComportamento = document.getElementById('comportamento').value;
        let aniAndadura = document.getElementById('andadura').value;
        const json = {
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
        let aniId = document.getElementById('id').value;
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
                                <Form.Control type="text" id="id" />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <Form.Label htmlFor="inputNome">Nome</Form.Label>
                                <Form.Control type="text" id="nome" required />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="3">
                                <Form.Label htmlFor="inputIdade">Idade</Form.Label>
                                <Form.Control type="text" id="idade" required />
                            </Col>
                            <Col md="3">
                                <Form.Label htmlFor="inputPorte">Porte</Form.Label>
                                <Form.Select aria-label="Default select example" id='porte' required>
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
                                <Form.Control type="text" id="comportamento" required />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <Form.Label htmlFor="inputAndadura">Andadura</Form.Label>
                                <Form.Control type="text" id="andadura" required />
                            </Col>
                        </Row>
                        <br />
                        <Toolbar jsonCadastro={enviaJsonGravar} jsonRemove={enviaJsonRemove} abrirPesquisa={atualizaDlgPesquisa} />
                    </Form>
                </Container>

                <Modal className='modal-lg' show={abrirPesquisa}>
                    <Modal.Header><b>Pesquisa de Animal</b></Modal.Header>
                    <Modal.Body>
                        {abrirPesquisa &&
                            <>
                                <Container>
                                    <Form>
                                        <Row>
                                            <Col md="2">
                                                <Form.Label>Código</Form.Label>
                                                <Form.Control type="text" id="idPesquisa" />
                                            </Col>
                                            <Col md="6">
                                                <Form.Label>Nome</Form.Label>
                                                <Form.Control type="text" id="nomePesquisa" />
                                            </Col>
                                        </Row>
                                        <br />
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