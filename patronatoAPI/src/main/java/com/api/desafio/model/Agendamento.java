package com.api.desafio.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import javax.persistence.*;

/**
 *
 * @author Pedro
 */
@Entity
@Table(name = "AGENDAMENTO")
public class Agendamento implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "AGD_ID")
    private Integer agdId;
    @Basic(optional = false)
    @Column(name = "AGD_DATA")
    @Temporal(TemporalType.DATE)
    private Date agdData;
    @Basic(optional = false)
    @Column(name = "AGD_HORA")
    @Temporal(TemporalType.TIME)
    private Date agdHora;
    @Basic(optional = false)
    @Column(name = "AGD_DESCRICAO")
    private String agdDescricao;
    @Basic(optional = false)
    @Column(name = "AGD_CONCLUIDO")
    private boolean agdConcluido;
    @JoinColumn(name = "AGD_ID_PRATICANTE", referencedColumnName = "PRAT_ID")
    @ManyToOne(optional = false)
    private Praticante praticante;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "axmIdAgendamento", orphanRemoval = true)
    private List<AgendamentoMaterial> agendamentoMaterialList;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "axfIdAgendamento", orphanRemoval = true)
    private List<AgendamentoFuncionario> agendamentoFuncionarioList;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "axaIdAgendamento", orphanRemoval = true)
    private List<AgendamentoAnimal> agendamentoAnimalList;

    public Agendamento() {
    }

    public Agendamento(Integer agdId) {
        this.agdId = agdId;
    }

    public Agendamento(Integer agdId, Date agdData, String agdDescricao) {
        this.agdId = agdId;
        this.agdData = agdData;
        this.agdDescricao = agdDescricao;
    }

    public Integer getAgdId() {
        return agdId;
    }

    public void setAgdId(Integer agdId) {
        this.agdId = agdId;
    }

    public Date getAgdData() {
        return agdData;
    }

    public void setAgdData(Date agdData) {
        this.agdData = agdData;
    }

    public Date getAgdHora() {
        return agdHora;
    }

    public void setAgdHora(Date agdHora) {
        this.agdHora = agdHora;
    }

    public String getAgdDescricao() {
        return agdDescricao;
    }

    public void setAgdDescricao(String agdDescricao) {
        this.agdDescricao = agdDescricao;
    }

    public boolean isAgdConcluido() {
        return agdConcluido;
    }

    public void setAgdConcluido(boolean agdConcluido) {
        this.agdConcluido = agdConcluido;
    }

    public Praticante getPraticante() {
        return praticante;
    }

    public void setPraticante(Praticante praticante) {
        this.praticante = praticante;
    }

    public List<AgendamentoMaterial> getAgendamentoMaterialList() {
        return agendamentoMaterialList;
    }

    public void setAgendamentoMaterialList(List<AgendamentoMaterial> agendamentoMaterialList) {
        this.agendamentoMaterialList = agendamentoMaterialList;
    }

    public List<AgendamentoFuncionario> getAgendamentoFuncionarioList() {
        return agendamentoFuncionarioList;
    }

    public void setAgendamentoFuncionarioList(List<AgendamentoFuncionario> agendamentoFuncionarioList) {
        this.agendamentoFuncionarioList = agendamentoFuncionarioList;
    }

    public List<AgendamentoAnimal> getAgendamentoAnimalList() {
        return agendamentoAnimalList;
    }

    public void setAgendamentoAnimalList(List<AgendamentoAnimal> agendamentoAnimalList) {
        this.agendamentoAnimalList = agendamentoAnimalList;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (agdId != null ? agdId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Agendamento)) {
            return false;
        }
        Agendamento other = (Agendamento) object;
        if ((this.agdId == null && other.agdId != null) || (this.agdId != null && !this.agdId.equals(other.agdId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.api.desafio.model.Agendamento[ agdId=" + agdId + " ]";
    }
    
}
