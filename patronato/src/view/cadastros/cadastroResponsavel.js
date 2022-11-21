import React, { useState } from 'react';
import { Form, Col, Row, Container} from 'react-bootstrap';
import Toolbar from '../toolbar';
import { IMaskInput } from 'react-imask';
import { registroSalvo, pessoaDuplicada, semRegistros, registroExcluido} from "../../utilitario/mensagemUtil"
import { ReactNotifications } from 'react-notifications-component'
import { criarPessoa, atualizarPessoa } from "../../utilitario/patronatoUtil";
import { cadastrarResponsavel, atualizarResponsavel} from "../../utilitario/baseComunicacao";
import { api } from "../../utilitario/baseComunicacao";
import HTTP_STATUS from "../../utilitario/httpStatus";
import PesquisaResponsaveis from "../pesquisas/pesquisaResponsavel";
import PesquisaLogradouros from "../pesquisas/pesquisaLogradouro";

import InputConverter from "../inputConverter";


import Menu from "../menu"
import Footer from "../footer"

const cadastroResponsavel = () => {

    const [respId, setRespId] = useState("");
    const [respProfissao, setRespProfissao] = useState("");


    const [pesNome, setPesNome] = useState("");
    const [pesCpf, setPesCpf] = useState("");
    const [pesSexo, setPesSexo] = useState("");
    const [pesDataNasc, setPesDataNasc] = useState("");
    const [pesEndNum, setPesEndNum] = useState("");
    const [pesEndCompl, setPesEndCompl] = useState("");
    const [pesNacionalidade, setPesNacionalidade] = useState("");
    const [pesEmail1, setPesEmail1] = useState("");
    const [pesEmail2, setPesEmail2] = useState("");
    const [pesLogId, setPesLogId] = useState("");
    const [pesLogDescricao, setPesLogDescricao] = useState("");

    const [abrirPesquisa, setAbrirPesquisa] = useState(false);
    const [abrirPesquisaLogradouro, setAbrirPesquisaLogradouro] = useState(false);
    const [list, setList] = useState([]);
    const [listLogradouro, setListLogradouro] = useState([]);

    const atualizaDlgPesquisa = async () => {
        setList(await (await api.get("/pesquisaResponsavel")).data);
        setAbrirPesquisa(true);
    }

    const atualizaDlgPesquisaLogradouro = async () => {
        setListLogradouro(await (await api.get("/pesquisaLogradouros")).data);
        setAbrirPesquisaLogradouro(true);
    }

    const atualizaLogradouroSelecionado = (item) => {
        setPesLogId(item.logId)
        setPesLogDescricao(item.logDescricao)
        setAbrirPesquisaLogradouro(false);
    }

    const removerResponsavel= async () => {
        try {
            const response = await (await api.delete("/removeResponsavel?respId=" + respId));
            if (response.status === HTTP_STATUS.OK) {
                registroExcluido();
                limparCamposFormulario();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const atualizaItemSelecionado = (item) => {
        setRespId(item.respId);
        setPesNome(item.pessoa.pesNome);
        setPesCpf(item.pessoa.pesCpf);
        setPesSexo(item.pessoa.pesSexo);
        setPesDataNasc(item.pessoa.pesDataNasc);
        setPesEndNum(item.pessoa.pesEndNum);
        setPesEndCompl(item.pessoa.pesEndCompl);
        setPesNacionalidade(item.pessoa.pesNacionalidade.paiIso);
        setPesEmail1(item.pessoa.pesEmail1);
        setPesEmail2(item.pessoa.pesEmail2);
        setPesLogId(1);
        setRespProfissao(item.respProfissao);
        setPesLogId(item.pessoa.logradouro.logId);
        setPesLogDescricao(item.pessoa.logradouro.logDescricao);
        setAbrirPesquisa(false);
    }

    const limparCamposFormulario = () => {
        setRespId("");
        setPesNome("");
        setPesCpf("");
        setPesSexo("");
        setPesDataNasc("");
        setPesEndNum("");
        setPesEndCompl("");
        setPesNacionalidade("");
        setPesEmail1("");
        setPesEmail2("");
        setPesLogId("");
        setRespProfissao("");
        setPesLogId("");
        setPesLogDescricao("");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const cadastraPessoa = async () => {
            return await criarPessoa(pesNome, pesCpf, pesSexo, pesDataNasc, pesEndNum, pesEndCompl, pesNacionalidade, pesEmail1, pesEmail2, pesLogId);
        }

        const atualizaPessoa = async () => {
            return await atualizarPessoa(pesNome, pesCpf, pesSexo, pesDataNasc, pesEndNum, pesEndCompl, pesNacionalidade, pesEmail1, pesEmail2, pesLogId);
        }

        const montaJsonResponsavel = (idPessoa) => {
            const jsonResponsavel = {
                "respId": respId,
                "pessoaId": idPessoa,
                "respProfissao": respProfissao,
            }

            return jsonResponsavel;
        }

        const cadastraResponsavel = async (idPessoa) => {
            return await cadastrarResponsavel(montaJsonResponsavel(idPessoa));
        }

        const atualizaResponsavel = async () => {
            return await atualizarResponsavel(montaJsonResponsavel(null));
        }

        const atualizarRegistros = async () => {
            try {
                const responseAttPessoa = await atualizaPessoa();
                const responseAttResponsavel = await atualizaResponsavel();

                if (responseAttPessoa.status === HTTP_STATUS.OK && responseAttResponsavel.status === HTTP_STATUS.OK) {
                    registroSalvo();
                    limparCamposFormulario();
                }
            } catch (error) {
                if (error.response.status === HTTP_STATUS.FORBIDDEN) {
                    console.log(error);
                    semRegistros();
                }
            }

        }

        const criarPessoaEResponsavel = async () => {
            try {
                const response = await cadastraPessoa();
                if (response.status === HTTP_STATUS.OK) {
                    const responseResponsavel = await cadastraResponsavel(response.data.pesId);
                    if (responseResponsavel.status === HTTP_STATUS.OK) {
                        registroSalvo();
                        limparCamposFormulario();
                    }
                }
            } catch (error) {
                if (error.response.status === HTTP_STATUS.BAD_REQUEST) {
                    atualizaPessoa();
                    pessoaDuplicada();
                }

                if (error.response.status === HTTP_STATUS.FORBIDDEN) {
                    console.log(error);
                }
            }
        }

        if (respId === "") {
            criarPessoaEResponsavel();
        } else {
            atualizarRegistros();
        }
    };

    return (
        <div>
            <Menu />
            <ReactNotifications />
            <Container>
                <Form onSubmit={handleSubmit}>
                    <br />
                    <Row>
                        <h3>Cadastro de Responsáveis</h3>
                    </Row>

                    <Row>
                        <Col md="2">
                            <Form.Label htmlFor="inputId">Código</Form.Label>
                            <Form.Control value={respId} type="text" id="inputId" disabled />
                        </Col>
                    </Row>
                    <Row>
                        <Col md="6">
                            <Form.Label htmlFor="inputNome">Nome</Form.Label>
                            <Form.Control value={pesNome}
                                onChange={(e) => setPesNome(e.target.value)}
                                type="text" id="inputNome" required />
                        </Col>
                    </Row>
                    <Row>
                        <Col md="3">
                            <Form.Label htmlFor="inputDate">Data de Nascimento</Form.Label>
                            <Form.Control value={pesDataNasc}
                                onChange={(e) => setPesDataNasc(e.target.value)}
                                type="date" id="inputDate" required />
                        </Col>
                        <Col md="3">
                            <Form.Label htmlFor="inputCpf">CPF</Form.Label>
                            <Form.Control id="inputCpf" type="text" maxLength='14' as={IMaskInput} inputMode="numeric"
                                mask="000.000.000-00" placeholder='Digite aqui o seu CPF...' required value={pesCpf} onChange={(l) => setPesCpf(l.target.value)} />
                        </Col>
                    </Row>

                    <Row>
                        <Col md="3">
                            <Form.Label htmlFor="inputSexo">Sexo</Form.Label>
                            <Form.Select id='inputSexo' required
                                value={pesSexo}
                                onChange={(e) => setPesSexo(e.target.value)}>
                                <option>Selecione</option>
                                <option value="F">Feminino</option>
                                <option value="M">Masculino</option>
                            </Form.Select>
                        </Col>
                        <Col md="3">
                            <Form.Label htmlFor="inputRespProfissao">Profissao</Form.Label>
                            <Form.Control value={respProfissao}
                                onChange={(e) => setRespProfissao(e.target.value)}
                                type="text" id="inputRespProfissao" required />
                        </Col>
                    </Row>
                    <Row>
                        <Col md="6">
                            <Form.Label htmlFor="inputEmailP">Email Principal</Form.Label>
                            <Form.Control value={pesEmail1}
                                onChange={(e) => setPesEmail1(e.target.value)}
                                type="text" id="inputEmailP" required />
                        </Col>
                    </Row>
                    <Row>
                        <Col md="6">
                            <Form.Label htmlFor="inputEmailS">Email Secundário</Form.Label>
                            <Form.Control value={pesEmail2}
                                onChange={(e) => setPesEmail2(e.target.value)}
                                type="text" id="inputEmailS" />
                        </Col>
                    </Row>

                    <Row>
                        <Col md="6">
                            <Form.Label htmlFor="inputLogradouro">Logradouro</Form.Label>
                            <InputConverter descricao={pesLogDescricao} atualizaDlgPesquisa={atualizaDlgPesquisaLogradouro} />
                        </Col>
                    </Row>
                    <Row>
                        <Col md="2">
                            <Form.Label htmlFor="inputEndNum">Número</Form.Label>
                            <Form.Control value={pesEndNum} type="text" id="inputEndNum" onChange={(e) => setPesEndNum(e.target.value)} required />
                        </Col>
                        <Col md="4">
                            <Form.Label htmlFor="inputEndCompl">Complemento</Form.Label>
                            <Form.Control value={pesEndCompl}
                                onChange={(e) => setPesEndCompl(e.target.value)}
                                type="text" id="inputEndCompl" />
                        </Col>
                    </Row>

                    <br />

                    <Toolbar abrirPesquisa={atualizaDlgPesquisa} jsonRemove={removerResponsavel} />
                </Form>
            </Container>

            {abrirPesquisa &&
                <PesquisaResponsaveis setValores={setList} valores={list} atualizaItemSelecionado={atualizaItemSelecionado} setAbrirPesquisa={setAbrirPesquisa} />
            }

            {abrirPesquisaLogradouro &&
                <PesquisaLogradouros setValores={setListLogradouro} valores={listLogradouro} atualizaItemSelecionado={atualizaLogradouroSelecionado} setAbrirPesquisa={setAbrirPesquisaLogradouro} />
            }
            <Footer />
        </div>
    );
};
export default cadastroResponsavel;