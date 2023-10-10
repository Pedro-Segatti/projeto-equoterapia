import React, { useState, useEffect } from 'react';
import { ReactNotifications } from "react-notifications-component";
import Menu from "./menu";
import { Form, Col, Row, Container } from 'react-bootstrap';
import { registroSalvo, registroExcluido } from "../utilitario/mensagemUtil";
import { api } from "../utilitario/baseComunicacao";
import Toolbar from "./toolbar";
import Footer from './footer';
import HTTP_STATUS from "../utilitario/httpStatus";

const configuracoes = () => {
    const [confId, setConfId] = useState("");
    const [confEmail, setConfEmail] = useState("");
    const [confEmailPassword, setConfEmailPassword] = useState("");
    const [confEmailCorpo, setConfEmailCorpo] = useState("");
    const [loading, setLoading] = useState(false);

    const buscaConfiguracao = async () => {
        const response = await api.get("/configuracoes");
        const { confId, confEmail, confEmailPassword, confEmailCorpo } = response.data;

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
    }

    useEffect(() => {
        buscaConfiguracao();
    }, []);

    const enviaJsonGravar = () => {
        const json = {
            "confId": confId,
            "confEmail": confEmail,
            "confEmailPassword": confEmailPassword,
            "confEmailCorpo": confEmailCorpo
        };
        api.post("/configuracoes", json);
        registroSalvo();
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
            {!loading && <Container className="vh-100">
                <Form onSubmit={handleSubmit}>
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
                                value={confEmailCorpo}
                                onChange={(e) => setConfEmailCorpo(e.target.value)}
                                type="text"
                                as="textarea"
                                className="textArea"
                            />
                        </Col>
                    </Row>
                    <Toolbar jsonRemove={enviaJsonRemove} pesquisarHidden={true} />
                    <div dangerouslySetInnerHTML={{ __html: confEmailCorpo }} />
                </Form>
            </Container>
            }
            <Footer />
        </div >
    );
};

export default configuracoes;