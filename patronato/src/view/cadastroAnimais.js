import React, { useState, useEffect } from 'react';
import { Form, Col, Row, Container, Modal, Button, Table } from 'react-bootstrap';
import Toolbar from './toolbar';

import Menu from "./menu"
import Footer from "./footer"

import axios from "axios"

export const api = axios.create({
    baseURL: "http://localhost:8080",
});

function cadastroAnimais() {
    const [abrirPesquisa, setAbrirPesquisa] = useState(false);
    var [list, setList] = useState([{ codigo: 1, nome: "Cavalo Teste", idade: 20, algomais: "Teste" }])

    const atualizaDlgPesquisa = async () => {
        setList(await (await api.get("/pesquisaAnimal")).data);
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

    const Item = ({ item }) => {
        const { aniId, aniNome, aniIdade, aniPorte } = item;
        const selecionarItem = e => atualizaItemSelecionado(item);

        return <tr>
            <td>{aniId}</td>
            <td>{aniNome}</td>
            <td>{aniIdade}</td>
            <td>{aniPorte}</td>
            <td className='center'>
                <Button className='btn-success' onClick={selecionarItem}>Selecionar</Button>
            </td>
        </tr>
    }

    const enviaJson = () => {
        let aniNome = document.getElementById('nome').value;
        let aniIdade = document.getElementById('idade').value;
        let aniPorte = document.getElementById('porte').value;
        let aniComportamento = document.getElementById('comportamento').value;
        let aniAndadura = document.getElementById('andadura').value;
        if (aniPorte === 'Selecione') {
            console.log('selecione um porte');
            return;
        }
        const json = {
            "aniNome": aniNome,
            "aniIdade": aniIdade,
            "aniPorte": aniPorte,
            "aniComportamento": aniComportamento,
            "aniAndadura": aniAndadura
        };
        console.log(JSON.stringify(json));
        if (!aniNome) {
            return;
        }
        api.post("/cadastraAnimal", json);
    }

    const enviaJsonRemove = () => {
        let aniId = document.getElementById('id').value;
        console.log(aniId);
        if (!aniId) {
            return;
        }
        api.delete("/removeAnimal?aniId=" + aniId);
    }

    const cadastroAnimais = () => {
        return (
            <div>
                <Menu />
                <Container fluid="md">
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

                        <Modal show={abrirPesquisa}>
                            <Modal.Header><b>Pesquisa de Animal</b></Modal.Header>
                            <Modal.Body>
                                {abrirPesquisa &&
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
                                                list.map(item => <Item key={item.aniId} item={item} />)
                                            }
                                        </tbody>
                                    </Table>
                                }
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="primary" className='btn-danger btnToolbar' onClick={() => setAbrirPesquisa(false)}>Fechar</Button>
                            </Modal.Footer>
                        </Modal>

                        <Toolbar jsonCadastro={enviaJson} jsonRemove={enviaJsonRemove} abrirPesquisa={atualizaDlgPesquisa} />
                    </Form>
                </Container>
                <Footer />
            </div >
        )
    }
    return cadastroAnimais();
}
export default cadastroAnimais;