import React, { useState } from 'react';
import TableFooter from '../table/tableFooter';
import useTable from '../table/useTable';
import { BsPencilSquare, BsXLg } from "react-icons/bs";
import { Form, Col, Row, Container, Modal, Button, Table } from 'react-bootstrap';
import { api } from "../../utilitario/baseComunicacao";
import { isInputNumber } from "../../utilitario/patronatoUtil";

export const TablePraticantesPaginada = ({ data, rowsPerPage, selecionaLinha, atualizaItemSelecionado, removePraticanteSelecionado }) => {
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
                        <th>Nascimento</th>
                        <th className='center'>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        slice.map(item => <LinhaTabela key={item.pratId} item={item} selecionaLinha={selecionaLinha} atualizaItemSelecionado={atualizaItemSelecionado} removePraticanteSelecionado={removePraticanteSelecionado} />)
                    }
                </tbody>
            </Table>
            <TableFooter range={range} slice={slice} setPage={setPage} page={pagina} />
        </>
    );
};

const LinhaTabela = ({ item, selecionaLinha, atualizaItemSelecionado, removePraticanteSelecionado }) => {
    const { pratId } = item;
    const { pesNome, pesCpf, pesDataNasc } = item.pessoa;
    const selecionarItem = e => atualizaItemSelecionado(item);
    const removerItem = e => removePraticanteSelecionado(item);

    return <tr>
        <td width={'80px'}>{pratId}</td>
        <td width={'100px'}>{pesNome}</td>
        <td width={'100px'}>{pesCpf}</td>
        <td width={'100px'}>{pesDataNasc}</td>
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

function pesquisaPraticantes({ setValores, valores, atualizaItemSelecionado, setAbrirPesquisa }) {
    const [pratIdPesquisa, setPratIdPesquisa] = useState("");
    const [pesNomePesquisa, setPesNomePesquisa] = useState("");
    const [pesCpfPesquisa, setPesCpfPesquisa] = useState("");

    const buscaRegistros = async () => {
        setValores(await (await api.get("/pesquisaPraticantes?pesCpf=" + pesCpfPesquisa + "&pesNome=" + pesNomePesquisa+ "&pratId=" + pratIdPesquisa)).data);
        await setAbrirPesquisa(true);
    }

    const limparCampos = () => {
        setAbrirPesquisa(false);
        setPratIdPesquisa("")
        setPesNomePesquisa("");
        setPesCpfPesquisa("");
    }

    const limparPesquisa = async ()  => {
        limparCampos();
        buscaRegistros();
    }

    const pesquisaPraticantes = () => {
        return (
            <>
                <Modal className='modal-xl' show={true}>
                    <Modal.Header><b>Pesquisa de Praticantes</b></Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Form>
                                <Row>
                                    <Col md="2">
                                        <Form.Label>Código</Form.Label>
                                        <Form.Control type="text" id="idPesquisa" onKeyPress={(e) => isInputNumber(e)}
                                            value={pratIdPesquisa}
                                            onChange={(e) => setPratIdPesquisa(e.target.value)} />
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
                        <TablePraticantesPaginada data={valores} rowsPerPage={5} selecionaLinha={true} atualizaItemSelecionado={atualizaItemSelecionado} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" className='btn-danger' onClick={() => setAbrirPesquisa(false)}>Fechar</Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
    return pesquisaPraticantes();
}
export default pesquisaPraticantes;