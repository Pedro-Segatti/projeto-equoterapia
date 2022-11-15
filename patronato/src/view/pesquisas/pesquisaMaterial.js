import React, { useState } from 'react';
import TableFooter from '../table/tableFooter';
import useTable from '../table/useTable';
import { BsPencilSquare } from "react-icons/bs";
import { Form, Col, Row, Container, Modal, Button, Table } from 'react-bootstrap';
import { api } from "../../utilitario/baseComunicacao";

export const TablePaginada = ({ data, rowsPerPage, atualizaItemSelecionado }) => {
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
                        slice.map(item => <LinhaTabela key={item.matId} item={item} atualizaItemSelecionado={atualizaItemSelecionado} />)
                    }
                </tbody>
            </Table>
            <TableFooter range={range} slice={slice} setPage={setPage} page={pagina} />
        </>
    );
};

const LinhaTabela = ({ item, atualizaItemSelecionado }) => {
    const { matId, matDescricao } = item;
    const selecionarItem = e => atualizaItemSelecionado(item);

    return <tr>
        <td width={'80px'}>{matId}</td>
        <td>{matDescricao}</td>
        <td width={'80px'} className='center'>
            <Button className='btn-success' onClick={selecionarItem}><BsPencilSquare /></Button>
        </td>
    </tr>
}

function pesquisaMaterial({ setValores, valores, atualizaItemSelecionado, setAbrirPesquisa }) {
    const [matIdPesquisa, setMatIdPesquisa] = useState("");
    const [matDescricaoPesquisa, setMatDescricaoPesquisa] = useState("");

    const buscaRegistros = async () => {
        setValores(await (await api.get("/pesquisaMaterial?matId=" + matIdPesquisa + "&matDescricao=" + matDescricaoPesquisa)).data);
        setAbrirPesquisa(true);
    }

    const pesquisaMaterial = () => {
        return (
            <>
                <Modal className='modal-xl' show={true}>
                    <Modal.Header><b>Pesquisa de Materiais</b></Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Form>
                                <Row>
                                    <Col md="2">
                                        <Form.Label>Código</Form.Label>
                                        <Form.Control type="text" id="idPesquisa"
                                            value={matIdPesquisa}
                                            onChange={(e) => setMatIdPesquisa(e.target.value)} />
                                    </Col>
                                    <Col md="6">
                                        <Form.Label>Descrição</Form.Label>
                                        <Form.Control type="text" id="descricaoPesquisa"
                                            initi={matDescricaoPesquisa}
                                            onChange={(e) => setMatDescricaoPesquisa(e.target.value)} />
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
                </Modal >
            </>
        )
    }
    return pesquisaMaterial();
}
export default pesquisaMaterial;