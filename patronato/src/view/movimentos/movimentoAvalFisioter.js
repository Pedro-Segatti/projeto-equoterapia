import React, { useState } from 'react';
import { Form, Col, Row, Container, Card, Table, Button } from 'react-bootstrap';
import { BsFillTrashFill, BsDownload } from "react-icons/bs";
import useTable from '../table/useTable';
import TableFooter from '../table/tableFooter';
import Toolbar from '../toolbar';
import PesquisaAvalFisioter from "../pesquisas/pesquisaAvalFisioter";
import PesquisaPraticantes from "../pesquisas/pesquisaPraticantes";
import PesquisaFuncionario from "../pesquisas/pesquisaFuncionario";
import PesquisaMedico from "../pesquisas/pesquisaMedico";
import { BsInfoCircleFill } from "react-icons/bs";
import { registroSalvo, mensagemCustomizada } from "../../utilitario/mensagemUtil";
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { api } from "../../utilitario/baseComunicacao";
import Menu from "../menu";
import Footer from "../footer";
import InputConverter from '../componentes/inputConverter';
import { saveAs } from 'file-saver';
import { dataApiFormatada, dataFormatadaAnoMesDia } from '../../utilitario/dateUtil';
import Carregando from "../carregando";

function movimentoAvalFisioter() {
    const [abrirPesquisa, setAbrirPesquisa] = useState(false);
    const [abrirPesquisaPraticante, setAbrirPesquisaPraticante] = useState(false);
    const [abrirPesquisaFuncionario, setAbrirPesquisaFuncionario] = useState(false);
    const [abrirPesquisaMedico, setAbrirPesquisaMedico] = useState(false);
    const [loading, setLoading] = useState(false);

    //Variáveis de cadastro
    const [aftId, setAftId] = useState("");
    const [aftSinVit, setAftSinVit] = useState("");
    const [aftQueixa, setAftQueixa] = useState("");
    const [aftDiagClin, setAftDiagClin] = useState("");
    const [aftMedicamentos, setAftMedicamentos] = useState("");
    const [aftDiagFisioFunc, setAftDiagFisioFunc] = useState("");
    const [aftAnamnese, setAftAnamnese] = useState("");
    const [aftRotTerapia, setAftRotTerapia] = useState("");
    const [aftExameFis, setAftExameFis] = useState("");
    const [aftDesMotoNeuroCcerv, setAftDesMotoNeuroCcerv] = useState("");
    const [aftDesMotoNeuroCtronc, setAftDesMotoNeuroCtronc] = useState("");
    const [aftDesMotoNeuroRolou, setAftDesMotoNeuroRolou] = useState("");
    const [aftDesMotoNeuroEngat, setAftDesMotoNeuroEngat] = useState("");
    const [aftDesMotoNeuroAnd, setAftDesMotoNeuroAnd] = useState("");
    const [aftDesMotoNeuroObs, setAftDesMotoNeuroObs] = useState("");
    const [aftRefPrimTend, setAftRefPrimTend] = useState("");
    const [aftSenseTatil, setAftSenseTatil] = useState(false);
    const [aftSenseDolo, setAftSenseDolo] = useState(false);
    const [aftSenseTerm, setAftSenseTerm] = useState(false);
    const [aftSenseObs, setAftSenseObs] = useState("");
    const [aftEquiEstDin, setAftEquiEstDin] = useState("");
    const [aftAmotoHipe, setAftAmotoHipe] = useState(false);
    const [aftAmotoHipo, setAftAmotoHipo] = useState(false);
    const [aftAmotoCor, setAftAmotoCor] = useState(false);
    const [aftAmotoAte, setAftAmotoAte] = useState(false);
    const [aftAmotoContEsp, setAftAmotoContEsp] = useState(false);
    const [aftAmotoDefAtx, setAftAmotoDefAtx] = useState(false);
    const [aftAmotoClonus, setAftAmotoClonus] = useState(false);
    const [aftAmotoObs, setAftAmotoObs] = useState("");
    const [aftMarLocAtu, setAftMarLocAtu] = useState("");
    const [aftAvalPostSolCav, setAftAvalPostSolCav] = useState("");
    const [aftMtrAlcObj, setAftMtrAlcObj] = useState("");
    const [aftMtrAlimen, setAftMtrAlimen] = useState("");
    const [aftMtrPreenObj, setAftMtrPreenObj] = useState("");
    const [aftMtrHigieni, setAftMtrHigieni] = useState("");
    const [aftMtrUsoBimanual, setAftMtrUsoBimanual] = useState("");
    const [aftMtrNegMembro, setAftMtrNegMembro] = useState("");
    const [aftMtrVesteSoz, setAftMtrVesteSoz] = useState("");
    const [aftMtrContEsfinct, setAftMtrContEsfinct] = useState("");
    const [aftMtrComent, setAftMtrComent] = useState("");
    const [aftFmuscMmss, setAftFmuscMmss] = useState("");
    const [aftFmuscMmii, setAftFmuscMmii] = useState("");
    const [aftFmuscTronco, setAftFmuscTronco] = useState("");
    const [aftFmuscObs, setAftFmuscObs] = useState("");
    const [aftCmotoEstObs, setAftCmotoEstObs] = useState("");
    const [aftCmotoDinObs, setAftCmotoDinObs] = useState("");
    const [aftPreenPalmar, setAftPreenPalmar] = useState(false);
    const [aftPreenPinca, setAftPreenPinca] = useState(false);
    const [aftPreenObs, setAftPreenObs] = useState("");
    const [aftMovPassiva, setAftMovPassiva] = useState("");
    const [aftMovRespira, setAftMovRespira] = useState("");
    const [aftMovDegluti, setAftMovDegluti] = useState("");
    const [aftMovMastig, setAftMovMastig] = useState("");
    const [aftMovContEsfinct, setAftMovContEsfinct] = useState("");
    const [aftQuadCognitivo, setAftQuadCognitivo] = useState("");
    const [aftSistResp, setAftSistResp] = useState("");
    const [aftSistCirc, setAftSistCirc] = useState("");
    const [aftParecerFisio, setAftParecerFisio] = useState("");
    const [aftData, setAftData] = useState("");
    const [anexosList, setAnexosList] = useState([]);

    const [aftIdFuncionario, setAftIdFuncionario] = useState({ "pessoa": { "pesNome": "" } });
    const [aftIdPraticante, setAftIdPraticante] = useState({ "pessoa": { "pesNome": "" } });
    const [aftIdMedico, setAftIdMedico] = useState({ "pessoa": { "pesNome": "" } });

    //variáveis da dialog de pesquisa
    var [list, setList] = useState([]);
    var [listPraticantes, setListPraticantes] = useState([]);
    var [listFuncionarios, setListFuncionarios] = useState([]);
    var [listMedicos, setListMedicos] = useState([]);

    const atualizaDlgPesquisa = async () => {
        setList(await (await api.get("/pesquisaAvalFisioter")).data);
        setAbrirPesquisa(true);
    }

    const atualizaItemSelecionado = (item) => {
        setAftId(item.aftId);
        setAftQueixa(item.aftQueixa);
        setAftDiagClin(item.aftDiagClin);
        setAftAnamnese(item.aftAnamnese);
        setAftRotTerapia(item.aftRotTerapia);
        setAftExameFis(item.aftExameFis);
        setAftRefPrimTend(item.aftRefPrimTend);
        setAftSenseTatil(item.aftSenseTatil);
        setAftSenseDolo(item.aftSenseDolo);
        setAftSenseTerm(item.aftSenseTerm);
        setAftSenseObs(item.aftSenseObs);
        setAftAmotoHipe(item.aftAmotoHipe);
        setAftAmotoHipo(item.aftAmotoHipo);
        setAftAmotoContEsp(item.aftAmotoContEsp);
        setAftAmotoDefAtx(item.aftAmotoDefAtx);
        setAftAmotoClonus(item.aftAmotoClonus);
        setAftAmotoObs(item.aftAmotoObs);
        setAftMarLocAtu(item.aftMarLocAtu);
        setAftMtrAlcObj(item.aftMtrAlcObj);
        setAftMtrAlimen(item.aftMtrAlimen);
        setAftMtrPreenObj(item.aftMtrPreenObj);
        setAftMtrHigieni(item.aftMtrHigieni);
        setAftMtrUsoBimanual(item.aftMtrUsoBimanual)
        setAftMtrNegMembro(item.aftMtrNegMembro);
        setAftMtrVesteSoz(item.aftMtrVesteSoz);
        setAftMtrContEsfinct(item.aftMtrContEsfinct);
        setAftMtrComent(item.aftMtrComent);
        setAftFmuscMmss(item.aftFmuscMmss);
        setAftFmuscMmii(item.aftFmuscMmii);
        setAftFmuscTronco(item.aftFmuscTronco);
        setAftFmuscObs(item.aftFmuscObs);
        setAftCmotoEstObs(item.aftCmotoEstObs);
        setAftCmotoDinObs(item.aftCmotoDinObs);
        setAftPreenPalmar(item.aftPreenPalmar);
        setAftPreenPinca(item.aftPreenPinca);
        setAftPreenObs(item.aftPreenObs);
        setAftMovPassiva(item.aftMovPassiva);
        setAftMovRespira(item.aftMovDegluti);
        setAftMovDegluti(item.aftMovDegluti);
        setAftMovMastig(item.aftMovMastig);
        setAftMovContEsfinct(item.aftMovContEsfinct)
        setAftQuadCognitivo(item.aftQuadCognitivo);
        setAftSistResp(item.aftSistResp);
        setAftSistCirc(item.aftSistCirc);
        setAftParecerFisio(item.aftParecerFisio);
        setAftData(dataFormatadaAnoMesDia(item.aftData));
        setAftIdFuncionario(item.aftIdFuncionario);
        setAftIdPraticante(item.aftIdPraticante);
        setAftIdMedico(item.aftIdMedico);
        setAftAvalPostSolCav(item.aftAvalPostSolCav);
        setAftAmotoAte(item.aftAmotoAte);
        setAftAmotoCor(item.aftAmotoCor);
        setAftEquiEstDin(item.aftEquiEstDin);
        setAftDesMotoNeuroObs(item.aftDesMotoNeuroObs);
        setAftDesMotoNeuroAnd(item.aftDesMotoNeuroAnd);
        setAftDesMotoNeuroEngat(item.aftDesMotoNeuroEngat);
        setAftDesMotoNeuroRolou(item.aftDesMotoNeuroRolou);
        setAftDesMotoNeuroCtronc(item.aftDesMotoNeuroCtronc);
        setAftDesMotoNeuroCcerv(item.aftDesMotoNeuroCcerv);
        setAftDiagFisioFunc(item.aftDiagFisioFunc);
        setAftMedicamentos(item.aftMedicamentos);
        setAftSinVit(item.aftSinVit);
        setAnexosList(item.anexosList);
        setAbrirPesquisa(false);
    }

    const enviaJsonGravar = async () => {
        const json = {
            "aftId": aftId,
            "aftQueixa": aftQueixa,
            "aftDiagClin": aftDiagClin,
            "aftAnamnese": aftAnamnese,
            "aftRotTerapia": aftRotTerapia,
            "aftExameFis": aftExameFis,
            "aftRefPrimTend": aftRefPrimTend,
            "aftSenseTatil": aftSenseTatil,
            "aftSenseDolo": aftSenseDolo,
            "aftSenseTerm": aftSenseTerm,
            "aftSenseObs": aftSenseObs,
            "aftAmotoHipe": aftAmotoHipe,
            "aftAmotoHipo": aftAmotoHipo,
            "aftAmotoContEsp": aftAmotoContEsp,
            "aftAmotoDefAtx": aftAmotoDefAtx,
            "aftAmotoClonus": aftAmotoClonus,
            "aftAmotoObs": aftAmotoObs,
            "aftMarLocAtu": aftMarLocAtu,
            "aftMtrAlcObj": aftMtrAlcObj,
            "aftMtrAlimen": aftMtrAlimen,
            "aftMtrPreenObj": aftMtrPreenObj,
            "aftMtrHigieni": aftMtrHigieni,
            "aftMtrUsoBimanual": aftMtrUsoBimanual,
            "aftMtrNegMembro": aftMtrNegMembro,
            "aftMtrVesteSoz": aftMtrVesteSoz,
            "aftMtrContEsfinct": aftMtrContEsfinct,
            "aftMtrComent": aftMtrComent,
            "aftFmuscMmss": aftFmuscMmss,
            "aftFmuscMmii": aftFmuscMmii,
            "aftFmuscTronco": aftFmuscTronco,
            "aftFmuscObs": aftFmuscObs,
            "aftCmotoEstObs": aftCmotoEstObs,
            "aftCmotoDinObs": aftCmotoDinObs,
            "aftPreenPalmar": aftPreenPalmar,
            "aftPreenPinca": aftPreenPinca,
            "aftPreenObs": aftPreenObs,
            "aftMovPassiva": aftMovPassiva,
            "aftMovRespira": aftMovRespira,
            "aftMovDegluti": aftMovDegluti,
            "aftMovMastig": aftMovMastig,
            "aftMovContEsfinct": aftMovContEsfinct,
            "aftQuadCognitivo": aftQuadCognitivo,
            "aftSistResp": aftSistResp,
            "aftSistCirc": aftSistCirc,
            "aftParecerFisio": aftParecerFisio,
            "aftData": dataApiFormatada(aftData),
            "aftIdPraticante": aftIdPraticante,
            "aftIdFuncionario": aftIdFuncionario,
            "aftIdMedico": aftIdMedico,
            "aftAvalPostSolCav": aftAvalPostSolCav,
            "aftAmotoAte": aftAmotoAte,
            "aftAmotoCor": aftAmotoCor,
            "aftEquiEstDin": aftEquiEstDin,
            "aftDesMotoNeuroObs": aftDesMotoNeuroObs,
            "aftDesMotoNeuroAnd": aftDesMotoNeuroAnd,
            "aftDesMotoNeuroEngat": aftDesMotoNeuroEngat,
            "aftSinVit": aftSinVit,
            "aftMedicamentos": aftMedicamentos,
            "aftDiagFisioFunc": aftDiagFisioFunc,
            "aftDesMotoNeuroCtronc": aftDesMotoNeuroCtronc,
            "aftDesMotoNeuroCcerv": aftDesMotoNeuroCcerv,
            "aftDesMotoNeuroRolou": aftDesMotoNeuroRolou,
            "anexosList": anexosList
        };
        await api.post("/cadastraAvalFisioter", json);
        registroSalvo();
        setLoading(false);
    }

    const limparCamposFormulario = () => {
        setAftId("");
        setAftQueixa("");
        setAftDiagClin("");
        setAftAnamnese("");
        setAftRotTerapia("");
        setAftExameFis("");
        setAftRefPrimTend("");
        setAftSenseTatil(false);
        setAftSenseDolo(false);
        setAftSenseTerm(false);
        setAftSenseObs("");
        setAftAmotoHipe(false);
        setAftAmotoHipo(false);
        setAftAmotoContEsp(false);
        setAftAmotoDefAtx(false);
        setAftAmotoClonus(false);
        setAftAmotoObs("");
        setAftMarLocAtu("");
        setAftMtrAlcObj("");
        setAftMtrAlimen("");
        setAftMtrPreenObj("");
        setAftMtrHigieni("");
        setAftMtrUsoBimanual("")
        setAftMtrNegMembro("");
        setAftMtrVesteSoz("");
        setAftMtrContEsfinct("");
        setAftMtrComent("");
        setAftFmuscMmss("");
        setAftFmuscMmii("");
        setAftFmuscTronco("");
        setAftFmuscObs("");
        setAftCmotoEstObs("");
        setAftCmotoDinObs("");
        setAftPreenPalmar(false);
        setAftPreenPinca(false);
        setAftPreenObs("");
        setAftMovPassiva("");
        setAftMovRespira("");
        setAftMovDegluti("");
        setAftMovMastig("");
        setAftMovContEsfinct("")
        setAftQuadCognitivo("");
        setAftSistResp("");
        setAftSistCirc("");
        setAftParecerFisio("");
        setAftData("");
        setAftIdMedico({ "pessoa": { "pesNome": "" } });
        setAftIdFuncionario({ "pessoa": { "pesNome": "" } });
        setAftIdPraticante({ "pessoa": { "pesNome": "" } });
        setAftAvalPostSolCav("");
        setAftAmotoAte(false);
        setAftAmotoCor("");
        setAftEquiEstDin("");
        setAftDesMotoNeuroObs("");
        setAftDesMotoNeuroAnd("");
        setAftDesMotoNeuroEngat("");
        setAftDesMotoNeuroRolou("");
        setAftDesMotoNeuroCtronc("");
        setAftDesMotoNeuroCcerv("");
        setAftDiagFisioFunc("");
        setAftMedicamentos("");
        setAnexosList([]);
        setAftSinVit("");
        setAbrirPesquisa(false);
    }

    const enviaJsonRemove = () => {
        api.delete("/removeAvalFisioter?aftId=" + aftId);
    }

    const atualizaDlgPesquisaPraticantes = async () => {
        setListPraticantes(await (await api.get("/pesquisaPraticantes")).data);
        setAbrirPesquisaPraticante(true);
    }

    const atualizaDlgPesquisaFuncionarios = async () => {
        setListFuncionarios(await (await api.get("/pesquisaFuncionario?pesCpf=&pesNome=")).data);
        setAbrirPesquisaFuncionario(true);
    }

    const atualizaDlgPesquisaMedicos = async () => {
        setListMedicos(await (await api.get("/pesquisaMedico?pesCpf=&pesNome=")).data);
        setAbrirPesquisaMedico(true);
    }

    const atualizaMedicoSelecionado = async (item) => {
        await setAftIdMedico(item);
        setAbrirPesquisaMedico(false);
    }

    const atualizaPraticanteSelecionado = async (item) => {
        await setAftIdPraticante(item);
        setAbrirPesquisaPraticante(false);
    }

    const atualizaFuncionarioSelecionado = async (item) => {
        await setAftIdFuncionario(item);
        setAbrirPesquisaFuncionario(false);
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
        let file = convertBase64ToFile(e.aaftExamComp, e.aaftDescricao);
        saveAs(file, e.aaftDescricao);
    }

    const removeDocumentoSelecionado = (item) => {
        var array = [...anexosList];
        var index = array.indexOf(item);
        if (index !== -1) {
            array.splice(index, 1);
            setAnexosList(array);
        }
    }

    const criarAnexo = (e) => {
        const jsonItem = {
            "aaftId": null,
            "aaftDescricao": "",
            "aaftExamComp": "",
            "avalFisioter": ""
        }

        try {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    jsonItem.aaftExamComp = reader.result;
                    jsonItem.aaftDescricao = e.target.files[0].name;
                    setAnexosList(doc => [...doc, jsonItem]);
                }
            }
            reader.readAsDataURL(e.target.files[0]);
        } catch (error) {
            console.log(error);
        }
    }

    const TabelaDocumentos = ({ data, rowsPerPage, removeDocumentoSelecionado }) => {
        const [pagina, setPage] = useState(1);
        const { slice, range } = useTable(data, pagina, rowsPerPage);
        return (
            <>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Descrição</th>
                            <th className='center'>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            slice.map(item => <LinhaTabelaDocumentos key={item.aaftDescricao} item={item} removeDocumentoSelecionado={removeDocumentoSelecionado} />)
                        }
                    </tbody>
                </Table>
                <TableFooter range={range} slice={slice} setPage={setPage} page={pagina} />
            </>
        );
    };

    const LinhaTabelaDocumentos = ({ item, removeDocumentoSelecionado }) => {
        const { aaftDescricao } = item;

        const removerItem = e => removeDocumentoSelecionado(item);
        const baixarItem = e => baixarArquivo(item);

        return <tr>
            <td width={'100px'}>{aaftDescricao}</td>

            <td width={'80px'} className='center'>
                <Button className='btn-succes' onClick={baixarItem}><BsDownload /></Button>
                <Button className='btn-danger' onClick={removerItem}><BsFillTrashFill /></Button>
            </td>
        </tr>
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (aftIdPraticante.pessoa.pesNome === "") {
            mensagemCustomizada("Selecione um praticante", "warning");
            document.getElementById("botaoPraticante").focus();
            return;
        }
        if (aftIdFuncionario.pessoa.pesNome === "") {
            mensagemCustomizada("Selecione um funcionário", "warning");
            document.getElementById("botaoFuncionario").focus();
            return;
        }
        if (aftIdMedico.pessoa.pesNome === "") {
            mensagemCustomizada("Selecione um médico", "warning");
            document.getElementById("botaoMedico").focus();
            return;
        }
        setLoading(true);
        await enviaJsonGravar();
        limparCamposFormulario();
    }

    const movimentoAvalFisioter = () => {
        return (
            <div>
                <Menu tituloPagina={"Avaliação Fisioterápica"} />
                <ReactNotifications />
                <Carregando showCarregando={loading} />
                <Container>
                    <Form onSubmit={handleSubmit}>
                        <br />
                        <Row>
                            <h3>Avaliação Fisioterápica</h3>
                        </Row>
                        <Row>
                            <Col md="2">
                                <Form.Label>Código</Form.Label>
                                <Form.Control value={aftId} type="text" disabled />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="2">
                                <Form.Label>Data *</Form.Label>
                                <Form.Control value={aftData} type="date" required
                                    onChange={(e) => setAftData(e.target.value)} />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <Form.Label>Praticante *</Form.Label>
                                <InputConverter idBtn={"botaoPraticante"} descricao={aftIdPraticante.pessoa.pesNome} atualizaDlgPesquisa={atualizaDlgPesquisaPraticantes} />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <Form.Label>Funcionário *</Form.Label>
                                <InputConverter idBtn={"botaoFuncionario"} descricao={aftIdFuncionario.pessoa.pesNome} atualizaDlgPesquisa={atualizaDlgPesquisaFuncionarios} />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <Form.Label>Médico *</Form.Label>
                                <InputConverter idBtn={"botaoMedico"} descricao={aftIdMedico.pessoa.pesNome} atualizaDlgPesquisa={atualizaDlgPesquisaMedicos} />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <Form.Label>Queixa</Form.Label>
                                <Form.Control value={aftQueixa}
                                    onChange={(e) => setAftQueixa(e.target.value)}
                                    type="text" as="textarea" className='textArea' />
                            </Col>
                            <Col md="6">
                                <Form.Label>Diagnóstico Clínico</Form.Label>
                                <Form.Control value={aftDiagClin}
                                    onChange={(e) => setAftDiagClin(e.target.value)}
                                    type="text" as="textarea" className='textArea' />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <Form.Label>Anamnese</Form.Label>
                                <Form.Control value={aftAnamnese}
                                    onChange={(e) => setAftAnamnese(e.target.value)}
                                    type="text" as="textarea" className='textArea' />
                            </Col>
                            <Col md="6">
                                <Form.Label>Rotina Diária/Terapias/ Avd’s:</Form.Label>
                                <Form.Control value={aftRotTerapia}
                                    onChange={(e) => setAftRotTerapia(e.target.value)}
                                    type="text" as="textarea" className='textArea' />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <Form.Label>Exame Físico</Form.Label>
                                <BsInfoCircleFill className='icone' title='Inspeção: (pele, cicatriz, ulcera, edema, deformidades, secreções)
                                Palpação / Trofismo muscular: (tipo de dor, contratura, ºC, nódulos, crepitação, prótese)' />
                                <Form.Control value={aftExameFis}
                                    onChange={(e) => setAftExameFis(e.target.value)}
                                    type="text" as="textarea" className='textArea' />
                            </Col>
                            <Col md="6">
                                <Form.Label>Estereotipias/Reflexos Primitivos e Tendíneos:</Form.Label>
                                <Form.Control value={aftRefPrimTend}
                                    onChange={(e) => setAftRefPrimTend(e.target.value)}
                                    type="text" as="textarea" className='textArea' />
                            </Col>
                        </Row>
                        <Row>
                            <Form.Label>Desenvolvimento Motor/Neuropsicomotor:</Form.Label>
                            <Col md="3">
                                <Form.Label>Controle cervical:</Form.Label>
                                <Form.Control value={aftDesMotoNeuroCcerv}
                                    onChange={(e) => setAftDesMotoNeuroCcerv(e.target.value)}
                                    type="text" maxLength={20} />
                                <Form.Label>Controle de tronco:</Form.Label>
                                <Form.Control value={aftDesMotoNeuroCtronc}
                                    onChange={(e) => setAftDesMotoNeuroCtronc(e.target.value)}
                                    type="text" maxLength={20} />
                                <Form.Label>Rolou:</Form.Label>
                                <Form.Control value={aftDesMotoNeuroRolou}
                                    onChange={(e) => setAftDesMotoNeuroRolou(e.target.value)}
                                    type="text" maxLength={20} />
                            </Col>
                            <Col md="3">
                                <Form.Label>Engatinhou:</Form.Label>
                                <Form.Control value={aftDesMotoNeuroEngat}
                                    onChange={(e) => setAftDesMotoNeuroEngat(e.target.value)}
                                    type="text" maxLength={20} />
                                <Form.Label>Andou:</Form.Label>
                                <Form.Control value={aftDesMotoNeuroAnd}
                                    onChange={(e) => setAftDesMotoNeuroAnd(e.target.value)}
                                    type="text" maxLength={20} />
                            </Col>
                            <Col md="6">
                                <Form.Label>Observação</Form.Label>
                                <Form.Control value={aftDesMotoNeuroObs}
                                    onChange={(e) => setAftDesMotoNeuroObs(e.target.value)}
                                    type="text" as="textarea" className='textArea' />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <Form.Label>Sensibilidade:</Form.Label>
                                <Form.Check
                                    checked={aftSenseTatil} onChange={(e) => setAftSenseTatil(e.target.checked)}
                                    type="checkbox" label="Tátil" />
                                <Form.Check
                                    checked={aftSenseTerm} onChange={(e) => setAftSenseTerm(e.target.checked)}
                                    type="checkbox" label="Térmica" />
                                <Form.Check
                                    checked={aftSenseDolo} onChange={(e) => setAftSenseDolo(e.target.checked)}
                                    type="checkbox" label="Dolorosa" />
                            </Col>
                            <Col md="6">
                                <Form.Label>Observação:</Form.Label>
                                <Form.Control value={aftSenseObs}
                                    onChange={(e) => setAftSenseObs(e.target.value)}
                                    type="text" as="textarea" className='textArea' />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <Form.Label>Equilíbrio Estático/Dinâmico:</Form.Label>
                                <BsInfoCircleFill className='icone' title=' (sustentação sentado, em pé, com e sem apoio, apoio unipodal - cabeça, tronco), engatinhar, marcha, saltar com pés juntos, desviar obstáculos' />
                                <Form.Control value={aftExameFis}
                                    onChange={(e) => setAftExameFis(e.target.value)}
                                    type="text" as="textarea" className='textArea' />
                            </Col>
                        </Row>
                        <Row>
                            <Form.Label>Alteração Motora:</Form.Label>
                            <Col md="3">
                                <Form.Check
                                    checked={aftAmotoCor} onChange={(e) => setAftAmotoCor(e.target.checked)}
                                    type="checkbox" label="Coréia" />
                                <Form.Check
                                    checked={aftAmotoHipe} onChange={(e) => setAftAmotoHipe(e.target.checked)}
                                    type="checkbox" label="Hipertonia" />
                                <Form.Check
                                    checked={aftAmotoAte} onChange={(e) => setAftAmotoAte(e.target.checked)}
                                    type="checkbox" label="Atetose" />
                                <Form.Check
                                    checked={aftAmotoContEsp} onChange={(e) => setAftAmotoContEsp(e.target.checked)}
                                    type="checkbox" label="Contratura Espasticidade" />
                            </Col>
                            <Col md="3">
                                <Form.Check
                                    checked={aftAmotoDefAtx} onChange={(e) => setAftAmotoDefAtx(e.target.checked)}
                                    type="checkbox" label="Ataxia" />
                                <Form.Check
                                    checked={aftAmotoClonus} onChange={(e) => setAftAmotoClonus(e.target.checked)}
                                    type="checkbox" label="Clônus" />
                                <Form.Check
                                    checked={aftAmotoHipo} onChange={(e) => setAftAmotoHipo(e.target.checked)}
                                    type="checkbox" label="Hipotonia" />
                            </Col>
                            <Col md="6">
                                <Form.Label>Observação:</Form.Label>
                                <Form.Control value={aftAmotoObs}
                                    onChange={(e) => setAftAmotoObs(e.target.value)}
                                    type="text" as="textarea" className='textArea' />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <Form.Label>Marcha/Locomoção Atual:</Form.Label>
                                <Form.Control value={aftMarLocAtu}
                                    onChange={(e) => setAftMarLocAtu(e.target.value)}
                                    type="text" as="textarea" className='textArea' />
                            </Col>
                            <Col md="6">
                                <Form.Label>Avaliação Postural Solo/Cavalo:</Form.Label>
                                <Form.Control value={aftAvalPostSolCav}
                                    onChange={(e) => setAftAvalPostSolCav(e.target.value)}
                                    type="text" as="textarea" className='textArea' />
                            </Col>
                        </Row>
                        <Row>
                            <Form.Label>Motricidade:</Form.Label>
                            <Col md="3">
                                <Form.Label>Alcance de objetos</Form.Label>
                                <Form.Select required value={aftMtrAlcObj}
                                    onChange={(e) => setAftMtrAlcObj(e.target.value)}>
                                    <option>Selecione</option>
                                    <option value="P">Presente</option>
                                    <option value="A">Ausente</option>
                                    <option value="N">Normal</option>
                                    <option value="A">Anormal</option>
                                </Form.Select>
                                <Form.Label> Alimenta-se</Form.Label>
                                <Form.Select required value={aftMtrAlimen}
                                    onChange={(e) => setAftMtrAlimen(e.target.value)}>
                                    <option>Selecione</option>
                                    <option value="P">Presente</option>
                                    <option value="A">Ausente</option>
                                    <option value="N">Normal</option>
                                    <option value="A">Anormal</option>
                                </Form.Select>
                                <Form.Label>Preensão de objetos</Form.Label>
                                <Form.Select required value={aftMtrPreenObj}
                                    onChange={(e) => setAftMtrPreenObj(e.target.value)}>
                                    <option>Selecione</option>
                                    <option value="P">Presente</option>
                                    <option value="A">Ausente</option>
                                    <option value="N">Normal</option>
                                    <option value="A">Anormal</option>
                                </Form.Select>
                                <Form.Label>Higieniza-se</Form.Label>
                                <Form.Select required value={aftMtrHigieni}
                                    onChange={(e) => setAftMtrHigieni(e.target.value)}>
                                    <option>Selecione</option>
                                    <option value="P">Presente</option>
                                    <option value="A">Ausente</option>
                                    <option value="N">Normal</option>
                                    <option value="A">Anormal</option>
                                </Form.Select>
                            </Col>
                            <Col md="3">
                                <Form.Label>Uso bimanual</Form.Label>
                                <Form.Select required value={aftMtrUsoBimanual}
                                    onChange={(e) => setAftMtrUsoBimanual(e.target.value)}>
                                    <option>Selecione</option>
                                    <option value="P">Presente</option>
                                    <option value="A">Ausente</option>
                                    <option value="N">Normal</option>
                                    <option value="A">Anormal</option>
                                </Form.Select>
                                <Form.Label>Negligência de membro</Form.Label>
                                <Form.Select required value={aftMtrNegMembro}
                                    onChange={(e) => setAftMtrNegMembro(e.target.value)}>
                                    <option>Selecione</option>
                                    <option value="P">Presente</option>
                                    <option value="A">Ausente</option>
                                    <option value="N">Normal</option>
                                    <option value="A">Anormal</option>
                                </Form.Select>
                                <Form.Label>Veste-se</Form.Label>
                                <Form.Select required value={aftMtrVesteSoz}
                                    onChange={(e) => setAftMtrVesteSoz(e.target.value)}>
                                    <option>Selecione</option>
                                    <option value="P">Presente</option>
                                    <option value="A">Ausente</option>
                                    <option value="N">Normal</option>
                                    <option value="A">Anormal</option>
                                </Form.Select>
                                <Form.Label>Controle de esfíncteres</Form.Label>
                                <Form.Select required value={aftMtrContEsfinct}
                                    onChange={(e) => setAftMtrContEsfinct(e.target.value)}>
                                    <option>Selecione</option>
                                    <option value="P">Presente</option>
                                    <option value="A">Ausente</option>
                                    <option value="N">Normal</option>
                                    <option value="A">Anormal</option>
                                </Form.Select>
                            </Col>
                            <Col md="6">
                                <Form.Label>Comentários:</Form.Label>
                                <Form.Control value={aftMtrComent}
                                    onChange={(e) => setAftMtrComent(e.target.value)}
                                    type="text" as="textarea" className='textArea' />
                            </Col>
                        </Row>
                        <Row>
                            <Form.Label>Testes: Goniometria (ADM) / Força Muscular:</Form.Label>
                            <Col md="3">
                                <Form.Label>MMII</Form.Label>
                                <Form.Select required value={aftFmuscMmii}
                                    onChange={(e) => setAftFmuscMmii(e.target.value)}>
                                    <option>Selecione</option>
                                    <option value="P">Presente</option>
                                    <option value="A">Ausente</option>
                                    <option value="N">Normal</option>
                                    <option value="A">Anormal</option>
                                </Form.Select>
                                <Form.Label>MMSS</Form.Label>
                                <Form.Select required value={aftFmuscMmss}
                                    onChange={(e) => setAftFmuscMmss(e.target.value)}>
                                    <option>Selecione</option>
                                    <option value="P">Presente</option>
                                    <option value="A">Ausente</option>
                                    <option value="N">Normal</option>
                                    <option value="A">Anormal</option>
                                </Form.Select>
                                <Form.Label>Cervical/Tronco</Form.Label>
                                <Form.Select required value={aftFmuscTronco}
                                    onChange={(e) => setAftFmuscTronco(e.target.value)}>
                                    <option>Selecione</option>
                                    <option value="P">Presente</option>
                                    <option value="A">Ausente</option>
                                    <option value="N">Normal</option>
                                    <option value="A">Anormal</option>
                                </Form.Select>
                            </Col>
                            <Col md="3"></Col>
                            <Col md="6">
                                <Form.Label>Observação:</Form.Label>
                                <Form.Control value={aftFmuscObs}
                                    onChange={(e) => setAftFmuscObs(e.target.value)}
                                    type="text" as="textarea" className='textArea' />
                            </Col>
                        </Row>
                        <Row>
                            <Form.Label>Coordenação Motora:</Form.Label>
                            <Col md="6">
                                <Form.Label>Estática:</Form.Label>
                                <BsInfoCircleFill className='icone' title='(sustentação cabeça, tronco, podal, unipodal)' />
                                <Form.Control value={aftCmotoEstObs}
                                    onChange={(e) => setAftCmotoEstObs(e.target.value)}
                                    type="text" as="textarea" className='textArea' />
                            </Col>
                            <Col md="6">
                                <Form.Label>Dinâmica:</Form.Label>
                                <BsInfoCircleFill className='icone' title='(engatinhar, marchar, saltar pés juntos, desviar obstáculos, correr, etc)' />
                                <Form.Control value={aftCmotoDinObs}
                                    onChange={(e) => setAftCmotoDinObs(e.target.value)}
                                    type="text" as="textarea" className='textArea' />
                            </Col>
                        </Row>
                        <Row>
                            <Form.Label>Preensão:</Form.Label>
                            <Col md="6">
                                <Form.Check
                                    checked={aftPreenPalmar} onChange={(e) => setAftPreenPalmar(e.target.checked)}
                                    type="checkbox" label="Palmar" />
                                <Form.Check
                                    checked={aftPreenPinca} onChange={(e) => setAftPreenPinca(e.target.checked)}
                                    type="checkbox" label="Pinça" />
                            </Col>
                            <Col md="6">
                                <Form.Label>Observação:</Form.Label>
                                <Form.Control value={aftPreenObs}
                                    onChange={(e) => setAftPreenObs(e.target.value)}
                                    type="text" as="textarea" className='textArea' />
                            </Col>
                        </Row>
                        <Row>
                            <Form.Label>Movimentação:</Form.Label>
                            <Col md="3">
                                <Form.Label>Passiva:</Form.Label>
                                <Form.Control value={aftMovPassiva} maxLength={20}
                                    onChange={(e) => setAftMovPassiva(e.target.value)}
                                    type="text" />
                                <Form.Label>Respiração:</Form.Label>
                                <Form.Control value={aftMovRespira} maxLength={20}
                                    onChange={(e) => setAftMovRespira(e.target.value)}
                                    type="text" />
                            </Col>
                            <Col md="3">
                                <Form.Label>Deglutição:</Form.Label>
                                <Form.Control value={aftMovDegluti} maxLength={20}
                                    onChange={(e) => setAftMovDegluti(e.target.value)}
                                    type="text" />
                                <Form.Label>Mastigação:</Form.Label>
                                <Form.Control value={aftMovMastig} maxLength={20}
                                    onChange={(e) => setAftMovMastig(e.target.value)}
                                    type="text" />

                            </Col>
                            <Col md="3">
                                <Form.Label>Controle Esfíncter:</Form.Label>
                                <Form.Control value={aftMovContEsfinct} maxLength={20}
                                    onChange={(e) => setAftMovContEsfinct(e.target.value)}
                                    type="text" />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <Form.Label>Quadro Cognitivo / Fala / Linguagem:</Form.Label>
                                <BsInfoCircleFill className='icone' title='(afasia, verbal, gestual , escrita, leitura)' />
                                <Form.Control value={aftQuadCognitivo}
                                    onChange={(e) => setAftQuadCognitivo(e.target.value)}
                                    type="text" as="textarea" className='textArea' />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <Form.Label>Sistema Respiratório:</Form.Label>
                                <Form.Control value={aftSistResp}
                                    onChange={(e) => setAftSistResp(e.target.value)}
                                    type="text" as="textarea" className='textArea' />
                            </Col>
                            <Col md="6">
                                <Form.Label>Sistema Circulatório:</Form.Label>
                                <Form.Control value={aftSistCirc}
                                    onChange={(e) => setAftSistCirc(e.target.value)}
                                    type="text" as="textarea" className='textArea' />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <Form.Label>Parecer Fisioterápico/Outras Observações:</Form.Label>
                                <Form.Control value={aftParecerFisio}
                                    onChange={(e) => setAftParecerFisio(e.target.value)}
                                    type="text" as="textarea" className='textArea' />
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
                                                <Form.Control type="file" id="inputDoc" accept="image/*, application/pdf" onChange={criarAnexo} />
                                                <Form.Label htmlFor="inputDoc" className='label-input-file-pqn'>Anexar Documento</Form.Label>
                                            </Col>
                                        </Row>
                                        <TabelaDocumentos data={anexosList} rowsPerPage={5} removeDocumentoSelecionado={removeDocumentoSelecionado} />
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                        <br />
                        <Toolbar jsonRemove={enviaJsonRemove} abrirPesquisa={atualizaDlgPesquisa} />
                    </Form>
                </Container>
                {abrirPesquisa &&
                    <PesquisaAvalFisioter setValores={setList} valores={list} atualizaItemSelecionado={atualizaItemSelecionado} setAbrirPesquisa={setAbrirPesquisa} />
                }
                {abrirPesquisaPraticante &&
                    <PesquisaPraticantes setValores={setListPraticantes} valores={listPraticantes} atualizaItemSelecionado={atualizaPraticanteSelecionado} setAbrirPesquisa={setAbrirPesquisaPraticante} />
                }
                {abrirPesquisaFuncionario &&
                    <PesquisaFuncionario setValores={setListFuncionarios} valores={listFuncionarios} atualizaItemSelecionado={atualizaFuncionarioSelecionado} setAbrirPesquisa={setAbrirPesquisaFuncionario} />
                }
                {abrirPesquisaMedico &&
                    <PesquisaMedico setValores={setListMedicos} valores={listMedicos} atualizaItemSelecionado={atualizaMedicoSelecionado} setAbrirPesquisa={setAbrirPesquisaMedico} />
                }
                <Footer />
            </div >
        )
    }
    return movimentoAvalFisioter();
}
export default movimentoAvalFisioter;