package com.api.desafio.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;
import java.util.List;
import javax.persistence.*;

@Entity
@Table(name = "FICHA_EVOLUCAO")
public class FichaEvolucao implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "EVOL_ID")
    private Integer evolId;
    @Column(name = "EVOL_CLIMA")
    private String evolClima;
    @Column(name = "EVOL_HUMOR")
    private String evolHumor;
    @Column(name = "EVOL_ATENC")
    private String evolAtenc;
    @Column(name = "EVOL_AUTON")
    private String evolAuton;
    @Column(name = "EVOL_ESTEREOTIPIA")
    private String evolEstereotipia;
    @Column(name = "EVOL_POST")
    private String evolPost;
    @Column(name = "EVOL_PROG")
    private String evolProg;
    @Column(name = "EVOL_REG")
    private String evolReg;
    @Column(name = "EVOL_OBS")
    private String evolObs;
    @Column(name = "EVOL_REC_LUDICOS")
    private boolean evolRecLudicos;
    @Column(name = "EVOL_QUAIS_REC_LUD")
    private String evolQuaisRecLud;
    @Column(name = "EVOL_OBS_REC_LUD")
    private String evolObsRecLud;
    @Column(name = "EVOL_DECUBITO")
    private String evolDecubito;
    @Column(name = "EVOL_COMP_ANI")
    private String evolCompAni;
    @Column(name = "EVOL_AND_ANI")
    private String evolAndAni;
    @JoinColumn(name = "EVOL_ID_MONT", referencedColumnName = "MONT_ID")
    @ManyToOne(optional = false)
    private Montaria evolIdMont;
    @JsonIgnoreProperties("fichaEvolucaoList")
    @JoinTable(name = "ficha_evol_praticante", joinColumns = {
        @JoinColumn(name = "FXPR_ID_FICHA", referencedColumnName = "EVOL_ID")}, inverseJoinColumns = {
        @JoinColumn(name = "FXPR_ID_PRATICANTE", referencedColumnName = "PRAT_ID")})
    @ManyToMany
    private List<Praticante> praticanteList;
    @JsonIgnoreProperties("fichaEvolucaoList")
    @JoinTable(name = "ficha_evol_picadeiro", joinColumns = {
        @JoinColumn(name = "FXP_ID_FICHA", referencedColumnName = "EVOL_ID")}, inverseJoinColumns = {
        @JoinColumn(name = "FXP_ID_PICADEIRO", referencedColumnName = "PIC_ID")})
    @ManyToMany
    private List<Picadeiro> picadeiroList;
    @JsonIgnoreProperties("fichaEvolucaoList")
    @JoinTable(name = "ficha_evol_funcionario", joinColumns = {
        @JoinColumn(name = "FXF_ID_FICHA", referencedColumnName = "EVOL_ID")}, inverseJoinColumns = {
        @JoinColumn(name = "FXF_ID_FUNCIONARIO", referencedColumnName = "FUNC_ID")})
    @ManyToMany
    private List<Funcionario> funcionarioList;
    @JsonIgnoreProperties("fichaEvolucaoList")
    @JoinTable(name = "ficha_evol_animal", joinColumns = {
        @JoinColumn(name = "FXA_ID_FICHA", referencedColumnName = "EVOL_ID")}, inverseJoinColumns = {
        @JoinColumn(name = "FXA_ID_ANIMAL", referencedColumnName = "ANI_ID")})
    @ManyToMany
    private List<Animal> animalList;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "fichaEvolucao")
    private List<FichaEvolAtividadeMaterial> fichaEvolAtividadeMaterialList;

    public FichaEvolucao() {
    }

    public FichaEvolucao(Integer evolId) {
        this.evolId = evolId;
    }

    public Integer getEvolId() {
        return evolId;
    }

    public void setEvolId(Integer evolId) {
        this.evolId = evolId;
    }

    public String getEvolClima() {
        return evolClima;
    }

    public void setEvolClima(String evolClima) {
        this.evolClima = evolClima;
    }

    public String getEvolHumor() {
        return evolHumor;
    }

    public void setEvolHumor(String evolHumor) {
        this.evolHumor = evolHumor;
    }

    public String getEvolAtenc() {
        return evolAtenc;
    }

    public void setEvolAtenc(String evolAtenc) {
        this.evolAtenc = evolAtenc;
    }

    public String getEvolAuton() {
        return evolAuton;
    }

    public void setEvolAuton(String evolAuton) {
        this.evolAuton = evolAuton;
    }

    public String getEvolEstereotipia() {
        return evolEstereotipia;
    }

    public void setEvolEstereotipia(String evolEstereotipia) {
        this.evolEstereotipia = evolEstereotipia;
    }

    public String getEvolPost() {
        return evolPost;
    }

    public void setEvolPost(String evolPost) {
        this.evolPost = evolPost;
    }

    public String getEvolProg() {
        return evolProg;
    }

    public void setEvolProg(String evolProg) {
        this.evolProg = evolProg;
    }

    public String getEvolReg() {
        return evolReg;
    }

    public void setEvolReg(String evolReg) {
        this.evolReg = evolReg;
    }

    public String getEvolObs() {
        return evolObs;
    }

    public void setEvolObs(String evolObs) {
        this.evolObs = evolObs;
    }

    public boolean isEvolRecLudicos() {
        return evolRecLudicos;
    }

    public void setEvolRecLudicos(boolean evolRecLudicos) {
        this.evolRecLudicos = evolRecLudicos;
    }

    public String getEvolQuaisRecLud() {
        return evolQuaisRecLud;
    }

    public void setEvolQuaisRecLud(String evolQuaisRecLud) {
        this.evolQuaisRecLud = evolQuaisRecLud;
    }

    public String getEvolObsRecLud() {
        return evolObsRecLud;
    }

    public void setEvolObsRecLud(String evolObsRecLud) {
        this.evolObsRecLud = evolObsRecLud;
    }

    public String getEvolDecubito() {
        return evolDecubito;
    }

    public void setEvolDecubito(String evolDecubito) {
        this.evolDecubito = evolDecubito;
    }

    public String getEvolCompAni() {
        return evolCompAni;
    }

    public void setEvolCompAni(String evolCompAni) {
        this.evolCompAni = evolCompAni;
    }

    public String getEvolAndAni() {
        return evolAndAni;
    }

    public void setEvolAndAni(String evolAndAni) {
        this.evolAndAni = evolAndAni;
    }

    public Montaria getEvolIdMont() {
        return evolIdMont;
    }

    public void setEvolIdMont(Montaria evolIdMont) {
        this.evolIdMont = evolIdMont;
    }

    public List<Praticante> getPraticanteList() {
        return praticanteList;
    }

    public void setPraticanteList(List<Praticante> praticanteList) {
        this.praticanteList = praticanteList;
    }

    public List<Picadeiro> getPicadeiroList() {
        return picadeiroList;
    }

    public void setPicadeiroList(List<Picadeiro> picadeiroList) {
        this.picadeiroList = picadeiroList;
    }

    public List<Funcionario> getFuncionarioList() {
        return funcionarioList;
    }

    public void setFuncionarioList(List<Funcionario> funcionarioList) {
        this.funcionarioList = funcionarioList;
    }

    public List<Animal> getAnimalList() {
        return animalList;
    }

    public void setAnimalList(List<Animal> animalList) {
        this.animalList = animalList;
    }

    public List<FichaEvolAtividadeMaterial> getFichaEvolAtividadeMaterialList() {
        return fichaEvolAtividadeMaterialList;
    }

    public void setFichaEvolAtividadeMaterialList(List<FichaEvolAtividadeMaterial> fichaEvolAtividadeMaterialList) {
        this.fichaEvolAtividadeMaterialList = fichaEvolAtividadeMaterialList;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (evolId != null ? evolId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof FichaEvolucao)) {
            return false;
        }
        FichaEvolucao other = (FichaEvolucao) object;
        if ((this.evolId == null && other.evolId != null) || (this.evolId != null && !this.evolId.equals(other.evolId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.api.desafio.model.FichaEvolucao[ evolId=" + evolId + " ]";
    }

}
