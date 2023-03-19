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
                        <th>Duração</th>
                        <th className='center'>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        slice.map(item => <LinhaTabela key={item.atvId} item={item} atualizaItemSelecionado={atualizaItemSelecionado} />)
                    }
                </tbody>
            </Table>
            <TableFooter range={range} slice={slice} setPage={setPage} page={pagina} />
        </>
    );
};

const LinhaTabela = ({ item, atualizaItemSelecionado }) => {
    const { atvId, atvDescricao, atvDuracao } = item;
    const selecionarItem = e => atualizaItemSelecionado(item);

    return <tr>
        <td width={'80px'}>{atvId}</td>
        <td>{atvDescricao}</td>
        <td width={'100px'}>{atvDuracao}</td>
        <td width={'80px'} className='center'>
            <Button className='btn-success' onClick={selecionarItem}><BsCheckLg /></Button>
        </td>
    </tr>
}

function pesquisaAtividade({ setValores, valores, atualizaItemSelecionado, setAbrirPesquisa }) {
    const [atvIdPesquisa, setAtvIdPesquisa] = useState("");
    const [atvDescricaoPesquisa, setAtvDescricaoPesquisa] = useState("");

    const buscaRegistros = async () => {
        setValores(await (await api.get("/pesquisaAtividade?atvId=" + atvIdPesquisa + "&atvDescricao=" + atvDescricaoPesquisa)).data);
        setAbrirPesquisa(true);
    }

    const limparPesquisa = () => {
        setAbrirPesquisa(false);
        setAtvIdPesquisa("");
        setAtvDescricaoPesquisa("");
        buscaRegistros();
    }

    const pesquisaAtividade = () => {
        return (
            <>
                <Modal className='modal-xl' show={true}>
                    <Modal.Header><b>Pesquisa de Atividades</b></Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Form>
                                <Row>
                                    <Col md="2">
                                        <Form.Label>Código</Form.Label>
                                        <Form.Control type="text" id="idPesquisa"
                                            value={atvIdPesquisa}
                                            onChange={(e) => setAtvIdPesquisa(e.target.value)} />
                                    </Col>
                                    <Col md="6">
                                        <Form.Label>Descrição</Form.Label>
                                        <Form.Control type="text" id="descricaoPesquisa"
                                            initi={atvDescricaoPesquisa}
                                            onChange={(e) => setAtvDescricaoPesquisa(e.target.value)} />
                                    </Col>
                                </Row>
                                <div className='right'>
                                    <Button className='btnMarginTop' onClick={buscaRegistros}>Pesquisar</Button>
                                    <Button className='btnMarginTop btn-warning btnToolbar' onClick={limparPesquisa}>Limpar</Button>
                                </div>
                            </Form>
                        </Container>
                        <TablePaginada data={valores} rowsPerPage={10} selecionaLinha={true} atualizaItemSelecionado={atualizaItemSelecionado} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" className='btn-danger' onClick={() => setAbrirPesquisa(false)}>Fechar</Button>
                    </Modal.Footer>
                </Modal >
            </>
        )
    }
    return pesquisaAtividade();
}
export default pesquisaAtividade;