import React, { useState } from 'react';
import TableFooter from '../table/tableFooter';
import useTable from '../table/useTable';
import { BsPencilSquare, BsXLg } from "react-icons/bs";
import { Form, Col, Row, Container, Modal, Button, Table } from 'react-bootstrap';
import { api } from "../../utilitario/baseComunicacao";
import { isInputNumber } from "../../utilitario/patronatoUtil";

export const TablePaginada = ({ data, rowsPerPage, selecionaLinha, atualizaItemSelecionado, removeLogradouroSelecionado }) => {
    const [pagina, setPage] = useState(1);
    const { slice, range } = useTable(data, pagina, rowsPerPage);
    return (
        <>
            <Table size="sm">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Descrição</th>
                        <th>Bairro</th>
                        <th className='center'>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        slice.map(item => <LinhaTabela key={item.logId} item={item} selecionaLinha={selecionaLinha} atualizaItemSelecionado={atualizaItemSelecionado} removeLogradouroSelecionado={removeLogradouroSelecionado} />)
                    }
                </tbody>
            </Table>
            <TableFooter range={range} slice={slice} setPage={setPage} page={pagina} />
        </>
    );
};

const LinhaTabela = ({ item, selecionaLinha, atualizaItemSelecionado, removeLogradouroSelecionado }) => {
    const { logId, logDescricao } = item;
    const { barNome } = item.bairro;
    const selecionarItem = e => atualizaItemSelecionado(item);
    const removerItem = e => removeLogradouroSelecionado(item);

    return <tr>
        <td width={'80px'}>{logId}</td>
        <td width={'100px'}>{logDescricao}</td>
        <td width={'100px'}>{barNome}</td>
        {selecionaLinha &&
            <td width={'80px'} className='center'>
                <Button className='btn-success' onClick={selecionarItem}><BsPencilSquare /></Button>
            </td>
        }
        {!selecionaLinha &&
            <td width={'80px'} className='center'>
                <Button className='btn-danger' onClick={removerItem}><BsXLg /></Button>
            </td>
        }

    </tr>
}

function pesquisaLogradouro({ setValores, valores, atualizaItemSelecionado, setAbrirPesquisa }) {
    const [logDescricaoPesquisa, setLogDescricaoPesquisa] = useState("");
    const [logId, setLogId] = useState("");

    const buscaRegistros = async () => {
        setValores(await (await api.get("/pesquisaLogradouros?logDesc=" + logDescricaoPesquisa + "&logId=" + logId)).data);
        setAbrirPesquisa(true);
    }

    const limparPesquisa = () => {
        setAbrirPesquisa(false);
        setLogDescricaoPesquisa("");
        buscaRegistros();
    }

    const pesquisaLogradouro = () => {
        return (
            <>
                <Modal className='modal-xl' show={true}>
                    <Modal.Header><b>Pesquisa de Logradouros</b></Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Form>
                                <Row>
                                    <Col md="2">
                                        <Form.Label>Código</Form.Label>
                                        <Form.Control type="text" id="idPesquisa" onKeyPress={(e) => isInputNumber(e)}
                                            value={logId}
                                            onChange={(e) => setLogId(e.target.value)} />
                                    </Col>
                                    <Col md="6">
                                        <Form.Label>Descrição</Form.Label>
                                        <Form.Control type="text" id="descricaoPesquisa"
                                            value={logDescricaoPesquisa}
                                            onChange={(e) => setLogDescricaoPesquisa(e.target.value)} />
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
            </>
        )
    }
    return pesquisaLogradouro();
}
export default pesquisaLogradouro;