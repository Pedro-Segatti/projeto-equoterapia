import React from 'react';
import { Form, Button, Col, Row, Container } from 'react-bootstrap';
import Toolbar from './toolbar';

import Menu from "./menu"
import Footer from "./footer"

import axios from "axios"

export const api = axios.create({
    baseURL: "http://localhost:8080",
});

function cadastroAnimais() {
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
                    <br />
                    <Row>
                        <h3>Cadastro de Animais</h3>
                    </Row>
                    <Row>
                        <Col md="4">
                            <Form.Label htmlFor="inputId">Código</Form.Label>
                            <Form.Control type="text" id="id" />
                        </Col>
                    </Row>
                    <Row>
                        <Col md="4">
                            <Form.Label htmlFor="inputNome">Nome</Form.Label>
                            <Form.Control type="text" id="nome" />
                        </Col>
                    </Row>
                    <Row>
                        <Col md="2">
                            <Form.Label htmlFor="inputIdade">Idade</Form.Label>
                            <Form.Control type="text" id="idade" />
                        </Col>
                        <Col md="2">
                            <Form.Label htmlFor="inputPorte">Porte</Form.Label>
                            <Form.Select aria-label="Default select example" id='porte'>
                                <option>Selecione</option>
                                <option value="P">Pequeno</option>
                                <option value="M">Médio</option>
                                <option value="G">Grande</option>
                            </Form.Select>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="4">
                            <Form.Label htmlFor="inputComportamento">Comportamento</Form.Label>
                            <Form.Control type="text" id="comportamento" />
                        </Col>
                    </Row>
                    <Row>
                        <Col md="4">
                            <Form.Label htmlFor="inputAndadura">Andadura</Form.Label>
                            <Form.Control type="text" id="andadura" />
                        </Col>
                    </Row>
                    <br />
                    <Toolbar json={enviaJson} jsonRemove={enviaJsonRemove} />
                </Container>
                <Footer />
            </div >
        )
    }
    return cadastroAnimais();
}
export default cadastroAnimais;