package com.api.desafio.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;
import java.util.ArrayList;
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
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 *
 * @author Pedro
 */
@Entity
@Table(name = "PRATICANTE")
public class Praticante implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "PRAT_ID")
    private Integer pratId;
    @JoinColumn(name = "PRAT_ID_PESSOA", referencedColumnName = "PES_ID")
    @ManyToOne(optional = false)
    private Pessoa pessoa;
    @Column(name = "PRAT_ALTURA")
    private Integer pratAltura;
    @Column(name = "PRAT_PESO")
    private Integer pratPeso;
    @ManyToMany(mappedBy = "praticanteList")
    private List<FichaEvolucao> fichaEvolucaoList;
    @JoinTable(name = "praticante_responsavel", joinColumns = {
        @JoinColumn(name = "PXR_ID_PRAT", referencedColumnName = "PRAT_ID")}, inverseJoinColumns = {
        @JoinColumn(name = "PXR_ID_RESP", referencedColumnName = "RESP_ID")})
    @ManyToMany
    private List<Responsavel> responsavelList;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "amnIdPraticante")
    private List<FichaAnamnese> fichaAnamneseList;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "aftIdPraticante")
    private List<AvalFisioter> avalFisioterList;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "axpIdPraticante")
    private List<AgendamentoPraticante> agendamentoPraticanteList;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "praticante")
    private List<Documentos> documentosList = new ArrayList<>();
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "praticante")
    private List<AvalSocioecon> avalSocioeconList;

    public Praticante() {
    }

    public Praticante(Integer pratId) {
        this.pratId = pratId;
    }

    public Integer getPratId() {
        return pratId;
    }

    public void setPratId(Integer pratId) {
        this.pratId = pratId;
    }

    public Integer getPratAltura() {
        return pratAltura;
    }

    public void setPratAltura(Integer pratAltura) {
        this.pratAltura = pratAltura;
    }

    public Integer getPratPeso() {
        return pratPeso;
    }

    public void setPratPeso(Integer pratPeso) {
        this.pratPeso = pratPeso;
    }
    @JsonIgnore
    public List<FichaEvolucao> getFichaEvolucaoList() {
        return fichaEvolucaoList;
    }

    public void setFichaEvolucaoList(List<FichaEvolucao> fichaEvolucaoList) {
        this.fichaEvolucaoList = fichaEvolucaoList;
    }
    @JsonIgnore
    public List<Responsavel> getResponsavelList() {
        return responsavelList;
    }

    public void setResponsavelList(List<Responsavel> responsavelList) {
        this.responsavelList = responsavelList;
    }
    @JsonIgnore
    public List<FichaAnamnese> getFichaAnamneseList() {
        return fichaAnamneseList;
    }

    public void setFichaAnamneseList(List<FichaAnamnese> fichaAnamneseList) {
        this.fichaAnamneseList = fichaAnamneseList;
    }
    @JsonIgnore
    public List<AvalFisioter> getAvalFisioterList() {
        return avalFisioterList;
    }

    public void setAvalFisioterList(List<AvalFisioter> avalFisioterList) {
        this.avalFisioterList = avalFisioterList;
    }
    @JsonIgnore
    public List<AgendamentoPraticante> getAgendamentoPraticanteList() {
        return agendamentoPraticanteList;
    }

    public void setAgendamentoPraticanteList(List<AgendamentoPraticante> agendamentoPraticanteList) {
        this.agendamentoPraticanteList = agendamentoPraticanteList;
    }
    public List<Documentos> getDocumentosList() {
        return documentosList;
    }

    public void setDocumentosList(List<Documentos> documentosList) {
        this.documentosList = documentosList;
    }
    @JsonIgnore
    public List<AvalSocioecon> getAvalSocioeconList() {
        return avalSocioeconList;
    }

    public void setAvalSocioeconList(List<AvalSocioecon> avalSocioeconList) {
        this.avalSocioeconList = avalSocioeconList;
    }
    public Pessoa getPessoa() {
        return pessoa;
    }

    public void setPessoa(Pessoa pessoa) {
        this.pessoa = pessoa;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (pratId != null ? pratId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Praticante)) {
            return false;
        }
        Praticante other = (Praticante) object;
        if ((this.pratId == null && other.pratId != null) || (this.pratId != null && !this.pratId.equals(other.pratId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.api.desafio.model.Praticante[ pratId=" + pratId + " ]";
    }

}
