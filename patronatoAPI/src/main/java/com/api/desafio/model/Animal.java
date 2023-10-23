package com.api.desafio.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

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
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 *
 * @author Pedro
 */
@Entity
@Table(name = "ANIMAL")
public class Animal implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "ANI_ID")
    private Integer aniId;
    @Column(name = "ANI_IDADE")
    private Integer aniIdade;
    @Basic(optional = false)
    @Column(name = "ANI_NOME")
    private String aniNome;
    @Basic(optional = false)
    @Column(name = "ANI_PORTE")
    private String aniPorte;
    @Column(name = "ANI_COMPORTAMENTO")
    private String aniComportamento;
    @Column(name = "ANI_ANDADURA")
    private String aniAndadura;
    @JsonIgnoreProperties("animalList")
    @JoinTable(name = "ficha_evol_animal", joinColumns = {
        @JoinColumn(name = "FXA_ID_ANIMAL", referencedColumnName = "ANI_ID")}, inverseJoinColumns = {
        @JoinColumn(name = "FXA_ID_FICHA", referencedColumnName = "EVOL_ID")})
    @ManyToMany
    private List<FichaEvolucao> fichaEvolucaoList;

    @ManyToMany(mappedBy = "animalList")
    private List<Agendamento> agendamentoList;

    public Animal() {
    }

    public Animal(Integer aniId) {
        this.aniId = aniId;
    }

    public Animal(Integer aniId, String aniNome, String aniPorte) {
        this.aniId = aniId;
        this.aniNome = aniNome;
        this.aniPorte = aniPorte;
    }

    public Integer getAniId() {
        return aniId;
    }

    public void setAniId(Integer aniId) {
        this.aniId = aniId;
    }

    public Integer getAniIdade() {
        return aniIdade;
    }

    public void setAniIdade(Integer aniIdade) {
        this.aniIdade = aniIdade;
    }

    public String getAniNome() {
        return aniNome;
    }

    public void setAniNome(String aniNome) {
        this.aniNome = aniNome;
    }

    public String getAniPorte() {
        return aniPorte;
    }

    public void setAniPorte(String aniPorte) {
        this.aniPorte = aniPorte;
    }

    public String getAniComportamento() {
        return aniComportamento;
    }

    public void setAniComportamento(String aniComportamento) {
        this.aniComportamento = aniComportamento;
    }

    public String getAniAndadura() {
        return aniAndadura;
    }

    public void setAniAndadura(String aniAndadura) {
        this.aniAndadura = aniAndadura;
    }
    @JsonIgnore
    public List<FichaEvolucao> getFichaEvolucaoList() {
        return fichaEvolucaoList;
    }
    @JsonIgnore
    public void setFichaEvolucaoList(List<FichaEvolucao> fichaEvolucaoList) {
        this.fichaEvolucaoList = fichaEvolucaoList;
    }

    @JsonIgnore
    public List<Agendamento> getAgendamentoList() {
        return agendamentoList;
    }
    @JsonIgnore
    public void setAgendamentoList(List<Agendamento> agendamentoList) {
        this.agendamentoList = agendamentoList;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (aniId != null ? aniId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Animal)) {
            return false;
        }
        Animal other = (Animal) object;
        if ((this.aniId == null && other.aniId != null) || (this.aniId != null && !this.aniId.equals(other.aniId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.api.desafio.model.Animal_1[ aniId=" + aniId + " ]";
    }
    
}
