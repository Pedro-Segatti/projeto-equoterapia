import React, { useState } from 'react';
import TableFooter from '../table/tableFooter';
import useTable from '../table/useTable';
import { BsCheckLg,BsXLg } from "react-icons/bs";
import { Form, Col, Row, Container, Modal, Button, Table } from 'react-bootstrap';
import { api } from "../../utilitario/baseComunicacao";

export const TablePaginada = ({ data, rowsPerPage, selecionaLinha, atualizaItemSelecionado,removeAnimalSelecionado }) => {
    const [pagina, setPage] = useState(1);
    const { slice, range } = useTable(data, pagina, rowsPerPage);
    return (
        <>
            <Table responsive>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Idade</th>
                        <th>Porte</th>
                        <th className='center'>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        slice.map(item => <LinhaTabela key={item.aniId} item={item} selecionaLinha={selecionaLinha} atualizaItemSelecionado={atualizaItemSelecionado} removeAnimalSelecionado={removeAnimalSelecionado} />)
                    }
                </tbody>
            </Table>
            <TableFooter range={range} slice={slice} setPage={setPage} page={pagina} />
        </>
    );
};

const LinhaTabela = ({ item, selecionaLinha, atualizaItemSelecionado,removeAnimalSelecionado }) => {
    const { aniId, aniNome, aniIdade, aniPorte } = item;
    const selecionarItem = e => atualizaItemSelecionado(item);
    const removerItem = e => removeAnimalSelecionado(item);

    return <tr>
        <td width={'80px'}>{aniId}</td>
        <td>{aniNome}</td>
        <td width={'100px'}>{aniIdade}</td>
        <td width={'100px'}>{aniPorte}</td>
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

function pesquisaAnimais({ setValores, valores, atualizaItemSelecionado, setAbrirPesquisa }) {
    const [aniIdPesquisa, setAniIdPesquisa] = useState("");
    const [aniNomePesquisa, setAniNomePesquisa] = useState("");

    const buscaRegistros = async () => {
        setValores(await (await api.get("/pesquisaAnimal?aniId=" + aniIdPesquisa + "&aniNome=" + aniNomePesquisa)).data);
        setAbrirPesquisa(true);
    }

    const limparPesquisa = () => {
        setAbrirPesquisa(false);
        setAniIdPesquisa("");
        setAniNomePesquisa("");
        buscaRegistros();
    }

    const pesquisaAnimais = () => {
        return (
            <>
                <Modal className='modal-xl' show={true}>
                    <Modal.Header><b>Pesquisa de Animal</b></Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Form>
                                <Row>
                                    <Col md="2">
                                        <Form.Label>Código</Form.Label>
                                        <Form.Control type="text" id="idPesquisa"
                                            value={aniIdPesquisa}
                                            onChange={(e) => setAniIdPesquisa(e.target.value)} />
                                    </Col>
                                    <Col md="6">
                                        <Form.Label>Nome</Form.Label>
                                        <Form.Control type="text" id="nomePesquisa"
                                            initi={aniNomePesquisa}
                                            onChange={(e) => setAniNomePesquisa(e.target.value)} />
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
    return pesquisaAnimais();
}
export default pesquisaAnimais;