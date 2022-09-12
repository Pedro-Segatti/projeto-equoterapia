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
    @ManyToMany(mappedBy = "praticanteList")
    private List<FichaEvolucao> fichaEvolucaoList;
    @JoinTable(name = "praticante_responsavel", joinColumns = {
        @JoinColumn(name = "PXR_ID_PRAT", referencedColumnName = "PRAT_ID"),
        @JoinColumn(name = "PXR_ID_PRAT", referencedColumnName = "PRAT_ID")}, inverseJoinColumns = {
        @JoinColumn(name = "PXR_ID_RESP", referencedColumnName = "RESP_ID"),
        @JoinColumn(name = "PXR_ID_RESP", referencedColumnName = "RESP_ID")})
    @ManyToMany
    private List<Responsavel> responsavelList;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "praticante")
    private List<FichaAnamnese> fichaAnamneseList;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "praticante")
    private List<AvalFisioter> avalFisioterList;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "axpIdPraticante")
    private List<AgendamentoPraticante> agendamentoPraticanteList;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "praticante")
    private List<Documentos> documentosList;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "praticante")
    private List<AvalSocioecon> avalSocioeconList;
    @JoinColumn(name = "PRAT_ID_PESSOA", referencedColumnName = "PES_ID")
    @ManyToOne(optional = false)
    private Pessoa pessoa;

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

    public List<FichaEvolucao> getFichaEvolucaoList() {
        return fichaEvolucaoList;
    }

    public void setFichaEvolucaoList(List<FichaEvolucao> fichaEvolucaoList) {
        this.fichaEvolucaoList = fichaEvolucaoList;
    }

    public List<Responsavel> getResponsavelList() {
        return responsavelList;
    }

    public void setResponsavelList(List<Responsavel> responsavelList) {
        this.responsavelList = responsavelList;
    }

    public List<FichaAnamnese> getFichaAnamneseList() {
        return fichaAnamneseList;
    }

    public void setFichaAnamneseList(List<FichaAnamnese> fichaAnamneseList) {
        this.fichaAnamneseList = fichaAnamneseList;
    }

    public List<AvalFisioter> getAvalFisioterList() {
        return avalFisioterList;
    }

    public void setAvalFisioterList(List<AvalFisioter> avalFisioterList) {
        this.avalFisioterList = avalFisioterList;
    }

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
