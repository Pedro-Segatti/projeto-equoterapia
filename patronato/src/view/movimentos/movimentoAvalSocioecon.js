import React, { useState } from 'react';
import { Form, Col, Row, Container } from 'react-bootstrap';
import Toolbar from '../toolbar';
import PesquisaAvalSocioEcon from "../pesquisas/pesquisaAvalSocioecon";
import PesquisaPraticantes from "../pesquisas/pesquisaPraticantes";
import { registroSalvo, registroExcluido, mensagemCustomizada } from "../../utilitario/mensagemUtil";
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { api } from "../../utilitario/baseComunicacao";
import Menu from "../menu";
import Footer from "../footer";
import HTTP_STATUS from "../../utilitario/httpStatus";
import InputConverter from "../inputConverter";

function movimentoAvalSocioecon() {
    const [abrirPesquisa, setAbrirPesquisa] = useState(false);
    const [abrirPesquisaPraticante, setAbrirPesquisaPraticante] = useState(false);

    //Variáveis de cadastro
    const [aseId, setAseId] = useState("");
    const [aseData, setAseData] = useState("");
    const [aseObsContFam, setAseObsContFam] = useState("");
    const [aseObsMedicamentos, setAseObsMedicamentos] = useState("");
    const [praticante, setPraticante] = useState({"pessoa":{"pesNome":""}});

    //variáveis da dialog de pesquisa
    var [list, setList] = useState([]);
    var [listPraticantes, setListPraticantes] = useState([]);

    const atualizaDlgPesquisa = async () => {
        setList(await (await api.get("/pesquisaAvalSocioEcon")).data);
        setAbrirPesquisa(true);
    }

    const atualizaDlgPesquisaPraticantes = async () => {
        setListPraticantes(await (await api.get("/pesquisaPraticantes")).data);
        setAbrirPesquisaPraticante(true);
    }

    const atualizaPraticanteSelecionado = async (item) => {
        await setPraticante(item);
        setAbrirPesquisaPraticante(false);
    }

    const atualizaItemSelecionado = (item) => {
        setAseId(item.aseId);
        setAseData(item.aseData);
        setAseObsContFam(item.aseObsContFam);
        setAseObsMedicamentos(item.aseObsMedicamentos);
        setPraticante(item.praticante);
        setAbrirPesquisa(false);
    }

    const enviaJsonGravar = () => {
        const json = {
            "aseId": aseId,
            "aseData": aseData,
            "aseObsContFam": aseObsContFam,
            "aseObsMedicamentos": aseObsMedicamentos,
            "praticante": praticante
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
        setAseData("");
        setAseObsContFam("");
        setAseObsMedicamentos("");
        setPraticante({"pessoa":{"pesNome":""}});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(praticante.pessoa.pesNome === ""){
            mensagemCustomizada("Selecione um Praticante","warning");
            document.getElementById("btnPraticante").focus();
            return;
        }
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
                            <Col md="2">
                                <Form.Label htmlFor="inputDate">Data da Avaliação</Form.Label>
                                <Form.Control value={aseData}
                                              onChange={(e) => setAseData(e.target.value)}
                                              type="date" id="inputDate" required />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <Form.Label htmlFor="aseId">Praticante</Form.Label>
                                <InputConverter idBtn={"btnPraticante"} descricao={praticante.pessoa.pesNome} atualizaDlgPesquisa={atualizaDlgPesquisaPraticantes} />
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
                {abrirPesquisaPraticante &&
                    <PesquisaPraticantes setValores={setListPraticantes} valores={listPraticantes} atualizaItemSelecionado={atualizaPraticanteSelecionado} setAbrirPesquisa={setAbrirPesquisaPraticante} />
                }
                <Footer />
            </div >
        )
    }
    return movimentoAvalSocioecon();
}
export default movimentoAvalSocioecon;