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

function cadastroMaterial() {
    const [abrirPesquisa, setAbrirPesquisa] = useState(false);
    var [list, setList] = useState('[]');

    //Variáveis de cadastro
    const [matId, setMatId] = useState("");
    const [matDescricao, setMatDescricao] = useState("");

    //variáveis da dialog de pesquisa
    const [matIdPesquisa, setMatIdPesquisa] = useState("");
    const [matDescricaoPesquisa, setMatDescricaoPesquisa] = useState("");

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
                            slice.map(item => <LinhaTabela key={item.matId} item={item} />)
                        }
                    </tbody>
                </Table>
                <TableFooter range={range} slice={slice} setPage={setPage} page={pagina} />
            </>
        );
    };

    const atualizaDlgPesquisa = async () => {
        setList(await (await api.get("/pesquisaMaterial")).data);
        setAbrirPesquisa(true);
    }

    const buscaRegistros = async () => {
        setList(await (await api.get("/pesquisaMaterial?matId=" + matIdPesquisa + "&matDescricao=" + matDescricaoPesquisa)).data);
        setAbrirPesquisa(true);
    }

    const atualizaItemSelecionado = (item) => {
        setMatId(item.matId);
        setMatDescricao(item.matDescricao);
        setAbrirPesquisa(false);
    }

    const LinhaTabela = ({ item }) => {
        const { matId, matDescricao } = item;
        const selecionarItem = e => atualizaItemSelecionado(item);

        return <tr>
            <td width={'80px'}>{matId}</td>
            <td>{matDescricao}</td>
            <td width={'80px'} className='center'>
                <Button className='btn-success' onClick={selecionarItem}><BsPencilSquare /></Button>
            </td>
        </tr>
    }

    const enviaJsonGravar = () => {
        const json = {
            "matId": matId,
            "matDescricao": matDescricao,
        };
        api.post("/cadastraMaterial", json);
        registroSalvo();
    }

    const enviaJsonRemove = async () => {
        if (matId === "") {
            return;
        }
        try {
            const response = await (await api.delete("/removeMaterial?matId=" + matId));
            if (response.status === HTTP_STATUS.OK) {
                registroExcluido();
                limparCamposFormulario();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const limparCamposFormulario = () => {
        setMatId("");
        setMatDescricao("");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        enviaJsonGravar();
        limparCamposFormulario();
    }

    const cadastroMaterial = () => {
        return (
            <div>
                <Menu />
                <ReactNotifications />
                <Container className="vh-100">
                    <Form onSubmit={handleSubmit}>
                        <br />
                        <Row>
                            <h3>Cadastro de Materiais</h3>
                        </Row>
                        <Row>
                            <Col md="2">
                                <Form.Label htmlFor="inputId">Código</Form.Label>
                                <Form.Control value={matId} type="text" id="id" disabled />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <Form.Label htmlFor="inputDescricao">Descrição</Form.Label>
                                <Form.Control value={matDescricao} maxLength={60}
                                    onChange={(e) => setMatDescricao(e.target.value)}
                                    type="text" id="descricao" required />
                            </Col>
                        </Row>
                        <br />
                        <Toolbar jsonRemove={enviaJsonRemove} abrirPesquisa={atualizaDlgPesquisa} />
                    </Form>
                </Container>


                <Modal className='modal-xl' show={abrirPesquisa}>
                    <Modal.Header><b>Pesquisa de Materiais</b></Modal.Header>
                    <Modal.Body>
                        {abrirPesquisa &&
                            <>
                                <Container>
                                    <Form>
                                        <Row>
                                            <Col md="2">
                                                <Form.Label>Código</Form.Label>
                                                <Form.Control type="text" id="idPesquisa"
                                                    value={matIdPesquisa}
                                                    onChange={(e) => setMatIdPesquisa(e.target.value)} />
                                            </Col>
                                            <Col md="6">
                                                <Form.Label>Descrição</Form.Label>
                                                <Form.Control type="text" id="descricaoPesquisa"
                                                    initi={matDescricaoPesquisa}
                                                    onChange={(e) => setMatDescricaoPesquisa(e.target.value)} />
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
    return cadastroMaterial();
}
export default cadastroMaterial;