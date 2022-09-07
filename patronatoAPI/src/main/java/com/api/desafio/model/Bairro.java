package com.api.desafio.model;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name="BAIRRO")
public class Bairro implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="BAR_ID")
    private Integer barId;
    @Column(name="BAR_NOME",length = 100)
    private String barNome;
    @JoinColumn(name = "FK_CIDADE_CID_ID",referencedColumnName = "CID_ID")
    @ManyToOne(fetch = FetchType.LAZY)
    private Cidade cidade;

    public Bairro() {
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Bairro bairro = (Bairro) o;
        return Objects.equals(barId, bairro.barId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(barId);
    }
}
