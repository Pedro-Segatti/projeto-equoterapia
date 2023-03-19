import React, { useState } from 'react';
import TableFooter from '../table/tableFooter';
import useTable from '../table/useTable';
import { BsCheckLg } from "react-icons/bs";
import { Form, Col, Row, Container, Modal, Button, Table } from 'react-bootstrap';
import { api } from "../../utilitario/baseComunicacao";

export const TablePaginada = ({ data, rowsPerPage, atualizaItemSelecionado }) => {
    const [pagina, setPage] = useState(1);
    const { slice, range } = useTable(data, pagina, rowsPerPage);
    return (
        <>
            <Table responsive>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Descrição</th>
                        <th className='center'>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        slice.map(item => <LinhaTabela key={item.carId} item={item} atualizaItemSelecionado={atualizaItemSelecionado} />)
                    }
                </tbody>
            </Table>
            <TableFooter range={range} slice={slice} setPage={setPage} page={pagina} />
        </>
    );
};

const LinhaTabela = ({ item, atualizaItemSelecionado }) => {
    const { carId, carDescricao } = item;
    const selecionarItem = e => atualizaItemSelecionado(item);

    return <tr>
        <td width={'80px'}>{carId}</td>
        <td>{carDescricao}</td>
        <td width={'80px'} className='center'>
            <Button className='btn-success' onClick={selecionarItem}><BsCheckLg /></Button>
        </td>
    </tr>
}

function pesquisaAnimais({ setValores, valores, atualizaItemSelecionado, setAbrirPesquisa }) {
    const [carIdPesquisa, setCarIdPesquisa] = useState("");
    const [carDescricaoPesquisa, setCarDescricaoPesquisa] = useState("");

    const buscaRegistros = async () => {
        setValores(await (await api.get("/pesquisaCargo?carId=" + carIdPesquisa + "&carDescricao=" + carDescricaoPesquisa)).data);
        setAbrirPesquisa(true);
    }

    const limparPesquisa = () => {
        setAbrirPesquisa(false);
        setCarIdPesquisa("");
        setCarDescricaoPesquisa("");
        buscaRegistros();
    }

    const pesquisaAnimais = () => {
        return (
            <>
                <Modal className='modal-xl' show={true}>
                    <Modal.Header><b>Pesquisa de Cargos</b></Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Form>
                                <Row>
                                    <Col md="2">
                                        <Form.Label>Código</Form.Label>
                                        <Form.Control type="text" id="idPesquisa"
                                            value={carIdPesquisa}
                                            onChange={(e) => setCarIdPesquisa(e.target.value)} />
                                    </Col>
                                    <Col md="6">
                                        <Form.Label>Descrição *</Form.Label>
                                        <Form.Control type="text" id="descricaoPesquisa"
                                            initi={carDescricaoPesquisa}
                                            onChange={(e) => setCarDescricaoPesquisa(e.target.value)} />
                                    </Col>
                                </Row>
                                <div className='right'>
                                    <Button className='btnMarginTop' onClick={buscaRegistros}>Pesquisar</Button>
                                    <Button className='btnMarginTop btn-warning btnToolbar' onClick={limparPesquisa}>Limpar</Button>
                                </div>
                            </Form>
                        </Container>

                        <TablePaginada data={valores} rowsPerPage={50} atualizaItemSelecionado={atualizaItemSelecionado} />
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