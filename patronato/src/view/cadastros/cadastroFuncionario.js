import React, { useState, useEffect  } from 'react';
import { Form, Col, Row, Container, Card, Table, Button } from 'react-bootstrap';
import { BsFillTrashFill } from "react-icons/bs";
import TableFooter from '../table/tableFooter';
import useTable from '../table/useTable';
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
import InputConverter from "../inputConverter";


import Menu from "../menu"
import Footer from "../footer"

const cadastroFuncionario = () => {

    const [funcId, setFuncId] = useState("");
    const [funcDataAdmissao, setFuncDataAdmissao] = useState("");
    const [funcDataDesligamento, setFuncDataDesligamento] = useState("");
    const [funcPis, setFuncPis] = useState("");
    const [funcCnh, setFuncCnh] = useState("");

    const [pesId, setPesId] = useState("");
    const [pesNome, setPesNome] = useState("");
    const [pesCpf, setPesCpf] = useState("");
    const [pesSexo, setPesSexo] = useState("");
    const [pesDataNasc, setPesDataNasc] = useState("");
    const [pesEndNum, setPesEndNum] = useState("");
    const [pesEndCompl, setPesEndCompl] = useState("");
    const [pesEmail1, setPesEmail1] = useState("");
    const [pesEmail2, setPesEmail2] = useState("");
    const [pesLogId, setPesLogId] = useState("");
    const [pesLogDescricao, setPesLogDescricao] = useState("");
    const [pesNacionalidade, setPesNacionalidade] = useState({});

    const [abrirPesquisa, setAbrirPesquisa] = useState(false);
    const [abrirPesquisaLogradouro, setAbrirPesquisaLogradouro] = useState(false);
    const [list, setList] = useState([]);
    const [listLogradouro, setListLogradouro] = useState([]);
    const [listPaises, setListPaises] = useState([]);

    const [listTelefones, setListTelefones] = useState([]);

    useEffect(()=>{
        api.get("/buscaListaPaises").then(response => {
            setListPaises(response.data)
          })
      }, [])

    const criarTelefone = (e) => {
        const jsonItem = {
            "telId": null,
            "telNumero": "",
            "telIdPessoa": ""
        }

        setListTelefones(tel => [...tel, jsonItem]);
    }

    const atualizaTelefone = (item, telefone) => {
        item.telNumero = telefone;
    }

    const removeTelefoneSelecionado = async (e) => {
        try {
            if (e.telId == null) {
                setListTelefones(current =>
                    current.filter(tel => {
                        return tel.telId !== e.telId;
                    }),
                );
            } else {
                const response = await (await api.delete("/removerTelefone?telId=" + e.telId));
                if (response.status === HTTP_STATUS.OK) {
                    setListTelefones(current =>
                        current.filter(tel => {
                            return tel.telId !== e.telId;
                        }),
                    );
                    mensagemCustomizada("Telefone Excluído com Sucesso", "success");
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const atualizaDlgPesquisa = async () => {
        setList(await (await api.get("/pesquisaFuncionario")).data);
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
        setPesEndNum(item.pessoa.pesEndNum);
        setPesEndCompl(item.pessoa.pesEndCompl);
        setPesEmail1(item.pessoa.pesEmail1);
        setPesEmail2(item.pessoa.pesEmail2);
        setFuncDataAdmissao(item.funcDataAdmissao);
        setFuncDataDesligamento(item.funcDataDesligamento);
        setFuncPis(item.funcPis);
        setFuncCnh(item.funcCnh);
        setPesLogId(item.pessoa.logradouro.logId);
        setPesLogDescricao(item.pessoa.logradouro.logDescricao);
        setListTelefones(item.pessoa.telefoneList);
        setPesNacionalidade(item.pessoa.pesNacionalidade.paiIso);
        setAbrirPesquisa(false);
    }

    const limparCamposFormulario = () => {
        setFuncId("");
        setPesNome("");
        setPesCpf("");
        setPesSexo("");
        setPesDataNasc("");
        setPesEndNum("");
        setPesEndCompl("");
        setPesEmail1("");
        setPesEmail2("");
        setFuncDataAdmissao("");
        setFuncDataDesligamento("");
        setFuncPis("");
        setFuncCnh("");
        setPesLogId("");
        setPesLogDescricao("");
        setListTelefones([])
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

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
            if (error.response.status === HTTP_STATUS.BAD_REQUEST) {
                pessoaDuplicada();
            }

            if (error.response.status === HTTP_STATUS.FORBIDDEN) {
                console.log(error);
            }
        }
    };

    const TabelaTelefones = ({ data, rowsPerPage, removeResp }) => {
        const [pagina, setPage] = useState(1);
        const { slice, range } = useTable(data, pagina, rowsPerPage);
        return (
            <>
                <Table size="sm">
                    <thead>
                        <tr>
                            <th>Número</th>
                            <th className='center'>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            slice.map(item => <LinhaTabelaTelefones key={item.telId} item={item} removeTelefoneSelecionado={removeTelefoneSelecionado} />)
                        }
                    </tbody>
                </Table>
                <TableFooter range={range} slice={slice} setPage={setPage} page={pagina} />
            </>
        );
    };

    const LinhaTabelaTelefones = ({ item, removeTelefoneSelecionado }) => {
        const [telNumero, setTelNumero] = useState(item.telNumero);

        const removerItem = e => removeTelefoneSelecionado(item);

        return <tr>
            <td width={'100px'}>
                <Form.Control value={telNumero}
                    onChange={(e) => setTelNumero(e.target.value)}
                    as={IMaskInput} inputMode="numeric" id="inputTel" mask="(00) 0 0000-0000" maxLength="16" required onComplete={atualizaTelefone(item, telNumero)}/>
            </td>
            <td width={'80px'} className='center'>
                <Button className='btn-danger' onClick={removerItem}><BsFillTrashFill /></Button>
            </td>
        </tr>
    }


    return (
        <div>
            <Menu />
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
                        <Col md="8">
                            <Form.Label htmlFor="inputNome">Nome</Form.Label>
                            <Form.Control value={pesNome}
                                onChange={(e) => setPesNome(e.target.value)}
                                type="text" id="inputNome" required />
                        </Col>
                        <Col md="4">
                            <Form.Label htmlFor="inputCpf">CPF</Form.Label>
                            <Form.Control id="inputCpf" type="text" maxLength='14' as={IMaskInput} inputMode="numeric"
                                mask="000.000.000-00" placeholder='Digite aqui o seu CPF...' required value={pesCpf} onChange={(l) => setPesCpf(l.target.value)} />
                        </Col>
                    </Row>
                    <Row>
                        <Col md="6">
                            <Form.Label htmlFor="inputDate">Data de Nascimento</Form.Label>
                            <Form.Control value={pesDataNasc}
                                onChange={(e) => setPesDataNasc(e.target.value)}
                                type="date" id="inputDate" required />
                        </Col>
                        <Col md="6">
                            <Form.Label htmlFor="inputSexo">Sexo</Form.Label>
                            <Form.Select id='inputSexo' required
                                value={pesSexo}
                                onChange={(e) => setPesSexo(e.target.value)}>
                                <option>Selecione</option>
                                <option value="F">Feminino</option>
                                <option value="M">Masculino</option>
                            </Form.Select>
                        </Col>
                    </Row>
                    <Row>
                    <Col md="6">
                            <Form.Label htmlFor="inputNacionalidade">Nacionalidade *</Form.Label>
                            <Form.Select id='inputNacionalidade' required
                                value={pesNacionalidade}
                                onChange={(e) => setPesNacionalidade(e.target.value)}>
                                {
                                    listPaises.map(pais => <option key={pais.paiIso} value={pais.paiIso}>{pais.paiNome}</option>)
                                }
                            </Form.Select>
                    </Col>
                    </Row>
                    <Row>
                        <Col md="6">
                            <Form.Label htmlFor="inputDate">Data de Admissão</Form.Label>
                            <Form.Control value={funcDataAdmissao}
                                onChange={(e) => setFuncDataAdmissao(e.target.value)}
                                type="date" id="inputDate" required />
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
                            <Form.Control value={funcPis}
                                onChange={(e) => setFuncPis(e.target.value)}
                                type="text" id="inputPis" required />
                        </Col>
                        <Col md="6">
                            <Form.Label htmlFor="inputCnh">Número CNH</Form.Label>
                            <Form.Control value={funcCnh}
                                onChange={(e) => setFuncCnh(e.target.value)}
                                type="text" id="inputCnh" />
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                            <Form.Label htmlFor="inputEmailP">Email Principal</Form.Label>
                            <Form.Control value={pesEmail1}
                                onChange={(e) => setPesEmail1(e.target.value)}
                                type="text" id="inputEmailP" required />
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12">
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
                        <Col md="10">
                            <Form.Label htmlFor="inputEndCompl">Complemento</Form.Label>
                            <Form.Control value={pesEndCompl}
                                onChange={(e) => setPesEndCompl(e.target.value)}
                                type="text" id="inputEndCompl" />
                        </Col>
                    </Row>

                    <br />

                    <Row>
                        <Col md="12">
                            <Card>
                                <div className='marginLeft'>
                                    <Row>
                                        <Col md="12">
                                            <b>Telefones</b>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="12">
                                            <Button variant="primary" className='btn-success btnMarginTop' onClick={criarTelefone}>Adicionar</Button>
                                        </Col>
                                    </Row>
                                    <TabelaTelefones data={listTelefones} rowsPerPage={5} selecionaLinha={false} removeResp={removeTelefoneSelecionado} />
                                </div>
                            </Card>
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