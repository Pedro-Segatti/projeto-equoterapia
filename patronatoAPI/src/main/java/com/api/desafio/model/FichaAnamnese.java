package com.api.desafio.model;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 *
 * @author Pedro
 */
@Entity
@Table(name = "ficha_anamnese")
public class FichaAnamnese implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "AMN_ID")
    private Integer amnId;
    @Column(name = "AMN_PAIS_CASADOS")
    private Boolean amnPaisCasados;
    @Lob
    @Column(name = "AMN_REAC_SEPARACAO")
    private String amnReacSeparacao;
    @Lob
    @Column(name = "AMN_MORADIA")
    private String amnMoradia;
    @Column(name = "AMN_POSSUI_IRMAO")
    private Boolean amnPossuiIrmao;
    @Lob
    @Column(name = "AMN_INFOS_IRMAO")
    private String amnInfosIrmao;
    @Column(name = "AMN_ADOTADO")
    private Boolean amnAdotado;
    @Column(name = "AMN_CIENCIA_ADOCAO")
    private Boolean amnCienciaAdocao;
    @Lob
    @Column(name = "AMN_REAC_ADOCAO")
    private String amnReacAdocao;
    @Lob
    @Column(name = "AMN_HIP_DIAG")
    private String amnHipDiag;
    @Lob
    @Column(name = "AMN_MOTIVO_EQUO")
    private String amnMotivoEquo;
    @Lob
    @Column(name = "AMN_EXPEC_TRAT")
    private String amnExpecTrat;
    @Column(name = "AMN_TP_GEST")
    private String amnTpGest;
    @Lob
    @Column(name = "AMN_SAUDE_MAE_GESTACAO")
    private String amnSaudeMaeGestacao;
    @Lob
    @Column(name = "AMN_ACONT_GESTACAO")
    private String amnAcontGestacao;
    @Column(name = "AMN_TP_PARTO")
    private String amnTpParto;
    @Lob
    @Column(name = "AMN_PARTO_OBS")
    private String amnPartoObs;
    @Column(name = "AMN_AMARELAO")
    private Boolean amnAmarelao;
    @Column(name = "AMN_FEBRE")
    private Boolean amnFebre;
    @Column(name = "AMN_PERM_INCUBADORA")
    private Boolean amnPermIncubadora;
    @Column(name = "AMN_TEMPO_INCUBADORA")
    private Integer amnTempoIncubadora;
    @Lob
    @Column(name = "AMN_REAC_PAIS_FAM")
    private String amnReacPaisFam;
    @Column(name = "AMN_TP_AMAMENTACAO")
    private String amnTpAmamentacao;
    @Column(name = "AMN_DIF_ESFINCTER")
    private Boolean amnDifEsfincter;
    @Column(name = "AMN_ENURESE_NOTU")
    private Boolean amnEnureseNotu;
    @Column(name = "AMN_PERT_NOT")
    private Boolean amnPertNot;
    @Lob
    @Column(name = "AMN_PERT_OBS")
    private String amnPertObs;
    @Column(name = "AMN_DORME_SOZ")
    private Boolean amnDormeSoz;
    @Column(name = "AMN_DORME_PAIS")
    private Boolean amnDormePais;
    @Column(name = "AMN_DIV_QUARTO")
    private Boolean amnDivQuarto;
    @Lob
    @Column(name = "AMN_DIV_QUARTO_OBS")
    private String amnDivQuartoObs;
    @Column(name = "AMN_HABIT_ESPEC")
    private Boolean amnHabitEspec;
    @Column(name = "AMN_ENGATINHA")
    private Boolean amnEngatinha;
    @Column(name = "AMN_SENTA")
    private Boolean amnSenta;
    @Column(name = "AMN_ANDA")
    private Boolean amnAnda;
    @Column(name = "AMN_CORRE")
    private Boolean amnCorre;
    @Lob
    @Column(name = "AMN_TONICIDADE")
    private String amnTonicidade;
    @Lob
    @Column(name = "AMN_EQUILIBRIO")
    private String amnEquilibrio;
    @Lob
    @Column(name = "AMN_LATERALIZACAO")
    private String amnLateralizacao;
    @Lob
    @Column(name = "AMN_NOCAO_CORP")
    private String amnNocaoCorp;
    @Lob
    @Column(name = "AMN_EST_ESP_CORP")
    private String amnEstEspCorp;
    @Lob
    @Column(name = "AMN_PRAXIA_GLOBAL")
    private String amnPraxiaGlobal;
    @Lob
    @Column(name = "AMN_PRAXIA_FINA")
    private String amnPraxiaFina;
    @Column(name = "AMN_DESV_NORMAL")
    private Boolean amnDesvNormal;
    @Lob
    @Column(name = "AMN_DESV_FAT_REL")
    private String amnDesvFatRel;
    @Column(name = "AMN_LV_FALA_COMP")
    private Boolean amnLvFalaComp;
    @Column(name = "AMN_LV_APENAS_PAL")
    private Boolean amnLvApenasPal;
    @Column(name = "AMN_LV_VOCALIZACAO")
    private Boolean amnLvVocalizacao;
    @Column(name = "AMN_LG_APONTA_OBJ")
    private Boolean amnLgApontaObj;
    @Column(name = "AMN_LG_MOST_OQQ")
    private Boolean amnLgMostOqq;
    @Column(name = "AMN_LG_EXP_FAC")
    private Boolean amnLgExpFac;
    @Column(name = "AMN_BANHO_SOZINHO")
    private Boolean amnBanhoSozinho;
    @Column(name = "AMN_ESCOVA_SOZINHO")
    private Boolean amnEscovaSozinho;
    @Column(name = "AMN_BAN_SOZINHO")
    private Boolean amnBanSozinho;
    @Column(name = "AMN_AUX_VESTIR")
    private Boolean amnAuxVestir;
    @Column(name = "AMN_CONT_ESFIN")
    private Boolean amnContEsfin;
    @Column(name = "AMN_COME_SOZ")
    private Boolean amnComeSoz;
    @Column(name = "AMN_IDADE_RET_FRAL")
    private Integer amnIdadeRetFral;
    @JoinColumn(name = "AMN_ID_FUNCIONARIO", referencedColumnName = "FUNC_ID")
    @ManyToOne(optional = false)
    private Funcionario amnIdFuncionario;
    @JoinColumn(name = "AMN_ID_PRATICANTE", referencedColumnName = "PRAT_ID")
    @ManyToOne(optional = false)
    private Praticante amnIdPraticante;

    public FichaAnamnese() {
    }

    public FichaAnamnese(Integer amnId) {
        this.amnId = amnId;
    }

    public Integer getAmnId() {
        return amnId;
    }

    public void setAmnId(Integer amnId) {
        this.amnId = amnId;
    }

    public Boolean getAmnPaisCasados() {
        return amnPaisCasados;
    }

    public void setAmnPaisCasados(Boolean amnPaisCasados) {
        this.amnPaisCasados = amnPaisCasados;
    }

    public String getAmnReacSeparacao() {
        return amnReacSeparacao;
    }

    public void setAmnReacSeparacao(String amnReacSeparacao) {
        this.amnReacSeparacao = amnReacSeparacao;
    }

    public String getAmnMoradia() {
        return amnMoradia;
    }

    public void setAmnMoradia(String amnMoradia) {
        this.amnMoradia = amnMoradia;
    }

    public Boolean getAmnPossuiIrmao() {
        return amnPossuiIrmao;
    }

    public void setAmnPossuiIrmao(Boolean amnPossuiIrmao) {
        this.amnPossuiIrmao = amnPossuiIrmao;
    }

    public String getAmnInfosIrmao() {
        return amnInfosIrmao;
    }

    public void setAmnInfosIrmao(String amnInfosIrmao) {
        this.amnInfosIrmao = amnInfosIrmao;
    }

    public Boolean getAmnAdotado() {
        return amnAdotado;
    }

    public void setAmnAdotado(Boolean amnAdotado) {
        this.amnAdotado = amnAdotado;
    }

    public Boolean getAmnCienciaAdocao() {
        return amnCienciaAdocao;
    }

    public void setAmnCienciaAdocao(Boolean amnCienciaAdocao) {
        this.amnCienciaAdocao = amnCienciaAdocao;
    }

    public String getAmnReacAdocao() {
        return amnReacAdocao;
    }

    public void setAmnReacAdocao(String amnReacAdocao) {
        this.amnReacAdocao = amnReacAdocao;
    }

    public String getAmnHipDiag() {
        return amnHipDiag;
    }

    public void setAmnHipDiag(String amnHipDiag) {
        this.amnHipDiag = amnHipDiag;
    }

    public String getAmnMotivoEquo() {
        return amnMotivoEquo;
    }

    public void setAmnMotivoEquo(String amnMotivoEquo) {
        this.amnMotivoEquo = amnMotivoEquo;
    }

    public String getAmnExpecTrat() {
        return amnExpecTrat;
    }

    public void setAmnExpecTrat(String amnExpecTrat) {
        this.amnExpecTrat = amnExpecTrat;
    }

    public String getAmnTpGest() {
        return amnTpGest;
    }

    public void setAmnTpGest(String amnTpGest) {
        this.amnTpGest = amnTpGest;
    }

    public String getAmnSaudeMaeGestacao() {
        return amnSaudeMaeGestacao;
    }

    public void setAmnSaudeMaeGestacao(String amnSaudeMaeGestacao) {
        this.amnSaudeMaeGestacao = amnSaudeMaeGestacao;
    }

    public String getAmnAcontGestacao() {
        return amnAcontGestacao;
    }

    public void setAmnAcontGestacao(String amnAcontGestacao) {
        this.amnAcontGestacao = amnAcontGestacao;
    }

    public String getAmnTpParto() {
        return amnTpParto;
    }

    public void setAmnTpParto(String amnTpParto) {
        this.amnTpParto = amnTpParto;
    }

    public String getAmnPartoObs() {
        return amnPartoObs;
    }

    public void setAmnPartoObs(String amnPartoObs) {
        this.amnPartoObs = amnPartoObs;
    }

    public Boolean getAmnAmarelao() {
        return amnAmarelao;
    }

    public void setAmnAmarelao(Boolean amnAmarelao) {
        this.amnAmarelao = amnAmarelao;
    }

    public Boolean getAmnFebre() {
        return amnFebre;
    }

    public void setAmnFebre(Boolean amnFebre) {
        this.amnFebre = amnFebre;
    }

    public Boolean getAmnPermIncubadora() {
        return amnPermIncubadora;
    }

    public void setAmnPermIncubadora(Boolean amnPermIncubadora) {
        this.amnPermIncubadora = amnPermIncubadora;
    }

    public Integer getAmnTempoIncubadora() {
        return amnTempoIncubadora;
    }

    public void setAmnTempoIncubadora(Integer amnTempoIncubadora) {
        this.amnTempoIncubadora = amnTempoIncubadora;
    }

    public String getAmnReacPaisFam() {
        return amnReacPaisFam;
    }

    public void setAmnReacPaisFam(String amnReacPaisFam) {
        this.amnReacPaisFam = amnReacPaisFam;
    }

    public String getAmnTpAmamentacao() {
        return amnTpAmamentacao;
    }

    public void setAmnTpAmamentacao(String amnTpAmamentacao) {
        this.amnTpAmamentacao = amnTpAmamentacao;
    }

    public Boolean getAmnDifEsfincter() {
        return amnDifEsfincter;
    }

    public void setAmnDifEsfincter(Boolean amnDifEsfincter) {
        this.amnDifEsfincter = amnDifEsfincter;
    }

    public Boolean getAmnEnureseNotu() {
        return amnEnureseNotu;
    }

    public void setAmnEnureseNotu(Boolean amnEnureseNotu) {
        this.amnEnureseNotu = amnEnureseNotu;
    }

    public Boolean getAmnPertNot() {
        return amnPertNot;
    }

    public void setAmnPertNot(Boolean amnPertNot) {
        this.amnPertNot = amnPertNot;
    }

    public String getAmnPertObs() {
        return amnPertObs;
    }

    public void setAmnPertObs(String amnPertObs) {
        this.amnPertObs = amnPertObs;
    }

    public Boolean getAmnDormeSoz() {
        return amnDormeSoz;
    }

    public void setAmnDormeSoz(Boolean amnDormeSoz) {
        this.amnDormeSoz = amnDormeSoz;
    }

    public Boolean getAmnDormePais() {
        return amnDormePais;
    }

    public void setAmnDormePais(Boolean amnDormePais) {
        this.amnDormePais = amnDormePais;
    }

    public Boolean getAmnDivQuarto() {
        return amnDivQuarto;
    }

    public void setAmnDivQuarto(Boolean amnDivQuarto) {
        this.amnDivQuarto = amnDivQuarto;
    }

    public String getAmnDivQuartoObs() {
        return amnDivQuartoObs;
    }

    public void setAmnDivQuartoObs(String amnDivQuartoObs) {
        this.amnDivQuartoObs = amnDivQuartoObs;
    }

    public Boolean getAmnHabitEspec() {
        return amnHabitEspec;
    }

    public void setAmnHabitEspec(Boolean amnHabitEspec) {
        this.amnHabitEspec = amnHabitEspec;
    }

    public Boolean getAmnEngatinha() {
        return amnEngatinha;
    }

    public void setAmnEngatinha(Boolean amnEngatinha) {
        this.amnEngatinha = amnEngatinha;
    }

    public Boolean getAmnSenta() {
        return amnSenta;
    }

    public void setAmnSenta(Boolean amnSenta) {
        this.amnSenta = amnSenta;
    }

    public Boolean getAmnAnda() {
        return amnAnda;
    }

    public void setAmnAnda(Boolean amnAnda) {
        this.amnAnda = amnAnda;
    }

    public Boolean getAmnCorre() {
        return amnCorre;
    }

    public void setAmnCorre(Boolean amnCorre) {
        this.amnCorre = amnCorre;
    }

    public String getAmnTonicidade() {
        return amnTonicidade;
    }

    public void setAmnTonicidade(String amnTonicidade) {
        this.amnTonicidade = amnTonicidade;
    }

    public String getAmnEquilibrio() {
        return amnEquilibrio;
    }

    public void setAmnEquilibrio(String amnEquilibrio) {
        this.amnEquilibrio = amnEquilibrio;
    }

    public String getAmnLateralizacao() {
        return amnLateralizacao;
    }

    public void setAmnLateralizacao(String amnLateralizacao) {
        this.amnLateralizacao = amnLateralizacao;
    }

    public String getAmnNocaoCorp() {
        return amnNocaoCorp;
    }

    public void setAmnNocaoCorp(String amnNocaoCorp) {
        this.amnNocaoCorp = amnNocaoCorp;
    }

    public String getAmnEstEspCorp() {
        return amnEstEspCorp;
    }

    public void setAmnEstEspCorp(String amnEstEspCorp) {
        this.amnEstEspCorp = amnEstEspCorp;
    }

    public String getAmnPraxiaGlobal() {
        return amnPraxiaGlobal;
    }

    public void setAmnPraxiaGlobal(String amnPraxiaGlobal) {
        this.amnPraxiaGlobal = amnPraxiaGlobal;
    }

    public String getAmnPraxiaFina() {
        return amnPraxiaFina;
    }

    public void setAmnPraxiaFina(String amnPraxiaFina) {
        this.amnPraxiaFina = amnPraxiaFina;
    }

    public Boolean getAmnDesvNormal() {
        return amnDesvNormal;
    }

    public void setAmnDesvNormal(Boolean amnDesvNormal) {
        this.amnDesvNormal = amnDesvNormal;
    }

    public String getAmnDesvFatRel() {
        return amnDesvFatRel;
    }

    public void setAmnDesvFatRel(String amnDesvFatRel) {
        this.amnDesvFatRel = amnDesvFatRel;
    }

    public Boolean getAmnLvFalaComp() {
        return amnLvFalaComp;
    }

    public void setAmnLvFalaComp(Boolean amnLvFalaComp) {
        this.amnLvFalaComp = amnLvFalaComp;
    }

    public Boolean getAmnLvApenasPal() {
        return amnLvApenasPal;
    }

    public void setAmnLvApenasPal(Boolean amnLvApenasPal) {
        this.amnLvApenasPal = amnLvApenasPal;
    }

    public Boolean getAmnLvVocalizacao() {
        return amnLvVocalizacao;
    }

    public void setAmnLvVocalizacao(Boolean amnLvVocalizacao) {
        this.amnLvVocalizacao = amnLvVocalizacao;
    }

    public Boolean getAmnLgApontaObj() {
        return amnLgApontaObj;
    }

    public void setAmnLgApontaObj(Boolean amnLgApontaObj) {
        this.amnLgApontaObj = amnLgApontaObj;
    }

    public Boolean getAmnLgMostOqq() {
        return amnLgMostOqq;
    }

    public void setAmnLgMostOqq(Boolean amnLgMostOqq) {
        this.amnLgMostOqq = amnLgMostOqq;
    }

    public Boolean getAmnLgExpFac() {
        return amnLgExpFac;
    }

    public void setAmnLgExpFac(Boolean amnLgExpFac) {
        this.amnLgExpFac = amnLgExpFac;
    }

    public Boolean getAmnBanhoSozinho() {
        return amnBanhoSozinho;
    }

    public void setAmnBanhoSozinho(Boolean amnBanhoSozinho) {
        this.amnBanhoSozinho = amnBanhoSozinho;
    }

    public Boolean getAmnEscovaSozinho() {
        return amnEscovaSozinho;
    }

    public void setAmnEscovaSozinho(Boolean amnEscovaSozinho) {
        this.amnEscovaSozinho = amnEscovaSozinho;
    }

    public Boolean getAmnBanSozinho() {
        return amnBanSozinho;
    }

    public void setAmnBanSozinho(Boolean amnBanSozinho) {
        this.amnBanSozinho = amnBanSozinho;
    }

    public Boolean getAmnAuxVestir() {
        return amnAuxVestir;
    }

    public void setAmnAuxVestir(Boolean amnAuxVestir) {
        this.amnAuxVestir = amnAuxVestir;
    }

    public Boolean getAmnContEsfin() {
        return amnContEsfin;
    }

    public void setAmnContEsfin(Boolean amnContEsfin) {
        this.amnContEsfin = amnContEsfin;
    }

    public Boolean getAmnComeSoz() {
        return amnComeSoz;
    }

    public void setAmnComeSoz(Boolean amnComeSoz) {
        this.amnComeSoz = amnComeSoz;
    }

    public Integer getAmnIdadeRetFral() {
        return amnIdadeRetFral;
    }

    public void setAmnIdadeRetFral(Integer amnIdadeRetFral) {
        this.amnIdadeRetFral = amnIdadeRetFral;
    }

    public Funcionario getAmnIdFuncionario() {
        return amnIdFuncionario;
    }

    public void setAmnIdFuncionario(Funcionario amnIdFuncionario) {
        this.amnIdFuncionario = amnIdFuncionario;
    }

    public Praticante getAmnIdPraticante() {
        return amnIdPraticante;
    }

    public void setAmnIdPraticante(Praticante amnIdPraticante) {
        this.amnIdPraticante = amnIdPraticante;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (amnId != null ? amnId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof FichaAnamnese)) {
            return false;
        }
        FichaAnamnese other = (FichaAnamnese) object;
        if ((this.amnId == null && other.amnId != null) || (this.amnId != null && !this.amnId.equals(other.amnId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.mycompany.mavenproject1.FichaAnamnese[ amnId=" + amnId + " ]";
    }

}