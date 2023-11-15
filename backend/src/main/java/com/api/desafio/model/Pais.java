package com.api.desafio.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.Serializable;
import java.util.List;
import java.util.Objects;
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

    public Pais(String paiIso, String paiNome) {
        this.paiIso = paiIso;
        this.paiNome = paiNome;
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

    @JsonIgnore
    public List<Estado> getEstadoList() {
        return estadoList;
    }

    public void setEstadoList(List<Estado> estadoList) {
        this.estadoList = estadoList;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Pais pais = (Pais) o;
        return paiIso.equals(pais.paiIso);
    }

    @Override
    public int hashCode() {
        return Objects.hash(paiIso);
    }
}
