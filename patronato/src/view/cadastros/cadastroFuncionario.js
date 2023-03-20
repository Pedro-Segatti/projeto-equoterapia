import React, { useState  } from 'react';
import { Form, Col, Row, Container } from 'react-bootstrap';
import Toolbar from '../toolbar';
import { IMaskInput } from 'react-imask';
import { registroSalvo, pessoaDuplicada, registroExcluido, mensagemCustomizada } from "../../utilitario/mensagemUtil"
import { ReactNotifications } from 'react-notifications-component'
import { montaJsonPessoaCompleta } from "../../utilitario/patronatoUtil";
import { cadastrarFuncionario } from "../../utilitario/baseComunicacao";
import { api } from "../../utilitario/baseComunicacao";
import HTTP_STATUS from "../../utilitario/httpStatus";
import PesquisaLogradouros from "../pesquisas/pesquisaLogradouro";
import PesquisaFuncionario from "../pesquisas/pesquisaFuncionario";
import InputConverter from "../componentes/inputConverter";

import Menu from "../menu"
import Footer from "../footer"
import SelectNacionalidade from '../componentes/selectMenuNacionalidade';
import TabelaTelefones from '../componentes/tabelaTelefones';

const cadastroFuncionario = () => {

    const [funcId, setFuncId] = useState("");
    const [funcDataAdmissao, setFuncDataAdmissao] = useState("");
    const [funcDataDesligamento, setFuncDataDesligamento] = useState("");
    const [funcPis, setFuncPis] = useState("");
    const [funcCnh, setFuncCnh] = useState("");

    const [pesId, setPesId] = useState("");
    const [pesNome, setPesNome] = useState("");
    const [pesCpf, setPesCpf] = useState("");
    const [pesSexo, setPesSexo] = useState("S");
    const [pesDataNasc, setPesDataNasc] = useState("");
    const [pesEndNum, setPesEndNum] = useState("");
    const [pesEndCompl, setPesEndCompl] = useState("");
    const [pesEmail1, setPesEmail1] = useState("");
    const [pesEmail2, setPesEmail2] = useState("");
    const [pesLogId, setPesLogId] = useState({"logDescricao": ""});
    const [pesNacionalidade, setPesNacionalidade] = useState("BRA");

    const [abrirPesquisa, setAbrirPesquisa] = useState(false);
    const [abrirPesquisaLogradouro, setAbrirPesquisaLogradouro] = useState(false);
    const [list, setList] = useState([]);
    const [listLogradouro, setListLogradouro] = useState([]);

    const [listTelefones, setListTelefones] = useState([]);

    const atualizaDlgPesquisa = async () => {
        setList(await (await api.get("/pesquisaFuncionario")).data);
        setAbrirPesquisa(true);
    }

    const atualizaDlgPesquisaLogradouro = async () => {
        setListLogradouro(await (await api.get("/pesquisaLogradouros")).data);
        setAbrirPesquisaLogradouro(true);
    }

    const atualizaLogradouroSelecionado = (item) => {
        setPesLogId(item)
        setAbrirPesquisaLogradouro(false);
    }

    const removerFuncionario = async () => {
        try {
            const response = await (await api.delete("/removeFuncionario?funcId=" + funcId));
            if (response.status === HTTP_STATUS.OK) {
                registroExcluido();
                limparCamposFormulario();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const atualizaItemSelecionado = (item) => {
        setPesId(item.pessoa.pesId)
        setFuncId(item.funcId);
        setPesNome(item.pessoa.pesNome);
        setPesCpf(item.pessoa.pesCpf);
        setPesSexo(item.pessoa.pesSexo);
        setPesDataNasc(item.pessoa.pesDataNasc);
        setPesEndNum(item.pessoa.pesEndNum || '');
        setPesEndCompl(item.pessoa.pesEndCompl || '');
        setPesEmail1(item.pessoa.pesEmail1 || '');
        setPesEmail2(item.pessoa.pesEmail2 || '');
        setFuncDataAdmissao(item.funcDataAdmissao || '');
        setFuncDataDesligamento(item.funcDataDesligamento || '');
        setFuncPis(item.funcPis || '');
        setFuncCnh(item.funcCnh || '');
        setPesLogId(item.pessoa.logradouro || '');
        setListTelefones(item.pessoa.telefoneList || []);
        setPesNacionalidade(item.pessoa.pesNacionalidade.paiIso || '');
        setAbrirPesquisa(false);
    }

    const limparCamposFormulario = () => {
        setFuncId("");
        setPesNome("");
        setPesCpf("");
        setPesSexo("S");
        setPesDataNasc("");
        setPesEndNum("");
        setPesEndCompl("");
        setPesEmail1("");
        setPesEmail2("");
        setFuncDataAdmissao("");
        setFuncDataDesligamento("");
        setFuncPis("");
        setFuncCnh("");
        setPesLogId({"logDescricao": ""});
        setListTelefones([]);
        setPesNacionalidade("BRA");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(pesSexo === "S"){
            mensagemCustomizada("Selecione um sexo", "warning");
            document.getElementById("inputSexo").focus();
            return;
        }
        if(pesLogId.logDescricao === ""){
            mensagemCustomizada("Selecione um logradouro", "warning");
            document.getElementById("btnLogradouro").focus();
            return;
        }

        const montaJsonFuncionario = async () => {  
            const jsonPessoa = await montaJsonPessoaCompleta(pesId,pesNome,pesCpf,"",pesSexo,pesDataNasc,pesEndNum,pesEndCompl,pesNacionalidade, "", pesEmail1, pesEmail2, pesLogId, listTelefones);
            const jsonFuncionario = {
                "funcId": funcId,
                "funcDataAdmissao": funcDataAdmissao,
                "funcDataDesligamento": funcDataDesligamento,
                "funcPis": funcPis,
                "funcCnh": funcCnh,
                "pessoa": jsonPessoa
            }
            console.log(jsonFuncionario)
            return jsonFuncionario;
        }


        const cadastraFuncionario = async () => {
            return await cadastrarFuncionario(await montaJsonFuncionario());
        }

        try {
            const responseFuncionario = await cadastraFuncionario();
            if (responseFuncionario.status === HTTP_STATUS.OK) {
                registroSalvo();
                limparCamposFormulario();
            }
        } catch (error) {
            console.log(error)
            if (error.response.status === HTTP_STATUS.BAD_REQUEST) {
                pessoaDuplicada();
            }

            if (error.response.status === HTTP_STATUS.FORBIDDEN) {
                console.log(error);
            }
        }
    };

    return (
        <div>
            <Menu tituloPagina={"Cadastro de Funcionário"} />
            <ReactNotifications />
            <Container>
                <Form onSubmit={handleSubmit}>
                <br />
                    <Row>
                        <h3>Cadastro de Funcionário</h3>
                    </Row>

                    <Row>
                        <Col md="2">
                            <Form.Label htmlFor="inputId">Código</Form.Label>
                            <Form.Control value={funcId} type="text" id="inputId" disabled />
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                            <Form.Label htmlFor="inputNome">Nome</Form.Label>
                            <Form.Control value={pesNome} maxLength="60"
                                onChange={(e) => setPesNome(e.target.value)}
                                type="text" id="inputNome" required />
                        </Col>
                        
                    </Row>
                    <Row>
                        <Col md="6">
                            <Form.Label htmlFor="inputCpf">CPF *</Form.Label>
                            <Form.Control id="inputCpf" type="text" maxLength='14' as={IMaskInput} inputMode="numeric"
                                mask="000.000.000-00" placeholder='Digite aqui o seu CPF...' required value={pesCpf} onChange={(l) => setPesCpf(l.target.value)} />
                        </Col>
                        <Col md="6">
                            <Form.Label htmlFor="inputDate">Data de Nascimento *</Form.Label>
                            <Form.Control value={pesDataNasc} size={2}
                                onChange={(e) => setPesDataNasc(e.target.value)}
                                type="date" id="inputDate" required />
                        </Col>
                    </Row>
                    <Row>
                    <Col md="6">
                            <Form.Label htmlFor="inputSexo">Sexo *</Form.Label>
                            <Form.Select id='inputSexo' required
                                value={pesSexo}
                                onChange={(e) => setPesSexo(e.target.value)}>
                                <option value="S">Selecione</option>
                                <option value="F">Feminino</option>
                                <option value="M">Masculino</option>
                            </Form.Select>
                    </Col>
                    <Col md="6">
                        <SelectNacionalidade pesNacionalidade={pesNacionalidade} setPesNacionalidade={setPesNacionalidade} />
                    </Col>
                    </Row>
                    <Row>
                        <Col md="6">
                            <Form.Label htmlFor="inputDate">Data de Admissão *</Form.Label>
                            <Form.Control value={funcDataAdmissao}
                                onChange={(e) => setFuncDataAdmissao(e.target.value)}
                                type="date" id="inputDate" />
                        </Col>
                        <Col md="6">
                            <Form.Label htmlFor="inputDate">Data de Desligamento</Form.Label>
                            <Form.Control value={funcDataDesligamento}
                                onChange={(e) => setFuncDataDesligamento(e.target.value)}
                                type="date" id="inputDate" />
                        </Col>
                    </Row>
                    <Row>
                        <Col md="6">
                            <Form.Label htmlFor="inputPis">Número PIS</Form.Label>
                            <Form.Control value={funcPis} maxLength='15'
                                onChange={(e) => setFuncPis(e.target.value)}
                                type="text" id="inputPis" />
                        </Col>
                        <Col md="6">
                            <Form.Label htmlFor="inputCnh">Número CNH</Form.Label>
                            <Form.Control value={funcCnh} maxLength='11'
                                onChange={(e) => setFuncCnh(e.target.value)}
                                type="text" id="inputCnh" />
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                            <Form.Label htmlFor="inputEmailP">Email Principal</Form.Label>
                            <Form.Control value={pesEmail1} maxLength="100"
                                onChange={(e) => setPesEmail1(e.target.value)}
                                type="text" id="inputEmailP" required />
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                            <Form.Label htmlFor="inputEmailS">Email Secundário</Form.Label>
                            <Form.Control value={pesEmail2} maxLength="100"
                                onChange={(e) => setPesEmail2(e.target.value)}
                                type="text" id="inputEmailS" />
                        </Col>
                    </Row>
                    <Row>
                        <Col md="6">
                            <Form.Label htmlFor="inputLogradouro">Logradouro *</Form.Label>
                            <InputConverter descricao={pesLogId.logDescricao} atualizaDlgPesquisa={atualizaDlgPesquisaLogradouro} />
                        </Col>
                    </Row>
                    <Row>
                        <Col md="2">
                            <Form.Label htmlFor="inputEndNum">Número *</Form.Label>
                            <Form.Control value={pesEndNum} type="text" id="inputEndNum" onChange={(e) => setPesEndNum(e.target.value)} required />
                        </Col>
                        <Col md="10">
                            <Form.Label htmlFor="inputEndCompl">Complemento</Form.Label>
                            <Form.Control value={pesEndCompl} maxLength="100"
                                onChange={(e) => setPesEndCompl(e.target.value)}
                                type="text" id="inputEndCompl" />
                        </Col>
                    </Row>

                    <br />

                    <Row>
                        <Col md="12">
                            <TabelaTelefones listTelefones={listTelefones} setListTelefones={setListTelefones} />
                        </Col>
                    </Row>

                    <br />

                    <Toolbar abrirPesquisa={atualizaDlgPesquisa} jsonRemove={removerFuncionario} />
                </Form>
            </Container>

            {abrirPesquisa &&
                <PesquisaFuncionario setValores={setList} valores={list} atualizaItemSelecionado={atualizaItemSelecionado} setAbrirPesquisa={setAbrirPesquisa} />
            }

            {abrirPesquisaLogradouro &&
                <PesquisaLogradouros setValores={setListLogradouro} valores={listLogradouro} atualizaItemSelecionado={atualizaLogradouroSelecionado} setAbrirPesquisa={setAbrirPesquisaLogradouro} />
            }

            <Footer />
        </div>
    );
};
export default cadastroFuncionario;