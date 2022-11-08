import React, { useState } from 'react';
import { Form, Col, Row, Container, Modal, Button, Table } from 'react-bootstrap';
import Toolbar from '../toolbar';
import TableFooter from '../table/tableFooter';
import useTable from '../table/useTable';
import { BsPencilSquare } from "react-icons/bs";
import { registroSalvo, registroExcluido } from "../../utilitario/mensagemUtil";
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { api } from "../../utilitario/baseComunicacao";
import Menu from "../menu";
import Footer from "../footer";
import HTTP_STATUS from "../../utilitario/httpStatus";

function cadastroPicadeiro() {
    const [abrirPesquisa, setAbrirPesquisa] = useState(false);
    var [list, setList] = useState('[]');

    //Variáveis de cadastro
    const [picId, setPicId] = useState("");
    const [picDescricao, setPicDescricao] = useState("");

    //variáveis da dialog de pesquisa
    const [picIdPesquisa, setPicIdPesquisa] = useState("");
    const [picDescricaoPesquisa, setPicDescricaoPesquisa] = useState("");

    const TablePaginada = ({ data, rowsPerPage }) => {
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
                            slice.map(item => <LinhaTabela key={item.picId} item={item} />)
                        }
                    </tbody>
                </Table>
                <TableFooter range={range} slice={slice} setPage={setPage} page={pagina} />
            </>
        );
    };

    const atualizaDlgPesquisa = async () => {
        setList(await (await api.get("/pesquisaPicadeiro")).data);
        setAbrirPesquisa(true);
    }

    const buscaRegistros = async () => {
        setList(await (await api.get("/pesquisaPicadeiro?picId=" + picIdPesquisa + "&picDescricao=" + picDescricaoPesquisa)).data);
        setAbrirPesquisa(true);
    }

    const atualizaItemSelecionado = (item) => {
        setPicId(item.picId);
        setPicDescricao(item.picDescricao);
        setAbrirPesquisa(false);
    }

    const LinhaTabela = ({ item }) => {
        const { picId, picDescricao } = item;
        const selecionarItem = e => atualizaItemSelecionado(item);

        return <tr>
            <td width={'80px'}>{picId}</td>
            <td>{picDescricao}</td>
            <td width={'80px'} className='center'>
                <Button className='btn-success' onClick={selecionarItem}><BsPencilSquare /></Button>
            </td>
        </tr>
    }

    const enviaJsonGravar = () => {
        const json = {
            "picId": picId,
            "picDescricao": picDescricao,
        };
        api.post("/cadastraPicadeiro", json);
        registroSalvo();
    }

    const enviaJsonRemove = async () => {
        if (picId === "") {
            return;
        }
        try {
            const response = await (await api.delete("/removePicadeiro?picId=" + picId));
            if (response.status === HTTP_STATUS.OK) {
                registroExcluido();
                limparCamposFormulario();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const limparCamposFormulario = () => {
        setPicId("");
        setPicDescricao("");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        enviaJsonGravar();
        limparCamposFormulario();
    }

    const cadastroPicadeiro = () => {
        return (
            <div>
                <Menu />
                <ReactNotifications />
                <Container className="vh-100">
                    <Form onSubmit={handleSubmit}>
                        <br />
                        <Row>
                            <h3>Cadastro de Picadeiro</h3>
                        </Row>
                        <Row>
                            <Col md="2">
                                <Form.Label htmlFor="inputId">Código</Form.Label>
                                <Form.Control value={picId} type="text" id="id" disabled />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <Form.Label htmlFor="inputDescricao">Descrição</Form.Label>
                                <Form.Control value={picDescricao} maxLength={50}
                                    onChange={(e) => setPicDescricao(e.target.value)}
                                    type="text" id="descricao" required />
                            </Col>
                        </Row>
                        <br />
                        <Toolbar jsonRemove={enviaJsonRemove} abrirPesquisa={atualizaDlgPesquisa} />
                    </Form>
                </Container>


                <Modal className='modal-xl' show={abrirPesquisa}>
                    <Modal.Header><b>Pesquisa de Picadeiro</b></Modal.Header>
                    <Modal.Body>
                        {abrirPesquisa &&
                            <>
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
                                        </div>
                                    </Form>
                                </Container>

                                <TablePaginada data={list} rowsPerPage={50} />
                            </>
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" className='btn-danger' onClick={() => setAbrirPesquisa(false)}>Fechar</Button>
                    </Modal.Footer>
                </Modal>

                <Footer />
            </div >
        )
    }
    return cadastroPicadeiro();
}
export default cadastroPicadeiro;