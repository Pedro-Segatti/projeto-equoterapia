import React, { useState } from 'react';
import { Form, Col, Row, Container, Modal, Button, Table, Image } from 'react-bootstrap';
import Toolbar from '../toolbar';
import { IMaskInput } from 'react-imask';
import { registroSalvo, pessoaDuplicada } from "../../utilitario/mensagemUtil"
import { ReactNotifications } from 'react-notifications-component'
import { criarPessoa } from "../../utilitario/patronatoUtil";
import HTTP_STATUS from "../../utilitario/httpStatus";

import Menu from "../menu"
import Footer from "../footer"

const cadastroPraticante = () => {
    const showPreview = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setPesFoto(reader.result);
            }
        }

        reader.readAsDataURL(e.target.files[0]);
    }

    const [patId, setpatId] = useState(null);
    const [pesNome, setPesNome] = useState("");
    const [pesCpf, setPesCpf] = useState("");
    const [pesSexo, setPesSexo] = useState(null);
    const [pesDataNasc, setPesDataNasc] = useState("");
    const [pesEndNum, setPesEndNum] = useState("");
    const [pesEndCompl, setPesEndCompl] = useState("");
    const [pesNacionalidade, setPesNacionalidade] = useState("");
    const [pesFoto, setPesFoto] = useState("");
    const [pesEmail1, setPesEmail1] = useState("");
    const [pesEmail2, setPesEmail2] = useState("");
    const [pesLogId, setPesLogId] = useState(1);

    const limparCamposFormulario = () => {
        setpatId(null);
        setPesNome("");
        setPesCpf("");
        setPesSexo(null);
        setPesDataNasc("");
        setPesEndNum("");
        setPesEndCompl("");
        setPesNacionalidade("");
        setPesFoto("");
        setPesEmail1("");
        setPesEmail2("");
        setPesLogId("");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const cadastraPessoa = async () => {
            return await criarPessoa(pesNome, pesCpf, pesSexo, pesDataNasc, pesEndNum, pesEndCompl, pesNacionalidade, pesFoto, pesEmail1, pesEmail2, pesLogId);
        }

        if (patId == null) {
            try {
                const response = await cadastraPessoa();
                if (response.status === HTTP_STATUS.OK) {
                    registroSalvo();
                    limparCamposFormulario();
                }
            } catch (error) {
                if (error.response.status === HTTP_STATUS.BAD_REQUEST) {
                    pessoaDuplicada();
                }
            }
        }
    };


    return (
        <div>
            <Menu />
            <ReactNotifications />
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <h3>Cadastro de Praticantes</h3>
                    </Row>
                
                    <Row>
                        <Col md="12">
                            <div className='fotoPraticante'>
                                <Image id="imgPrat" src={pesFoto}></Image>
                                <Form.Control type="file" id="inputFoto" accept="image/png, image/jpg, image/jpeg" onChange={showPreview} />
                                <Form.Label htmlFor="inputFoto" className='label-input-file'>Selecione a Foto do Praticante</Form.Label>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col md="2">
                            <Form.Label htmlFor="inputId">Código</Form.Label>
                            <Form.Control value={patId} type="text" id="inputId" disabled />
                        </Col>
                    </Row>
                    <Row>
                        <Col md="6">
                            <Form.Label htmlFor="inputNome">Nome</Form.Label>
                            <Form.Control value={pesNome}
                                onChange={(e) => setPesNome(e.target.value)}
                                type="text" id="inputNome" required />
                        </Col>
                    </Row>
                    <Row>
                        <Col md="3">
                            <Form.Label htmlFor="inputDate">Data de Nascimento</Form.Label>
                            <Form.Control value={pesDataNasc}
                                onChange={(e) => setPesDataNasc(e.target.value)}
                                type="date" id="inputDate" required />
                        </Col>
                        <Col md="3">
                            <Form.Label htmlFor="inputCpf">CPF</Form.Label>
                            <Form.Control id="inputCpf" type="text" maxLength='14' as={IMaskInput} inputMode="numeric"
                                mask="000.000.000-00" placeholder='Digite aqui o seu CPF...' required value={pesCpf} onChange={(l) => setPesCpf(l.target.value)} />
                        </Col>
                    </Row>

                    <Row>
                        <Col md="3">
                            <Form.Label htmlFor="inputSexo">Sexo</Form.Label>
                            <Form.Select id='inputSexo' required
                                value={pesSexo}
                                onChange={(e) => setPesSexo(e.target.value)}>
                                <option>Selecione</option>
                                <option value="F">Feminino</option>
                                <option value="M">Masculino</option>
                            </Form.Select>
                        </Col>
                        <Col md="3">
                            <Form.Label htmlFor="inputNacionalidade">Nacionalidade</Form.Label>
                            <Form.Select id='inputNacionalidade' required
                                value={pesNacionalidade}
                                onChange={(e) => setPesNacionalidade(e.target.value)}>
                                <option>Selecione</option>
                                <option value="BRA">Brasileira</option>
                            </Form.Select>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="6">
                            <Form.Label htmlFor="inputEmailP">Email Principal</Form.Label>
                            <Form.Control value={pesEmail1}
                                onChange={(e) => setPesEmail1(e.target.value)}
                                type="text" id="inputEmailP" required />
                        </Col>
                    </Row>
                    <Row>
                        <Col md="6">
                            <Form.Label htmlFor="inputEmailS">Email Secundário</Form.Label>
                            <Form.Control value={pesEmail2}
                                onChange={(e) => setPesEmail2(e.target.value)}
                                type="text" id="inputEmailS" />
                        </Col>
                    </Row>

                    <br />

                    <Row>
                        <Col md="2">
                            <Form.Label htmlFor="inputEndNum">Número</Form.Label>
                            <Form.Control value={pesEndNum} type="text" id="inputEndNum" onChange={(e) => setPesEndNum(e.target.value)} required />
                        </Col>
                        <Col md="4">
                            <Form.Label htmlFor="inputEndCompl">Complemento</Form.Label>
                            <Form.Control value={pesEndCompl}
                                onChange={(e) => setPesEndCompl(e.target.value)}
                                type="text" id="inputEndCompl" />
                        </Col>
                    </Row>
                    <Toolbar />
                </Form>
            </Container>
            <Footer />
        </div>
    );
};
export default cadastroPraticante;