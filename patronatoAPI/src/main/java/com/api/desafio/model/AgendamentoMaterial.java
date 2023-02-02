package com.api.desafio.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 *
 * @author Pedro
 */
@Entity
@Table(name = "AGENDAMENTO_MATERIAL")
public class AgendamentoMaterial implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "AXM_ID")
    private Integer axmId;
    @JoinColumn(name = "AXM_ID_AGENDAMENTO", referencedColumnName = "AGD_ID")
    @ManyToOne(optional = false)
    @JsonBackReference
    private Agendamento axmIdAgendamento;
    @JoinColumn(name = "AXM_ID_MATERIAL", referencedColumnName = "MAT_ID")
    @ManyToOne(optional = false)
    private Material axmIdMaterial;

    public AgendamentoMaterial() {
    }

    public AgendamentoMaterial(Integer axmId) {
        this.axmId = axmId;
    }

    public Integer getAxmId() {
        return axmId;
    }

    public void setAxmId(Integer axmId) {
        this.axmId = axmId;
    }
    @JsonIgnore
    public Agendamento getAxmIdAgendamento() {
        return axmIdAgendamento;
    }

    public void setAxmIdAgendamento(Agendamento axmIdAgendamento) {
        this.axmIdAgendamento = axmIdAgendamento;
    }

    public Material getAxmIdMaterial() {
        return axmIdMaterial;
    }

    public void setAxmIdMaterial(Material axmIdMaterial) {
        this.axmIdMaterial = axmIdMaterial;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (axmId != null ? axmId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof AgendamentoMaterial)) {
            return false;
        }
        AgendamentoMaterial other = (AgendamentoMaterial) object;
        if ((this.axmId == null && other.axmId != null) || (this.axmId != null && !this.axmId.equals(other.axmId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.api.desafio.model.AgendamentoMaterial[ axmId=" + axmId + " ]";
    }
    
}
