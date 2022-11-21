import React, { useState } from 'react';
import { Form, Col, Row, Container, Image, Card, Table, Button } from 'react-bootstrap';
import { BsFillTrashFill, BsDownload } from "react-icons/bs";
import TableFooter from '../table/tableFooter';
import useTable from '../table/useTable';
import Toolbar from '../toolbar';
import { IMaskInput } from 'react-imask';
import { registroSalvo, pessoaDuplicada, semRegistros, registroExcluido, mensagemCustomizada } from "../../utilitario/mensagemUtil"
import { ReactNotifications } from 'react-notifications-component'
import { criarPessoa, atualizarPessoa } from "../../utilitario/patronatoUtil";
import { cadastrarPraticante, atualizarPraticante } from "../../utilitario/baseComunicacao";
import { api } from "../../utilitario/baseComunicacao";
import HTTP_STATUS from "../../utilitario/httpStatus";
import PesquisaPraticantes from "../pesquisas/pesquisaPraticantes";
import PesquisaLogradouros from "../pesquisas/pesquisaLogradouro";
import PesquisaResponsaveis from "../pesquisas/pesquisaResponsavel";
import InputConverter from "../inputConverter";
import { saveAs } from 'file-saver';


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
    const [list, setList] = useState([]);
    const [listLogradouro, setListLogradouro] = useState([]);
    const [listDocumentos, setListDocumentos] = useState([]);

    const [listResponsveis, setListResponsveis] = useState([]);
    const [listResponsveisSelecionados, setListResponsveisSelecionados] = useState([]);
    const [abrirPesquisaResponsaveis, setAbrirPesquisaResponsaveis] = useState(false);

    const [listTelefones, setListTelefones] = useState([]);

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

    const criarTelefone = (e) => {
        const jsonItem = {
            "telId": null,
            "telNumero": "",
            "telIdPessoa": ""
        }

        setListTelefones(tel => [...tel, jsonItem]);
    }

    const atualizaDlgPesquisaResponsaveis = async () => {
        setListResponsveis(await (await api.get("/pesquisaResponsavel?pesCpf=" + null + "&pesNome=" + null)).data);
        setAbrirPesquisaResponsaveis(true);
    }

    const atualizaResponsavelSelecionado = (item) => {
        const jsonItem = {
            "pxrId": null,
            "praticante": "",
            "responsavel": item,
            "pxrTipoResp": ""
        }

        setListResponsveisSelecionados(current => [...current, jsonItem])
        setAbrirPesquisaResponsaveis(false);
    }

    const atualizaGrauParentesco = (item, grauPar) => {
        item.pxrTipoResp = grauPar;
    }

    const atualizaTelefone = (item, telefone) => {
        item.telNumero = telefone;
    }

    const convertBase64ToFile = (base64String, fileName) => {
        let arr = base64String.split(',');
        let mime = arr[0].match(/:(.*?);/)[1];
        let bstr = atob(arr[1]);
        let n = bstr.length;
        let uint8Array = new Uint8Array(n);
        while (n--) {
            uint8Array[n] = bstr.charCodeAt(n);
        }
        let file = new File([uint8Array], fileName, { type: mime });
        return file;
    }

    const baixarArquivo = (e) => {
        let file = convertBase64ToFile(e.docDocumento, e.docDescricao);
        saveAs(file, e.docDescricao);
    }

    const removeDocumentoSelecionado = async (e) => {
        try {
            if (e.docId == null) {
                setListDocumentos(current =>
                    current.filter(doc => {
                        return doc.docDocumento !== e.docDocumento;
                    }),
                );
            } else {
                const response = await (await api.delete("/removerDocumento?docId=" + e.docId));
                if (response.status === HTTP_STATUS.OK) {
                    setListDocumentos(current =>
                        current.filter(doc => {
                            return doc.docDocumento !== e.docDocumento;
                        }),
                    );
                    mensagemCustomizada("Documento Excluído com Sucesso", "success");
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const removeResponsavelSelecionado = async (e) => {
        try {
            if (e.pxrId == null) {
                setListResponsveisSelecionados(current =>
                    current.filter(resp => {
                        return resp.pxrId !== e.pxrId;
                    }),
                );
            } else {
                console.log(e);
                const response = await (await api.delete("/removerResponsavelSelecionado?pxrId=" + e.pxrId));
                if (response.status === HTTP_STATUS.OK) {
                    setListResponsveisSelecionados(current =>
                        current.filter(resp => {
                            return resp.pxrId !== e.pxrId;
                        }),
                    );
                    mensagemCustomizada("Responsável Excluído com Sucesso", "success");
                }
            }
        } catch (error) {
            console.log(error);
        }
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
        setListResponsveisSelecionados(item.responsaveis);
        setListTelefones(item.pessoa.telefoneList);
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
        setListResponsveisSelecionados([]);
        setListTelefones([])
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
                "documentosList": listDocumentos,
                "responsaveis": listResponsveisSelecionados,
                "telefones": listTelefones
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

    const TabelaDocumentos = ({ data, rowsPerPage, removeDocumentoSelecionado }) => {
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
                            slice.map(item => <LinhaTabelaDocumentos key={item.docDescricao} item={item} removeDocumentoSelecionado={removeDocumentoSelecionado} />)
                        }
                    </tbody>
                </Table>
                <TableFooter range={range} slice={slice} setPage={setPage} page={pagina} />
            </>
        );
    };

    const LinhaTabelaDocumentos = ({ item, removeDocumentoSelecionado }) => {
        const { docDescricao } = item;

        const removerItem = e => removeDocumentoSelecionado(item);
        const baixarItem = e => baixarArquivo(item);

        return <tr>
            <td width={'100px'}>{docDescricao}</td>

            <td width={'80px'} className='center'>
                <Button className='btn-succes' onClick={baixarItem}><BsDownload /></Button>
                <Button className='btn-danger' onClick={removerItem}><BsFillTrashFill /></Button>
            </td>
        </tr>
    }

    const TabelaResponsaveis = ({ data, rowsPerPage, removeResp }) => {
        const [pagina, setPage] = useState(1);
        const { slice, range } = useTable(data, pagina, rowsPerPage);
        return (
            <>
                <Table size="sm">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Parentesco</th>
                            <th className='center'>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            slice.map(item => <LinhaTabelaResponsaveis key={item.respNome} item={item} removeResp={removeResp} />)
                        }
                    </tbody>
                </Table>
                <TableFooter range={range} slice={slice} setPage={setPage} page={pagina} />
            </>
        );
    };

    const LinhaTabelaResponsaveis = ({ item, removeResp }) => {
        console.log(item);

        const { pesNome } = item.responsavel.pessoa;
        const [pxrTipoResp, setPxrTipoResp] = useState(item.pxrTipoResp);

        const removerItem = e => removeResp(item);

        return <tr>
            <td width={'100px'}>{pesNome}</td>
            <td width={'100px'}>
                <Form.Select required
                    value={pxrTipoResp}
                    onChange={(e) => setPxrTipoResp(e.target.value)} onComplete={atualizaGrauParentesco(item, pxrTipoResp)}>
                    <option>Selecione</option>
                    <option value="M">Mãe</option>
                    <option value="P">Pai</option>
                    <option value="A">Avó</option>
                    <option value="O">Avô</option>
                    <option value="I">Irmão</option>
                </Form.Select>
            </td>

            <td width={'80px'} className='center'>
                <Button className='btn-danger' onClick={removerItem}><BsFillTrashFill /></Button>
            </td>
        </tr>
    }

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

        console.log(item);

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
                        <Col md="12">
                            <Form.Label htmlFor="inputNome">Nome</Form.Label>
                            <Form.Control value={pesNome}
                                onChange={(e) => setPesNome(e.target.value)}
                                type="text" id="inputNome" required />
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
                            <Form.Label htmlFor="inputCpf">CPF</Form.Label>
                            <Form.Control id="inputCpf" type="text" maxLength='14' as={IMaskInput} inputMode="numeric"
                                mask="000.000.000-00" placeholder='Digite aqui o seu CPF...' required value={pesCpf} onChange={(l) => setPesCpf(l.target.value)} />
                        </Col>
                    </Row>

                    <Row>
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
                        <Col md="6">
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
                            <Form.Label htmlFor="inputPratAltura">Altura (cm)</Form.Label>
                            <div >
                                <Form.Control value={pratAltura}
                                    onChange={(e) => setPratAltura(e.target.value)}
                                    type="number" id="inputPratAltura" required />
                            </div>
                        </Col>

                        <Col md="6">
                            <Form.Label htmlFor="inputPratPeso">Peso (g)</Form.Label>
                            <Form.Control value={pratPeso}
                                onChange={(e) => setPratPeso(e.target.value)}
                                type="number" id="inputPratPeso" required />
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

                    <Row>
                        <Col md="12">
                            <Card>
                                <div className='marginLeft'>
                                    <Row>
                                        <Col md="12">
                                            <b>Responsáveis</b>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="12">
                                            <Button variant="primary" className='btn-success btnMarginTop' onClick={atualizaDlgPesquisaResponsaveis}>Adicionar</Button>
                                        </Col>
                                    </Row>
                                    <TabelaResponsaveis data={listResponsveisSelecionados} rowsPerPage={5} selecionaLinha={false} removeResp={removeResponsavelSelecionado} />
                                </div>
                            </Card>
                        </Col>
                    </Row>

                    <br />

                    <Row>
                        <Col md="12">
                            <Card>
                                <div className='marginLeft'>
                                    <Row>
                                        <Col md="12">
                                            <b>Documentos</b>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md="12">
                                            <Form.Control type="file" id="inputDoc" accept="image/*, application/pdf" onChange={criarDocumento} />
                                            <Form.Label htmlFor="inputDoc" className='label-input-file-pqn'>Anexar Documento</Form.Label>
                                        </Col>
                                    </Row>
                                    <TabelaDocumentos data={listDocumentos} rowsPerPage={5} removeDocumentoSelecionado={removeDocumentoSelecionado} />
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

            {abrirPesquisaResponsaveis &&
                <PesquisaResponsaveis setValores={setListResponsveis} valores={listResponsveis} atualizaItemSelecionado={atualizaResponsavelSelecionado} setAbrirPesquisa={setAbrirPesquisaResponsaveis} />
            }
            <Footer />
        </div>
    );
};
export default cadastroPraticante;