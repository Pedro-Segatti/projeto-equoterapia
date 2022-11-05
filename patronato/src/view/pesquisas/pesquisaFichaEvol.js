import React, { useState } from 'react';
import TableFooter from '../table/tableFooter';
import useTable from '../table/useTable';
import { BsPencilSquare } from "react-icons/bs";
import { Form, Col, Row, Container, Modal, Button, Table } from 'react-bootstrap';
import { api } from "../../utilitario/baseComunicacao";

function pesquisaAnimais({ setValores, valores, atualizaItemSelecionado, setAbrirPesquisa }) {
    const [evolIdPesquisa, setEvolIdPesquisa] = useState("");

    const TablePaginada = ({ data, rowsPerPage }) => {
        const [pagina, setPage] = useState(1);
        const { slice, range } = useTable(data, pagina, rowsPerPage);
        return (
            <>
                <Table size="sm">
                    <thead>
                        <tr>
                            <th>Codigo</th>
                            <th>Humor</th>
                            <th>Autonomia</th>
                            <th>Postura</th>
                            <th className='center'>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            slice.map(item => <LinhaTabela key={item.evolId} item={item} />)
                        }
                    </tbody>
                </Table>
                <TableFooter range={range} slice={slice} setPage={setPage} page={pagina} />
            </>
        );
    };

    const buscaRegistros = async () => {
        setValores(await (await api.get("/pesquisaFichaEvol?evolId=" + evolIdPesquisa)).data);
        setAbrirPesquisa(true);
    }

    const LinhaTabela = ({ item }) => {
        const { evolId, evolHumor, evolPostura, evolAutonomia } = item;
        const selecionarItem = e => atualizaItemSelecionado(item);

        return <tr>
            <td >{evolId}</td>
            <td>{evolHumor}</td>
            <td>{evolPostura}</td>
            <td >{evolAutonomia}</td>
            <td width={'80px'} className='center'>
                <Button className='btn-success' onClick={selecionarItem}><BsPencilSquare /></Button>
            </td>
        </tr>
    }

    const pesquisaAnimais = () => {
        return (
            <>
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
                                </Row>
                                <div className='right'>
                                    <Button className='btnMarginTop' onClick={buscaRegistros}>Pesquisar</Button>
                                </div>
                            </Form>
                        </Container>
                        <TablePaginada data={valores} rowsPerPage={5} />
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