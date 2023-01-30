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
@Table(name = "AGENDAMENTO_FUNCIONARIO")
public class AgendamentoFuncionario implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "AXF_ID")
    private Integer axfId;
    @JoinColumn(name = "AXF_ID_AGENDAMENTO", referencedColumnName = "AGD_ID")
    @ManyToOne(optional = false)
    private Agendamento axfIdAgendamento;
    @JoinColumn(name = "AXF_ID_FUNCIONARIO", referencedColumnName = "FUNC_ID")
    @ManyToOne(optional = false)
    private Funcionario axfIdFuncionario;

    public AgendamentoFuncionario() {
    }

    public AgendamentoFuncionario(Integer axfId) {
        this.axfId = axfId;
    }

    public Integer getAxfId() {
        return axfId;
    }

    public void setAxfId(Integer axfId) {
        this.axfId = axfId;
    }

    @JsonIgnore
    public Agendamento getAxfIdAgendamento() {
        return axfIdAgendamento;
    }
    @JsonIgnore
    public void setAxfIdAgendamento(Agendamento axfIdAgendamento) {
        this.axfIdAgendamento = axfIdAgendamento;
    }

    public Funcionario getAxfIdFuncionario() {
        return axfIdFuncionario;
    }

    public void setAxfIdFuncionario(Funcionario axfIdFuncionario) {
        this.axfIdFuncionario = axfIdFuncionario;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (axfId != null ? axfId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof AgendamentoFuncionario)) {
            return false;
        }
        AgendamentoFuncionario other = (AgendamentoFuncionario) object;
        if ((this.axfId == null && other.axfId != null) || (this.axfId != null && !this.axfId.equals(other.axfId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.api.desafio.model.AgendamentoFuncionario[ axfId=" + axfId + " ]";
    }
    
}
