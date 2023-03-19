import React, { useState } from 'react';
import TableFooter from '../table/tableFooter';
import useTable from '../table/useTable';
import InputConverter from '../componentes/inputConverter';
import { BsCheckLg } from "react-icons/bs";
import { Form, Col, Row, Container, Modal, Button, Table } from 'react-bootstrap';
import PesquisaPraticantes from '../pesquisas/pesquisaPraticantes';
import { api } from "../../utilitario/baseComunicacao";
import { dataFormatadaDiaMesAno, horaFormatadaString, dataFormatadaAnoMesDia } from '../../utilitario/dateUtil';

function pesquisaAgendamentos({ setValores, valores, atualizaItemSelecionado, setAbrirPesquisa }) {
    const [listPraticantes, setListPraticantes] = useState([]);
    const [abrirPesquisaPraticante, setAbrirPesquisaPraticante] = useState(false);

    const [idPraticante, setIdPraticante] = useState("");
    const [nomePraticante, setNomePraticante] = useState("");
    const [agdData, setAgdData] = useState("");
    const [agdHora, setAgdHora] = useState("");
    const [agdConcluido, setAgdConcluido] = useState(false);


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
        setValores(await (await api.get("/pesquisaAgendamentos?pratId=" + idPraticante + "&agdData=" + dataFormatadaAnoMesDia(agdData) + "&agdHora=" + agdHora + "&agdConcluido=" + agdConcluido)).data);
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
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Data</th>
                            <th>Hora</th>
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

    const LinhaTabela = ({ item, selecionaLinha, atualizaItemSelecionado }) => {
        const { agdId, agdData, agdDescricao, agdHora } = item;
        const selecionarItem = e => atualizaItemSelecionado(item);
        return <tr>
            <td width={'80px'}>{agdId}</td>
            <td width={'80px'} className="bold">{dataFormatadaDiaMesAno(agdData)}</td>
            <td width={'80px'}>{horaFormatadaString(agdHora)}</td>
            <td>{agdDescricao}</td>
            {selecionaLinha &&
                <td width={'80px'} className='center'>
                    <Button className='btn-success' onClick={selecionarItem}><BsCheckLg /></Button>
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
                                    <Form.Label htmlFor="checkConcluido"></Form.Label>
                                    <Form.Check id="checkConcluido" checked={agdConcluido}
                                        onChange={(e) => setAgdConcluido(e.target.checked)}
                                        type="checkbox" label="Concluído" />
                                </Col>
                            </Row>

                            <Row>
                                <Col md="2">
                                    <Form.Label htmlFor="inputData">Data</Form.Label>
                                    <Form.Control value={agdData}
                                        onChange={(e) => setAgdData(e.target.value)}
                                        type="date" id="inputDate" required />
                                </Col>

                                <Col md="2">
                                    <Form.Label htmlFor="inputHora">Hora</Form.Label>
                                    <Form.Control value={agdHora}
                                        onChange={(e) => setAgdHora(e.target.value)}
                                        type="time" id="inputHora" required />
                                </Col>
                            </Row>

                            <br />

                            <div className="right">
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

            {
                abrirPesquisaPraticante &&
                <PesquisaPraticantes setValores={setListPraticantes} valores={listPraticantes} atualizaItemSelecionado={atualizaPraticanteSelecionado} setAbrirPesquisa={setAbrirPesquisaPraticante} />
            }

        </div >
    )
}
export default pesquisaAgendamentos;