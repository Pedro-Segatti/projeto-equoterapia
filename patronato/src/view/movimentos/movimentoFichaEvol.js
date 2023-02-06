import React, { useState } from 'react';
import { Form, Col, Row, Container, Button, Card, Modal, Table } from 'react-bootstrap';
import Toolbar from '../toolbar';
import { registroSalvo, registroExcluido, mensagemCustomizada } from "../../utilitario/mensagemUtil";
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import PesquisaAnimais from "../pesquisas/pesquisaAnimais";
import { TablePaginada } from "../pesquisas/pesquisaAnimais";
import { TablePicadeiroPaginada } from "../pesquisas/pesquisaPicadeiro";
import { TablePraticantesPaginada } from "../pesquisas/pesquisaPraticantes";
import { TableFuncionariosPaginada } from "../pesquisas/pesquisaFuncionario";
import PesquisaFichaEvol from "../pesquisas/pesquisaFichaEvol";
import PesquisaMontaria from "../pesquisas/pesquisaMontaria";
import PesquisaPicadeiro from "../pesquisas/pesquisaPicadeiro";
import PesquisaPraticantes from '../pesquisas/pesquisaPraticantes';
import PesquisaFuncionario from '../pesquisas/pesquisaFuncionario';
import PesquisaAtividade from '../pesquisas/pesquisaAtividade';
import PesquisaMaterial from '../pesquisas/pesquisaMaterial';
import InputConverter from "../inputConverter";
import useTable from '../table/useTable';
import { BsXLg } from "react-icons/bs";
import TableFooter from '../table/tableFooter';
import HTTP_STATUS from "../../utilitario/httpStatus";
import dayjs from 'dayjs';

import Menu from "../menu"
import Footer from "../footer"
import { api } from "../../utilitario/baseComunicacao";

function cadastroFichaEvol() {
    const [abrirPesquisa, setAbrirPesquisa] = useState(false);
    const [abrirPesquisaAnimal, setAbrirPesquisaAnimal] = useState(false);
    const [abrirPesquisaMontaria, setAbrirPesquisaMontaria] = useState(false);
    const [abrirPesquisaPicadeiro, setAbrirPesquisaPicadeiro] = useState(false);
    const [abrirPesquisaPraticante, setAbrirPesquisaPraticante] = useState(false);
    const [abrirPesquisaFuncionario, setAbrirPesquisaFuncionario] = useState(false);
    const [abrirAtividadeMaterial, setAbrirAtividadeMaterial] = useState(false);
    const [abrirPesquisaAtividade, setAbrirPesquisaAtividade] = useState(false);
    const [abrirPesquisaMaterial, setAbrirPesquisaMaterial] = useState(false);
    var [list, setList] = useState([]);
    var [listAnimal, setListAnimal] = useState([]);
    var [listMontaria, setListMontaria] = useState([]);
    var [listPicadeiro, setListPicadeiro] = useState([]);
    var [listPraticante, setListPraticante] = useState([]);
    var [listFuncionario, setListFuncionario] = useState([]);
    var [listAtividade, setListAtividade] = useState([]);
    var [listMaterial, setListMaterial] = useState([]);
    var [listAtividadeMaterial, setListAtividadeMaterial] = useState([]);

    var [ativMaterialMat, setAtivMaterialMat] = useState({ "matDescricao": "" });
    var [ativMaterialAtiv, setAtivMaterialAtiv] = useState({ "atvDescricao": "" });

    const atualizaDlgPesquisa = async () => {
        setList(await (await api.get("/pesquisaFichaEvol")).data);
        setAbrirPesquisa(true);
    }

    const atualizaDlgPesquisaAnimal = async () => {
        setListAnimal(await (await api.get("/pesquisaAnimal?aniId=&aniNome=")).data);
        setAbrirPesquisaAnimal(true);
    }

    const atualizaDlgPesquisaMontaria = async () => {
        setListMontaria(await (await api.get("/pesquisaMontaria")).data);
        setAbrirPesquisaMontaria(true);
    }

    const atualizaDlgPesquisaAtividade = async () => {
        setListAtividade(await (await api.get("/pesquisaAtividade?atvId=&atvDescricao=")).data);
        setAbrirPesquisaAtividade(true);
    }

    const atualizaDlgPesquisaMaterial = async () => {
        setListMaterial(await (await api.get("/pesquisaMaterial?matId=&matDescricao=")).data);
        setAbrirPesquisaMaterial(true);
    }

    const atualizaDlgPesquisaPicadeiro = async () => {
        setListPicadeiro(await (await api.get("/pesquisaPicadeiro?picId=&picDescricao=")).data);
        setAbrirPesquisaPicadeiro(true);
    }

    const atualizaDlgPesquisaPraticante = async () => {
        setListPraticante(await (await api.get("/pesquisaPraticantes")).data);
        setAbrirPesquisaPraticante(true);
    }

    const atualizaDlgPesquisaFuncionario = async () => {
        setListFuncionario(await (await api.get("/pesquisaFuncionario?pesCpf=&pesNome=")).data);
        setAbrirPesquisaFuncionario(true);
    }

    //Variáveis de cadastro
    const [evolId, setEvolId] = useState("");
    const [evolClima, setEvolClima] = useState("");
    const [evolHumor, setEvolHumor] = useState("");
    const [evolAtenc, setEvolAtenc] = useState("");
    const [evolData, setEvolData] = useState("");
    const [evolAuton, setEvolAuton] = useState("");
    const [evolEstereotipia, setEvolEstereotipia] = useState("");
    const [evolPost, setEvolPost] = useState("");
    const [evolProg, setEvolProg] = useState("");
    const [evolReg, setEvolReg] = useState("");
    const [evolObs, setEvolObs] = useState("");
    const [evolRecLudicos, setEvolRecLudicos] = useState(false);
    const selecionaRecLudicos = () => setEvolRecLudicos(!evolRecLudicos)
    const [evolQuaisRecLud, setEvolQuaisRecLud] = useState("");
    const [evolObsRecLud, setEvolObsRecLud] = useState("");
    const [evolDecubito, setEvolDecubito] = useState("");
    const [evolCompAni, setEvolCompAni] = useState("");
    const [evolAndAni, setEvolAndAni] = useState("");
    const [evolIdMont, setEvolIdMont] = useState({ "montDescricao": "" });
    const [evolAniSelecionado, setEvolAniSelecionado] = useState([]);
    const [evolPicSelecionado, setEvolPicSelecionado] = useState([]);
    const [evolPratSelecionado, setEvolPratSelecionado] = useState([]);
    const [evolFuncSelecionado, setEvolFuncSelecionado] = useState([]);

    const atualizaEvolSelecionada = (item) => {
        setEvolId(item.evolId);
        setEvolClima(item.evolClima || '');
        setEvolHumor(item.evolHumor || '');
        setEvolAtenc(item.evolAtenc || '');
        setEvolData(dayjs(item.evolData).format('YYYY-MM-DD') || '');
        setEvolAuton(item.evolAuton || '');
        setEvolEstereotipia(item.evolEstereotipia || '');
        setEvolPost(item.evolPost || '');
        setEvolProg(item.evolProg || '');
        setEvolReg(item.evolReg || '');
        setEvolObs(item.evolObs || '');
        setEvolRecLudicos(item.evolRecLudicos || '');
        setEvolQuaisRecLud(item.evolQuaisRecLud || '');
        setEvolObsRecLud(item.evolObsRecLud || '');
        setEvolDecubito(item.evolDecubito || '');
        setEvolCompAni(item.evolCompAni || '');
        setEvolAndAni(item.evolAndAni || '');
        setEvolAniSelecionado(item.animalList || []);
        setEvolPicSelecionado(item.picadeiroList || []);
        setEvolPratSelecionado(item.praticanteList || []);
        setEvolFuncSelecionado(item.funcionarioList || []);
        setEvolIdMont(item.evolIdMont || { "montDescricao": "" });
        setListAtividadeMaterial(item.fichaEvolAtividadeMaterialList || []);
        setAbrirPesquisa(false);
    }

    const atualizaAtividadeMaterial = () => {
        if (ativMaterialAtiv.atvDescricao === "") {
            mensagemCustomizada("Selecione uma atividade", "warning");
            return;
        }
        if (ativMaterialMat.matDescricao === "") {
            mensagemCustomizada("Selecione um material", "warning");
            return;
        }
        const fichaEvolAtividadeMaterial = {
            "fxatId": "",
            "atividade": ativMaterialAtiv,
            "material": ativMaterialMat,
            "fichaEvolucao": ""
        }
        setListAtividadeMaterial(current => [...current, fichaEvolAtividadeMaterial])
        setAbrirAtividadeMaterial(false);
    }

    const atualizaPicadeiroSelecionado = (item) => {
        setEvolPicSelecionado(current => [...current, item])
        setAbrirPesquisaPicadeiro(false);
    }

    const atualizaAnimalSelecionado = (item) => {
        setEvolAniSelecionado(current => [...current, item])
        setAbrirPesquisaAnimal(false);
    }

    const atualizaPraticanteSelecionado = (item) => {
        setEvolPratSelecionado(current => [...current, item])
        setAbrirPesquisaPraticante(false);
    }

    const atualizaFuncionarioSelecionado = (item) => {
        setEvolFuncSelecionado(current => [...current, item])
        setAbrirPesquisaFuncionario(false);
    }

    const atualizaMontariaSelecionada = (item) => {
        setEvolIdMont(item)
        setAbrirPesquisaMontaria(false);
    }

    const atualizaAtividadeSelecionada = (item) => {
        setAtivMaterialAtiv(item)
        setAbrirPesquisaAtividade(false);
    }

    const atualizaMaterialSelecionado = (item) => {
        setAtivMaterialMat(item)
        setAbrirPesquisaMaterial(false);
    }

    const removeAnimalSelecionado = (item) => {
        var array = [...evolAniSelecionado];
        var index = array.indexOf(item);
        if (index !== -1) {
            array.splice(index, 1);
            setEvolAniSelecionado(array);
        }
    }

    const removePicadeiroSelecionado = (item) => {
        var array = [...evolPicSelecionado];
        var index = array.indexOf(item);
        if (index !== -1) {
            array.splice(index, 1);
            setEvolPicSelecionado(array);
        }
    }

    const removePraticanteSelecionado = (item) => {
        var array = [...evolPratSelecionado];
        var index = array.indexOf(item);
        if (index !== -1) {
            array.splice(index, 1);
            setEvolPratSelecionado(array);
        }
    }

    const removeFuncionarioSelecionado = (item) => {
        var array = [...evolFuncSelecionado];
        var index = array.indexOf(item);
        if (index !== -1) {
            array.splice(index, 1);
            setEvolFuncSelecionado(array);
        }
    }

    const removeAtivMatSelecionado = (item) => {
        var array = [...listAtividadeMaterial];
        var index = array.indexOf(item);
        if (index !== -1) {
            array.splice(index, 1);
            setListAtividadeMaterial(array);
        }
    }

    const enviaJsonGravar = async () => {
        var json = {
            "evolId": evolId,
            "evolClima": evolClima,
            "evolHumor": evolHumor,
            "evolAtenc": evolAtenc,
            "evolData": dayjs(evolData),
            "evolAuton": evolAuton,
            "evolEstereotipia": evolEstereotipia,
            "evolPost": evolPost,
            "evolProg": evolProg,
            "evolReg": evolReg,
            "evolObs": evolObs,
            "evolRecLudicos": evolRecLudicos,
            "evolQuaisRecLud": evolQuaisRecLud,
            "evolDecubito": evolDecubito,
            "evolObsRecLud": evolObsRecLud,
            "evolCompAni": evolCompAni,
            "evolAndAni": evolAndAni,
            "evolIdMont": evolIdMont,
            "animalList": evolAniSelecionado.map(animal => (animal)),
            "picadeiroList": evolPicSelecionado.map(picadeiro => (picadeiro)),
            "praticanteList": evolPratSelecionado.map(praticante => (praticante)),
            "funcionarioList": evolFuncSelecionado.map(funcionario => (funcionario)),
            "fichaEvolAtividadeMaterialList": []
        };
        if (evolId === "") {
            json = await (await (await api.post("/cadastraFichaEvol", json)).data);
        }
        if (listAtividadeMaterial.length > 0) {
            listAtividadeMaterial.forEach(atvm => {
                if (atvm.fxatId === "") {
                    atvm.fichaEvolucao = json.evolId;
                }
            });
            json.fichaEvolAtividadeMaterialList = listAtividadeMaterial;
        }
        await api.post("/cadastraFichaEvol", json);
        registroSalvo();
    }

    const enviaJsonRemove = async () => {
        if (evolId === "") {
            return;
        }
        try {
            const response = await (await api.delete("/removeFichaEvol?evolId=" + evolId));
            if (response.status === HTTP_STATUS.OK) {
                registroExcluido();
                limparCamposFormulario();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const atualizaRecursosLudicos = () => {
        selecionaRecLudicos();
        setEvolObsRecLud("");
        setEvolQuaisRecLud("");
    }


    const TableAtivMatPaginada = () => {
        const [pagina, setPage] = useState(1);
        const { slice, range } = useTable(listAtividadeMaterial, pagina, 5);

        return (
            <>
                <Table size="sm">
                    <thead>
                        <tr>
                            <th>Codigo</th>
                            <th>Atividade</th>
                            <th>Material</th>
                            <th className='center'>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            slice.map(item => <LinhaTabela key={item.fxatId} item={item} />)
                        }
                    </tbody>
                </Table>
                <TableFooter range={range} slice={slice} setPage={setPage} page={pagina} />
            </>
        );
    };

    const LinhaTabela = ({ item }) => {
        const { fxatId, atividade, material } = item;
        const removerItem = e => removeAtivMatSelecionado(item);

        return <tr>
            <td width={'80px'}>{fxatId}</td>
            <td>{atividade.atvDescricao}</td>
            <td>{material.matDescricao}</td>
            <td width={'80px'} className='center'>
                <Button className='btn-danger' onClick={removerItem}><BsXLg /></Button>
            </td>
        </tr>
    }

    const limparCamposFormulario = () => {
        setEvolId("");
        setEvolHumor("");
        setEvolAndAni("");
        setEvolClima("");
        setEvolAtenc("");
        setEvolData(Date().now);
        setEvolAuton("");
        setEvolEstereotipia("");
        setEvolPost("");
        setEvolProg("");
        setEvolReg("");
        setEvolObs("");
        setEvolRecLudicos("");
        setEvolQuaisRecLud("");
        setEvolDecubito("");
        setEvolObsRecLud("");
        setEvolObsRecLud("");
        setEvolCompAni("");
        setEvolAndAni("");
        setEvolIdMont("");
        setEvolData("");
        setEvolAniSelecionado([]);
        setEvolPicSelecionado([]);
        setEvolPratSelecionado([]);
        setEvolFuncSelecionado([]);
        setEvolIdMont({ "montDescricao": "" });
        setAtivMaterialAtiv({ "atvDescricao": "" });
        setAtivMaterialMat({ "matDescricao": "" });
        setListAtividadeMaterial([]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (evolIdMont.montDescricao === "") {
            mensagemCustomizada("Selecione uma montaria", "warning");
            document.getElementById("botaoMontaria").focus();
            return;
        }
        if (evolClima === "") {
            mensagemCustomizada("Selecione um clima", "warning");
            document.getElementById("clima").focus();
            return;
        }
        if (evolAniSelecionado.length < 1) {
            mensagemCustomizada("Selecione ao menos um animal", "warning");
            document.getElementById("btnAnimal").focus();
            return;
        }
        if (evolPicSelecionado.length < 1) {
            mensagemCustomizada("Selecione ao menos um Picadeiro", "warning");
            document.getElementById("btnPicadeiro").focus();
            return;
        }
        if (evolPratSelecionado.length < 1) {
            mensagemCustomizada("Selecione ao menos um Praticante", "warning");
            document.getElementById("btnPraticante").focus();
            return;
        }
        if (evolFuncSelecionado.length < 1) {
            mensagemCustomizada("Selecione ao menos um funcionário", "warning");
            document.getElementById("btnFuncionario").focus();
            return;
        }
        if (listAtividadeMaterial.length < 1) {
            mensagemCustomizada("Selecione ao menos uma atividade e material", "warning");
            document.getElementById("btnAtiv").focus();
            return;
        }
        enviaJsonGravar();
        limparCamposFormulario();
    }

    const cadastroFichaEvol = () => {
        return (
            <div>
                <Menu />
                <ReactNotifications />
                <Container>
                    <Form onSubmit={handleSubmit}>
                        <br />
                        <Row>
                            <h3>Ficha de Evolução</h3>
                        </Row>
                        <Row>
                            <Col md="2">
                                <Form.Label htmlFor="inputId">Código</Form.Label>
                                <Form.Control value={evolId} type="text" id="id" disabled />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="2">
                                <Form.Label htmlFor="inputData">Data da evolução</Form.Label>
                                <Form.Control value={evolData}
                                    onChange={(e) => setEvolData(e.target.value)}
                                    type="date" id="inputDate" required />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <Form.Label id='txTeste' htmlFor="inputMontaria">Montaria</Form.Label>
                                <InputConverter idBtn={"botaoMontaria"} descricao={evolIdMont.montDescricao} atualizaDlgPesquisa={atualizaDlgPesquisaMontaria} />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="3">
                                <Form.Label htmlFor="inputHumor">Humor</Form.Label>
                                <Form.Select id='porte' required value={evolHumor}
                                    onChange={(e) => setEvolHumor(e.target.value)}>
                                    <option>Selecione</option>
                                    <option value="T">Tranquilo</option>
                                    <option value="A">Agitado</option>
                                </Form.Select>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <Form.Label htmlFor="inputAtenc">Atenção</Form.Label>
                                <Form.Control value={evolAtenc} maxLength={20}
                                    onChange={(e) => setEvolAtenc(e.target.value)}
                                    type="text" id="atenc" />
                            </Col>

                            <Col md="6">
                                <Form.Label htmlFor="inputAuton">Autonomia</Form.Label>
                                <Form.Control value={evolAuton} maxLength={20}
                                    onChange={(e) => setEvolAuton(e.target.value)}
                                    type="text" id="auton" />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <Form.Label htmlFor="inputPost">Postura</Form.Label>
                                <Form.Control value={evolPost} maxLength={20}
                                    onChange={(e) => setEvolPost(e.target.value)}
                                    type="text" id="post" />
                            </Col>
                            <Col md="3">
                                <Form.Label htmlFor="inputClima">Clima</Form.Label>
                                <Form.Select id='clima' required value={evolClima}
                                    onChange={(e) => setEvolClima(e.target.value)}>
                                    <option>Selecione</option>
                                    <option value="V">Ventando</option>
                                    <option value="E">Ensolarado</option>
                                    <option value="N">Nublado</option>
                                    <option value="H">Chuvoso</option>
                                    <option value="F">Frio</option>
                                    <option value="C">Calor</option>
                                </Form.Select>
                            </Col>
                            <Col md="3">
                                <Form.Label htmlFor="decubito">Decubito</Form.Label>
                                <Form.Select id='decubito' required value={evolDecubito}
                                    onChange={(e) => setEvolDecubito(e.target.value)}>
                                    <option>Selecione</option>
                                    <option value="C">Clássica</option>
                                    <option value="L">Laterais</option>
                                    <option value="I">Invertido</option>
                                    <option value="V">Ventral</option>
                                </Form.Select>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <Form.Label htmlFor="inputEstereotipia">Estereotipia</Form.Label>
                                <Form.Control value={evolEstereotipia}
                                    onChange={(e) => setEvolEstereotipia(e.target.value)}
                                    type="text" id="estereotipia" as="textarea" className='textArea' />
                            </Col>
                            <Col md="6">
                                <Form.Label htmlFor="inputProg">Programação</Form.Label>
                                <Form.Control value={evolProg}
                                    onChange={(e) => setEvolProg(e.target.value)}
                                    type="text" id="prog" as="textarea" className='textArea' />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <Form.Label htmlFor="inputReg">Registro</Form.Label>
                                <Form.Control value={evolReg}
                                    onChange={(e) => setEvolReg(e.target.value)}
                                    type="text" id="reg" as="textarea" className='textArea' />
                            </Col>

                            <Col md="6">
                                <Form.Label htmlFor="obs">Observação</Form.Label>
                                <Form.Control value={evolObs}
                                    onChange={(e) => setEvolObs(e.target.value)}
                                    type="text" id="obs" as="textarea" className='textArea' />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <Form.Check
                                    defaultChecked={true}
                                    onClick={atualizaRecursosLudicos}
                                    type="checkbox"
                                    id="recLud"
                                    label="Recursos Lúdicos"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <Form.Label htmlFor="quaisRecLud">Quais Recursos Lúdicos</Form.Label>
                                <Form.Control value={evolQuaisRecLud} disabled={evolRecLudicos}
                                    onChange={(e) => setEvolQuaisRecLud(e.target.value)}
                                    type="text" id="quaisRecLud" as="textarea" className='textArea' />
                            </Col>

                            <Col md="6">
                                <Form.Label htmlFor="obsRecLud">Observação Recursos Lúdicos</Form.Label>
                                <Form.Control value={evolObsRecLud} disabled={evolRecLudicos}
                                    onChange={(e) => setEvolObsRecLud(e.target.value)}
                                    type="text" id="obsRecLud" as="textarea" className='textArea' />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <Form.Label htmlFor="compAni">Comportamento do Animal</Form.Label>
                                <Form.Control value={evolCompAni} maxLength={30}
                                    onChange={(e) => setEvolCompAni(e.target.value)}
                                    type="text" id="compAni" />
                            </Col>

                            <Col md="6">
                                <Form.Label htmlFor="andAni">Andadura do Animal</Form.Label>
                                <Form.Control value={evolAndAni} maxLength={30}
                                    onChange={(e) => setEvolAndAni(e.target.value)}
                                    type="text" id="andAni" />
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
                                        <TablePaginada data={evolAniSelecionado} rowsPerPage={5} selecionaLinha={false} removeAnimalSelecionado={removeAnimalSelecionado} />
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <Card>
                                    <div className='marginLeft'>
                                        <b>Picadeiros</b>
                                        <Col md="2">
                                            <Button id='btnPicadeiro' variant="primary" className='btn-success btnMarginTop' onClick={atualizaDlgPesquisaPicadeiro}>Adicionar</Button>
                                        </Col>
                                        <TablePicadeiroPaginada data={evolPicSelecionado} rowsPerPage={5} selecionaLinha={false} removeItemSelecionado={removePicadeiroSelecionado} />
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <Card>
                                    <div className='marginLeft'>
                                        <b>Praticantes</b>
                                        <Col md="2">
                                            <Button id='btnPraticante' variant="primary" className='btn-success btnMarginTop' onClick={atualizaDlgPesquisaPraticante}>Adicionar</Button>
                                        </Col>
                                        <TablePraticantesPaginada data={evolPratSelecionado} rowsPerPage={5} selecionaLinha={false} removePraticanteSelecionado={removePraticanteSelecionado} />
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
                                        <TableFuncionariosPaginada data={evolFuncSelecionado} rowsPerPage={5} selecionaLinha={false} removeItemSelecionado={removeFuncionarioSelecionado} />
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <Card>
                                    <div className='marginLeft'>
                                        <b>Atividades e Materiais</b>
                                        <Col md="2">
                                            <Button id='btnAtiv' variant="primary" className='btn-success btnMarginTop' onClick={() => setAbrirAtividadeMaterial(true)}>Adicionar</Button>
                                        </Col>
                                        <TableAtivMatPaginada />
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                        <br />
                        <Toolbar jsonRemove={enviaJsonRemove} abrirPesquisa={atualizaDlgPesquisa} />
                        <br />
                    </Form>
                </Container>
                {abrirPesquisa &&
                    <PesquisaFichaEvol setValores={setList} valores={list} atualizaItemSelecionado={atualizaEvolSelecionada} setAbrirPesquisa={setAbrirPesquisa} />
                }
                {abrirPesquisaAnimal &&
                    <PesquisaAnimais setValores={setListAnimal} valores={listAnimal} atualizaItemSelecionado={atualizaAnimalSelecionado} setAbrirPesquisa={setAbrirPesquisaAnimal} />
                }
                {abrirPesquisaMontaria &&
                    <PesquisaMontaria setValores={setListMontaria} valores={listMontaria} atualizaItemSelecionado={atualizaMontariaSelecionada} setAbrirPesquisa={setAbrirPesquisaMontaria} />
                }
                {abrirPesquisaPicadeiro &&
                    <PesquisaPicadeiro setValores={setListPicadeiro} valores={listPicadeiro} atualizaItemSelecionado={atualizaPicadeiroSelecionado} setAbrirPesquisa={setAbrirPesquisaPicadeiro} />
                }
                {abrirPesquisaPraticante &&
                    <PesquisaPraticantes setValores={setListPraticante} valores={listPraticante} atualizaItemSelecionado={atualizaPraticanteSelecionado} setAbrirPesquisa={setAbrirPesquisaPraticante} />
                }
                {abrirPesquisaFuncionario &&
                    <PesquisaFuncionario setValores={setListFuncionario} valores={listFuncionario} atualizaItemSelecionado={atualizaFuncionarioSelecionado} setAbrirPesquisa={setAbrirPesquisaFuncionario} />
                }
                {abrirAtividadeMaterial &&
                    <>
                        <Modal className='modal-xl' show={true}>
                            <Modal.Header><b>Pesquisa de Atividade e Material</b></Modal.Header>
                            <Modal.Body>
                                <Container>
                                    <Form>
                                        <Row>
                                            <Col md="6">
                                                <Form.Label>Atividade</Form.Label>
                                                <InputConverter descricao={ativMaterialAtiv.atvDescricao} atualizaDlgPesquisa={atualizaDlgPesquisaAtividade} />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="6">
                                                <Form.Label>Material</Form.Label>
                                                <InputConverter descricao={ativMaterialMat.matDescricao} atualizaDlgPesquisa={atualizaDlgPesquisaMaterial} />
                                            </Col>
                                        </Row>
                                    </Form>
                                </Container>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="primary" className='btn-success' onClick={atualizaAtividadeMaterial}>Adicionar</Button>
                                <Button variant="primary" className='btn-danger' onClick={() => setAbrirAtividadeMaterial(false)}>Fechar</Button>
                            </Modal.Footer>
                        </Modal >
                    </>
                }
                {abrirPesquisaAtividade &&
                    <PesquisaAtividade setValores={setListAtividade} valores={listAtividade} atualizaItemSelecionado={atualizaAtividadeSelecionada} setAbrirPesquisa={setAbrirPesquisaAtividade} />
                }
                {abrirPesquisaMaterial &&
                    <PesquisaMaterial setValores={setListMaterial} valores={listMaterial} atualizaItemSelecionado={atualizaMaterialSelecionado} setAbrirPesquisa={setAbrirPesquisaMaterial} />
                }
                <Footer />
            </div >
        )
    }
    return cadastroFichaEvol();
}
export default cadastroFichaEvol;