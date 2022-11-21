import React, { useState } from 'react';
import { Form, Col, Row, Container } from 'react-bootstrap';
import Toolbar from '../toolbar';
import PesquisaAvalSocioEcon from "../pesquisas/pesquisaAvalSocioecon";

import { registroSalvo } from "../../utilitario/mensagemUtil"
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { api } from "../../utilitario/baseComunicacao";
import Menu from "../menu"
import Footer from "../footer"

function movimentoAvalFisioter() {
    const [abrirPesquisa, setAbrirPesquisa] = useState(false);

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
    const [aftFmuscMmss, setAftFmuscMmss] = useState("");
    const [aftFmuscMmii, setAftFmuscMmii] = useState("");
    const [aftFmuscTronco, setAftFmuscTronco] = useState("");
    const [aftFmuscObs, setAftFmuscObs] = useState("");
    const [aftCmotoEstObs, setAftCmotoEstObs] = useState("");
    const [aftCmotoDinObs, setAftCmotoDinObs] = useState("");
    const [aftPreenPalmar, setAftPreenPalmar] = useState(false);
    const [aftPreenPinca, setAftPreenPinca] = useState(false);
    const [aftMovPassiva, setAftMovPassiva] = useState("");
    const [aftMovRespira, setAftMovRespira] = useState("");
    const [aftMovDegluti, setAftMovDegluti] = useState("");
    const [aftMovMastig, setAftMovMastig] = useState("");
    const [aftMovContEsfinct, setAftMovContEsfinct] = useState("");
    const [aftQuadCognitivo, setAftQuadCognitivo] = useState("");
    const [aftSistResp, setAftSistResp] = useState("");
    const [aftSistCirc, setAftSistCirc] = useState("");
    const [aftParecerFisio, setAftParecerFisio] = useState("");
    const [aftData, setAftData] = useState(Date.now());
    const [aftIdFuncionario, setAftIdFuncionario] = useState({ "pessoa": { "pesNome": "" } });
    const [aftIdPraticante, setAftIdPraticante] = useState({ "pessoa": { "pesNome": "" } });
    const [aftIdMedico, setAftIdMedico] = useState({ "pessoa": { "pesNome": "" } });

    //variáveis da dialog de pesquisa
    var [list, setList] = useState([]);

    const atualizaDlgPesquisa = async () => {
        setList(await (await api.get("/pesquisaAvalFisioter")).data);
        setAbrirPesquisa(true);
    }

    const atualizaItemSelecionado = (item) => {
        setAftId(item.aftId);
        setAftData(item.aftData)
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
        setAftFmuscMmss(item.aftFmuscMmss);
        setAftFmuscMmii(item.aftFmuscMmii);
        setAftFmuscTronco(item.aftFmuscTronco);
        setAftFmuscObs(item.aftFmuscObs);
        setAftCmotoEstObs(item.aftCmotoEstObs);
        setAftCmotoDinObs(item.aftCmotoDinObs);
        setAftPreenPalmar(item.aftPreenPalmar);
        setAftPreenPinca(item.aftPreenPinca);
        setAftMovPassiva(item.aftMovPassiva);
        setAftMovRespira(item.aftMovDegluti);
        setAftMovDegluti(item.aftMovDegluti);
        setAftMovMastig(item.aftMovMastig);
        setAftMovContEsfinct(item.aftMovContEsfinct)
        setAftQuadCognitivo(item.aftQuadCognitivo);
        setAftSistResp(item.aftSistResp);
        setAftSistCirc(item.aftSistCirc);
        setAftParecerFisio(item.aftParecerFisio);
        setAftData(item.aftData);
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
        setAbrirPesquisa(false);
    }

    const enviaJsonGravar = () => {
        const json = {
            "aftId": aftId,
            "aftData": aftData,
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
            "aftFmuscMmss": aftFmuscMmss,
            "aftFmuscMmii": aftFmuscMmii,
            "aftFmuscTronco": aftFmuscTronco,
            "aftFmuscObs": aftFmuscObs,
            "aftCmotoEstObs": aftCmotoEstObs,
            "aftCmotoDinObs": aftCmotoDinObs,
            "aftPreenPalmar": aftPreenPalmar,
            "aftPreenPinca": aftPreenPinca,
            "aftMovPassiva": aftMovPassiva,
            "aftMovRespira": aftMovRespira,
            "aftMovDegluti": aftMovDegluti,
            "aftMovMastig": aftMovMastig,
            "aftMovContEsfinct": aftMovContEsfinct,
            "aftQuadCognitivo": aftQuadCognitivo,
            "aftSistResp": aftSistResp,
            "aftSistCirc": aftSistCirc,
            "aftParecerFisio": aftParecerFisio,
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
            "aftDesMotoNeuroRolou": aftDesMotoNeuroRolou
        };
        api.post("/cadastraAvalFisioter", json);
        registroSalvo();
    }

    const limparCamposFormulario = (item) => {
        setAftId("");
        setAftData("");
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
        setAftFmuscMmss("");
        setAftFmuscMmii("");
        setAftFmuscTronco("");
        setAftFmuscObs("");
        setAftCmotoEstObs("");
        setAftCmotoDinObs("");
        setAftPreenPalmar(false);
        setAftPreenPinca(false);
        setAftMovPassiva("");
        setAftMovRespira("");
        setAftMovDegluti("");
        setAftMovMastig("");
        setAftMovContEsfinct("")
        setAftQuadCognitivo("");
        setAftSistResp("");
        setAftSistCirc("");
        setAftParecerFisio("");
        setAftData(Date().now);
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
        setAftSinVit("");

        setAbrirPesquisa(false);
    }

    const enviaJsonRemove = () => {
        api.delete("/removeAvalFisioter?aftId=" + aftId);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        enviaJsonGravar();
        limparCamposFormulario();
    }

    const movimentoAvalFisioter = () => {
        return (
            <div>
                <Menu />
                <Container className="vh-100">
                    <ReactNotifications />
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
                            <Col md="2">
                                <Form.Label htmlFor="inputDate">Data da avaliação</Form.Label>
                                <Form.Control value={aftData}
                                              onChange={(e) => setAftData(e.target.value)}
                                              type="date" id="inputDate" required />
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
                                <Form.Control value={aftExameFis}
                                    onChange={(e) => setAftExameFis(e.target.value)}
                                    type="text" as="textarea" className='textArea' />
                            </Col>
                            <Col md="6">
                                <Form.Label>Estereotipias/Reflexos Primitivos E Tendíneos:</Form.Label>
                                <Form.Control value={aftRefPrimTend}
                                              onChange={(e) => setAftRefPrimTend(e.target.value)}
                                              type="text" as="textarea" className='textArea' />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Inspeção: (pele, cicatriz, ulcera, edema, deformidades,secreções)</Form.Label>
                                <Form.Label>Palpação/ Trofismo muscular: (tipo de dor, contratura, ºC, nódulos, crepitação, prótese):</Form.Label>
                            </Col>
                            <Col>

                            </Col>

                        </Row>
                        <br />
                        <Toolbar jsonRemove={enviaJsonRemove} abrirPesquisa={atualizaDlgPesquisa} />
                    </Form>
                </Container>
                {abrirPesquisa &&
                    <PesquisaAvalSocioEcon setValores={setList} valores={list} atualizaItemSelecionado={atualizaItemSelecionado} setAbrirPesquisa={setAbrirPesquisa} />
                }
                <Footer />
            </div >
        )
    }
    return movimentoAvalFisioter();
}
export default movimentoAvalFisioter;