import React, { useState } from 'react';
import TableFooter from '../table/tableFooter';
import useTable from '../table/useTable';
import { BsPencilSquare } from "react-icons/bs";
import { Form, Col, Row, Container, Modal, Button, Table } from 'react-bootstrap';
import { api } from "../../utilitario/baseComunicacao";

export const TablePaginada = ({ data, rowsPerPage, selecionaLinha, atualizaItemSelecionado }) => {
    const [pagina, setPage] = useState(1);
    const { slice, range } = useTable(data, pagina, rowsPerPage);
    return (
        <>
            <Table size="sm">
                <thead>
                    <tr>
                        <th>Codigo</th>
                        <th>Descricao</th>
                        <th className='center'>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        slice.map(item => <LinhaTabela key={item.montId} item={item} selecionaLinha={selecionaLinha} atualizaItemSelecionado={atualizaItemSelecionado} />)
                    }
                </tbody>
            </Table>
            <TableFooter range={range} slice={slice} setPage={setPage} page={pagina} />
        </>
    );
};

const LinhaTabela = ({ item, atualizaItemSelecionado }) => {
    const { montId, montDescricao } = item;
    const selecionarItem = e => atualizaItemSelecionado(item);

    return <tr>
        <td width={'80px'}>{montId}</td>
        <td>{montDescricao}</td>
        <td width={'80px'} className='center'>
            <Button className='btn-success' onClick={selecionarItem}><BsPencilSquare /></Button>
        </td>
    </tr>
}

function pesquisaAnimais({ setValores, valores, atualizaItemSelecionado, setAbrirPesquisa }) {
    const [montDescricao, setMontDescricao] = useState("");

    const buscaRegistros = async () => {
        setValores(await (await api.get("/pesquisaMontaria")).data);
        setAbrirPesquisa(true);
    }

    const pesquisaAnimais = () => {
        return (
            <>
                <Modal className='modal-xl' show={true}>
                    <Modal.Header><b>Pesquisa de Montaria</b></Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Form>
                                <Row>
                                    <Col md="6">
                                        <Form.Label>Descrição</Form.Label>
                                        <Form.Control type="text" id="descricaoPesquisa"
                                            initi={montDescricao}
                                            onChange={(e) => setMontDescricao(e.target.value)} />
                                    </Col>
                                </Row>
                                <div className='right'>
                                    <Button className='btnMarginTop' onClick={buscaRegistros}>Pesquisar</Button>
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
    return pesquisaAnimais();
}
export default pesquisaAnimais;