import React, { useState } from 'react';
import TableFooter from '../table/tableFooter';
import useTable from '../table/useTable';
import { BsCheckLg,BsXLg } from "react-icons/bs";
import { Form, Col, Row, Container, Modal, Button, Table } from 'react-bootstrap';
import { api } from "../../utilitario/baseComunicacao";

export const TablePicadeiroPaginada = ({ data, rowsPerPage, selecionaLinha, atualizaItemSelecionado, removeItemSelecionado }) => {
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
                        slice.map(item => <LinhaTabela key={item.picId} item={item} atualizaItemSelecionado={atualizaItemSelecionado} selecionaLinha={selecionaLinha} removeItemSelecionado={removeItemSelecionado} />)
                    }
                </tbody>
            </Table>
            <TableFooter range={range} slice={slice} setPage={setPage} page={pagina} />
        </>
    );
};

const LinhaTabela = ({ item, selecionaLinha, atualizaItemSelecionado, removeItemSelecionado }) => {
    const { picId, picDescricao } = item;
    const selecionarItem = e => atualizaItemSelecionado(item);
    const removerItem = e => removeItemSelecionado(item);

    return <tr>
        <td width={'80px'}>{picId}</td>
        <td>{picDescricao}</td>

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

function pesquisaPicadeiro({ setValores, valores, atualizaItemSelecionado, setAbrirPesquisa }) {
    const [picIdPesquisa, setPicIdPesquisa] = useState("");
    const [picDescricaoPesquisa, setPicDescricaoPesquisa] = useState("");

    const buscaRegistros = async () => {
        setValores(await (await api.get("/pesquisaPicadeiro?picId=" + picIdPesquisa + "&picDescricao=" + picDescricaoPesquisa)).data);
        setAbrirPesquisa(true);
    }

    const limparPesquisa = () => {
        setAbrirPesquisa(false);
        setPicIdPesquisa("");
        setPicDescricaoPesquisa("");
        buscaRegistros();
    }

    const pesquisaPicadeiro = () => {
        return (
            <>
                <Modal className='modal-xl' show={true}>
                    <Modal.Header><b>Pesquisa de Picadeiro</b></Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Form>
                                <Row>
                                    <Col md="2">
                                        <Form.Label>Código</Form.Label>
                                        <Form.Control type="text" id="idPesquisa"
                                            value={picIdPesquisa}
                                            onChange={(e) => setPicIdPesquisa(e.target.value)} />
                                    </Col>
                                    <Col md="6">
                                        <Form.Label>Descrição</Form.Label>
                                        <Form.Control type="text" id="descricaoPesquisa"
                                            initi={picDescricaoPesquisa}
                                            onChange={(e) => setPicDescricaoPesquisa(e.target.value)} />
                                    </Col>
                                </Row>
                                <div className='right'>
                                    <Button className='btnMarginTop' onClick={buscaRegistros}>Pesquisar</Button>
                                    <Button className='btnMarginTop btn-warning btnToolbar' onClick={limparPesquisa}>Limpar</Button>
                                </div>
                            </Form>
                        </Container>
                        <TablePicadeiroPaginada data={valores} rowsPerPage={5} selecionaLinha={true} atualizaItemSelecionado={atualizaItemSelecionado} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" className='btn-danger' onClick={() => setAbrirPesquisa(false)}>Fechar</Button>
                    </Modal.Footer>
                </Modal >
            </>
        )
    }
    return pesquisaPicadeiro();
}
export default pesquisaPicadeiro;