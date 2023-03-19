import React, { useState } from 'react';
import TableFooter from '../table/tableFooter';
import useTable from '../table/useTable';
import { BsCheckLg } from "react-icons/bs";
import InputConverter from '../componentes/inputConverter';
import { Form, Col, Row, Container, Modal, Button, Table } from 'react-bootstrap';
import PesquisaPraticantes from '../pesquisas/pesquisaPraticantes';
import { api } from "../../utilitario/baseComunicacao";
import { dataFormatadaDiaMesAno, dataFormatadaAnoMesDia } from '../../utilitario/dateUtil';

function pesquisaFichaEvol({ setValores, valores, atualizaItemSelecionado, setAbrirPesquisa }) {
    const [listPraticantes, setListPraticantes] = useState([]);
    const [abrirPesquisaPraticante, setAbrirPesquisaPraticante] = useState(false);
    const [idPraticante, setIdPraticante] = useState("");
    const [nomePraticante, setNomePraticante] = useState("");
    const [evolData, setEvolData] = useState("");
    
    const [evolIdPesquisa, setEvolIdPesquisa] = useState("");

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
        setValores(await (await api.get("/pesquisaFichaEvol?evolId=" + evolIdPesquisa + "&evolData=" + dataFormatadaAnoMesDia(evolData) + "&pratId=" + idPraticante)).data);
        setAbrirPesquisa(true);
    }

    const limparPesquisa = () => {
        setAbrirPesquisa(false);
        setIdPraticante("");
        setEvolData("");
        buscaRegistros();
    }

    const TablePaginada = ({ data, rowsPerPage, selecionaLinha, atualizaItemSelecionado, removeFichaEvolSelecionada}) => {
        const [pagina, setPage] = useState(1);
        const { slice, range } = useTable(data, pagina, rowsPerPage);
        return (
            <>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Data</th>
                            <th>Praticante</th>
                            <th className='center'>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            slice.map(item => <LinhaTabela key={item.evolId} item={item} selecionaLinha={selecionaLinha} atualizaItemSelecionado={atualizaItemSelecionado} removeFichaEvolSelecionada={removeFichaEvolSelecionada} />)
                        }
                    </tbody>
                </Table>
                <TableFooter range={range} slice={slice} setPage={setPage} page={pagina} />
            </>
        );
    };

    const LinhaTabela = ({ item, selecionaLinha, atualizaItemSelecionado }) => {
        const { evolId, evolData, evolIdPraticante } = item;
        const selecionarItem = e => atualizaItemSelecionado(item);
        return <tr>
            <td width={'80px'}>{evolId}</td>
            <td width={'150px'}>{dataFormatadaDiaMesAno(evolData)}</td>
            <td>{evolIdPraticante.pessoa.pesNome}</td>
            {selecionaLinha && 
                <td width={'20px'} className='center'>
                <Button className='btn-success' onClick={selecionarItem}><BsCheckLg /></Button>
                </td>
            }
        </tr>
    }
    
    return (
        <div>
            <Modal className='modal-xl' show={true}>
                <Modal.Header><b>Pesquisa de Ficha de Evolução</b></Modal.Header>
                <Modal.Body>
                    <Container>
                        <Form>
                            <Row>
                                <Col md="2">
                                    <Form.Label>Código</Form.Label>
                                    <Form.Control type="text" id="idPesquisa"
                                        value={evolIdPesquisa}
                                        onChange={(e) => setEvolIdPesquisa(e.target.value)} />
                                </Col>
                                <Col md="6">
                                <Form.Label htmlFor="inputLPraticante">Praticante</Form.Label>
                                <InputConverter descricao={nomePraticante} atualizaDlgPesquisa={atualizaDlgPesquisaPraticante} />
                                </Col>
                                <Col md="2">
                                <Form.Label htmlFor="inputData">Data</Form.Label>
                                <Form.Control value={evolData}
                                    onChange={(e) => setEvolData(e.target.value)}
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
        </div>
    )
}
export default pesquisaFichaEvol;