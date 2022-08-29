import React from 'react';
import { Form, Button, Col, Row, Container } from 'react-bootstrap';

function cadastroAnimais(){
const enviaJson = () => {
    let nomeAnimal = document.getElementById('nome').value  
    if(!nomeAnimal){
      return;
    }
    fetch('http://localhost:8080/cadsatraAnimal', {
        method: 'POST',
        body: nomeAnimal,
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json'}})
      .then(retorno => retorno.json())
      .then(retornoConv => {
        console.log(retornoConv);
        if (retornoConv.mensagem){
            console.log("gravou");
        } else {
            console.log("não gravou");
        }
      })
  }

const cadastroAnimais = () => {
    return (
        <Container fluid="md">
            <Row>
                <Col md="4">
                    <Form.Label htmlFor="inputNome">Nome</Form.Label>
                    <Form.Control type="text" id="nome" />
                </Col>
            </Row>
            <Row className='mt-3'>
                <Col>
                    <Button variant="primary" onClick={enviaJson}>Salvar</Button>
                </Col>
            </Row>
        </Container>
    )
}
return cadastroAnimais();
}
export default cadastroAnimais;