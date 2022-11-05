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

function cadastroAtividade() {
    const [abrirPesquisa, setAbrirPesquisa] = useState(false);
    var [list, setList] = useState('[]');
    
    //Variáveis de cadastro
    const [atvId, setAtvId] = useState("");
    const [atvDescricao, setAtvDescricao] = useState("");
    const [atvDuracao, setAtvDuracao] = useState("");

    //variáveis da dialog de pesquisa
    const [atvIdPesquisa, setAtvIdPesquisa] = useState("");
    const [atvDescricaoPesquisa, setAtvDescricaoPesquisa] = useState("");

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
                            <th>Duracao</th>
                            <th className='center'>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            slice.map(item => <LinhaTabela key={item.atvId} item={item} />)
                        }
                    </tbody>
                </Table>
                <TableFooter range={range} slice={slice} setPage={setPage} page={pagina} />
            </>
        );
    };

    const atualizaDlgPesquisa = async () => {
        setList(await (await api.get("/pesquisaAtividade")).data);
        setAbrirPesquisa(true);
    }

    const buscaRegistros = async () => {
        setList(await (await api.get("/pesquisaAtividade?atvId=" + atvIdPesquisa + "&atvDescricao=" + atvDescricaoPesquisa)).data);
        setAbrirPesquisa(true);
    }

    const atualizaItemSelecionado = (item) => {
        setAtvId(item.atvId);
        setAtvDescricao(item.atvDescricao);
        setAtvDuracao(item.atvDuracao);
        setAbrirPesquisa(false);
    }

    const LinhaTabela = ({ item }) => {
        const { atvId, atvDescricao, atvDuracao} = item;
        const selecionarItem = e => atualizaItemSelecionado(item);

        return <tr>
            <td width={'80px'}>{atvId}</td>
            <td>{atvDescricao}</td>
            <td width={'100px'}>{atvDuracao}</td>
            <td width={'80px'} className='center'>
                <Button className='btn-success' onClick={selecionarItem}><BsPencilSquare /></Button>
            </td>
        </tr>
    }

    const enviaJsonGravar = () => {
        const json = {
            "atvId": atvId,
            "atvDescricao": atvDescricao,
            "atvDuracao": atvDuracao,
        };
        api.post("/cadastraAtividade", json);
        registroSalvo();
    }

    const enviaJsonRemove = () => {
        api.delete("/removeAtividade?atvId=" + atvId);
    }

const cadastroAtividade = () => {
    return (
        <div>
            <Menu />
            <Container className="vh-100">
            <ReactNotifications />
                <Form>
                    <br />
                    <Row>
                        <h3>Cadastro de Atividades</h3>
                    </Row>
                    <Row>
                        <Col md="2">
                            <Form.Label htmlFor="inputId">Código</Form.Label>
                            <Form.Control value={atvId} type="text" id="id" disabled />
                        </Col>
                    </Row>
                    <Row>
                        <Col md="6">
                            <Form.Label htmlFor="inputDescricao">Descrição</Form.Label>
                            <Form.Control value={atvDescricao}
                            onChange={(e) => setAtvDescricao(e.target.value)}
                            type="text" id="descricao" required />
                        </Col>
                    </Row>
                    <Row>
                        <Col md="3">
                            <Form.Label htmlFor="inputDuracao">Duração</Form.Label>
                            <Form.Control value={atvDuracao}
                            onChange={(e) => setAtvDuracao(e.target.value)}
                            type="text" id="duracao" required />
                        </Col>
                    </Row>
    
                    <br />
                    <Toolbar jsonCadastro={enviaJsonGravar} jsonRemove={enviaJsonRemove} abrirPesquisa={atualizaDlgPesquisa} />
                </Form>
            </Container>
            

            <Modal className='modal-xl' show={abrirPesquisa}>
                <Modal.Header><b>Pesquisa de Atividades</b></Modal.Header>
                <Modal.Body>
                    {abrirPesquisa &&
                        <>
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
return cadastroAtividade();
}
export default cadastroAtividade;