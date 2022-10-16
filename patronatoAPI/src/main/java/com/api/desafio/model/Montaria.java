package com.api.desafio.model;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "MONTARIA")
public class Montaria implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "MONT_ID")
    private Integer montId;
    @Column(name = "MONT_DESCRICAO")
    private String montDescricao;

    public Montaria() {
    }

    public Integer getMontId() {
        return montId;
    }

    public void setMontId(Integer montId) {
        this.montId = montId;
    }

    public String getMontDescricao() {
        return montDescricao;
    }

    public void setMontDescricao(String montDescricao) {
        this.montDescricao = montDescricao;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Montaria montaria = (Montaria) o;
        return Objects.equals(montId, montaria.montId) && Objects.equals(montDescricao, montaria.montDescricao);
    }

    @Override
    public int hashCode() {
        return Objects.hash(montId, montDescricao);
    }
}
