package com.api.desafio.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.Serializable;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 *
 * @author Pedro
 */
@Entity
@Table(name = "ATIVIDADE")
public class Atividade implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "ATV_ID")
    private Integer atvId;
    @Basic(optional = false)
    @Column(name = "ATV_DESCRICAO")
    private String atvDescricao;
    @Basic(optional = false)
    @Column(name = "ATV_DURACAO")
    private Integer atvDuracao;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "atividade")
    private List<FichaEvolAtividadeMaterial> fichaEvolAtividadeMaterialList;

    public Atividade() {
    }

    public Atividade(Integer atvId) {
        this.atvId = atvId;
    }

    public Atividade(Integer atvId, String atvDescricao, Integer atvDuracao) {
        this.atvId = atvId;
        this.atvDescricao = atvDescricao;
        this.atvDuracao = atvDuracao;
    }

    public Integer getAtvId() {
        return atvId;
    }

    public void setAtvId(Integer atvId) {
        this.atvId = atvId;
    }

    public String getAtvDescricao() {
        return atvDescricao;
    }

    public void setAtvDescricao(String atvDescricao) {
        this.atvDescricao = atvDescricao;
    }

    public Integer getAtvDuracao() {
        return atvDuracao;
    }

    public void setAtvDuracao(Integer atvDuracao) {
        this.atvDuracao = atvDuracao;
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
        hash += (atvId != null ? atvId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Atividade)) {
            return false;
        }
        Atividade other = (Atividade) object;
        if ((this.atvId == null && other.atvId != null) || (this.atvId != null && !this.atvId.equals(other.atvId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.api.desafio.model.Atividade[ atvId=" + atvId + " ]";
    }
    
}
