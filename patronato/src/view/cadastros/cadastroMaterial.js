import React, { useState } from 'react';
import { Form, Col, Row, Container, Modal, Button, Table } from 'react-bootstrap';
import Toolbar from '../toolbar';
import TableFooter from '../table/tableFooter';
import useTable from '../table/useTable';
import { BsPencilSquare } from "react-icons/bs";
import { registroSalvo } from "../../utilitario/mensagemUtil"
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import {api} from "../../utilitario/baseComunicacao";
import Menu from "../menu"
import Footer from "../footer"


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
        const { matId, matDescricao} = item;
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

    const enviaJsonRemove = () => {
        api.delete("/removeMaterial?matId=" + matId);
    }

const cadastroMaterial = () => {
    return (
        <div>
            <Menu />
            <Container className="vh-100">
            <ReactNotifications />
                <Form>
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
                            <Form.Control value={matDescricao}
                            onChange={(e) => setMatDescricao(e.target.value)}
                            type="text" id="descricao" required />
                        </Col>
                    </Row>
                    <br />
                    <Toolbar jsonCadastro={enviaJsonGravar} jsonRemove={enviaJsonRemove} abrirPesquisa={atualizaDlgPesquisa} />
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