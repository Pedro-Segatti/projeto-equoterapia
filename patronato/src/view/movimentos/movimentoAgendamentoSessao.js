import React, { useState } from 'react';
import Toolbar from '../toolbar';
import Menu from "../menu";
import Footer from "../footer";
import { ReactNotifications } from 'react-notifications-component';
import { registroSalvo, registroExcluido, mensagemCustomizada } from "../../utilitario/mensagemUtil"
import HTTP_STATUS from "../../utilitario/httpStatus";
import { Form, Col, Row, Container, Card, Button } from 'react-bootstrap';
import InputConverter from '../componentes/inputConverter';
import { api } from "../../utilitario/baseComunicacao";
import PesquisaPraticantes from '../pesquisas/pesquisaPraticantes';
import PesquisaAgendamentos from '../pesquisas/pesquisaAgendamentos';
import { dataApiFormatada, dataFormatadaAnoMesDia, horaFormatada } from '../../utilitario/dateUtil';

import PesquisaAnimais from "../pesquisas/pesquisaAnimais";
import PesquisaFuncionario from '../pesquisas/pesquisaFuncionario';
import PesquisaMaterial from '../pesquisas/pesquisaMaterial';
import { TablePaginada } from "../pesquisas/pesquisaAnimais";
import { TableFuncionariosPaginada } from "../pesquisas/pesquisaFuncionario";
import { TableMaterialPaginada } from "../pesquisas/pesquisaMaterial";

const movimentoAgendamentoSessao = () => {
    const [agdId, setAgdId] = useState("");
    const [agdData, setAgdData] = useState("");
    const [agdHora, setAgdHora] = useState("");
    const [agdPraticante, setAgdPraticante] = useState({ "pessoa": { "pesNome": "" } });
    const [agdDescricao, setAgdDescricao] = useState("");
    const [agdObservacoes, setAgdObservacoes] = useState("");
    const [agdConcluido, setAgdConcluido] = useState(false);
    const [agendamentoMaterialList, setAgendamentoMaterialList] = useState([]);
    const [agendamentoFuncionarioList, setAgendamentoFuncionarioList] = useState([]);
    const [agendamentoAnimalList, setAgendamentoAnimalList] = useState([]);


    const [listPraticantes, setListPraticantes] = useState([]);
    const [abrirPesquisaPraticante, setAbrirPesquisaPraticante] = useState(false);

    const [listAgendamentos, setListAgendamentos] = useState([]);
    const [abrirPesquisaAgendamento, setAbrirPesquisaAgendamento] = useState(false);

    const [abrirPesquisaAnimal, setAbrirPesquisaAnimal] = useState(false);
    const [abrirPesquisaFuncionario, setAbrirPesquisaFuncionario] = useState(false);
    const [abrirPesquisaMaterial, setAbrirPesquisaMaterial] = useState(false);
    var [listAnimal, setListAnimal] = useState([]);
    var [listFuncionario, setListFuncionario] = useState([]);
    var [listMaterial, setListMaterial] = useState([]);

    const atualizaDlgPesquisaAnimal = async () => {
        setListAnimal(await (await api.get("/pesquisaAnimal?aniId=&aniNome=")).data);
        setAbrirPesquisaAnimal(true);
    }

    const atualizaDlgPesquisaFuncionario = async () => {
        setListFuncionario(await (await api.get("/pesquisaFuncionario?pesCpf=&pesNome=")).data);
        setAbrirPesquisaFuncionario(true);
    }

    const removeAnimalSelecionado = (item) => {
        var array = [...agendamentoAnimalList];
        var index = array.indexOf(item);
        if (index !== -1) {
            array.splice(index, 1);
            setAgendamentoAnimalList(array);
        }
    }

    const removeFuncionarioSelecionado = (item) => {
        var array = [...agendamentoFuncionarioList];
        var index = array.indexOf(item);
        if (index !== -1) {
            array.splice(index, 1);
            setAgendamentoFuncionarioList(array);
        }
    }

    const removeMaterialSelecionado = (item) => {
        var array = [...agendamentoMaterialList];
        var index = array.indexOf(item);
        if (index !== -1) {
            array.splice(index, 1);
            setAgendamentoMaterialList(array);
        }
    }

    const atualizaAgendamentoSelecionado = (item) => {
        setAgdId(item.agdId)
        setAgdData(dataFormatadaAnoMesDia(item.agdData))
        setAgdHora(item.agdHora)
        setAgdPraticante(item.praticante);
        setAgdDescricao(item.agdDescricao);
        setAgdObservacoes(item.agdObservacoes);
        setAgendamentoAnimalList(item.animalList);
        setAgendamentoFuncionarioList(item.funcionarioList);
        setAgendamentoMaterialList(item.materialList);
        setAbrirPesquisaAgendamento(false);
        setAgdConcluido(item.agdConcluido);
    }

    const atualizaAnimalSelecionado = (item) => {
        setAgendamentoAnimalList(current => [...current, item])
        setAbrirPesquisaAnimal(false);
    }

    const atualizaFuncionarioSelecionado = (item) => {
        setAgendamentoFuncionarioList(current => [...current, item])
        setAbrirPesquisaFuncionario(false);
    }

    const atualizaMaterialSelecionado = (item) => {
        setAgendamentoMaterialList(current => [...current, item])
        setAbrirPesquisaMaterial(false);
    }

    const atualizaDlgPesquisaPraticante = async () => {
        setListPraticantes(await (await api.get("/pesquisaPraticantes")).data);
        setAbrirPesquisaPraticante(true);
    }

    const atualizaDlgPesquisaMaterial = async () => {
        setListMaterial(await (await api.get("/pesquisaMaterial?matId=&matDescricao=")).data);
        setAbrirPesquisaMaterial(true);
    }

    const atualizaPraticanteSelecionado = (item) => {
        setAgdPraticante(item)
        setAbrirPesquisaPraticante(false);
    }

    const atualizaDlgPesquisa = async () => {
        setListAgendamentos(await (await api.get("/pesquisaAgendamentos")).data);
        setAbrirPesquisaAgendamento(true);
    }

    const removerAgendamento = async () => {
        try {
            const response = await (await api.delete("/removerAgendamento?agdId=" + agdId));
            if (response.status === HTTP_STATUS.OK) {
                registroExcluido();
                limparCamposFormulario();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (agdPraticante.pessoa.pesNome === "") {
            mensagemCustomizada("Selecione um praticante", "warning");
            document.getElementById("botaoPraticante").focus();
            return;
        }

        var jsonAgendamento = {
            "agdId": agdId,
            "agdData": dataApiFormatada(agdData),
            "agdHora": horaFormatada(agdHora),
            "agdDescricao": agdDescricao,
            "agdConcluido": agdConcluido,
            "praticante": agdPraticante,
            "agdObservacoes": agdObservacoes,
            "materialList": agendamentoMaterialList,
            "funcionarioList": agendamentoFuncionarioList,
            "animalList": agendamentoAnimalList
        }

        const response = await api.post("/cadastrarAgendamento", jsonAgendamento);
        if (response.status === HTTP_STATUS.OK) {
            registroSalvo();
            limparCamposFormulario();
        } else if (response.status === HTTP_STATUS.ALREADY_REPORTED) {
            mensagemCustomizada(response.data, "warning");
        }
    }

    const limparCamposFormulario = () => {
        setAgdId("");
        setAgdData("");
        setAgdHora("");
        setAgdPraticante({ "pessoa": { "pesNome": "" } });
        setAgdDescricao("");
        setAgdObservacoes("");
        setAgendamentoMaterialList([]);
        setAgendamentoFuncionarioList([]);
        setAgendamentoAnimalList([]);
        setAgdConcluido(false);
    }

    return (
        <div>
            <Menu tituloPagina={"Agendamento de Sessão"} />
            <ReactNotifications />
            <Container>
                <Form onSubmit={handleSubmit}>
                    <br />
                    <Row>
                        <h3>Agendamento de Sessão</h3>
                    </Row>

                    <Row>
                        <Col md="2">
                            <Form.Label htmlFor="inputId">Código</Form.Label>
                            <Form.Control value={agdId} type="text" id="id" disabled />
                        </Col>
                        <Col md="2">
                            <Form.Label htmlFor="inputData">Data *</Form.Label>
                            <Form.Control value={agdData}
                                onChange={(e) => setAgdData(e.target.value)}
                                type="date" id="inputDate" required />
                        </Col>
                        <Col md="2">
                            <Form.Label htmlFor="inputHora">Hora *</Form.Label>
                            <Form.Control value={agdHora}
                                onChange={(e) => setAgdHora(e.target.value)}
                                type="time" id="inputHora" required />
                        </Col>
                        <Col md="2">
                            <Form.Label htmlFor="checkConcluido"></Form.Label>
                            <Form.Check id="checkConcluido" checked={agdConcluido}
                                onChange={(e) => setAgdConcluido(e.target.checked)}
                                type="checkbox" label="Concluído" />
                        </Col>
                    </Row>

                    <Row>
                        <Col md="12">
                            <Form.Label htmlFor="inputDescricao">Descrição *</Form.Label>
                            <Form.Control value={agdDescricao} maxLength={60}
                                onChange={(e) => setAgdDescricao(e.target.value)}
                                type="text" id="descricao" required />
                        </Col>
                    </Row>

                    <Row>
                        <Col md="6">
                            <Form.Label htmlFor="inputLPraticante">Praticante *</Form.Label>
                            <InputConverter idBtn={"botaoPraticante"} descricao={agdPraticante.pessoa.pesNome} atualizaDlgPesquisa={atualizaDlgPesquisaPraticante} />
                        </Col>
                    </Row>

                    <Row>
                        <Col md="12">
                            <Form.Label>Observações:</Form.Label>
                            <Form.Control
                                value={agdObservacoes}
                                onChange={(e) => setAgdObservacoes(e.target.value)}
                                type="text"
                                as="textarea"
                                className="textArea"
                            />
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                            <Card>
                                <div className='marginLeft'>
                                    <b>Animais</b>
                                    <Col md="2">
                                        <Button id='btnAnimal' variant="primary" className='btn-success btnMarginTop' onClick={atualizaDlgPesquisaAnimal}>Adicionar</Button>
                                    </Col>
                                    <TablePaginada data={agendamentoAnimalList} rowsPerPage={5} selecionaLinha={false} removeAnimalSelecionado={removeAnimalSelecionado} />
                                </div>
                            </Card>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                            <Card>
                                <div className='marginLeft'>
                                    <b>Funcionários</b>
                                    <Col md="2">
                                        <Button id='btnFuncionario' variant="primary" className='btn-success btnMarginTop' onClick={atualizaDlgPesquisaFuncionario}>Adicionar</Button>
                                    </Col>
                                    <TableFuncionariosPaginada data={agendamentoFuncionarioList} rowsPerPage={5} selecionaLinha={false} removeItemSelecionado={removeFuncionarioSelecionado} />
                                </div>
                            </Card>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                            <Card>
                                <div className='marginLeft'>
                                    <b>Materiais</b>
                                    <Col md="2">
                                        <Button id='btnMaterial' variant="primary" className='btn-success btnMarginTop' onClick={atualizaDlgPesquisaMaterial}>Adicionar</Button>
                                    </Col>
                                    <TableMaterialPaginada data={agendamentoMaterialList} rowsPerPage={5} selecionaLinha={false} removeItemSelecionado={removeMaterialSelecionado} />
                                </div>
                            </Card>
                        </Col>
                    </Row>

                    <Toolbar jsonRemove={removerAgendamento} abrirPesquisa={atualizaDlgPesquisa} />
                </Form>
            </Container>

            {abrirPesquisaPraticante &&
                <PesquisaPraticantes setValores={setListPraticantes} valores={listPraticantes} atualizaItemSelecionado={atualizaPraticanteSelecionado} setAbrirPesquisa={setAbrirPesquisaPraticante} />
            }

            {abrirPesquisaAgendamento &&
                <PesquisaAgendamentos setValores={setListAgendamentos} valores={listAgendamentos} atualizaItemSelecionado={atualizaAgendamentoSelecionado} setAbrirPesquisa={setAbrirPesquisaAgendamento} />
            }
            {abrirPesquisaAnimal &&
                <PesquisaAnimais setValores={setListAnimal} valores={listAnimal} atualizaItemSelecionado={atualizaAnimalSelecionado} setAbrirPesquisa={setAbrirPesquisaAnimal} />
            }
            {abrirPesquisaFuncionario &&
                <PesquisaFuncionario setValores={setListFuncionario} valores={listFuncionario} atualizaItemSelecionado={atualizaFuncionarioSelecionado} setAbrirPesquisa={setAbrirPesquisaFuncionario} />
            }
            {abrirPesquisaMaterial &&
                <PesquisaMaterial setValores={setListMaterial} valores={listMaterial} atualizaItemSelecionado={atualizaMaterialSelecionado} setAbrirPesquisa={setAbrirPesquisaMaterial} />
            }
            <Footer />
        </div >
    )
}

export default movimentoAgendamentoSessao;