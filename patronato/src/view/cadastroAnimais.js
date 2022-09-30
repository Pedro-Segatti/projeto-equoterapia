import React from 'react';
import { Form, Button, Col, Row, Container } from 'react-bootstrap';

function cadastroAnimais() {
    const enviaJson = () => {
        let nomeAnimal = document.getElementById('nome').value
        if (!nomeAnimal) {
            return;
        }
        fetch('http://localhost:8080/cadsatraAnimal', {
            method: 'POST',
            body: nomeAnimal,
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
        })
            .then(retorno => retorno.json())
            .then(retornoConv => {
                console.log(retornoConv);
                if (retornoConv.mensagem) {
                    console.log("gravou");
                } else {
                    console.log("não gravou");
                }
            })
    }

    const cadastroAnimais = () => {
        return (
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
        )
    }
    return cadastroAnimais();
}
export default cadastroAnimais;