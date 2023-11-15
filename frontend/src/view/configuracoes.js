import React, { useState, useEffect } from 'react';
import { ReactNotifications } from "react-notifications-component";
import Menu from "./menu";
import { Form, Col, Row, Container, Image, Modal, Button, Table } from 'react-bootstrap';
import { registroSalvo, registroExcluido } from "../utilitario/mensagemUtil";
import { api } from "../utilitario/baseComunicacao";
import Toolbar from "./toolbar";
import Footer from './footer';
import HTTP_STATUS from "../utilitario/httpStatus";
import { base64NoPhoto } from "../utilitario/equoterapiaUtil";
import estilos from './style/configuracoes.module.css';


const configuracoes = () => {
    const [confId, setConfId] = useState("");
    const [confEmail, setConfEmail] = useState("");
    const [confEmailPassword, setConfEmailPassword] = useState("");
    const [confEmailCorpo, setConfEmailCorpo] = useState("");
    const [confImageLogo, setConfImageLogo] = useState("");
    const [confImageLoading, setConfImageLoading] = useState("");
    const [confImageLogin, setConfImageLogin] = useState("");
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);

    const variables = [
        { name: "[Nome do Destinatario]", description: "Nome do destinatário do e-mail" },
        { name: "[Data]", description: "Data da sessão de equoterapia" },
        { name: "[Hora]", description: "Hora da sessão de equoterapia" },
        { name: "[Animais]", description: "Cavalos da sessão de equoterapia" },
        { name: "[Profissionais]", description: "Profissionais da sessão de equoterapia" },
    ];

    const insertVariable = (variable) => {
        const textarea = document.getElementById("confEmailCorpo");
        const cursorPosition = textarea.selectionStart;
        const textBeforeCursor = textarea.value.substring(0, cursorPosition);
        const textAfterCursor = textarea.value.substring(cursorPosition);
        const insertedText = variable.name;

        setConfEmailCorpo(textBeforeCursor + insertedText + textAfterCursor);
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const selecionaLogo = (e) => {
        try {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setConfImageLogo(reader.result);
                }
            }

            reader.readAsDataURL(e.target.files[0]);
        } catch (error) {
            console.log(error);
        }
    }

    const selecionaGif = (e) => {
        try {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setConfImageLoading(reader.result);
                }
            }

            reader.readAsDataURL(e.target.files[0]);
        } catch (error) {
            console.log(error);
        }
    }

    const selecionaBanner = (e) => {
        try {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setConfImageLogin(reader.result);
                }
            }

            reader.readAsDataURL(e.target.files[0]);
        } catch (error) {
            console.log(error);
        }
    }

    const buscaConfiguracao = async () => {
        const response = await api.get("/configuracoes");
        const { confId, confEmail, confEmailPassword, confEmailCorpo, confImageLogo, confImageLoading, confImageLogin } = response.data;

        setConfId(confId);
        if (confEmail) {
            setConfEmail(confEmail);
        }
        if (confEmailPassword) {
            setConfEmailPassword(confEmailPassword);
        }
        if (confEmailCorpo) {
            setConfEmailCorpo(confEmailCorpo);
        }
        if (confImageLogo) {
            setConfImageLogo(confImageLogo);
        }
        if (confImageLoading) {
            setConfImageLoading(confImageLoading);
        }
        if (confImageLogin) {
            setConfImageLogin(confImageLogin);
        }
    }

    useEffect(() => {
        buscaConfiguracao();
    }, []);

    const enviaJsonGravar = async () => {
        try {
            const json = {
                "confId": confId,
                "confEmail": confEmail,
                "confEmailPassword": confEmailPassword,
                "confEmailCorpo": confEmailCorpo,
                "confImageLogo": confImageLogo,
                "confImageLoading": confImageLoading,
                "confImageLogin": confImageLogin,
            };
            const response = await api.post("/configuracoes", json);

            if (response.status === 200) {
                registroSalvo();
            }
        } catch (error) {
            console.log(error);
        }

    }

    const enviaJsonRemove = async () => {
        if (confId === "") {
            return;
        }
        try {
            const response = await api.delete("/removeConfiguracoes?confId=" + confId);
            if (response.status === HTTP_STATUS.OK) {
                registroExcluido();
                limparCamposFormulario()
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await enviaJsonGravar();
        setLoading(false);
    }


    const limparCamposFormulario = () => {
        setConfEmail("");
        setConfEmailPassword("");
        setConfEmailCorpo("");
    }

    return (
        <div>
            <Menu tituloPagina={"Configurações"} />
            <ReactNotifications />
            {!loading && <Container>
                <Form onSubmit={handleSubmit}>
                    <br />

                    <Row>
                        <h3>Configurações</h3>
                    </Row>

                    <br />

                    <Row>
                        <Col md="4" className={`${estilos.centered}`}>
                            <Image id="imgPessoa" onClick={() => setConfImageLogo(base64NoPhoto)} src={confImageLogo}></Image>

                            <Form.Control type="file" id="inputFoto" accept="image/png, image/jpg, image/jpeg" onChange={selecionaLogo} />
                            <Form.Label htmlFor="inputFoto" className='label-input-file'>Selecione a Logo</Form.Label>
                        </Col>
                        <Col md="4" className={`${estilos.centered}`}>
                            <Image id="imgPessoa" onClick={() => setConfImageLoading(base64NoPhoto)} src={confImageLoading}></Image>

                            <Form.Control type="file" id="inputCarregando" accept="image/gif" onChange={selecionaGif} />
                            <Form.Label htmlFor="inputCarregando" className='label-input-file'>Selecione o Gif de Carregando</Form.Label>
                        </Col>
                        <Col md="4" className={`${estilos.centered}`}>
                            <Image id="imgPessoa" onClick={() => setConfImageLogin(base64NoPhoto)} src={confImageLogin}></Image>

                            <Form.Control type="file" id="inputBanner" accept="image/png, image/jpg, image/jpeg" onChange={selecionaBanner} />
                            <Form.Label htmlFor="inputBanner" className='label-input-file'>Selecione O Banner</Form.Label>
                        </Col>
                    </Row>

                    <hr />
                    <br />
                    <br />

                    <Row>
                        <h3>Envio de e-mails:</h3>
                    </Row>

                    <Row>
                        <Col md="6">
                            <Form.Label htmlFor="inputEmail">E-mail do Remetente</Form.Label>
                            <Form.Control value={confEmail} maxLength={100}
                                onChange={(e) => setConfEmail(e.target.value)}
                                type="text" id="descricao" required />
                        </Col>
                        <Col md="6">
                            <Form.Label htmlFor="inputEmailPassword">Senha</Form.Label>
                            <Form.Control value={confEmailPassword}
                                onChange={(e) => setConfEmailPassword(e.target.value)}
                                type="password" id="inputEmailPassword" />
                        </Col>
                    </Row>

                    <Row>
                        <Col md="12">
                            <Form.Label>Corpo do Email:</Form.Label>
                            <Form.Control
                                id="confEmailCorpo"
                                value={confEmailCorpo}
                                onChange={(e) => {
                                    setConfEmailCorpo(e.target.value);
                                }}
                                type="text"
                                as="textarea"
                                style={{ height: '800px' }} // Defina a altura desejada em pixels
                                className="textArea"
                            />
                        </Col>

                        <Col md="12" className={`${estilos.right}`}>
                            <br />

                            <Button variant="primary" onClick={handleShow}>
                                Variáveis Disponíveis
                            </Button>
                        </Col>


                    </Row>

                    <br />

                    <Row>
                        <h3>Pré-Visualização de E-mail</h3>
                    </Row>
                    <iframe title="contentMail"
                        id="myFrame" width="100%" height="850" srcDoc={confEmailCorpo} ></iframe>

                    <Toolbar jsonRemove={enviaJsonRemove} pesquisarHidden={true} />
                </Form>
            </Container>
            }
            <Footer />

            <Modal className='modal-md' show={show}>
                <Modal.Header><b>Variáveis Disponíveis</b></Modal.Header>
                <Modal.Body>
                    <Container>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Variável</th>
                                    <th>Descrição</th>
                                    <th>Ação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {variables.map((variable, index) => (
                                    <tr key={index}>
                                        <td>{variable.name}</td>
                                        <td>{variable.description}</td>
                                        <td>
                                            <Button
                                                variant="primary"
                                                onClick={() => insertVariable(variable)}
                                            >
                                                Inserir
                                            </Button>                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" className='btn-danger' onClick={handleClose}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >
    );
};

export default configuracoes;