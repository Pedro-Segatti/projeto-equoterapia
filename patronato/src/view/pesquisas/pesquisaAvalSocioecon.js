import React, { useState } from 'react';
import TableFooter from '../table/tableFooter';
import useTable from '../table/useTable';
import { BsCheckLg } from "react-icons/bs";
import { Form, Container, Modal, Button, Table } from 'react-bootstrap';
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
                        <th>Obs Cont Fam</th>
                        <th>Obs Medicamentos</th>
                        <th className='center'>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        slice.map(item => <LinhaTabela key={item.aseId} item={item} atualizaItemSelecionado={atualizaItemSelecionado} />)
                    }
                </tbody>
            </Table>
            <TableFooter range={range} slice={slice} setPage={setPage} page={pagina} />
        </>
    );
};

const LinhaTabela = ({ item, atualizaItemSelecionado }) => {
    const { aseId, aseObsContFam, aseObsMedicamentos } = item;
    const selecionarItem = e => atualizaItemSelecionado(item);

    return <tr>
        <td width={'80px'}>{aseId}</td>
        <td>{aseObsContFam}</td>
        <td>{aseObsMedicamentos}</td>
        <td width={'80px'} className='center'>
            <Button className='btn-success' onClick={selecionarItem}><BsCheckLg /></Button>
        </td>
    </tr>
}

function pesquisaAvalSocioEcon({ setValores, valores, atualizaItemSelecionado, setAbrirPesquisa }) {

    const buscaRegistros = async () => {
        setValores(await (await api.get("/pesquisaAvalSocioEcon")).data);
        setAbrirPesquisa(true);
    }

    const pesquisaAvalSocioEcon = () => {
        return (
            <>
                <Modal className='modal-xl' show={true}>
                    <Modal.Header><b>Pesquisa de Avaliação Socioeconômica</b></Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Form>
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
    return pesquisaAvalSocioEcon();
}
export default pesquisaAvalSocioEcon;