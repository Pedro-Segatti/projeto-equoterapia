package com.api.desafio.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.Serializable;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 *
 * @author Pedro
 */
@Entity
@Table(name = "ESTADO")
public class Estado implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @Column(name = "EST_UF")
    private String estUf;
    @Basic(optional = false)
    @Column(name = "EST_NOME")
    private String estNome;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "estado")
    private List<Cidade> cidadeList;
    @JoinColumn(name = "EST_ISO_PAIS", referencedColumnName = "PAI_ISO")
    @ManyToOne(optional = false)
    private Pais pais;

    public Estado() {
    }

    public Estado(String estUf) {
        this.estUf = estUf;
    }

    public Estado(String estUf, String estNome) {
        this.estUf = estUf;
        this.estNome = estNome;
    }

    public String getEstUf() {
        return estUf;
    }

    public void setEstUf(String estUf) {
        this.estUf = estUf;
    }

    public String getEstNome() {
        return estNome;
    }

    public void setEstNome(String estNome) {
        this.estNome = estNome;
    }
    @JsonIgnore
    public List<Cidade> getCidadeList() {
        return cidadeList;
    }

    public void setCidadeList(List<Cidade> cidadeList) {
        this.cidadeList = cidadeList;
    }

    public Pais getPais() {
        return pais;
    }

    public void setPais(Pais pais) {
        this.pais = pais;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (estUf != null ? estUf.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Estado)) {
            return false;
        }
        Estado other = (Estado) object;
        if ((this.estUf == null && other.estUf != null) || (this.estUf != null && !this.estUf.equals(other.estUf))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.api.desafio.model.Estado_1[ estUf=" + estUf + " ]";
    }

}
