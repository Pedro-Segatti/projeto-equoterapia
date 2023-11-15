package com.api.desafio.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 *
 * @author Pedro
 */
@Entity
@Table(name = "AGENDAMENTO_ANIMAL")
public class AgendamentoAnimal implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "AXA_ID")
    private Integer axaId;
    @JoinColumn(name = "AXA_ID_AGENDAMENTO", referencedColumnName = "AGD_ID")
    @ManyToOne(optional = false)
    @JsonBackReference
    private Agendamento axmIdAgendamento;
    @JoinColumn(name = "AXA_ID_ANIMAL", referencedColumnName = "ANI_ID")
    @ManyToOne(optional = false)
    private Animal axaIdAnimal;

    public AgendamentoAnimal() {
    }

    public Integer getAxaId() {
        return axaId;
    }

    public void setAxaId(Integer axaId) {
        this.axaId = axaId;
    }

    @JsonIgnore
    public Agendamento getAxmIdAgendamento() {
        return axmIdAgendamento;
    }

    public void setAxmIdAgendamento(Agendamento axmIdAgendamento) {
        this.axmIdAgendamento = axmIdAgendamento;
    }

    public Animal getAxaIdAnimal() {
        return axaIdAnimal;
    }

    public void setAxaIdAnimal(Animal axaIdAnimal) {
        this.axaIdAnimal = axaIdAnimal;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        AgendamentoAnimal that = (AgendamentoAnimal) o;

        return Objects.equals(axaId, that.axaId);
    }

    @Override
    public int hashCode() {
        return axaId != null ? axaId.hashCode() : 0;
    }
}
