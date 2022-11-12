import React, { useState } from 'react';
import { Form, Col, Row, Container, Image, Card, Table, Button } from 'react-bootstrap';
import { BsXLg } from "react-icons/bs";
import TableFooter from '../table/tableFooter';
import useTable from '../table/useTable';
import Toolbar from '../toolbar';
import { IMaskInput } from 'react-imask';
import { registroSalvo, pessoaDuplicada, semRegistros, registroExcluido, mensagemCustomizada} from "../../utilitario/mensagemUtil"
import { ReactNotifications } from 'react-notifications-component'
import { criarPessoa, atualizarPessoa } from "../../utilitario/patronatoUtil";
import { cadastrarPraticante, atualizarPraticante } from "../../utilitario/baseComunicacao";
import { api } from "../../utilitario/baseComunicacao";
import HTTP_STATUS from "../../utilitario/httpStatus";
import PesquisaPraticantes from "../pesquisas/pesquisaPraticantes";
import PesquisaLogradouros from "../pesquisas/pesquisaLogradouro";
import InputConverter from "../inputConverter";


import Menu from "../menu"
import Footer from "../footer"

const cadastroPraticante = () => {
    const showPreview = (e) => {
        try {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setPesFoto(reader.result);
                }
            }

            reader.readAsDataURL(e.target.files[0]);
        } catch (error) {
            console.log(error);
        }
    }

    const [pratId, setPratId] = useState("");
    const [pratAltura, setPratAltura] = useState("");
    const [pratPeso, setPratPeso] = useState("");


    const [pesNome, setPesNome] = useState("");
    const [pesCpf, setPesCpf] = useState("");
    const [pesSexo, setPesSexo] = useState("");
    const [pesDataNasc, setPesDataNasc] = useState("");
    const [pesEndNum, setPesEndNum] = useState("");
    const [pesEndCompl, setPesEndCompl] = useState("");
    const [pesNacionalidade, setPesNacionalidade] = useState("");
    const [pesFoto, setPesFoto] = useState("");
    const [pesEmail1, setPesEmail1] = useState("");
    const [pesEmail2, setPesEmail2] = useState("");
    const [pesLogId, setPesLogId] = useState("");
    const [pesLogDescricao, setPesLogDescricao] = useState("");

    const [abrirPesquisa, setAbrirPesquisa] = useState(false);
    const [abrirPesquisaLogradouro, setAbrirPesquisaLogradouro] = useState(false);
    var [list, setList] = useState('[]');
    var [listLogradouro, setListLogradouro] = useState([]);
    var [listDocumentos, setListDocumentos] = useState([]);

    const criarDocumento = (e) => {
        const jsonItem = {
            "docId": null,
            "docDocumento": "",
            "docDescricao": "",
            "docIdPraticante": ""
        }

        try {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    jsonItem.docDocumento = reader.result;
                    jsonItem.docDescricao = e.target.files[0].name;
                    setListDocumentos(doc => [...doc, jsonItem]);
                }
            }

            reader.readAsDataURL(e.target.files[0]);
        } catch (error) {
            console.log(error);
       }
    }

    const removeDocumentoSelecionado = async (e) =>{
        try {
            const response = await (await api.delete("/removerDocumento?docId=" + e.docId));
            if (response.status === HTTP_STATUS.OK) {
                setListDocumentos(current =>
                    current.filter(doc => {
                      return doc.docDocumento !== e.docDocumento;
                    }),
                );
                mensagemCustomizada("Documento Excluído com Sucesso", "success");
            }
        } catch (error) {
            console.log(error);
        }
        
    }

    const atualizaDlgPesquisa = async () => {
        setList(await (await api.get("/pesquisaPraticantes")).data);
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

    const removerPraticante = async () => {
        try {
            const response = await (await api.delete("/removePraticante?pratId=" + pratId));
            if (response.status === HTTP_STATUS.OK) {
                registroExcluido();
                limparCamposFormulario();
            }
        } catch (error) {
            console.log(error);
        }


    }

    const atualizaItemSelecionado = (item) => {
        setPratId(item.pratId);
        setPesNome(item.pessoa.pesNome);
        setPesCpf(item.pessoa.pesCpf);
        setPesSexo(item.pessoa.pesSexo);
        setPesDataNasc(item.pessoa.pesDataNasc);
        setPesEndNum(item.pessoa.pesEndNum);
        setPesEndCompl(item.pessoa.pesEndCompl);
        setPesNacionalidade(item.pessoa.pesNacionalidade.paiIso);
        setPesFoto(item.pessoa.pesFoto);
        setPesEmail1(item.pessoa.pesEmail1);
        setPesEmail2(item.pessoa.pesEmail2);
        setPesLogId(1);
        setPratAltura(item.pratAltura);
        setPratPeso(item.pratPeso);
        setPesLogId(item.pessoa.logradouro.logId);
        setPesLogDescricao(item.pessoa.logradouro.logDescricao);
        setAbrirPesquisa(false);
        setListDocumentos(item.documentosList);
    }

    const limparCamposFormulario = () => {
        setPratId("");
        setPesNome("");
        setPesCpf("");
        setPesSexo("");
        setPesDataNasc("");
        setPesEndNum("");
        setPesEndCompl("");
        setPesNacionalidade("");
        setPesFoto("");
        setPesEmail1("");
        setPesEmail2("");
        setPesLogId("");
        setPratAltura("");
        setPratPeso("");
        setPesLogId("");
        setPesLogDescricao("");
        setListDocumentos([]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const cadastraPessoa = async () => {
            return await criarPessoa(pesNome, pesCpf, pesSexo, pesDataNasc, pesEndNum, pesEndCompl, pesNacionalidade, pesFoto, pesEmail1, pesEmail2, pesLogId);
        }

        const atualizaPessoa = async () => {
            return await atualizarPessoa(pesNome, pesCpf, pesSexo, pesDataNasc, pesEndNum, pesEndCompl, pesNacionalidade, pesFoto, pesEmail1, pesEmail2, pesLogId);
        }

        const montaJsonPraticante = (idPessoa) => {
            const jsonPraticante = {
                "pratId": pratId,
                "pessoaId": idPessoa,
                "pratAltura": pratAltura,
                "pratPeso": pratPeso,
                "documentosList": listDocumentos
            }

            return jsonPraticante;
        }

        const cadastraPraticante = async (idPessoa) => {
            return await cadastrarPraticante(montaJsonPraticante(idPessoa));
        }

        const atualizaPraticante = async () => {
            return await atualizarPraticante(montaJsonPraticante(null));
        }

        const atualizarRegistros = async () => {
            try {
                const responseAttPessoa = await atualizaPessoa();
                const responseAttPraticante = await atualizaPraticante();

                if (responseAttPessoa.status === HTTP_STATUS.OK && responseAttPraticante.status === HTTP_STATUS.OK) {
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

        const criarPessoaEPraticante = async () => {
            try {
                const response = await cadastraPessoa();
                if (response.status === HTTP_STATUS.OK) {
                    const responsePraticante = await cadastraPraticante(response.data.pesId);
                    if (responsePraticante.status === HTTP_STATUS.OK) {
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

        if (pratId === "") {
            criarPessoaEPraticante();
        } else {
            atualizarRegistros();
        }
    };

    const TablePaginada = ({ data, rowsPerPage, removeDocumentoSelecionado }) => {
        const [pagina, setPage] = useState(1);
        const { slice, range } = useTable(data, pagina, rowsPerPage);
        return (
            <>
                <Table size="sm">
                    <thead>
                        <tr>
                            <th>Descrição</th>
                            <th className='center'>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            slice.map(item => <LinhaTabela key={item.docDescricao} item={item} removeDocumentoSelecionado={removeDocumentoSelecionado} />)
                        }
                    </tbody>
                </Table>
                <TableFooter range={range} slice={slice} setPage={setPage} page={pagina} />
            </>
        );
    };

    const LinhaTabela = ({ item, removeDocumentoSelecionado }) => {
        const { docDescricao } = item;

        const removerItem = e => removeDocumentoSelecionado(item);

        return <tr>
            <td width={'100px'}>{docDescricao}</td>

            <td width={'80px'} className='center'>
                <Button className='btn-danger' onClick={removerItem}><BsXLg /></Button>
            </td>
        </tr>
    }


    return (
        <div>
            <Menu />
            <ReactNotifications />
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <h3>Cadastro de Praticantes</h3>
                    </Row>

                    <Row>
                        <Col md="12">
                            <div className='fotoPraticante'>
                                <Image id="imgPrat" src={pesFoto}></Image>
                                <Form.Control type="file" id="inputFoto" accept="image/png, image/jpg, image/jpeg" onChange={showPreview} />
                                <Form.Label htmlFor="inputFoto" className='label-input-file'>Selecione a Foto do Praticante</Form.Label>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col md="2">
                            <Form.Label htmlFor="inputId">Código</Form.Label>
                            <Form.Control value={pratId} type="text" id="inputId" disabled />
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
                            <Form.Label htmlFor="inputNacionalidade">Nacionalidade</Form.Label>
                            <Form.Select id='inputNacionalidade' required
                                value={pesNacionalidade}
                                onChange={(e) => setPesNacionalidade(e.target.value)}>
                                <option>Selecione</option>
                                <option value="BRA">Brasileira</option>
                            </Form.Select>
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
                        <Col md="3">
                            <Form.Label htmlFor="inputPratAltura">Altura (cm)</Form.Label>
                            <div >
                                <Form.Control value={pratAltura}
                                    onChange={(e) => setPratAltura(e.target.value)}
                                    type="number" id="inputPratAltura" required />
                            </div>
                        </Col>

                        <Col md="3">
                            <Form.Label htmlFor="inputPratPeso">Peso (g)</Form.Label>
                            <Form.Control value={pratPeso}
                                onChange={(e) => setPratPeso(e.target.value)}
                                type="number" id="inputPratPeso" required />
                        </Col>
                    </Row>

                    <br />

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

                    <Row>
                        <Col md="6">
                            <Card>
                                <div className='marginLeft'>
                                    <b>Documentos</b>
                                    <Col md="2">
                                        <Form.Control type="file" id="inputDoc" accept="image/*, application/pdf" onChange={criarDocumento} />
                                        <Form.Label htmlFor="inputDoc" className='label-input-file-pqn'>Anexar Documento</Form.Label>
                                    </Col>
                                        <TablePaginada data={listDocumentos} rowsPerPage={5} removeDocumentoSelecionado={removeDocumentoSelecionado}/>
                                </div>
                            </Card>
                        </Col>
                    </Row>

                    <Toolbar abrirPesquisa={atualizaDlgPesquisa} jsonRemove={removerPraticante} />
                </Form>
            </Container>

            {abrirPesquisa &&
                <PesquisaPraticantes setValores={setList} valores={list} atualizaItemSelecionado={atualizaItemSelecionado} setAbrirPesquisa={setAbrirPesquisa} />
            }

            {abrirPesquisaLogradouro &&
                <PesquisaLogradouros setValores={setListLogradouro} valores={listLogradouro} atualizaItemSelecionado={atualizaLogradouroSelecionado} setAbrirPesquisa={setAbrirPesquisaLogradouro} />
            }
            <Footer />
        </div>
    );
};
export default cadastroPraticante;