import React from 'react';
import { Form, Button, Col, Row, Container } from 'react-bootstrap';
import PatronatoUtil from '../JSON/patronatoUtil.json';

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
        const json = {
            aniNome:this.aniNome,
            aniIdade:this.aniIdade,
            aniPorte:this.aniPorte
        };
        console.log(JSON.stringify(json));
        if (!aniNome) {
            return;
        }
        api.post("cadastraAnimal",json);
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
                            <Form.Control type="text" id="porte" />
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col md="1">
                            <Button variant="primary" className='btn-success' onClick={enviaJson}>Salvar</Button>
                        </Col>
                        <Col md="1">
                            <Button variant="primary" className='btn-danger' onClick={enviaJson}>Excluir</Button>
                        </Col>
                    </Row>
                </Container>
                <Footer />
            </div >
        )
    }
    return cadastroAnimais();
}
export default cadastroAnimais;