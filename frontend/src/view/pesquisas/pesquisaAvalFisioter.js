import React, { useState } from 'react';
import TableFooter from '../table/tableFooter';
import useTable from '../table/useTable';
import { BsCheckLg } from "react-icons/bs";
import { Form, Col, Row, Container, Modal, Button, Table } from 'react-bootstrap';
import { api } from "../../utilitario/baseComunicacao";
import InputConverter from '../componentes/inputConverter';
import PesquisaPraticantes from '../pesquisas/pesquisaPraticantes';
import PesquisaFuncionario from "../pesquisas/pesquisaFuncionario";
import PesquisaMedico from "../pesquisas/pesquisaMedico";
import { dataFormatadaDiaMesAno } from '../../utilitario/dateUtil';

export const TablePaginada = ({ data, rowsPerPage, atualizaItemSelecionado }) => {
    const [pagina, setPage] = useState(1);
    const { slice, range } = useTable(data, pagina, rowsPerPage);
    return (
        <>
            <Table responsive>
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Praticante</th>
                        <th>Médico</th>
                        <th>Funcionário</th>
                        <th className='center'>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        slice.map(item => <LinhaTabela key={item.aftId} item={item} atualizaItemSelecionado={atualizaItemSelecionado} />)
                    }
                </tbody>
            </Table>
            <TableFooter range={range} slice={slice} setPage={setPage} page={pagina} />
        </>
    );
};

const LinhaTabela = ({ item, atualizaItemSelecionado }) => {
    const { aftData, aftIdPraticante, aftIdMedico, aftIdFuncionario  } = item;
    const selecionarItem = e => atualizaItemSelecionado(item);

    return <tr>
        <td>{dataFormatadaDiaMesAno(aftData)}</td>
        <td>{aftIdPraticante.pessoa.pesNome}</td>
        <td>{aftIdMedico.pessoa.pesNome}</td>
        <td>{aftIdFuncionario.pessoa.pesNome}</td>
        <td width={'80px'} className='center'>
            <Button className='btn-success' onClick={selecionarItem}><BsCheckLg /></Button>
        </td>
    </tr>
}

function pesquisaAvalFisioter({ setValores, valores, atualizaItemSelecionado, setAbrirPesquisa }) {
    const [aftData, setAftData] = useState("");
    const [praticante, setPraticante] = useState({"pessoa":{"pesNome": ""}});
    const [funcionario, setFuncionario] = useState({"pessoa":{"pesNome": ""}});
    const [medico, setMedico] = useState({"pessoa":{"pesNome": ""}});
    const [idPraticante, setIdPraticante] = useState("");
    const [idFuncionario, setIdFuncionario] = useState("");
    const [idMedico, setIdMedico] = useState("");
    const [listPraticantes, setListPraticantes] = useState([]);
    const [listFuncionarios, setListFuncionarios] = useState([]);
    const [listMedicos, setListMedicos] = useState([]);
    const [abrirPesquisaPraticante, setAbrirPesquisaPraticante] = useState(false);
    const [abrirPesquisaFuncionario, setAbrirPesquisaFuncionario] = useState(false);
    const [abrirPesquisaMedico, setAbrirPesquisaMedico] = useState(false);
    
    const buscaRegistros = async () => {
        setValores(await (await api.get("/pesquisaAvalFisioter?praticante="+ idPraticante + "&medico=" + idMedico + "&funcionario=" + idFuncionario + "&data=" + aftData)).data);
        setAbrirPesquisa(true);
    }

    const atualizaDlgPesquisaPraticante = async () => {
        setListPraticantes(await (await api.get("/pesquisaPraticantes")).data);
        setAbrirPesquisaPraticante(true);
    }

    const atualizaPraticanteSelecionado = (item) => {
        setPraticante(item);
        setIdPraticante(item.pratId);
        setAbrirPesquisaPraticante(false);
    }

    const atualizaFuncionarioSelecionado = async (item) => {
        setFuncionario(item);
        setIdFuncionario(item.funcId);
        setAbrirPesquisaFuncionario(false);
    }

    const atualizaDlgPesquisaFuncionarios = async () => {
        setListFuncionarios(await (await api.get("/pesquisaFuncionario?pesCpf=&pesNome=")).data);
        setAbrirPesquisaFuncionario(true);
    }

    const atualizaDlgPesquisaMedicos = async () => {
        setListMedicos(await (await api.get("/pesquisaMedico?pesCpf=&pesNome=")).data);
        setAbrirPesquisaMedico(true);
    }

    const atualizaMedicoSelecionado = async (item) => {
        setMedico(item);
        setIdMedico(item.medId);
        setAbrirPesquisaMedico(false);
    }

    const limparPesquisa = async () => {
        setAftData("");
        setPraticante({"pessoa":{"pesNome": ""}});
        setFuncionario({"pessoa":{"pesNome": ""}});
        setMedico({"pessoa":{"pesNome": ""}});
        setIdPraticante("");
        setIdFuncionario("");
        setIdMedico("");
        setValores(await (await api.get("/pesquisaAvalFisioter?praticante=")).data);
    }

    const pesquisaAvalFisioter = () => {
        return (
            <>
                <Modal className='modal-xl' show={true}>
                    <Modal.Header><b>Pesquisa de Avaliação Fisioterápica</b></Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Form>
                                <Row>
                                    <Col md="2">
                                    <Form.Label htmlFor="inputData">Data</Form.Label>
                                    <Form.Control value={aftData}
                                        onChange={(e) => setAftData(e.target.value)}
                                        type="date" id="inputDate" required />
                                    </Col>
                                </Row>
                                
                                <Row>
                                    <Col md="6">
                                    <Form.Label htmlFor="inputLPraticante">Praticante</Form.Label>
                                    <InputConverter descricao={praticante.pessoa.pesNome} atualizaDlgPesquisa={atualizaDlgPesquisaPraticante} />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md="6">
                                    <Form.Label htmlFor="inputFuncionario">Funcionário</Form.Label>
                                    <InputConverter descricao={funcionario.pessoa.pesNome} atualizaDlgPesquisa={atualizaDlgPesquisaFuncionarios} />
                                    </Col>
                                </Row>
                                
                                <Row>
                                    <Col md="6">
                                    <Form.Label htmlFor="inputFuncionario">Médico</Form.Label>
                                    <InputConverter descricao={medico.pessoa.pesNome} atualizaDlgPesquisa={atualizaDlgPesquisaMedicos} />
                                    </Col>
                                </Row>

                                <div className='right'>
                                    <Button className='btnMarginTop' onClick={buscaRegistros}>Pesquisar</Button>
                                    <Button className='btnMarginTop btn-warning btnToolbar' onClick={limparPesquisa}>Limpar</Button>
                                </div>
                            </Form>
                        </Container>
                        <TablePaginada data={valores} rowsPerPage={5} selecionaLinha={true} atualizaItemSelecionado={atualizaItemSelecionado} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" className='btn-danger' onClick={() => setAbrirPesquisa(false)}>Fechar</Button>
                    </Modal.Footer>
                </Modal>
                {abrirPesquisaPraticante &&
                    <PesquisaPraticantes setValores={setListPraticantes} valores={listPraticantes} atualizaItemSelecionado={atualizaPraticanteSelecionado} setAbrirPesquisa={setAbrirPesquisaPraticante} />
                }
                {abrirPesquisaFuncionario &&
                    <PesquisaFuncionario setValores={setListFuncionarios} valores={listFuncionarios} atualizaItemSelecionado={atualizaFuncionarioSelecionado} setAbrirPesquisa={setAbrirPesquisaFuncionario} />
                }
                {abrirPesquisaMedico &&
                    <PesquisaMedico setValores={setListMedicos} valores={listMedicos} atualizaItemSelecionado={atualizaMedicoSelecionado} setAbrirPesquisa={setAbrirPesquisaMedico} />
                }
            </>
        )
    }
    return pesquisaAvalFisioter();
}
export default pesquisaAvalFisioter;