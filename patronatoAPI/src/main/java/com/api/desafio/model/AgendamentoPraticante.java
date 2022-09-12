package com.api.desafio.model;

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
@Table(name = "AGENDAMENTO_PRATICANTE")
public class AgendamentoPraticante implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "AXP_ID")
    private Integer axpId;
    @JoinColumn(name = "AXP_ID_AGENDAMENTO", referencedColumnName = "AGD_ID")
    @ManyToOne(optional = false)
    private Agendamento axpIdAgendamento;
    @JoinColumn(name = "AXP_ID_PRATICANTE", referencedColumnName = "PRAT_ID")
    @ManyToOne(optional = false)
    private Praticante axpIdPraticante;

    public AgendamentoPraticante() {
    }

    public AgendamentoPraticante(Integer axpId) {
        this.axpId = axpId;
    }

    public Integer getAxpId() {
        return axpId;
    }

    public void setAxpId(Integer axpId) {
        this.axpId = axpId;
    }

    public Agendamento getAxpIdAgendamento() {
        return axpIdAgendamento;
    }

    public void setAxpIdAgendamento(Agendamento axpIdAgendamento) {
        this.axpIdAgendamento = axpIdAgendamento;
    }

    public Praticante getAxpIdPraticante() {
        return axpIdPraticante;
    }

    public void setAxpIdPraticante(Praticante axpIdPraticante) {
        this.axpIdPraticante = axpIdPraticante;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (axpId != null ? axpId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof AgendamentoPraticante)) {
            return false;
        }
        AgendamentoPraticante other = (AgendamentoPraticante) object;
        if ((this.axpId == null && other.axpId != null) || (this.axpId != null && !this.axpId.equals(other.axpId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.api.desafio.model.AgendamentoPraticante[ axpId=" + axpId + " ]";
    }
    
}
