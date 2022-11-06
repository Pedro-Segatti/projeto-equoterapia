package com.api.desafio.model;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 *
 * @author Pedro
 */
@Entity
@Table(name = "AVAL_FISIOTER")
public class AvalFisioter implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "AFT_ID")
    private Integer aftId;
    @Lob
    @Column(name = "AFT_QUEIXA")
    private String aftQueixa;
    @Lob
    @Column(name = "AFT_DIAG_CLIN")
    private String aftDiagClin;
    @Lob
    @Column(name = "AFT_DIAG_FISIO")
    private String aftDiagFisio;
    @Lob
    @Column(name = "AFT_ANAMNESE")
    private String aftAnamnese;
    @Lob
    @Column(name = "AFT_ROT_TERAPIA")
    private String aftRotTerapia;
    @Lob
    @Column(name = "AFT_EXAME_FIS")
    private String aftExameFis;
    @Lob
    @Column(name = "AFT_DES_MOTO_NEURO")
    private String aftDesMotoNeuro;
    @Lob
    @Column(name = "AFT_REF_PRIM_TEND")
    private String aftRefPrimTend;
    @Column(name = "AFT_ATV_REFLE_RCERV")
    private Boolean aftAtvRefleRcerv;
    @Column(name = "AFT_ATV_REFLE_RCORP")
    private Boolean aftAtvRefleRcorp;
    @Column(name = "AFT_ATV_REFLE_RAPOA")
    private Boolean aftAtvRefleRapoa;
    @Column(name = "AFT_ATV_REFLE_RAPOL")
    private Boolean aftAtvRefleRapol;
    @Column(name = "AFT_ATV_REFLE_RAPOP")
    private Boolean aftAtvRefleRapop;
    @Lob
    @Column(name = "AFT_ATV_REFLE_OBS")
    private String aftAtvRefleObs;
    @Column(name = "AFT_SENSE_TATIL")
    private Boolean aftSenseTatil;
    @Column(name = "AFT_SENSE_DOLO")
    private Boolean aftSenseDolo;
    @Column(name = "AFT_SENSE_TERM")
    private Boolean aftSenseTerm;
    @Lob
    @Column(name = "AFT_SENSE_OBS")
    private String aftSenseObs;
    @Column(name = "AFT_AMOTO_COR_HIPE")
    private Boolean aftAmotoCorHipe;
    @Column(name = "AFT_AMOTO_ATE_HIPO")
    private Boolean aftAmotoAteHipo;
    @Column(name = "AFT_AMOTO_CONT_ESP")
    private Boolean aftAmotoContEsp;
    @Column(name = "AFT_AMOTO_DEF_ATX")
    private Boolean aftAmotoDefAtx;
    @Column(name = "AFT_AMOTO_CLONUS")
    private Boolean aftAmotoClonus;
    @Lob
    @Column(name = "AFT_AMOTO_OBS")
    private String aftAmotoObs;
    @Lob
    @Column(name = "AFT_MAR_LOC_ATU")
    private String aftMarLocAtu;
    @Lob
    @Column(name = "AFT_AVAL_POST")
    private String aftAvalPost;
    @Lob
    @Column(name = "AFT_SOLO_CAVALO")
    private String aftSoloCavalo;
    @Column(name = "AFT_MTR_ALC_OBJ")
    private String aftMtrAlcObj;
    @Column(name = "AFT_MTR_ALIMEN")
    private String aftMtrAlimen;
    @Column(name = "AFT_MTR_PREEN_OBJ")
    private String aftMtrPreenObj;
    @Column(name = "AFT_MTR_HIGIENI")
    private String aftMtrHigieni;
    @Column(name = "AFT_MTR_USO_BIMANUAL")
    private String aftMtrUsoBimanual;
    @Column(name = "AFT_MTR_NEG_MEMBRO")
    private String aftMtrNegMembro;
    @Column(name = "AFT_MTR_VESTE_SOZ")
    private String aftMtrVesteSoz;
    @Column(name = "AFT_MTR_CONT_ESFINCT")
    private String aftMtrContEsfinct;
    @Column(name = "AFT_FMUSC_MMSS")
    private String aftFmuscMmss;
    @Column(name = "AFT_FMUSC_MMII")
    private String aftFmuscMmii;
    @Column(name = "AFT_FMUSC_TRONCO")
    private String aftFmuscTronco;
    @Column(name = "AFT_FMUSC_OBS")
    private String aftFmuscObs;
    @Lob
    @Column(name = "AFT_CMOTO_EST_OBS")
    private String aftCmotoEstObs;
    @Lob
    @Column(name = "AFT_CMOTO_DIN_OBS")
    private String aftCmotoDinObs;
    @Column(name = "AFT_PREEN_PALMAR")
    private Boolean aftPreenPalmar;
    @Column(name = "AFT_PREEN_PINCA")
    private Boolean aftPreenPinca;
    @Column(name = "AFT_MOV_PASSIVA")
    private String aftMovPassiva;
    @Column(name = "AFT_MOV_RESPIRA")
    private String aftMovRespira;
    @Column(name = "AFT_MOV_DEGLUTI")
    private String aftMovDegluti;
    @Column(name = "AFT_MOV_MASTIG")
    private String aftMovMastig;
    @Column(name = "AFT_MOV_CONT_ESFINCT")
    private String aftMovContEsfinct;
    @Lob
    @Column(name = "AFT_QUAD_COGNITIVO")
    private String aftQuadCognitivo;
    @Lob
    @Column(name = "AFT_SIST_RESP")
    private String aftSistResp;
    @Lob
    @Column(name = "AFT_SIST_CIRC")
    private String aftSistCirc;
    @Lob
    @Column(name = "AFT_EXAM_COMP")
    private String aftExamComp;
    @Lob
    @Column(name = "AFT_MEDICACOES")
    private String aftMedicacoes;
    @Lob
    @Column(name = "AFT_PARECER_FISIO")
    private String aftParecerFisio;
    @Column(name = "AFT_DATA")
    @Temporal(TemporalType.DATE)
    private Date aftData;
        @JoinColumn(name = "AFT_ID_FUNCIONARIO", referencedColumnName = "FUNC_ID")
    @ManyToOne(optional = false)
    private Funcionario funcionario;
        @JoinColumn(name = "AFT_ID_PRATICANTE", referencedColumnName = "PRAT_ID")
    @ManyToOne(optional = false)
    private Praticante praticante;

    public AvalFisioter() {
    }

    public AvalFisioter(Integer aftId) {
        this.aftId = aftId;
    }
    
    public Integer getAftId() {
        return aftId;
    }

    public void setAftId(Integer aftId) {
        this.aftId = aftId;
    }

    public String getAftQueixa() {
        return aftQueixa;
    }

    public void setAftQueixa(String aftQueixa) {
        this.aftQueixa = aftQueixa;
    }

    public String getAftDiagClin() {
        return aftDiagClin;
    }

    public void setAftDiagClin(String aftDiagClin) {
        this.aftDiagClin = aftDiagClin;
    }

    public String getAftDiagFisio() {
        return aftDiagFisio;
    }

    public void setAftDiagFisio(String aftDiagFisio) {
        this.aftDiagFisio = aftDiagFisio;
    }

    public String getAftAnamnese() {
        return aftAnamnese;
    }

    public void setAftAnamnese(String aftAnamnese) {
        this.aftAnamnese = aftAnamnese;
    }

    public String getAftRotTerapia() {
        return aftRotTerapia;
    }

    public void setAftRotTerapia(String aftRotTerapia) {
        this.aftRotTerapia = aftRotTerapia;
    }

    public String getAftExameFis() {
        return aftExameFis;
    }

    public void setAftExameFis(String aftExameFis) {
        this.aftExameFis = aftExameFis;
    }

    public String getAftDesMotoNeuro() {
        return aftDesMotoNeuro;
    }

    public void setAftDesMotoNeuro(String aftDesMotoNeuro) {
        this.aftDesMotoNeuro = aftDesMotoNeuro;
    }

    public String getAftRefPrimTend() {
        return aftRefPrimTend;
    }

    public void setAftRefPrimTend(String aftRefPrimTend) {
        this.aftRefPrimTend = aftRefPrimTend;
    }

    public Boolean getAftAtvRefleRcerv() {
        return aftAtvRefleRcerv;
    }

    public void setAftAtvRefleRcerv(Boolean aftAtvRefleRcerv) {
        this.aftAtvRefleRcerv = aftAtvRefleRcerv;
    }

    public Boolean getAftAtvRefleRcorp() {
        return aftAtvRefleRcorp;
    }

    public void setAftAtvRefleRcorp(Boolean aftAtvRefleRcorp) {
        this.aftAtvRefleRcorp = aftAtvRefleRcorp;
    }

    public Boolean getAftAtvRefleRapoa() {
        return aftAtvRefleRapoa;
    }

    public void setAftAtvRefleRapoa(Boolean aftAtvRefleRapoa) {
        this.aftAtvRefleRapoa = aftAtvRefleRapoa;
    }

    public Boolean getAftAtvRefleRapol() {
        return aftAtvRefleRapol;
    }

    public void setAftAtvRefleRapol(Boolean aftAtvRefleRapol) {
        this.aftAtvRefleRapol = aftAtvRefleRapol;
    }

    public Boolean getAftAtvRefleRapop() {
        return aftAtvRefleRapop;
    }

    public void setAftAtvRefleRapop(Boolean aftAtvRefleRapop) {
        this.aftAtvRefleRapop = aftAtvRefleRapop;
    }

    public String getAftAtvRefleObs() {
        return aftAtvRefleObs;
    }

    public void setAftAtvRefleObs(String aftAtvRefleObs) {
        this.aftAtvRefleObs = aftAtvRefleObs;
    }

    public Boolean getAftSenseTatil() {
        return aftSenseTatil;
    }

    public void setAftSenseTatil(Boolean aftSenseTatil) {
        this.aftSenseTatil = aftSenseTatil;
    }

    public Boolean getAftSenseDolo() {
        return aftSenseDolo;
    }

    public void setAftSenseDolo(Boolean aftSenseDolo) {
        this.aftSenseDolo = aftSenseDolo;
    }

    public Boolean getAftSenseTerm() {
        return aftSenseTerm;
    }

    public void setAftSenseTerm(Boolean aftSenseTerm) {
        this.aftSenseTerm = aftSenseTerm;
    }

    public String getAftSenseObs() {
        return aftSenseObs;
    }

    public void setAftSenseObs(String aftSenseObs) {
        this.aftSenseObs = aftSenseObs;
    }

    public Boolean getAftAmotoCorHipe() {
        return aftAmotoCorHipe;
    }

    public void setAftAmotoCorHipe(Boolean aftAmotoCorHipe) {
        this.aftAmotoCorHipe = aftAmotoCorHipe;
    }

    public Boolean getAftAmotoAteHipo() {
        return aftAmotoAteHipo;
    }

    public void setAftAmotoAteHipo(Boolean aftAmotoAteHipo) {
        this.aftAmotoAteHipo = aftAmotoAteHipo;
    }

    public Boolean getAftAmotoContEsp() {
        return aftAmotoContEsp;
    }

    public void setAftAmotoContEsp(Boolean aftAmotoContEsp) {
        this.aftAmotoContEsp = aftAmotoContEsp;
    }

    public Boolean getAftAmotoDefAtx() {
        return aftAmotoDefAtx;
    }

    public void setAftAmotoDefAtx(Boolean aftAmotoDefAtx) {
        this.aftAmotoDefAtx = aftAmotoDefAtx;
    }

    public Boolean getAftAmotoClonus() {
        return aftAmotoClonus;
    }

    public void setAftAmotoClonus(Boolean aftAmotoClonus) {
        this.aftAmotoClonus = aftAmotoClonus;
    }

    public String getAftAmotoObs() {
        return aftAmotoObs;
    }

    public void setAftAmotoObs(String aftAmotoObs) {
        this.aftAmotoObs = aftAmotoObs;
    }

    public String getAftMarLocAtu() {
        return aftMarLocAtu;
    }

    public void setAftMarLocAtu(String aftMarLocAtu) {
        this.aftMarLocAtu = aftMarLocAtu;
    }

    public String getAftAvalPost() {
        return aftAvalPost;
    }

    public void setAftAvalPost(String aftAvalPost) {
        this.aftAvalPost = aftAvalPost;
    }

    public String getAftSoloCavalo() {
        return aftSoloCavalo;
    }

    public void setAftSoloCavalo(String aftSoloCavalo) {
        this.aftSoloCavalo = aftSoloCavalo;
    }

    public String getAftMtrAlcObj() {
        return aftMtrAlcObj;
    }

    public void setAftMtrAlcObj(String aftMtrAlcObj) {
        this.aftMtrAlcObj = aftMtrAlcObj;
    }

    public String getAftMtrAlimen() {
        return aftMtrAlimen;
    }

    public void setAftMtrAlimen(String aftMtrAlimen) {
        this.aftMtrAlimen = aftMtrAlimen;
    }

    public String getAftMtrPreenObj() {
        return aftMtrPreenObj;
    }

    public void setAftMtrPreenObj(String aftMtrPreenObj) {
        this.aftMtrPreenObj = aftMtrPreenObj;
    }

    public String getAftMtrHigieni() {
        return aftMtrHigieni;
    }

    public void setAftMtrHigieni(String aftMtrHigieni) {
        this.aftMtrHigieni = aftMtrHigieni;
    }

    public String getAftMtrUsoBimanual() {
        return aftMtrUsoBimanual;
    }

    public void setAftMtrUsoBimanual(String aftMtrUsoBimanual) {
        this.aftMtrUsoBimanual = aftMtrUsoBimanual;
    }

    public String getAftMtrNegMembro() {
        return aftMtrNegMembro;
    }

    public void setAftMtrNegMembro(String aftMtrNegMembro) {
        this.aftMtrNegMembro = aftMtrNegMembro;
    }

    public String getAftMtrVesteSoz() {
        return aftMtrVesteSoz;
    }

    public void setAftMtrVesteSoz(String aftMtrVesteSoz) {
        this.aftMtrVesteSoz = aftMtrVesteSoz;
    }

    public String getAftMtrContEsfinct() {
        return aftMtrContEsfinct;
    }

    public void setAftMtrContEsfinct(String aftMtrContEsfinct) {
        this.aftMtrContEsfinct = aftMtrContEsfinct;
    }

    public String getAftFmuscMmss() {
        return aftFmuscMmss;
    }

    public void setAftFmuscMmss(String aftFmuscMmss) {
        this.aftFmuscMmss = aftFmuscMmss;
    }

    public String getAftFmuscMmii() {
        return aftFmuscMmii;
    }

    public void setAftFmuscMmii(String aftFmuscMmii) {
        this.aftFmuscMmii = aftFmuscMmii;
    }

    public String getAftFmuscTronco() {
        return aftFmuscTronco;
    }

    public void setAftFmuscTronco(String aftFmuscTronco) {
        this.aftFmuscTronco = aftFmuscTronco;
    }

    public String getAftFmuscObs() {
        return aftFmuscObs;
    }

    public void setAftFmuscObs(String aftFmuscObs) {
        this.aftFmuscObs = aftFmuscObs;
    }

    public String getAftCmotoEstObs() {
        return aftCmotoEstObs;
    }

    public void setAftCmotoEstObs(String aftCmotoEstObs) {
        this.aftCmotoEstObs = aftCmotoEstObs;
    }

    public String getAftCmotoDinObs() {
        return aftCmotoDinObs;
    }

    public void setAftCmotoDinObs(String aftCmotoDinObs) {
        this.aftCmotoDinObs = aftCmotoDinObs;
    }

    public Boolean getAftPreenPalmar() {
        return aftPreenPalmar;
    }

    public void setAftPreenPalmar(Boolean aftPreenPalmar) {
        this.aftPreenPalmar = aftPreenPalmar;
    }

    public Boolean getAftPreenPinca() {
        return aftPreenPinca;
    }

    public void setAftPreenPinca(Boolean aftPreenPinca) {
        this.aftPreenPinca = aftPreenPinca;
    }

    public String getAftMovPassiva() {
        return aftMovPassiva;
    }

    public void setAftMovPassiva(String aftMovPassiva) {
        this.aftMovPassiva = aftMovPassiva;
    }

    public String getAftMovRespira() {
        return aftMovRespira;
    }

    public void setAftMovRespira(String aftMovRespira) {
        this.aftMovRespira = aftMovRespira;
    }

    public String getAftMovDegluti() {
        return aftMovDegluti;
    }

    public void setAftMovDegluti(String aftMovDegluti) {
        this.aftMovDegluti = aftMovDegluti;
    }

    public String getAftMovMastig() {
        return aftMovMastig;
    }

    public void setAftMovMastig(String aftMovMastig) {
        this.aftMovMastig = aftMovMastig;
    }

    public String getAftMovContEsfinct() {
        return aftMovContEsfinct;
    }

    public void setAftMovContEsfinct(String aftMovContEsfinct) {
        this.aftMovContEsfinct = aftMovContEsfinct;
    }

    public String getAftQuadCognitivo() {
        return aftQuadCognitivo;
    }

    public void setAftQuadCognitivo(String aftQuadCognitivo) {
        this.aftQuadCognitivo = aftQuadCognitivo;
    }

    public String getAftSistResp() {
        return aftSistResp;
    }

    public void setAftSistResp(String aftSistResp) {
        this.aftSistResp = aftSistResp;
    }

    public String getAftSistCirc() {
        return aftSistCirc;
    }

    public void setAftSistCirc(String aftSistCirc) {
        this.aftSistCirc = aftSistCirc;
    }

    public String getAftExamComp() {
        return aftExamComp;
    }

    public void setAftExamComp(String aftExamComp) {
        this.aftExamComp = aftExamComp;
    }

    public String getAftMedicacoes() {
        return aftMedicacoes;
    }

    public void setAftMedicacoes(String aftMedicacoes) {
        this.aftMedicacoes = aftMedicacoes;
    }

    public String getAftParecerFisio() {
        return aftParecerFisio;
    }

    public void setAftParecerFisio(String aftParecerFisio) {
        this.aftParecerFisio = aftParecerFisio;
    }

    public Date getAftData() {
        return aftData;
    }

    public void setAftData(Date aftData) {
        this.aftData = aftData;
    }

    public Funcionario getFuncionario() {
        return funcionario;
    }

    public void setFuncionario(Funcionario funcionario) {
        this.funcionario = funcionario;
    }

    public Praticante getPraticante() {
        return praticante;
    }

    public void setPraticante(Praticante praticante) {
        this.praticante = praticante;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (aftId != null ? aftId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof AvalFisioter)) {
            return false;
        }
        AvalFisioter other = (AvalFisioter) object;
        if ((this.aftId == null && other.aftId != null) || (this.aftId != null && !this.aftId.equals(other.aftId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.api.desafio.model.AvalFisioter[ aftId=" + aftId + " ]";
    }
    
}
