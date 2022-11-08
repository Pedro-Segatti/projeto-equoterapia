import React, { useState } from 'react';
import { Form, Col, Row, Container } from 'react-bootstrap';
import Toolbar from '../toolbar';
import PesquisaAvalSocioEcon from "../pesquisas/pesquisaAvalSocioecon";
import { registroSalvo, registroExcluido } from "../../utilitario/mensagemUtil";
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { api } from "../../utilitario/baseComunicacao";
import Menu from "../menu";
import Footer from "../footer";
import HTTP_STATUS from "../../utilitario/httpStatus";

function movimentoAvalSocioecon() {
    const [abrirPesquisa, setAbrirPesquisa] = useState(false);

    //Variáveis de cadastro
    const [aseId, setAseId] = useState("");
    const [aseObsContFam, setAseObsContFam] = useState("");
    const [aseObsMedicamentos, setAseObsMedicamentos] = useState("");
    const [aseIdPraticante, setAseIdPraticante] = useState("");

    //variáveis da dialog de pesquisa
    var [list, setList] = useState([]);

    const atualizaDlgPesquisa = async () => {
        setList(await (await api.get("/pesquisaAvalSocioEcon")).data);
        setAbrirPesquisa(true);
    }

    const atualizaItemSelecionado = (item) => {
        setAseId(item.aseId);
        setAseObsContFam(item.aseObsContFam);
        setAseObsMedicamentos(item.aseObsMedicamentos);
        setAseIdPraticante(item.aseIdPraticante);
        setAbrirPesquisa(false);
    }

    const enviaJsonGravar = () => {
        const json = {
            "aseId": aseId,
            "aseObsContFam": aseObsContFam,
            "aseObsMedicamentos": aseObsMedicamentos,
            "aseIdPraticante": aseIdPraticante
        };
        api.post("/cadastraAvalSocioEcon", json);
        registroSalvo();
    }

    const enviaJsonRemove = async () => {
        if (aseId === "") {
            return;
        }
        try {
            const response = await (await api.delete("/removeAvalSocioEcon?aseId=" + aseId));
            if (response.status === HTTP_STATUS.OK) {
                registroExcluido();
                limparCamposFormulario();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const limparCamposFormulario = () => {
        setAseId("");
        setAseObsContFam("");
        setAseIdPraticante("");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        enviaJsonGravar();
        limparCamposFormulario();
    }

    const movimentoAvalSocioecon = () => {
        return (
            <div>
                <Menu />
                <ReactNotifications />
                <Container className="vh-100">
                    <Form onSubmit={handleSubmit}>
                        <br />
                        <Row>
                            <h3>Avaliação Socioeconômica</h3>
                        </Row>
                        <Row>
                            <Col md="2">
                                <Form.Label htmlFor="aseId">Código</Form.Label>
                                <Form.Control value={aseId} type="text" id="id" disabled />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <Form.Label htmlFor="aseObsContFam">Observação Controle Familiar</Form.Label>
                                <Form.Control value={aseObsContFam}
                                    onChange={(e) => setAseObsContFam(e.target.value)}
                                    type="text" id="aseObsContFam" as="textarea" className='textArea' />
                            </Col>
                            <Col md="6">
                                <Form.Label htmlFor="aseObsMedicamentos">Osbervação Medicamentos</Form.Label>
                                <Form.Control value={aseObsMedicamentos}
                                    onChange={(e) => setAseObsMedicamentos(e.target.value)}
                                    type="text" id="aseObsMedicamentos" as="textarea" className='textArea' />
                            </Col>
                        </Row>
                        <br />
                        <Toolbar jsonRemove={enviaJsonRemove} abrirPesquisa={atualizaDlgPesquisa} />
                    </Form>
                </Container>
                {abrirPesquisa &&
                    <PesquisaAvalSocioEcon setValores={setList} valores={list} atualizaItemSelecionado={atualizaItemSelecionado} setAbrirPesquisa={setAbrirPesquisa} />
                }
                <Footer />
            </div >
        )
    }
    return movimentoAvalSocioecon();
}
export default movimentoAvalSocioecon;