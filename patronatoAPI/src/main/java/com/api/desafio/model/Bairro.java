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
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 *
 * @author Pedro
 */
@Entity
@Table(name = "BAIRRO")
public class Bairro implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "BAR_ID")
    private Integer barId;
    @Basic(optional = false)
    @Column(name = "BAR_NOME")
    private String barNome;
    @JoinColumns({
        @JoinColumn(name = "BAR_ID_CID", referencedColumnName = "CID_ID"),
        @JoinColumn(name = "BAR_ID_CID", referencedColumnName = "CID_ID")})
    @ManyToOne(optional = false)
    private Cidade cidade;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "bairro")
    private List<Logradouro> logradouroList;

    public Bairro() {
    }

    public Bairro(Integer barId) {
        this.barId = barId;
    }

    public Bairro(Integer barId, String barNome) {
        this.barId = barId;
        this.barNome = barNome;
    }

    public Integer getBarId() {
        return barId;
    }

    public void setBarId(Integer barId) {
        this.barId = barId;
    }

    public String getBarNome() {
        return barNome;
    }

    public void setBarNome(String barNome) {
        this.barNome = barNome;
    }

    public Cidade getCidade() {
        return cidade;
    }

    public void setCidade(Cidade cidade) {
        this.cidade = cidade;
    }

    public List<Logradouro> getLogradouroList() {
        return logradouroList;
    }

    public void setLogradouroList(List<Logradouro> logradouroList) {
        this.logradouroList = logradouroList;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (barId != null ? barId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Bairro)) {
            return false;
        }
        Bairro other = (Bairro) object;
        if ((this.barId == null && other.barId != null) || (this.barId != null && !this.barId.equals(other.barId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.api.desafio.model.Bairro_1[ barId=" + barId + " ]";
    }

}
