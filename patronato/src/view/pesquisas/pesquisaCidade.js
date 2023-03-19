import React, { useState } from 'react';
import TableFooter from '../table/tableFooter';
import useTable from '../table/useTable';
import { BsCheckLg, BsXLg } from "react-icons/bs";
import { Form, Col, Row, Container, Modal, Button, Table } from 'react-bootstrap';
import { api } from "../../utilitario/baseComunicacao";
import { isInputNumber } from "../../utilitario/patronatoUtil";

export const TablePaginada = ({ data, rowsPerPage, selecionaLinha, atualizaItemSelecionado, removeCidadeSelecionada }) => {
    const [pagina, setPage] = useState(1);
    const { slice, range } = useTable(data, pagina, rowsPerPage);
    return (
        <>
            <Table responsive>
                <thead>
                    <tr>
                        <th>Codigo</th>
                        <th>Estado</th>
                        <th>Nome</th>
                        <th className='center'>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        slice.map(item => <LinhaTabela key={item.cidId} item={item} selecionaLinha={selecionaLinha} atualizaItemSelecionado={atualizaItemSelecionado} removeCidadeSelecionada={removeCidadeSelecionada} />)
                    }
                </tbody>
            </Table>
            <TableFooter range={range} slice={slice} setPage={setPage} page={pagina} />
        </>
    );
};

const LinhaTabela = ({ item, selecionaLinha, atualizaItemSelecionado, removeCidadeSelecionada }) => {
    const { cidId, cidNome, estado } = item;
    const selecionarItem = e => atualizaItemSelecionado(item);
    const removerItem = e => removeCidadeSelecionada(item);

    return <tr>
        <td width={'80px'}>{cidId}</td>
        <td width={'200px'}>{estado.estNome}</td>
        <td>{cidNome}</td>
        {selecionaLinha &&
            <td width={'80px'} className='center'>
                <Button className='btn-success' onClick={selecionarItem}><BsCheckLg /></Button>
            </td>
        }
        {!selecionaLinha &&
            <td width={'80px'} className='center'>
                <Button className='btn-danger' onClick={removerItem}><BsXLg /></Button>
            </td>
        }

    </tr>
}

function pesquisaCidade({ setValores, valores, atualizaItemSelecionado, setAbrirPesquisa }) {
    const [cidId, setCidId] = useState("");
    const [cidNome, setCidNome] = useState("");

    const buscaRegistros = async () => {
        setValores(await (await api.get("/pesquisaCidade?cidNome=" + cidNome + "&cidId=" + cidId)).data);
        setAbrirPesquisa(true);
    }

    const limparPesquisa = () => {
        setAbrirPesquisa(false);
        setCidNome("");
        buscaRegistros();
    }

    const pesquisaCidade = () => {
        return (
            <>
                <Modal className='modal-xl' show={true}>
                    <Modal.Header><b>Pesquisa de Cidade</b></Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Form>
                                <Row>
                                    <Col md="2">
                                        <Form.Label>Código</Form.Label>
                                        <Form.Control type="text" id="idPesquisa" onKeyPress={(e) => isInputNumber(e)}
                                            value={cidId}
                                            onChange={(e) => setCidId(e.target.value)} />
                                    </Col>
                                    <Col md="6">
                                        <Form.Label>Nome</Form.Label>
                                        <Form.Control type="text" id="descricaoPesquisa"
                                            initi={cidNome}
                                            onChange={(e) => setCidNome(e.target.value)} />
                                    </Col>
                                </Row>
                                <div className='right'>
                                    <Button className='btnMarginTop' onClick={buscaRegistros}>Pesquisar</Button>
                                    <Button className='btnMarginTop btn-warning btnToolbar' onClick={limparPesquisa}>Limpar</Button>
                                </div>
                            </Form>
                        </Container>
                        <TablePaginada data={valores} rowsPerPage={8} selecionaLinha={true} atualizaItemSelecionado={atualizaItemSelecionado} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" className='btn-danger' onClick={() => setAbrirPesquisa(false)}>Fechar</Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
    return pesquisaCidade();
}
export default pesquisaCidade;