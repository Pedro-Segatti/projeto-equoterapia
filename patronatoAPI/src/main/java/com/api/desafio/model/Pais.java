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
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 *
 * @author Pedro
 */
@Entity
@Table(name = "PAIS")
public class Pais implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "PAI_ID")
    private Integer paiId;
    @Basic(optional = false)
    @Column(name = "PAI_ISO")
    private String paiIso;
    @Basic(optional = false)
    @Column(name = "PAI_NOME")
    private String paiNome;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "pais")
    private List<Estado> estadoList;

    public Pais() {
    }

    public Pais(Integer paiId) {
        this.paiId = paiId;
    }

    public Pais(Integer paiId, String paiIso, String paiNome) {
        this.paiId = paiId;
        this.paiIso = paiIso;
        this.paiNome = paiNome;
    }

    public Integer getPaiId() {
        return paiId;
    }

    public void setPaiId(Integer paiId) {
        this.paiId = paiId;
    }

    public String getPaiIso() {
        return paiIso;
    }

    public void setPaiIso(String paiIso) {
        this.paiIso = paiIso;
    }

    public String getPaiNome() {
        return paiNome;
    }

    public void setPaiNome(String paiNome) {
        this.paiNome = paiNome;
    }

    public List<Estado> getEstadoList() {
        return estadoList;
    }

    public void setEstadoList(List<Estado> estadoList) {
        this.estadoList = estadoList;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (paiId != null ? paiId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Pais)) {
            return false;
        }
        Pais other = (Pais) object;
        if ((this.paiId == null && other.paiId != null) || (this.paiId != null && !this.paiId.equals(other.paiId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.api.desafio.model.Pais_1[ paiId=" + paiId + " ]";
    }

}
