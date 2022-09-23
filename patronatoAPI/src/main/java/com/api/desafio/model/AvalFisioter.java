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
    private byte[] aftQueixa;
    @Lob
    @Column(name = "AFT_DIAG_CLIN")
    private byte[] aftDiagClin;
    @Lob
    @Column(name = "AFT_DIAG_FISIO")
    private byte[] aftDiagFisio;
    @Lob
    @Column(name = "AFT_ANAMNESE")
    private byte[] aftAnamnese;
    @Lob
    @Column(name = "AFT_ROT_TERAPIA")
    private byte[] aftRotTerapia;
    @Lob
    @Column(name = "AFT_EXAME_FIS")
    private byte[] aftExameFis;
    @Lob
    @Column(name = "AFT_DES_MOTO_NEURO")
    private byte[] aftDesMotoNeuro;
    @Lob
    @Column(name = "AFT_REF_PRIM_TEND")
    private byte[] aftRefPrimTend;
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
    private byte[] aftAtvRefleObs;
    @Column(name = "AFT_SENSE_TATIL")
    private Boolean aftSenseTatil;
    @Column(name = "AFT_SENSE_DOLO")
    private Boolean aftSenseDolo;
    @Column(name = "AFT_SENSE_TERM")
    private Boolean aftSenseTerm;
    @Lob
    @Column(name = "AFT_SENSE_OBS")
    private byte[] aftSenseObs;
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
    private byte[] aftAmotoObs;
    @Lob
    @Column(name = "AFT_MAR_LOC_ATU")
    private byte[] aftMarLocAtu;
    @Lob
    @Column(name = "AFT_AVAL_POST")
    private byte[] aftAvalPost;
    @Lob
    @Column(name = "AFT_SOLO_CAVALO")
    private byte[] aftSoloCavalo;
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
    private byte[] aftCmotoEstObs;
    @Lob
    @Column(name = "AFT_CMOTO_DIN_OBS")
    private byte[] aftCmotoDinObs;
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
    private byte[] aftQuadCognitivo;
    @Lob
    @Column(name = "AFT_SIST_RESP")
    private byte[] aftSistResp;
    @Lob
    @Column(name = "AFT_SIST_CIRC")
    private byte[] aftSistCirc;
    @Lob
    @Column(name = "AFT_EXAM_COMP")
    private byte[] aftExamComp;
    @Lob
    @Column(name = "AFT_MEDICACOES")
    private byte[] aftMedicacoes;
    @Lob
    @Column(name = "AFT_PARECER_FISIO")
    private byte[] aftParecerFisio;
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

    public byte[] getAftQueixa() {
        return aftQueixa;
    }

    public void setAftQueixa(byte[] aftQueixa) {
        this.aftQueixa = aftQueixa;
    }

    public byte[] getAftDiagClin() {
        return aftDiagClin;
    }

    public void setAftDiagClin(byte[] aftDiagClin) {
        this.aftDiagClin = aftDiagClin;
    }

    public byte[] getAftDiagFisio() {
        return aftDiagFisio;
    }

    public void setAftDiagFisio(byte[] aftDiagFisio) {
        this.aftDiagFisio = aftDiagFisio;
    }

    public byte[] getAftAnamnese() {
        return aftAnamnese;
    }

    public void setAftAnamnese(byte[] aftAnamnese) {
        this.aftAnamnese = aftAnamnese;
    }

    public byte[] getAftRotTerapia() {
        return aftRotTerapia;
    }

    public void setAftRotTerapia(byte[] aftRotTerapia) {
        this.aftRotTerapia = aftRotTerapia;
    }

    public byte[] getAftExameFis() {
        return aftExameFis;
    }

    public void setAftExameFis(byte[] aftExameFis) {
        this.aftExameFis = aftExameFis;
    }

    public byte[] getAftDesMotoNeuro() {
        return aftDesMotoNeuro;
    }

    public void setAftDesMotoNeuro(byte[] aftDesMotoNeuro) {
        this.aftDesMotoNeuro = aftDesMotoNeuro;
    }

    public byte[] getAftRefPrimTend() {
        return aftRefPrimTend;
    }

    public void setAftRefPrimTend(byte[] aftRefPrimTend) {
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

    public byte[] getAftAtvRefleObs() {
        return aftAtvRefleObs;
    }

    public void setAftAtvRefleObs(byte[] aftAtvRefleObs) {
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

    public byte[] getAftSenseObs() {
        return aftSenseObs;
    }

    public void setAftSenseObs(byte[] aftSenseObs) {
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

    public byte[] getAftAmotoObs() {
        return aftAmotoObs;
    }

    public void setAftAmotoObs(byte[] aftAmotoObs) {
        this.aftAmotoObs = aftAmotoObs;
    }

    public byte[] getAftMarLocAtu() {
        return aftMarLocAtu;
    }

    public void setAftMarLocAtu(byte[] aftMarLocAtu) {
        this.aftMarLocAtu = aftMarLocAtu;
    }

    public byte[] getAftAvalPost() {
        return aftAvalPost;
    }

    public void setAftAvalPost(byte[] aftAvalPost) {
        this.aftAvalPost = aftAvalPost;
    }

    public byte[] getAftSoloCavalo() {
        return aftSoloCavalo;
    }

    public void setAftSoloCavalo(byte[] aftSoloCavalo) {
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

    public byte[] getAftCmotoEstObs() {
        return aftCmotoEstObs;
    }

    public void setAftCmotoEstObs(byte[] aftCmotoEstObs) {
        this.aftCmotoEstObs = aftCmotoEstObs;
    }

    public byte[] getAftCmotoDinObs() {
        return aftCmotoDinObs;
    }

    public void setAftCmotoDinObs(byte[] aftCmotoDinObs) {
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

    public byte[] getAftQuadCognitivo() {
        return aftQuadCognitivo;
    }

    public void setAftQuadCognitivo(byte[] aftQuadCognitivo) {
        this.aftQuadCognitivo = aftQuadCognitivo;
    }

    public byte[] getAftSistResp() {
        return aftSistResp;
    }

    public void setAftSistResp(byte[] aftSistResp) {
        this.aftSistResp = aftSistResp;
    }

    public byte[] getAftSistCirc() {
        return aftSistCirc;
    }

    public void setAftSistCirc(byte[] aftSistCirc) {
        this.aftSistCirc = aftSistCirc;
    }

    public byte[] getAftExamComp() {
        return aftExamComp;
    }

    public void setAftExamComp(byte[] aftExamComp) {
        this.aftExamComp = aftExamComp;
    }

    public byte[] getAftMedicacoes() {
        return aftMedicacoes;
    }

    public void setAftMedicacoes(byte[] aftMedicacoes) {
        this.aftMedicacoes = aftMedicacoes;
    }

    public byte[] getAftParecerFisio() {
        return aftParecerFisio;
    }

    public void setAftParecerFisio(byte[] aftParecerFisio) {
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
