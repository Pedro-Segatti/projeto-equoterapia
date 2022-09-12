package com.api.desafio.model;

import java.io.Serializable;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

/**
 *
 * @author Pedro
 */
@Entity
@Table(name = "PICADEIRO")
public class Picadeiro implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "PIC_ID")
    private Integer picId;
    @Basic(optional = false)
    @Column(name = "PIC_DESCRICAO")
    private String picDescricao;
    @ManyToMany(mappedBy = "picadeiroList")
    private List<FichaEvolucao> fichaEvolucaoList;

    public Picadeiro() {
    }

    public Picadeiro(Integer picId) {
        this.picId = picId;
    }

    public Picadeiro(Integer picId, String picDescricao) {
        this.picId = picId;
        this.picDescricao = picDescricao;
    }

    public Integer getPicId() {
        return picId;
    }

    public void setPicId(Integer picId) {
        this.picId = picId;
    }

    public String getPicDescricao() {
        return picDescricao;
    }

    public void setPicDescricao(String picDescricao) {
        this.picDescricao = picDescricao;
    }

    public List<FichaEvolucao> getFichaEvolucaoList() {
        return fichaEvolucaoList;
    }

    public void setFichaEvolucaoList(List<FichaEvolucao> fichaEvolucaoList) {
        this.fichaEvolucaoList = fichaEvolucaoList;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (picId != null ? picId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Picadeiro)) {
            return false;
        }
        Picadeiro other = (Picadeiro) object;
        if ((this.picId == null && other.picId != null) || (this.picId != null && !this.picId.equals(other.picId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.api.desafio.model.Picadeiro[ picId=" + picId + " ]";
    }

}
