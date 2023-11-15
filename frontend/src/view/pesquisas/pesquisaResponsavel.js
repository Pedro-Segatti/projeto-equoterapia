import React, { useState } from 'react';
import TableFooter from '../table/tableFooter';
import useTable from '../table/useTable';
import { BsCheckLg, BsXLg } from "react-icons/bs";
import { Form, Col, Row, Container, Modal, Button, Table } from 'react-bootstrap';
import { api } from "../../utilitario/baseComunicacao";
import { isInputNumber } from "../../utilitario/equoterapiaUtil";

export const TablePaginada = ({ data, rowsPerPage, selecionaLinha, atualizaItemSelecionado, removeResponsavelSelecionado }) => {
    const [pagina, setPage] = useState(1);
    const { slice, range } = useTable(data, pagina, rowsPerPage);
    return (
        <>
            <Table responsive>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>Profissão</th>
                        <th>Nascimento</th>
                        <th className='center'>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        slice.map(item => <LinhaTabela key={item.respId} item={item} selecionaLinha={selecionaLinha} atualizaItemSelecionado={atualizaItemSelecionado} removeResponsavelSelecionado={removeResponsavelSelecionado} />)
                    }
                </tbody>
            </Table>
            <TableFooter range={range} slice={slice} setPage={setPage} page={pagina} />
        </>
    );
};

const LinhaTabela = ({ item, selecionaLinha, atualizaItemSelecionado, removeResponsavelSelecionado }) => {
    const { respId, respProfissao } = item;
    const { pesNome, pesCpf, pesDataNasc } = item.pessoa;
    const selecionarItem = e => atualizaItemSelecionado(item);
    const removerItem = e => removeResponsavelSelecionado(item);

    return <tr>
        <td width={'80px'}>{respId}</td>
        <td width={'100px'}>{pesNome}</td>
        <td width={'100px'}>{pesCpf}</td>
        <td width={'100px'}>{respProfissao}</td>
        <td width={'100px'}>{pesDataNasc}</td>
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

function pesquisaResponsavel({ setValores, valores, atualizaItemSelecionado, setAbrirPesquisa }) {
    const [respId, setRespId] = useState("");
    const [pesNomePesquisa, setPesNomePesquisa] = useState("");
    const [pesCpfPesquisa, setPesCpfPesquisa] = useState("");

    const buscaRegistros = async () => {
        setValores(await (await api.get("/pesquisaResponsavel?pesCpf=" + pesCpfPesquisa + "&pesNome=" + pesNomePesquisa + "&respId=" + respId)).data);
        setAbrirPesquisa(true);
    }

    const limparPesquisa = () => {
        setAbrirPesquisa(false);
        setRespId("");
        setPesNomePesquisa("");
        setPesCpfPesquisa("");
        buscaRegistros();
    }

    const pesquisaResponsavel = () => {
        return (
            <>
                <Modal className='modal-xl' show={true}>
                    <Modal.Header><b>Pesquisa de Responsáveis</b></Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Form>
                                <Row>
                                    <Col md="2">
                                        <Form.Label>Código</Form.Label>
                                        <Form.Control type="text" id="idPesquisa" onKeyPress={(e) => isInputNumber(e)}
                                            value={respId}
                                            onChange={(e) => setRespId(e.target.value)} />
                                    </Col>
                                    <Col md="6">
                                        <Form.Label>Nome</Form.Label>
                                        <Form.Control type="text" id="nomePesquisa"
                                            value={pesNomePesquisa}
                                            onChange={(e) => setPesNomePesquisa(e.target.value)} />
                                    </Col>
                                    <Col md="4">
                                        <Form.Label>CPF</Form.Label>
                                        <Form.Control type="text" id="cpfPesquisa"
                                            value={pesCpfPesquisa} inputMode="numeric"
                                            onChange={(e) => setPesCpfPesquisa(e.target.value)} />
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
            </>
        )
    }
    return pesquisaResponsavel();
}
export default pesquisaResponsavel;