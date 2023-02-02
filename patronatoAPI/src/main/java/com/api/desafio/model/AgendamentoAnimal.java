package com.api.desafio.model;

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
@Table(name = "AGENDAMENTO_ANIMAL")
public class AgendamentoAnimal implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "AXA_ID")
    private Integer axaId;
    @JoinColumn(name = "AXA_ID_AGENDAMENTO", referencedColumnName = "AGD_ID")
    @ManyToOne(optional = false)
    private Agendamento axaIdAgendamento;
    @JoinColumn(name = "AXA_ID_ANIMAL", referencedColumnName = "ANI_ID")
    @ManyToOne(optional = false)
    private Animal axaIdAnimal;

    public AgendamentoAnimal() {
    }

    public AgendamentoAnimal(Integer axaId) {
        this.axaId = axaId;
    }

    public Integer getAxaId() {
        return axaId;
    }

    public void setAxaId(Integer axaId) {
        this.axaId = axaId;
    }
    @JsonIgnore
    public Agendamento getAxaIdAgendamento() {
        return axaIdAgendamento;
    }
    public void setAxaIdAgendamento(Agendamento axaIdAgendamento) {
        this.axaIdAgendamento = axaIdAgendamento;
    }

    public Animal getAxaIdAnimal() {
        return axaIdAnimal;
    }

    public void setAxaIdAnimal(Animal axaIdAnimal) {
        this.axaIdAnimal = axaIdAnimal;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (axaId != null ? axaId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof AgendamentoAnimal)) {
            return false;
        }
        AgendamentoAnimal other = (AgendamentoAnimal) object;
        if ((this.axaId == null && other.axaId != null) || (this.axaId != null && !this.axaId.equals(other.axaId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.api.desafio.model.AgendamentoAnimal[ axaId=" + axaId + " ]";
    }
    
}
