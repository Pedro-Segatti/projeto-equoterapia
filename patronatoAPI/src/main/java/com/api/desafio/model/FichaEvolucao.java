package com.api.desafio.model;

import java.io.Serializable;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 *
 * @author Pedro
 */
@Entity
@Table(name = "FICHA_EVOLUCAO")
public class FichaEvolucao implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "EVOL_ID")
    private Integer evolId;
    @Lob
    @Column(name = "EVOL_ALTERACOES")
    private byte[] evolAlteracoes;
    @Column(name = "EVOL_COMPORT_EQUIPE")
    private Boolean evolComportEquipe;
    @Column(name = "EVOL_COMPORT_ANIMAL")
    private Boolean evolComportAnimal;
    @Column(name = "EVOL_HUMOR_BOOLEAN")
    private Boolean evolHumorBoolean;
    @Column(name = "EVOL_ATENCAO")
    private Boolean evolAtencao;
    @Column(name = "EVOL_AUTONOMIA")
    private Boolean evolAutonomia;
    @Lob
    @Column(name = "EVOL_POSTURA")
    private byte[] evolPostura;
    @Lob
    @Column(name = "EVOL_PROGRESSO")
    private byte[] evolProgresso;
    @JoinTable(name = "ficha_evol_praticante", joinColumns = {
        @JoinColumn(name = "FXPR_ID_FICHA", referencedColumnName = "EVOL_ID"),
        @JoinColumn(name = "FXPR_ID_FICHA", referencedColumnName = "EVOL_ID")}, inverseJoinColumns = {
        @JoinColumn(name = "FXPR_ID_PRATICANTE", referencedColumnName = "PRAT_ID"),
        @JoinColumn(name = "FXPR_ID_PRATICANTE", referencedColumnName = "PRAT_ID")})
    @ManyToMany
    private List<Praticante> praticanteList;
    @JoinTable(name = "ficha_evol_picadeiro", joinColumns = {
        @JoinColumn(name = "FXP_ID_FICHA", referencedColumnName = "EVOL_ID"),
        @JoinColumn(name = "FXP_ID_FICHA", referencedColumnName = "EVOL_ID")}, inverseJoinColumns = {
        @JoinColumn(name = "FXP_ID_PICADEIRO", referencedColumnName = "PIC_ID"),
        @JoinColumn(name = "FXP_ID_PICADEIRO", referencedColumnName = "PIC_ID")})
    @ManyToMany
    private List<Picadeiro> picadeiroList;
    @JoinTable(name = "ficha_evol_funcionario", joinColumns = {
        @JoinColumn(name = "FXF_ID_FICHA", referencedColumnName = "EVOL_ID"),
        @JoinColumn(name = "FXF_ID_FICHA", referencedColumnName = "EVOL_ID")}, inverseJoinColumns = {
        @JoinColumn(name = "FXF_ID_FUNCIONARIO", referencedColumnName = "FUNC_ID"),
        @JoinColumn(name = "FXF_ID_FUNCIONARIO", referencedColumnName = "FUNC_ID")})
    @ManyToMany
    private List<Funcionario> funcionarioList;
    @ManyToMany(mappedBy = "fichaEvolucaoList")
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

    public byte[] getEvolAlteracoes() {
        return evolAlteracoes;
    }

    public void setEvolAlteracoes(byte[] evolAlteracoes) {
        this.evolAlteracoes = evolAlteracoes;
    }

    public Boolean getEvolComportEquipe() {
        return evolComportEquipe;
    }

    public void setEvolComportEquipe(Boolean evolComportEquipe) {
        this.evolComportEquipe = evolComportEquipe;
    }

    public Boolean getEvolComportAnimal() {
        return evolComportAnimal;
    }

    public void setEvolComportAnimal(Boolean evolComportAnimal) {
        this.evolComportAnimal = evolComportAnimal;
    }

    public Boolean getEvolHumorBoolean() {
        return evolHumorBoolean;
    }

    public void setEvolHumorBoolean(Boolean evolHumorBoolean) {
        this.evolHumorBoolean = evolHumorBoolean;
    }

    public Boolean getEvolAtencao() {
        return evolAtencao;
    }

    public void setEvolAtencao(Boolean evolAtencao) {
        this.evolAtencao = evolAtencao;
    }

    public Boolean getEvolAutonomia() {
        return evolAutonomia;
    }

    public void setEvolAutonomia(Boolean evolAutonomia) {
        this.evolAutonomia = evolAutonomia;
    }

    public byte[] getEvolPostura() {
        return evolPostura;
    }

    public void setEvolPostura(byte[] evolPostura) {
        this.evolPostura = evolPostura;
    }

    public byte[] getEvolProgresso() {
        return evolProgresso;
    }

    public void setEvolProgresso(byte[] evolProgresso) {
        this.evolProgresso = evolProgresso;
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
