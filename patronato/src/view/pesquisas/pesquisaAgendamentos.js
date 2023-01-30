import React, { useState } from 'react';
import TableFooter from '../table/tableFooter';
import useTable from '../table/useTable';
import InputConverter from "../inputConverter";
import { BsPencilSquare } from "react-icons/bs";
import { Form, Col, Row, Container, Modal, Button, Table } from 'react-bootstrap';
import PesquisaPraticantes from '../pesquisas/pesquisaPraticantes';
import { api } from "../../utilitario/baseComunicacao";
import { dataFormatada, dataFormatadaDiaMesAno } from '../../utilitario/dateUtil';

function pesquisaAgendamentos({ setValores, valores, atualizaItemSelecionado, setAbrirPesquisa }) {
    const [listPraticantes, setListPraticantes] = useState([]);
    const [abrirPesquisaPraticante, setAbrirPesquisaPraticante] = useState(false);

    const [idPraticante, setIdPraticante] = useState("");
    const [nomePraticante, setNomePraticante] = useState("");
    const [agdData, setAgdData] = useState("");


    const atualizaDlgPesquisaPraticante = async () => {
        setListPraticantes(await (await api.get("/pesquisaPraticantes")).data);
        setAbrirPesquisaPraticante(true);
    }

    const atualizaPraticanteSelecionado = (item) => {
        setIdPraticante(item.pratId)
        setNomePraticante(item.pessoa.pesNome)
        setAbrirPesquisaPraticante(false);
    }

    const buscaRegistros = async () => {
        setValores(await (await api.get("/pesquisaAgendamentos?pratId=" + idPraticante)).data);
        setAbrirPesquisa(true);
    }

    const limparPesquisa = () => {
        setAbrirPesquisa(false);
        setIdPraticante("");
        setAgdData("");
        buscaRegistros();
    }


    const TablePaginada = ({ data, rowsPerPage, selecionaLinha, atualizaItemSelecionado, removeAgendamentoSelecionado }) => {
        const [pagina, setPage] = useState(1);
        const { slice, range } = useTable(data, pagina, rowsPerPage);
        return (
            <>
                <Table size="sm">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Data</th>
                            <th>Descrição</th>
                            <th className='center'>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            slice.map(item => <LinhaTabela key={item.agdId} item={item} selecionaLinha={selecionaLinha} atualizaItemSelecionado={atualizaItemSelecionado} removeAgendamentoSelecionado={removeAgendamentoSelecionado} />)
                        }
                    </tbody>
                </Table>
                <TableFooter range={range} slice={slice} setPage={setPage} page={pagina} />
            </>
        );
    };

    const LinhaTabela = ({ item, selecionaLinha, atualizaItemSelecionado, removeAgendamentoSelecionado }) => {
        const { agdId, agdData, agdDescricao } = item;
        const selecionarItem = e => atualizaItemSelecionado(item);
        return <tr>
            <td width={'80px'}>{agdId}</td>
            <td width={'80px'}>{dataFormatadaDiaMesAno(agdData)}</td>
            <td>{agdDescricao}</td>
            {selecionaLinha &&
                <td width={'80px'} className='center'>
                    <Button className='btn-success' onClick={selecionarItem}><BsPencilSquare /></Button>
                </td>
            }
        </tr>
    }

    return (
        <div>
            <Modal className='modal-xl' show={true}>
                <Modal.Header><b>Pesquisa de Agendamentos</b></Modal.Header>
                <Modal.Body>
                    <Container>
                        <Form>
                            <Row>
                                <Col md="6">
                                    <Form.Label htmlFor="inputLPraticante">Praticante</Form.Label>
                                    <InputConverter descricao={nomePraticante} atualizaDlgPesquisa={atualizaDlgPesquisaPraticante} />
                                </Col>

                                <Col md="2">
                                    <Form.Label htmlFor="inputData">Data</Form.Label>
                                    <Form.Control value={agdData}
                                        onChange={(e) => setAgdData(e.target.value)}
                                        type="date" id="inputDate" required />
                                </Col>
                            </Row>
                            <div className='right'>
                                <Button className='btnMarginTop btnToolbar' onClick={buscaRegistros}>Pesquisar</Button>
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

        </div >
    )
}
export default pesquisaAgendamentos;