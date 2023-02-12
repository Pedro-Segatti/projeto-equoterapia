import React, { useState } from 'react';
import TableFooter from '../table/tableFooter';
import useTable from '../table/useTable';
import { BsPencilSquare, BsXLg } from "react-icons/bs";
import { Form, Col, Row, Container, Modal, Button, Table } from 'react-bootstrap';
import { api } from "../../utilitario/baseComunicacao";
import { isInputNumber } from "../../utilitario/patronatoUtil";

export const TableFuncionariosPaginada = ({ data, rowsPerPage, selecionaLinha, atualizaItemSelecionado, removeItemSelecionado }) => {
    const [pagina, setPage] = useState(1);
    const { slice, range } = useTable(data, pagina, rowsPerPage);
    return (
        <>
            <Table size="sm">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th className='center'>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        slice.map(item => <LinhaTabela key={item.medId} item={item} selecionaLinha={selecionaLinha} atualizaItemSelecionado={atualizaItemSelecionado} removeItemSelecionado={removeItemSelecionado} />)
                    }
                </tbody>
            </Table>
            <TableFooter range={range} slice={slice} setPage={setPage} page={pagina} />
        </>
    );
};

const LinhaTabela = ({ item, selecionaLinha, atualizaItemSelecionado, removeItemSelecionado }) => {
    const { medId } = item;
    const { pesNome, pesCpf } = item.pessoa;
    const selecionarItem = e => atualizaItemSelecionado(item);
    const removerItem = e => removeItemSelecionado(item);

    return <tr>
        <td width={'80px'}>{medId}</td>
        <td width={'100px'}>{pesNome}</td>
        <td width={'100px'}>{pesCpf}</td>
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

function pesquisaMedico({ setValores, valores, atualizaItemSelecionado, setAbrirPesquisa }) {
    const [medId, setMedId] = useState("");
    const [pesNomePesquisa, setPesNomePesquisa] = useState("");
    const [pesCpfPesquisa, setPesCpfPesquisa] = useState("");

    const buscaRegistros = async () => {
        setValores(await (await api.get("/pesquisaMedico?pesCpf=" + pesCpfPesquisa + "&pesNome=" + pesNomePesquisa + "&medId=" + medId)).data);
        setAbrirPesquisa(true);
    }

    const limparPesquisa = () => {
        setAbrirPesquisa(false);
        setMedId("");
        setPesNomePesquisa("");
        setPesCpfPesquisa("");
        buscaRegistros();
    }

    const pesquisaMedico = () => {
        return (
            <>
                <Modal className='modal-xl' show={true}>
                    <Modal.Header><b>Pesquisa de Médicos</b></Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Form>
                                <Row>
                                    <Col md="2">
                                        <Form.Label>Código</Form.Label>
                                        <Form.Control type="text" id="idPesquisa" onKeyPress={(e) => isInputNumber(e)}
                                            value={medId}
                                            onChange={(e) => setMedId(e.target.value)} />
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
                        <TableFuncionariosPaginada data={valores} rowsPerPage={5} selecionaLinha={true} atualizaItemSelecionado={atualizaItemSelecionado} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" className='btn-danger' onClick={() => setAbrirPesquisa(false)}>Fechar</Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
    return pesquisaMedico();
}
export default pesquisaMedico;