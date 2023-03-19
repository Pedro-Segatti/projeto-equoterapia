import React, { useState } from 'react';
import TableFooter from '../table/tableFooter';
import useTable from '../table/useTable';
import { BsCheckLg } from "react-icons/bs";
import { Form, Col, Row, Container, Modal, Button, Table } from 'react-bootstrap';
import { api } from "../../utilitario/baseComunicacao";
import PesquisaPraticantes from '../pesquisas/pesquisaPraticantes';
import InputConverter from '../componentes/inputConverter';
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
                        <th className='center'>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        slice.map(item => <LinhaTabela key={item.aseId} item={item} atualizaItemSelecionado={atualizaItemSelecionado} />)
                    }
                </tbody>
            </Table>
            <TableFooter range={range} slice={slice} setPage={setPage} page={pagina} />
        </>
    );
};

const LinhaTabela = ({ item, atualizaItemSelecionado }) => {
    const { aseData, praticante } = item;
    const selecionarItem = e => atualizaItemSelecionado(item);

    return <tr>
        <td width={'150px'}>{dataFormatadaDiaMesAno(aseData)}</td>
        <td>{praticante.pessoa.pesNome}</td>
        <td width={'80px'} className='center'>
            <Button className='btn-success' onClick={selecionarItem}><BsCheckLg /></Button>
        </td>
    </tr>
}

function pesquisaAvalSocioEcon({ setValores, valores, atualizaItemSelecionado, setAbrirPesquisa }) {
    const [aseData, setAseData] = useState("");
    const [praticante, setPraticante] = useState({"pessoa":{"pesNome": ""}});
    const [idPraticante, setIdPraticante] = useState("");
    const [listPraticantes, setListPraticantes] = useState([]);
    const [abrirPesquisaPraticante, setAbrirPesquisaPraticante] = useState(false);

    const buscaRegistros = async () => {
        setValores(await (await api.get("/pesquisaAvalSocioEcon?praticante=" + idPraticante + "&data=" + aseData)).data);
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
    
    const limparPesquisa = async () => {
        setAseData("");
        setPraticante({"pessoa":{"pesNome": ""}});
        setIdPraticante("");
        setValores(await (await api.get("/pesquisaAvalSocioEcon?praticante=")).data);
    }

    const pesquisaAvalSocioEcon = () => {
        return (
            <>
                <Modal className='modal-xl' show={true}>
                    <Modal.Header><b>Pesquisa de Avaliação Socioeconômica</b></Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Form>
                            <Row>
                                <Col md="2">
                                    <Form.Label htmlFor="inputData">Data</Form.Label>
                                    <Form.Control value={aseData}
                                        onChange={(e) => setAseData(e.target.value)}
                                        type="date" id="inputDate" required />
                                    </Col>
                                </Row>
                                
                                <Row>
                                    <Col md="6">
                                    <Form.Label htmlFor="inputLPraticante">Praticante</Form.Label>
                                    <InputConverter descricao={praticante.pessoa.pesNome} atualizaDlgPesquisa={atualizaDlgPesquisaPraticante} />
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
            </>
        )
    }
    return pesquisaAvalSocioEcon();
}
export default pesquisaAvalSocioEcon;