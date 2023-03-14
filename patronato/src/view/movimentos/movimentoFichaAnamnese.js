import React, { useState } from 'react';
import { Form, Col, Row, Container, Card, Table, Button } from 'react-bootstrap';
import { BsFillTrashFill, BsDownload } from "react-icons/bs";
import useTable from '../table/useTable';
import TableFooter from '../table/tableFooter';
import Toolbar from '../toolbar';
import PesquisaFichaAnamnese from "../pesquisas/pesquisaFichaAnamnese";
import PesquisaPraticantes from "../pesquisas/pesquisaPraticantes";
import PesquisaFuncionario from "../pesquisas/pesquisaFuncionario";
import { registroSalvo, mensagemCustomizada } from "../../utilitario/mensagemUtil";
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { api } from "../../utilitario/baseComunicacao";
import Menu from "../menu";
import Footer from "../footer";
import InputConverter from '../componentes/inputConverter';
import { saveAs } from 'file-saver';
import { dataApiFormatada, dataFormatadaAnoMesDia } from '../../utilitario/dateUtil';

function movimentoFichaAnamnese() {

    const [abrirPesquisa, setAbrirPesquisa] = useState(false);
    const [abrirPesquisaPraticante, setAbrirPesquisaPraticante] = useState(false);
    const [abrirPesquisaFuncionario, setAbrirPesquisaFuncionario] = useState(false);

    //Variáveis de cadastro
    const [amnId, setAmnId] = useState("");
    const [amnData, setAmnData] = useState("");
    const [amnPaisCasados, setAmnPaisCasados] = useState(false);
    const [amnReacSeparacao, setAmnReacSeparacao] = useState("");
    const [amnMoradia, setAmnMoradia] = useState("");
    const [amnPossuiIrmao, setAmnPossuiIrmao] = useState(false);
    const [amnInfosIrmao, setAmnInfosIrmao] = useState("");
    const [amnAdotado, setAmnAdotado] = useState(false);
    const [amnCienciaAdocao, setAmnCienciaAdocao] = useState(false);
    const [amnReacAdocao, setAmnReacAdocao] = useState("");
    const [amnHipDiag, setAmnHipDiag] = useState("");
    const [amnMotivoEquo, setAmnMotivoEquo] = useState("");
    const [amnExpecTrat, setAmnExpecTrat] = useState("");
    const [amnTpGest, setAmnTpGest] = useState("");
    const [amnSaudeMaeGestacao, setAmnSaudeMaeGestacao] = useState("");
    const [amnAcontGestacao, setAmnAcontGestacao] = useState("");
    const [amnTpParto, setAmnTpParto] = useState("");
    const [amnPartoObs, setAmnPartoObs] = useState("");
    const [amnAmarelao, setAmnAmarelao] = useState(false);
    const [amnFebre, setAmnFebre] = useState(false);
    const [amnPermIncubadora, setAmnPermIncubadora] = useState(false);
    const [amnTempoIncubadora, setAmnTempoIncubadora] = useState("");
    const [amnReacPaisFam, setAmnReacPaisFam] = useState("");
    const [amnTpAmamentacao, setAmnTpAmamentacao] = useState("");
    const [amnDifEsfincter, setAmnDifEsfincter] = useState(false);
    const [amnEnureseNotu, setAmnEnureseNotu] = useState(false);
    const [amnPertNot, setAmnPertNot] = useState(false);
    const [amnPertObs, setAmnPertObs] = useState("");
    const [amnDormeSoz, setAmnDormeSoz] = useState(false);
    const [amnDormePais, setAmnDormePais] = useState(false);
    const [amnDivQuarto, setAmnDivQuarto] = useState(false);
    const [amnDivQuartoObs, setAmnDivQuartoObs] = useState("");
    const [amnHabitEspec, setAmnHabitEspec] = useState(false);
    const [amnHabitEspecObs, setAmnHabitEspecObs] = useState("");
    const [amnEngatinha, setAmnEngatinha] = useState(false);
    const [amnSenta, setAmnSenta] = useState(false);
    const [amnAnda, setAmnAnda] = useState(false);
    const [amnCorre, setAmnCorre] = useState(false);
    const [amnTonicidade, setAmnTonicidade] = useState("");
    const [amnEquilibrio, setAmnEquilibrio] = useState("");
    const [amnLateralizacao, setAmnLateralizacao] = useState("");
    const [amnNocaoCorp, setAmnNocaoCorp] = useState("");
    const [amnEstEspCorp, setAmnEstEspCorp] = useState("");
    const [amnPraxiaGlobal, setAmnPraxiaGlobal] = useState("");
    const [amnPraxiaFina, setAmnPraxiaFina] = useState("");
    const [amnDesvNormal, setAmnDesvNormal] = useState(false);
    const [amnDesvFatRel, setAmnDesvFatRel] = useState("");
    const [amnLvFalaComp, setAmnLvFalaComp] = useState(false);
    const [amnLvApenasPal, setAmnLvApenasPal] = useState(false);
    const [amnLvVocalizacao, setAmnLvVocalizacao] = useState(false);
    const [amnLgApontaObj, setAmnLgApontaObj] = useState(false);
    const [amnLgMostOqq, setAmnLgMostOqq] = useState(false);
    const [amnLgExpFac, setAmnLgExpFac] = useState(false);
    const [amnBanhoSozinho, setAmnBanhoSozinho] = useState(false);
    const [amnEscovaSozinho, setAmnEscovaSozinho] = useState(false);
    const [amnBanSozinho, setAmnBanSozinho] = useState(false);
    const [amnAuxVestir, setAmnAuxVestir] = useState(false);
    const [amnContEsfin, setAmnContEsfin] = useState(false);
    const [amnComeSoz, setAmnComeSoz] = useState(false);
    const [amnIdadeRetFral, setAmnIdadeRetFral] = useState("");
    const [amnDifVer, setAmnDifVer] = useState(false);
    const [amnDifOuvir, setAmnDifOuvir] = useState(false);
    const [amnAspctEmoc, setAmnAspctEmoc] = useState("");
    const [amnAspctEmocObs, setAmnAspctEmocObs] = useState("");
    const [amnPaisVeem, setAmnPaisVeem] = useState("");
    const [amnInterage, setAmnInterage] = useState(false);
    const [amnInterageObs, setAmnInterageObs] = useState("");
    const [amnFicarSoz, setAmnFicarSoz] = useState("");
    const [amnBrincarSoz, setAmnBrincarSoz] = useState("");
    const [amnBrincarObs, setAmnBrincarObs] = useState("");
    const [amnAnimaisEstim, setAmnAnimaisEstim] = useState(false);
    const [amnInterageAnimais, setAmnInterageAnimais] = useState(false);
    const [amnAniEspcfc, setAmnAniEspcfc] = useState("");
    const [amnAdaptaLugar, setAmnAdaptaLugar] = useState(false);
    const [amnAtendeInterv, setAmnAtendeInterv] = useState(false);
    const [amnAtendeOrient, setAmnAtendeOrient] = useState(false);
    const [amnChoroFacil, setAmnChoroFacil] = useState(false);
    const [amnChoroObs, setAmnChoroObs] = useState("");
    const [amnRecAuxilio, setAmnRecAuxilio] = useState(false);
    const [amnRecAuxObs, setAmnRecAuxObs] = useState("");
    const [amnResistToque, setAmnResistToque] = useState(false);
    const [amnBronquite, setAmnBronquite] = useState(false);
    const [amnAlergias, setAmnAlergias] = useState(false);
    const [amnAsma, setAmnAsma] = useState(false);
    const [amnConvulsao, setAmnConvulsao] = useState(false);
    const [amnVirose, setAmnVirose] = useState(false);
    const [amnInternacoes, setAmnInternacoes] = useState("");
    const [amnOutDoencas, setAmnOutDoencas] = useState("");
    const [amnTratRealizados, setAmnTratRealizados] = useState("");
    const [amnTratAtual, setAmnTratAtual] = useState(false);
    const [amnTratAtualObs, setAmnTratAtualObs] = useState("");
    const [amnMedicacao, setAmnMedicacao] = useState(false);
    const [amnMedObs, setAmnMedObs] = useState("");
    const [amnConsideracoes, setAmnConsideracoes] = useState("");

    const [anexosList, setAnexosList] = useState([]);

    const [amnIdFuncionario, setAmnIdFuncionario] = useState({ "pessoa": { "pesNome": "" } });
    const [amnIdPraticante, setAmnIdPraticante] = useState({ "pessoa": { "pesNome": "" } });

    const selecionaPaisCasados = () => setAmnPaisCasados(!amnPaisCasados);
    const selecionaPossuiIrmao = () => setAmnPossuiIrmao(!amnPossuiIrmao);
    const selecionaAdotado = () => setAmnAdotado(!amnAdotado);
    const selecionaCienciaAdocao = () => setAmnCienciaAdocao(!amnCienciaAdocao);
    const selecionaAmarelao = () => setAmnAmarelao(!amnAmarelao);
    const selecionaFebre = () => setAmnFebre(!amnFebre);
    const selecionaPermIncubadora = () => setAmnPermIncubadora(!amnPermIncubadora);
    const selecionaDifEsfincter = () => setAmnDifEsfincter(!amnDifEsfincter);
    const selecionaEnureseNotu = () => setAmnEnureseNotu(!amnEnureseNotu);
    const selecionaPertNot = () => setAmnPertNot(!amnPertNot);
    const selecionaDormeSoz = () => setAmnDormeSoz(!amnDormeSoz);
    const selecionaDormePais = () => setAmnDormePais(!amnDormePais);
    const selecionaDivQuarto = () => setAmnDivQuarto(!amnDivQuarto);
    const selecionaHabitEspec = () => setAmnHabitEspec(!amnHabitEspec);
    const selecionaEngatinha = () => setAmnEngatinha(!amnEngatinha);
    const selecionaSenta = () => setAmnSenta(!amnSenta);
    const selecionaAnda = () => setAmnAnda(!amnAnda);
    const selecionaCorre = () => setAmnCorre(!amnCorre);
    const selecionaDesvNormal = () => setAmnDesvNormal(!amnDesvNormal);
    const selecionaLvFalaComp = () => setAmnLvFalaComp(!amnLvFalaComp);
    const selecionaLvApenasPal = () => setAmnLvApenasPal(!amnLvApenasPal);
    const selecionaLvVocalizacao = () => setAmnLvVocalizacao(!amnLvVocalizacao);
    const selecionaLgApontaObj = () => setAmnLgApontaObj(!amnLgApontaObj);
    const selecionaLgMostOqq = () => setAmnLgMostOqq(!amnLgMostOqq);
    const selecionaLgExpFac = () => setAmnLgExpFac(!amnLgExpFac);
    const selecionaBanhoSozinho = () => setAmnBanhoSozinho(!amnBanhoSozinho);
    const selecionaEscovaSozinho = () => setAmnEscovaSozinho(!amnEscovaSozinho);
    const selecionaBanSozinho = () => setAmnBanSozinho(!amnBanSozinho);
    const selecionaAuxVestir = () => setAmnAuxVestir(!amnAuxVestir);
    const selecionaContEsfin = () => setAmnContEsfin(!amnContEsfin);
    const selecionaComeSoz = () => setAmnComeSoz(!amnComeSoz);
    const selecionaDifVer = () => setAmnDifVer(!amnDifVer);
    const selecionaDifOuvir = () => setAmnDifOuvir(!amnDifOuvir);
    const selecionaInterage = () => setAmnInterage(!amnInterage);
    const selecionaAnimaisEstim = () => setAmnAnimaisEstim(!amnAnimaisEstim);
    const selecionaInterageAnimais = () => setAmnInterageAnimais(!amnInterageAnimais);
    const selecionaAdaptaLugar = () => setAmnAdaptaLugar(!amnAdaptaLugar);
    const selecionaAtendeInterv = () => setAmnAtendeInterv(!amnAtendeInterv);
    const selecionaAtendeOrient = () => setAmnAtendeOrient(!amnAtendeOrient);
    const selecionaChoroFacil = () => setAmnChoroFacil(!amnChoroFacil);
    const selecionaRecAuxilio = () => setAmnRecAuxilio(!amnRecAuxilio);
    const selecionaResistToque = () => setAmnResistToque(!amnResistToque);
    const selecionaBronquite = () => setAmnBronquite(!amnBronquite);
    const selecionaAlergias = () => setAmnAlergias(!amnAlergias);
    const selecionaAsma = () => setAmnAsma(!amnAsma);
    const selecionaConvulsao = () => setAmnConvulsao(!amnConvulsao);
    const selecionaVirose = () => setAmnVirose(!amnVirose);
    const selecionaTratAtual = () => setAmnTratAtual(!amnTratAtual);
    const selecionaMedicacao = () => setAmnMedicacao(!amnMedicacao);

    //variáveis da dialog de pesquisa
    var [list, setList] = useState([]);
    var [listPraticantes, setListPraticantes] = useState([]);
    var [listFuncionarios, setListFuncionarios] = useState([]);

    const atualizaDlgPesquisa = async () => {
        setList(await (await api.get("/pesquisaFichaAnamnese")).data);
        setAbrirPesquisa(true);
    }

    const atualizaItemSelecionado = (item) => {
        setAmnId(item.amnId);
        setAmnData(dataFormatadaAnoMesDia(item.amnData));
        setAmnPaisCasados(item.amnPaisCasados);
        setAmnReacSeparacao(item.amnReacSeparacao);
        setAmnMoradia(item.amnMoradia);
        setAmnPossuiIrmao(item.amnPossuiIrmao);
        setAmnInfosIrmao(item.amnInfosIrmao);
        setAmnAdotado(item.amnAdotado);
        setAmnCienciaAdocao(item.amnCienciaAdocao);
        setAmnReacAdocao(item.amnReacAdocao);
        setAmnHipDiag(item.amnHipDiag);
        setAmnMotivoEquo(item.amnMotivoEquo);
        setAmnExpecTrat(item.amnExpecTrat);
        setAmnTpGest(item.amnTpGest);
        setAmnSaudeMaeGestacao(item.amnSaudeMaeGestacao);
        setAmnAcontGestacao(item.amnAcontGestacao);
        setAmnTpParto(item.amnTpParto);
        setAmnPartoObs(item.amnPartoObs);
        setAmnAmarelao(item.amnAmarelao);
        setAmnFebre(item.amnFebre);
        setAmnPermIncubadora(item.amnPermIncubadora);
        setAmnTempoIncubadora(item.amnTempoIncubadora);
        setAmnReacPaisFam(item.amnReacPaisFam)
        setAmnTpAmamentacao(item.amnTpAmamentacao);
        setAmnDifEsfincter(item.amnDifEsfincter);
        setAmnEnureseNotu(item.amnEnureseNotu);
        setAmnPertNot(item.amnPertNot);
        setAmnPertObs(item.amnPertObs);
        setAmnDormeSoz(item.amnDormeSoz);
        setAmnDormePais(item.amnDormePais);
        setAmnDivQuarto(item.amnDivQuarto);
        setAmnDivQuartoObs(item.amnDivQuartoObs);
        setAmnHabitEspec(item.amnHabitEspec);
        setAmnHabitEspecObs(item.amnHabitEspecObs);
        setAmnEngatinha(item.amnEngatinha);
        setAmnSenta(item.amnSenta);
        setAmnAnda(item.amnAnda);
        setAmnCorre(item.amnCorre);
        setAmnTonicidade(item.amnTonicidade);
        setAmnEquilibrio(item.amnEquilibrio);
        setAmnLateralizacao(item.amnLateralizacao);
        setAmnNocaoCorp(item.amnNocaoCorp)
        setAmnEstEspCorp(item.amnEstEspCorp);
        setAmnPraxiaGlobal(item.amnPraxiaGlobal);
        setAmnPraxiaFina(item.amnPraxiaFina);
        setAmnDesvNormal(item.amnDesvNormal);
        setAmnDesvFatRel(item.amnDesvFatRel);
        setAmnLvFalaComp(item.amnLvFalaComp);
        setAmnLvApenasPal(item.amnLvApenasPal);
        setAmnLvVocalizacao(item.amnLvVocalizacao);
        setAmnLgApontaObj(item.amnLgApontaObj);
        setAmnLgMostOqq(item.amnLgMostOqq);
        setAmnLgExpFac(item.amnLgExpFac);
        setAmnBanhoSozinho(item.amnBanhoSozinho);
        setAmnEscovaSozinho(item.amnEscovaSozinho);
        setAmnBanSozinho(item.amnBanSozinho);
        setAmnAuxVestir(item.amnAuxVestir);
        setAmnContEsfin(item.amnContEsfin);
        setAmnComeSoz(item.amnComeSoz);
        setAmnIdadeRetFral(item.amnIdadeRetFral);
        setAmnDifVer(item.amnDifVer);
        setAmnDifOuvir(item.amnDifOuvir);
        setAmnAspctEmoc(item.amnAspctEmoc);
        setAmnAspctEmocObs(item.amnAspctEmocObs);
        setAmnPaisVeem(item.amnPaisVeem);
        setAmnInterage(item.amnInterage);
        setAmnInterageObs(item.amnInterageObs);
        setAmnFicarSoz(item.amnFicarSoz);
        setAmnBrincarSoz(item.amnBrincarSoz);
        setAmnBrincarObs(item.amnBrincarObs);
        setAmnAnimaisEstim(item.amnAnimaisEstim);
        setAmnInterageAnimais(item.amnInterageAnimais);
        setAmnAniEspcfc(item.amnAniEspcfc);
        setAmnAdaptaLugar(item.amnAdaptaLugar);
        setAmnAtendeInterv(item.amnAtendeInterv);
        setAmnAtendeOrient(item.amnAtendeOrient);
        setAmnChoroFacil(item.amnChoroFacil);
        setAmnChoroObs(item.amnChoroObs);
        setAmnRecAuxilio(item.amnRecAuxilio);
        setAmnRecAuxObs(item.amnRecAuxObs);
        setAmnResistToque(item.amnResistToque);
        setAmnBronquite(item.amnBronquite);
        setAmnAlergias(item.amnAlergias);
        setAmnAsma(item.amnAsma);
        setAmnConvulsao(item.amnConvulsao);
        setAmnInternacoes(item.amnInternacoes);
        setAmnOutDoencas(item.amnOutDoencas);
        setAmnTratRealizados(item.amnTratRealizados);
        setAmnTratAtual(item.amnTratAtual);
        setAmnTratAtualObs(item.amnTratAtualObs);
        setAmnMedicacao(item.amnMedicacao);
        setAmnMedObs(item.amnMedObs);
        setAmnConsideracoes(item.amnConsideracoes);
        setAmnIdFuncionario(item.amnIdFuncionario);
        setAmnIdPraticante(item.amnIdPraticante);
        setAnexosList(item.anexosList);
        setAbrirPesquisa(false);
    }

    const enviaJsonGravar = () => {
        const json = {
            "amnId": amnId,
            "amnData": dataApiFormatada(amnData),
            "amnPaisCasados": amnPaisCasados,
            "amnReacSeparacao": amnReacSeparacao,
            "amnMoradia": amnMoradia,
            "amnPossuiIrmao": amnPossuiIrmao,
            "amnInfosIrmao": amnInfosIrmao,
            "amnAdotado": amnAdotado,
            "amnCienciaAdocao": amnCienciaAdocao,
            "amnReacAdocao": amnReacAdocao,
            "amnHipDiag": amnHipDiag,
            "amnMotivoEquo": amnMotivoEquo,
            "amnExpecTrat": amnExpecTrat,
            "amnTpGest": amnTpGest,
            "amnSaudeMaeGestacao": amnSaudeMaeGestacao,
            "amnAcontGestacao": amnAcontGestacao,
            "amnTpParto": amnTpParto,
            "amnPartoObs": amnPartoObs,
            "amnAmarelao": amnAmarelao,
            "amnFebre": amnFebre,
            "amnPermIncubadora": amnPermIncubadora,
            "amnTempoIncubadora": amnTempoIncubadora,
            "amnReacPaisFam": amnReacPaisFam,
            "amnTpAmamentacao": amnTpAmamentacao,
            "amnDifEsfincter": amnDifEsfincter,
            "amnEnureseNotu": amnEnureseNotu,
            "amnPertNot": amnPertNot,
            "amnPertObs": amnPertObs,
            "amnDormeSoz": amnDormeSoz,
            "amnDormePais": amnDormePais,
            "amnDivQuarto": amnDivQuarto,
            "amnDivQuartoObs": amnDivQuartoObs,
            "amnHabitEspec": amnHabitEspec,
            "amnHabitEspecObs": amnHabitEspecObs,
            "amnEngatinha": amnEngatinha,
            "amnSenta": amnSenta,
            "amnAnda": amnAnda,
            "amnCorre": amnCorre,
            "amnTonicidade": amnTonicidade,
            "amnEquilibrio": amnEquilibrio,
            "amnLateralizacao": amnLateralizacao,
            "amnNocaoCorp": amnNocaoCorp,
            "amnEstEspCorp": amnEstEspCorp,
            "amnPraxiaGlobal": amnPraxiaGlobal,
            "amnPraxiaFina": amnPraxiaFina,
            "amnDesvNormal": amnDesvNormal,
            "amnDesvFatRel": amnDesvFatRel,
            "amnLvFalaComp": amnLvFalaComp,
            "amnLvApenasPal": amnLvApenasPal,
            "amnLvVocalizacao": amnLvVocalizacao,
            "amnLgApontaObj": amnLgApontaObj,
            "amnLgMostOqq": amnLgMostOqq,
            "amnLgExpFac": amnLgExpFac,
            "amnBanhoSozinho": amnBanhoSozinho,
            "amnEscovaSozinho": amnEscovaSozinho,
            "amnBanSozinho": amnBanSozinho,
            "amnAuxVestir": amnAuxVestir,
            "amnContEsfin": amnContEsfin,
            "amnComeSoz": amnComeSoz,
            "amnIdadeRetFral": amnIdadeRetFral,
            "amnDifVer": amnDifVer,
            "amnDifOuvir": amnDifOuvir,
            "amnAspctEmoc": amnAspctEmoc,
            "amnAspctEmocObs": amnAspctEmocObs,
            "amnPaisVeem": amnPaisVeem,
            "amnInterage": amnInterage,
            "amnInterageObs": amnInterageObs,
            "amnFicarSoz": amnFicarSoz,
            "amnBrincarSoz": amnBrincarSoz,
            "amnBrincarObs": amnBrincarObs,
            "amnAnimaisEstim": amnAnimaisEstim,
            "amnInterageAnimais": amnInterageAnimais,
            "amnAniEspcfc": amnAniEspcfc,
            "amnAdaptaLugar": amnAdaptaLugar,
            "amnAtendeInterv": amnAtendeInterv,
            "amnAtendeOrient": amnAtendeOrient,
            "amnChoroFacil": amnChoroFacil,
            "amnChoroObs": amnChoroObs,
            "amnRecAuxilio": amnRecAuxilio,
            "amnRecAuxObs": amnRecAuxObs,
            "amnResistToque": amnResistToque,
            "amnBronquite": amnBronquite,
            "amnAlergias": amnAlergias,
            "amnAsma": amnAsma,
            "amnConvulsao": amnConvulsao,
            "amnVirose": amnVirose,
            "amnInternacoes": amnInternacoes,
            "amnOutDoencas": amnOutDoencas,
            "amnTratRealizados": amnTratRealizados,
            "amnTratAtual": amnTratAtual,
            "amnTratAtualObs": amnTratAtualObs,
            "amnMedicacao": amnMedicacao,
            "amnMedObs": amnMedObs,
            "amnConsideracoes": amnConsideracoes,
            "anexosList": anexosList,
            "amnIdFuncionario": amnIdFuncionario,
            "amnIdPraticante": amnIdPraticante
        };
        api.post("/cadastraFichaAnamnese", json);
        registroSalvo();
    }

    const limparCamposFormulario = () => {
        setAmnId("");
        setAmnData("");
        setAmnPaisCasados(false);
        setAmnReacSeparacao("");
        setAmnMoradia("");
        setAmnPossuiIrmao(false);
        setAmnInfosIrmao("");
        setAmnAdotado(false);
        setAmnCienciaAdocao(false);
        setAmnReacAdocao("");
        setAmnHipDiag("");
        setAmnMotivoEquo("");
        setAmnExpecTrat("");
        setAmnTpGest("");
        setAmnSaudeMaeGestacao("");
        setAmnAcontGestacao("");
        setAmnTpParto("");
        setAmnPartoObs("");
        setAmnAmarelao(false);
        setAmnFebre(false);
        setAmnPermIncubadora(false);
        setAmnTempoIncubadora("");
        setAmnReacPaisFam("");
        setAmnTpAmamentacao("");
        setAmnDifEsfincter(false);
        setAmnEnureseNotu(false);
        setAmnPertNot(false);
        setAmnPertObs("");
        setAmnDormeSoz(false);
        setAmnDormePais(false);
        setAmnDivQuarto(false);
        setAmnDivQuartoObs("");
        setAmnHabitEspec(false);
        setAmnHabitEspecObs("");
        setAmnEngatinha(false);
        setAmnSenta(false);
        setAmnAnda(false);
        setAmnCorre(false);
        setAmnTonicidade("");
        setAmnEquilibrio("");
        setAmnLateralizacao("");
        setAmnNocaoCorp("");
        setAmnEstEspCorp("");
        setAmnPraxiaGlobal("");
        setAmnPraxiaFina("");
        setAmnDesvNormal(false);
        setAmnDesvFatRel("");
        setAmnLvFalaComp(false);
        setAmnLvApenasPal(false);
        setAmnLvVocalizacao(false);
        setAmnLgApontaObj(false);
        setAmnLgMostOqq(false);
        setAmnLgExpFac(false);
        setAmnBanhoSozinho(false);
        setAmnEscovaSozinho(false);
        setAmnBanSozinho(false);
        setAmnAuxVestir(false);
        setAmnContEsfin(false);
        setAmnComeSoz(false);
        setAmnIdadeRetFral("");
        setAmnDifVer(false);
        setAmnDifOuvir(false);
        setAmnAspctEmoc("");
        setAmnAspctEmocObs("");
        setAmnPaisVeem("");
        setAmnInterage(false);
        setAmnInterageObs("");
        setAmnFicarSoz("");
        setAmnBrincarSoz("");
        setAmnBrincarObs("");
        setAmnAnimaisEstim(false);
        setAmnInterageAnimais(false);
        setAmnAniEspcfc("");
        setAmnAdaptaLugar(false);
        setAmnAtendeInterv(false);
        setAmnAtendeOrient(false);
        setAmnChoroFacil(false);
        setAmnChoroObs("");
        setAmnRecAuxilio(false);
        setAmnRecAuxObs("");
        setAmnResistToque(false);
        setAmnBronquite(false);
        setAmnAlergias(false);
        setAmnAsma(false);
        setAmnConvulsao(false);
        setAmnVirose(false);
        setAmnInternacoes("");
        setAmnOutDoencas("");
        setAmnTratRealizados("");
        setAmnTratAtual(false);
        setAmnTratAtualObs("");
        setAmnMedicacao(false);
        setAmnMedObs("");
        setAmnConsideracoes("");
        setAnexosList([]);

        setAmnIdFuncionario({ "pessoa": { "pesNome": "" } });
        setAmnIdPraticante({ "pessoa": { "pesNome": "" } });
    }

    const enviaJsonRemove = () => {
        api.delete("/removeFichaAnamnese?amnId=" + amnId);
    }

    const atualizaDlgPesquisaPraticantes = async () => {
        setListPraticantes(await (await api.get("/pesquisaPraticantes")).data);
        setAbrirPesquisaPraticante(true);
    }

    const atualizaDlgPesquisaFuncionarios = async () => {
        setListFuncionarios(await (await api.get("/pesquisaFuncionario?pesCpf=&pesNome=")).data);
        setAbrirPesquisaFuncionario(true);
    }

    const atualizaPraticanteSelecionado = async (item) => {
        await setAmnIdPraticante(item);
        setAbrirPesquisaPraticante(false);
    }

    const atualizaFuncionarioSelecionado = async (item) => {
        await setAmnIdFuncionario(item);
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
        let file = convertBase64ToFile(e.aamnExamComp, e.aamnDescricao);
        saveAs(file, e.aamnDescricao);
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
            "aamnId": null,
            "aamnDescricao": "",
            "aamnExamComp": "",
            "fichaAnamnese": ""
        }
        try {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    jsonItem.aamnExamComp = reader.result;
                    jsonItem.aamnDescricao = e.target.files[0].name;
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
                <Table size="sm">
                    <thead>
                        <tr>
                            <th>Descrição</th>
                            <th className='center'>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            slice.map(item => <LinhaTabelaDocumentos key={item.aamnDescricao} item={item} removeDocumentoSelecionado={removeDocumentoSelecionado} />)
                        }
                    </tbody>
                </Table>
                <TableFooter range={range} slice={slice} setPage={setPage} page={pagina} />
            </>
        );
    };

    const LinhaTabelaDocumentos = ({ item, removeDocumentoSelecionado }) => {
        const { aamnDescricao } = item;

        const removerItem = e => removeDocumentoSelecionado(item);
        const baixarItem = e => baixarArquivo(item);

        return <tr>
            <td width={'100px'}>{aamnDescricao}</td>

            <td width={'80px'} className='center'>
                <Button className='btn-succes' onClick={baixarItem}><BsDownload /></Button>
                <Button className='btn-danger' onClick={removerItem}><BsFillTrashFill /></Button>
            </td>
        </tr>
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (amnIdPraticante.pessoa.pesNome === "") {
            mensagemCustomizada("Selecione um praticante", "warning");
            document.getElementById("botaoPraticante").focus();
            return;
        }
        if (amnIdFuncionario.pessoa.pesNome === "") {
            mensagemCustomizada("Selecione um funcionário", "warning");
            document.getElementById("botaoFuncionario").focus();
            return;
        }
        enviaJsonGravar();
        limparCamposFormulario();
    }

    const movimentoFichaAnamnese = () => {
        return (
            <div>
                <Menu />
                <ReactNotifications />
                <Container>
                    <Form onSubmit={handleSubmit}>
                        <br />
                        <Row>
                            <h3>Ficha de Anamnese</h3>
                        </Row>
                        <Row>
                            <Col md="2">
                                <Form.Label>Código</Form.Label>
                                <Form.Control value={amnId} type="text" disabled />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="2">
                                <Form.Label>Data</Form.Label>
                                <Form.Control value={amnData} type="date" required
                                    onChange={(e) => setAmnData(e.target.value)} />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <Form.Label>Praticante</Form.Label>
                                <InputConverter idBtn={"botaoPraticante"} descricao={amnIdPraticante.pessoa.pesNome} atualizaDlgPesquisa={atualizaDlgPesquisaPraticantes} />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <Form.Label>Funcionário</Form.Label>
                                <InputConverter idBtn={"botaoFuncionario"} descricao={amnIdFuncionario.pessoa.pesNome} atualizaDlgPesquisa={atualizaDlgPesquisaFuncionarios} />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col md="6">
                                <Form.Label>Pais:</Form.Label>
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaPaisCasados}
                                    type="checkbox" label="Casados" />
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaPaisCasados}
                                    type="checkbox" label="Separados" />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col md="6">
                                <Form.Label>Reação da criança a situação:</Form.Label>
                                <Form.Control value={amnReacSeparacao}
                                    onChange={(e) => setAmnReacSeparacao(e.target.value)}
                                    type="text" as="textarea" className='textArea' />
                            </Col>
                            <Col md="6">
                                <Form.Label>Em caso de separação, a criança vive com:</Form.Label>
                                <Form.Control value={amnMoradia}
                                    onChange={(e) => setAmnMoradia(e.target.value)}
                                    type="text" as="textarea" className='textArea' />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col md="6">
                                <Form.Label>Possui Irmão(a/os/as):</Form.Label>
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaPossuiIrmao}
                                    type="checkbox" label="Sim" />
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaPossuiIrmao}
                                    type="checkbox" label="Não" />
                            </Col>
                            <Col md="6">
                                <Form.Label>Em caso de afirmação, informe sexo e idade:</Form.Label>
                                <Form.Control value={amnInfosIrmao}
                                    onChange={(e) => setAmnInfosIrmao(e.target.value)}
                                    type="text" as="textarea" className='textArea' />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col md="6">
                                <Form.Label>Filho:</Form.Label>
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaAdotado}
                                    type="checkbox" label="Biológico" />
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaAdotado}
                                    type="checkbox" label="Adotivo" />
                            </Col>
                            <Col md="6">
                                <Form.Label>A criança é ciente de sua adoção?</Form.Label>
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaCienciaAdocao}
                                    type="checkbox" label="Sim" />
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaCienciaAdocao}
                                    type="checkbox" label="Não" />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col md="6">
                                <Form.Label>Reação da criança a situação:</Form.Label>
                                <Form.Control value={amnReacAdocao}
                                    onChange={(e) => setAmnReacAdocao(e.target.value)}
                                    type="text" as="textarea" className='textArea' />
                            </Col>
                            <Col md="6">
                                <Form.Label>Hipótese Diagnóstica (HD):</Form.Label>
                                <Form.Control value={amnHipDiag}
                                    onChange={(e) => setAmnHipDiag(e.target.value)}
                                    type="text" as="textarea" className='textArea' />
                            </Col>
                        </Row>
                        <br />
                        <br />
                        <Row>
                            <Form.Label className='bold'>Queixa Inicial:</Form.Label>
                            <Col md="6">
                                <Form.Label>Qual o motivo da procura por equoterapia:</Form.Label>
                                <Form.Control value={amnMotivoEquo}
                                    onChange={(e) => setAmnMotivoEquo(e.target.value)}
                                    type="text" as="textarea" className='textArea' />
                            </Col>
                            <Col md="6">
                                <Form.Label>Quais espectativas para o tratamento:</Form.Label>
                                <Form.Control value={amnExpecTrat}
                                    onChange={(e) => setAmnExpecTrat(e.target.value)}
                                    type="text" as="textarea" className='textArea' />
                            </Col>
                        </Row>
                        <br />
                        <br />
                        <Row>
                            <Form.Label className='bold'>Histórico:</Form.Label>
                            <Col md="6">
                                <Form.Label>Gestação:</Form.Label>
                                <Form.Select required value={amnTpGest}
                                    onChange={(e) => setAmnTpGest(e.target.value)}>
                                    <option>Selecione</option>
                                    <option value="T">A termo</option>
                                    <option value="E">Prematura</option>
                                    <option value="O">Pós-matura</option>
                                </Form.Select>
                            </Col>
                            <Col md="6">
                                <Form.Label>Parto:</Form.Label>
                                <Form.Select required value={amnTpParto}
                                    onChange={(e) => setAmnTpParto(e.target.value)}>
                                    <option>Selecione</option>
                                    <option value="N">Normal</option>
                                    <option value="C">Cesariana</option>
                                    <option value="I">Induzido</option>
                                    <option value="F">Fórceps</option>
                                </Form.Select>
                            </Col>

                        </Row>
                        <br />
                        <Row>
                            <Col md="6">
                                <Form.Label>Saúde da mãe durante a gravidez:</Form.Label>
                                <Form.Control value={amnSaudeMaeGestacao}
                                    onChange={(e) => setAmnSaudeMaeGestacao(e.target.value)}
                                    type="text" as="textarea" className='textArea' />
                            </Col>
                            <Col md="6">
                                <Form.Label>Acontecimentos relevantes ao longo do período:</Form.Label>
                                <Form.Control value={amnAcontGestacao}
                                    onChange={(e) => setAmnAcontGestacao(e.target.value)}
                                    type="text" as="textarea" className='textArea' />
                            </Col>

                        </Row>
                        <br />
                        <Row>
                            <Col md="6">
                                <Form.Label>Fatos relevantes:</Form.Label>
                                <Form.Control value={amnPartoObs}
                                    onChange={(e) => setAmnPartoObs(e.target.value)}
                                    type="text" as="textarea" className='textArea' />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col md="4">
                                <Form.Label>Icterícia - amarelão:</Form.Label>
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaAmarelao}
                                    type="checkbox" label="Sim" />
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaAmarelao}
                                    type="checkbox" label="Não" />
                            </Col>
                            <Col md="4">
                                <Form.Label>Febre:</Form.Label>
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaFebre}
                                    type="checkbox" label="Sim" />
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaFebre}
                                    type="checkbox" label="Não" />
                            </Col>
                            <Col md="4">
                                <Form.Label>Permanencia na incobadora:</Form.Label>
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaPermIncubadora}
                                    type="checkbox" label="Sim" />
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaPermIncubadora}
                                    type="checkbox" label="Não" />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col md="6">
                                <Form.Label>Observações:</Form.Label>
                                <Form.Control value={amnTempoIncubadora}
                                    onChange={(e) => setAmnTempoIncubadora(e.target.value)}
                                    type="text" as="textarea" className='textArea' />
                            </Col>
                            <Col md="6">
                                <Form.Label>Reações dos pais e familiares:</Form.Label>
                                <Form.Control value={amnReacPaisFam}
                                    onChange={(e) => setAmnReacPaisFam(e.target.value)}
                                    type="text" as="textarea" className='textArea' />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col md="6">
                                <Form.Label>Amamentação:</Form.Label>
                                <Form.Select required value={amnTpAmamentacao}
                                    onChange={(e) => setAmnTpAmamentacao(e.target.value)}>
                                    <option>Selecione</option>
                                    <option value="M">Materna</option>
                                    <option value="A">Artificial/desmame</option>
                                </Form.Select>
                            </Col>
                            <Col md="6">
                                <Form.Label>Dificuldade ou atraso no controle do esfíncter:</Form.Label>
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaDifEsfincter}
                                    type="checkbox" label="Sim" />
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaDifEsfincter}
                                    type="checkbox" label="Não" />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col md="6">
                                <Form.Label>Tem enurese noturna:</Form.Label>
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaEnureseNotu}
                                    type="checkbox" label="Sim" />
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaEnureseNotu}
                                    type="checkbox" label="Não" />
                            </Col>
                            <Col md="6">
                                <Form.Label>Pertubações (pesadelos, sonambulismo, insônia...):</Form.Label>
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaPertNot}
                                    type="checkbox" label="Sim" />
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaPertNot}
                                    type="checkbox" label="Não" />
                            </Col>

                        </Row>
                        <br />
                        <Row>
                            <Col md="6">
                                <Form.Label>Observações:</Form.Label>
                                <Form.Control value={amnPertObs}
                                    onChange={(e) => setAmnPertObs(e.target.value)}
                                    type="text" as="textarea" className='textArea' />
                            </Col>
                        </Row>
                        <br />
                        <Row>

                            <Col md="6">
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaDormeSoz}
                                    type="checkbox" label="Dorme sozinho" />
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaDormePais}
                                    type="checkbox" label="Dorme no quarto dos pais" />
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaDivQuarto}
                                    type="checkbox" label="Divide o quarto com alguém" />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="3">
                                <Form.Label>Quem:</Form.Label>
                                <Form.Control value={amnDivQuartoObs} maxLength={20}
                                    onChange={(e) => setAmnDivQuartoObs(e.target.value)}
                                    type="text" />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col md="6">
                                <Form.Label>Possui habitos especiais (requer presença de alguém, medos...):</Form.Label>
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaHabitEspec}
                                    type="checkbox" label="Sim" />
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaHabitEspec}
                                    type="checkbox" label="Não" />
                            </Col>
                            <Col md="6">
                                <Form.Label>Quais:</Form.Label>
                                <Form.Control value={amnHabitEspecObs}
                                    onChange={(e) => setAmnHabitEspecObs(e.target.value)}
                                    type="text" as="textarea" className='textArea' />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col md="3">
                                <Form.Label>Engatinha:</Form.Label>
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaEngatinha}
                                    type="checkbox" label="Sim" />
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaEngatinha}
                                    type="checkbox" label="Não" />
                            </Col>
                            <Col md="3">
                                <Form.Label>Anda:</Form.Label>
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaAnda}
                                    type="checkbox" label="Sim" />
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaAnda}
                                    type="checkbox" label="Não" />
                            </Col>
                            <Col md="3">
                                <Form.Label>Senta:</Form.Label>
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaSenta}
                                    type="checkbox" label="Sim" />
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaSenta}
                                    type="checkbox" label="Não" />
                            </Col>
                            <Col md="3">
                                <Form.Label>Corre:</Form.Label>
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaCorre}
                                    type="checkbox" label="Sim" />
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaCorre}
                                    type="checkbox" label="Não" />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col md="6">
                                <Form.Label>Tonicidade (0-1 ano/musculatura firme):</Form.Label>
                                <Form.Control value={amnTonicidade} maxLength={20}
                                    onChange={(e) => setAmnTonicidade(e.target.value)}
                                    type="text" />
                            </Col>
                            <Col md="6">
                                <Form.Label>Equilibrio (1-2 anos):</Form.Label>
                                <Form.Control value={amnEquilibrio} maxLength={20}
                                    onChange={(e) => setAmnEquilibrio(e.target.value)}
                                    type="text" />
                            </Col>

                        </Row>
                        <br />
                        <Row>
                            <Col md="6">
                                <Form.Label>Noção corporal (3-4 anos):</Form.Label>
                                <Form.Control value={amnNocaoCorp} maxLength={20}
                                    onChange={(e) => setAmnNocaoCorp(e.target.value)}
                                    type="text" />
                            </Col>
                            <Col md="6">
                                <Form.Label>Lateralização (5-6 anos):</Form.Label>
                                <Form.Control value={amnLateralizacao} maxLength={20}
                                    onChange={(e) => setAmnLateralizacao(e.target.value)}
                                    type="text" />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col md="6">
                                <Form.Label>Praxia global (movimento voluntário e consciente ou automatizado):</Form.Label>
                                <Form.Control value={amnPraxiaGlobal} maxLength={20}
                                    onChange={(e) => setAmnPraxiaGlobal(e.target.value)}
                                    type="text" />
                            </Col>
                            <Col md="6">
                                <Form.Label>Praxia fina (preensão de objetos, segurar, recortar...):</Form.Label>
                                <Form.Control value={amnPraxiaFina} maxLength={20}
                                    onChange={(e) => setAmnPraxiaFina(e.target.value)}
                                    type="text" />
                            </Col>

                        </Row>
                        <br />
                        <Row>
                            <Col md="6">
                                <Form.Label>Estruturação espaço-temporal:</Form.Label>
                                <Form.Control value={amnEstEspCorp} maxLength={20}
                                    onChange={(e) => setAmnEstEspCorp(e.target.value)}
                                    type="text" />
                            </Col>
                        </Row>
                        <br />
                        <br />
                        <Row>
                            <Form.Label className='bold'>Desenvolvimento cognitivo:</Form.Label>
                            <Col md="6">
                                <Form.Label>Desenvolvimento dentro do esperado:</Form.Label>
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaDesvNormal}
                                    type="checkbox" label="Sim" />
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaDesvNormal}
                                    type="checkbox" label="Não" />
                            </Col>
                            <Col md="6">
                                <Form.Label>Fatos relevantes:</Form.Label>
                                <Form.Control value={amnDesvFatRel}
                                    onChange={(e) => setAmnDesvFatRel(e.target.value)}
                                    type="text" as="textarea" className='textArea' />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col md="6">
                                <Form.Label>Linguagem verbal:</Form.Label>
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaLvFalaComp}
                                    type="checkbox" label="Fala completa" />
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaLvApenasPal}
                                    type="checkbox" label="Apenas palavras" />
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaLvVocalizacao}
                                    type="checkbox" label="Vocalização" />
                            </Col>
                            <Col md="6">
                                <Form.Label>Linguagem Gestual:</Form.Label>
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaLgApontaObj}
                                    type="checkbox" label="Aponta objetos" />
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaLgMostOqq}
                                    type="checkbox" label="Mostra o que quer" />
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaLgExpFac}
                                    type="checkbox" label="Expressão facial" />
                            </Col>
                        </Row>
                        <br />
                        <br />
                        <Row>
                            <Form.Label className='bold'>Atividade de vida diária:</Form.Label>
                            <Col md="4">
                                <Form.Label>Toma banho sozinho:</Form.Label>
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaBanhoSozinho}
                                    type="checkbox" label="Sim" />
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaBanhoSozinho}
                                    type="checkbox" label="Não" />
                            </Col>
                            <Col md="4">
                                <Form.Label>Escova os dentes sozinho:</Form.Label>
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaEscovaSozinho}
                                    type="checkbox" label="Sim" />
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaEscovaSozinho}
                                    type="checkbox" label="Não" />
                            </Col>
                            <Col md="4">
                                <Form.Label>Usa o banheiro sozinho:</Form.Label>
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaBanSozinho}
                                    type="checkbox" label="Sim" />
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaBanSozinho}
                                    type="checkbox" label="Não" />
                            </Col>

                        </Row>
                        <br />
                        <Row>
                            <Col md="4">
                                <Form.Label>Necessita de auxílio para se vestir ou despir:</Form.Label>
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaAuxVestir}
                                    type="checkbox" label="Sim" />
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaAuxVestir}
                                    type="checkbox" label="Não" />
                            </Col>
                            <Col md="4">
                                <Form.Label>Controle de esfíncteres:</Form.Label>
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaContEsfin}
                                    type="checkbox" label="Sim" />
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaContEsfin}
                                    type="checkbox" label="Não" />
                            </Col>
                            <Col md="4">
                                <Form.Label>Alimenta-se sozinho:</Form.Label>
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaComeSoz}
                                    type="checkbox" label="Sim" />
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaComeSoz}
                                    type="checkbox" label="Não" />
                            </Col>


                        </Row>
                        <br />
                        <Row>
                            <Col md="6">
                                <Form.Label>Em que idade se deu a retirada das fraldas:</Form.Label>
                                <Form.Control value={amnIdadeRetFral}
                                    onChange={(e) => setAmnIdadeRetFral(e.target.value)}
                                    type="integer" as="textarea" className='textArea' />
                            </Col>
                        </Row>
                        <br />
                        <br />
                        <Row>
                            <Form.Label className='bold'>Aspectos perceptivos:</Form.Label>
                            <Col md="6">
                                <Form.Label>Apresenta alguma dificuldade para enxergar:</Form.Label>
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaDifVer}
                                    type="checkbox" label="Sim" />
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaDifVer}
                                    type="checkbox" label="Não" />
                            </Col>
                            <Col md="6">
                                <Form.Label>Aparenta ter alguma dificuldade para ouvir:</Form.Label>
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaDifOuvir}
                                    type="checkbox" label="Sim" />
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaDifOuvir}
                                    type="checkbox" label="Não" />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col md="6">
                                <Form.Label>Aspectos emocionais:</Form.Label>
                                <Form.Select required value={amnAspctEmoc}
                                    onChange={(e) => setAmnAspctEmoc(e.target.value)}>
                                    <option>Selecione</option>
                                    <option value="T">Tranquilo</option>
                                    <option value="A">Ansioso</option>
                                    <option value="I">Intolerante</option>
                                    <option value="P">Introspectivo</option>
                                    <option value="L">Alegre</option>
                                    <option value="F">Afetuoso</option>
                                </Form.Select>
                            </Col>
                            <Col md="6">
                                <Form.Label>Outros, quais? E em que situação:</Form.Label>
                                <Form.Control value={amnAspctEmocObs}
                                    onChange={(e) => setAmnAspctEmocObs(e.target.value)}
                                    type="text" as="textarea" className='textArea' />
                            </Col>

                        </Row>
                        <br />
                        <Row>
                            <Col md="6">
                                <Form.Label>Como os pais e outras pessoas o veem:</Form.Label>
                                <Form.Control value={amnPaisVeem}
                                    onChange={(e) => setAmnPaisVeem(e.target.value)}
                                    type="text" as="textarea" className='textArea' />
                            </Col>
                        </Row>
                        <br />
                        <br />
                        <Row>
                            <Form.Label className='bold'>Sociabilização:</Form.Label>
                            <Col md="6">
                                <Form.Label>Interage com familiares, amigos e pessoas estranhas:</Form.Label>
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaInterage}
                                    type="checkbox" label="Sim" />
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaInterage}
                                    type="checkbox" label="Não" />
                            </Col>
                            <Col md="6">
                                <Form.Label>Descreva:</Form.Label>
                                <Form.Control value={amnInterageObs}
                                    onChange={(e) => setAmnInterageObs(e.target.value)}
                                    type="text" as="textarea" className='textArea' />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col md="6">
                                <Form.Label>Prefere ficar sozinho ou em companhia de alguém:</Form.Label>
                                <Form.Control value={amnFicarSoz}
                                    onChange={(e) => setAmnFicarSoz(e.target.value)}
                                    type="text" as="textarea" className='textArea' />
                            </Col>
                            <Col md="6">
                                <Form.Label>Brinca com outras crianças ou prefere brincar sozinho:</Form.Label>
                                <Form.Control value={amnBrincarSoz}
                                    onChange={(e) => setAmnBrincarSoz(e.target.value)}
                                    type="text" as="textarea" className='textArea' />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col md="6">
                                <Form.Label>Quais as brincadeiras ou brinquedos e atividades que mais gosta:</Form.Label>
                                <Form.Control value={amnBrincarObs}
                                    onChange={(e) => setAmnBrincarObs(e.target.value)}
                                    type="text" as="textarea" className='textArea' />
                            </Col>
                            <Col md="3">
                                <Form.Label>Tem animais de estimação:</Form.Label>
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaAnimaisEstim}
                                    type="checkbox" label="Sim" />
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaAnimaisEstim}
                                    type="checkbox" label="Não" />
                            </Col>
                            <Col md="3">
                                <Form.Label>Interage com eles:</Form.Label>
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaInterageAnimais}
                                    type="checkbox" label="Sim" />
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaInterageAnimais}
                                    type="checkbox" label="Não" />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col md="6">
                                <Form.Label>Gosta de algum animal específico:</Form.Label>
                                <Form.Control value={amnAniEspcfc} maxLength={20}
                                    onChange={(e) => setAmnAniEspcfc(e.target.value)}
                                    type="text" />
                            </Col>
                            <Col md="6">
                                <Form.Label>Adapta-se facilmente a novos lugares e pessoas:</Form.Label>
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaAdaptaLugar}
                                    type="checkbox" label="Sim" />
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaAdaptaLugar}
                                    type="checkbox" label="Não" />
                            </Col>
                        </Row>
                        <br />
                        <br />
                        <Row>
                            <Form.Label className='bold'>Tendências próprias:</Form.Label>
                            <Col md="6">
                                <Form.Label>Atende as intervenções quando está desobedecendo:</Form.Label>
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaAtendeInterv}
                                    type="checkbox" label="Sim" />
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaAtendeInterv}
                                    type="checkbox" label="Não" />
                            </Col>
                            <Col md="6">
                                <Form.Label>Atende orientações simples:</Form.Label>
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaAtendeOrient}
                                    type="checkbox" label="Sim" />
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaAtendeOrient}
                                    type="checkbox" label="Não" />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col md="6">
                                <Form.Label>Apresenta choro fácil:</Form.Label>
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaChoroFacil}
                                    type="checkbox" label="Sim" />
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaChoroFacil}
                                    type="checkbox" label="Não" />
                            </Col>
                            <Col md="6">
                                <Form.Label>Em quais situações:</Form.Label>
                                <Form.Control value={amnChoroObs}
                                    onChange={(e) => setAmnChoroObs(e.target.value)}
                                    type="text" as="textarea" className='textArea' />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col md="6">
                                <Form.Label>Recusa auxílio:</Form.Label>
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaRecAuxilio}
                                    type="checkbox" label="Sim" />
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaRecAuxilio}
                                    type="checkbox" label="Não" />
                            </Col>
                            <Col md="6">
                                <Form.Label>Em quais situações:</Form.Label>
                                <Form.Control value={amnRecAuxObs}
                                    onChange={(e) => setAmnRecAuxObs(e.target.value)}
                                    type="text" as="textarea" className='textArea' />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col md="6">
                                <Form.Label>Tem resistência ao toque:</Form.Label>
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaResistToque}
                                    type="checkbox" label="Sim" />
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaResistToque}
                                    type="checkbox" label="Não" />
                            </Col>
                        </Row>
                        <br />
                        <br />
                        <Row>
                            <Form.Label className='bold'>História clínica:</Form.Label>
                            <Col md="6">
                                <Form.Label>Ocorreram:</Form.Label>
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaBronquite}
                                    type="checkbox" label="Bronquite" />
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaAlergias}
                                    type="checkbox" label="Alergias" />
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaAsma}
                                    type="checkbox" label="Asma" />
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaConvulsao}
                                    type="checkbox" label="Convulsões" />
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaVirose}
                                    type="checkbox" label="Viroses infantis" />
                            </Col>
                            <Col md="6">
                                <Form.Label>Internações cirúrgicas:</Form.Label>
                                <Form.Control value={amnInternacoes}
                                    onChange={(e) => setAmnInternacoes(e.target.value)}
                                    type="text" as="textarea" className='textArea' />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col md="6">
                                <Form.Label>Outras doenças:</Form.Label>
                                <Form.Control value={amnOutDoencas}
                                    onChange={(e) => setAmnOutDoencas(e.target.value)}
                                    type="text" as="textarea" className='textArea' />
                            </Col>
                            <Col md="6">
                                <Form.Label>Tratamentos realizados:</Form.Label>
                                <Form.Control value={amnTratRealizados}
                                    onChange={(e) => setAmnTratRealizados(e.target.value)}
                                    type="text" as="textarea" className='textArea' />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col md="6">
                                <Form.Label>Atualmente faz algum tratamento:</Form.Label>
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaTratAtual}
                                    type="checkbox" label="Sim" />
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaTratAtual}
                                    type="checkbox" label="Não" />
                            </Col>
                            <Col md="6">
                                <Form.Label>Quais:</Form.Label>
                                <Form.Control value={amnTratAtualObs}
                                    onChange={(e) => setAmnTratAtualObs(e.target.value)}
                                    type="text" as="textarea" className='textArea' />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col md="6">
                                <Form.Label>Usa medicação:</Form.Label>
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaMedicacao}
                                    type="checkbox" label="Sim" />
                                <Form.Check
                                    defaultChecked={false} onClick={selecionaMedicacao}
                                    type="checkbox" label="Não" />
                            </Col>
                            <Col md="6">
                                <Form.Label>Qual:</Form.Label>
                                <Form.Control value={amnMedObs}
                                    onChange={(e) => setAmnMedObs(e.target.value)}
                                    type="text" as="textarea" className='textArea' />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col md="6">
                                <Form.Label>Colocações que considera importante:</Form.Label>
                                <Form.Control value={amnConsideracoes}
                                    onChange={(e) => setAmnConsideracoes(e.target.value)}
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
                    <PesquisaFichaAnamnese setValores={setList} valores={list} atualizaItemSelecionado={atualizaItemSelecionado} setAbrirPesquisa={setAbrirPesquisa} />
                }
                {abrirPesquisaPraticante &&
                    <PesquisaPraticantes setValores={setListPraticantes} valores={listPraticantes} atualizaItemSelecionado={atualizaPraticanteSelecionado} setAbrirPesquisa={setAbrirPesquisaPraticante} />
                }
                {abrirPesquisaFuncionario &&
                    <PesquisaFuncionario setValores={setListFuncionarios} valores={listFuncionarios} atualizaItemSelecionado={atualizaFuncionarioSelecionado} setAbrirPesquisa={setAbrirPesquisaFuncionario} />
                }
                <Footer />
            </div >
        )
    }
    return movimentoFichaAnamnese();


}
export default movimentoFichaAnamnese;
