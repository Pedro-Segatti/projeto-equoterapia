package com.api.desafio.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.Serializable;
import java.util.List;
import javax.persistence.*;

/**
 *
 * @author Pedro
 */
@Entity
@Table(name = "MATERIAL")
public class Material implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "MAT_ID")
    private Integer matId;
    @Basic(optional = false)
    @Column(name = "MAT_DESCRICAO")
    private String matDescricao;
    @ManyToMany(mappedBy = "materialList")
    private List<Agendamento> agendamentoList;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "material")
    private List<FichaEvolAtividadeMaterial> fichaEvolAtividadeMaterialList;

    public Material() {
    }

    public Material(Integer matId) {
        this.matId = matId;
    }

    public Material(Integer matId, String matDescricao) {
        this.matId = matId;
        this.matDescricao = matDescricao;
    }

    public Integer getMatId() {
        return matId;
    }

    public void setMatId(Integer matId) {
        this.matId = matId;
    }

    public String getMatDescricao() {
        return matDescricao;
    }

    public void setMatDescricao(String matDescricao) {
        this.matDescricao = matDescricao;
    }

    @JsonIgnore
    public List<Agendamento> getAgendamentoList() {
        return agendamentoList;
    }

    public void setAgendamentoList(List<Agendamento> agendamentoList) {
        this.agendamentoList = agendamentoList;
    }

    @JsonIgnore
    public List<FichaEvolAtividadeMaterial> getFichaEvolAtividadeMaterialList() {
        return fichaEvolAtividadeMaterialList;
    }
    @JsonIgnore
    public void setFichaEvolAtividadeMaterialList(List<FichaEvolAtividadeMaterial> fichaEvolAtividadeMaterialList) {
        this.fichaEvolAtividadeMaterialList = fichaEvolAtividadeMaterialList;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (matId != null ? matId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Material)) {
            return false;
        }
        Material other = (Material) object;
        if ((this.matId == null && other.matId != null) || (this.matId != null && !this.matId.equals(other.matId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.api.desafio.model.Material[ matId=" + matId + " ]";
    }

}
